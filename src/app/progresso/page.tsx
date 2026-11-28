"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart2,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  Flame,
  GraduationCap,
  Layers,
  ShieldCheck,
  Snowflake,
  Target,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { STORIES } from "@/data/stories";
import { getHskStyle } from "@/components/HskDistributionBar";
import type { HskLevel } from "@/types/story";

const GOAL_OPTIONS = [5, 10, 15, 20, 30];

export default function ProgressPage() {
  const { profile, telemetrySummary, updatePreferences, srsDueCount } = useUser();

  const dailyGoalMinutes = profile.preferences.dailyGoalMinutes ?? 10;
  const todaySeconds = telemetrySummary?.todaySeconds || 0;
  const weekSeconds = telemetrySummary?.weekSeconds || 0;
  const totalSeconds = telemetrySummary?.totalSeconds || 0;
  const totalChapters = telemetrySummary?.totalChaptersCompleted || 0;
  const totalWordsSaved = Object.keys(profile.savedVocabulary).length;
  const streak = telemetrySummary?.streak;
  const daily30 = telemetrySummary?.daily30 || [];

  const todayMinutes = Math.floor(todaySeconds / 60);
  const weekMinutes = Math.round(weekSeconds / 60);
  const totalMinutes = Math.round(totalSeconds / 60);
  const goalPct = Math.min(100, Math.round((todaySeconds / (dailyGoalMinutes * 60)) * 100));

  const maxDailySec = useMemo(() => {
    const m = Math.max(...daily30.map((d) => d.activeSeconds), 60);
    return m;
  }, [daily30]);

  // Estimativa de nível: palavras únicas vistas por nível HSK em capítulos concluídos + vocabulário salvo
  const seenHskWords = useMemo(() => {
    const sets: Record<number, Set<string>> = { 1: new Set(), 2: new Set(), 3: new Set() };
    for (const story of STORIES) {
      for (const ch of story.chapters) {
        const key = `${story.slug}:${ch.id}`;
        if (!profile.chapterProgress[key]?.completed) continue;
        for (const s of ch.sentences) {
          for (const t of s.tokens) {
            if (t.isPunctuation || !t.hanzi) continue;
            const lvl = t.hskLevel || story.targetHsk;
            if (!sets[lvl]) sets[lvl] = new Set();
            sets[lvl].add(t.hanzi);
          }
        }
      }
    }
    for (const item of Object.values(profile.savedVocabulary)) {
      const lvl = item.hskLevel || 1;
      if (!sets[lvl]) sets[lvl] = new Set();
      sets[lvl].add(item.hanzi);
    }
    return Object.entries(sets)
      .map(([lvl, set]) => ({ level: Number(lvl) as HskLevel, count: set.size }))
      .filter((x) => x.level <= 3 || x.count > 0)
      .sort((a, b) => a.level - b.level);
  }, [profile.chapterProgress, profile.savedVocabulary]);

  function downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function handleExportJson() {
    const payload = {
      exportedAt: new Date().toISOString(),
      username: profile.username || "visitante",
      preferences: profile.preferences,
      chapterProgress: profile.chapterProgress,
      savedVocabulary: Object.values(profile.savedVocabulary),
      telemetrySummary,
    };
    downloadFile(
      JSON.stringify(payload, null, 2),
      `wendu-backup-${new Date().toISOString().slice(0, 10)}.json`,
      "application/json;charset=utf-8"
    );
  }

  function handleExportVocabCsv() {
    const headers = ["hanzi", "pinyin", "meaning_pt", "hsk_level", "story_title_pt", "example_zh", "added_at"];
    const escapeCsv = (val: string | number | undefined) => {
      const s = String(val ?? "").replace(/"/g, '""');
      return `"${s}"`;
    };
    const rows = Object.values(profile.savedVocabulary).map((v) =>
      [
        v.hanzi,
        v.pinyin,
        v.meaningPt,
        v.hskLevel,
        v.storyTitlePt,
        v.exampleSentenceZh || "",
        v.addedAt,
      ]
        .map(escapeCsv)
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    downloadFile(
      "\uFEFF" + csv,
      `wendu-vocabulario-${new Date().toISOString().slice(0, 10)}.csv`,
      "text/csv;charset=utf-8"
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-jade hover:underline mb-2 py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para as Histórias</span>
          </Link>
          <h1 className="text-xl sm:text-3xl font-bold text-ink flex items-center gap-2.5">
            <BarChart2 className="w-6 h-6 sm:w-7 sm:h-7 text-jade shrink-0" />
            <span>Meu Progresso & Estatísticas</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Acompanhe seu ritmo de leitura ativa, sequência diária, distribuição HSK e meta pessoal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExportVocabCsv}
            className="px-3 py-2 rounded-md border border-border bg-surface hover:border-jade text-xs font-semibold text-ink inline-flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-jade" />
            <span>Exportar Vocabulário (CSV)</span>
          </button>
          <button
            type="button"
            onClick={handleExportJson}
            className="px-3 py-2 rounded-md border border-border bg-surface hover:border-jade text-xs font-semibold text-ink inline-flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-jade" />
            <span>Backup Completo (JSON)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Sequência Atual</span>
            <Flame className="w-4 h-4 text-cinnabar" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-ink mt-1 font-mono">
            {streak?.currentStreak || 0} <span className="text-sm font-normal text-muted">dias</span>
          </div>
          <div className="text-[11px] text-muted mt-1 flex items-center gap-1">
            <span>Recorde: {streak?.longestStreak || 0} dias</span>
            <span>·</span>
            <span className="inline-flex items-center gap-0.5" title="1 congelamento automático por semana">
              <Snowflake className="w-3 h-3 text-jade" />
              {streak?.freezeAvailableThisWeek ? "1 disp." : "usado"}
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Tempo Lido</span>
            <Clock className="w-4 h-4 text-jade" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-ink mt-1 font-mono">
            {totalMinutes} <span className="text-sm font-normal text-muted">min</span>
          </div>
          <div className="text-[11px] text-muted mt-1">
            Hoje: {todayMinutes} min · 7 dias: {weekMinutes} min
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Capítulos Concluídos</span>
            <CheckCircle2 className="w-4 h-4 text-jade" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-ink mt-1 font-mono">
            {totalChapters}
          </div>
          <div className="text-[11px] text-muted mt-1">
            {telemetrySummary?.totalCardsReviewed || 0} revisões de flashcards
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Palavras Salvas</span>
            <BookMarked className="w-4 h-4 text-jade" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-ink mt-1 font-mono">
            {totalWordsSaved}
          </div>
          <Link href="/revisar" className="text-[11px] text-jade hover:underline mt-1 inline-flex items-center gap-1">
            <Layers className="w-3 h-3" />
            <span>{srsDueCount} pendentes para revisar</span>
          </Link>
        </div>
      </div>

      {/* Daily Goal & HSK Level Estimation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="rounded-lg border border-border bg-surface p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-ink flex items-center gap-2">
              <Target className="w-4 h-4 text-jade" />
              <span>Meta Diária de Leitura</span>
            </h2>
            <span className="text-xs font-mono font-semibold text-jade">
              {todayMinutes} / {dailyGoalMinutes} min ({goalPct}%)
            </span>
          </div>
          <div className="h-3 rounded-full bg-canvas border border-border overflow-hidden">
            <div
              className="h-full bg-jade transition-all duration-300"
              style={{ width: `${goalPct}%` }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted">Ajustar meta:</span>
            {GOAL_OPTIONS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => updatePreferences({ dailyGoalMinutes: m })}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors ${
                  dailyGoalMinutes === m
                    ? "bg-jade text-canvas border-jade"
                    : "bg-canvas text-muted border-border hover:text-ink"
                }`}
              >
                {m} min
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface p-5 space-y-3">
          <h2 className="text-sm font-bold text-ink flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-jade" />
            <span>Estimativa de Vocabulário Visto (HSK 3.0)</span>
          </h2>
          <p className="text-xs text-muted">
            Palavras únicas encontradas nos capítulos que você concluiu e no seu vocabulário salvo:
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {seenHskWords.map((item) => {
              const style = getHskStyle(item.level);
              return (
                <div
                  key={item.level}
                  className="rounded-md border border-border bg-canvas p-3 text-center"
                >
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${style.badge}`}
                  >
                    HSK {item.level}
                  </span>
                  <div className="text-xl font-bold font-mono text-ink mt-1.5">
                    {item.count}
                  </div>
                  <div className="text-[11px] text-muted">palavras únicas</div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* 30-day Activity Chart */}
      <section className="rounded-lg border border-border bg-surface p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-ink">Atividade nos Últimos 30 Dias</h2>
          <span className="text-xs text-muted">Tempo ativo (minutos/dia)</span>
        </div>
        <div className="h-36 flex items-end gap-1 sm:gap-1.5 pt-4">
          {daily30.map((d) => {
            const mins = Math.round(d.activeSeconds / 60);
            const heightPct = d.activeSeconds > 0 ? Math.max(8, Math.round((d.activeSeconds / maxDailySec) * 100)) : 3;
            const metGoal = d.activeSeconds >= dailyGoalMinutes * 60;
            return (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center justify-end h-full group relative"
                title={`${d.day}: ${mins} min · ${d.chaptersCompleted} cap. · ${d.cardsReviewed} revisões`}
              >
                <div
                  className={`w-full rounded-t transition-all ${
                    d.activeSeconds === 0
                      ? "bg-border/60"
                      : metGoal
                      ? "bg-jade"
                      : "bg-cinnabar/80"
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] font-mono text-muted">
          <span>{daily30[0]?.day || ""}</span>
          <span>Hoje</span>
        </div>
      </section>

      {/* Reading Distribution by HSK */}
      <section className="rounded-lg border border-border bg-surface p-5 space-y-3">
        <h2 className="text-sm font-bold text-ink flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-jade" />
          <span>Distribuição de Leitura por Nível HSK</span>
        </h2>
        {!telemetrySummary?.hskReadDistribution.length ? (
          <p className="text-xs text-muted">
            Leia ou conclua capítulos para visualizar sua distribuição por nível HSK.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {telemetrySummary.hskReadDistribution.map((row) => {
              const style = getHskStyle(row.level);
              return (
                <div
                  key={row.level}
                  className="rounded-md border border-border bg-canvas p-3.5 flex items-center justify-between"
                >
                  <div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${style.badge}`}
                    >
                      HSK {row.level}
                    </span>
                    <div className="text-xs text-muted mt-1.5">
                      {row.chaptersCount} {row.chaptersCount === 1 ? "capítulo" : "capítulos"}
                    </div>
                  </div>
                  <div className="text-lg font-bold font-mono text-ink">
                    {row.minutes} min
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Privacy Notice */}
      <div className="rounded-lg border border-border bg-surface/60 p-4 flex items-start gap-3 text-xs text-muted">
        <ShieldCheck className="w-4 h-4 text-jade shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-ink">Privacidade:</strong> Coletamos apenas o tempo ativo de leitura,
          capítulos concluídos e histórico de revisões necessários para calcular suas estatísticas pessoais e
          conquistas. Visitantes têm os dados armazenados apenas localmente no navegador.
        </p>
      </div>
    </div>
  );
}

