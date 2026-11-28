import { getDb } from "@/lib/db/client";
import { evaluateAndUnlockBadges } from "@/lib/db/badges";
import { addDaysToDayString, getLocalDayString } from "@/lib/client-day";
import { STORIES } from "@/data/stories";
import type {
  DailyStat,
  ReadingSessionInput,
  TelemetrySummary,
  UnlockedBadge,
  UserEventInput,
} from "@/types/learning";
import type { HskLevel } from "@/types/story";

function formatPgDate(val: unknown): string {
  if (val instanceof Date) {
    return val.toISOString().slice(0, 10);
  }
  return String(val).slice(0, 10);
}

export async function upsertReadingSession(
  username: string,
  session: ReadingSessionInput
): Promise<{ newlyUnlocked: UnlockedBadge[] }> {
  const sql = getDb();

  const existing = await sql`
    SELECT active_seconds
    FROM reading_sessions
    WHERE id = ${session.id}::uuid AND username = ${username}
    LIMIT 1
  `;

  const prevSeconds = existing.length > 0 ? Number(existing[0].active_seconds || 0) : 0;
  const clampedSeconds = Math.max(prevSeconds, Math.round(session.activeSeconds || 0));
  const deltaSeconds = Math.max(0, clampedSeconds - prevSeconds);

  await sql`
    INSERT INTO reading_sessions (
      id, username, story_slug, chapter_id, started_at, ended_at,
      active_seconds, sentences_read, audio_ms_played, client_day
    )
    VALUES (
      ${session.id}::uuid,
      ${username},
      ${session.storySlug},
      ${session.chapterId},
      ${session.startedAt}::timestamptz,
      ${session.endedAt}::timestamptz,
      ${clampedSeconds},
      ${Math.round(session.sentencesRead || 0)},
      ${Math.round(session.audioMsPlayed || 0)},
      ${session.clientDay}::date
    )
    ON CONFLICT (id) DO UPDATE SET
      ended_at = GREATEST(reading_sessions.ended_at, EXCLUDED.ended_at),
      active_seconds = GREATEST(reading_sessions.active_seconds, EXCLUDED.active_seconds),
      sentences_read = GREATEST(reading_sessions.sentences_read, EXCLUDED.sentences_read),
      audio_ms_played = GREATEST(reading_sessions.audio_ms_played, EXCLUDED.audio_ms_played)
  `;

  if (deltaSeconds > 0) {
    await sql`
      INSERT INTO user_daily_stats (username, day, active_seconds)
      VALUES (${username}, ${session.clientDay}::date, ${deltaSeconds})
      ON CONFLICT (username, day) DO UPDATE SET
        active_seconds = user_daily_stats.active_seconds + EXCLUDED.active_seconds
    `;
  }

  const { newlyUnlocked } = await evaluateAndUnlockBadges(username, session.clientDay);
  return { newlyUnlocked };
}

export async function recordUserEvent(
  username: string,
  event: UserEventInput
): Promise<{ inserted: boolean; newlyUnlocked: UnlockedBadge[] }> {
  const sql = getDb();
  const payloadJson = JSON.stringify(event.payload || {});

  const rows = await sql`
    INSERT INTO user_events (client_event_id, username, type, payload, occurred_at, client_day)
    VALUES (
      ${event.clientEventId}::uuid,
      ${username},
      ${event.type},
      ${payloadJson}::jsonb,
      ${event.occurredAt}::timestamptz,
      ${event.clientDay}::date
    )
    ON CONFLICT (client_event_id) DO NOTHING
    RETURNING id
  `;

  if (rows.length === 0) {
    return { inserted: false, newlyUnlocked: [] };
  }

  const chInc = event.type === "chapter_completed" ? 1 : 0;
  const wordInc = event.type === "word_saved" ? 1 : 0;
  const revInc = event.type === "card_reviewed" ? 1 : 0;

  if (chInc > 0 || wordInc > 0 || revInc > 0) {
    await sql`
      INSERT INTO user_daily_stats (username, day, chapters_completed, words_saved, cards_reviewed)
      VALUES (${username}, ${event.clientDay}::date, ${chInc}, ${wordInc}, ${revInc})
      ON CONFLICT (username, day) DO UPDATE SET
        chapters_completed = user_daily_stats.chapters_completed + EXCLUDED.chapters_completed,
        words_saved = user_daily_stats.words_saved + EXCLUDED.words_saved,
        cards_reviewed = user_daily_stats.cards_reviewed + EXCLUDED.cards_reviewed
    `;
  }

  const { newlyUnlocked } = await evaluateAndUnlockBadges(username, event.clientDay);
  return { inserted: true, newlyUnlocked };
}

export async function getTelemetrySummary(
  username: string,
  todayStr = getLocalDayString()
): Promise<TelemetrySummary> {
  const sql = getDb();
  const weekStartStr = addDaysToDayString(todayStr, -6);

  const [dailyRows, completedRows, vocabCountRows, sessionRows, badgeEval] =
    await Promise.all([
      sql`
        SELECT day, active_seconds, chapters_completed, words_saved, cards_reviewed
        FROM user_daily_stats
        WHERE username = ${username}
        ORDER BY day ASC
      `,
      sql`
        SELECT story_slug, chapter_id
        FROM user_chapter_progress
        WHERE username = ${username} AND completed = TRUE
      `,
      sql`
        SELECT COUNT(*)::int AS cnt
        FROM user_saved_vocabulary
        WHERE username = ${username}
      `,
      sql`
        SELECT story_slug, SUM(active_seconds)::int AS total_sec
        FROM reading_sessions
        WHERE username = ${username}
        GROUP BY story_slug
      `,
      evaluateAndUnlockBadges(username, todayStr),
    ]);

  const statsMap = new Map<string, DailyStat>();
  let todaySeconds = 0;
  let weekSeconds = 0;
  let totalSeconds = 0;
  let totalCardsReviewed = 0;

  for (const r of dailyRows) {
    const day = formatPgDate(r.day);
    const stat: DailyStat = {
      day,
      activeSeconds: Number(r.active_seconds || 0),
      chaptersCompleted: Number(r.chapters_completed || 0),
      wordsSaved: Number(r.words_saved || 0),
      cardsReviewed: Number(r.cards_reviewed || 0),
    };
    statsMap.set(day, stat);
    totalSeconds += stat.activeSeconds;
    totalCardsReviewed += stat.cardsReviewed;
    if (day === todayStr) todaySeconds = stat.activeSeconds;
    if (day >= weekStartStr && day <= todayStr) weekSeconds += stat.activeSeconds;
  }

  const daily30: DailyStat[] = [];
  for (let i = 29; i >= 0; i--) {
    const day = addDaysToDayString(todayStr, -i);
    daily30.push(
      statsMap.get(day) || {
        day,
        activeSeconds: 0,
        chaptersCompleted: 0,
        wordsSaved: 0,
        cardsReviewed: 0,
      }
    );
  }

  const storyLevelMap = new Map(STORIES.map((s) => [s.slug, s.targetHsk]));
  const hskMap = new Map<HskLevel, { chaptersCount: number; seconds: number }>();

  for (const r of completedRows) {
    const lvl = storyLevelMap.get(String(r.story_slug));
    if (!lvl) continue;
    const cur = hskMap.get(lvl) || { chaptersCount: 0, seconds: 0 };
    cur.chaptersCount += 1;
    hskMap.set(lvl, cur);
  }
  for (const r of sessionRows) {
    const lvl = storyLevelMap.get(String(r.story_slug));
    if (!lvl) continue;
    const cur = hskMap.get(lvl) || { chaptersCount: 0, seconds: 0 };
    cur.seconds += Number(r.total_sec || 0);
    hskMap.set(lvl, cur);
  }

  const hskReadDistribution = Array.from(hskMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([level, v]) => ({
      level,
      chaptersCount: v.chaptersCount,
      minutes: Math.round(v.seconds / 60),
    }));

  return {
    todaySeconds,
    weekSeconds,
    totalSeconds,
    totalChaptersCompleted: completedRows.length,
    totalWordsSaved: Number(vocabCountRows[0]?.cnt || 0),
    totalCardsReviewed,
    streak: badgeEval.streak,
    daily30,
    hskReadDistribution,
    unlockedBadges: badgeEval.unlockedBadges,
  };
}

