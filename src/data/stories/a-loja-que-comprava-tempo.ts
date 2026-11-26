import type { Story } from "../../types/story";
import { TEMPO_LOJA_PART1 } from "./tempo-loja-part1";
import { TEMPO_LOJA_PART2 } from "./tempo-loja-part2";

export const STORY_LOJA_TEMPO: Omit<Story, "hskDistribution" | "totalWords" | "totalUniqueWords"> = {
  id: "story-6",
  slug: "a-loja-que-comprava-tempo",
  titleZh: "时间的小店",
  titlePinyin: "Shíjiān de Xiǎodiàn",
  titlePt: "A Pequena Loja do Tempo",
  subtitlePt: "Uma história filosófica de 10 capítulos sobre pressa, memória e um segredo guardado por quarenta anos.",
  synopsisPt:
    "Obsessivo por trabalho e dinheiro, o jovem Chen Feng vive correndo e recusa até tomar chá com seu amigo Anan. Numa noite chuvosa, ele entra numa misteriosa loja que não aceita moedas: só troca horas extras de trabalho por momentos 'inúteis' da vida comum. À medida que perde o sabor do chá, as cores das flores e até sua própria sombra, ele descobre na sala dos fundos a chocante identidade do velho dono da loja.",
  category: "Mistério & Aventura",
  targetHsk: 1,
  targetRule: {
    descriptionPt: "Padrão Iniciante + Filosofia (HSK 1): ≥ 85% HSK 1 e ≤ 15% HSK 2–3",
    minBasePercentage: 85,
    maxAbovePercentage: 15,
  },
  estimatedMinutes: 40,
  tags: ["Filosofia", "Mistério", "Tempo", "Reviravolta", "Iniciante HSK 1"],
  chapters: [...TEMPO_LOJA_PART1, ...TEMPO_LOJA_PART2],
};

