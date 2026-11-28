export type HskLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type ChineseFontMode = "app" | "school" | "book";
export type PinyinDisplayMode = "on" | "hover" | "off";

export type StoryCategory =
  | "Cotidiano"
  | "Cultura & Folclore"
  | "Mistério & Aventura"
  | "Viagem & Gastronomia"
  | "Diálogos Práticos";

/**
 * Radial / Component breakdown of a single Chinese Character (Hanzi)
 */
export interface CharacterComponent {
  symbol: string;       // e.g., "月 (肉)" or "氵"
  pinyin: string;       // e.g., "ròu" or "shuǐ"
  meaningPt: string;    // e.g., "carne / órgão do corpo" or "água (radical de 3 gotas)"
  role: "semântico" | "fonético" | "pictográfico" | "estrutural";
}

/**
 * Deep breakdown of a single Hanzi character
 */
export interface CharacterEtymology {
  char: string;                     // e.g., "脑"
  pinyin: string;                   // e.g., "nǎo"
  hskLevel: HskLevel;               // e.g., 1
  isolatedMeaningPt: string;        // O que significa isoladamente: "cérebro / mente / cabeça"
  formationExplanationPt: string;   // Como o símbolo é formado: "Ideograma fono-semântico: radical 月 (carne/órgão) à esquerda indicando parte do corpo + componente 亠/凶 à direita representando a calota craniana."
  components: CharacterComponent[]; // Decomposição em radicais/partes
  commonExamples?: {
    word: string;
    pinyin: string;
    meaningPt: string;
  }[];
}

/**
 * A word token inside a sentence (can be 1 or multiple characters, or punctuation)
 */
export interface StoryToken {
  id: string;                       // Unique token ID in chapter (e.g. "s1-t0")
  hanzi: string;                    // e.g., "电脑" or "。"
  isPunctuation?: boolean;
  pinyin?: string;                  // e.g., "diànnǎo"
  hskLevel?: HskLevel;              // e.g., 1 (in HSK 3.0)
  meaningPt?: string;               // O que significam juntos no contexto: "computador"
  partOfSpeech?: string;            // e.g., "substantivo", "verbo", "classificador (量词)"
  compoundLogicPt?: string;         // A partir de quais palavras é formado e por que juntas significam isso: "电 (eletricidade) + 脑 (cérebro) = 'cérebro elétrico' → computador."
  characters?: CharacterEtymology[]; // Detalhes de cada caractere que compõe a palavra
  startMs?: number;                 // Audio start timestamp in milliseconds
  endMs?: number;                   // Audio end timestamp in milliseconds
}

export interface GrammarNote {
  pattern: string;                  // e.g., "Sujeito + Tempo + Lugar + Verbo" ou "Classificador 本 (běn)"
  explanationPt: string;            // Explicação clara da estrutura gramatical na frase
  hskLevel: HskLevel;
}

export interface StorySentence {
  id: string;
  zhText: string;                   // Frase completa em chinês
  pinyinText: string;               // Frase completa em Pinyin
  translationPt: string;            // Tradução natural para o Português
  literalPt?: string;               // Tradução estrutural literal opcional para estudo
  grammarNotes?: GrammarNote[];     // Notas gramaticais que garantem clareza sintática
  startMs: number;
  endMs: number;
  tokens: StoryToken[];
}

export interface HskDistributionItem {
  level: HskLevel;
  count: number;
  percentage: number;               // e.g., 86.4
}

export interface HskTargetRule {
  descriptionPt: string;            // e.g., "Meta Iniciante HSK 1: ≥85% HSK 1 e ≤15% HSK 2"
  minBasePercentage: number;
  maxAbovePercentage: number;
}

export interface StoryChapter {
  id: string;
  chapterNumber: number;
  titleZh: string;
  titlePinyin: string;
  titlePt: string;
  summaryPt: string;
  estimatedMinutes: number;
  audioUrl: string;                 // e.g., "/audio/stories/cha-da-manha/chapter-1.mp3"
  audioDurationMs: number;
  voiceName: string;                // e.g., "zh-CN-XiaoxiaoNeural"
  hskDistribution: HskDistributionItem[];
  targetWords?: string[];
  reviewWords?: string[];
  keyVocabulary: {
    hanzi: string;
    pinyin: string;
    meaningPt: string;
    hskLevel: HskLevel;
  }[];
  sentences: StorySentence[];
}

export interface Story {
  id: string;
  slug: string;
  titleZh: string;
  titlePinyin: string;
  titlePt: string;
  subtitlePt: string;
  synopsisPt: string;
  category: StoryCategory;
  targetHsk: HskLevel;              // Nível principal da história (HSK 3.0)
  targetRule: HskTargetRule;
  hskDistribution: HskDistributionItem[]; // Porcentagem consolidada de todos os capítulos
  totalWords: number;
  totalUniqueWords: number;
  estimatedMinutes: number;
  tags: string[];
  chapters: StoryChapter[];
}

/**
 * User Progress, Preferences, and Saved Vocabulary (persisted in LocalStorage + Vercel Blob)
 */
export interface SavedVocabularyItem {
  hanzi: string;
  pinyin: string;
  meaningPt: string;
  compoundLogicPt?: string;
  hskLevel: HskLevel;
  storySlug: string;
  storyTitlePt: string;
  addedAt: string;
  characters?: CharacterEtymology[];
  exampleSentenceZh?: string;
  exampleSentencePt?: string;
}

export interface ChapterProgress {
  storySlug: string;
  chapterId: string;
  completed: boolean;
  lastSentenceId?: string;
  lastAudioMs?: number;
  updatedAt: string;
}

export interface ReaderPreferences {
  zhFont: ChineseFontMode;          // "app" | "school" | "book"
  fontSizeStep: "sm" | "md" | "lg" | "xl"; // legado: usado só como fallback quando fontSizePx não existe
  fontSizePx?: number;              // tamanho livre dos caracteres da história (botões + / −, sem limite superior)
  pinyinMode: PinyinDisplayMode;    // "on" | "hover" | "off"
  highlightAboveLevel: boolean;
  audioSpeed: number;               // 0.6 | 0.75 | 0.9 | 1.0 | 1.25
  darkMode: boolean;
  bgmVolume?: number;               // 0.0 - 1.0 (default 0.22)
  bgmAutoDuck?: boolean;            // Abaixar trilha automaticamente durante a narração
  dailyGoalMinutes?: number;        // Meta diária de leitura em minutos (padrão 10)
  srsNewPerDay?: number;            // Limite de cards novos por dia (padrão 10)
  srsReviewsPerDay?: number;        // Limite de revisões por dia (padrão 100)
  srsEnableMeaningToHanzi?: boolean; // Modo produção: Significado -> Hanzi (padrão false)
}

export interface UserProfileData {
  username?: string;
  preferences: ReaderPreferences;
  chapterProgress: Record<string, ChapterProgress>; // key: `${storySlug}:${chapterId}`
  savedVocabulary: Record<string, SavedVocabularyItem>; // key: hanzi
  updatedAt: string;
}

