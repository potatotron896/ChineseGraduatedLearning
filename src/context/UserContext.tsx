"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getLocalDayString } from "@/lib/client-day";
import {
  clearGuestLearningQueues,
  ensureGuestCardForWord,
  getGuestSrsQueue,
  getGuestTelemetrySummary,
  loadGuestStore,
  recordGuestEvent,
  recordGuestSession,
} from "@/lib/local-store";
import type {
  ReadingSessionInput,
  TelemetrySummary,
  UnlockedBadge,
  UserEventType,
} from "@/types/learning";
import type {
  ChapterProgress,
  ReaderPreferences,
  SavedVocabularyItem,
  UserProfileData,
} from "@/types/story";

const STORAGE_KEY = "wendu_user_profile_v1";
const SESSION_KEY = "wendu_auth_session_v1";

export const DEFAULT_PREFERENCES: ReaderPreferences = {
  zhFont: "app",
  fontSizeStep: "lg",
  pinyinMode: "on",
  highlightAboveLevel: true,
  audioSpeed: 1.0,
  darkMode: false,
  dailyGoalMinutes: 10,
  srsNewPerDay: 10,
  srsReviewsPerDay: 100,
  srsEnableMeaningToHanzi: false,
};

const DEFAULT_PROFILE: UserProfileData = {
  preferences: DEFAULT_PREFERENCES,
  chapterProgress: {},
  savedVocabulary: {},
  updatedAt: new Date(0).toISOString(),
};

interface AuthSession {
  username: string;
}

interface UserContextValue {
  profile: UserProfileData;
  isHydrated: boolean;
  syncStatus: "idle" | "syncing" | "synced" | "error";
  telemetrySummary: TelemetrySummary | null;
  srsDueCount: number;
  badgeToasts: UnlockedBadge[];
  dismissBadgeToast: (key: string) => void;
  refreshTelemetry: () => Promise<void>;
  refreshSrsDueCount: () => Promise<void>;
  recordEvent: (type: UserEventType, payload?: Record<string, unknown>) => Promise<void>;
  recordReadingSession: (session: ReadingSessionInput, useBeacon?: boolean) => Promise<void>;
  updatePreferences: (patch: Partial<ReaderPreferences>) => void;
  updateChapterProgress: (progress: Omit<ChapterProgress, "updatedAt">) => void;
  toggleVocabularyItem: (item: Omit<SavedVocabularyItem, "addedAt">) => void;
  isWordSaved: (hanzi: string) => boolean;
  loginOrRegister: (
    action: "login" | "register",
    username: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfileData>(DEFAULT_PROFILE);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced" | "error">("idle");
  const [telemetrySummary, setTelemetrySummary] = useState<TelemetrySummary | null>(null);
  const [srsDueCount, setSrsDueCount] = useState(0);
  const [badgeToasts, setBadgeToasts] = useState<UnlockedBadge[]>([]);

  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const profileRef = useRef(profile);
  profileRef.current = profile;
  const sessionRef = useRef(session);
  sessionRef.current = session;

  const pushUnlockedBadges = useCallback((list: UnlockedBadge[] | undefined) => {
    if (!list || list.length === 0) return;
    setBadgeToasts((prev) => {
      const existing = new Set(prev.map((b) => `${b.badgeId}:${b.tier}`));
      const additions = list.filter((b) => !existing.has(`${b.badgeId}:${b.tier}`));
      return additions.length > 0 ? [...prev, ...additions] : prev;
    });
  }, []);

  const dismissBadgeToast = useCallback((key: string) => {
    setBadgeToasts((prev) => prev.filter((b) => `${b.badgeId}:${b.tier}` !== key));
  }, []);

  const refreshTelemetry = useCallback(async () => {
    const today = getLocalDayString();
    const curSession = sessionRef.current;
    const curProfile = profileRef.current;

    if (curSession?.username) {
      try {
        const res = await fetch(`/api/telemetry?today=${encodeURIComponent(today)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.summary) {
            setTelemetrySummary(data.summary);
            return;
          }
        }
      } catch {
        // fallback below if offline
      }
    }

    const guestSummary = getGuestTelemetrySummary(
      curProfile.chapterProgress,
      Object.keys(curProfile.savedVocabulary).length
    );
    setTelemetrySummary(guestSummary);
  }, []);

  const refreshSrsDueCount = useCallback(async () => {
    const today = getLocalDayString();
    const curSession = sessionRef.current;
    const curProfile = profileRef.current;
    const newPerDay = curProfile.preferences.srsNewPerDay ?? 10;
    const reviewsPerDay = curProfile.preferences.srsReviewsPerDay ?? 100;

    if (curSession?.username) {
      try {
        const res = await fetch(
          `/api/srs/queue?today=${encodeURIComponent(today)}&newPerDay=${newPerDay}&reviewsPerDay=${reviewsPerDay}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.stats) {
            setSrsDueCount(data.stats.dueNow || 0);
            return;
          }
        }
      } catch {
        // fallback below
      }
    }

    const { stats } = getGuestSrsQueue(curProfile.savedVocabulary, newPerDay, reviewsPerDay);
    setSrsDueCount(stats.dueNow);
  }, []);

  // Hydrate from localStorage on mount and refresh from server cookie if active
  useEffect(() => {
    let active = true;
    let initialProfile = DEFAULT_PROFILE;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as UserProfileData;
        initialProfile = {
          ...DEFAULT_PROFILE,
          ...parsed,
          preferences: {
            ...DEFAULT_PREFERENCES,
            ...(parsed.preferences || {}),
          },
        };
        setProfile(initialProfile);
      }
      const rawSession = localStorage.getItem(SESSION_KEY);
      if (rawSession) {
        const parsedSession = JSON.parse(rawSession) as { username?: string };
        if (parsedSession?.username) {
          const cleanSession: AuthSession = { username: parsedSession.username };
          setSession(cleanSession);
          sessionRef.current = cleanSession;
          localStorage.setItem(SESSION_KEY, JSON.stringify(cleanSession));
        }
      }
    } catch {
      // ignore corrupted storage
    } finally {
      profileRef.current = initialProfile;
      setIsHydrated(true);
    }

    fetch("/api/auth")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data?.ok || !data.username || !data.profile) return;
        const serverSession: AuthSession = { username: data.username };
        const mergedPrefs = {
          ...DEFAULT_PREFERENCES,
          ...(data.profile.preferences || {}),
        };
        const serverProfile: UserProfileData = {
          ...data.profile,
          preferences: mergedPrefs,
        };
        setSession(serverSession);
        sessionRef.current = serverSession;
        setProfile(serverProfile);
        profileRef.current = serverProfile;
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(serverSession));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(serverProfile));
        } catch {
          // ignore storage quota error
        }
        setSyncStatus("synced");
      })
      .catch(() => {
        // ignore offline/network errors during initial hydration
      })
      .finally(() => {
        if (active) {
          refreshTelemetry();
          refreshSrsDueCount();
        }
      });

    return () => {
      active = false;
    };
  }, [refreshSrsDueCount, refreshTelemetry]);

  // Apply Dark Mode and Chinese Font attribute on documentElement
  useEffect(() => {
    if (!isHydrated) return;
    const root = document.documentElement;
    if (profile.preferences.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.setAttribute("data-zh-font", profile.preferences.zhFont);
  }, [isHydrated, profile.preferences.darkMode, profile.preferences.zhFont]);

  const scheduleCloudSync = useCallback(
    (nextProfile: UserProfileData, activeSession: AuthSession | null) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfile));
      } catch {
        // ignore storage quota error
      }

      if (!activeSession?.username) return;

      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
      setSyncStatus("syncing");
      syncTimeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "sync",
              username: activeSession.username,
              profile: nextProfile,
            }),
          });
          if (res.ok) {
            setSyncStatus("synced");
          } else {
            setSyncStatus("error");
          }
        } catch {
          setSyncStatus("error");
        }
      }, 650);
    },
    []
  );

  const recordEvent = useCallback(
    async (type: UserEventType, payload: Record<string, unknown> = {}) => {
      const event = {
        clientEventId: crypto.randomUUID(),
        type,
        payload,
        occurredAt: new Date().toISOString(),
        clientDay: getLocalDayString(),
      };

      const curSession = sessionRef.current;
      const curProfile = profileRef.current;

      if (curSession?.username) {
        try {
          const res = await fetch("/api/telemetry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ kind: "event", event }),
          });
          if (res.ok) {
            const data = await res.json();
            pushUnlockedBadges(data.newlyUnlocked);
            refreshTelemetry();
            return;
          }
        } catch {
          // fallback to guest store
        }
      }

      const unlocked = recordGuestEvent(
        event,
        curProfile.chapterProgress,
        Object.keys(curProfile.savedVocabulary).length
      );
      pushUnlockedBadges(unlocked);
      refreshTelemetry();
    },
    [pushUnlockedBadges, refreshTelemetry]
  );

  const recordReadingSession = useCallback(
    async (readingSession: ReadingSessionInput, useBeacon = false) => {
      const curSession = sessionRef.current;
      const curProfile = profileRef.current;

      if (curSession?.username) {
        const bodyStr = JSON.stringify({ kind: "session", session: readingSession });
        if (useBeacon && typeof navigator !== "undefined" && "sendBeacon" in navigator) {
          const blob = new Blob([bodyStr], { type: "application/json" });
          navigator.sendBeacon("/api/telemetry", blob);
          return;
        }
        try {
          const res = await fetch("/api/telemetry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: bodyStr,
          });
          if (res.ok) {
            const data = await res.json();
            pushUnlockedBadges(data.newlyUnlocked);
            refreshTelemetry();
            return;
          }
        } catch {
          // fallback below
        }
      }

      const unlocked = recordGuestSession(
        readingSession,
        curProfile.chapterProgress,
        Object.keys(curProfile.savedVocabulary).length
      );
      pushUnlockedBadges(unlocked);
      refreshTelemetry();
    },
    [pushUnlockedBadges, refreshTelemetry]
  );

  const updatePreferences = useCallback(
    (patch: Partial<ReaderPreferences>) => {
      setProfile((prev) => {
        const next: UserProfileData = {
          ...prev,
          preferences: { ...prev.preferences, ...patch },
          updatedAt: new Date().toISOString(),
        };
        scheduleCloudSync(next, session);
        return next;
      });
      if (patch.zhFont) {
        recordEvent("font_changed", { font: patch.zhFont });
      }
    },
    [recordEvent, scheduleCloudSync, session]
  );

  const updateChapterProgress = useCallback(
    (progress: Omit<ChapterProgress, "updatedAt">) => {
      let becameCompleted = false;
      setProfile((prev) => {
        const key = `${progress.storySlug}:${progress.chapterId}`;
        const existing = prev.chapterProgress[key];
        const wasCompleted = Boolean(existing?.completed);
        const nowCompleted = progress.completed || wasCompleted;
        if (!wasCompleted && nowCompleted) {
          becameCompleted = true;
        }
        const next: UserProfileData = {
          ...prev,
          chapterProgress: {
            ...prev.chapterProgress,
            [key]: {
              ...existing,
              ...progress,
              completed: nowCompleted,
              updatedAt: new Date().toISOString(),
            },
          },
          updatedAt: new Date().toISOString(),
        };
        scheduleCloudSync(next, session);
        return next;
      });

      if (becameCompleted) {
        recordEvent("chapter_completed", {
          storySlug: progress.storySlug,
          chapterId: progress.chapterId,
        });
      }
    },
    [recordEvent, scheduleCloudSync, session]
  );

  const toggleVocabularyItem = useCallback(
    (item: Omit<SavedVocabularyItem, "addedAt">) => {
      const currentlySaved = Boolean(profileRef.current.savedVocabulary[item.hanzi]);
      const nowIso = new Date().toISOString();
      const fullItem: SavedVocabularyItem = {
        ...item,
        addedAt: nowIso,
      };

      setProfile((prev) => {
        const nextVocab = { ...prev.savedVocabulary };
        if (nextVocab[item.hanzi]) {
          delete nextVocab[item.hanzi];
        } else {
          nextVocab[item.hanzi] = fullItem;
        }
        const next: UserProfileData = {
          ...prev,
          savedVocabulary: nextVocab,
          updatedAt: nowIso,
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });

      const curSession = sessionRef.current;
      if (curSession?.username) {
        if (currentlySaved) {
          fetch(`/api/vocabulary?hanzi=${encodeURIComponent(item.hanzi)}`, {
            method: "DELETE",
          })
            .then(() => {
              refreshTelemetry();
              refreshSrsDueCount();
            })
            .catch(() => {});
        } else {
          fetch("/api/vocabulary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              item: fullItem,
              clientDay: getLocalDayString(),
              clientEventId: crypto.randomUUID(),
            }),
          })
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
              if (data?.newlyUnlocked) pushUnlockedBadges(data.newlyUnlocked);
              refreshTelemetry();
              refreshSrsDueCount();
            })
            .catch(() => {});
        }
      } else {
        if (!currentlySaved) {
          ensureGuestCardForWord(fullItem);
          recordEvent("word_saved", {
            hanzi: item.hanzi,
            hskLevel: item.hskLevel,
            storySlug: item.storySlug,
          });
        }
        refreshTelemetry();
        refreshSrsDueCount();
      }
    },
    [pushUnlockedBadges, refreshSrsDueCount, refreshTelemetry, recordEvent]
  );

  const isWordSaved = useCallback(
    (hanzi: string) => Boolean(profile.savedVocabulary[hanzi]),
    [profile.savedVocabulary]
  );

  const loginOrRegister = useCallback(
    async (action: "login" | "register", username: string, password: string) => {
      setSyncStatus("syncing");
      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action,
            username,
            password,
            profile,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setSyncStatus("error");
          return { ok: false, error: data.error || "Falha na autenticação." };
        }

        const newSession: AuthSession = { username: data.username };
        setSession(newSession);
        sessionRef.current = newSession;
        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
        setProfile(data.profile);
        profileRef.current = data.profile;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.profile));

        // Merge guest telemetry, cards, and pending reviews idempotently
        const guest = loadGuestStore();
        if (
          guest.sessions.length > 0 ||
          guest.events.length > 0 ||
          Object.keys(guest.cards).length > 0 ||
          guest.pendingReviews.length > 0
        ) {
          try {
            const mergeRes = await fetch("/api/merge", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                sessions: guest.sessions,
                events: guest.events,
                cards: Object.values(guest.cards),
                pendingReviews: guest.pendingReviews,
                today: getLocalDayString(),
              }),
            });
            if (mergeRes.ok) {
              const mergeData = await mergeRes.json();
              pushUnlockedBadges(mergeData.newlyUnlocked);
              clearGuestLearningQueues();
            }
          } catch {
            // ignore non-fatal merge error; pendingReviews remain queued
          }
        }

        setSyncStatus("synced");
        refreshTelemetry();
        refreshSrsDueCount();
        return { ok: true };
      } catch {
        setSyncStatus("error");
        return { ok: false, error: "Erro de conexão ao autenticar." };
      }
    },
    [profile, pushUnlockedBadges, refreshSrsDueCount, refreshTelemetry]
  );

  const logout = useCallback(() => {
    setSession(null);
    sessionRef.current = null;
    localStorage.removeItem(SESSION_KEY);
    setProfile((prev) => {
      const next = { ...prev, username: undefined };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setSyncStatus("idle");
    fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    })
      .finally(() => {
        refreshTelemetry();
        refreshSrsDueCount();
      })
      .catch(() => {
        // ignore network error on logout
      });
  }, [refreshSrsDueCount, refreshTelemetry]);

  return (
    <UserContext.Provider
      value={{
        profile,
        isHydrated,
        syncStatus,
        telemetrySummary,
        srsDueCount,
        badgeToasts,
        dismissBadgeToast,
        refreshTelemetry,
        refreshSrsDueCount,
        recordEvent,
        recordReadingSession,
        updatePreferences,
        updateChapterProgress,
        toggleVocabularyItem,
        isWordSaved,
        loginOrRegister,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}
