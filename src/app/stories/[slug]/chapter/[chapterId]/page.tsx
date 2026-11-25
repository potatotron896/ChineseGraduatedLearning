"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  GraduationCap,
  Languages,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Type,
  Underline,
  Volume2,
  X,
} from "lucide-react";
import { getStoryBySlug } from "@/data/stories";
import { useUser } from "@/context/UserContext";
import { HskDistributionBar, getHskStyle } from "@/components/HskDistributionBar";
import { EtymologyInspector } from "@/components/EtymologyInspector";
import { ColoredPinyin } from "@/components/ColoredPinyin";
import type { ChineseFontMode, PinyinDisplayMode, StorySentence, StoryToken } from "@/types/story";

const FONT_MODES: { id: ChineseFontMode; label: string; desc: string }[] = [
  { id: "app", label: "Fonte App", desc: "Noto Sans SC (Moderna)" },
  { id: "school", label: "Fonte Escola", desc: "LXGW WenKai / Kaiti (Caligráfica)" },
  { id: "book", label: "Fonte Livro", desc: "Noto Serif SC / Songti (Impressa)" },
];

const PINYIN_MODES: { id: PinyinDisplayMode; label: string }[] = [
  { id: "on", label: "Pinyin: Sempre" },
  { id: "hover", label: "Pinyin: Ao Tocar" },
  { id: "off", label: "Pinyin: Oculto" },
];

const SPEED_OPTIONS = [0.6, 0.75, 0.9, 1.0, 1.25];

const FONT_SIZE_CLASSES: Record<"sm" | "md" | "lg" | "xl", string> = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-[28px]",
  xl: "text-[34px]",
};

export default function StoryReaderPage() {
  const params = useParams<{ slug: string; chapterId: string }>();
  const story = getStoryBySlug(params.slug);
  const chapter = story?.chapters.find((c) => c.id === params.chapterId) || story?.chapters[0];

  const { profile, updatePreferences, updateChapterProgress } = useUser();
  const { zhFont, fontSizeStep, pinyinMode, highlightAboveLevel, audioSpeed } =
    profile.preferences;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [durationMs, setDurationMs] = useState(chapter?.audioDurationMs || 18000);
  const [selectedToken, setSelectedToken] = useState<StoryToken | null>(null);
  const [selectedSentence, setSelectedSentence] = useState<StorySentence | null>(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [openTranslations, setOpenTranslations] = useState<Record<string, boolean>>({});
  const [showAllTranslations, setShowAllTranslations] = useState(false);
  const [showHskModal, setShowHskModal] = useState(false);

  // Set initial inspected word to the first key vocabulary token so the user immediately sees the inspector in action
  useEffect(() => {
    if (chapter && chapter.sentences.length > 0) {
      const firstSentence = chapter.sentences[0];
      const firstInterestingToken =
        firstSentence.tokens.find((t) => !t.isPunctuation && t.hanzi.length >= 2) ||
        firstSentence.tokens.find((t) => !t.isPunctuation);
      if (firstInterestingToken) {
        setSelectedToken(firstInterestingToken);
        setSelectedSentence(firstSentence);
      }
      setIsMobileModalOpen(false);
      setDurationMs(chapter.audioDurationMs || 18000);
      setCurrentTimeMs(0);
      setIsPlaying(false);
    }
  }, [chapter]);

  // Close mobile modal on Escape key and lock background scroll while open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isMobileModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileModalOpen]);

  // Sync audio playbackRate whenever audioSpeed changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = audioSpeed;
      audio.preservesPitch = true;
    }
  }, [audioSpeed, isPlaying]);

  // Smooth requestAnimationFrame loop for exact millisecond karaoke highlighting
  useEffect(() => {
    let rafId: number;
    const tick = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        setCurrentTimeMs(Math.round(audio.currentTime * 1000));
        rafId = requestAnimationFrame(tick);
      }
    };
    if (isPlaying) {
      rafId = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  if (!story || !chapter) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-ink">História ou capítulo não encontrado</h1>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-jade text-canvas text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  const progKey = `${story.slug}:${chapter.id}`;
  const isChapterCompleted = Boolean(profile.chapterProgress[progKey]?.completed);

  const chapterIndex = story.chapters.findIndex((c) => c.id === chapter.id);
  const prevChapter = chapterIndex > 0 ? story.chapters[chapterIndex - 1] : null;
  const nextChapter =
    chapterIndex < story.chapters.length - 1 ? story.chapters[chapterIndex + 1] : null;

  function togglePlayPause() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.playbackRate = audioSpeed;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }

  function seekToMs(ms: number, autoPlay = true) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, ms / 1000);
    setCurrentTimeMs(ms);
    if (autoPlay) {
      audio.playbackRate = audioSpeed;
      audio.play().catch(() => {});
    }
  }

  function jumpSentence(direction: -1 | 1) {
    if (!chapter) return;
    const currentIdx = chapter.sentences.findIndex(
      (s) => currentTimeMs >= s.startMs && currentTimeMs <= s.endMs
    );
    const targetIdx =
      currentIdx === -1
        ? 0
        : Math.max(0, Math.min(chapter.sentences.length - 1, currentIdx + direction));
    const targetSentence = chapter.sentences[targetIdx];
    if (targetSentence) {
      seekToMs(targetSentence.startMs, true);
    }
  }

  function toggleSentenceTranslation(sentenceId: string) {
    setOpenTranslations((prev) => ({
      ...prev,
      [sentenceId]: !prev[sentenceId],
    }));
  }

  function cycleFontSize() {
    const order: ("sm" | "md" | "lg" | "xl")[] = ["sm", "md", "lg", "xl"];
    const nextIdx = (order.indexOf(fontSizeStep) + 1) % order.length;
    updatePreferences({ fontSizeStep: order[nextIdx] });
  }

  function stepToken(delta: -1 | 1) {
    if (!chapter) return;
    const allWordOccurrences: { token: StoryToken; sentence: StorySentence }[] = [];
    for (const s of chapter.sentences) {
      for (const t of s.tokens) {
        if (!t.isPunctuation) {
          allWordOccurrences.push({ token: t, sentence: s });
        }
      }
    }
    if (allWordOccurrences.length === 0) return;

    const currentIdx = selectedToken
      ? allWordOccurrences.findIndex((item) => item.token.id === selectedToken.id)
      : 0;
    let nextIdx = (currentIdx === -1 ? 0 : currentIdx) + delta;
    if (nextIdx < 0) nextIdx = allWordOccurrences.length - 1;
    if (nextIdx >= allWordOccurrences.length) nextIdx = 0;

    const nextItem = allWordOccurrences[nextIdx];
    setSelectedToken(nextItem.token);
    setSelectedSentence(nextItem.sentence);

    if (typeof document !== "undefined") {
      const el = document.querySelector(`[data-token-id="${nextItem.token.id}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  function formatTime(ms: number) {
    const totalSec = Math.max(0, Math.floor(ms / 1000));
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  }

  return (
    <div
      className="pb-36 sm:pb-28"
      data-pinyin-mode={pinyinMode}
      data-highlight-above={String(highlightAboveLevel)}
      data-zh-font={zhFont}
    >
      {/* Hidden HTML5 Audio Element connected to Neural MP3 */}
      <audio
        ref={audioRef}
        src={chapter.audioUrl}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => {
          const dur = Math.round(e.currentTarget.duration * 1000);
          if (dur > 500) setDurationMs(dur);
        }}
        onTimeUpdate={(e) => {
          setCurrentTimeMs(Math.round(e.currentTarget.currentTime * 1000));
        }}
        onEnded={() => {
          setIsPlaying(false);
          updateChapterProgress({
            storySlug: story.slug,
            chapterId: chapter.id,
            completed: true,
          });
        }}
      />

      {/* Reader Top Control Bar */}
      <div className="border-b border-border bg-surface/95 sticky top-14 sm:top-16 z-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-col lg:flex-row lg:items-center justify-between gap-2">
          {/* Top Row on Mobile / Left on Desktop: Back to Catalog, Title & HSK Button */}
          <div className="flex items-center justify-between lg:justify-start gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-md border border-border bg-canvas hover:bg-surface text-xs font-semibold text-ink transition-colors shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Catálogo</span>
              </Link>

              <div className="flex items-center gap-1.5 text-xs min-w-0">
                <span className="font-zh font-semibold text-ink text-sm truncate">
                  {story.titleZh}
                </span>
                <span className="text-muted hidden sm:inline">·</span>
                <span className="text-muted font-medium truncate hidden sm:inline">
                  {chapter.titlePt}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHskModal(!showHskModal)}
              className={`px-2.5 py-1 min-h-[32px] rounded-full text-xs font-semibold border inline-flex items-center gap-1.5 shrink-0 ${
                getHskStyle(story.targetHsk).badge
              }`}
              title="Ver proporção exata de caracteres HSK deste capítulo"
            >
              <BarChart3 className="w-3 h-3" />
              <span>
                HSK {story.targetHsk} ({chapter.hskDistribution[0]?.percentage || 88}%)
              </span>
            </button>
          </div>

          {/* Second Row on Mobile (Horizontally Scrollable Strip) / Right on Desktop: Typography, Pinyin Mode, Underline HSK, Translations */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-0.5 lg:pb-0 -mx-3 px-3 sm:mx-0 sm:px-0">
            {/* 3 Chinese Fonts Switcher (visible on all screen sizes in Reader) */}
            <div
              className="inline-flex items-center bg-canvas border border-border rounded-md p-0.5 shrink-0"
              role="group"
              aria-label="Alternar fonte chinesa"
            >
              {FONT_MODES.map((fm) => {
                const active = zhFont === fm.id;
                return (
                  <button
                    key={fm.id}
                    type="button"
                    onClick={() => updatePreferences({ zhFont: fm.id })}
                    title={fm.desc}
                    className={`px-2.5 py-1 min-h-[30px] rounded-[5px] text-xs font-semibold transition-colors whitespace-nowrap ${
                      active
                        ? "bg-jade text-canvas"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {fm.label.replace("Fonte ", "")}
                  </button>
                );
              })}
            </div>

            {/* Font Size Button */}
            <button
              type="button"
              onClick={cycleFontSize}
              title="Alterar tamanho dos caracteres chineses"
              className="px-2.5 py-1 min-h-[34px] rounded-md border border-border bg-canvas hover:bg-surface text-xs font-semibold text-ink inline-flex items-center gap-1 shrink-0"
            >
              <Type className="w-3.5 h-3.5 text-jade" />
              <span className="uppercase font-mono">{fontSizeStep}</span>
            </button>

            {/* Pinyin Display Mode */}
            <div
              className="inline-flex items-center bg-canvas border border-border rounded-md p-0.5 shrink-0"
              role="group"
              aria-label="Modo de exibição do Pinyin"
            >
              {PINYIN_MODES.map((pm) => {
                const active = pinyinMode === pm.id;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => updatePreferences({ pinyinMode: pm.id })}
                    className={`px-2 py-1 min-h-[30px] rounded-[5px] text-xs font-medium transition-colors whitespace-nowrap ${
                      active
                        ? "bg-ink text-canvas font-semibold"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {pm.label.replace("Pinyin: ", "")}
                  </button>
                );
              })}
            </div>

            {/* Highlight words above story base HSK */}
            <button
              type="button"
              onClick={() =>
                updatePreferences({ highlightAboveLevel: !highlightAboveLevel })
              }
              title="Sublinhar palavras acima do nível HSK base da história"
              className={`px-2.5 py-1 min-h-[34px] rounded-md border text-xs font-semibold transition-colors inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                highlightAboveLevel
                  ? "bg-ginkgo-soft border-ginkgo/50 text-ink"
                  : "bg-canvas border-border text-muted hover:text-ink"
              }`}
            >
              <Underline className="w-3.5 h-3.5 text-ginkgo" />
              <span>HSK+</span>
            </button>

            {/* Toggle All Translations */}
            <button
              type="button"
              onClick={() => setShowAllTranslations(!showAllTranslations)}
              className={`px-2.5 py-1 min-h-[34px] rounded-md border text-xs font-semibold transition-colors inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                showAllTranslations
                  ? "bg-jade-soft border-jade-border text-jade"
                  : "bg-canvas border-border text-muted hover:text-ink"
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>
                {showAllTranslations ? "Ocultar PT-BR" : "Traduções"}
              </span>
            </button>
          </div>
        </div>

        {/* Collapsible Chapter HSK Breakdown Banner */}
        {showHskModal && (
          <div className="border-t border-border bg-canvas px-4 sm:px-6 py-4">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-ink flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-jade" />
                  <span>Composição HSK 3.0 deste capítulo ({chapter.titlePt})</span>
                </div>
                <p className="text-xs text-muted">
                  {story.targetRule.descriptionPt}
                </p>
              </div>
              <div className="w-full sm:w-80">
                <HskDistributionBar distribution={chapter.hskDistribution} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Split Reader Layout: Reading Canvas (Left) + Etymology Inspector (Right) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-5 sm:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Reading Canvas (7 cols on large desktop) */}
        <div className="lg:col-span-7 xl:col-span-8">
          {/* Chapter Title Block */}
          <header className="pb-5 sm:pb-6 mb-4 sm:mb-5 border-b border-border">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono font-semibold">
                <ColoredPinyin pinyin={chapter.titlePinyin} />
              </span>
              <span className="text-[11px] sm:text-xs text-muted">
                Fonte:{" "}
                <strong className="text-ink">
                  {FONT_MODES.find((f) => f.id === zhFont)?.desc}
                </strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-zh font-semibold text-ink tracking-wide">
              {chapter.titleZh}
            </h1>
            <h2 className="text-base sm:text-lg font-semibold text-ink mt-1">
              {chapter.titlePt}
            </h2>
            <p className="text-xs text-muted mt-2 leading-relaxed">
              {chapter.summaryPt}
            </p>
          </header>

          {/* Guia Compacto de Cores dos Tons do Pinyin + Dica de Toque no Mobile */}
          <div className="mb-5 sm:mb-6 flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-[11px] font-semibold">
            <span className="text-muted">Tons do Pinyin:</span>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
              <span className="tone-1">1º ā</span>
              <span className="tone-2">2º á</span>
              <span className="tone-3">3º ǎ</span>
              <span className="tone-4">4º à</span>
              <span className="tone-5">Neutro</span>
            </div>
          </div>

          {/* Interactive Sentences List */}
          <div className="space-y-7">
            {chapter.sentences.map((sentence, sIdx) => {
              const isSentenceSpeaking =
                isPlaying &&
                currentTimeMs >= sentence.startMs &&
                currentTimeMs <= sentence.endMs;
              const isTranslationVisible =
                showAllTranslations || Boolean(openTranslations[sentence.id]);

              return (
                <section
                  key={sentence.id}
                  className={`p-4 sm:p-5 rounded-lg border transition-colors ${
                    isSentenceSpeaking
                      ? "bg-jade-soft/50 border-jade-border"
                      : "bg-canvas border-border hover:border-jade-border/70"
                  }`}
                >
                  {/* Sentence Toolbar: Sentence Number, Play from this sentence, Toggle Translation & Grammar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-[11px] font-mono text-muted px-1.5 py-0.5 rounded bg-surface border border-border">
                        #{sIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => seekToMs(sentence.startMs, true)}
                        className={`px-2.5 py-1.5 min-h-[34px] rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                          isSentenceSpeaking
                            ? "bg-cinnabar text-canvas"
                            : "bg-surface hover:bg-jade-soft text-ink border border-border"
                        }`}
                        title="Ouvir a partir desta frase"
                      >
                        <Volume2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{isSentenceSpeaking ? "Falando..." : "Ouvir frase"}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSentenceTranslation(sentence.id)}
                      className="px-2.5 py-1.5 min-h-[34px] rounded-md border border-border bg-surface hover:text-ink text-xs font-medium text-muted inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-jade shrink-0" />
                      <span className="hidden sm:inline">
                        {isTranslationVisible
                          ? "Ocultar tradução & gramática"
                          : "Tradução & Gramática"}
                      </span>
                      <span className="sm:hidden">
                        {isTranslationVisible ? "Ocultar" : "Tradução"}
                      </span>
                    </button>
                  </div>

                  {/* Chinese Ruby Tokens Stream */}
                  <div className="leading-[2.5] flex flex-wrap items-end gap-y-2">
                    {sentence.tokens.map((token) => {
                      if (token.isPunctuation) {
                        return (
                          <span
                            key={token.id}
                            className={`font-zh ${FONT_SIZE_CLASSES[fontSizeStep]} text-ink select-none mr-1 self-end pb-0.5`}
                          >
                            {token.hanzi}
                          </span>
                        );
                      }

                      const isTokenSpeaking =
                        isPlaying &&
                        token.startMs !== undefined &&
                        token.endMs !== undefined &&
                        currentTimeMs >= token.startMs &&
                        currentTimeMs < token.endMs;

                      const isTokenInspected = selectedToken?.id === token.id;
                      const isAboveLevel = (token.hskLevel || 1) > story.targetHsk;

                      return (
                        <ruby
                          key={token.id}
                          data-token-id={token.id}
                          data-speaking={String(isTokenSpeaking)}
                          data-inspected={String(isTokenInspected)}
                          data-above-level={String(isAboveLevel)}
                          onClick={() => {
                            setSelectedToken(token);
                            setSelectedSentence(sentence);
                            if (typeof window !== "undefined" && window.innerWidth < 1024) {
                              setIsMobileModalOpen(true);
                            }
                          }}
                          className="zh-token cursor-pointer hover:bg-surface-elevated active:scale-95 transition-transform"
                          title={`${token.pinyin} — ${token.meaningPt} (HSK ${token.hskLevel})`}
                        >
                          <span
                            className={`zh-hanzi font-zh ${FONT_SIZE_CLASSES[fontSizeStep]} font-normal tracking-wide`}
                          >
                            {token.hanzi}
                          </span>
                          <rt>
                            <ColoredPinyin pinyin={token.pinyin} />
                          </rt>
                        </ruby>
                      );
                    })}
                  </div>

                  {/* Expandable Sentence Translation + Literal Structure + Grammar Notes */}
                  {isTranslationVisible && (
                    <div className="mt-4 pt-3.5 border-t border-border space-y-2.5">
                      <div>
                        <p className="text-sm font-medium text-ink">
                          {sentence.translationPt}
                        </p>
                        {sentence.literalPt && (
                          <p className="text-xs text-muted mt-0.5">
                            <span className="font-semibold">Ordem literal chinesa:</span>{" "}
                            {sentence.literalPt}
                          </p>
                        )}
                      </div>

                      {sentence.grammarNotes && sentence.grammarNotes.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          {sentence.grammarNotes.map((gn, gIdx) => (
                            <div
                              key={gIdx}
                              className="p-2.5 rounded-md bg-surface border border-border text-xs"
                            >
                              <div className="flex items-center gap-1.5 font-semibold text-jade mb-0.5">
                                <GraduationCap className="w-3.5 h-3.5" />
                                <span>Nota Gramatical ({gn.pattern}):</span>
                              </div>
                              <p className="text-muted leading-relaxed">
                                {gn.explanationPt}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Chapter Completion & Chapter Navigation Footer */}
          <footer className="mt-8 sm:mt-10 p-4 sm:p-6 rounded-lg border border-border bg-surface flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() =>
                updateChapterProgress({
                  storySlug: story.slug,
                  chapterId: chapter.id,
                  completed: !isChapterCompleted,
                })
              }
              className={`w-full sm:w-auto justify-center px-4 py-2.5 min-h-[42px] rounded-md text-xs font-semibold transition-colors inline-flex items-center gap-2 ${
                isChapterCompleted
                  ? "bg-jade-soft text-jade border border-jade-border"
                  : "bg-jade text-canvas hover:bg-jade-deep"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                {isChapterCompleted
                  ? "Capítulo Concluído (Salvo)"
                  : "Marcar Capítulo como Lido"}
              </span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {prevChapter && (
                <Link
                  href={`/stories/${story.slug}/chapter/${prevChapter.id}`}
                  className="flex-1 sm:flex-initial justify-center px-3.5 py-2.5 min-h-[42px] rounded-md border border-border bg-canvas hover:bg-surface text-xs font-semibold text-ink inline-flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4 shrink-0" />
                  <span>Anterior</span>
                </Link>
              )}
              {nextChapter ? (
                <Link
                  href={`/stories/${story.slug}/chapter/${nextChapter.id}`}
                  className="flex-1 sm:flex-initial justify-center px-4 py-2.5 min-h-[42px] rounded-md bg-ink text-canvas hover:opacity-90 text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Próximo Capítulo</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </Link>
              ) : (
                <Link
                  href="/"
                  className="flex-1 sm:flex-initial justify-center px-4 py-2.5 min-h-[42px] rounded-md border border-border bg-canvas hover:bg-surface text-xs font-semibold text-ink inline-flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>Mais Histórias</span>
                </Link>
              )}
            </div>
          </footer>
        </div>

        {/* Etymology Inspector Sidebar (5 cols on large desktop >= 1024px) */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
          <EtymologyInspector
            token={selectedToken}
            sentence={selectedSentence}
            storySlug={story.slug}
            storyTitlePt={story.titlePt}
            onClose={() => setSelectedToken(null)}
            onPlaySentenceFromHere={(ms) => seekToMs(ms, true)}
            onStepToken={stepToken}
            variant="sidebar"
          />
        </div>
      </div>

      {/* Mobile / Tablet Instant Floating Bottom-Sheet Modal (< 1024px) */}
      {isMobileModalOpen && selectedToken && !selectedToken.isPunctuation && (
        <div
          className="lg:hidden fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Detalhes da palavra ${selectedToken.hanzi}`}
        >
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] modal-backdrop-anim"
          />

          {/* Bottom-sheet / Modal container (exact 3-part structure: header, scrollable body, footer) */}
          <div className="relative z-10 w-full sm:max-w-lg bg-surface border-t sm:border border-border rounded-t-2xl sm:rounded-xl shadow-lg flex flex-col max-h-[85dvh] modal-sheet-anim overflow-hidden">
            {/* Drag Handle Pill for Mobile Bottom Sheet */}
            <div className="sm:hidden pt-2 pb-0.5 bg-canvas flex justify-center shrink-0">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* 1. Modal Top Bar */}
            <div className="px-4 py-2.5 border-b border-border bg-canvas flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cinnabar" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Análise da Palavra
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileModalOpen(false)}
                className="w-9 h-9 rounded-full border border-border bg-surface text-ink font-bold text-base flex items-center justify-center hover:opacity-80 active:scale-95 transition-all"
                aria-label="Fechar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 2. Scrollable Modal Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain min-h-0">
              <EtymologyInspector
                token={selectedToken}
                sentence={selectedSentence}
                storySlug={story.slug}
                storyTitlePt={story.titlePt}
                onClose={() => setIsMobileModalOpen(false)}
                onPlaySentenceFromHere={(ms) => {
                  seekToMs(ms, true);
                }}
                variant="modal"
              />
            </div>

            {/* 3. Modal Footer Navigation */}
            <div className="p-3 border-t border-border bg-canvas grid grid-cols-2 gap-2.5 shrink-0 pb-safe">
              <button
                type="button"
                onClick={() => stepToken(-1)}
                className="py-2.5 px-3 min-h-[44px] rounded-lg text-xs font-bold border border-border bg-surface text-ink active:scale-95 transition-all"
              >
                ‹ Palavra Anterior
              </button>
              <button
                type="button"
                onClick={() => stepToken(1)}
                className="py-2.5 px-3 min-h-[44px] rounded-lg text-xs font-bold border border-border bg-surface text-ink active:scale-95 transition-all"
              >
                Próxima Palavra ›
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Karaoke Neural Audio Player Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-canvas/95 backdrop-blur-md shadow-lg pb-safe">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-0 sm:h-20 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
          {/* Mobile Top Row: Progress Scrubber + Timestamps (on sm+ it sits in the middle) */}
          <div className="w-full sm:flex-1 sm:max-w-2xl sm:order-2">
            <div className="flex items-center justify-between text-[11px] sm:text-xs mb-1">
              <span className="font-medium text-ink truncate pr-2">
                {isPlaying ? (
                  <span className="inline-flex items-center gap-1.5 text-cinnabar font-semibold">
                    <span className="w-2 h-2 rounded-full bg-cinnabar animate-pulse shrink-0" />
                    <span className="truncate">Destaque Sincronizado Ativo</span>
                  </span>
                ) : (
                  <span className="text-muted truncate">
                    Narração Neural · Toque em Play ou numa frase
                  </span>
                )}
              </span>
              <span className="font-mono text-muted shrink-0">
                {formatTime(currentTimeMs)} / {formatTime(durationMs)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={durationMs}
              value={Math.min(currentTimeMs, durationMs)}
              onChange={(e) => seekToMs(Number(e.target.value), isPlaying)}
              aria-label="Progresso do áudio da história"
              className="w-full h-2 sm:h-1.5 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-cinnabar"
            />
          </div>

          {/* Controls Row on Mobile: Play/Pause/Skip on Left + Speed Selector on Right */}
          <div className="flex items-center justify-between sm:contents">
            {/* Play/Pause & Sentence Skip Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 sm:order-1">
              <button
                type="button"
                onClick={() => jumpSentence(-1)}
                className="w-9 h-9 sm:w-auto sm:h-auto sm:p-2 rounded-md border border-border bg-surface text-muted hover:text-ink transition-colors flex items-center justify-center"
                title="Frase anterior"
                aria-label="Frase anterior"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={togglePlayPause}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-cinnabar text-canvas hover:opacity-95 flex items-center justify-center shadow-sm transition-transform active:scale-95"
                aria-label={isPlaying ? "Pausar narração" : "Ouvir história em Mandarim"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => jumpSentence(1)}
                className="w-9 h-9 sm:w-auto sm:h-auto sm:p-2 rounded-md border border-border bg-surface text-muted hover:text-ink transition-colors flex items-center justify-center"
                title="Próxima frase"
                aria-label="Próxima frase"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => seekToMs(0, true)}
                className="w-9 h-9 sm:w-auto sm:h-auto sm:p-2 rounded-md border border-border bg-surface text-muted hover:text-ink transition-colors flex items-center justify-center"
                title="Reiniciar áudio do capítulo"
                aria-label="Reiniciar áudio"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Playback Speed Selector (0.6x to 1.25x) */}
            <div className="flex items-center gap-1.5 sm:order-3">
              <span className="text-xs text-muted hidden xl:inline">Velocidade:</span>
              <div
                className="inline-flex items-center bg-surface border border-border rounded-md p-0.5"
                role="group"
                aria-label="Velocidade da fala em chinês"
              >
                {SPEED_OPTIONS.map((spd) => {
                  const active = Math.abs(audioSpeed - spd) < 0.01;
                  return (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => updatePreferences({ audioSpeed: spd })}
                      className={`px-1.5 sm:px-2 py-1 min-h-[28px] rounded-[5px] text-[11px] sm:text-xs font-mono font-semibold transition-colors ${
                        active
                          ? "bg-jade text-canvas"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      {spd}x
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

