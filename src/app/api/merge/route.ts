import { NextRequest, NextResponse } from "next/server";
import { getDb, handleApiError, requireAuthOr401 } from "@/lib/db/client";
import { ensureDefaultDeck, submitReviewsBatch } from "@/lib/db/srs";
import { recordUserEvent, upsertReadingSession } from "@/lib/db/telemetry";
import { evaluateAndUnlockBadges } from "@/lib/db/badges";
import { getLocalDayString } from "@/lib/client-day";
import type {
  ReadingSessionInput,
  SrsCard,
  SrsReviewQueueItem,
  UnlockedBadge,
  UserEventInput,
} from "@/types/learning";

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuthOr401(request);
    if ("error" in auth) return auth.error;

    const body = (await request.json()) as {
      sessions?: ReadingSessionInput[];
      events?: UserEventInput[];
      cards?: SrsCard[];
      pendingReviews?: SrsReviewQueueItem[];
      today?: string;
    };

    const today = body.today || getLocalDayString();
    const sql = getDb();
    const newlyUnlockedMap = new Map<string, UnlockedBadge>();

    const collectBadges = (list: UnlockedBadge[]) => {
      for (const b of list) {
        newlyUnlockedMap.set(`${b.badgeId}:${b.tier}`, b);
      }
    };

    if (Array.isArray(body.sessions)) {
      for (const s of body.sessions) {
        const res = await upsertReadingSession(auth.username, s);
        collectBadges(res.newlyUnlocked);
      }
    }

    if (Array.isArray(body.events)) {
      for (const ev of body.events) {
        const res = await recordUserEvent(auth.username, ev);
        collectBadges(res.newlyUnlocked);
      }
    }

    if (Array.isArray(body.cards) && body.cards.length > 0) {
      const deckId = await ensureDefaultDeck(auth.username);
      for (const c of body.cards) {
        await sql`
          INSERT INTO cards (
            id, deck_id, username, hanzi, state, due, stability, difficulty,
            elapsed_days, scheduled_days, reps, lapses, last_review,
            suspended, buried_until, note, story_slug, example_sentence_zh, example_sentence_pt, snapshot, created_at
          )
          VALUES (
            ${c.id}::uuid,
            ${deckId}::uuid,
            ${auth.username},
            ${c.hanzi},
            ${c.state},
            ${c.due}::timestamptz,
            ${c.stability},
            ${c.difficulty},
            ${c.elapsedDays},
            ${c.scheduledDays},
            ${c.reps},
            ${c.lapses},
            ${c.lastReview ? c.lastReview : null}::timestamptz,
            ${Boolean(c.suspended)},
            ${c.buriedUntil ? c.buriedUntil : null}::date,
            ${c.note ?? null},
            ${c.storySlug ?? null},
            ${c.exampleSentenceZh ?? null},
            ${c.exampleSentencePt ?? null},
            ${c.snapshot ? JSON.stringify(c.snapshot) : null}::jsonb,
            ${c.createdAt || new Date().toISOString()}::timestamptz
          )
          ON CONFLICT (deck_id, hanzi) DO NOTHING
        `;
      }
    }

    if (Array.isArray(body.pendingReviews) && body.pendingReviews.length > 0) {
      const res = await submitReviewsBatch(auth.username, body.pendingReviews, today);
      collectBadges(res.newlyUnlocked);
    }

    const finalEval = await evaluateAndUnlockBadges(auth.username, today);
    collectBadges(finalEval.newlyUnlocked);

    return NextResponse.json({
      ok: true,
      newlyUnlocked: Array.from(newlyUnlockedMap.values()),
    });
  } catch (err) {
    return handleApiError(err, "Erro ao mesclar dados locais.");
  }
}

