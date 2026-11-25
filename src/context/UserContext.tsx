"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
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
};

const DEFAULT_PROFILE: UserProfileData = {
  preferences: DEFAULT_PREFERENCES,
  chapterProgress: {},
  savedVocabulary: {},
  updatedAt: new Date(0).toISOString(),
};

interface AuthSession {
  username: string;
  password?: string;
}

interface UserContextValue {
  profile: UserProfileData;
  isHydrated: boolean;
  syncStatus: "idle" | "syncing" | "synced" | "error";
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
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as UserProfileData;
        setProfile({
          ...DEFAULT_PROFILE,
          ...parsed,
          preferences: {
            ...DEFAULT_PREFERENCES,
            ...(parsed.preferences || {}),
          },
        });
      }
      const rawSession = localStorage.getItem(SESSION_KEY);
      if (rawSession) {
        const parsedSession = JSON.parse(rawSession) as AuthSession;
        setSession(parsedSession);
      }
    } catch {
      // ignore corrupted storage
    } finally {
      setIsHydrated(true);
    }
  }, []);

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
              password: activeSession.password,
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
    },
    [scheduleCloudSync, session]
  );

  const updateChapterProgress = useCallback(
    (progress: Omit<ChapterProgress, "updatedAt">) => {
      setProfile((prev) => {
        const key = `${progress.storySlug}:${progress.chapterId}`;
        const existing = prev.chapterProgress[key];
        const next: UserProfileData = {
          ...prev,
          chapterProgress: {
            ...prev.chapterProgress,
            [key]: {
              ...existing,
              ...progress,
              completed: progress.completed || existing?.completed || false,
              updatedAt: new Date().toISOString(),
            },
          },
          updatedAt: new Date().toISOString(),
        };
        scheduleCloudSync(next, session);
        return next;
      });
    },
    [scheduleCloudSync, session]
  );

  const toggleVocabularyItem = useCallback(
    (item: Omit<SavedVocabularyItem, "addedAt">) => {
      setProfile((prev) => {
        const nextVocab = { ...prev.savedVocabulary };
        if (nextVocab[item.hanzi]) {
          delete nextVocab[item.hanzi];
        } else {
          nextVocab[item.hanzi] = {
            ...item,
            addedAt: new Date().toISOString(),
          };
        }
        const next: UserProfileData = {
          ...prev,
          savedVocabulary: nextVocab,
          updatedAt: new Date().toISOString(),
        };
        scheduleCloudSync(next, session);
        return next;
      });
    },
    [scheduleCloudSync, session]
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

        const newSession: AuthSession = { username: data.username, password };
        setSession(newSession);
        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
        setProfile(data.profile);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.profile));
        setSyncStatus("synced");
        return { ok: true };
      } catch {
        setSyncStatus("error");
        return { ok: false, error: "Erro de conexão ao autenticar." };
      }
    },
    [profile]
  );

  const logout = useCallback(() => {
    setSession(null);
    localStorage.removeItem(SESSION_KEY);
    setProfile((prev) => {
      const next = { ...prev, username: undefined };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setSyncStatus("idle");
  }, []);

  return (
    <UserContext.Provider
      value={{
        profile,
        isHydrated,
        syncStatus,
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

