"use client";

import { getLocalDayString, addDaysToDayString } from "@/lib/client-day";
import { applyFsrsReview, createInitialFsrsFields } from "@/lib/fsrs-engine";
import { evaluateBadges } from "@/lib/streak-and-badges";
import { STORIES } from "@/data/stories";
import type {
  DailyStat,
  FSRSRatingNum,
  LocalGuestStore,
  ReadingSessionInput,
  SrsCard,
  SrsCardSnapshot,
  SrsReviewQueueItem,
  SrsStats,
  TelemetrySummary,
  UnlockedBadge,
  UserEventInput,
} from "@/types/learning";
import type { ChapterProgress, HskLevel, SavedVocabularyItem } from "@/types/story";

const GUEST_STORE_KEY = "wendu_guest_learning_v1";

function createDefaultStore(): LocalGuestStore {
  return {
    sessions: [],
    events: [],
    dailyStats: {},
    unlockedBadges: [],
    streakFreezes: {},
    decks: [
      {
        id: "local-default-deck",
        name: "Baralho Principal",
        isDefault: true,
        createdAt: new Date().toISOString(),
      },
    ],
    cards: {},
    pendingReviews: [],
    reviewLogs: [],
  };
}

export function loadGuestStore(): LocalGuestStore {
  if (typeof window === "undefined") return createDefaultStore();
  try {
    const raw = localStorage.getItem(GUEST_STORE_KEY);
    if (!raw) return createDefaultStore();
    const parsed = JSON.parse(raw) as Partial<LocalGuestStore>;
    const def = createDefaultStore();
    return {
      sessions: parsed.sessions || [],
      events: parsed.events || [],
      dailyStats: parsed.dailyStats || {},
      unlockedBadges: parsed.unlockedBadges || [],
      streakFreezes: parsed.streakFreezes || {},
      decks: parsed.decks && parsed.decks.length > 0 ? parsed.decks : def.decks,
      cards: parsed.cards || {},
      pendingReviews: parsed.pendingReviews || [],
      reviewLogs: parsed.reviewLogs || [],
    };
  } catch {
    return createDefaultStore();
  }
}

export function saveGuestStore(store: LocalGuestStore): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GUEST_STORE_KEY, JSON.stringify(store));
  } catch {
    // ignore quota errors
  }
}

export function clearGuestLearningQueues(): void {
  const store = loadGuestStore();
  store.pendingReviews = [];
  saveGuestStore(store);
}

function ensureDailyStat(store: LocalGuestStore, day: string): DailyStat {
  if (!store.dailyStats[day]) {
    store.dailyStats[day] = {
      day,
      activeSeconds: 0,
      chaptersCompleted: 0,
      wordsSaved: 0,
      cardsReviewed: 0,
    };
  }
  return store.dailyStats[day];
}

export function recordGuestSession(
  session: ReadingSessionInput,
  chapterProgress: Record<string, ChapterProgress>,
  totalWordsSaved: number
): UnlockedBadge[] {
  const store = loadGuestStore();
  const idx = store.sessions.findIndex((s) => s.id === session.id);
  const prevSeconds = idx >= 0 ? store.sessions[idx].activeSeconds : 0;
  const deltaSeconds = Math.max(0, session.activeSeconds - prevSeconds);

  if (idx >= 0) {
    store.sessions[idx] = session;
  } else {
    store.sessions.push(session);
  }

  const stat = ensureDailyStat(store, session.clientDay);
  stat.activeSeconds += deltaSeconds;

  const newlyUnlocked = runGuestBadgeCheck(store, chapterProgress, totalWordsSaved);
  saveGuestStore(store);
  return newlyUnlocked;
}

export function recordGuestEvent(
  event: UserEventInput,
  chapterProgress: Record<string, ChapterProgress>,
  totalWordsSaved: number
): UnlockedBadge[] {
  const store = loadGuestStore();
  if (store.events.some((e) => e.clientEventId === event.clientEventId)) {
    return [];
  }
  store.events.push(event);

  const stat = ensureDailyStat(store, event.clientDay);
  if (event.type === "chapter_completed") stat.chaptersCompleted += 1;
  if (event.type === "word_saved") stat.wordsSaved += 1;
  if (event.type === "card_reviewed") stat.cardsReviewed += 1;

  const newlyUnlocked = runGuestBadgeCheck(store, chapterProgress, totalWordsSaved);
  saveGuestStore(store);
  return newlyUnlocked;
}

function runGuestBadgeCheck(
  store: LocalGuestStore,
  chapterProgress: Record<string, ChapterProgress>,
  totalWordsSaved: number
): UnlockedBadge[] {
  const etymologyInspections = store.events.filter(
    (e) => e.type === "etymology_inspected"
  ).length;
  const fonts = new Set(
    store.events
      .filter((e) => e.type === "font_changed" && typeof e.payload?.font === "string")
      .map((e) => String(e.payload.font))
  );
  const offHoursSessions = store.sessions.filter((s) => {
    const h = new Date(s.startedAt).getHours();
    return h < 7 || h >= 23;
  }).length;
  const masteredCards = Object.values(store.cards).filter(
    (c) => !c.suspended && c.scheduledDays > 21
  ).length;

  const { newlyUnlocked, newlyUsedFreezes } = evaluateBadges(
    {
      dailyStats: Object.values(store.dailyStats),
      chapterProgress,
      totalWordsSaved,
      masteredCards,
      etymologyInspections,
      distinctFontsUsed: fonts.size,
      offHoursSessions,
      streakFreezes: store.streakFreezes,
    },
    store.unlockedBadges
  );

  for (const f of newlyUsedFreezes) {
    store.streakFreezes[f.weekStart] = f.usedOn;
  }
  if (newlyUnlocked.length > 0) {
    store.unlockedBadges = [...store.unlockedBadges, ...newlyUnlocked];
  }
  return newlyUnlocked;
}

export function ensureGuestCardForWord(item: SavedVocabularyItem): SrsCard {
  const store = loadGuestStore();
  const existing = store.cards[item.hanzi];
  if (existing) {
    if (!existing.exampleSentenceZh && item.exampleSentenceZh) {
      existing.exampleSentenceZh = item.exampleSentenceZh;
      existing.exampleSentencePt = item.exampleSentencePt ?? null;
      saveGuestStore(store);
    }
    return existing;
  }

  const snapshot: SrsCardSnapshot = {
    pinyin: item.pinyin,
    meaningPt: item.meaningPt,
    compoundLogicPt: item.compoundLogicPt,
    hskLevel: item.hskLevel,
    storySlug: item.storySlug,
    storyTitlePt: item.storyTitlePt,
    characters: item.characters,
  };

  const fsrsFields = createInitialFsrsFields();
  const card: SrsCard = {
    id: crypto.randomUUID(),
    deckId: store.decks[0]?.id || "local-default-deck",
    hanzi: item.hanzi,
    ...fsrsFields,
    suspended: false,
    buriedUntil: null,
    note: null,
    storySlug: item.storySlug,
    exampleSentenceZh: item.exampleSentenceZh ?? null,
    exampleSentencePt: item.exampleSentencePt ?? null,
    snapshot,
    createdAt: new Date().toISOString(),
  };

  store.cards[item.hanzi] = card;
  saveGuestStore(store);
  return card;
}

export function reviewGuestCard(
  hanzi: string,
  rating: FSRSRatingNum,
  durationMs: number,
  chapterProgress: Record<string, ChapterProgress>,
  totalWordsSaved: number
): { card: SrsCard | null; newlyUnlocked: UnlockedBadge[]; queueItem: SrsReviewQueueItem | null } {
  const store = loadGuestStore();
  const card = store.cards[hanzi];
  if (!card) return { card: null, newlyUnlocked: [], queueItem: null };

  const now = new Date();
  const clientDay = getLocalDayString(now);
  const { updatedFields } = applyFsrsReview(card, rating, now);
  const updatedCard: SrsCard = {
    ...card,
    ...updatedFields,
  };
  store.cards[hanzi] = updatedCard;

  const queueItem: SrsReviewQueueItem = {
    clientEventId: crypto.randomUUID(),
    cardId: card.id,
    hanzi,
    rating,
    durationMs,
    reviewedAt: now.toISOString(),
    clientDay,
  };

  store.pendingReviews.push(queueItem);
  store.reviewLogs.push(queueItem);

  const stat = ensureDailyStat(store, clientDay);
  stat.cardsReviewed += 1;

  const newlyUnlocked = runGuestBadgeCheck(store, chapterProgress, totalWordsSaved);
  saveGuestStore(store);
  return { card: updatedCard, newlyUnlocked, queueItem };
}

export function updateGuestCardAction(
  hanzi: string,
  action: "suspend" | "unsuspend" | "bury" | "reset" | "note",
  note?: string
): SrsCard | null {
  const store = loadGuestStore();
  const card = store.cards[hanzi];
  if (!card) return null;

  if (action === "suspend") card.suspended = true;
  if (action === "unsuspend") card.suspended = false;
  if (action === "bury") card.buriedUntil = getLocalDayString();
  if (action === "note") card.note = note ?? null;
  if (action === "reset") {
    Object.assign(card, createInitialFsrsFields());
    card.buriedUntil = null;
  }

  store.cards[hanzi] = card;
  saveGuestStore(store);
  return card;
}

export function getGuestSrsQueue(
  savedVocabulary: Record<string, SavedVocabularyItem>,
  newPerDay = 10,
  reviewsPerDay = 100
): { cards: SrsCard[]; stats: SrsStats } {
  const store = loadGuestStore();
  // Ensure every saved vocabulary item has a card
  let changed = false;
  for (const item of Object.values(savedVocabulary)) {
    if (!store.cards[item.hanzi]) {
      const fsrsFields = createInitialFsrsFields();
      store.cards[item.hanzi] = {
        id: crypto.randomUUID(),
        deckId: store.decks[0]?.id || "local-default-deck",
        hanzi: item.hanzi,
        ...fsrsFields,
        suspended: false,
        buriedUntil: null,
        note: null,
        storySlug: item.storySlug,
        exampleSentenceZh: item.exampleSentenceZh ?? null,
        exampleSentencePt: item.exampleSentencePt ?? null,
        snapshot: {
          pinyin: item.pinyin,
          meaningPt: item.meaningPt,
          compoundLogicPt: item.compoundLogicPt,
          hskLevel: item.hskLevel,
          storySlug: item.storySlug,
          storyTitlePt: item.storyTitlePt,
          characters: item.characters,
        },
        createdAt: item.addedAt || new Date().toISOString(),
      };
      changed = true;
    }
  }
  if (changed) saveGuestStore(store);

  const todayStr = getLocalDayString();
  const nowMs = Date.now();
  const allCards = Object.values(store.cards);
  const reviewedToday = store.reviewLogs.filter((r) => r.clientDay === todayStr).length;
  const newTodayLogs = store.reviewLogs.filter(
    (r) => r.clientDay === todayStr && store.cards[r.hanzi]?.reps === 1
  ).length;

  const eligible = allCards.filter(
    (c) => !c.suspended && (!c.buriedUntil || c.buriedUntil < todayStr)
  );

  const dueReviews = eligible
    .filter((c) => c.state !== 0 && new Date(c.due).getTime() <= nowMs)
    .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime());

  const newCards = eligible
    .filter((c) => c.state === 0)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const remainingNewQuota = Math.max(0, newPerDay - newTodayLogs);
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
    newToday: newTodayLogs,
    masteredCards: allCards.filter((c) => !c.suspended && c.scheduledDays > 21).length,
  };

  return { cards: queue, stats };
}

export function getGuestTelemetrySummary(
  chapterProgress: Record<string, ChapterProgress>,
  totalWordsSaved: number
): TelemetrySummary {
  const store = loadGuestStore();
  const todayStr = getLocalDayString();
  const weekStartStr = addDaysToDayString(todayStr, -6);

  const daily30: DailyStat[] = [];
  for (let i = 29; i >= 0; i--) {
    const day = addDaysToDayString(todayStr, -i);
    daily30.push(
      store.dailyStats[day] || {
        day,
        activeSeconds: 0,
        chaptersCompleted: 0,
        wordsSaved: 0,
        cardsReviewed: 0,
      }
    );
  }

  const todaySeconds = store.dailyStats[todayStr]?.activeSeconds || 0;
  let weekSeconds = 0;
  let totalSeconds = 0;
  let totalCardsReviewed = 0;

  for (const s of Object.values(store.dailyStats)) {
    totalSeconds += s.activeSeconds;
    totalCardsReviewed += s.cardsReviewed;
    if (s.day >= weekStartStr && s.day <= todayStr) {
      weekSeconds += s.activeSeconds;
    }
  }

  const totalChaptersCompleted = Object.values(chapterProgress).filter(
    (p) => p.completed
  ).length;

  const { streak } = evaluateBadges(
    {
      dailyStats: Object.values(store.dailyStats),
      chapterProgress,
      totalWordsSaved,
      masteredCards: Object.values(store.cards).filter(
        (c) => !c.suspended && c.scheduledDays > 21
      ).length,
      etymologyInspections: store.events.filter((e) => e.type === "etymology_inspected")
        .length,
      distinctFontsUsed: new Set(
        store.events.filter((e) => e.type === "font_changed").map((e) => String(e.payload?.font))
      ).size,
      offHoursSessions: store.sessions.filter((s) => {
        const h = new Date(s.startedAt).getHours();
        return h < 7 || h >= 23;
      }).length,
      streakFreezes: store.streakFreezes,
      todayStr,
    },
    store.unlockedBadges
  );

  // HSK distribution from completed chapters & sessions
  const hskMap = new Map<HskLevel, { chaptersCount: number; seconds: number }>();
  const storyLevelMap = new Map(STORIES.map((s) => [s.slug, s.targetHsk]));

  for (const prog of Object.values(chapterProgress)) {
    if (!prog.completed) continue;
    const lvl = storyLevelMap.get(prog.storySlug);
    if (!lvl) continue;
    const cur = hskMap.get(lvl) || { chaptersCount: 0, seconds: 0 };
    cur.chaptersCount += 1;
    hskMap.set(lvl, cur);
  }
  for (const sess of store.sessions) {
    const lvl = storyLevelMap.get(sess.storySlug);
    if (!lvl) continue;
    const cur = hskMap.get(lvl) || { chaptersCount: 0, seconds: 0 };
    cur.seconds += sess.activeSeconds;
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
    totalChaptersCompleted,
    totalWordsSaved,
    totalCardsReviewed,
    streak,
    daily30,
    hskReadDistribution,
    unlockedBadges: store.unlockedBadges,
  };
}

