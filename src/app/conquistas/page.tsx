"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpen,
  BookmarkCheck,
  Brain,
  CalendarHeart,
  CheckCircle2,
  Clock,
  Compass,
  Flame,
  Library,
  Lock,
  MoonStar,
  Puzzle,
  Type,
} from "lucide-react";
import { BADGE_DEFINITIONS } from "@/data/badges";
import { useUser } from "@/context/UserContext";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Flame,
  Clock,
  BookOpen,
  Library,
  Compass,
  BookmarkCheck,
  Brain,
  Award,
  MoonStar,
  CalendarHeart,
  Puzzle,
  Type,
};

export default function AchievementsPage() {
  const { telemetrySummary } = useUser();
  const unlocked = telemetrySummary?.unlockedBadges || [];
  const unlockedMap = new Map(
    unlocked.map((b) => [`${b.badgeId}:${b.tier}`, b.unlockedAt])
  );

  const totalTiers = BADGE_DEFINITIONS.reduce((acc, b) => acc + b.tiers.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-jade hover:underline mb-2 py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para as Histórias</span>
          </Link>
          <h1 className="text-xl sm:text-3xl font-bold text-ink flex items-center gap-2.5">
            <Award className="w-6 h-6 sm:w-7 sm:h-7 text-jade shrink-0" />
            <span>Conquistas & Badges</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Desbloqueie medalhas por consistência, leitura, vocabulário e revisões de flashcards.
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-lg border border-jade-border bg-jade-soft text-jade text-xs font-semibold shrink-0">
          {unlocked.length} / {totalTiers} níveis desbloqueados
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BADGE_DEFINITIONS.map((badge) => {
          const IconComp = ICON_MAP[badge.icon] || Award;
          const earnedTiers = badge.tiers.filter((t) =>
            unlockedMap.has(`${badge.id}:${t.tier}`)
          );
          const highestEarned = earnedTiers[earnedTiers.length - 1];

          return (
            <article
              key={badge.id}
              className={`rounded-lg border p-5 flex flex-col gap-3 transition-colors ${
                highestEarned
                  ? "border-jade-border bg-surface"
                  : "border-border bg-surface/60"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      highestEarned
                        ? "bg-jade text-canvas"
                        : "bg-canvas border border-border text-muted"
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted">
                      {badge.category}
                    </div>
                    <h2 className="text-sm font-bold text-ink">{badge.namePt}</h2>
                  </div>
                </div>
                {highestEarned && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-jade-soft text-jade border border-jade-border">
                    {highestEarned.label}
                  </span>
                )}
              </div>

              <div className="space-y-1.5 pt-1">
                {badge.tiers.map((tierDef) => {
                  const unlockedAt = unlockedMap.get(`${badge.id}:${tierDef.tier}`);
                  const isUnlocked = Boolean(unlockedAt);
                  return (
                    <div
                      key={tierDef.tier}
                      className={`px-3 py-2 rounded-md border text-xs flex items-center justify-between gap-2 ${
                        isUnlocked
                          ? "border-jade-border bg-jade-soft/50 text-ink"
                          : "border-border bg-canvas text-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {isUnlocked ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-jade shrink-0" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-muted/60 shrink-0" />
                        )}
                        <span className="truncate">
                          <strong className="font-semibold">{tierDef.label}:</strong>{" "}
                          {tierDef.descriptionPt}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

