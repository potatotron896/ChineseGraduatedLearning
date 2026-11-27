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

// Perceptual curve so 0–100% slider feels natural to human hearing
function toPerceptualGain(volume: number, ducked: boolean): number {
  const clamped = Math.max(0, Math.min(1, volume));
  if (clamped <= 0.001) return 0;
  const baseGain = Math.pow(clamped, 1.5);
  return Math.max(0, Math.min(1, ducked ? baseGain * DUCK_MULTIPLIER : baseGain));
}

type WebkitWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

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
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const webAudioFailedRef = useRef(false);
  const prevDuckedRef = useRef(false);

  const [currentTrackId, setCurrentTrackId] = useState<string>(BGM_TRACKS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNarrationPlaying, setIsNarrationPlaying] = useState(false);

  const volume = profile.preferences.bgmVolume ?? DEFAULT_BGM_VOLUME;
  const autoDuck = profile.preferences.bgmAutoDuck ?? true;
  const isDucked = autoDuck && isNarrationPlaying;

  const currentTrack =
    BGM_TRACKS.find((t) => t.id === currentTrackId) ?? BGM_TRACKS[0];

  const targetGain = toPerceptualGain(volume, isDucked);

  // Lazily wire <audio> through Web Audio API GainNode so volume works on ALL
  // browsers — including iOS Safari / iPadOS where HTMLAudioElement.volume is read-only.
  const ensureAudioGraph = useCallback((initialGain: number) => {
    const audio = audioRef.current;
    if (!audio || webAudioFailedRef.current) return false;

    if (audioCtxRef.current && gainNodeRef.current) {
      if (audioCtxRef.current.state !== "running") {
        audioCtxRef.current.resume().catch(() => {});
      }
      return true;
    }

    try {
      const AudioCtx =
        window.AudioContext || (window as WebkitWindow).webkitAudioContext;
      if (!AudioCtx) {
        webAudioFailedRef.current = true;
        return false;
      }

      const ctx = new AudioCtx();
      const source = ctx.createMediaElementSource(audio);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(initialGain, ctx.currentTime);

      source.connect(gain);
      gain.connect(ctx.destination);

      // Let GainNode be the single source of truth for volume
      audio.volume = 1;

      audioCtxRef.current = ctx;
      sourceNodeRef.current = source;
      gainNodeRef.current = gain;

      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      return true;
    } catch {
      webAudioFailedRef.current = true;
      return false;
    }
  }, []);

  const applyGain = useCallback((nextGain: number, smoothDuck: boolean) => {
    const audio = audioRef.current;
    const clamped = Math.max(0, Math.min(1, nextGain));

    if (audio) {
      audio.muted = clamped <= 0.0001;
    }

    const ctx = audioCtxRef.current;
    const gainNode = gainNodeRef.current;

    if (ctx && gainNode) {
      const now = ctx.currentTime;
      gainNode.gain.cancelScheduledValues(now);
      if (smoothDuck) {
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(clamped, now + 0.22);
      } else {
        // Short 15ms smoothing prevents zipper noise while feeling instant during slider drag
        gainNode.gain.setTargetAtTime(clamped, now, 0.015);
      }
      return;
    }

    // Fallback for environments without Web Audio API
    if (audio) {
      try {
        audio.volume = clamped;
      } catch {
        // Ignore on platforms where HTMLMediaElement.volume is read-only
      }
    }
  }, []);

  // Sync audio gain whenever volume or ducking state changes
  useEffect(() => {
    const duckingChanged = prevDuckedRef.current !== isDucked;
    prevDuckedRef.current = isDucked;
    applyGain(targetGain, duckingChanged);
  }, [targetGain, isDucked, applyGain]);

  // Clean up AudioContext on provider unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
      audioCtxRef.current = null;
      sourceNodeRef.current = null;
      gainNodeRef.current = null;
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      ensureAudioGraph(targetGain);
      applyGain(targetGain, false);
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [ensureAudioGraph, applyGain, targetGain]);

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
          ensureAudioGraph(targetGain);
          applyGain(targetGain, false);
          audio.play().catch(() => {});
        }
      });
    },
    [currentTrackId, isPlaying, ensureAudioGraph, applyGain, targetGain]
  );

  const setVolume = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(1, Math.round(next * 100) / 100));
      const nextGain = toPerceptualGain(clamped, isDucked);
      if (audioRef.current && !audioRef.current.paused) {
        ensureAudioGraph(nextGain);
      }
      applyGain(nextGain, false);
      updatePreferences({ bgmVolume: clamped });
    },
    [isDucked, ensureAudioGraph, applyGain, updatePreferences]
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

