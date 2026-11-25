"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUser } from "@/context/UserContext";

export interface BgmTrack {
  id: string;
  titlePt: string;
  titleZh: string;
  subtitlePt: string;
  src: string;
}

export const BGM_TRACKS: BgmTrack[] = [
  {
    id: "trilha-classica",
    titlePt: "Brisa Clássica",
    titleZh: "古风雅韵",
    subtitlePt: "Instrumental chinês suave",
    src: "/audio/bgm/trilha-classica.mp3",
  },
];

const DEFAULT_BGM_VOLUME = 0.22;
const DUCK_MULTIPLIER = 0.25;

interface BackgroundMusicContextValue {
  tracks: BgmTrack[];
  currentTrack: BgmTrack;
  isPlaying: boolean;
  volume: number;
  autoDuck: boolean;
  isNarrationPlaying: boolean;
  togglePlay: () => void;
  selectTrack: (trackId: string) => void;
  setVolume: (volume: number) => void;
  setAutoDuck: (enabled: boolean) => void;
  setNarrationPlaying: (playing: boolean) => void;
}

const BackgroundMusicContext = createContext<BackgroundMusicContextValue | null>(null);

export function BackgroundMusicProvider({ children }: { children: React.ReactNode }) {
  const { profile, updatePreferences } = useUser();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number | null>(null);

  const [currentTrackId, setCurrentTrackId] = useState<string>(BGM_TRACKS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNarrationPlaying, setIsNarrationPlaying] = useState(false);

  const volume = profile.preferences.bgmVolume ?? DEFAULT_BGM_VOLUME;
  const autoDuck = profile.preferences.bgmAutoDuck ?? true;

  const currentTrack =
    BGM_TRACKS.find((t) => t.id === currentTrackId) ?? BGM_TRACKS[0];

  const targetVolume =
    autoDuck && isNarrationPlaying ? volume * DUCK_MULTIPLIER : volume;

  // Smoothly ramp audio element volume when targetVolume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeRafRef.current !== null) {
      cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }

    const startVol = audio.volume;
    const endVol = Math.max(0, Math.min(1, targetVolume));
    if (Math.abs(startVol - endVol) < 0.005) {
      audio.volume = endVol;
      return;
    }

    const durationMs = 240;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / durationMs);
      audio.volume = startVol + (endVol - startVol) * progress;
      if (progress < 1) {
        fadeRafRef.current = requestAnimationFrame(step);
      } else {
        fadeRafRef.current = null;
      }
    };

    fadeRafRef.current = requestAnimationFrame(step);

    return () => {
      if (fadeRafRef.current !== null) {
        cancelAnimationFrame(fadeRafRef.current);
        fadeRafRef.current = null;
      }
    };
  }, [targetVolume]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.volume = Math.max(0, Math.min(1, targetVolume));
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [targetVolume]);

  const selectTrack = useCallback(
    (trackId: string) => {
      if (trackId === currentTrackId) return;
      const wasPlaying = isPlaying;
      setCurrentTrackId(trackId);
      requestAnimationFrame(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.load();
        if (wasPlaying) {
          audio.volume = Math.max(0, Math.min(1, targetVolume));
          audio.play().catch(() => {});
        }
      });
    },
    [currentTrackId, isPlaying, targetVolume]
  );

  const setVolume = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(1, Math.round(next * 100) / 100));
      updatePreferences({ bgmVolume: clamped });
    },
    [updatePreferences]
  );

  const setAutoDuck = useCallback(
    (enabled: boolean) => {
      updatePreferences({ bgmAutoDuck: enabled });
    },
    [updatePreferences]
  );

  return (
    <BackgroundMusicContext.Provider
      value={{
        tracks: BGM_TRACKS,
        currentTrack,
        isPlaying,
        volume,
        autoDuck,
        isNarrationPlaying,
        togglePlay,
        selectTrack,
        setVolume,
        setAutoDuck,
        setNarrationPlaying: setIsNarrationPlaying,
      }}
    >
      <audio
        ref={audioRef}
        src={currentTrack.src}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      {children}
    </BackgroundMusicContext.Provider>
  );
}

export function useBackgroundMusic() {
  const ctx = useContext(BackgroundMusicContext);
  if (!ctx) {
    throw new Error("useBackgroundMusic must be used within BackgroundMusicProvider");
  }
  return ctx;
}

