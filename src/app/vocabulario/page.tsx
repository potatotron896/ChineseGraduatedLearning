"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookMarked,
  BookOpen,
  Puzzle,
  Search,
  Trash2,
  Volume2,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { getHskStyle } from "@/components/HskDistributionBar";
import { ColoredPinyin } from "@/components/ColoredPinyin";

export default function SavedVocabularyPage() {
  const { profile, toggleVocabularyItem } = useUser();
  const [query, setQuery] = useState("");
  const items = Object.values(profile.savedVocabulary).sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );

  const filtered = items.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.hanzi.includes(q) ||
      item.pinyin.toLowerCase().includes(q) ||
      item.meaningPt.toLowerCase().includes(q)
    );
  });

  function speakWord(text: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "zh-CN";
      utter.rate = 0.85;
      window.speechSynthesis.speak(utter);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
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
            <BookMarked className="w-6 h-6 sm:w-7 sm:h-7 text-jade shrink-0" />
            <span>Meu Vocabulário & Etimologia Salva</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
            Palavras e caracteres que você destacou durante a leitura das histórias.
            Sincronizado automaticamente no seu navegador e na sua conta.
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <Link
              href="/revisar"
              className="px-3.5 py-2 rounded-md bg-jade text-canvas hover:bg-jade-deep text-xs font-semibold text-center whitespace-nowrap transition-colors"
            >
              Revisar Flashcards
            </Link>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filtrar vocabulário salvo..."
                className="w-full pl-9 pr-3 py-2.5 sm:py-2 rounded-md border border-border bg-surface text-base sm:text-xs text-ink placeholder:text-muted focus:outline-none focus:border-jade"
              />
            </div>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-lg border border-border bg-surface p-10 text-center max-w-lg mx-auto">
          <BookMarked className="w-9 h-9 text-muted mx-auto mb-3" />
          <h2 className="text-base font-semibold text-ink">
            Você ainda não salvou nenhuma palavra
          </h2>
          <p className="text-xs text-muted mt-1 leading-relaxed">
            Ao ler qualquer capítulo, clique sobre um caractere ou palavra em Mandarim
            para abrir o Inspetor Etimológico e clique em <strong className="text-ink">&ldquo;Salvar&rdquo;</strong>.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-jade text-canvas text-xs font-semibold hover:bg-jade-deep"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explorar Histórias Graduadas</span>
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item) => {
            const hskStyle = getHskStyle(item.hskLevel);
            return (
              <article
                key={item.hanzi}
                className="rounded-lg border border-border bg-surface p-5 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">
                          <ColoredPinyin pinyin={item.pinyin} />
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${hskStyle.badge}`}
                        >
                          HSK {item.hskLevel}
                        </span>
                      </div>
                      <h2 className="text-3xl font-zh font-semibold text-ink mt-1">
                        {item.hanzi}
                      </h2>
                      <p className="text-sm font-semibold text-ink mt-1">
                        {item.meaningPt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => speakWord(item.hanzi)}
                        title="Ouvir pronúncia"
                        aria-label={`Ouvir pronúncia de ${item.hanzi}`}
                        className="w-10 h-10 rounded-md border border-border bg-canvas hover:border-jade text-ink flex items-center justify-center active:scale-95 transition-transform"
                      >
                        <Volume2 className="w-4 h-4 text-jade" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleVocabularyItem(item)}
                        title="Remover do vocabulário salvo"
                        aria-label={`Remover ${item.hanzi} do vocabulário salvo`}
                        className="w-10 h-10 rounded-md border border-border bg-canvas hover:border-cinnabar text-muted hover:text-cinnabar flex items-center justify-center active:scale-95 transition-transform"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {item.compoundLogicPt && (
                    <div className="mt-3 p-3 rounded-md bg-canvas border border-border text-xs text-ink leading-relaxed">
                      <strong className="text-jade">Formação da Palavra: </strong>
                      {item.compoundLogicPt}
                    </div>
                  )}

                  {item.characters && item.characters.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="text-[11px] font-semibold text-muted flex items-center gap-1">
                        <Puzzle className="w-3 h-3 text-cinnabar" />
                        <span>Decomposição por Caractere:</span>
                      </div>
                      {item.characters.map((ch, idx) => (
                        <div
                          key={`${ch.char}-${idx}`}
                          className="p-2.5 rounded bg-canvas border border-border text-xs"
                        >
                          <div className="font-semibold text-ink">
                            <span className="font-zh text-base text-jade mr-1.5">
                              {ch.char}
                            </span>
                            <span className="font-bold mr-1.5">
                              (<ColoredPinyin pinyin={ch.pinyin} />)
                            </span>
                            — {ch.isolatedMeaningPt}
                          </div>
                          <p className="text-muted mt-0.5 leading-relaxed">
                            {ch.formationExplanationPt}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted">
                  <span>Salvo em: {item.storyTitlePt}</span>
                  <Link
                    href={`/stories/${item.storySlug}/chapter/ch-1`}
                    className="text-jade font-semibold hover:underline"
                  >
                    Ir para a história →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

