import type { BadgeDefinition } from "@/types/learning";

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: "streak_days",
    namePt: "Chama Constante",
    category: "Sequência",
    icon: "Flame",
    metricKey: "longestStreak",
    tiers: [
      { tier: 1, label: "Bronze", threshold: 3, descriptionPt: "Estude 3 dias seguidos." },
      { tier: 2, label: "Prata", threshold: 7, descriptionPt: "Estude 7 dias seguidos." },
      { tier: 3, label: "Ouro", threshold: 30, descriptionPt: "Estude 30 dias seguidos." },
      { tier: 4, label: "Platina", threshold: 100, descriptionPt: "Estude 100 dias seguidos." },
      { tier: 5, label: "Mestre", threshold: 365, descriptionPt: "Estude 365 dias seguidos." },
    ],
  },
  {
    id: "reading_hours",
    namePt: "Leitor Dedicado",
    category: "Tempo",
    icon: "Clock",
    metricKey: "totalHours",
    tiers: [
      { tier: 1, label: "Bronze", threshold: 1, descriptionPt: "Acumule 1 hora de leitura ativa." },
      { tier: 2, label: "Prata", threshold: 10, descriptionPt: "Acumule 10 horas de leitura ativa." },
      { tier: 3, label: "Ouro", threshold: 50, descriptionPt: "Acumule 50 horas de leitura ativa." },
      { tier: 4, label: "Platina", threshold: 100, descriptionPt: "Acumule 100 horas de leitura ativa." },
    ],
  },
  {
    id: "chapters_read",
    namePt: "Desbravador de Capítulos",
    category: "Capítulos",
    icon: "BookOpen",
    metricKey: "totalChaptersCompleted",
    tiers: [
      { tier: 1, label: "Bronze", threshold: 1, descriptionPt: "Conclua seu 1º capítulo." },
      { tier: 2, label: "Prata", threshold: 10, descriptionPt: "Conclua 10 capítulos." },
      { tier: 3, label: "Ouro", threshold: 50, descriptionPt: "Conclua 50 capítulos." },
    ],
  },
  {
    id: "stories_completed",
    namePt: "Colecionador de Histórias",
    category: "Histórias",
    icon: "Library",
    metricKey: "storiesCompleted",
    tiers: [
      { tier: 1, label: "Bronze", threshold: 1, descriptionPt: "Termine sua 1ª história inteira." },
      { tier: 2, label: "Prata", threshold: 3, descriptionPt: "Termine 3 histórias inteiras." },
      { tier: 3, label: "Ouro", threshold: 5, descriptionPt: "Termine 5 histórias inteiras." },
    ],
  },
  {
    id: "hsk_all_levels",
    namePt: "Trilha HSK Completa",
    category: "Histórias",
    icon: "Compass",
    metricKey: "distinctHskStoriesCompleted",
    tiers: [
      { tier: 1, label: "Ouro", threshold: 3, descriptionPt: "Termine uma história de cada nível HSK (1, 2 e 3)." },
    ],
  },
  {
    id: "vocab_saved",
    namePt: "Caçador de Hanzi",
    category: "Vocabulário",
    icon: "BookmarkCheck",
    metricKey: "totalWordsSaved",
    tiers: [
      { tier: 1, label: "Bronze", threshold: 10, descriptionPt: "Salve 10 palavras no seu vocabulário." },
      { tier: 2, label: "Prata", threshold: 100, descriptionPt: "Salve 100 palavras no seu vocabulário." },
      { tier: 3, label: "Ouro", threshold: 500, descriptionPt: "Salve 500 palavras no seu vocabulário." },
    ],
  },
  {
    id: "cards_reviewed",
    namePt: "Memória de Aço",
    category: "Revisão",
    icon: "Brain",
    metricKey: "totalCardsReviewed",
    tiers: [
      { tier: 1, label: "Bronze", threshold: 100, descriptionPt: "Faça 100 revisões de flashcards." },
      { tier: 2, label: "Ouro", threshold: 1000, descriptionPt: "Faça 1.000 revisões de flashcards." },
    ],
  },
  {
    id: "cards_mastered",
    namePt: "Mestre do Baralho",
    category: "Revisão",
    icon: "Award",
    metricKey: "masteredCards",
    tiers: [
      { tier: 1, label: "Ouro", threshold: 50, descriptionPt: "Tenha 50 cards com intervalo maior que 21 dias." },
    ],
  },
  {
    id: "night_or_early",
    namePt: "Coruja & Madrugador",
    category: "Hábitos",
    icon: "MoonStar",
    metricKey: "offHoursSessions",
    tiers: [
      { tier: 1, label: "Bronze", threshold: 1, descriptionPt: "Leia antes das 7h ou depois das 23h." },
      { tier: 2, label: "Prata", threshold: 10, descriptionPt: "10 sessões antes das 7h ou depois das 23h." },
    ],
  },
  {
    id: "weekend_reader",
    namePt: "Fim de Semana em Mandarim",
    category: "Hábitos",
    icon: "CalendarHeart",
    metricKey: "weekendDays",
    tiers: [
      { tier: 1, label: "Bronze", threshold: 2, descriptionPt: "Estude em 2 dias de fim de semana." },
      { tier: 2, label: "Prata", threshold: 8, descriptionPt: "Estude em 8 dias de fim de semana." },
    ],
  },
  {
    id: "etymology_explorer",
    namePt: "Etimologista Curioso",
    category: "Exploração",
    icon: "Puzzle",
    metricKey: "etymologyInspections",
    tiers: [
      { tier: 1, label: "Bronze", threshold: 25, descriptionPt: "Inspecione a etimologia de palavras 25 vezes." },
    ],
  },
  {
    id: "font_explorer",
    namePt: "Calígrafo Digital",
    category: "Exploração",
    icon: "Type",
    metricKey: "distinctFontsUsed",
    tiers: [
      { tier: 1, label: "Bronze", threshold: 3, descriptionPt: "Experimente todas as 3 fontes chinesas (App, Escola e Livro)." },
    ],
  },
];

export const BADGE_MAP = new Map(BADGE_DEFINITIONS.map((b) => [b.id, b]));

