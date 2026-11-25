"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookMarked,
  BookOpen,
  CheckCircle2,
  Cloud,
  LogOut,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { BackgroundMusicPlayer } from "@/components/BackgroundMusicPlayer";
import type { ChineseFontMode } from "@/types/story";

const FONT_OPTIONS: { id: ChineseFontMode; labelPt: string; sampleZh: string; descPt: string }[] = [
  { id: "app", labelPt: "Fonte App", sampleZh: "文", descPt: "Sans moderna" },
  { id: "school", labelPt: "Fonte Escola", sampleZh: "文", descPt: "Kaiti caligráfica" },
  { id: "book", labelPt: "Fonte Livro", sampleZh: "文", descPt: "Songti impressa" },
];

export function Header() {
  const pathname = usePathname();
  const { profile, syncStatus, updatePreferences, loginOrRegister, logout } = useUser();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const vocabCount = Object.keys(profile.savedVocabulary).length;

  async function handleAuthSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setSubmitting(true);
    const res = await loginOrRegister(authMode, username, password);
    setSubmitting(false);
    if (!res.ok) {
      setAuthError(res.error || "Erro ao autenticar.");
      return;
    }
    setAuthOpen(false);
    setPassword("");
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-canvas/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Brand Logo & Navigation */}
          <div className="flex items-center gap-2 sm:gap-6 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none shrink-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-jade text-canvas flex items-center justify-center font-zh-book text-base sm:text-lg font-semibold tracking-tight">
                文
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm sm:text-base tracking-tight text-ink">
                    WenDu
                  </span>
                  <span className="text-xs font-zh text-muted hidden xs:inline sm:inline">
                    文读
                  </span>
                </div>
                <p className="text-[11px] text-muted hidden sm:block leading-none">
                  Leitura Graduada HSK 3.0
                </p>
              </div>
            </Link>

            <nav className="flex items-center gap-1">
              <Link
                href="/"
                className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-0 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  pathname === "/"
                    ? "bg-jade-soft text-jade font-semibold"
                    : "text-muted hover:text-ink hover:bg-surface"
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Histórias</span>
              </Link>
              <Link
                href="/vocabulario"
                className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-0 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  pathname === "/vocabulario"
                    ? "bg-jade-soft text-jade font-semibold"
                    : "text-muted hover:text-ink hover:bg-surface"
                }`}
              >
                <BookMarked className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Meu Vocabulário</span>
                <span className="sm:hidden">Vocab.</span>
                {vocabCount > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-mono rounded-full bg-jade text-canvas leading-none">
                    {vocabCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>

          {/* Global Controls: 3-Font Switcher, Dark Mode, Cloud Account */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Global 3-Font Quick Switcher */}
            <div
              className="hidden md:flex items-center bg-surface border border-border rounded-md p-0.5"
              role="group"
              aria-label="Selecionar tipografia chinesa"
            >
              {FONT_OPTIONS.map((opt) => {
                const active = profile.preferences.zhFont === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => updatePreferences({ zhFont: opt.id })}
                    title={`${opt.labelPt}: ${opt.descPt}`}
                    className={`px-2.5 py-1 rounded-[5px] text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      active
                        ? "bg-jade text-canvas shadow-sm"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    <span
                      className={
                        opt.id === "app"
                          ? "font-zh-app text-sm"
                          : opt.id === "school"
                          ? "font-zh-school text-sm"
                          : "font-zh-book text-sm"
                      }
                    >
                      {opt.sampleZh}
                    </span>
                    <span>{opt.labelPt.replace("Fonte ", "")}</span>
                  </button>
                );
              })}
            </div>

            {/* Background Music Player */}
            <BackgroundMusicPlayer />

            {/* Theme toggle */}
            <button
              type="button"
              onClick={() =>
                updatePreferences({ darkMode: !profile.preferences.darkMode })
              }
              className="w-9 h-9 sm:w-auto sm:h-auto sm:p-2 rounded-md border border-border bg-surface text-muted hover:text-ink transition-colors flex items-center justify-center"
              aria-label={
                profile.preferences.darkMode
                  ? "Ativar modo claro"
                  : "Ativar modo noturno"
              }
              title={
                profile.preferences.darkMode ? "Modo Claro" : "Modo Noturno"
              }
            >
              {profile.preferences.darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Account / Cloud Sync Button */}
            {profile.username ? (
              <div className="flex items-center gap-1 sm:gap-1.5 pl-2 pr-1 py-1 rounded-md border border-jade-border bg-jade-soft text-jade text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="max-w-[72px] sm:max-w-[110px] truncate font-semibold">
                  @{profile.username}
                </span>
                <span className="text-[10px] text-muted hidden lg:inline">
                  {syncStatus === "syncing" ? "Sincronizando..." : "Sincronizado"}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  title="Sair da conta"
                  aria-label="Sair da conta"
                  className="p-1.5 rounded hover:bg-canvas/60 text-muted hover:text-ink transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthError(null);
                  setAuthOpen(true);
                }}
                className="px-2.5 sm:px-3 h-9 sm:h-auto sm:py-1.5 rounded-md bg-jade text-canvas hover:bg-jade-deep text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Cloud className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Entrar / Sincronizar</span>
                <span className="sm:hidden">Entrar</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Simple Login / Register Modal (Vercel Blob + LocalStorage) */}
      {authOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          <div className="w-full sm:max-w-md rounded-t-2xl sm:rounded-lg bg-canvas border-t sm:border border-border p-5 sm:p-6 shadow-lg pb-safe modal-sheet-anim">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2
                  id="auth-modal-title"
                  className="text-base sm:text-lg font-semibold text-ink flex items-center gap-2"
                >
                  <User className="w-5 h-5 text-jade shrink-0" />
                  <span>Sincronizar Progresso na Nuvem</span>
                </h2>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Acesse seu histórico de capítulos, preferências de fonte e
                  vocabulário salvo em qualquer computador ou celular.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAuthOpen(false)}
                className="w-9 h-9 rounded-md text-muted hover:text-ink hover:bg-surface flex items-center justify-center shrink-0"
                aria-label="Fechar janela de login"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1 p-1 rounded-md bg-surface border border-border mb-4">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setAuthError(null);
                }}
                className={`py-2 text-xs font-semibold rounded-[5px] transition-colors ${
                  authMode === "login"
                    ? "bg-jade text-canvas"
                    : "text-muted hover:text-ink"
                }`}
              >
                Já tenho conta
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("register");
                  setAuthError(null);
                }}
                className={`py-2 text-xs font-semibold rounded-[5px] transition-colors ${
                  authMode === "register"
                    ? "bg-jade text-canvas"
                    : "text-muted hover:text-ink"
                }`}
              >
                Criar nova conta
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              <div>
                <label
                  htmlFor="auth-username"
                  className="block text-xs font-semibold text-ink mb-1"
                >
                  Nome de usuário
                </label>
                <input
                  id="auth-username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ex: marlo"
                  className="w-full px-3 py-2.5 rounded-md border border-border bg-surface text-base sm:text-sm text-ink placeholder:text-muted focus:outline-none focus:border-jade"
                />
              </div>

              <div>
                <label
                  htmlFor="auth-password"
                  className="block text-xs font-semibold text-ink mb-1"
                >
                  Senha
                </label>
                <input
                  id="auth-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo de 4 caracteres"
                  className="w-full px-3 py-2.5 rounded-md border border-border bg-surface text-base sm:text-sm text-ink placeholder:text-muted focus:outline-none focus:border-jade"
                />
              </div>

              {authError && (
                <div className="p-2.5 rounded-md bg-cinnabar-soft border border-cinnabar-border text-xs text-cinnabar font-medium">
                  {authError}
                </div>
              )}

              <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAuthOpen(false)}
                  className="px-3.5 py-2.5 sm:py-2 rounded-md border border-border text-xs font-medium text-muted hover:text-ink"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2.5 sm:py-2 rounded-md bg-jade text-canvas hover:bg-jade-deep text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  {submitting
                    ? "Sincronizando..."
                    : authMode === "login"
                    ? "Entrar e Sincronizar"
                    : "Criar Conta e Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

