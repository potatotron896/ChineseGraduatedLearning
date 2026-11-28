import { getDb } from "@/lib/db/client";
import { getLocalDayString } from "@/lib/client-day";
import { evaluateBadges } from "@/lib/streak-and-badges";
import type { DailyStat, StreakInfo, UnlockedBadge } from "@/types/learning";
import type { ChapterProgress } from "@/types/story";

function formatPgDate(val: unknown): string {
  if (val instanceof Date) {
    return val.toISOString().slice(0, 10);
  }
  return String(val).slice(0, 10);
}

export async function evaluateAndUnlockBadges(
  username: string,
  todayStr = getLocalDayString()
): Promise<{
  newlyUnlocked: UnlockedBadge[];
  streak: StreakInfo;
  unlockedBadges: UnlockedBadge[];
}> {
  const sql = getDb();

  const [
    dailyRows,
    progressRows,
    vocabCountRows,
    masteredRows,
    etymologyRows,
    fontRows,
    offHoursRows,
    freezeRows,
    badgeRows,
  ] = await Promise.all([
    sql`
      SELECT day, active_seconds, chapters_completed, words_saved, cards_reviewed
      FROM user_daily_stats
      WHERE username = ${username}
    `,
    sql`
      SELECT progress_key, story_slug, chapter_id, completed, last_sentence_id, last_audio_ms, updated_at
      FROM user_chapter_progress
      WHERE username = ${username}
    `,
    sql`
      SELECT COUNT(*)::int AS cnt
      FROM user_saved_vocabulary
      WHERE username = ${username}
    `,
    sql`
      SELECT COUNT(*)::int AS cnt
      FROM cards
      WHERE username = ${username} AND suspended = FALSE AND scheduled_days > 21
    `,
    sql`
      SELECT COUNT(*)::int AS cnt
      FROM user_events
      WHERE username = ${username} AND type = 'etymology_inspected'
    `,
    sql`
      SELECT COUNT(DISTINCT (payload->>'font'))::int AS cnt
      FROM user_events
      WHERE username = ${username} AND type = 'font_changed' AND payload ? 'font'
    `,
    sql`
      SELECT COUNT(*)::int AS cnt
      FROM reading_sessions
      WHERE username = ${username}
        AND (
          EXTRACT(HOUR FROM started_at) < 7
          OR EXTRACT(HOUR FROM started_at) >= 23
        )
    `,
    sql`
      SELECT week_start, used_on
      FROM user_streak_freezes
      WHERE username = ${username}
    `,
    sql`
      SELECT badge_id, tier, unlocked_at
      FROM user_badges
      WHERE username = ${username}
    `,
  ]);

  const dailyStats: DailyStat[] = dailyRows.map((r) => ({
    day: formatPgDate(r.day),
    activeSeconds: Number(r.active_seconds || 0),
    chaptersCompleted: Number(r.chapters_completed || 0),
    wordsSaved: Number(r.words_saved || 0),
    cardsReviewed: Number(r.cards_reviewed || 0),
  }));

  const chapterProgress: Record<string, ChapterProgress> = {};
  for (const r of progressRows) {
    chapterProgress[String(r.progress_key)] = {
      storySlug: String(r.story_slug),
      chapterId: String(r.chapter_id),
      completed: Boolean(r.completed),
      updatedAt: new Date(r.updated_at as string | Date).toISOString(),
    };
  }

  const streakFreezes: Record<string, string | null> = {};
  for (const r of freezeRows) {
    streakFreezes[formatPgDate(r.week_start)] = r.used_on
      ? formatPgDate(r.used_on)
      : null;
  }

  const alreadyUnlocked: UnlockedBadge[] = badgeRows.map((r) => ({
    badgeId: String(r.badge_id),
    tier: Number(r.tier),
    unlockedAt: new Date(r.unlocked_at as string | Date).toISOString(),
  }));

  const { newlyUnlocked, streak, newlyUsedFreezes } = evaluateBadges(
    {
      dailyStats,
      chapterProgress,
      totalWordsSaved: Number(vocabCountRows[0]?.cnt || 0),
      masteredCards: Number(masteredRows[0]?.cnt || 0),
      etymologyInspections: Number(etymologyRows[0]?.cnt || 0),
      distinctFontsUsed: Number(fontRows[0]?.cnt || 0),
      offHoursSessions: Number(offHoursRows[0]?.cnt || 0),
      streakFreezes,
      todayStr,
    },
    alreadyUnlocked
  );

  for (const f of newlyUsedFreezes) {
    await sql`
      INSERT INTO user_streak_freezes (username, week_start, used_on)
      VALUES (${username}, ${f.weekStart}::date, ${f.usedOn}::date)
      ON CONFLICT (username, week_start) DO NOTHING
    `;
  }

  for (const b of newlyUnlocked) {
    await sql`
      INSERT INTO user_badges (username, badge_id, tier, unlocked_at)
      VALUES (${username}, ${b.badgeId}, ${b.tier}, ${b.unlockedAt}::timestamptz)
      ON CONFLICT (username, badge_id, tier) DO NOTHING
    `;
  }

  return {
    newlyUnlocked,
    streak,
    unlockedBadges: [...alreadyUnlocked, ...newlyUnlocked],
  };
}

