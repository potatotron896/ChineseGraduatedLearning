"use client";

import React from "react";
import Link from "next/link";
import { Award, X } from "lucide-react";
import { BADGE_MAP } from "@/data/badges";
import { useUser } from "@/context/UserContext";

export function BadgeToastContainer() {
  const { badgeToasts, dismissBadgeToast } = useUser();

  if (badgeToasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-24 sm:bottom-6 right-4 z-[80] flex flex-col gap-2 max-w-sm w-[calc(100vw-2rem)] pointer-events-none"
      aria-live="polite"
    >
      {badgeToasts.map((b) => {
        const def = BADGE_MAP.get(b.badgeId);
        const tierDef = def?.tiers.find((t) => t.tier === b.tier);
        const key = `${b.badgeId}:${b.tier}`;
        return (
          <div
            key={key}
            className="pointer-events-auto rounded-xl border border-jade-border bg-canvas shadow-lg p-3.5 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="w-9 h-9 rounded-lg bg-jade-soft text-jade flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-jade">
                Conquista Desbloqueada!
              </div>
              <div className="text-sm font-bold text-ink truncate">
                {def?.namePt || b.badgeId}{" "}
                {tierDef ? `(${tierDef.label})` : ""}
              </div>
              {tierDef && (
                <p className="text-xs text-muted mt-0.5 leading-snug">
                  {tierDef.descriptionPt}
                </p>
              )}
              <Link
                href="/conquistas"
                onClick={() => dismissBadgeToast(key)}
                className="inline-block mt-1.5 text-[11px] font-semibold text-jade hover:underline"
              >
                Ver todas as conquistas →
              </Link>
            </div>
            <button
              type="button"
              onClick={() => dismissBadgeToast(key)}
              className="p-1 rounded-md text-muted hover:text-ink hover:bg-surface"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

