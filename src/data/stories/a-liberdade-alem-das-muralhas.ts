import type { Story } from "../../types/story";
import { LIBERDADE_MURALHAS_PART1 } from "./liberdade-muralhas-part1";
import { LIBERDADE_MURALHAS_PART2 } from "./liberdade-muralhas-part2";

export const STORY_LIBERDADE_MURALHAS: Omit<Story, "hskDistribution" | "totalWords" | "totalUniqueWords"> = {
  id: "story-5",
  slug: "a-liberdade-alem-das-muralhas",
  titleZh: "高墙之外的自由",
  titlePinyin: "Gāoqiáng zhī wài de zìyóu",
  titlePt: "A Liberdade Além das Altas Muralhas",
  subtitlePt: "Uma jornada épica de 10 capítulos inspirada em Attack on Titan, sobre coragem, perda e a busca pelo mar.",
  synopsisPt:
    "Lin Lan cresce sob muralhas gigantescas sonhando em voar como os pássaros e ver o mar com seus amigos Chen Fei e Su Xue. Quando um Titã colossal destrói o Portão Sul e ela perde sua casa, Lin Lan se junta ao esquadrão de combate com lâminas duplas. Entre batalhas na névoa, segredos escondidos em um porão e tempestades no portão, ela descobre a verdade sobre o mundo e o verdadeiro significado da liberdade.",
  category: "Mistério & Aventura",
  targetHsk: 2,
  targetRule: {
    descriptionPt: "Padrão Básico (HSK 2): 75%–82% HSK 1, 15%–22% HSK 2 e ≤ 5% HSK 3",
    minBasePercentage: 75,
    maxAbovePercentage: 5,
  },
  estimatedMinutes: 50,
  tags: ["Aventura", "Muralhas", "Coragem", "Liberdade", "HSK 2"],
  chapters: [...LIBERDADE_MURALHAS_PART1, ...LIBERDADE_MURALHAS_PART2],
};

