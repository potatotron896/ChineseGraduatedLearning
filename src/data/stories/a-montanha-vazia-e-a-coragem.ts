import type { Story } from "../../types/story";
import { MONTANHA_VAZIA_PART1 } from "./montanha-vazia-part1";
import { MONTANHA_VAZIA_PART2 } from "./montanha-vazia-part2";

export const STORY_MONTANHA_VAZIA: Omit<Story, "hskDistribution" | "totalWords" | "totalUniqueWords"> = {
  id: "story-4",
  slug: "a-montanha-vazia-e-a-coragem",
  titleZh: "空山里的勇气",
  titlePinyin: "Kōngshān lǐ de yǒngqì",
  titlePt: "O Guerreiro e a Coragem na Montanha Vazia",
  subtitlePt: "Uma jornada de 10 capítulos sobre medo, silêncio e a descoberta da verdadeira coragem.",
  synopsisPt:
    "Li Yun é um jovem espadachim que guarda um segredo: toda vez que empunha sua espada, sente o coração tremer de medo. Acreditando que um verdadeiro guerreiro jamais deveria temer, ele parte em uma jornada de 10 capítulos até o topo da Montanha Vazia em busca de um lendário mestre. Entre pontes sob vendavais, noites na floresta escura e um resgate na nevasca, ele descobre através de uma simples pedra na neve que a coragem sempre caminhou ao seu lado.",
  category: "Cultura & Folclore",
  targetHsk: 2,
  targetRule: {
    descriptionPt: "Padrão Básico (HSK 2): 75%–82% HSK 1, 15%–22% HSK 2 e ≤ 5% HSK 3",
    minBasePercentage: 75,
    maxAbovePercentage: 5,
  },
  estimatedMinutes: 50,
  tags: ["Jornada", "Coragem", "Montanha", "Folclore", "Básico HSK 2"],
  chapters: [...MONTANHA_VAZIA_PART1, ...MONTANHA_VAZIA_PART2],
};

