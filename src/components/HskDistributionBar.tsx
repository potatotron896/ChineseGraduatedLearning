"use client";

import React from "react";
import type { HskDistributionItem, HskLevel } from "@/types/story";

const HSK_COLOR_MAP: Record<number, { bar: string; badge: string; dot: string }> = {
  1: {
    bar: "bg-jade",
    badge: "bg-jade-soft text-jade border-jade-border",
    dot: "bg-jade",
  },
  2: {
    bar: "bg-ginkgo",
    badge: "bg-ginkgo-soft text-ink border-ginkgo/40",
    dot: "bg-ginkgo",
  },
  3: {
    bar: "bg-cinnabar",
    badge: "bg-cinnabar-soft text-cinnabar border-cinnabar-border",
    dot: "bg-cinnabar",
  },
};

export function getHskStyle(level: HskLevel | number) {
  return (
    HSK_COLOR_MAP[level] || {
      bar: "bg-muted",
      badge: "bg-surface-elevated text-ink border-border",
      dot: "bg-muted",
    }
  );
}

interface HskDistributionBarProps {
  distribution: HskDistributionItem[];
  compact?: boolean;
  showLegend?: boolean;
}

export function HskDistributionBar({
  distribution,
  compact = false,
  showLegend = true,
}: HskDistributionBarProps) {
  return (
    <div className="w-full">
      <div
        className={`w-full overflow-hidden rounded-full bg-surface-elevated border border-border flex ${
          compact ? "h-2" : "h-3"
        }`}
        role="img"
        aria-label="Distribuição percentual de níveis HSK 3.0"
      >
        {distribution.map((item) => {
          const style = getHskStyle(item.level);
          return (
            <div
              key={item.level}
              style={{ width: `${Math.max(4, item.percentage)}%` }}
              className={`${style.bar} transition-all duration-200 first:rounded-l-full last:rounded-r-full border-r border-canvas/40 last:border-r-0`}
              title={`HSK ${item.level}: ${item.percentage}% (${item.count} palavras)`}
            />
          );
        })}
      </div>

      {showLegend && (
        <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 ${compact ? "mt-1.5" : "mt-2.5"}`}>
          {distribution.map((item) => {
            const style = getHskStyle(item.level);
            return (
              <div
                key={item.level}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted"
              >
                <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                <span className="text-ink font-semibold">HSK {item.level}:</span>
                <span className="font-mono">{item.percentage}%</span>
                {!compact && (
                  <span className="text-subtle">({item.count} palavras)</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

