"use client";

import React, { useEffect, useRef, useState } from "react";
import { Music, Pause, Play, SlidersHorizontal, Volume2, VolumeX } from "lucide-react";
import { useBackgroundMusic } from "@/context/BackgroundMusicContext";

export function BackgroundMusicPlayer() {
  const {
    tracks,
    currentTrack,
    isPlaying,
    volume,
    autoDuck,
    isNarrationPlaying,
    togglePlay,
    selectTrack,
    setVolume,
    setAutoDuck,
  } = useBackgroundMusic();

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close popover on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const volumePercent = Math.round(volume * 100);

  return (
    <div ref={containerRef} className="relative flex items-center">
      {/* Compact Header Control: 1-click Play/Pause + Popover Trigger */}
      <div
        className={`flex items-center rounded-md border transition-colors ${
          isPlaying
            ? "bg-jade-soft border-jade-border text-jade"
            : "bg-surface border-border text-muted hover:text-ink"
        }`}
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausar trilha sonora" : "Tocar trilha sonora"}
          title={
            isPlaying
              ? `Pausar trilha (${currentTrack.titlePt})`
              : `Ouvir trilha de fundo (${currentTrack.titlePt})`
          }
          className="h-9 sm:h-8 px-2 sm:px-2.5 flex items-center gap-1.5 text-xs font-medium rounded-l-md hover:opacity-85 transition-opacity"
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 shrink-0 fill-current" />
          ) : (
            <Music className="w-3.5 h-3.5 shrink-0" />
          )}
          <span className="hidden lg:inline">
            {isPlaying ? currentTrack.titlePt : "Trilha"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Configurar trilha sonora"
          aria-expanded={open}
          title="Volume e opções da trilha sonora"
          className={`h-9 sm:h-8 px-1.5 flex items-center justify-center border-l rounded-r-md transition-colors ${
            isPlaying
              ? "border-jade-border/70 hover:bg-jade/10"
              : "border-border hover:bg-canvas/60"
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Popover Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Controles da trilha sonora"
          className="absolute right-0 top-full mt-2 w-72 rounded-lg border border-border bg-canvas shadow-lg p-3.5 z-50"
        >
          <div className="flex items-start justify-between gap-2 pb-3 border-b border-border">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-ink truncate">
                  {currentTrack.titlePt}
                </span>
                <span className="text-[11px] font-zh text-muted shrink-0">
                  {currentTrack.titleZh}
                </span>
              </div>
              <p className="text-[11px] text-muted mt-0.5">
                {currentTrack.subtitlePt}
              </p>
            </div>

            <button
              type="button"
              onClick={togglePlay}
              className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                isPlaying
                  ? "bg-jade text-canvas hover:bg-jade-deep"
                  : "bg-surface border border-border text-ink hover:bg-jade-soft hover:text-jade"
              }`}
              aria-label={isPlaying ? "Pausar trilha" : "Tocar trilha"}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>
          </div>

          {/* Track selector (shown when multiple tracks exist) */}
          {tracks.length > 1 && (
            <div className="py-2.5 border-b border-border space-y-1">
              <p className="text-[11px] font-medium text-muted mb-1">Faixas</p>
              {tracks.map((track) => {
                const selected = track.id === currentTrack.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => selectTrack(track.id)}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                      selected
                        ? "bg-jade-soft text-jade font-semibold"
                        : "text-ink hover:bg-surface"
                    }`}
                  >
                    <span>{track.titlePt}</span>
                    <span className="font-zh text-[11px] text-muted">
                      {track.titleZh}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Volume Control */}
          <div className="pt-3 space-y-3">
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="font-medium text-muted flex items-center gap-1.5">
                  {volumePercent === 0 ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                  Volume da trilha
                </span>
                <span className="font-mono text-ink font-medium">
                  {volumePercent}%
                  {autoDuck && isNarrationPlaying && isPlaying ? " (reduzido)" : ""}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={volumePercent}
                onChange={(e) => setVolume(Number(e.target.value) / 100)}
                aria-label="Volume da trilha sonora"
                className="w-full accent-[var(--color-jade)] cursor-pointer h-1.5 rounded-lg"
              />
            </div>

            {/* Auto-ducking toggle */}
            <label className="flex items-start gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoDuck}
                onChange={(e) => setAutoDuck(e.target.checked)}
                className="mt-0.5 rounded border-border accent-[var(--color-jade)] cursor-pointer"
              />
              <span className="text-[11px] leading-snug text-muted">
                Abaixar automaticamente quando a narração da história estiver tocando
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
