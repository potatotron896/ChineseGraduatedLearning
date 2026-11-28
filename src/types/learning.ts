import type { CharacterEtymology, HskLevel } from "./story";

export type UserEventType =
  | "chapter_completed"
  | "word_saved"
  | "card_reviewed"
  | "etymology_inspected"
  | "font_changed"
  | "reading_session";

export interface ReadingSessionInput {
  id: string;
  storySlug: string;
  chapterId: string;
  startedAt: string;
  endedAt: string;
  activeSeconds: number;
  sentencesRead: number;
  audioMsPlayed: number;
  clientDay: string; // YYYY-MM-DD in user's local timezone
}

export interface UserEventInput {
  clientEventId: string;
  type: UserEventType;
  payload: Record<string, unknown>;
  occurredAt: string;
  clientDay: string;
}

export interface DailyStat {
  day: string; // YYYY-MM-DD
  activeSeconds: number;
  chaptersCompleted: number;
  wordsSaved: number;
  cardsReviewed: number;
}

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  freezeAvailableThisWeek: boolean;
  freezeUsedOn: string | null;
  activeToday: boolean;
}

export interface BadgeTierDef {
  tier: 1 | 2 | 3 | 4 | 5;
  label: string; // Bronze, Prata, Ouro, Platina, Mestre
  threshold: number;
  descriptionPt: string;
}

export type BadgeCategory =
  | "Sequência"
  | "Tempo"
  | "Capítulos"
  | "Histórias"
  | "Vocabulário"
  | "Revisão"
  | "Hábitos"
  | "Exploração";

export interface BadgeDefinition {
  id: string;
  namePt: string;
  category: BadgeCategory;
  icon: string; // lucide icon name
  metricKey: string;
  tiers: BadgeTierDef[];
}

export interface UnlockedBadge {
  badgeId: string;
  tier: number;
  unlockedAt: string;
}

export interface TelemetrySummary {
  todaySeconds: number;
  weekSeconds: number;
  totalSeconds: number;
  totalChaptersCompleted: number;
  totalWordsSaved: number;
  totalCardsReviewed: number;
  streak: StreakInfo;
  daily30: DailyStat[];
  hskReadDistribution: { level: HskLevel; chaptersCount: number; minutes: number }[];
  unlockedBadges: UnlockedBadge[];
}

// ==========================================
// SRS (FSRS) Types
// ==========================================

export type FSRSStateNum = 0 | 1 | 2 | 3; // 0=New, 1=Learning, 2=Review, 3=Relearning
export type FSRSRatingNum = 1 | 2 | 3 | 4; // 1=Again(Errei), 2=Hard(Difícil), 3=Good(Bom), 4=Easy(Fácil)

export interface SrsCardSnapshot {
  pinyin: string;
  meaningPt: string;
  compoundLogicPt?: string;
  hskLevel: HskLevel;
  storySlug: string;
  storyTitlePt: string;
  characters?: CharacterEtymology[];
}

export interface SrsCard {
  id: string;
  deckId: string;
  hanzi: string;
  state: FSRSStateNum;
  due: string; // ISO
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  lastReview: string | null;
  suspended: boolean;
  buriedUntil: string | null; // YYYY-MM-DD
  note: string | null;
  storySlug: string | null;
  exampleSentenceZh: string | null;
  exampleSentencePt: string | null;
  snapshot: SrsCardSnapshot | null;
  createdAt: string;
}

export interface SrsDeck {
  id: string;
  name: string;
  isDefault: boolean;
  createdAt: string;
}

export interface SrsReviewQueueItem {
  clientEventId: string;
  cardId: string;
  hanzi: string;
  rating: FSRSRatingNum;
  durationMs: number;
  reviewedAt: string;
  clientDay: string;
}

export interface SrsStats {
  totalCards: number;
  dueNow: number;
  newAvailableToday: number;
  reviewedToday: number;
  newToday: number;
  masteredCards: number; // interval > 21 days
}

export interface LocalGuestStore {
  sessions: ReadingSessionInput[];
  events: UserEventInput[];
  dailyStats: Record<string, DailyStat>;
  unlockedBadges: UnlockedBadge[];
  streakFreezes: Record<string, string | null>; // weekStart -> usedOn
  decks: SrsDeck[];
  cards: Record<string, SrsCard>; // keyed by hanzi (for default deck)
  pendingReviews: SrsReviewQueueItem[];
  reviewLogs: SrsReviewQueueItem[];
}

