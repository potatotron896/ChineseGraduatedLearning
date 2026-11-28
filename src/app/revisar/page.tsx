"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Layers,
  PauseCircle,
  RotateCcw,
  Settings2,
  StickyNote,
  Volume2,
  X,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { WORD_LEXICON } from "@/data/word-lexicon";
import { ColoredPinyin } from "@/components/ColoredPinyin";
import { getHskStyle } from "@/components/HskDistributionBar";
import { getLocalDayString } from "@/lib/client-day";
import { previewFsrsIntervals } from "@/lib/fsrs-engine";
import {
  getGuestSrsQueue,
  loadGuestStore,
  reviewGuestCard,
  saveGuestStore,
  updateGuestCardAction,
} from "@/lib/local-store";
import type { FSRSRatingNum, SrsCard, SrsReviewQueueItem, SrsStats } from "@/types/learning";
import type { HskLevel } from "@/types/story";

type CardDisplayMode = "mixed" | "recognition" | "cloze" | "production";

export default function ReviewPage() {
  const {
    profile,
    updatePreferences,
    refreshTelemetry,
    refreshSrsDueCount,
  } = useUser();

  const newPerDay = profile.preferences.srsNewPerDay ?? 10;
  const reviewsPerDay = profile.preferences.srsReviewsPerDay ?? 100;
  const enableProduction = profile.preferences.srsEnableMeaningToHanzi ?? false;

  const [queue, setQueue] = useState<SrsCard[]>([]);
  const [stats, setStats] = useState<SrsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [mode, setMode] = useState<CardDisplayMode>("mixed");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");
  const [pendingSyncCount, setPendingSyncCount] = useState(0);

  const cardShownAtRef = useRef<number>(Date.now());

  const loadQueue = useCallback(async () => {
    setLoading(true);
    const today = getLocalDayString();

    if (profile.username) {
      try {
        const res = await fetch(
          `/api/srs/queue?today=${encodeURIComponent(today)}&newPerDay=${newPerDay}&reviewsPerDay=${reviewsPerDay}`
        );
        if (res.ok) {
          const data = await res.json();
          setQueue(data.cards || []);
          setStats(data.stats || null);
          setLoading(false);
          cardShownAtRef.current = Date.now();
          return;
        }
      } catch {
        // fallback to local store if offline
      }
    }

    const local = getGuestSrsQueue(profile.savedVocabulary, newPerDay, reviewsPerDay);
    setQueue(local.cards);
    setStats(local.stats);
    setPendingSyncCount(loadGuestStore().pendingReviews.length);
    setLoading(false);
    cardShownAtRef.current = Date.now();
  }, [newPerDay, profile.savedVocabulary, profile.username, reviewsPerDay]);

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  // Flush offline review queue when logged in
  const flushPendingReviews = useCallback(async () => {
    if (!profile.username) return;
    const store = loadGuestStore();
    if (store.pendingReviews.length === 0) {
      setPendingSyncCount(0);
      return;
    }
    try {
      const res = await fetch("/api/srs/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviews: store.pendingReviews,
          today: getLocalDayString(),
        }),
      });
      if (res.ok) {
        store.pendingReviews = [];
        saveGuestStore(store);
        setPendingSyncCount(0);
        refreshTelemetry();
        refreshSrsDueCount();
      }
    } catch {
      // still offline
    }
  }, [profile.username, refreshSrsDueCount, refreshTelemetry]);

  useEffect(() => {
    flushPendingReviews();
    const onOnline = () => flushPendingReviews();
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [flushPendingReviews]);

  const currentCard = queue[0] || null;

  // Resolve content from WORD_LEXICON first, fallback to card.snapshot / savedVocabulary
  const cardContent = useMemo(() => {
    if (!currentCard) return null;
    const lex = WORD_LEXICON[currentCard.hanzi];
    const snap = currentCard.snapshot;
    const saved = profile.savedVocabulary[currentCard.hanzi];
    return {
      hanzi: currentCard.hanzi,
      pinyin: lex?.pinyin || snap?.pinyin || saved?.pinyin || "",
      meaningPt: lex?.meaningPt || snap?.meaningPt || saved?.meaningPt || "",
      compoundLogicPt:
        lex?.compoundLogicPt || snap?.compoundLogicPt || saved?.compoundLogicPt || "",
      hskLevel: (lex?.hskLevel || snap?.hskLevel || saved?.hskLevel || 1) as HskLevel,
      storyTitlePt: snap?.storyTitlePt || saved?.storyTitlePt || "",
      exampleSentenceZh: currentCard.exampleSentenceZh || saved?.exampleSentenceZh || null,
      exampleSentencePt: currentCard.exampleSentencePt || saved?.exampleSentencePt || null,
    };
  }, [currentCard, profile.savedVocabulary]);

  const effectiveMode = useMemo(() => {
    if (!currentCard || !cardContent) return "recognition";
    if (mode === "recognition") return "recognition";
    if (mode === "cloze") {
      return cardContent.exampleSentenceZh ? "cloze" : "recognition";
    }
    if (mode === "production") return "production";
    // mixed: prefer cloze if sentence exists, else production (if enabled and reps > 1), else recognition
    if (cardContent.exampleSentenceZh) return "cloze";
    if (enableProduction && currentCard.reps > 1) return "production";
    return "recognition";
  }, [cardContent, currentCard, enableProduction, mode]);

  const intervals = useMemo(() => {
    if (!currentCard) return null;
    return previewFsrsIntervals(currentCard, new Date());
  }, [currentCard]);

  function speakText(text: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "zh-CN";
      utter.rate = 0.85;
      window.speechSynthesis.speak(utter);
    }
  }

  const handleRate = useCallback(
    async (rating: FSRSRatingNum) => {
      if (!currentCard) return;
      const durationMs = Math.max(0, Date.now() - cardShownAtRef.current);
      const nowIso = new Date().toISOString();
      const clientDay = getLocalDayString();

      // Advance UI immediately (optimistic & offline-first)
      setQueue((prev) => prev.slice(1));
      setRevealed(false);
      setNoteOpen(false);
      cardShownAtRef.current = Date.now();

      setStats((prev) =>
        prev
          ? {
              ...prev,
              dueNow: Math.max(0, prev.dueNow - 1),
              reviewedToday: prev.reviewedToday + 1,
            }
          : prev
      );

      if (profile.username) {
        const item: SrsReviewQueueItem = {
          clientEventId: crypto.randomUUID(),
          cardId: currentCard.id,
          hanzi: currentCard.hanzi,
          rating,
          durationMs,
          reviewedAt: nowIso,
          clientDay,
        };
        try {
          const res = await fetch("/api/srs/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reviews: [item], today: clientDay }),
          });
          if (!res.ok) throw new Error("offline");
          refreshTelemetry();
          refreshSrsDueCount();
        } catch {
          // Queue offline for later sync
          const store = loadGuestStore();
          store.pendingReviews.push(item);
          saveGuestStore(store);
          setPendingSyncCount(store.pendingReviews.length);
        }
      } else {
        reviewGuestCard(
          currentCard.hanzi,
          rating,
          durationMs,
          profile.chapterProgress,
          Object.keys(profile.savedVocabulary).length
        );
        refreshTelemetry();
        refreshSrsDueCount();
      }
    },
    [
      currentCard,
      profile.chapterProgress,
      profile.savedVocabulary,
      profile.username,
      refreshSrsDueCount,
      refreshTelemetry,
    ]
  );

  const handleCardAction = async (
    action: "suspend" | "bury" | "reset" | "note",
    noteText?: string
  ) => {
    if (!currentCard) return;
    if (action === "suspend" || action === "bury") {
      setQueue((prev) => prev.slice(1));
      setRevealed(false);
    }
    if (action === "note") {
      setQueue((prev) =>
        prev.map((c, idx) => (idx === 0 ? { ...c, note: noteText ?? null } : c))
      );
      setNoteOpen(false);
    }
    if (action === "reset") {
      setRevealed(false);
    }

    if (profile.username) {
      await fetch(`/api/srs/cards/${currentCard.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          note: noteText,
          today: getLocalDayString(),
        }),
      }).catch(() => {});
    } else {
      updateGuestCardAction(currentCard.hanzi, action, noteText);
    }
    refreshSrsDueCount();
  };

  // Keyboard shortcuts: Space/Enter to reveal, 1-4 to rate
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (noteOpen || settingsOpen) return;
      if (!currentCard) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (!revealed && (e.code === "Space" || e.key === "Enter")) {
        e.preventDefault();
        setRevealed(true);
        return;
      }
      if (revealed) {
        if (e.key === "1") handleRate(1);
        if (e.key === "2") handleRate(2);
        if (e.key === "3") handleRate(3);
        if (e.key === "4") handleRate(4);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentCard, handleRate, noteOpen, revealed, settingsOpen]);

  const clozeMaskedSentence = useMemo(() => {
    if (!cardContent?.exampleSentenceZh) return null;
    return cardContent.exampleSentenceZh.split(cardContent.hanzi).join(" [ ___ ] ");
  }, [cardContent]);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-jade hover:underline mb-2 py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para as Histórias</span>
          </Link>
          <h1 className="text-xl sm:text-3xl font-bold text-ink flex items-center gap-2.5">
            <Layers className="w-6 h-6 sm:w-7 sm:h-7 text-jade shrink-0" />
            <span>Revisão Espaçada (FSRS)</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            {stats
              ? `${queue.length} pendentes agora · ${stats.reviewedToday} revisados hoje · ${stats.totalCards} cards no baralho`
              : "Carregando seu baralho..."}
            {pendingSyncCount > 0 && ` · ${pendingSyncCount} na fila offline`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as CardDisplayMode)}
            aria-label="Modo de exibição dos cards"
            className="px-3 py-2 rounded-md border border-border bg-surface text-xs font-semibold text-ink focus:outline-none focus:border-jade"
          >
            <option value="mixed">Modo: Misto (Cloze + Hanzi)</option>
            <option value="cloze">Modo: Frase Cloze</option>
            <option value="recognition">Modo: Hanzi → Pinyin</option>
            <option value="production">Modo: Significado → Hanzi</option>
          </select>

          <button
            type="button"
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="p-2 rounded-md border border-border bg-surface text-muted hover:text-ink"
            title="Configurações de limites diários"
            aria-label="Configurações de limites diários"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Drawer */}
      {settingsOpen && (
        <section className="rounded-lg border border-border bg-surface p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink">
              Configurações do Baralho
            </h2>
            <button
              type="button"
              onClick={() => setSettingsOpen(false)}
              className="p-1 text-muted hover:text-ink"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <label className="space-y-1">
              <span className="font-semibold text-muted block">Novos cards por dia</span>
              <input
                type="number"
                min={1}
                max={100}
                value={newPerDay}
                onChange={(e) =>
                  updatePreferences({ srsNewPerDay: Math.max(1, Number(e.target.value) || 10) })
                }
                className="w-full px-3 py-1.5 rounded-md border border-border bg-canvas text-ink font-mono"
              />
            </label>
            <label className="space-y-1">
              <span className="font-semibold text-muted block">Máximo de revisões/dia</span>
              <input
                type="number"
                min={10}
                max={500}
                value={reviewsPerDay}
                onChange={(e) =>
                  updatePreferences({
                    srsReviewsPerDay: Math.max(10, Number(e.target.value) || 100),
                  })
                }
                className="w-full px-3 py-1.5 rounded-md border border-border bg-canvas text-ink font-mono"
              />
            </label>
            <label className="flex items-center gap-2 pt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={enableProduction}
                onChange={(e) =>
                  updatePreferences({ srsEnableMeaningToHanzi: e.target.checked })
                }
                className="accent-jade"
              />
              <span className="font-semibold text-ink">
                Incluir Significado → Hanzi no modo Misto
              </span>
            </label>
          </div>
        </section>
      )}

      {/* Main Card Area */}
      {loading ? (
        <div className="rounded-xl border border-border bg-surface p-12 text-center text-sm text-muted">
          Preparando seus flashcards...
        </div>
      ) : !currentCard || !cardContent ? (
        <div className="rounded-xl border border-jade-border bg-surface p-10 text-center space-y-4">
          <CheckCircle2 className="w-10 h-10 text-jade mx-auto" />
          <h2 className="text-lg font-bold text-ink">
            {stats && stats.totalCards === 0
              ? "Seu baralho ainda está vazio"
              : "Tudo revisado por hoje!"}
          </h2>
          <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
            {stats && stats.totalCards === 0
              ? "Salve palavras durante a leitura de qualquer história para criar flashcards automaticamente com a frase de contexto."
              : "Você completou todas as revisões agendadas para hoje. Leia mais capítulos ou volte amanhã."}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-md bg-jade text-canvas text-xs font-semibold hover:bg-jade-deep"
            >
              Explorar Histórias
            </Link>
            <Link
              href="/vocabulario"
              className="px-4 py-2 rounded-md border border-border bg-canvas text-xs font-semibold text-ink hover:border-jade"
            >
              Ver Vocabulário
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="px-4 sm:px-6 py-3 bg-canvas border-b border-border flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                  getHskStyle(cardContent.hskLevel).badge
                }`}
              >
                HSK {cardContent.hskLevel}
              </span>
              <span className="text-[11px] font-mono text-muted">
                {currentCard.state === 0 ? "Novo" : `Reps: ${currentCard.reps}`}
              </span>
              <span className="text-[11px] text-muted hidden sm:inline">
                · {effectiveMode === "cloze" ? "Cloze na Frase" : effectiveMode === "production" ? "Produção" : "Reconhecimento"}
              </span>
            </div>

            {/* Card Actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setNoteDraft(currentCard.note || "");
                  setNoteOpen(!noteOpen);
                }}
                title="Adicionar/editar nota"
                className="p-1.5 rounded-md text-muted hover:text-ink hover:bg-surface"
              >
                <StickyNote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleCardAction("bury")}
                title="Enterrar (adiar para amanhã)"
                className="p-1.5 rounded-md text-muted hover:text-ink hover:bg-surface"
              >
                <EyeOff className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleCardAction("suspend")}
                title="Suspender card"
                className="p-1.5 rounded-md text-muted hover:text-ink hover:bg-surface"
              >
                <PauseCircle className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleCardAction("reset")}
                title="Resetar progresso do card"
                className="p-1.5 rounded-md text-muted hover:text-ink hover:bg-surface"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Optional Note Editor */}
          {noteOpen && (
            <div className="px-4 sm:px-6 py-3 bg-surface-elevated border-b border-border flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Sua nota pessoal ou mnemônico para este card..."
                className="flex-1 px-3 py-1.5 rounded-md border border-border bg-canvas text-xs text-ink"
              />
              <button
                type="button"
                onClick={() => handleCardAction("note", noteDraft)}
                className="px-3 py-1.5 rounded-md bg-jade text-canvas text-xs font-semibold"
              >
                Salvar Nota
              </button>
            </div>
          )}

          {/* Card Prompt (Front) */}
          <div className="p-6 sm:p-10 text-center space-y-5 min-h-[240px] flex flex-col items-center justify-center">
            {effectiveMode === "cloze" && clozeMaskedSentence ? (
              <div className="space-y-3 max-w-xl">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Complete a frase da história
                </div>
                <p className="text-2xl sm:text-3xl font-zh text-ink leading-relaxed">
                  {revealed ? cardContent.exampleSentenceZh : clozeMaskedSentence}
                </p>
                {cardContent.exampleSentencePt && (
                  <p className="text-xs sm:text-sm text-muted italic">
                    &ldquo;{cardContent.exampleSentencePt}&rdquo;
                  </p>
                )}
              </div>
            ) : effectiveMode === "production" ? (
              <div className="space-y-2 max-w-md">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Como se escreve em Mandarim?
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-ink">
                  {cardContent.meaningPt}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-5xl sm:text-6xl font-zh font-bold text-ink tracking-wide">
                  {cardContent.hanzi}
                </div>
                <button
                  type="button"
                  onClick={() => speakText(cardContent.hanzi)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-canvas hover:border-jade text-xs font-semibold text-ink"
                >
                  <Volume2 className="w-3.5 h-3.5 text-jade" />
                  <span>Ouvir</span>
                </button>
              </div>
            )}

            {/* Revealed Back */}
            {revealed && (
              <div className="w-full max-w-xl pt-5 border-t border-border space-y-3 text-left sm:text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                  <span className="text-3xl font-zh font-bold text-jade">
                    {cardContent.hanzi}
                  </span>
                  <span className="text-lg font-bold">
                    <ColoredPinyin pinyin={cardContent.pinyin} />
                  </span>
                  <button
                    type="button"
                    onClick={() => speakText(cardContent.hanzi)}
                    className="p-1.5 rounded-md border border-border bg-canvas text-jade hover:border-jade"
                    title="Ouvir palavra"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-base font-bold text-ink">{cardContent.meaningPt}</p>

                {cardContent.compoundLogicPt && (
                  <p className="text-xs text-muted bg-canvas border border-border rounded-md p-2.5 leading-relaxed">
                    {cardContent.compoundLogicPt}
                  </p>
                )}

                {effectiveMode !== "cloze" && cardContent.exampleSentenceZh && (
                  <div className="p-3 rounded-md bg-canvas border border-border text-xs space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-zh text-base text-ink">
                        {cardContent.exampleSentenceZh}
                      </span>
                      <button
                        type="button"
                        onClick={() => speakText(cardContent.exampleSentenceZh!)}
                        className="p-1 rounded text-jade hover:bg-surface"
                        title="Ouvir frase"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {cardContent.exampleSentencePt && (
                      <div className="text-muted">{cardContent.exampleSentencePt}</div>
                    )}
                  </div>
                )}

                {currentCard.note && (
                  <div className="text-xs text-cinnabar bg-cinnabar-soft/50 border border-cinnabar-border rounded-md px-3 py-1.5">
                    Nota: {currentCard.note}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Card Footer Controls */}
          <div className="p-4 bg-canvas border-t border-border">
            {!revealed ? (
              <button
                type="button"
                onClick={() => {
                  setRevealed(true);
                  speakText(cardContent.hanzi);
                }}
                className="w-full py-3 rounded-lg bg-jade text-canvas hover:bg-jade-deep text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Mostrar Resposta (Espaço)</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(
                  [
                    { rating: 1 as FSRSRatingNum, label: "Errei", key: "1", cls: "border-cinnabar-border bg-cinnabar-soft text-cinnabar hover:opacity-90" },
                    { rating: 2 as FSRSRatingNum, label: "Difícil", key: "2", cls: "border-border bg-surface text-ink hover:border-jade" },
                    { rating: 3 as FSRSRatingNum, label: "Bom", key: "3", cls: "border-jade-border bg-jade-soft text-jade hover:opacity-90" },
                    { rating: 4 as FSRSRatingNum, label: "Fácil", key: "4", cls: "border-jade bg-jade text-canvas hover:bg-jade-deep" },
                  ] as const
                ).map((btn) => (
                  <button
                    key={btn.rating}
                    type="button"
                    onClick={() => handleRate(btn.rating)}
                    className={`py-2.5 px-3 rounded-lg border text-center transition-all active:scale-95 ${btn.cls}`}
                  >
                    <div className="text-xs font-bold">
                      {btn.label} <span className="opacity-60 font-mono">[{btn.key}]</span>
                    </div>
                    <div className="text-[11px] font-mono opacity-85 mt-0.5">
                      {intervals ? intervals[btn.rating] : ""}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

