"use client";

import React from "react";
import {
  Bookmark,
  BookmarkCheck,
  Compass,
  Layers,
  Puzzle,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { getHskStyle } from "@/components/HskDistributionBar";
import { ColoredPinyin } from "@/components/ColoredPinyin";
import type { StorySentence, StoryToken } from "@/types/story";

interface EtymologyInspectorProps {
  token: StoryToken | null;
  sentence: StorySentence | null;
  storySlug: string;
  storyTitlePt: string;
  onClose: () => void;
  onPlaySentenceFromHere?: (startMs: number) => void;
  onStepToken?: (delta: -1 | 1) => void;
  variant?: "sidebar" | "modal";
}

export function EtymologyInspector({
  token,
  sentence,
  storySlug,
  storyTitlePt,
  onClose,
  onPlaySentenceFromHere,
  onStepToken,
  variant = "sidebar",
}: EtymologyInspectorProps) {
  const { isWordSaved, toggleVocabularyItem } = useUser();
  const isModal = variant === "modal";

  function speakIsolatedWord(text: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "zh-CN";
      utter.rate = 0.85;
      window.speechSynthesis.speak(utter);
    }
  }

  if (!token || token.isPunctuation) {
    return (
      <aside className="rounded-lg border border-border bg-surface p-5 sticky top-20">
        <div className="flex items-center gap-2 text-jade font-semibold text-sm mb-2">
          <Compass className="w-4 h-4" />
          <span>Inspetor Etimológico de Hanzi</span>
        </div>
        <p className="text-xs text-muted leading-relaxed">
          Clique em qualquer <strong className="text-ink">palavra ou caractere chinês</strong> ao lado
          para abrir sua anatomia completa:
        </p>
        <ul className="mt-3 space-y-2 text-xs text-muted">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-jade mt-1.5 shrink-0" />
            <span>
              <strong className="text-ink">Camada 1 (A Palavra Composta):</strong> Nível HSK 3.0,
              a partir de quais palavras ela é formada e o que significam juntas no contexto.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cinnabar mt-1.5 shrink-0" />
            <span>
              <strong className="text-ink">Camada 2 (Cada Caractere & Radicais):</strong> O que cada
              símbolo significa isoladamente e como ele é construído graficamente.
            </span>
          </li>
        </ul>
      </aside>
    );
  }

  const saved = isWordSaved(token.hanzi);
  const hskStyle = getHskStyle(token.hskLevel || 1);

  return (
    <div
      className={
        isModal
          ? "bg-surface w-full overflow-x-hidden"
          : "rounded-lg border border-border bg-surface overflow-hidden sticky top-20 shadow-sm flex flex-col max-h-[calc(100vh-110px)]"
      }
      aria-label={`Detalhes etimológicos de ${token.hanzi}`}
    >
      {/* Content Body */}
      <div className={isModal ? "w-full" : "flex-1 overflow-y-auto min-h-0"}>
        {/* Top Layer 1: Compound Word Header */}
        <div className="p-4 sm:p-5 bg-canvas border-b border-border">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${hskStyle.badge}`}
              >
                HSK {token.hskLevel || 1}
              </span>
              {token.partOfSpeech && (
                <span className="px-2 py-0.5 rounded bg-surface border border-border text-[11px] font-medium text-muted">
                  {token.partOfSpeech}
                </span>
              )}
            </div>
            {!isModal && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-md text-muted hover:text-ink hover:bg-surface"
                aria-label="Fechar inspetor"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="text-3xl sm:text-5xl font-zh font-bold text-ink tracking-wide leading-tight break-all">
                {token.hanzi}
              </h2>
              <p className="text-base sm:text-lg font-bold mt-1">
                <ColoredPinyin pinyin={token.pinyin} />
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => speakIsolatedWord(token.hanzi)}
                title="Ouvir pronúncia isolada da palavra"
                className="px-3.5 py-2 min-h-[38px] rounded-lg border border-border bg-surface hover:border-jade text-ink text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Volume2 className="w-4 h-4 text-jade" />
                <span>Ouvir</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  toggleVocabularyItem({
                    hanzi: token.hanzi,
                    pinyin: token.pinyin || "",
                    meaningPt: token.meaningPt || "",
                    compoundLogicPt: token.compoundLogicPt,
                    hskLevel: token.hskLevel || 1,
                    storySlug,
                    storyTitlePt,
                    characters: token.characters,
                    exampleSentenceZh: sentence?.zhText,
                    exampleSentencePt: sentence?.translationPt,
                  })
                }
                className={`px-3.5 py-2 min-h-[38px] rounded-lg text-xs font-bold border transition-colors inline-flex items-center justify-center gap-1.5 active:scale-95 ${
                  saved
                    ? "bg-cinnabar-soft text-cinnabar border-cinnabar-border"
                    : "bg-jade text-canvas border-jade hover:bg-jade-deep"
                }`}
              >
                {saved ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5" />
                    <span>Salvo</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Salvar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Meaning Together (O que significam juntos) */}
          <div className="mt-4 p-3 rounded-xl bg-surface border border-border">
            <div className="text-[10px] font-bold uppercase tracking-wider text-cinnabar">
              Significado neste contexto
            </div>
            <p className="text-sm sm:text-base font-bold text-ink mt-0.5 break-words">
              {token.meaningPt}
            </p>
          </div>

          {/* Compound Formation Logic (A partir de quais palavras é formado) */}
          {token.compoundLogicPt && (
            <div className="mt-3 p-3 rounded-xl bg-jade-soft/70 border border-jade-border">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-jade mb-1">
                <Layers className="w-3.5 h-3.5 shrink-0" />
                <span>Como a palavra é formada:</span>
              </div>
              <p className="text-xs text-ink leading-relaxed break-words">
                {token.compoundLogicPt}
              </p>
            </div>
          )}
        </div>

        {/* Layer 2: Individual Characters & Radicals Anatomy */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Puzzle className="w-3.5 h-3.5 text-cinnabar shrink-0" />
              <span>
                Decomposição por Caractere ({token.characters?.length || 1})
              </span>
            </h3>
          </div>

          {token.characters?.map((charItem, idx) => {
            const charHsk = getHskStyle(charItem.hskLevel);
            return (
              <div
                key={`${charItem.char}-${idx}`}
                className="p-3.5 rounded-xl bg-canvas border border-border space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-surface border border-border flex items-center justify-center text-2xl font-zh font-semibold text-ink shrink-0">
                      {charItem.char}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold">
                          <ColoredPinyin pinyin={charItem.pinyin} />
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${charHsk.badge}`}
                        >
                          HSK {charItem.hskLevel}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-ink mt-0.5 break-words">
                        Isoladamente:{" "}
                        <span className="font-normal text-ink">
                          {charItem.isolatedMeaningPt}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* How the symbol is formed */}
                <div className="text-xs text-muted leading-relaxed border-t border-border pt-2 break-words">
                  <strong className="text-ink font-semibold">
                    Formação do Símbolo:{" "}
                  </strong>
                  {charItem.formationExplanationPt}
                </div>

                {/* Radicals & Sub-components */}
                {charItem.components && charItem.components.length > 0 && (
                  <div className="pt-1">
                    <div className="text-[11px] font-semibold text-muted mb-1.5">
                      Radicais e Componentes Constituintes:
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                      {charItem.components.map((comp, cIdx) => (
                        <div
                          key={`${comp.symbol}-${cIdx}`}
                          className="px-2.5 py-1.5 rounded-lg bg-surface border border-border flex items-center justify-between gap-2 text-xs"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-wrap">
                            <span className="font-zh text-base font-semibold text-jade shrink-0">
                              {comp.symbol}
                            </span>
                            <span className="font-semibold text-[11px] shrink-0">
                              (<ColoredPinyin pinyin={comp.pinyin} />)
                            </span>
                            <span className="text-ink font-medium break-words">
                              {comp.meaningPt}
                            </span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-canvas border border-border text-muted capitalize shrink-0">
                            {comp.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common word examples with this character */}
                {charItem.commonExamples && charItem.commonExamples.length > 0 && (
                  <div className="pt-1 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-muted inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-ginkgo shrink-0" />
                      Outras palavras com {charItem.char}:
                    </span>
                    {charItem.commonExamples.map((ex) => (
                      <span
                        key={ex.word}
                        className="px-2 py-0.5 rounded bg-surface border border-border text-[11px] font-zh text-ink break-words"
                      >
                        {ex.word}{" "}
                        <span className="font-sans text-[10px] text-muted">
                          (<ColoredPinyin pinyin={ex.pinyin} className="font-semibold" />: {ex.meaningPt})
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Sentence Context Reminder */}
          {sentence && (
            <div className="p-3 rounded-xl bg-canvas border border-border text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-muted">Frase na história:</span>
                {onPlaySentenceFromHere && (
                  <button
                    type="button"
                    onClick={() => onPlaySentenceFromHere(sentence.startMs)}
                    className="text-jade hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" />
                    Ouvir frase
                  </button>
                )}
              </div>
              <p className="font-zh text-sm text-ink break-words">{sentence.zhText}</p>
              <p className="text-muted mt-1 break-words">{sentence.translationPt}</p>
            </div>
          )}
        </div>
      </div>

      {/* Previous / Next Word Step Controls (Desktop Sidebar Only) */}
      {!isModal && onStepToken && (
        <div className="p-3 border-t border-border bg-canvas grid grid-cols-2 gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onStepToken(-1)}
            className="py-2.5 px-3 rounded-xl text-xs font-bold border border-border bg-surface text-ink hover:bg-surface-elevated active:scale-95 transition-all"
          >
            ‹ Anterior
          </button>
          <button
            type="button"
            onClick={() => onStepToken(1)}
            className="py-2.5 px-3 rounded-xl text-xs font-bold border border-border bg-surface text-ink hover:bg-surface-elevated active:scale-95 transition-all"
          >
            Próxima ›
          </button>
        </div>
      )}
    </div>
  );
}

