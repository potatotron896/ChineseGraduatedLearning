import React from "react";

export type PinyinTone = 1 | 2 | 3 | 4 | 5;

/**
 * Detects the Mandarin tone (1 to 4, or 5 for neutral) from a pinyin syllable with tone marks.
 */
export function detectToneFromSyllable(syl: string): PinyinTone {
  if (/[āēīōūǖĀĒĪŌŪǕ]/.test(syl)) return 1;
  if (/[áéíóúǘÁÉÍÓÚǗ]/.test(syl)) return 2;
  if (/[ǎěǐǒǔǚǍĚǏǑǓǙ]/.test(syl)) return 3;
  if (/[àèìòùǜÀÈÌÒÙǛ]/.test(syl)) return 4;
  return 5;
}

/**
 * Splits a single word or multi-word pinyin string into syllables and colors each by its tone.
 * Handles both space-separated syllables ("fēi cháng") and concatenated syllables ("fēicháng", "yǒudiǎnr").
 */
export function splitPinyinIntoSyllables(word: string): string[] {
  // Match standard Mandarin syllables with tone marks or neutral vowels so concatenated words like "fēicháng" split cleanly into ["fēi", "cháng"]
  const syllableRegex =
    /[bpmfdtnlgkhjqxzcsrywBPMFDTNLGKHJQXZCSRYW]?h?[aāáǎàeēéěèiīíǐìoōóǒòuūúǔùüǖǘǚǜAĀÁǍÀEĒÉĚÈIĪÍǏÌOŌÓǑÒUŪÚǓÙÜǕǗǙǛ]+(?:ng|n|r)?/g;
  const matches = word.match(syllableRegex);
  if (matches && matches.join("").length === word.replace(/['’]/g, "").length) {
    return matches;
  }
  return [word];
}

interface ColoredPinyinProps {
  pinyin?: string;
  className?: string;
}

export function ColoredPinyin({ pinyin, className = "" }: ColoredPinyinProps) {
  if (!pinyin || pinyin === "—") {
    return <span className={`tone-5 ${className}`}>—</span>;
  }

  const spaceParts = pinyin.trim().split(/\s+/);

  return (
    <span className={className}>
      {spaceParts.map((part, pIdx) => {
        const syllables = splitPinyinIntoSyllables(part);
        return (
          <React.Fragment key={pIdx}>
            {pIdx > 0 && " "}
            {syllables.map((syl, sIdx) => {
              const tone = detectToneFromSyllable(syl);
              return (
                <span key={sIdx} className={`tone-${tone}`}>
                  {syl}
                </span>
              );
            })}
          </React.Fragment>
        );
      })}
    </span>
  );
}
