import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Rating,
  State,
  type Card as FsrsCard,
  type Grade,
} from "ts-fsrs";
import type { FSRSRatingNum, FSRSStateNum, SrsCard } from "@/types/learning";

const params = generatorParameters({
  enable_fuzz: true,
  enable_short_term: true,
});

const scheduler = fsrs(params);

export function createInitialFsrsFields(now = new Date()) {
  const empty = createEmptyCard(now);
  return {
    state: empty.state as FSRSStateNum,
    due: empty.due.toISOString(),
    stability: empty.stability,
    difficulty: empty.difficulty,
    elapsedDays: empty.elapsed_days,
    scheduledDays: empty.scheduled_days,
    reps: empty.reps,
    lapses: empty.lapses,
    lastReview: null as string | null,
  };
}

function toFsrsCard(card: SrsCard): FsrsCard {
  return {
    due: new Date(card.due),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsedDays,
    scheduled_days: card.scheduledDays,
    learning_steps: 0,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state as State,
    last_review: card.lastReview ? new Date(card.lastReview) : undefined,
  };
}

export function applyFsrsReview(
  card: SrsCard,
  rating: FSRSRatingNum,
  reviewedAt = new Date()
): {
  updatedFields: Pick<
    SrsCard,
    | "state"
    | "due"
    | "stability"
    | "difficulty"
    | "elapsedDays"
    | "scheduledDays"
    | "reps"
    | "lapses"
    | "lastReview"
  >;
  stateBefore: FSRSStateNum;
  elapsedDays: number;
  scheduledDays: number;
} {
  const fsrsCard = toFsrsCard(card);
  const grade = rating as Grade;
  const result = scheduler.next(fsrsCard, reviewedAt, grade);
  const next = result.card;

  return {
    updatedFields: {
      state: next.state as FSRSStateNum,
      due: next.due.toISOString(),
      stability: next.stability,
      difficulty: next.difficulty,
      elapsedDays: next.elapsed_days,
      scheduledDays: next.scheduled_days,
      reps: next.reps,
      lapses: next.lapses,
      lastReview: reviewedAt.toISOString(),
    },
    stateBefore: card.state,
    elapsedDays: result.log.elapsed_days,
    scheduledDays: result.log.scheduled_days,
  };
}

export function previewFsrsIntervals(
  card: SrsCard,
  now = new Date()
): Record<FSRSRatingNum, string> {
  const fsrsCard = toFsrsCard(card);
  const scheduling = scheduler.repeat(fsrsCard, now);

  return {
    1: formatIntervalPt(now, scheduling[Rating.Again].card.due),
    2: formatIntervalPt(now, scheduling[Rating.Hard].card.due),
    3: formatIntervalPt(now, scheduling[Rating.Good].card.due),
    4: formatIntervalPt(now, scheduling[Rating.Easy].card.due),
  };
}

export function formatIntervalPt(from: Date, to: Date): string {
  const diffMs = Math.max(0, to.getTime() - from.getTime());
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return "< 1 min";
  if (diffMin < 60) return `${diffMin} min`;
  const diffHours = Math.round(diffMin / 60);
  if (diffHours < 24) return `${diffHours} h`;
  const diffDays = Math.round(diffMs / 86400000);
  if (diffDays === 1) return "1 dia";
  if (diffDays < 30) return `${diffDays} dias`;
  const diffMonths = Number((diffDays / 30).toFixed(1));
  if (diffMonths < 12) {
    return `${String(diffMonths).replace(".", ",")} ${diffMonths === 1 ? "mês" : "meses"}`;
  }
  const diffYears = Number((diffDays / 365).toFixed(1));
  return `${String(diffYears).replace(".", ",")} ${diffYears === 1 ? "ano" : "anos"}`;
}

