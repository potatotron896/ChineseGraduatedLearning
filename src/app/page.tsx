"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Filter,
  Layers,
  Play,
  Search,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import { STORIES } from "@/data/stories";
import { useUser } from "@/context/UserContext";
import { HskDistributionBar, getHskStyle } from "@/components/HskDistributionBar";
import type { HskLevel, Story, StoryCategory } from "@/types/story";

const CATEGORIES: ("Todas" | StoryCategory)[] = [
  "Todas",
  "Cotidiano",
  "Cultura & Folclore",
  "Viagem & Gastronomia",
];

const HSK_FILTERS: ("Todos" | HskLevel)[] = ["Todos", 1, 2, 3];

export default function CatalogPage() {
  const { profile } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"Todas" | StoryCategory>("Todas");
  const [selectedHsk, setSelectedHsk] = useState<"Todos" | HskLevel>("Todos");
  const [selectedStatus, setSelectedStatus] = useState<"todos" | "em_andamento" | "concluidos">("todos");
  const [activeStoryModal, setActiveStoryModal] = useState<Story | null>(null);

  const getStoryProgressStats = (story: Story) => {
    let completedChapters = 0;
    let startedChapters = 0;
    let firstUnfinishedChapterId = story.chapters[0]?.id || "ch-1";
    let foundUnfinished = false;

    for (const ch of story.chapters) {
      const key = `${story.slug}:${ch.id}`;
      const prog = profile.chapterProgress[key];
      if (prog) {
        startedChapters++;
        if (prog.completed) {
          completedChapters++;
        } else if (!foundUnfinished) {
          firstUnfinishedChapterId = ch.id;
          foundUnfinished = true;
        }
      } else if (!foundUnfinished) {
        firstUnfinishedChapterId = ch.id;
        foundUnfinished = true;
      }
    }

    const total = story.chapters.length;
    const isCompleted = completedChapters === total && total > 0;
    const isInProgress = startedChapters > 0 && !isCompleted;
    const pct = total > 0 ? Math.round((completedChapters / total) * 100) : 0;

    return {
      completedChapters,
      totalChapters: total,
      isCompleted,
      isInProgress,
      pct,
      resumeChapterId: firstUnfinishedChapterId,
    };
  };

  const filteredStories = useMemo(() => {
    return STORIES.filter((story) => {
      if (selectedCategory !== "Todas" && story.category !== selectedCategory) {
        return false;
      }
      if (selectedHsk !== "Todos" && story.targetHsk !== selectedHsk) {
        return false;
      }
      const stats = getStoryProgressStats(story);
      if (selectedStatus === "em_andamento" && !stats.isInProgress) {
        return false;
      }
      if (selectedStatus === "concluidos" && !stats.isCompleted) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitlePt = story.titlePt.toLowerCase().includes(q);
        const matchTitleZh = story.titleZh.includes(q);
        const matchPinyin = story.titlePinyin.toLowerCase().includes(q);
        const matchSynopsis = story.synopsisPt.toLowerCase().includes(q);
        const matchTags = story.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitlePt && !matchTitleZh && !matchPinyin && !matchSynopsis && !matchTags) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedHsk, selectedStatus, profile.chapterProgress]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
      {/* Scholarly Hero / Intro */}
      <section className="pb-6 sm:pb-8 border-b border-border">
        <div className="max-w-3xl">
          <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-jade-soft border border-jade-border text-jade text-[11px] sm:text-xs font-semibold mb-3">
            <span>Novo Padrão HSK 3.0</span>
            <span>·</span>
            <span>Proporção Controlada de Vocabulário</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
            Leitura Graduada de Mandarim com Áudio e Etimologia
          </h1>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-muted leading-relaxed">
            Histórias em múltiplos capítulos desenhadas para aquisição natural de linguagem:
            cada texto mantém entre <strong className="text-ink font-semibold">80% e 90% de vocabulário do seu nível atual</strong> e
            introduz gradualmente palavras do próximo nível. Ouça a narração natural com destaque sincronizado
            e toque em qualquer caractere para explorar seus radicais e formação.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-5 sm:mt-6 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 lg:max-w-md">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, Hanzi, Pinyin ou tema..."
              className="w-full pl-9 pr-4 py-2.5 sm:py-2 rounded-md border border-border bg-surface text-base sm:text-sm text-ink placeholder:text-muted focus:outline-none focus:border-jade"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2">
            <div className="flex items-center justify-between sm:justify-start gap-2">
              {/* HSK Level Filter */}
              <div
                className="inline-flex items-center bg-surface border border-border rounded-md p-0.5 overflow-x-auto no-scrollbar"
                role="group"
                aria-label="Filtrar por nível HSK"
              >
                {HSK_FILTERS.map((lvl) => {
                  const active = selectedHsk === lvl;
                  return (
                    <button
                      key={String(lvl)}
                      type="button"
                      onClick={() => setSelectedHsk(lvl)}
                      className={`px-2.5 py-1.5 sm:py-1 min-h-[34px] sm:min-h-0 rounded-[5px] text-xs font-semibold whitespace-nowrap transition-colors ${
                        active
                          ? "bg-jade text-canvas"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      {lvl === "Todos" ? "Todos HSK" : `HSK ${lvl}`}
                    </button>
                  );
                })}
              </div>

              {/* Reading Status Filter */}
              <select
                aria-label="Filtrar por progresso de leitura"
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(
                    e.target.value as "todos" | "em_andamento" | "concluidos"
                  )
                }
                className="px-2.5 py-1.5 min-h-[36px] sm:min-h-0 rounded-md border border-border bg-surface text-xs font-medium text-ink focus:outline-none focus:border-jade shrink-0"
              >
                <option value="todos">Status: Todos</option>
                <option value="em_andamento">Em andamento</option>
                <option value="concluidos">Concluídos</option>
              </select>
            </div>

            {/* Category Filter */}
            <div
              className="inline-flex items-center bg-surface border border-border rounded-md p-0.5 overflow-x-auto no-scrollbar"
              role="group"
              aria-label="Filtrar por categoria"
            >
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1.5 sm:py-1 min-h-[34px] sm:min-h-0 rounded-[5px] text-xs font-medium whitespace-nowrap transition-colors ${
                      active
                        ? "bg-ink text-canvas font-semibold"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="mt-8">
        {filteredStories.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface p-10 text-center max-w-lg mx-auto">
            <Filter className="w-8 h-8 text-muted mx-auto mb-3" />
            <h2 className="text-base font-semibold text-ink">
              Nenhuma história encontrada com esses filtros
            </h2>
            <p className="text-xs text-muted mt-1">
              Experimente limpar a busca ou selecionar todos os níveis HSK e categorias.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Todas");
                setSelectedHsk("Todos");
                setSelectedStatus("todos");
              }}
              className="mt-4 px-4 py-2 rounded-md bg-jade text-canvas text-xs font-semibold hover:bg-jade-deep"
            >
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => {
              const stats = getStoryProgressStats(story);
              const hskBadge = getHskStyle(story.targetHsk);

              return (
                <article
                  key={story.id}
                  className="rounded-lg border border-border bg-surface flex flex-col justify-between transition-colors hover:border-jade-border"
                >
                  <div className="p-4 sm:p-5">
                    {/* Top Row: HSK Badge, Category, Chapters Count */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${hskBadge.badge}`}
                        >
                          HSK {story.targetHsk}
                        </span>
                        <span className="text-xs font-medium text-muted">
                          {story.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted">
                        <span className="inline-flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5" />
                          {story.chapters.length}{" "}
                          {story.chapters.length === 1 ? "cap." : "caps."}
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {story.estimatedMinutes} min
                        </span>
                      </div>
                    </div>

                    {/* Chinese Title + Pinyin + PT Title */}
                    <div className="mb-3">
                      <p className="text-xs font-mono text-muted mb-0.5">
                        {story.titlePinyin}
                      </p>
                      <h2 className="text-2xl font-zh font-semibold text-ink tracking-wide">
                        {story.titleZh}
                      </h2>
                      <h3 className="text-base font-semibold text-ink mt-1">
                        {story.titlePt}
                      </h3>
                    </div>

                    <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-4">
                      {story.synopsisPt}
                    </p>

                    {/* HSK Percentage Distribution Mini Panel */}
                    <div className="p-3 rounded-md bg-canvas border border-border">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-muted mb-1.5">
                        <span className="inline-flex items-center gap-1 text-ink">
                          <BarChart3 className="w-3.5 h-3.5 text-jade shrink-0" />
                          <span>Composição HSK</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveStoryModal(story)}
                          className="text-jade hover:underline font-semibold py-0.5 px-1"
                        >
                          Ver detalhes %
                        </button>
                      </div>
                      <HskDistributionBar
                        distribution={story.hskDistribution}
                        compact
                      />
                    </div>
                  </div>

                  {/* Card Footer: Progress & Actions */}
                  <div className="px-4 sm:px-5 py-3.5 border-t border-border bg-canvas/50 rounded-b-lg flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveStoryModal(story)}
                      className="px-3 py-2 min-h-[38px] rounded-md border border-border bg-canvas hover:bg-surface text-xs font-semibold text-ink transition-colors"
                    >
                      Capítulos & % HSK
                    </button>

                    <Link
                      href={`/stories/${story.slug}/chapter/${stats.resumeChapterId}`}
                      className="px-3.5 py-2 min-h-[38px] rounded-md bg-jade text-canvas hover:bg-jade-deep text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                    >
                      {stats.isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Reler História</span>
                        </>
                      ) : stats.isInProgress ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                          <span>
                            Continuar ({stats.completedChapters}/{stats.totalChapters})
                          </span>
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-3.5 h-3.5 shrink-0" />
                          <span>Ler Agora</span>
                        </>
                      )}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Story Details & HSK Percentage Modal */}
      {activeStoryModal && (
        <div
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-modal-title"
        >
          <div className="w-full sm:max-w-2xl rounded-t-2xl sm:rounded-lg bg-canvas border-t sm:border border-border shadow-lg overflow-hidden flex flex-col max-h-[90dvh] modal-sheet-anim">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-border bg-surface flex items-start justify-between gap-3 shrink-0">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      getHskStyle(activeStoryModal.targetHsk).badge
                    }`}
                  >
                    Nível Base: HSK {activeStoryModal.targetHsk}
                  </span>
                  <span className="text-xs font-medium text-muted">
                    {activeStoryModal.category}
                  </span>
                  <span className="text-xs text-muted hidden sm:inline">·</span>
                  <span className="text-xs font-mono text-muted">
                    {activeStoryModal.totalWords} palavras ({activeStoryModal.totalUniqueWords} únicas)
                  </span>
                </div>
                <p className="text-xs font-mono text-muted">
                  {activeStoryModal.titlePinyin}
                </p>
                <h2
                  id="story-modal-title"
                  className="text-2xl sm:text-3xl font-zh font-semibold text-ink mt-0.5"
                >
                  {activeStoryModal.titleZh}
                </h2>
                <p className="text-sm sm:text-base font-semibold text-ink mt-1">
                  {activeStoryModal.titlePt}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveStoryModal(null)}
                className="w-9 h-9 rounded-md border border-border bg-canvas text-muted hover:text-ink flex items-center justify-center shrink-0"
                aria-label="Fechar detalhes da história"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 flex-1 overflow-y-auto pb-safe">
              {/* Synopsis */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                  Sinopse da História
                </h3>
                <p className="text-sm text-ink leading-relaxed">
                  {activeStoryModal.synopsisPt}
                </p>
              </div>

              {/* HSK Percentage Breakdown Box */}
              <div className="p-4 rounded-lg bg-surface border border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                  <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-jade" />
                    <span>Distribuição Real de Níveis HSK 3.0 na História</span>
                  </h3>
                  <span className="text-xs text-jade font-medium">
                    {activeStoryModal.targetRule.descriptionPt}
                  </span>
                </div>

                <HskDistributionBar
                  distribution={activeStoryModal.hskDistribution}
                />

                <p className="mt-3 text-xs text-muted leading-relaxed">
                  Esta proporção garante que você reconheça a grande maioria da estrutura das
                  frases imediatamente, inferindo os <strong className="text-ink">10% a 15% de vocabulário novo</strong> pelo
                  contexto sem interromper o fluxo de leitura.
                </p>
              </div>

              {/* Chapters List with Individual HSK % and Key Vocab */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                  Capítulos ({activeStoryModal.chapters.length})
                </h3>
                <div className="space-y-3">
                  {activeStoryModal.chapters.map((ch) => {
                    const progKey = `${activeStoryModal.slug}:${ch.id}`;
                    const prog = profile.chapterProgress[progKey];

                    return (
                      <div
                        key={ch.id}
                        className="p-4 rounded-md border border-border bg-surface hover:border-jade-border transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-muted">
                                {ch.titlePinyin}
                              </span>
                              {prog?.completed && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-jade-soft text-jade text-[11px] font-semibold">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Lido
                                </span>
                              )}
                            </div>
                            <h4 className="text-lg font-zh font-semibold text-ink mt-0.5">
                              {ch.titleZh}
                            </h4>
                            <p className="text-sm font-semibold text-ink">
                              {ch.titlePt}
                            </p>
                            <p className="text-xs text-muted mt-1">
                              {ch.summaryPt}
                            </p>
                          </div>

                          <Link
                            href={`/stories/${activeStoryModal.slug}/chapter/${ch.id}`}
                            onClick={() => setActiveStoryModal(null)}
                            className="shrink-0 w-full sm:w-auto justify-center px-3.5 py-2.5 sm:py-2 min-h-[40px] rounded-md bg-jade text-canvas hover:bg-jade-deep text-xs font-semibold inline-flex items-center gap-1.5 self-stretch sm:self-center"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Ler & Ouvir Capítulo</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        {/* Chapter-specific HSK % and Key Vocabulary preview */}
                        <div className="mt-3 pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1 max-w-xs">
                            <HskDistributionBar
                              distribution={ch.hskDistribution}
                              compact
                            />
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[11px] text-muted inline-flex items-center gap-1 mr-1">
                              <Sparkles className="w-3 h-3 text-ginkgo" />
                              Destaques:
                            </span>
                            {ch.keyVocabulary.map((kv) => (
                              <span
                                key={kv.hanzi}
                                className="px-2 py-0.5 rounded bg-canvas border border-border text-xs font-zh text-ink"
                                title={`${kv.pinyin} — ${kv.meaningPt} (HSK ${kv.hskLevel})`}
                              >
                                {kv.hanzi}{" "}
                                <span className="text-[10px] font-sans text-muted">
                                  ({kv.meaningPt})
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

