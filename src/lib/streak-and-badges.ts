import { BADGE_DEFINITIONS } from "@/data/badges";
import { STORIES } from "@/data/stories";
import {
  addDaysToDayString,
  getLocalDayString,
  getWeekStartDayString,
  isWeekendDayString,
} from "@/lib/client-day";
import type {
  DailyStat,
  StreakInfo,
  UnlockedBadge,
} from "@/types/learning";
import type { ChapterProgress, HskLevel } from "@/types/story";

export interface BadgeMetricsInput {
  dailyStats: DailyStat[];
  chapterProgress: Record<string, ChapterProgress>;
  totalWordsSaved: number;
  masteredCards: number;
  etymologyInspections: number;
  distinctFontsUsed: number;
  offHoursSessions: number;
  streakFreezes: Record<string, string | null>; // weekStart -> usedOn
  todayStr?: string;
}

export function isDayActive(stat: DailyStat | undefined): boolean {
  if (!stat) return false;
  return (
    stat.activeSeconds > 0 ||
    stat.chaptersCompleted > 0 ||
    stat.cardsReviewed > 0 ||
    stat.wordsSaved > 0
  );
}

export function computeStreak(
  dailyStats: DailyStat[],
  existingFreezes: Record<string, string | null>,
  todayStr = getLocalDayString()
): { streak: StreakInfo; newlyUsedFreezes: { weekStart: string; usedOn: string }[] } {
  const byDay = new Map<string, DailyStat>();
  for (const s of dailyStats) {
    byDay.set(s.day, s);
  }

  const freezes = { ...existingFreezes };
  const newlyUsedFreezes: { weekStart: string; usedOn: string }[] = [];

  const activeToday = isDayActive(byDay.get(todayStr));

  // Compute currentStreak walking backwards from today (or yesterday if not active today)
  let currentStreak = 0;
  let cursor = activeToday ? todayStr : addDaysToDayString(todayStr, -1);

  // If neither today nor yesterday is active, check if yesterday can be frozen (only if day before yesterday was active)
  if (!activeToday && !isDayActive(byDay.get(cursor))) {
    const dayBefore = addDaysToDayString(cursor, -1);
    const weekStart = getWeekStartDayString(cursor);
    if (isDayActive(byDay.get(dayBefore)) && !freezes[weekStart]) {
      freezes[weekStart] = cursor;
      newlyUsedFreezes.push({ weekStart, usedOn: cursor });
      cursor = dayBefore;
    } else {
      cursor = ""; // streak is 0
    }
  }

  if (cursor) {
    let safety = 0;
    while (safety < 1000) {
      safety++;
      if (isDayActive(byDay.get(cursor))) {
        currentStreak++;
        cursor = addDaysToDayString(cursor, -1);
        continue;
      }
      // Missed day: can we use weekly freeze?
      const weekStart = getWeekStartDayString(cursor);
      const prevDay = addDaysToDayString(cursor, -1);
      if (
        (!freezes[weekStart] || freezes[weekStart] === cursor) &&
        isDayActive(byDay.get(prevDay))
      ) {
        if (!freezes[weekStart]) {
          freezes[weekStart] = cursor;
          newlyUsedFreezes.push({ weekStart, usedOn: cursor });
        }
        cursor = prevDay;
        continue;
      }
      break;
    }
  }

  // Compute longestStreak across all active days
  const activeDaysSorted = Array.from(byDay.values())
    .filter(isDayActive)
    .map((s) => s.day)
    .sort();

  let longestStreak = currentStreak;
  if (activeDaysSorted.length > 0) {
    let run = 1;
    let prev = activeDaysSorted[0];
    const simFreezes: Record<string, string | null> = { ...existingFreezes };
    for (let i = 1; i < activeDaysSorted.length; i++) {
      const curr = activeDaysSorted[i];
      const expectedNext = addDaysToDayString(prev, 1);
      const expectedAfterFreeze = addDaysToDayString(prev, 2);
      if (curr === expectedNext) {
        run++;
      } else if (curr === expectedAfterFreeze) {
        const missed = expectedNext;
        const wk = getWeekStartDayString(missed);
        if (!simFreezes[wk] || simFreezes[wk] === missed) {
          simFreezes[wk] = missed;
          run++;
        } else {
          run = 1;
        }
      } else {
        run = 1;
      }
      if (run > longestStreak) longestStreak = run;
      prev = curr;
    }
  }

  const currentWeekStart = getWeekStartDayString(todayStr);
  const freezeUsedOn = freezes[currentWeekStart] ?? null;

  return {
    streak: {
      currentStreak,
      longestStreak,
      freezeAvailableThisWeek: !freezeUsedOn,
      freezeUsedOn,
      activeToday,
    },
    newlyUsedFreezes,
  };
}

export function computeStoryCompletionStats(
  chapterProgress: Record<string, ChapterProgress>
) {
  let storiesCompleted = 0;
  const hskLevelsCompleted = new Set<HskLevel>();
  let totalChaptersCompleted = 0;

  for (const prog of Object.values(chapterProgress)) {
    if (prog.completed) totalChaptersCompleted++;
  }

  for (const story of STORIES) {
    if (story.chapters.length === 0) continue;
    const allDone = story.chapters.every(
      (ch) => chapterProgress[`${story.slug}:${ch.id}`]?.completed
    );
    if (allDone) {
      storiesCompleted++;
      hskLevelsCompleted.add(story.targetHsk);
    }
  }

  return {
    storiesCompleted,
    distinctHskStoriesCompleted: hskLevelsCompleted.size,
    totalChaptersCompletedFromProgress: totalChaptersCompleted,
  };
}

export function evaluateBadges(
  input: BadgeMetricsInput,
  alreadyUnlocked: UnlockedBadge[]
): { newlyUnlocked: UnlockedBadge[]; streak: StreakInfo; newlyUsedFreezes: { weekStart: string; usedOn: string }[] } {
  const todayStr = input.todayStr || getLocalDayString();
  const { streak, newlyUsedFreezes } = computeStreak(
    input.dailyStats,
    input.streakFreezes,
    todayStr
  );

  const totalSeconds = input.dailyStats.reduce((acc, s) => acc + s.activeSeconds, 0);
  const totalChaptersFromStats = input.dailyStats.reduce(
    (acc, s) => acc + s.chaptersCompleted,
    0
  );
  const totalCardsReviewed = input.dailyStats.reduce(
    (acc, s) => acc + s.cardsReviewed,
    0
  );
  const weekendDays = input.dailyStats.filter(
    (s) => isDayActive(s) && isWeekendDayString(s.day)
  ).length;

  const storyStats = computeStoryCompletionStats(input.chapterProgress);
  const totalChaptersCompleted = Math.max(
    totalChaptersFromStats,
    storyStats.totalChaptersCompletedFromProgress
  );

  const metrics: Record<string, number> = {
    longestStreak: streak.longestStreak,
    totalHours: Math.floor(totalSeconds / 3600),
    totalChaptersCompleted,
    storiesCompleted: storyStats.storiesCompleted,
    distinctHskStoriesCompleted: storyStats.distinctHskStoriesCompleted,
    totalWordsSaved: input.totalWordsSaved,
    totalCardsReviewed,
    masteredCards: input.masteredCards,
    offHoursSessions: input.offHoursSessions,
    weekendDays,
    etymologyInspections: input.etymologyInspections,
    distinctFontsUsed: input.distinctFontsUsed,
  };

  const unlockedSet = new Set(
    alreadyUnlocked.map((b) => `${b.badgeId}:${b.tier}`)
  );
  const newlyUnlocked: UnlockedBadge[] = [];
  const nowIso = new Date().toISOString();

  for (const def of BADGE_DEFINITIONS) {
    const val = metrics[def.metricKey] ?? 0;
    for (const tierDef of def.tiers) {
      const key = `${def.id}:${tierDef.tier}`;
      if (val >= tierDef.threshold && !unlockedSet.has(key)) {
        unlockedSet.add(key);
        newlyUnlocked.push({
          badgeId: def.id,
          tier: tierDef.tier,
          unlockedAt: nowIso,
        });
      }
    }
  }

  return { newlyUnlocked, streak, newlyUsedFreezes };
}

