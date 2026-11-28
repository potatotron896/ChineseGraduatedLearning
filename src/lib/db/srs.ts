import crypto from "node:crypto";
import { getDb } from "@/lib/db/client";
import { evaluateAndUnlockBadges } from "@/lib/db/badges";
import { applyFsrsReview, createInitialFsrsFields } from "@/lib/fsrs-engine";
import { getLocalDayString } from "@/lib/client-day";
import type {
  FSRSStateNum,
  SrsCard,
  SrsCardSnapshot,
  SrsReviewQueueItem,
  SrsStats,
  UnlockedBadge,
} from "@/types/learning";
import type { SavedVocabularyItem } from "@/types/story";

function mapCardRow(r: Record<string, unknown>): SrsCard {
  return {
    id: String(r.id),
    deckId: String(r.deck_id),
    hanzi: String(r.hanzi),
    state: Number(r.state || 0) as FSRSStateNum,
    due: new Date(r.due as string | Date).toISOString(),
    stability: Number(r.stability || 0),
    difficulty: Number(r.difficulty || 0),
    elapsedDays: Number(r.elapsed_days || 0),
    scheduledDays: Number(r.scheduled_days || 0),
    reps: Number(r.reps || 0),
    lapses: Number(r.lapses || 0),
    lastReview: r.last_review ? new Date(r.last_review as string | Date).toISOString() : null,
    suspended: Boolean(r.suspended),
    buriedUntil: r.buried_until
      ? r.buried_until instanceof Date
        ? r.buried_until.toISOString().slice(0, 10)
        : String(r.buried_until).slice(0, 10)
      : null,
    note: r.note ? String(r.note) : null,
    storySlug: r.story_slug ? String(r.story_slug) : null,
    exampleSentenceZh: r.example_sentence_zh ? String(r.example_sentence_zh) : null,
    exampleSentencePt: r.example_sentence_pt ? String(r.example_sentence_pt) : null,
    snapshot: (r.snapshot as SrsCardSnapshot) || null,
    createdAt: new Date(r.created_at as string | Date).toISOString(),
  };
}

export async function ensureDefaultDeck(username: string): Promise<string> {
  const sql = getDb();
  const existing = await sql`
    SELECT id FROM decks WHERE username = ${username} AND is_default = TRUE LIMIT 1
  `;
  if (existing.length > 0) {
    return String(existing[0].id);
  }
  const deckId = crypto.randomUUID();
  await sql`
    INSERT INTO decks (id, username, name, is_default)
    VALUES (${deckId}::uuid, ${username}, 'Baralho Principal', TRUE)
  `;
  return deckId;
}

export async function ensureCardForVocabulary(
  username: string,
  item: SavedVocabularyItem
): Promise<SrsCard> {
  const sql = getDb();
  const deckId = await ensureDefaultDeck(username);
  const fsrsFields = createInitialFsrsFields();
  const snapshot: SrsCardSnapshot = {
    pinyin: item.pinyin,
    meaningPt: item.meaningPt,
    compoundLogicPt: item.compoundLogicPt,
    hskLevel: item.hskLevel,
    storySlug: item.storySlug,
    storyTitlePt: item.storyTitlePt,
    characters: item.characters,
  };

  const rows = await sql`
    INSERT INTO cards (
      id, deck_id, username, hanzi, state, due, stability, difficulty,
      elapsed_days, scheduled_days, reps, lapses, last_review,
      story_slug, example_sentence_zh, example_sentence_pt, snapshot
    )
    VALUES (
      ${crypto.randomUUID()}::uuid,
      ${deckId}::uuid,
      ${username},
      ${item.hanzi},
      ${fsrsFields.state},
      ${fsrsFields.due}::timestamptz,
      ${fsrsFields.stability},
      ${fsrsFields.difficulty},
      ${fsrsFields.elapsedDays},
      ${fsrsFields.scheduledDays},
      ${fsrsFields.reps},
      ${fsrsFields.lapses},
      NULL,
      ${item.storySlug},
      ${item.exampleSentenceZh ?? null},
      ${item.exampleSentencePt ?? null},
      ${JSON.stringify(snapshot)}::jsonb
    )
    ON CONFLICT (deck_id, hanzi) DO UPDATE SET
      example_sentence_zh = COALESCE(cards.example_sentence_zh, EXCLUDED.example_sentence_zh),
      example_sentence_pt = COALESCE(cards.example_sentence_pt, EXCLUDED.example_sentence_pt),
      snapshot = COALESCE(cards.snapshot, EXCLUDED.snapshot)
    RETURNING *
  `;
  return mapCardRow(rows[0]);
}

export async function syncCardsFromSavedVocabulary(username: string): Promise<void> {
  const sql = getDb();
  const deckId = await ensureDefaultDeck(username);

  const missingVocab = await sql`
    SELECT v.*
    FROM user_saved_vocabulary v
    LEFT JOIN cards c ON c.deck_id = ${deckId}::uuid AND c.hanzi = v.hanzi
    WHERE v.username = ${username} AND c.id IS NULL
  `;

  if (missingVocab.length === 0) return;

  const fsrsFields = createInitialFsrsFields();
  for (const v of missingVocab) {
    const snapshot: SrsCardSnapshot = {
      pinyin: String(v.pinyin),
      meaningPt: String(v.meaning_pt),
      compoundLogicPt: v.compound_logic_pt ? String(v.compound_logic_pt) : undefined,
      hskLevel: Number(v.hsk_level) as SrsCardSnapshot["hskLevel"],
      storySlug: String(v.story_slug),
      storyTitlePt: String(v.story_title_pt),
      characters: v.characters as SrsCardSnapshot["characters"],
    };
    await sql`
      INSERT INTO cards (
        id, deck_id, username, hanzi, state, due, stability, difficulty,
        elapsed_days, scheduled_days, reps, lapses, last_review,
        story_slug, example_sentence_zh, example_sentence_pt, snapshot, created_at
      )
      VALUES (
        ${crypto.randomUUID()}::uuid,
        ${deckId}::uuid,
        ${username},
        ${String(v.hanzi)},
        ${fsrsFields.state},
        ${fsrsFields.due}::timestamptz,
        ${fsrsFields.stability},
        ${fsrsFields.difficulty},
        ${fsrsFields.elapsedDays},
        ${fsrsFields.scheduledDays},
        ${fsrsFields.reps},
        ${fsrsFields.lapses},
        NULL,
        ${String(v.story_slug)},
        ${v.example_sentence_zh ? String(v.example_sentence_zh) : null},
        ${v.example_sentence_pt ? String(v.example_sentence_pt) : null},
        ${JSON.stringify(snapshot)}::jsonb,
        ${v.added_at ? new Date(v.added_at as string | Date).toISOString() : new Date().toISOString()}::timestamptz
      )
      ON CONFLICT (deck_id, hanzi) DO NOTHING
    `;
  }
}

export async function getSrsQueue(
  username: string,
  todayStr = getLocalDayString(),
  newPerDay = 10,
  reviewsPerDay = 100
): Promise<{ cards: SrsCard[]; allCards: SrsCard[]; stats: SrsStats }> {
  const sql = getDb();
  await syncCardsFromSavedVocabulary(username);

  const [allRows, todayLogRows] = await Promise.all([
    sql`
      SELECT * FROM cards
      WHERE username = ${username}
      ORDER BY created_at ASC
    `,
    sql`
      SELECT COUNT(*)::int AS total_today,
             COUNT(*) FILTER (WHERE state_before = 0)::int AS new_today
      FROM review_logs
      WHERE username = ${username} AND client_day = ${todayStr}::date
    `,
  ]);

  const allCards = allRows.map(mapCardRow);
  const reviewedToday = Number(todayLogRows[0]?.total_today || 0);
  const newToday = Number(todayLogRows[0]?.new_today || 0);

  const nowMs = Date.now();
  const eligible = allCards.filter(
    (c) => !c.suspended && (!c.buriedUntil || c.buriedUntil < todayStr)
  );

  const dueReviews = eligible
    .filter((c) => c.state !== 0 && new Date(c.due).getTime() <= nowMs)
    .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime());

  const newCards = eligible
    .filter((c) => c.state === 0)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const remainingNewQuota = Math.max(0, newPerDay - newToday);
  const remainingRevQuota = Math.max(0, reviewsPerDay - reviewedToday);

  const queue = [
    ...dueReviews.slice(0, remainingRevQuota),
    ...newCards.slice(0, remainingNewQuota),
  ];

  const stats: SrsStats = {
    totalCards: allCards.length,
    dueNow: queue.length,
    newAvailableToday: Math.min(newCards.length, remainingNewQuota),
    reviewedToday,
    newToday,
    masteredCards: allCards.filter((c) => !c.suspended && c.scheduledDays > 21).length,
  };

  return { cards: queue, allCards, stats };
}

export async function submitReviewsBatch(
  username: string,
  reviews: SrsReviewQueueItem[],
  todayStr = getLocalDayString()
): Promise<{ appliedCount: number; newlyUnlocked: UnlockedBadge[] }> {
  if (reviews.length === 0) {
    return { appliedCount: 0, newlyUnlocked: [] };
  }

  const sql = getDb();
  const sorted = [...reviews].sort(
    (a, b) => new Date(a.reviewedAt).getTime() - new Date(b.reviewedAt).getTime()
  );

  let appliedCount = 0;

  for (const rev of sorted) {
    // Find card by id or hanzi
    const cardRows = await sql`
      SELECT * FROM cards
      WHERE username = ${username} AND (id = ${rev.cardId}::uuid OR hanzi = ${rev.hanzi})
      LIMIT 1
    `;
    if (cardRows.length === 0) continue;
    const card = mapCardRow(cardRows[0]);

    // Check idempotency first
    const logCheck = await sql`
      SELECT id FROM review_logs WHERE client_event_id = ${rev.clientEventId}::uuid LIMIT 1
    `;
    if (logCheck.length > 0) continue;

    const reviewDate = new Date(rev.reviewedAt);
    const { updatedFields, stateBefore, elapsedDays, scheduledDays } = applyFsrsReview(
      card,
      rev.rating,
      reviewDate
    );

    await sql`
      INSERT INTO review_logs (
        client_event_id, card_id, username, rating, state_before,
        elapsed_days, scheduled_days, duration_ms, reviewed_at, client_day
      )
      VALUES (
        ${rev.clientEventId}::uuid,
        ${card.id}::uuid,
        ${username},
        ${rev.rating},
        ${stateBefore},
        ${elapsedDays},
        ${scheduledDays},
        ${Math.max(0, Math.round(rev.durationMs || 0))},
        ${rev.reviewedAt}::timestamptz,
        ${rev.clientDay}::date
      )
      ON CONFLICT (client_event_id) DO NOTHING
    `;

    await sql`
      UPDATE cards
      SET state = ${updatedFields.state},
          due = ${updatedFields.due}::timestamptz,
          stability = ${updatedFields.stability},
          difficulty = ${updatedFields.difficulty},
          elapsed_days = ${updatedFields.elapsedDays},
          scheduled_days = ${updatedFields.scheduledDays},
          reps = ${updatedFields.reps},
          lapses = ${updatedFields.lapses},
          last_review = ${updatedFields.lastReview}::timestamptz
      WHERE id = ${card.id}::uuid AND username = ${username}
    `;

    await sql`
      INSERT INTO user_daily_stats (username, day, cards_reviewed)
      VALUES (${username}, ${rev.clientDay}::date, 1)
      ON CONFLICT (username, day) DO UPDATE SET
        cards_reviewed = user_daily_stats.cards_reviewed + 1
    `;

    appliedCount++;
  }

  const { newlyUnlocked } = await evaluateAndUnlockBadges(username, todayStr);
  return { appliedCount, newlyUnlocked };
}

export async function updateCardAction(
  username: string,
  cardId: string,
  action: "suspend" | "unsuspend" | "bury" | "reset" | "note",
  todayStr = getLocalDayString(),
  note?: string
): Promise<SrsCard | null> {
  const sql = getDb();

  if (action === "suspend" || action === "unsuspend") {
    const rows = await sql`
      UPDATE cards
      SET suspended = ${action === "suspend"}
      WHERE id = ${cardId}::uuid AND username = ${username}
      RETURNING *
    `;
    return rows.length > 0 ? mapCardRow(rows[0]) : null;
  }

  if (action === "bury") {
    const rows = await sql`
      UPDATE cards
      SET buried_until = ${todayStr}::date
      WHERE id = ${cardId}::uuid AND username = ${username}
      RETURNING *
    `;
    return rows.length > 0 ? mapCardRow(rows[0]) : null;
  }

  if (action === "note") {
    const rows = await sql`
      UPDATE cards
      SET note = ${note ?? null}
      WHERE id = ${cardId}::uuid AND username = ${username}
      RETURNING *
    `;
    return rows.length > 0 ? mapCardRow(rows[0]) : null;
  }

  if (action === "reset") {
    const f = createInitialFsrsFields();
    const rows = await sql`
      UPDATE cards
      SET state = ${f.state},
          due = ${f.due}::timestamptz,
          stability = ${f.stability},
          difficulty = ${f.difficulty},
          elapsed_days = ${f.elapsedDays},
          scheduled_days = ${f.scheduledDays},
          reps = ${f.reps},
          lapses = ${f.lapses},
          last_review = NULL,
          buried_until = NULL
      WHERE id = ${cardId}::uuid AND username = ${username}
      RETURNING *
    `;
    return rows.length > 0 ? mapCardRow(rows[0]) : null;
  }

  return null;
}

