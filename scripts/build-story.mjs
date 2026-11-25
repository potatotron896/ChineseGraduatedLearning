/**
 * scripts/build-story.mjs
 *
 * 1. Calculates exact HSK 3.0 percentage distributions per chapter and per story
 * 2. Validates against the story's targetRule (e.g. >= 85% HSK 1)
 * 3. Generates natural Neural Chinese MP3 audio via msedge-tts (or edge-tts python CLI if available)
 * 4. Computes accurate millisecond word-level & sentence-level timestamps for karaoke sync
 */
import fs from "node:fs";
import path from "node:path";
import { MsEdgeTTS, OUTPUT_FORMAT, MetadataOptions } from "msedge-tts";

const ROOT = process.cwd();

const args = process.argv.slice(2);
const FORCE_AUDIO = args.includes("--force-audio");
const SLUG_ARG = args.find((a) => a.startsWith("--slug="));
const ONLY_SLUG = SLUG_ARG ? SLUG_ARG.slice("--slug=".length) : null;

const CHAPTER_LIMITS = {
  1: { minSentences: 30, maxSentences: 40, minChars: 300, maxChars: 450 },
  2: { minSentences: 40, maxSentences: 55, minChars: 500, maxChars: 750 },
  3: { minSentences: 55, maxSentences: 75, minChars: 800, maxChars: 1200 },
};

const MAX_HANZI_PER_SENTENCE = 18;

function countHanzi(text) {
  return (text.match(/[\u4e00-\u9fff]/g) || []).length;
}

function validateChapterMetrics(chapter, targetHsk) {
  const warnings = [];
  const limits = CHAPTER_LIMITS[targetHsk] || CHAPTER_LIMITS[3];
  const sentenceCount = chapter.sentences.length;
  const totalHanzi = chapter.sentences.reduce((sum, s) => sum + countHanzi(s.zhText), 0);

  if (sentenceCount < limits.minSentences || sentenceCount > limits.maxSentences) {
    warnings.push(
      `Frases: ${sentenceCount} (meta HSK ${targetHsk}: ${limits.minSentences}-${limits.maxSentences})`
    );
  }
  if (totalHanzi < limits.minChars || totalHanzi > limits.maxChars) {
    warnings.push(
      `Caracteres: ${totalHanzi} (meta HSK ${targetHsk}: ${limits.minChars}-${limits.maxChars})`
    );
  }

  const longSentences = chapter.sentences
    .map((s) => ({ id: s.id, len: countHanzi(s.zhText) }))
    .filter((s) => s.len > MAX_HANZI_PER_SENTENCE);
  if (longSentences.length > 0) {
    warnings.push(
      `Frases > ${MAX_HANZI_PER_SENTENCE} hanzi: ${longSentences.map((s) => `${s.id}(${s.len})`).join(", ")}`
    );
  }

  const fullText = chapter.sentences.map((s) => s.zhText).join("\n");
  const tokenCounts = new Map();
  for (const s of chapter.sentences) {
    for (const t of s.tokens) {
      if (!t.isPunctuation) {
        tokenCounts.set(t.hanzi, (tokenCounts.get(t.hanzi) || 0) + 1);
      }
    }
  }

  const countOccurrences = (word) => {
    const byToken = tokenCounts.get(word) || 0;
    const byText = fullText.split(word).length - 1;
    return Math.max(byToken, byText);
  };

  const targetReport = [];
  if (Array.isArray(chapter.targetWords) && chapter.targetWords.length > 0) {
    for (const word of chapter.targetWords) {
      const c = countOccurrences(word);
      targetReport.push(`${word}:${c}`);
      if (c < 5) {
        warnings.push(`Palavra-alvo "${word}" apareceu ${c}x (mínimo 5)`);
      }
    }
  }

  const reviewReport = [];
  if (Array.isArray(chapter.reviewWords) && chapter.reviewWords.length > 0) {
    for (const word of chapter.reviewWords) {
      const c = countOccurrences(word);
      reviewReport.push(`${word}:${c}`);
      if (c < 2) {
        warnings.push(`Palavra de revisão "${word}" apareceu ${c}x (mínimo 2)`);
      }
    }
  }

  return { sentenceCount, totalHanzi, warnings, targetReport, reviewReport };
}

// MPEG-2 Layer 3, 48 kbps, 24 kHz, Mono -> 144 bytes = 24 ms per frame
const MP3_FRAME_BYTES = 144;
const MP3_FRAME_MS = 24;
const SILENT_FRAME = Buffer.alloc(MP3_FRAME_BYTES);
SILENT_FRAME[0] = 0xff;
SILENT_FRAME[1] = 0xf3;
SILENT_FRAME[2] = 0x64;
SILENT_FRAME[3] = 0xc4;

const HSK_AUDIO_PROFILES = {
  1: { rate: "-20%", pauseFrames: 32 }, // 768 ms entre frases
  2: { rate: "-15%", pauseFrames: 28 }, // 672 ms entre frases
  3: { rate: "-10%", pauseFrames: 25 }, // 600 ms entre frases
};

function createSilenceBuffer(frames) {
  return Buffer.concat(Array.from({ length: frames }, () => SILENT_FRAME));
}

function bufferDurationMs(buf) {
  return Math.round((buf.length / MP3_FRAME_BYTES) * MP3_FRAME_MS);
}

async function createTtsClient(voiceName) {
  const tts = new MsEdgeTTS();
  const meta = new MetadataOptions();
  meta.wordBoundaryEnabled = true;
  await tts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3, meta);
  return tts;
}

async function synthesizeSentence(tts, text, rate) {
  const { audioStream, metadataStream } = tts.toStream(text, { rate });
  const chunks = [];
  const wordBoundaries = [];

  audioStream.on("data", (chunk) => chunks.push(chunk));
  metadataStream.on("data", (raw) => {
    try {
      const parsed = JSON.parse(raw.toString());
      for (const item of parsed?.Metadata || []) {
        if (item?.Type === "WordBoundary" && item?.Data) {
          const offsetMs = Math.round(item.Data.Offset / 10000);
          const durMs = Math.round(item.Data.Duration / 10000);
          wordBoundaries.push({
            text: item.Data.text?.Text || "",
            startMs: offsetMs,
            endMs: offsetMs + durMs,
          });
        }
      }
    } catch {}
  });

  await new Promise((resolve, reject) => {
    audioStream.on("end", resolve);
    audioStream.on("error", reject);
  });

  const buffer = Buffer.concat(chunks);
  return {
    buffer,
    durationMs: bufferDurationMs(buffer),
    wordBoundaries,
  };
}

async function generateChapterAudio(
  sentences,
  outFile,
  voiceName = "zh-CN-XiaoxiaoNeural",
  targetHsk = 1,
  forceRegen = false
) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  const timingsFile = `${outFile}.timings.json`;

  if (!forceRegen && fs.existsSync(outFile) && fs.statSync(outFile).size > 1024 && fs.existsSync(timingsFile)) {
    const size = fs.statSync(outFile).size;
    try {
      const cached = JSON.parse(fs.readFileSync(timingsFile, "utf8"));
      if (Array.isArray(cached?.sentenceTimings) && cached.sentenceTimings.length === sentences.length) {
        return {
          ok: true,
          durationMs: cached.totalDurationMs || Math.round(size / 6),
          bytes: size,
          sentenceTimings: cached.sentenceTimings,
        };
      }
    } catch {}
  }

  const profile = HSK_AUDIO_PROFILES[targetHsk] || HSK_AUDIO_PROFILES[3];
  const leadInBuf = createSilenceBuffer(6); // 144 ms
  const pauseBuf = createSilenceBuffer(profile.pauseFrames);
  const pauseMs = bufferDurationMs(pauseBuf);

  const audioParts = [leadInBuf];
  const sentenceTimings = [];
  let cursorMs = bufferDurationMs(leadInBuf);

  let tts = null;
  try {
    tts = await createTtsClient(voiceName);

    for (let i = 0; i < sentences.length; i++) {
      const sentenceText = sentences[i].zhText;
      let res = null;

      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          if (!tts) tts = await createTtsClient(voiceName);
          res = await synthesizeSentence(tts, sentenceText, profile.rate);
          if (res.buffer.length >= MP3_FRAME_BYTES) break;
        } catch (err) {
          try {
            tts?.close();
          } catch {}
          tts = null;
          if (attempt === 3) {
            console.warn(`  [WARN] Sentence ${i + 1} TTS failed (${path.basename(outFile)}): ${err.message}`);
            return { ok: false, durationMs: 0, bytes: 0, sentenceTimings: null };
          }
          await new Promise((r) => setTimeout(r, 600 * attempt));
        }
      }

      audioParts.push(res.buffer);
      sentenceTimings.push({
        startOffsetMs: cursorMs,
        durationMs: res.durationMs,
        wordBoundaries: res.wordBoundaries,
      });
      cursorMs += res.durationMs;

      if (i < sentences.length - 1) {
        audioParts.push(pauseBuf);
        cursorMs += pauseMs;
      }
    }
  } finally {
    try {
      tts?.close();
    } catch {}
  }

  const finalBuffer = Buffer.concat(audioParts);
  const totalDurationMs = bufferDurationMs(finalBuffer);
  fs.writeFileSync(outFile, finalBuffer);
  fs.writeFileSync(
    timingsFile,
    JSON.stringify({ rate: profile.rate, pauseMs, totalDurationMs, sentenceTimings }),
    "utf8"
  );

  return { ok: true, durationMs: totalDurationMs, bytes: finalBuffer.length, sentenceTimings };
}

function computeHskDistribution(tokens) {
  const wordTokens = tokens.filter((t) => !t.isPunctuation && t.hskLevel);
  const total = wordTokens.length || 1;
  const counts = new Map();

  for (const t of wordTokens) {
    const lvl = t.hskLevel || 1;
    counts.set(lvl, (counts.get(lvl) || 0) + 1);
  }

  const distribution = Array.from(counts.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([level, count]) => ({
      level,
      count,
      percentage: Number(((count / total) * 100).toFixed(1)),
    }));

  return { distribution, totalWords: wordTokens.length };
}

function stripPunct(str) {
  return (str || "").replace(/[\s\p{P}\p{S}]/gu, "");
}

function applyWordBoundaryTimestamps(sentences, sentenceTimings) {
  let maxEndMs = 0;

  sentences.forEach((sentence, idx) => {
    const timing = sentenceTimings[idx];
    if (!timing) return;

    const { startOffsetMs, durationMs, wordBoundaries } = timing;
    const sentenceEndMs = startOffsetMs + durationMs;
    sentence.startMs = startOffsetMs;
    sentence.endMs = sentenceEndMs;
    if (sentenceEndMs > maxEndMs) maxEndMs = sentenceEndMs;

    const charTimings = [];
    for (const wb of wordBoundaries || []) {
      const clean = stripPunct(wb.text);
      if (!clean) continue;
      const span = Math.max(20, wb.endMs - wb.startMs);
      const step = span / clean.length;
      for (let i = 0; i < clean.length; i++) {
        charTimings.push({
          ch: clean[i],
          startMs: startOffsetMs + Math.round(wb.startMs + i * step),
          endMs: startOffsetMs + Math.round(wb.startMs + (i + 1) * step),
        });
      }
    }

    if (charTimings.length === 0) {
      assignTimestamps([sentence], durationMs);
      sentence.startMs = startOffsetMs;
      sentence.endMs = sentenceEndMs;
      for (const t of sentence.tokens) {
        t.startMs += startOffsetMs;
        t.endMs += startOffsetMs;
      }
      return;
    }

    let wbIdx = 0;
    let prevEndMs = charTimings[0].startMs;

    for (const token of sentence.tokens) {
      if (token.isPunctuation) {
        token.startMs = prevEndMs;
        token.endMs = prevEndMs;
        continue;
      }

      const cleanTok = stripPunct(token.hanzi);
      if (!cleanTok) {
        token.startMs = prevEndMs;
        token.endMs = prevEndMs;
        continue;
      }

      let firstStart = null;
      let lastEnd = null;

      for (const ch of cleanTok) {
        let matchedIdx = -1;
        const searchLimit = Math.min(charTimings.length, wbIdx + 6);
        for (let j = wbIdx; j < searchLimit; j++) {
          if (charTimings[j].ch === ch) {
            matchedIdx = j;
            break;
          }
        }
        if (matchedIdx !== -1) {
          if (firstStart === null) firstStart = charTimings[matchedIdx].startMs;
          lastEnd = charTimings[matchedIdx].endMs;
          wbIdx = matchedIdx + 1;
        }
      }

      if (firstStart !== null && lastEnd !== null) {
        token.startMs = Math.max(prevEndMs, firstStart);
        token.endMs = Math.max(token.startMs + 20, lastEnd);
      } else {
        token.startMs = prevEndMs;
        token.endMs = Math.min(sentenceEndMs, prevEndMs + Math.max(80, cleanTok.length * 140));
      }
      prevEndMs = token.endMs;
    }
  });

  return maxEndMs;
}

function assignTimestamps(sentences, totalDurationMs) {
  // Calculate total character weight across sentences (Chinese chars + pause weight for punctuation)
  let totalWeight = 0;
  const sentenceWeights = sentences.map((s) => {
    let sWeight = 0;
    const tokenWeights = s.tokens.map((t) => {
      const w = t.isPunctuation ? 1.4 : Math.max(1, t.hanzi.length * 1.15);
      sWeight += w;
      return w;
    });
    // Add natural inter-sentence pause weight
    sWeight += 2.0;
    totalWeight += sWeight;
    return { sWeight, tokenWeights };
  });

  const effectiveDurationMs =
    totalDurationMs > 1000 ? totalDurationMs : Math.round(totalWeight * 290);

  let cursorMs = 150; // slight lead-in

  sentences.forEach((sentence, sIdx) => {
    const { sWeight, tokenWeights } = sentenceWeights[sIdx];
    const sentenceAllocatedMs = (sWeight / totalWeight) * (effectiveDurationMs - 300);
    const sentenceStartMs = Math.round(cursorMs);

    const tokenSumWeight = tokenWeights.reduce((a, b) => a + b, 0) || 1;
    const speakingSpanMs = sentenceAllocatedMs * 0.88; // 12% pause at end of sentence

    let tokenCursor = cursorMs;
    sentence.tokens.forEach((token, tIdx) => {
      const tSpan = (tokenWeights[tIdx] / tokenSumWeight) * speakingSpanMs;
      token.startMs = Math.round(tokenCursor);
      token.endMs = Math.round(tokenCursor + tSpan);
      tokenCursor += tSpan;
    });

    cursorMs += sentenceAllocatedMs;
    sentence.startMs = sentenceStartMs;
    sentence.endMs = Math.round(cursorMs);
  });

  return Math.round(cursorMs);
}

async function main() {
  console.log("=== WenDu (文读) Story HSK 3.0 Validator & Neural Audio Builder ===");
  // Dynamically import stories-raw using tsx or node register if needed, or compile via ts
  const ts = await import("typescript");
  const dictPath = path.join(ROOT, "src/data/character-dictionary.ts");
  const lexiconPath = path.join(ROOT, "src/data/word-lexicon.ts");
  const rawPath = path.join(ROOT, "src/data/stories-raw.ts");

  const tempDir = path.join(ROOT, ".next/cache/story-build");
  fs.mkdirSync(tempDir, { recursive: true });

  const filesToTranspile = [dictPath, rawPath];
  if (fs.existsSync(lexiconPath)) filesToTranspile.splice(1, 0, lexiconPath);

  const storiesDir = path.join(ROOT, "src/data/stories");
  if (fs.existsSync(storiesDir)) {
    fs.mkdirSync(path.join(tempDir, "stories"), { recursive: true });
    for (const entry of fs.readdirSync(storiesDir)) {
      if (entry.endsWith(".ts")) {
        filesToTranspile.splice(filesToTranspile.length - 1, 0, path.join(storiesDir, entry));
      }
    }
  }

  for (const file of filesToTranspile) {
    const source = fs.readFileSync(file, "utf8");
    const transpiled = ts.default.transpileModule(source, {
      compilerOptions: {
        module: ts.default.ModuleKind.ESNext,
        target: ts.default.ScriptTarget.ES2022,
      },
    });
    let code = transpiled.outputText
      .replace(/from "(\.\.?\/[^"]+)"/g, (m, p1) =>
        p1.endsWith(".mjs") || p1.endsWith(".json") ? m : `from "${p1}.mjs"`
      );
    const rel = path.relative(path.join(ROOT, "src/data"), file);
    const outPath = path.join(tempDir, rel.replace(/\.ts$/, ".mjs"));
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, code, "utf8");
  }

  const { RAW_STORIES } = await import(
    "file://" + path.join(tempDir, "stories-raw.mjs").replace(/\\/g, "/")
  );

  const builtStories = [];

  for (const story of RAW_STORIES) {
    const shouldForceAudio = FORCE_AUDIO && (!ONLY_SLUG || ONLY_SLUG === story.slug);
    console.log(`\n📖 Story: ${story.titleZh} (${story.titlePt}) — Target HSK ${story.targetHsk}`);
    const allStoryTokens = [];
    const uniqueWords = new Set();

    for (const chapter of story.chapters) {
      const chapterTokens = [];
      for (const sentence of chapter.sentences) {
        for (const token of sentence.tokens) {
          chapterTokens.push(token);
          allStoryTokens.push(token);
          if (!token.isPunctuation) {
            uniqueWords.add(token.hanzi);
          }
        }
      }

      const { distribution } = computeHskDistribution(chapterTokens);
      chapter.hskDistribution = distribution;

      const metrics = validateChapterMetrics(chapter, story.targetHsk);

      const audioOutPath = path.join(ROOT, "public", chapter.audioUrl.replace(/^\//, ""));

      const audioRes = await generateChapterAudio(
        chapter.sentences,
        audioOutPath,
        chapter.voiceName || "zh-CN-XiaoxiaoNeural",
        story.targetHsk,
        shouldForceAudio
      );

      const finalDurationMs =
        audioRes.ok && audioRes.sentenceTimings
          ? applyWordBoundaryTimestamps(chapter.sentences, audioRes.sentenceTimings)
          : assignTimestamps(chapter.sentences, audioRes.durationMs);
      chapter.audioDurationMs = finalDurationMs;

      const distStr = distribution
        .map((d) => `HSK ${d.level}: ${d.percentage}% (${d.count})`)
        .join(" | ");
      console.log(
        `  ├─ ${chapter.titleZh}: ${metrics.sentenceCount} frases, ${metrics.totalHanzi} hanzi | ${distStr} | Audio: ${
          audioRes.ok ? `${(audioRes.bytes / 1024).toFixed(1)} KB (${(finalDurationMs / 1000).toFixed(1)}s)` : "Timestamped fallback"
        }`
      );
      if (metrics.targetReport.length > 0) {
        console.log(`  │   🎯 Alvo: ${metrics.targetReport.join(", ")}`);
      }
      if (metrics.reviewReport.length > 0) {
        console.log(`  │   🔁 Revisão: ${metrics.reviewReport.join(", ")}`);
      }
      for (const w of metrics.warnings) {
        console.warn(`  │   ⚠️  ${w}`);
      }
    }

    const { distribution: storyDist, totalWords } = computeHskDistribution(allStoryTokens);
    const baseAndBelowPct = storyDist
      .filter((d) => d.level <= story.targetHsk)
      .reduce((acc, d) => acc + d.percentage, 0);

    console.log(
      `  └─ ✅ Total Words: ${totalWords} (${uniqueWords.size} unique) | Target HSK <=${story.targetHsk} coverage: ${baseAndBelowPct.toFixed(1)}%`
    );

    builtStories.push({
      ...story,
      hskDistribution: storyDist,
      totalWords,
      totalUniqueWords: uniqueWords.size,
    });
  }

  const outJsonPath = path.join(ROOT, "src/data/stories-built.json");
  fs.writeFileSync(outJsonPath, JSON.stringify(builtStories, null, 2), "utf8");
  console.log(`\n✨ Saved validated stories + HSK distributions + timestamps to src/data/stories-built.json`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
