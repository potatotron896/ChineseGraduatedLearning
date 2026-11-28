"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  BarChart2,
  BookMarked,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Flame,
  Layers,
  LogOut,
  Menu,
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

type NavItem = {
  href: string;
  label: string;
  drawerSubtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  badgeClass?: string;
};

export function Header() {
  const pathname = usePathname();
  const {
    profile,
    syncStatus,
    telemetrySummary,
    srsDueCount,
    updatePreferences,
    loginOrRegister,
    logout,
  } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const vocabCount = Object.keys(profile.savedVocabulary).length;
  const dailyGoalMinutes = profile.preferences.dailyGoalMinutes ?? 10;
  const todayMinutes = Math.floor((telemetrySummary?.todaySeconds || 0) / 60);
  const goalPct = Math.min(
    100,
    Math.round(((telemetrySummary?.todaySeconds || 0) / (dailyGoalMinutes * 60)) * 100)
  );
  const currentStreak = telemetrySummary?.streak.currentStreak || 0;
  const ringRadius = 11;
  const ringCirc = 2 * Math.PI * ringRadius;
  const ringOffset = ringCirc - (goalPct / 100) * ringCirc;

  const navItems: NavItem[] = [
    {
      href: "/",
      label: "Histórias",
      drawerSubtitle: "Leituras graduadas HSK",
      icon: BookOpen,
    },
    {
      href: "/vocabulario",
      label: "Vocabulário",
      drawerSubtitle: "Palavras salvas",
      icon: BookMarked,
      badge: vocabCount,
      badgeClass: "bg-jade text-canvas",
    },
    {
      href: "/revisar",
      label: "Revisar",
      drawerSubtitle: "Cartões SRS",
      icon: Layers,
      badge: srsDueCount,
      badgeClass: "bg-cinnabar text-canvas",
    },
    {
      href: "/progresso",
      label: "Progresso",
      drawerSubtitle: "Estatísticas e metas",
      icon: BarChart2,
    },
    {
      href: "/conquistas",
      label: "Conquistas",
      drawerSubtitle: "Medalhas desbloqueadas",
      icon: Award,
    },
  ];

  function isNavActive(href: string) {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/stories");
    }
    return pathname === href || pathname.startsWith(href + "/");
  }

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll & close on Escape when mobile drawer is open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Mobile Drawer Trigger + Brand Logo + Desktop Nav */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-6 min-w-0">
            {/* Hamburger Button (Mobile & Tablet < lg) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              className="lg:hidden relative w-10 h-10 -ml-1.5 rounded-md text-ink hover:bg-surface active:bg-surface-elevated transition-colors flex items-center justify-center shrink-0"
            >
              <Menu className="w-5 h-5" />
              {srsDueCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cinnabar ring-2 ring-canvas"
                />
              )}
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none shrink-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-jade text-canvas flex items-center justify-center font-zh-book text-base sm:text-lg font-semibold tracking-tight">
                文
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-ink">
                  WenDu
                </span>
                <span className="text-xs font-zh text-muted hidden sm:inline">
                  文读
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (lg+) */}
            <nav
              aria-label="Navegação principal"
              className="hidden lg:flex items-center gap-1"
            >
              {navItems.map((item) => {
                const active = isNavActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2.5 xl:px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      active
                        ? "bg-jade-soft text-jade font-semibold"
                        : "text-muted hover:text-ink hover:bg-surface"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                    {typeof item.badge === "number" && item.badge > 0 && (
                      <span
                        className={`ml-0.5 px-1.5 py-0.5 text-[10px] font-mono rounded-full leading-none ${
                          item.badgeClass || "bg-jade text-canvas"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Global Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Daily Goal Progress Ring & Streak (Desktop lg+) */}
            <Link
              href="/progresso"
              title={`Meta diária: ${todayMinutes}/${dailyGoalMinutes} min (${goalPct}%)${
                currentStreak > 0 ? ` · Sequência: ${currentStreak} dia(s)` : ""
              }`}
              className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md border border-border bg-surface hover:border-jade transition-colors"
            >
              <svg width="26" height="26" viewBox="0 0 28 28" className="-rotate-90 shrink-0">
                <circle
                  cx="14"
                  cy="14"
                  r={ringRadius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-border"
                />
                <circle
                  cx="14"
                  cy="14"
                  r={ringRadius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={ringCirc}
                  strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                  className={goalPct >= 100 ? "text-jade" : "text-cinnabar"}
                />
              </svg>
              <div className="text-[11px] leading-tight pr-0.5">
                <div className="font-mono font-semibold text-ink">
                  {todayMinutes}/{dailyGoalMinutes}m
                </div>
                {currentStreak > 0 && (
                  <div className="flex items-center gap-0.5 text-[10px] font-semibold text-cinnabar">
                    <Flame className="w-2.5 h-2.5" />
                    <span>{currentStreak}d</span>
                  </div>
                )}
              </div>
            </Link>

            {/* Global 3-Font Quick Switcher (Desktop lg+, labels on xl+) */}
            <div
              className="hidden lg:flex items-center bg-surface border border-border rounded-md p-0.5"
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
                    className={`px-2 xl:px-2.5 py-1 rounded-[5px] text-xs font-medium transition-colors flex items-center gap-1.5 ${
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
                    <span className="hidden xl:inline">
                      {opt.labelPt.replace("Fonte ", "")}
                    </span>
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
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-md border border-border bg-surface text-muted hover:text-ink transition-colors flex items-center justify-center"
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
              <div
                title={
                  syncStatus === "syncing"
                    ? "Sincronizando na nuvem..."
                    : "Progresso sincronizado na nuvem"
                }
                className="flex items-center gap-1 sm:gap-1.5 pl-2 pr-1 h-9 sm:h-8 rounded-md border border-jade-border bg-jade-soft text-jade text-xs font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="max-w-[68px] sm:max-w-[100px] truncate font-semibold">
                  @{profile.username}
                </span>
                <span className="text-[10px] text-muted hidden 2xl:inline">
                  {syncStatus === "syncing" ? "Sincronizando..." : "Sincronizado"}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  title="Sair da conta"
                  aria-label="Sair da conta"
                  className="p-1 rounded hover:bg-canvas/60 text-muted hover:text-ink transition-colors"
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
                className="px-2.5 sm:px-3 h-9 sm:h-8 rounded-md bg-jade text-canvas hover:bg-jade-deep text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Cloud className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden xl:inline">Entrar / Sincronizar</span>
                <span className="xl:hidden">Entrar</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Side Drawer (< lg) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Menu lateral de navegação"
          id="mobile-nav-drawer"
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-ink/45 backdrop-blur-[2px] modal-backdrop-anim"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside className="relative z-10 w-[min(85vw,320px)] h-full bg-canvas border-r border-border shadow-2xl flex flex-col drawer-slide-in">
            {/* Drawer Header */}
            <div className="px-4 h-14 border-b border-border flex items-center justify-between gap-2 shrink-0">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-md bg-jade text-canvas flex items-center justify-center font-zh-book text-base font-semibold">
                  文
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-ink">WenDu</span>
                    <span className="text-xs font-zh text-muted">文读</span>
                  </div>
                  <p className="text-[11px] text-muted leading-none mt-0.5">
                    Leitura Graduada HSK 3.0
                  </p>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Fechar menu"
                className="w-9 h-9 rounded-md text-muted hover:text-ink hover:bg-surface flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Drawer Content */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
              {/* Daily Goal & Streak Summary Card */}
              <Link
                href="/progresso"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-3 rounded-lg border border-border bg-surface hover:border-jade transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <svg width="32" height="32" viewBox="0 0 28 28" className="-rotate-90 shrink-0">
                      <circle
                        cx="14"
                        cy="14"
                        r={ringRadius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-border"
                      />
                      <circle
                        cx="14"
                        cy="14"
                        r={ringRadius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={ringCirc}
                        strokeDashoffset={ringOffset}
                        strokeLinecap="round"
                        className={goalPct >= 100 ? "text-jade" : "text-cinnabar"}
                      />
                    </svg>
                    <div>
                      <div className="text-xs font-semibold text-ink">
                        Meta de Hoje
                      </div>
                      <div className="text-[11px] font-mono text-muted">
                        {todayMinutes} / {dailyGoalMinutes} min ({goalPct}%)
                      </div>
                    </div>
                  </div>
                  {currentStreak > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-cinnabar-soft text-cinnabar text-xs font-semibold">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{currentStreak}d</span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Main Navigation Links */}
              <nav aria-label="Links do menu lateral" className="space-y-1">
                <p className="px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-subtle">
                  Navegação
                </p>
                {navItems.map((item) => {
                  const active = isNavActive(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors min-h-[48px] ${
                        active
                          ? "bg-jade-soft text-jade border border-jade-border/60"
                          : "text-ink hover:bg-surface border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-5 h-5 shrink-0 ${
                            active ? "text-jade" : "text-muted"
                          }`}
                        />
                        <div className="min-w-0">
                          <div
                            className={`text-sm leading-tight ${
                              active ? "font-semibold" : "font-medium"
                            }`}
                          >
                            {item.label}
                          </div>
                          {item.drawerSubtitle && (
                            <div className="text-[11px] text-muted truncate mt-0.5">
                              {item.drawerSubtitle}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {typeof item.badge === "number" && item.badge > 0 && (
                          <span
                            className={`px-2 py-0.5 text-[11px] font-mono font-semibold rounded-full leading-none ${
                              item.badgeClass || "bg-jade text-canvas"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight
                          className={`w-4 h-4 ${
                            active ? "text-jade" : "text-subtle"
                          }`}
                        />
                      </div>
                    </Link>
                  );
                })}
              </nav>

              {/* Chinese Typography Selector */}
              <div className="pt-2 border-t border-border">
                <p className="px-2.5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-subtle">
                  Tipografia Chinesa
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {FONT_OPTIONS.map((opt) => {
                    const active = profile.preferences.zhFont === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updatePreferences({ zhFont: opt.id })}
                        className={`py-2.5 px-2 rounded-lg border text-center transition-colors flex flex-col items-center gap-1 ${
                          active
                            ? "bg-jade-soft border-jade-border text-jade font-semibold"
                            : "bg-surface border-border text-muted hover:text-ink"
                        }`}
                      >
                        <span
                          className={`text-lg leading-none ${
                            opt.id === "app"
                              ? "font-zh-app"
                              : opt.id === "school"
                              ? "font-zh-school"
                              : "font-zh-book"
                          }`}
                        >
                          {opt.sampleZh}
                        </span>
                        <span className="text-[11px] leading-none">
                          {opt.labelPt.replace("Fonte ", "")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer: Cloud Account */}
            <div className="p-3 border-t border-border bg-surface/50 pb-safe shrink-0">
              {profile.username ? (
                <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-jade-border bg-jade-soft">
                  <div className="flex items-center gap-2 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-jade shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-jade truncate">
                        @{profile.username}
                      </div>
                      <div className="text-[10px] text-muted">
                        {syncStatus === "syncing"
                          ? "Sincronizando..."
                          : "Sincronizado na nuvem"}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-2.5 py-1.5 rounded-md border border-jade-border/60 bg-canvas text-xs font-medium text-muted hover:text-ink flex items-center gap-1 shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sair</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthError(null);
                    setAuthOpen(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-jade text-canvas hover:bg-jade-deep text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Cloud className="w-4 h-4" />
                  <span>Entrar / Sincronizar na Nuvem</span>
                </button>
              )}
            </div>
          </aside>
        </div>
      )}

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

