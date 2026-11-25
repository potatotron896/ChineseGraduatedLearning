import type { Story } from "../types/story";
import { CHARACTER_DICTIONARY, getCharacterEtymology } from "./character-dictionary";

function chars(word: string, pinyins: string[], hsks: (1|2|3|4)[], meanings: string[]) {
  return Array.from(word).map((ch, idx) =>
    CHARACTER_DICTIONARY[ch] ||
    getCharacterEtymology(ch, pinyins[idx] || "", hsks[idx] || 1, meanings[idx] || "")
  );
}

export const RAW_STORIES: Omit<Story, "hskDistribution" | "totalWords" | "totalUniqueWords">[] = [
  {
    id: "story-1",
    slug: "cha-da-manha-em-pequim",
    titleZh: "北京早上的茶馆",
    titlePinyin: "Běijīng zǎoshang de cháguǎn",
    titlePt: "A Casa de Chá nas Manhãs de Pequim",
    subtitlePt: "Um encontro tranquilo entre livros antigos, chá quente e amizade na capital.",
    synopsisPt:
      "Lin Ming começa sua manhã em uma pequena e silenciosa casa de chá em Pequim. Enquanto lê e toma seu chá quente, ele reencontra sua amiga Xiaomei, que traz dois livros antigos cheios de histórias sobre caracteres chineses.",
    category: "Cotidiano",
    targetHsk: 1,
    targetRule: {
      descriptionPt: "Padrão Iniciante Total (HSK 1): ≥ 85% vocabulário HSK 1 e ≤ 15% HSK 2",
      minBasePercentage: 85,
      maxAbovePercentage: 15,
    },
    estimatedMinutes: 4,
    tags: ["Pequim", "Casa de Chá", "Amizade", "Livros", "Iniciante HSK 1"],
    chapters: [
      {
        id: "ch-1",
        chapterNumber: 1,
        titleZh: "第一章：一杯热茶",
        titlePinyin: "Dì yī zhāng: Yì bēi rè chá",
        titlePt: "Capítulo 1: Uma Xícara de Chá Quente",
        summaryPt: "Lin Ming chega cedo à casa de chá, escolhe uma mesa tranquila e pede seu chá quente favorito antes de abrir seu livro e computador.",
        estimatedMinutes: 2,
        audioUrl: "/audio/stories/cha-da-manha-em-pequim/ch-1.mp3",
        audioDurationMs: 0,
        voiceName: "zh-CN-XiaoxiaoNeural",
        hskDistribution: [],
        keyVocabulary: [
          { hanzi: "茶馆", pinyin: "cháguǎn", meaningPt: "casa de chá", hskLevel: 1 },
          { hanzi: "安静", pinyin: "ānjìng", meaningPt: "tranquilo / silencioso", hskLevel: 2 },
          { hanzi: "电脑", pinyin: "diànnǎo", meaningPt: "computador", hskLevel: 1 },
          { hanzi: "服务员", pinyin: "fúwùyuán", meaningPt: "garçom / atendente", hskLevel: 1 },
          { hanzi: "觉得", pinyin: "juéde", meaningPt: "achar / sentir", hskLevel: 1 },
        ],
        sentences: [
          {
            id: "s1",
            zhText: "今天早上，林明去了北京的一家茶馆。",
            pinyinText: "Jīntiān zǎoshang, Lín Míng qù le Běijīng de yì jiā cháguǎn.",
            translationPt: "Hoje de manhã, Lin Ming foi a uma casa de chá em Pequim.",
            literalPt: "Hoje manhã, Lin Ming foi [concluído] Pequim de uma [classificador] casa-de-chá.",
            grammarNotes: [
              {
                pattern: "Tempo + Sujeito + Verbo + Objeto",
                explanationPt: "Em Mandarim, expressões de tempo como 今天早上 (hoje de manhã) vêm sempre no início da frase, antes do verbo, e nunca no final como em português.",
                hskLevel: 1,
              },
              {
                pattern: "Classificador 家 (jiā) para estabelecimentos",
                explanationPt: "O caractere 家 significa 'casa/família', mas antes de estabelecimentos (一家茶馆) funciona como classificador específico para lojas, restaurantes e casas de chá.",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s1-t1",
                hanzi: "今天",
                pinyin: "jīntiān",
                hskLevel: 1,
                meaningPt: "hoje",
                partOfSpeech: "substantivo de tempo",
                compoundLogicPt: "Formada por 今 (agora/presente) + 天 (dia/céu) → 'o dia de agora' = hoje.",
                characters: chars("今天", ["jīn", "tiān"], [1, 1], ["agora", "dia"]),
              },
              {
                id: "s1-t2",
                hanzi: "早上",
                pinyin: "zǎoshang",
                hskLevel: 1,
                meaningPt: "manhã (início do dia)",
                partOfSpeech: "substantivo de tempo",
                compoundLogicPt: "Formada por 早 (cedo/manhã) + 上 (parte inicial/sobre) → o período da manhã.",
                characters: chars("早上", ["zǎo", "shang"], [1, 1], ["cedo", "parte"]),
              },
              { id: "s1-t3", hanzi: "，", isPunctuation: true },
              {
                id: "s1-t4",
                hanzi: "林明",
                pinyin: "Lín Míng",
                hskLevel: 1,
                meaningPt: "Lin Ming (nome do protagonista)",
                partOfSpeech: "nome próprio",
                compoundLogicPt: "Sobrenome 林 (Lín, 'bosque') + nome 明 (Míng, 'brilhante/claro').",
                characters: chars("林明", ["Lín", "Míng"], [1, 1], ["bosque", "brilhante"]),
              },
              {
                id: "s1-t5",
                hanzi: "去",
                pinyin: "qù",
                hskLevel: 1,
                meaningPt: "ir / foi",
                partOfSpeech: "verbo",
                compoundLogicPt: "Verbo de deslocamento indicando ir para um local afastado de onde o narrador está.",
                characters: chars("去", ["qù"], [1], ["ir"]),
              },
              {
                id: "s1-t6",
                hanzi: "了",
                pinyin: "le",
                hskLevel: 1,
                meaningPt: "partícula de ação concluída",
                partOfSpeech: "partícula aspectual",
                compoundLogicPt: "Posicionado logo após o verbo 去 (ir), confirma que a ida à casa de chá já aconteceu.",
                characters: chars("了", ["le"], [1], ["ação concluída"]),
              },
              {
                id: "s1-t7",
                hanzi: "北京",
                pinyin: "Běijīng",
                hskLevel: 1,
                meaningPt: "Pequim (Beijing)",
                partOfSpeech: "nome próprio (cidade)",
                compoundLogicPt: "Formada por 北 (norte) + 京 (capital) → literalmente 'Capital do Norte'.",
                characters: chars("北京", ["běi", "jīng"], [1, 1], ["norte", "capital"]),
              },
              {
                id: "s1-t8",
                hanzi: "的",
                pinyin: "de",
                hskLevel: 1,
                meaningPt: "de (conecta o local ao estabelecimento)",
                partOfSpeech: "partícula estrutural",
                compoundLogicPt: "Em chinês, o modificador vem antes: 北京的茶馆 = 'de Pequim casa de chá'.",
                characters: chars("的", ["de"], [1], ["de"]),
              },
              {
                id: "s1-t9",
                hanzi: "一家",
                pinyin: "yì jiā",
                hskLevel: 1,
                meaningPt: "uma (loja/casa comercial)",
                partOfSpeech: "numeral + classificador",
                compoundLogicPt: "一 (um) + 家 (classificador para estabelecimentos comerciais e restaurantes).",
                characters: chars("一家", ["yī", "jiā"], [1, 1], ["um", "casa/estabelecimento"]),
              },
              {
                id: "s1-t10",
                hanzi: "茶馆",
                pinyin: "cháguǎn",
                hskLevel: 1,
                meaningPt: "casa de chá",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Formada por 茶 (chá) + 馆 (pavilhão/estabelecimento público) → casa de chá tradicional.",
                characters: chars("茶馆", ["chá", "guǎn"], [1, 1], ["chá", "estabelecimento"]),
              },
              { id: "s1-t11", hanzi: "。", isPunctuation: true },
            ],
          },
          {
            id: "s2",
            zhText: "店里人不多，很安静。",
            pinyinText: "Diàn lǐ rén bù duō, hěn ānjìng.",
            translationPt: "Dentro da loja não havia muita gente; estava bem tranquilo.",
            literalPt: "Loja dentro pessoas não muitas, muito tranquilo.",
            grammarNotes: [
              {
                pattern: "Substantivo + 里 (lǐ) = 'dentro de...'",
                explanationPt: "A posição espacial vem depois do substantivo: 店里 (diàn lǐ) significa literalmente 'loja dentro' → dentro da loja.",
                hskLevel: 1,
              },
              {
                pattern: "Uso de 很 (hěn) antes de adjetivos predicativos",
                explanationPt: "Em frases descritivas simples como 很安静 ('está tranquilo'), o 很 funciona como ligador gramatical natural entre o sujeito e o adjetivo.",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s2-t1",
                hanzi: "店里",
                pinyin: "diàn lǐ",
                hskLevel: 1,
                meaningPt: "dentro da loja / no salão",
                partOfSpeech: "locução espacial",
                compoundLogicPt: "Formada por 店 (loja/estabelecimento) + 里 (dentro/interior) → no interior da casa de chá.",
                characters: chars("店里", ["diàn", "lǐ"], [1, 1], ["loja", "dentro"]),
              },
              {
                id: "s2-t2",
                hanzi: "人",
                pinyin: "rén",
                hskLevel: 1,
                meaningPt: "pessoas / clientes",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Pictograma direto de um ser humano caminhando de perfil.",
                characters: chars("人", ["rén"], [1], ["pessoa"]),
              },
              {
                id: "s2-t3",
                hanzi: "不多",
                pinyin: "bù duō",
                hskLevel: 1,
                meaningPt: "não eram muitos / poucos",
                partOfSpeech: "negação + adjetivo",
                compoundLogicPt: "不 (não) + 多 (muitos) → maneira natural em Mandarim de dizer que havia pouca gente.",
                characters: chars("不多", ["bù", "duō"], [1, 1], ["não", "muitos"]),
              },
              { id: "s2-t4", hanzi: "，", isPunctuation: true },
              {
                id: "s2-t5",
                hanzi: "很",
                pinyin: "hěn",
                hskLevel: 1,
                meaningPt: "muito / bem (ligador de adjetivo)",
                partOfSpeech: "advérbio",
                compoundLogicPt: "Advérbio de grau que introduz adjetivos predicativos no Mandarim.",
                characters: chars("很", ["hěn"], [1], ["muito"]),
              },
              {
                id: "s2-t6",
                hanzi: "安静",
                pinyin: "ānjìng",
                hskLevel: 2,
                meaningPt: "silencioso / tranquilo / calmo",
                partOfSpeech: "adjetivo",
                compoundLogicPt: "Formada por 安 (paz/calma sob um teto) + 静 (quieto/sereno) → ambiente silencioso e pacífico.",
                characters: chars("安静", ["ān", "jìng"], [2, 2], ["paz/calmo", "silencioso"]),
              },
              { id: "s2-t7", hanzi: "。", isPunctuation: true },
            ],
          },
          {
            id: "s3",
            zhText: "他坐在桌子旁边，要了一杯热茶。",
            pinyinText: "Tā zuò zài zhuōzi pángbiān, yào le yì bēi rè chá.",
            translationPt: "Ele se sentou ao lado da mesa e pediu uma xícara de chá quente.",
            literalPt: "Ele sentou em mesa ao-lado, pediu [concluído] uma xícara quente chá.",
            grammarNotes: [
              {
                pattern: "Classificador 杯 (bēi) para bebidas",
                explanationPt: "Para xícaras ou copos de bebida, usa-se obrigatoriamente o classificador 杯 (bēi): 一杯热茶 (uma xícara de chá quente).",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s3-t1",
                hanzi: "他",
                pinyin: "tā",
                hskLevel: 1,
                meaningPt: "ele",
                partOfSpeech: "pronome pessoal",
                compoundLogicPt: "Radical de pessoa (亻) + 也 → pronome masculino de 3ª pessoa.",
                characters: chars("他", ["tā"], [1], ["ele"]),
              },
              {
                id: "s3-t2",
                hanzi: "坐在",
                pinyin: "zuò zài",
                hskLevel: 1,
                meaningPt: "sentou-se em",
                partOfSpeech: "verbo + preposição",
                compoundLogicPt: "坐 (sentar-se: duas pessoas 人 sobre a terra 土) + 在 (em/estar em).",
                characters: chars("坐在", ["zuò", "zài"], [1, 1], ["sentar", "em"]),
              },
              {
                id: "s3-t3",
                hanzi: "桌子",
                pinyin: "zhuōzi",
                hskLevel: 1,
                meaningPt: "mesa",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Formada por 桌 (mesa de madeira elevada) + 子 (sufixo nominal neutro).",
                characters: chars("桌子", ["zhuō", "zi"], [1, 1], ["mesa", "sufixo nominal"]),
              },
              {
                id: "s3-t4",
                hanzi: "旁边",
                pinyin: "pángbiān",
                hskLevel: 2,
                meaningPt: "ao lado",
                partOfSpeech: "substantivo de localização",
                compoundLogicPt: "Formada por 旁 (lateral/lado) + 边 (borda/margem) → ao lado de algo.",
                characters: chars("旁边", ["páng", "biān"], [2, 1], ["lado", "borda"]),
              },
              { id: "s3-t5", hanzi: "，", isPunctuation: true },
              {
                id: "s3-t6",
                hanzi: "要",
                pinyin: "yào",
                hskLevel: 1,
                meaningPt: "pediu / quis",
                partOfSpeech: "verbo",
                compoundLogicPt: "Em restaurantes e casas de chá, 要 (querer) é o verbo natural para 'pedir um item do cardápio'.",
                characters: chars("要", ["yào"], [1], ["querer/pedir"]),
              },
              {
                id: "s3-t7",
                hanzi: "了",
                pinyin: "le",
                hskLevel: 1,
                meaningPt: "partícula de ação concluída",
                partOfSpeech: "partícula aspectual",
                compoundLogicPt: "Indica que o pedido já foi feito.",
                characters: chars("了", ["le"], [1], ["ação concluída"]),
              },
              {
                id: "s3-t8",
                hanzi: "一杯",
                pinyin: "yì bēi",
                hskLevel: 1,
                meaningPt: "uma xícara de",
                partOfSpeech: "numeral + classificador",
                compoundLogicPt: "一 (uma) + 杯 (xícara/copo, com radical de madeira 木).",
                characters: chars("一杯", ["yī", "bēi"], [1, 1], ["um", "xícara/copo"]),
              },
              {
                id: "s3-t9",
                hanzi: "热茶",
                pinyin: "rè chá",
                hskLevel: 1,
                meaningPt: "chá quente",
                partOfSpeech: "substantivo composto",
                compoundLogicPt: "Formada por 热 (quente, com radical de 4 chamas de fogo 灬 na base) + 茶 (chá).",
                characters: chars("热茶", ["rè", "chá"], [1, 1], ["quente", "chá"]),
              },
              { id: "s3-t10", hanzi: "。", isPunctuation: true },
            ],
          },
          {
            id: "s4",
            zhText: "林明从书包里拿出一本书和电脑。",
            pinyinText: "Lín Míng cóng shūbāo lǐ náchū yì běn shū hé diànnǎo.",
            translationPt: "Lin Ming tirou um livro e o computador de dentro da mochila.",
            literalPt: "Lin Ming desde mochila dentro tirou-para-fora um [classificador] livro e computador.",
            grammarNotes: [
              {
                pattern: "Classificador 本 (běn) para livros",
                explanationPt: "Livros, revistas e cadernos nunca usam 个; exigem o classificador 本 (běn): 一本书 (um livro).",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s4-t1",
                hanzi: "林明",
                pinyin: "Lín Míng",
                hskLevel: 1,
                meaningPt: "Lin Ming",
                partOfSpeech: "nome próprio",
                compoundLogicPt: "林 (bosque) + 明 (brilhante).",
                characters: chars("林明", ["Lín", "Míng"], [1, 1], ["bosque", "brilhante"]),
              },
              {
                id: "s4-t2",
                hanzi: "从",
                pinyin: "cóng",
                hskLevel: 2,
                meaningPt: "de / a partir de (origem)",
                partOfSpeech: "preposição",
                compoundLogicPt: "Ideograma de duas pessoas (人 + 人) caminhando uma atrás da outra → seguir / a partir de.",
                characters: [
                  {
                    char: "从",
                    pinyin: "cóng",
                    hskLevel: 2,
                    isolatedMeaningPt: "de / desde / seguir",
                    formationExplanationPt: "Ideograma composto por duas pessoas (人 + 人) uma seguindo a outra, indicando ponto de partida ('a partir de').",
                    components: [{ symbol: "人", pinyin: "rén", meaningPt: "duas pessoas em sequência", role: "semântico" }],
                  },
                ],
              },
              {
                id: "s4-t3",
                hanzi: "书包",
                pinyin: "shūbāo",
                hskLevel: 1,
                meaningPt: "mochila / pasta de livros",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Formada por 书 (livro) + 包 (bolsa/envolver) → literalmente 'bolsa de livros' = mochila.",
                characters: chars("书包", ["shū", "bāo"], [1, 1], ["livro", "bolsa"]),
              },
              {
                id: "s4-t4",
                hanzi: "里",
                pinyin: "lǐ",
                hskLevel: 1,
                meaningPt: "de dentro",
                partOfSpeech: "posposição espacial",
                compoundLogicPt: "Em 从书包里 ('de dentro da mochila'), 里 fecha o marco espacial aberto por 从.",
                characters: chars("里", ["lǐ"], [1], ["dentro"]),
              },
              {
                id: "s4-t5",
                hanzi: "拿出",
                pinyin: "náchū",
                hskLevel: 1,
                meaningPt: "tirou para fora",
                partOfSpeech: "verbo + complemento direcional",
                compoundLogicPt: "拿 (pegar com a mão: 合 juntar + 手 mão) + 出 (sair/para fora) → pegar e tirar de dentro.",
                characters: chars("拿出", ["ná", "chū"], [1, 1], ["pegar", "sair/para fora"]),
              },
              {
                id: "s4-t6",
                hanzi: "一本书",
                pinyin: "yì běn shū",
                hskLevel: 1,
                meaningPt: "um livro",
                partOfSpeech: "numeral + classificador + substantivo",
                compoundLogicPt: "一 (um) + 本 (classificador para volumes encadernados) + 书 (livro).",
                characters: chars("一本书", ["yī", "běn", "shū"], [1, 1, 1], ["um", "classificador de livros", "livro"]),
              },
              {
                id: "s4-t7",
                hanzi: "和",
                pinyin: "hé",
                hskLevel: 1,
                meaningPt: "e",
                partOfSpeech: "conjunção",
                compoundLogicPt: "Conecta dois substantivos (一本书 e 电脑). Nunca é usado para ligar duas frases verbais.",
                characters: chars("和", ["hé"], [1], ["e/com"]),
              },
              {
                id: "s4-t8",
                hanzi: "电脑",
                pinyin: "diànnǎo",
                hskLevel: 1,
                meaningPt: "computador / notebook",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Formada por 电 (eletricidade) + 脑 (cérebro) → literalmente 'cérebro elétrico' = computador.",
                characters: chars("电脑", ["diàn", "nǎo"], [1, 1], ["eletricidade", "cérebro"]),
              },
              { id: "s4-t9", hanzi: "。", isPunctuation: true },
            ],
          },
          {
            id: "s5",
            zhText: "服务员走过来，笑着说：“先生，请慢用。”",
            pinyinText: "Fúwùyuán zǒu guòlái, xiàozhe shuō: “Xiānsheng, qǐng màn yòng.”",
            translationPt: "O garçom veio caminhando e disse sorrindo: “Senhor, por favor, bom proveito.”",
            literalPt: "Atendente caminhou vindo, sorrindo disse: 'Senhor, por favor devagar sirva-se.'",
            grammarNotes: [
              {
                pattern: "Verbo + 着 (zhe) + Verbo2 = ação simultânea",
                explanationPt: "笑着说 (xiàozhe shuō) usa a partícula durativa 着 (em tom neutro zhe) para indicar modo: 'dizer enquanto sorri' (disse sorrindo).",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s5-t1",
                hanzi: "服务员",
                pinyin: "fúwùyuán",
                hskLevel: 1,
                meaningPt: "garçom / atendente",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Formada por 服务 (fúwù, 'servir/serviço') + 员 (yuán, 'profissional/membro') → profissional de atendimento.",
                characters: chars("服务员", ["fú", "wù", "yuán"], [1, 1, 1], ["servir", "tarefa", "profissional"]),
              },
              {
                id: "s5-t2",
                hanzi: "走",
                pinyin: "zǒu",
                hskLevel: 1,
                meaningPt: "caminhou",
                partOfSpeech: "verbo",
                compoundLogicPt: "Mostra uma pessoa em movimento sobre um pé (止) → andar/caminhar.",
                characters: chars("走", ["zǒu"], [1], ["caminhar"]),
              },
              {
                id: "s5-t3",
                hanzi: "过来",
                pinyin: "guòlái",
                hskLevel: 1,
                meaningPt: "veio até aqui (aproximando-se)",
                partOfSpeech: "complemento direcional",
                compoundLogicPt: "过 (atravessar/passar) + 来 (vir em direção ao protagonista).",
                characters: chars("过来", ["guò", "lái"], [1, 1], ["atravessar", "vir"]),
              },
              { id: "s5-t4", hanzi: "，", isPunctuation: true },
              {
                id: "s5-t5",
                hanzi: "笑着",
                pinyin: "xiàozhe",
                hskLevel: 1,
                meaningPt: "sorrindo",
                partOfSpeech: "verbo + partícula durativa",
                compoundLogicPt: "笑 (sorrir: bambu ⺮ que se curva alegremente) + 着 (zhe, estado contínuo '-ndo').",
                characters: chars("笑着", ["xiào", "zhe"], [1, 1], ["sorrir", "partícula -ndo"]),
              },
              {
                id: "s5-t6",
                hanzi: "说",
                pinyin: "shuō",
                hskLevel: 1,
                meaningPt: "disse / falou",
                partOfSpeech: "verbo",
                compoundLogicPt: "Radical da fala (讠) + 兑 → expressar por palavras.",
                characters: chars("说", ["shuō"], [1], ["falar/dizer"]),
              },
              { id: "s5-t7", hanzi: "：“", isPunctuation: true },
              {
                id: "s5-t8",
                hanzi: "先生",
                pinyin: "xiānsheng",
                hskLevel: 1,
                meaningPt: "senhor",
                partOfSpeech: "substantivo de tratamento",
                compoundLogicPt: "Formada por 先 (primeiro/antes) + 生 (nascer) → literalmente 'aquele que nasceu antes', tratamento respeitoso para 'Senhor'.",
                characters: chars("先生", ["xiān", "sheng"], [1, 1], ["primeiro", "nascer/vida"]),
              },
              { id: "s5-t9", hanzi: "，", isPunctuation: true },
              {
                id: "s5-t10",
                hanzi: "请",
                pinyin: "qǐng",
                hskLevel: 1,
                meaningPt: "por favor",
                partOfSpeech: "verbo/expressão de cortesia",
                compoundLogicPt: "Radical da palavra (讠) + 青 (puro) → pedir ou convidar com cortesia.",
                characters: chars("请", ["qǐng"], [1], ["por favor"]),
              },
              {
                id: "s5-t11",
                hanzi: "慢用",
                pinyin: "màn yòng",
                hskLevel: 1,
                meaningPt: "bom apetite / desfrute sem pressa",
                partOfSpeech: "expressão idiomática de cortesia",
                compoundLogicPt: "Formada por 慢 (devagar/com calma) + 用 (servir-se/usar) → 'sirva-se com calma', a frase padrão dos garçons na China para 'bom proveito'.",
                characters: chars("慢用", ["màn", "yòng"], [1, 1], ["devagar", "servir-se"]),
              },
              { id: "s5-t12", hanzi: "。”", isPunctuation: true },
            ],
          },
          {
            id: "s6",
            zhText: "林明喝了一口茶，觉得茶很香。",
            pinyinText: "Lín Míng hē le yì kǒu chá, juéde chá hěn xiāng.",
            translationPt: "Lin Ming tomou um gole de chá e achou o chá muito aromático.",
            literalPt: "Lin Ming bebeu [concluído] uma boca/gole chá, achou chá muito perfumado.",
            grammarNotes: [
              {
                pattern: "Classificador 口 (kǒu) = 'um gole / uma mordida'",
                explanationPt: "O caractere 口 significa 'boca'. Quando usado depois de um número (一口茶), funciona como classificador para 'um gole de chá'.",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s6-t1",
                hanzi: "林明",
                pinyin: "Lín Míng",
                hskLevel: 1,
                meaningPt: "Lin Ming",
                partOfSpeech: "nome próprio",
                compoundLogicPt: "林 (bosque) + 明 (brilhante).",
                characters: chars("林明", ["Lín", "Míng"], [1, 1], ["bosque", "brilhante"]),
              },
              {
                id: "s6-t2",
                hanzi: "喝",
                pinyin: "hē",
                hskLevel: 1,
                meaningPt: "bebeu / tomou",
                partOfSpeech: "verbo",
                compoundLogicPt: "Radical de boca (口) à esquerda + 曷 → ação de beber.",
                characters: chars("喝", ["hē"], [1], ["beber"]),
              },
              {
                id: "s6-t3",
                hanzi: "了",
                pinyin: "le",
                hskLevel: 1,
                meaningPt: "partícula de ação concluída",
                partOfSpeech: "partícula aspectual",
                compoundLogicPt: "Marca que ele deu o gole.",
                characters: chars("了", ["le"], [1], ["ação concluída"]),
              },
              {
                id: "s6-t4",
                hanzi: "一口",
                pinyin: "yì kǒu",
                hskLevel: 1,
                meaningPt: "um gole / uma bocada",
                partOfSpeech: "numeral + classificador",
                compoundLogicPt: "一 (um) + 口 (boca → gole).",
                characters: chars("一口", ["yī", "kǒu"], [1, 1], ["um", "boca/gole"]),
              },
              {
                id: "s6-t5",
                hanzi: "茶",
                pinyin: "chá",
                hskLevel: 1,
                meaningPt: "chá",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Erva (艹) + pessoa (人) + arbusto (木) → folha de chá.",
                characters: chars("茶", ["chá"], [1], ["chá"]),
              },
              { id: "s6-t6", hanzi: "，", isPunctuation: true },
              {
                id: "s6-t7",
                hanzi: "觉得",
                pinyin: "juéde",
                hskLevel: 1,
                meaningPt: "achou / sentiu",
                partOfSpeech: "verbo de opinião/sensação",
                compoundLogicPt: "Formada por 觉 (despertar a percepção/ver 见) + 得 (partícula estrutural) → sentir ou ter a impressão de algo.",
                characters: chars("觉得", ["jué", "de"], [1, 1], ["sentir/perceber", "partícula"]),
              },
              {
                id: "s6-t8",
                hanzi: "茶",
                pinyin: "chá",
                hskLevel: 1,
                meaningPt: "o chá",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Folha e bebida de chá.",
                characters: chars("茶", ["chá"], [1], ["chá"]),
              },
              {
                id: "s6-t9",
                hanzi: "很",
                pinyin: "hěn",
                hskLevel: 1,
                meaningPt: "muito",
                partOfSpeech: "advérbio",
                compoundLogicPt: "Intensificador e ligador natural do adjetivo 香.",
                characters: chars("很", ["hěn"], [1], ["muito"]),
              },
              {
                id: "s6-t10",
                hanzi: "香",
                pinyin: "xiāng",
                hskLevel: 2,
                meaningPt: "aromático / cheiroso / saboroso",
                partOfSpeech: "adjetivo",
                compoundLogicPt: "Cereal maduro (禾) sobre doçura (日/甘) → o perfume delicioso do chá e dos alimentos.",
                characters: chars("香", ["xiāng"], [2], ["aromático"]),
              },
              { id: "s6-t11", hanzi: "。", isPunctuation: true },
            ],
          },
        ],
      },
      {
        id: "ch-2",
        chapterNumber: 2,
        titleZh: "第二章：两本旧书",
        titlePinyin: "Dì èr zhāng: Liǎng běn jiù shū",
        titlePt: "Capítulo 2: Dois Livros Antigos",
        summaryPt: "Xiaomei aparece na porta da casa de chá trazendo dois livros usados. Ela presenteia Lin Ming com uma obra sobre a história dos caracteres chineses.",
        estimatedMinutes: 2,
        audioUrl: "/audio/stories/cha-da-manha-em-pequim/ch-2.mp3",
        audioDurationMs: 0,
        voiceName: "zh-CN-XiaoxiaoNeural",
        hskDistribution: [],
        keyVocabulary: [
          { hanzi: "看见", pinyin: "kànjiàn", meaningPt: "avistar / ver", hskLevel: 1 },
          { hanzi: "两本", pinyin: "liǎng běn", meaningPt: "dois (livros)", hskLevel: 1 },
          { hanzi: "旧书", pinyin: "jiù shū", meaningPt: "livro antigo/usado", hskLevel: 2 },
          { hanzi: "送给", pinyin: "sòng gěi", meaningPt: "presentear a", hskLevel: 2 },
          { hanzi: "汉字", pinyin: "hànzì", meaningPt: "caracteres chineses", hskLevel: 1 },
        ],
        sentences: [
          {
            id: "s7",
            zhText: "这时候，他看见门外有一个人。",
            pinyinText: "Zhè shíhou, tā kànjiàn mén wài yǒu yí gè rén.",
            translationPt: "Nesse momento, ele viu que havia uma pessoa do lado de fora da porta.",
            literalPt: "Este momento, ele olhou-e-viu porta fora havia uma pessoa.",
            grammarNotes: [
              {
                pattern: "看 (kàn, olhar) vs 看见 (kànjiàn, avistar/ver)",
                explanationPt: "看 é a tentativa de olhar; adicionar 见 (perceber) forma o resultado 看见 ('olhar e de fato enxergar').",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s7-t1",
                hanzi: "这时候",
                pinyin: "zhè shíhou",
                hskLevel: 1,
                meaningPt: "nesse momento / nessa hora",
                partOfSpeech: "locução temporal",
                compoundLogicPt: "这 (este) + 时候 (momento/tempo: 时 sol+medida + 候 aguardar) → neste instante.",
                characters: chars("这时候", ["zhè", "shí", "hou"], [1, 1, 1], ["este", "tempo", "momento"]),
              },
              { id: "s7-t2", hanzi: "，", isPunctuation: true },
              {
                id: "s7-t3",
                hanzi: "他",
                pinyin: "tā",
                hskLevel: 1,
                meaningPt: "ele",
                partOfSpeech: "pronome",
                compoundLogicPt: "Pronome de 3ª pessoa masculino.",
                characters: chars("他", ["tā"], [1], ["ele"]),
              },
              {
                id: "s7-t4",
                hanzi: "看见",
                pinyin: "kànjiàn",
                hskLevel: 1,
                meaningPt: "viu / avistou",
                partOfSpeech: "verbo + complemento de resultado",
                compoundLogicPt: "Formada por 看 (olhar: mão 手 sobre o olho 目) + 见 (ver/perceber) → olhar e efetivamente ver.",
                characters: chars("看见", ["kàn", "jiàn"], [1, 1], ["olhar", "ver/perceber"]),
              },
              {
                id: "s7-t5",
                hanzi: "门外",
                pinyin: "mén wài",
                hskLevel: 1,
                meaningPt: "do lado de fora da porta",
                partOfSpeech: "locução espacial",
                compoundLogicPt: "门 (porta de duas folhas) + 外 (fora/exterior).",
                characters: chars("门外", ["mén", "wài"], [1, 1], ["porta", "fora"]),
              },
              {
                id: "s7-t6",
                hanzi: "有",
                pinyin: "yǒu",
                hskLevel: 1,
                meaningPt: "havia / tinha",
                partOfSpeech: "verbo existencial",
                compoundLogicPt: "Depois de um lugar (门外), o verbo 有 significa 'haver / existir'.",
                characters: chars("有", ["yǒu"], [1], ["ter/haver"]),
              },
              {
                id: "s7-t7",
                hanzi: "一个人",
                pinyin: "yí gè rén",
                hskLevel: 1,
                meaningPt: "uma pessoa",
                partOfSpeech: "numeral + classificador + substantivo",
                compoundLogicPt: "一 (uma) + 个 (classificador geral para pessoas) + 人 (pessoa).",
                characters: chars("一个人", ["yī", "gè", "rén"], [1, 1, 1], ["um", "classificador", "pessoa"]),
              },
              { id: "s7-t8", hanzi: "。", isPunctuation: true },
            ],
          },
          {
            id: "s8",
            zhText: "那是他的朋友小美，她手里有两本旧书。",
            pinyinText: "Nà shì tā de péngyou Xiǎoměi, tā shǒu lǐ yǒu liǎng běn jiù shū.",
            translationPt: "Era sua amiga Xiaomei; ela tinha dois livros antigos na mão.",
            literalPt: "Aquela era dele amiga Xiaomei, ela mão dentro tinha dois [classificador] antigos livros.",
            grammarNotes: [
              {
                pattern: "Regra obrigatória: 两 (liǎng) vs 二 (èr)",
                explanationPt: "Antes de qualquer classificador (como 本 para livros), o número 2 é SEMPRE 两 (两本旧书) e nunca 二 (*二本书 é gramaticalmente incorreto).",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s8-t1",
                hanzi: "那是",
                pinyin: "nà shì",
                hskLevel: 1,
                meaningPt: "aquela era / era",
                partOfSpeech: "demonstrativo + verbo ser",
                compoundLogicPt: "那 (aquele/aquela) + 是 (é/era).",
                characters: chars("那是", ["nà", "shì"], [1, 1], ["aquele", "ser"]),
              },
              {
                id: "s8-t2",
                hanzi: "他的",
                pinyin: "tā de",
                hskLevel: 1,
                meaningPt: "dele / sua",
                partOfSpeech: "pronome possessivo",
                compoundLogicPt: "他 (ele) + 的 (partícula possessiva) → dele.",
                characters: chars("他的", ["tā", "de"], [1, 1], ["ele", "de"]),
              },
              {
                id: "s8-t3",
                hanzi: "朋友",
                pinyin: "péngyou",
                hskLevel: 1,
                meaningPt: "amiga / amigo",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Formada por 朋 (duas luas/colares de conchas lado a lado: companheiro) + 友 (duas mãos que se ajudam).",
                characters: chars("朋友", ["péng", "you"], [1, 1], ["companheiro", "amigo"]),
              },
              {
                id: "s8-t4",
                hanzi: "小美",
                pinyin: "Xiǎoměi",
                hskLevel: 1,
                meaningPt: "Xiaomei (nome da amiga)",
                partOfSpeech: "nome próprio",
                compoundLogicPt: "小 (pequena/afetuoso) + 美 (bela).",
                characters: chars("小美", ["Xiǎo", "měi"], [1, 1], ["pequena", "bela"]),
              },
              { id: "s8-t5", hanzi: "，", isPunctuation: true },
              {
                id: "s8-t6",
                hanzi: "她",
                pinyin: "tā",
                hskLevel: 1,
                meaningPt: "ela",
                partOfSpeech: "pronome feminino",
                compoundLogicPt: "Radical feminino (女) + 也 → ela.",
                characters: chars("她", ["tā"], [1], ["ela"]),
              },
              {
                id: "s8-t7",
                hanzi: "手里",
                pinyin: "shǒu lǐ",
                hskLevel: 1,
                meaningPt: "na mão / em mãos",
                partOfSpeech: "locução espacial",
                compoundLogicPt: "手 (mão) + 里 (dentro) → segurando na mão.",
                characters: chars("手里", ["shǒu", "lǐ"], [1, 1], ["mão", "dentro"]),
              },
              {
                id: "s8-t8",
                hanzi: "有",
                pinyin: "yǒu",
                hskLevel: 1,
                meaningPt: "tinha / trazia",
                partOfSpeech: "verbo",
                compoundLogicPt: "Mão segurando posse → ter.",
                characters: chars("有", ["yǒu"], [1], ["ter"]),
              },
              {
                id: "s8-t9",
                hanzi: "两本",
                pinyin: "liǎng běn",
                hskLevel: 1,
                meaningPt: "dois (volumes de livros)",
                partOfSpeech: "numeral + classificador",
                compoundLogicPt: "两 (dois, obrigatório antes de classificador) + 本 (classificador de livros).",
                characters: chars("两本", ["liǎng", "běn"], [1, 1], ["dois", "classificador de livros"]),
              },
              {
                id: "s8-t10",
                hanzi: "旧书",
                pinyin: "jiù shū",
                hskLevel: 2,
                meaningPt: "livros antigos / usados",
                partOfSpeech: "adjetivo + substantivo",
                compoundLogicPt: "旧 (usado/antigo para objetos, ao contrário de 老 que é para seres vivos) + 书 (livro).",
                characters: chars("旧书", ["jiù", "shū"], [2, 1], ["antigo/usado", "livro"]),
              },
              { id: "s8-t11", hanzi: "。", isPunctuation: true },
            ],
          },
          {
            id: "s9",
            zhText: "林明很高兴，叫她过来坐下。",
            pinyinText: "Lín Míng hěn gāoxìng, jiào tā guòlái zuòxià.",
            translationPt: "Lin Ming ficou muito feliz e chamou-a para vir se sentar.",
            literalPt: "Lin Ming muito feliz, chamou ela vir-aqui sentar-abaixo.",
            grammarNotes: [
              {
                pattern: "Oração em Série Pivotal: 叫 + Pessoa + Verbo",
                explanationPt: "Em 叫她过来坐下 ('chamou-a para vir sentar'), 她 (ela) é ao mesmo tempo objeto de 叫 (chamar) e sujeito de 过来坐下 (vir sentar).",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s9-t1",
                hanzi: "林明",
                pinyin: "Lín Míng",
                hskLevel: 1,
                meaningPt: "Lin Ming",
                partOfSpeech: "nome próprio",
                compoundLogicPt: "林 (bosque) + 明 (brilhante).",
                characters: chars("林明", ["Lín", "Míng"], [1, 1], ["bosque", "brilhante"]),
              },
              {
                id: "s9-t2",
                hanzi: "很",
                pinyin: "hěn",
                hskLevel: 1,
                meaningPt: "muito",
                partOfSpeech: "advérbio",
                compoundLogicPt: "Conector de grau antes de 高兴.",
                characters: chars("很", ["hěn"], [1], ["muito"]),
              },
              {
                id: "s9-t3",
                hanzi: "高兴",
                pinyin: "gāoxìng",
                hskLevel: 1,
                meaningPt: "feliz / contente",
                partOfSpeech: "adjetivo",
                compoundLogicPt: "Formada por 高 (alto/elevado) + 兴 (ânimo/entusiasmo) → 'espírito elevado' = feliz.",
                characters: chars("高兴", ["gāo", "xìng"], [1, 1], ["alto", "ânimo"]),
              },
              { id: "s9-t4", hanzi: "，", isPunctuation: true },
              {
                id: "s9-t5",
                hanzi: "叫",
                pinyin: "jiào",
                hskLevel: 1,
                meaningPt: "chamou",
                partOfSpeech: "verbo",
                compoundLogicPt: "Radical de boca (口) + 丩 → chamar alguém em voz alta.",
                characters: chars("叫", ["jiào"], [1], ["chamar"]),
              },
              {
                id: "s9-t6",
                hanzi: "她",
                pinyin: "tā",
                hskLevel: 1,
                meaningPt: "ela / a",
                partOfSpeech: "pronome",
                compoundLogicPt: "Pronome feminino.",
                characters: chars("她", ["tā"], [1], ["ela"]),
              },
              {
                id: "s9-t7",
                hanzi: "过来",
                pinyin: "guòlái",
                hskLevel: 1,
                meaningPt: "vir até ali",
                partOfSpeech: "verbo direcional",
                compoundLogicPt: "过 (atravessar) + 来 (vir para perto de quem chama).",
                characters: chars("过来", ["guò", "lái"], [1, 1], ["passar", "vir"]),
              },
              {
                id: "s9-t8",
                hanzi: "坐下",
                pinyin: "zuòxià",
                hskLevel: 1,
                meaningPt: "sentar-se",
                partOfSpeech: "verbo + complemento direcional",
                compoundLogicPt: "坐 (sentar) + 下 (para baixo/acomodar-se).",
                characters: chars("坐下", ["zuò", "xià"], [1, 1], ["sentar", "para baixo"]),
              },
              { id: "s9-t9", hanzi: "。", isPunctuation: true },
            ],
          },
          {
            id: "s10",
            zhText: "小美说：“这本汉字书我找了好久，今天送给你！”",
            pinyinText: "Xiǎoměi shuō: “Zhè běn hànzì shū wǒ zhǎo le hǎojiǔ, jīntiān sòng gěi nǐ!”",
            translationPt: "Xiaomei disse: “Procurei este livro de caracteres chineses por muito tempo; hoje dou de presente para você!”",
            literalPt: "Xiaomei disse: 'Este [classificador] Hanzi livro eu procurei [concluído] muito-tempo, hoje presenteio para você!'",
            grammarNotes: [
              {
                pattern: "Estrutura Tópico-Comentário (Topic-Prominent)",
                explanationPt: "Em chinês falado natural, o objeto destacado vai para a frente da frase como Tópico: 这本汉字书我找了好久 ('Este livro de Hanzi, eu procurei por muito tempo').",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s10-t1",
                hanzi: "小美",
                pinyin: "Xiǎoměi",
                hskLevel: 1,
                meaningPt: "Xiaomei",
                partOfSpeech: "nome próprio",
                compoundLogicPt: "小 (pequena) + 美 (bela).",
                characters: chars("小美", ["Xiǎo", "měi"], [1, 1], ["pequena", "bela"]),
              },
              {
                id: "s10-t2",
                hanzi: "说",
                pinyin: "shuō",
                hskLevel: 1,
                meaningPt: "disse",
                partOfSpeech: "verbo",
                compoundLogicPt: "Radical de palavra (讠) + 兑.",
                characters: chars("说", ["shuō"], [1], ["dizer"]),
              },
              { id: "s10-t3", hanzi: "：“", isPunctuation: true },
              {
                id: "s10-t4",
                hanzi: "这本",
                pinyin: "zhè běn",
                hskLevel: 1,
                meaningPt: "este (livro)",
                partOfSpeech: "demonstrativo + classificador",
                compoundLogicPt: "这 (este) + 本 (classificador obrigatório antes de livro).",
                characters: chars("这本", ["zhè", "běn"], [1, 1], ["este", "classificador de livro"]),
              },
              {
                id: "s10-t5",
                hanzi: "汉字",
                pinyin: "hànzì",
                hskLevel: 1,
                meaningPt: "caracteres chineses (Hanzi)",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Formada por 汉 (dinastia/povo Han) + 字 (caractere escrito) → ideogramas chineses.",
                characters: chars("汉字", ["hàn", "zì"], [1, 1], ["chinês/Han", "caractere"]),
              },
              {
                id: "s10-t6",
                hanzi: "书",
                pinyin: "shū",
                hskLevel: 1,
                meaningPt: "livro",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Mão segurando pincel para escrever → livro.",
                characters: chars("书", ["shū"], [1], ["livro"]),
              },
              {
                id: "s10-t7",
                hanzi: "我",
                pinyin: "wǒ",
                hskLevel: 1,
                meaningPt: "eu",
                partOfSpeech: "pronome",
                compoundLogicPt: "Pronome de 1ª pessoa do singular.",
                characters: chars("我", ["wǒ"], [1], ["eu"]),
              },
              {
                id: "s10-t8",
                hanzi: "找了",
                pinyin: "zhǎo le",
                hskLevel: 1,
                meaningPt: "procurei",
                partOfSpeech: "verbo + partícula",
                compoundLogicPt: "找 (procurar com a mão 扌) + 了 (ação realizada).",
                characters: chars("找了", ["zhǎo", "le"], [1, 1], ["procurar", "concluído"]),
              },
              {
                id: "s10-t9",
                hanzi: "好久",
                pinyin: "hǎojiǔ",
                hskLevel: 1,
                meaningPt: "por muito tempo",
                partOfSpeech: "expressão de duração",
                compoundLogicPt: "好 (aqui como intensificador 'muito/bem') + 久 (longo tempo).",
                characters: chars("好久", ["hǎo", "jiǔ"], [1, 1], ["muito", "longo tempo"]),
              },
              { id: "s10-t10", hanzi: "，", isPunctuation: true },
              {
                id: "s10-t11",
                hanzi: "今天",
                pinyin: "jīntiān",
                hskLevel: 1,
                meaningPt: "hoje",
                partOfSpeech: "substantivo de tempo",
                compoundLogicPt: "今 (agora) + 天 (dia).",
                characters: chars("今天", ["jīn", "tiān"], [1, 1], ["agora", "dia"]),
              },
              {
                id: "s10-t12",
                hanzi: "送给",
                pinyin: "sòng gěi",
                hskLevel: 2,
                meaningPt: "dou de presente para",
                partOfSpeech: "verbo + preposição dativa",
                compoundLogicPt: "送 (presentear/entregar) + 给 (dar/para o destinatário).",
                characters: chars("送给", ["sòng", "gěi"], [2, 1], ["presentear", "dar/para"]),
              },
              {
                id: "s10-t13",
                hanzi: "你",
                pinyin: "nǐ",
                hskLevel: 1,
                meaningPt: "você",
                partOfSpeech: "pronome",
                compoundLogicPt: "Pronome de 2ª pessoa singular.",
                characters: chars("你", ["nǐ"], [1], ["você"]),
              },
              { id: "s10-t14", hanzi: "！”", isPunctuation: true },
            ],
          },
          {
            id: "s11",
            zhText: "他们一起喝茶，看书里的故事，真有意思。",
            pinyinText: "Tāmen yìqǐ hē chá, kàn shū lǐ de gùshi, zhēn yǒuyìsi.",
            translationPt: "Eles tomaram chá juntos e leram as histórias do livro; foi realmente muito interessante.",
            literalPt: "Eles juntos beberam chá, leram livro dentro de histórias, realmente interessante.",
            grammarNotes: [
              {
                pattern: "Sujeito + 一起 (yìqǐ) + Verbo = fazer algo juntos",
                explanationPt: "O advérbio 一起 ('juntos') sempre precede o verbo principal: 他们一起喝茶 (Eles juntos bebem chá).",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s11-t1",
                hanzi: "他们",
                pinyin: "tāmen",
                hskLevel: 1,
                meaningPt: "eles",
                partOfSpeech: "pronome plural",
                compoundLogicPt: "他 (ele) + 们 (sufixo plural para pessoas) → eles.",
                characters: chars("他们", ["tā", "men"], [1, 1], ["ele", "plural"]),
              },
              {
                id: "s11-t2",
                hanzi: "一起",
                pinyin: "yìqǐ",
                hskLevel: 1,
                meaningPt: "juntos",
                partOfSpeech: "advérbio",
                compoundLogicPt: "一 (um só) + 起 (erguer-se/começar) → em um só movimento = juntos.",
                characters: chars("一起", ["yī", "qǐ"], [1, 1], ["um", "erguer-se"]),
              },
              {
                id: "s11-t3",
                hanzi: "喝茶",
                pinyin: "hē chá",
                hskLevel: 1,
                meaningPt: "tomaram chá",
                partOfSpeech: "verbo + objeto",
                compoundLogicPt: "喝 (beber) + 茶 (chá).",
                characters: chars("喝茶", ["hē", "chá"], [1, 1], ["beber", "chá"]),
              },
              { id: "s11-t4", hanzi: "，", isPunctuation: true },
              {
                id: "s11-t5",
                hanzi: "看",
                pinyin: "kàn",
                hskLevel: 1,
                meaningPt: "leram / olharam",
                partOfSpeech: "verbo",
                compoundLogicPt: "Em Mandarim, 'ler em silêncio' usa o verbo 看 (olhar): 看书 = ler livro.",
                characters: chars("看", ["kàn"], [1], ["ler/olhar"]),
              },
              {
                id: "s11-t6",
                hanzi: "书里",
                pinyin: "shū lǐ",
                hskLevel: 1,
                meaningPt: "dentro do livro",
                partOfSpeech: "locução espacial",
                compoundLogicPt: "书 (livro) + 里 (dentro).",
                characters: chars("书里", ["shū", "lǐ"], [1, 1], ["livro", "dentro"]),
              },
              {
                id: "s11-t7",
                hanzi: "的",
                pinyin: "de",
                hskLevel: 1,
                meaningPt: "do / de",
                partOfSpeech: "partícula",
                compoundLogicPt: "Conecta 'dentro do livro' a 'histórias'.",
                characters: chars("的", ["de"], [1], ["de"]),
              },
              {
                id: "s11-t8",
                hanzi: "故事",
                pinyin: "gùshi",
                hskLevel: 2,
                meaningPt: "histórias / contos",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Formada por 故 (antigo/passado) + 事 (acontecimento/fato) → 'acontecimentos passados' = história.",
                characters: chars("故事", ["gù", "shi"], [2, 1], ["antigo", "acontecimento"]),
              },
              { id: "s11-t9", hanzi: "，", isPunctuation: true },
              {
                id: "s11-t10",
                hanzi: "真",
                pinyin: "zhēn",
                hskLevel: 1,
                meaningPt: "realmente / que...",
                partOfSpeech: "advérbio exclamativo",
                compoundLogicPt: "Usado em exclamações sinceras: 真有意思 ('realmente interessante!').",
                characters: chars("真", ["zhēn"], [1], ["realmente"]),
              },
              {
                id: "s11-t11",
                hanzi: "有意思",
                pinyin: "yǒuyìsi",
                hskLevel: 2,
                meaningPt: "interessante / divertido",
                partOfSpeech: "adjetivo composto",
                compoundLogicPt: "Formada por 有 (ter) + 意思 (significado/ideia: 音 som do 心 coração) → 'que tem significado e graça' = interessante.",
                characters: chars("有意思", ["yǒu", "yì", "si"], [1, 2, 2], ["ter", "significado", "pensamento"]),
              },
              { id: "s11-t12", hanzi: "。", isPunctuation: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "story-2",
    slug: "o-gato-da-livraria-antiga",
    titleZh: "书店里的小猫",
    titlePinyin: "Shūdiàn lǐ de xiǎomāo",
    titlePt: "O Gatinho da Livraria Antiga",
    subtitlePt: "Em uma tarde chuvosa, uma pequena livraria guarda um guardião de bigodes brancos.",
    synopsisPt:
      "Quando começa a chover na rua, o professor Wang entra em uma livraria tradicional. Lá ele conhece uma gatinha branca que adora dormir sobre cadeiras de madeira perto dos livros de história.",
    category: "Cultura & Folclore",
    targetHsk: 1,
    targetRule: {
      descriptionPt: "Padrão Iniciante Consolidado (HSK 1): ≥ 85% vocabulário HSK 1 e ≤ 15% HSK 2",
      minBasePercentage: 85,
      maxAbovePercentage: 15,
    },
    estimatedMinutes: 3,
    tags: ["Livraria", "Gato", "Dia de Chuva", "Professor", "Iniciante HSK 1"],
    chapters: [
      {
        id: "ch-1",
        chapterNumber: 1,
        titleZh: "第一章：下雨的下午",
        titlePinyin: "Dì yī zhāng: Xiàyǔ de xiàwǔ",
        titlePt: "Capítulo 1: Uma Tarde de Chuva",
        summaryPt: "A chuva começa a cair e o professor Wang encontra abrigo em uma livraria acolhedora onde uma gatinha dorme na cadeira.",
        estimatedMinutes: 3,
        audioUrl: "/audio/stories/o-gato-da-livraria-antiga/ch-1.mp3",
        audioDurationMs: 0,
        voiceName: "zh-CN-YunxiNeural",
        hskDistribution: [],
        keyVocabulary: [
          { hanzi: "下雨", pinyin: "xiàyǔ", meaningPt: "chover", hskLevel: 1 },
          { hanzi: "书店", pinyin: "shūdiàn", meaningPt: "livraria", hskLevel: 1 },
          { hanzi: "一只猫", pinyin: "yì zhī māo", meaningPt: "um gato", hskLevel: 2 },
          { hanzi: "椅子", pinyin: "yǐzi", meaningPt: "cadeira", hskLevel: 2 },
          { hanzi: "睡觉", pinyin: "shuìjiào", meaningPt: "dormir", hskLevel: 1 },
        ],
        sentences: [
          {
            id: "s201",
            zhText: "今天下午下雨了，王老师走进一家书店。",
            pinyinText: "Jīntiān xiàwǔ xiàyǔ le, Wáng lǎoshī zǒujìn yì jiā shūdiàn.",
            translationPt: "Hoje à tarde começou a chover, e o professor Wang entrou caminhando em uma livraria.",
            literalPt: "Hoje tarde caiu-chuva [mudança de estado], Wang professor caminhou-entrando uma livraria.",
            grammarNotes: [
              {
                pattern: "Verbo + 了 (le) de mudança de estado climático",
                explanationPt: "Em 下雨了 (xiàyǔ le), o 了 no final indica uma nova situação que acabou de começar: 'começou a chover'.",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s201-t1",
                hanzi: "今天",
                pinyin: "jīntiān",
                hskLevel: 1,
                meaningPt: "hoje",
                partOfSpeech: "substantivo de tempo",
                compoundLogicPt: "今 (agora) + 天 (dia).",
                characters: chars("今天", ["jīn", "tiān"], [1, 1], ["agora", "dia"]),
              },
              {
                id: "s201-t2",
                hanzi: "下午",
                pinyin: "xiàwǔ",
                hskLevel: 1,
                meaningPt: "tarde (período após o meio-dia)",
                partOfSpeech: "substantivo de tempo",
                compoundLogicPt: "下 (depois/abaixo) + 午 (meio-dia) → depois do meio-dia = à tarde.",
                characters: chars("下午", ["xià", "wǔ"], [1, 1], ["abaixo/após", "meio-dia"]),
              },
              {
                id: "s201-t3",
                hanzi: "下雨",
                pinyin: "xiàyǔ",
                hskLevel: 1,
                meaningPt: "chover (cair chuva)",
                partOfSpeech: "verbo + objeto",
                compoundLogicPt: "下 (descer/cair) + 雨 (chuva: gotas caindo da nuvem).",
                characters: chars("下雨", ["xià", "yǔ"], [1, 1], ["cair", "chuva"]),
              },
              {
                id: "s201-t4",
                hanzi: "了",
                pinyin: "le",
                hskLevel: 1,
                meaningPt: "começou a (mudança de estado)",
                partOfSpeech: "partícula modal",
                compoundLogicPt: "Marca a mudança climática: não chovia e agora começou a chover.",
                characters: chars("了", ["le"], [1], ["mudança de estado"]),
              },
              { id: "s201-t5", hanzi: "，", isPunctuation: true },
              {
                id: "s201-t6",
                hanzi: "王老师",
                pinyin: "Wáng lǎoshī",
                hskLevel: 1,
                meaningPt: "Professor Wang",
                partOfSpeech: "nome + título",
                compoundLogicPt: "Em chinês o sobrenome vem antes do título: 王 (sobrenome Wang, 'rei') + 老师 (professor/mestre).",
                characters: chars("王老师", ["Wáng", "lǎo", "shī"], [1, 1, 1], ["rei/Wang", "experiente", "mestre"]),
              },
              {
                id: "s201-t7",
                hanzi: "走进",
                pinyin: "zǒujìn",
                hskLevel: 1,
                meaningPt: "entrou caminhando",
                partOfSpeech: "verbo + complemento direcional",
                compoundLogicPt: "走 (caminhar) + 进 (entrar).",
                characters: chars("走进", ["zǒu", "jìn"], [1, 1], ["caminhar", "entrar"]),
              },
              {
                id: "s201-t8",
                hanzi: "一家",
                pinyin: "yì jiā",
                hskLevel: 1,
                meaningPt: "uma (loja)",
                partOfSpeech: "numeral + classificador",
                compoundLogicPt: "一 (uma) + 家 (classificador para estabelecimentos).",
                characters: chars("一家", ["yī", "jiā"], [1, 1], ["um", "estabelecimento"]),
              },
              {
                id: "s201-t9",
                hanzi: "书店",
                pinyin: "shūdiàn",
                hskLevel: 1,
                meaningPt: "livraria",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Formada por 书 (livro) + 店 (loja) → loja de livros = livraria.",
                characters: chars("书店", ["shū", "diàn"], [1, 1], ["livro", "loja"]),
              },
              { id: "s201-t10", hanzi: "。", isPunctuation: true },
            ],
          },
          {
            id: "s202",
            zhText: "书店里有很多好看的书，还有一只小猫。",
            pinyinText: "Shūdiàn lǐ yǒu hěn duō hǎokàn de shū, háiyǒu yì zhī xiǎomāo.",
            translationPt: "Dentro da livraria havia muitos livros interessantes, e também havia um gatinho.",
            literalPt: "Livraria dentro havia muitos bons-de-ler livros, ainda-havia um [classificador] pequeno-gato.",
            grammarNotes: [
              {
                pattern: "Classificador 只 (zhī) para animais pequenos",
                explanationPt: "Gatos, pássaros e cães pequenos usam o classificador 只 (zhī): 一只小猫 (um gatinho).",
                hskLevel: 2,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s202-t1",
                hanzi: "书店",
                pinyin: "shūdiàn",
                hskLevel: 1,
                meaningPt: "livraria",
                partOfSpeech: "substantivo",
                compoundLogicPt: "书 (livro) + 店 (loja).",
                characters: chars("书店", ["shū", "diàn"], [1, 1], ["livro", "loja"]),
              },
              {
                id: "s202-t2",
                hanzi: "里",
                pinyin: "lǐ",
                hskLevel: 1,
                meaningPt: "dentro",
                partOfSpeech: "posposição espacial",
                compoundLogicPt: "Indica o interior da livraria.",
                characters: chars("里", ["lǐ"], [1], ["dentro"]),
              },
              {
                id: "s202-t3",
                hanzi: "有",
                pinyin: "yǒu",
                hskLevel: 1,
                meaningPt: "há / havia",
                partOfSpeech: "verbo existencial",
                compoundLogicPt: "Indica existência no local.",
                characters: chars("有", ["yǒu"], [1], ["haver"]),
              },
              {
                id: "s202-t4",
                hanzi: "很多",
                pinyin: "hěn duō",
                hskLevel: 1,
                meaningPt: "muitos",
                partOfSpeech: "quantificador",
                compoundLogicPt: "很 (muito) + 多 (numerosos).",
                characters: chars("很多", ["hěn", "duō"], [1, 1], ["muito", "muitos"]),
              },
              {
                id: "s202-t5",
                hanzi: "好看",
                pinyin: "hǎokàn",
                hskLevel: 1,
                meaningPt: "interessantes (de ler) / bonitos",
                partOfSpeech: "adjetivo",
                compoundLogicPt: "好 (bom de) + 看 (ler/ver) → um livro envolvente ou algo bonito de se ver.",
                characters: chars("好看", ["hǎo", "kàn"], [1, 1], ["bom", "ler/ver"]),
              },
              {
                id: "s202-t6",
                hanzi: "的",
                pinyin: "de",
                hskLevel: 1,
                meaningPt: "partícula qualificadora",
                partOfSpeech: "partícula",
                compoundLogicPt: "Liga a qualidade 好看 ao substantivo 书.",
                characters: chars("的", ["de"], [1], ["de"]),
              },
              {
                id: "s202-t7",
                hanzi: "书",
                pinyin: "shū",
                hskLevel: 1,
                meaningPt: "livros",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Livro / obra escrita.",
                characters: chars("书", ["shū"], [1], ["livro"]),
              },
              { id: "s202-t8", hanzi: "，", isPunctuation: true },
              {
                id: "s202-t9",
                hanzi: "还有",
                pinyin: "háiyǒu",
                hskLevel: 1,
                meaningPt: "e também havia / além disso há",
                partOfSpeech: "advérbio + verbo",
                compoundLogicPt: "还 (hái, 'ainda/além disso') + 有 (yǒu, 'haver'). Atenção ao polifônico 还 (lido hái aqui, e não huán).",
                characters: chars("还有", ["hái", "yǒu"], [1, 1], ["ainda/também", "haver"]),
              },
              {
                id: "s202-t10",
                hanzi: "一只",
                pinyin: "yì zhī",
                hskLevel: 2,
                meaningPt: "um (animal pequeno)",
                partOfSpeech: "numeral + classificador",
                compoundLogicPt: "一 (um) + 只 (zhī, classificador específico para pequenos animais como gatos e pássaros).",
                characters: chars("一只", ["yī", "zhī"], [1, 2], ["um", "classificador animal"]),
              },
              {
                id: "s202-t11",
                hanzi: "小猫",
                pinyin: "xiǎomāo",
                hskLevel: 1,
                meaningPt: "gatinho",
                partOfSpeech: "substantivo",
                compoundLogicPt: "小 (pequeno) + 猫 (gato: radical de animal 犭 + 苗 miáo que imita o miado).",
                characters: chars("小猫", ["xiǎo", "māo"], [1, 1], ["pequeno", "gato"]),
              },
              { id: "s202-t12", hanzi: "。", isPunctuation: true },
            ],
          },
          {
            id: "s203",
            zhText: "小猫在椅子上睡觉，真可爱。",
            pinyinText: "Xiǎomāo zài yǐzi shàng shuìjiào, zhēn kě'ài.",
            translationPt: "O gatinho estava dormindo em cima da cadeira; era realmente adorável.",
            literalPt: "Gatinho em cadeira em-cima dormia, realmente fofo/adorável.",
            grammarNotes: [
              {
                pattern: "Sujeito + 在 + Local + Verbo",
                explanationPt: "O local onde a ação acontece (在椅子上 'em cima da cadeira') vem obrigatoriamente ANTES do verbo 睡觉 (dormir).",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s203-t1",
                hanzi: "小猫",
                pinyin: "xiǎomāo",
                hskLevel: 1,
                meaningPt: "o gatinho",
                partOfSpeech: "substantivo",
                compoundLogicPt: "小 (pequeno) + 猫 (gato).",
                characters: chars("小猫", ["xiǎo", "māo"], [1, 1], ["pequeno", "gato"]),
              },
              {
                id: "s203-t2",
                hanzi: "在",
                pinyin: "zài",
                hskLevel: 1,
                meaningPt: "em",
                partOfSpeech: "preposição de lugar",
                compoundLogicPt: "Marca onde a ação de dormir ocorre.",
                characters: chars("在", ["zài"], [1], ["em"]),
              },
              {
                id: "s203-t3",
                hanzi: "椅子",
                pinyin: "yǐzi",
                hskLevel: 2,
                meaningPt: "cadeira",
                partOfSpeech: "substantivo",
                compoundLogicPt: "椅 (cadeira de madeira 木) + 子 (sufixo nominal).",
                characters: chars("椅子", ["yǐ", "zi"], [2, 1], ["cadeira", "sufixo"]),
              },
              {
                id: "s203-t4",
                hanzi: "上",
                pinyin: "shàng",
                hskLevel: 1,
                meaningPt: "em cima de",
                partOfSpeech: "posposição espacial",
                compoundLogicPt: "Fecha a locução 在椅子上 ('em cima da cadeira').",
                characters: chars("上", ["shàng"], [1], ["em cima"]),
              },
              {
                id: "s203-t5",
                hanzi: "睡觉",
                pinyin: "shuìjiào",
                hskLevel: 1,
                meaningPt: "dormindo / dormir",
                partOfSpeech: "verbo separável (VO)",
                compoundLogicPt: "睡 (adormecer: olho 目 + pálpebra que pesa 垂) + 觉 (jiào, 'sono').",
                characters: chars("睡觉", ["shuì", "jiào"], [1, 1], ["dormir", "sono"]),
              },
              { id: "s203-t6", hanzi: "，", isPunctuation: true },
              {
                id: "s203-t7",
                hanzi: "真",
                pinyin: "zhēn",
                hskLevel: 1,
                meaningPt: "realmente / tão",
                partOfSpeech: "advérbio",
                compoundLogicPt: "Advérbio exclamativo.",
                characters: chars("真", ["zhēn"], [1], ["realmente"]),
              },
              {
                id: "s203-t8",
                hanzi: "可爱",
                pinyin: "kě'ài",
                hskLevel: 2,
                meaningPt: "fofo / adorável",
                partOfSpeech: "adjetivo",
                compoundLogicPt: "可 (digno de / pode ser) + 爱 (amado) → literalmente 'digno de ser amado' = adorável/fofo.",
                characters: chars("可爱", ["kě", "ài"], [2, 1], ["digno de", "amar"]),
              },
              { id: "s203-t9", hanzi: "。", isPunctuation: true },
            ],
          },
          {
            id: "s204",
            zhText: "王老师买了两本书，坐在小猫旁边看书。",
            pinyinText: "Wáng lǎoshī mǎi le liǎng běn shū, zuò zài xiǎomāo pángbiān kàn shū.",
            translationPt: "O professor Wang comprou dois livros e sentou-se ao lado do gatinho para ler.",
            literalPt: "Wang professor comprou [concluído] dois [classificador] livros, sentou em gatinho ao-lado ler livro.",
            grammarNotes: [
              {
                pattern: "Ações em sequência cronológica",
                explanationPt: "Em Mandarim, ações consecutivas seguem a ordem exata em que ocorrem no tempo: primeiro 坐在小猫旁边 (sentou ao lado do gatinho) e depois 看书 (para ler).",
                hskLevel: 1,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s204-t1",
                hanzi: "王老师",
                pinyin: "Wáng lǎoshī",
                hskLevel: 1,
                meaningPt: "Professor Wang",
                partOfSpeech: "nome + título",
                compoundLogicPt: "王 (Wang) + 老师 (professor).",
                characters: chars("王老师", ["Wáng", "lǎo", "shī"], [1, 1, 1], ["Wang", "experiente", "mestre"]),
              },
              {
                id: "s204-t2",
                hanzi: "买了",
                pinyin: "mǎi le",
                hskLevel: 1,
                meaningPt: "comprou",
                partOfSpeech: "verbo + partícula",
                compoundLogicPt: "买 (comprar) + 了 (ação concluída).",
                characters: chars("买了", ["mǎi", "le"], [1, 1], ["comprar", "concluído"]),
              },
              {
                id: "s204-t3",
                hanzi: "两本",
                pinyin: "liǎng běn",
                hskLevel: 1,
                meaningPt: "dois (livros)",
                partOfSpeech: "numeral + classificador",
                compoundLogicPt: "两 (dois) + 本 (classificador para livros).",
                characters: chars("两本", ["liǎng", "běn"], [1, 1], ["dois", "classificador de livros"]),
              },
              {
                id: "s204-t4",
                hanzi: "书",
                pinyin: "shū",
                hskLevel: 1,
                meaningPt: "livros",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Obra impressa.",
                characters: chars("书", ["shū"], [1], ["livro"]),
              },
              { id: "s204-t5", hanzi: "，", isPunctuation: true },
              {
                id: "s204-t6",
                hanzi: "坐在",
                pinyin: "zuò zài",
                hskLevel: 1,
                meaningPt: "sentou-se em",
                partOfSpeech: "verbo + preposição",
                compoundLogicPt: "坐 (sentar) + 在 (em).",
                characters: chars("坐在", ["zuò", "zài"], [1, 1], ["sentar", "em"]),
              },
              {
                id: "s204-t7",
                hanzi: "小猫",
                pinyin: "xiǎomāo",
                hskLevel: 1,
                meaningPt: "do gatinho",
                partOfSpeech: "substantivo",
                compoundLogicPt: "小 (pequeno) + 猫 (gato).",
                characters: chars("小猫", ["xiǎo", "māo"], [1, 1], ["pequeno", "gato"]),
              },
              {
                id: "s204-t8",
                hanzi: "旁边",
                pinyin: "pángbiān",
                hskLevel: 2,
                meaningPt: "ao lado",
                partOfSpeech: "localizador",
                compoundLogicPt: "旁 (lado) + 边 (borda).",
                characters: chars("旁边", ["páng", "biān"], [2, 1], ["lado", "borda"]),
              },
              {
                id: "s204-t9",
                hanzi: "看书",
                pinyin: "kàn shū",
                hskLevel: 1,
                meaningPt: "para ler / lendo",
                partOfSpeech: "verbo + objeto",
                compoundLogicPt: "看 (olhar/ler) + 书 (livro) → a forma padrão de dizer 'ler' em Mandarim.",
                characters: chars("看书", ["kàn", "shū"], [1, 1], ["ler", "livro"]),
              },
              { id: "s204-t10", hanzi: "。", isPunctuation: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "story-3",
    slug: "a-lanterna-vermelha-da-rua-antiga",
    titleZh: "老街上的红灯笼",
    titlePinyin: "Lǎo jiē shàng de hóng dēnglóng",
    titlePt: "A Lanterna Vermelha da Rua Antiga",
    subtitlePt: "Uma caminhada noturna pelas luzes tradicionais antes do trem partir.",
    synopsisPt:
      "Na noite anterior à sua viagem de trem, Lin Ming e Xiaomei caminham por uma rua histórica iluminada por lanternas vermelhas de bambu.Uma história graduada para a transição entre HSK 1 e HSK 2 (80% HSK 1, 15% HSK 2, 5% HSK 3).",
    category: "Viagem & Gastronomia",
    targetHsk: 2,
    targetRule: {
      descriptionPt: "Padrão Transição HSK 2: ~80% HSK 1 · ~15% HSK 2 · ≤ 5% HSK 3",
      minBasePercentage: 78,
      maxAbovePercentage: 6,
    },
    estimatedMinutes: 3,
    tags: ["Noite Cultural", "Lanternas", "Viagem de Trem", "HSK 2"],
    chapters: [
      {
        id: "ch-1",
        chapterNumber: 1,
        titleZh: "第一章：晚上的老街",
        titlePinyin: "Dì yī zhāng: Wǎnshang de lǎo jiē",
        titlePt: "Capítulo 1: A Rua Antiga à Noite",
        summaryPt: "Com as passagens de trem compradas para a manhã seguinte, os amigos passeiam pela rua antiga iluminada por lanternas vermelhas.",
        estimatedMinutes: 3,
        audioUrl: "/audio/stories/a-lanterna-vermelha-da-rua-antiga/ch-1.mp3",
        audioDurationMs: 0,
        voiceName: "zh-CN-XiaoxiaoNeural",
        hskDistribution: [],
        keyVocabulary: [
          { hanzi: "老街", pinyin: "lǎo jiē", meaningPt: "rua antiga/histórica", hskLevel: 2 },
          { hanzi: "红灯笼", pinyin: "hóng dēnglóng", meaningPt: "lanterna vermelha tradicional", hskLevel: 3 },
          { hanzi: "火车票", pinyin: "huǒchēpiào", meaningPt: "passagem de trem", hskLevel: 2 },
          { hanzi: "车站", pinyin: "chēzhàn", meaningPt: "estação", hskLevel: 1 },
        ],
        sentences: [
          {
            id: "s301",
            zhText: "晚上，林明和小美来到北京的一条老街。",
            pinyinText: "Wǎnshang, Lín Míng hé Xiǎoměi láidào Běijīng de yì tiáo lǎo jiē.",
            translationPt: "À noite, Lin Ming e Xiaomei chegaram a uma rua antiga de Pequim.",
            literalPt: "Noite, Lin Ming e Xiaomei vieram-chegando Pequim de uma [classificador longo] antiga rua.",
            grammarNotes: [
              {
                pattern: "Classificador 条 (tiáo) para coisas longas e sinuosas",
                explanationPt: "Ruas, rios, estradas e peixes usam o classificador 条 (tiáo): 一条老街 (uma rua antiga).",
                hskLevel: 2,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s301-t1",
                hanzi: "晚上",
                pinyin: "wǎnshang",
                hskLevel: 1,
                meaningPt: "à noite",
                partOfSpeech: "substantivo de tempo",
                compoundLogicPt: "晚 (entardecer/noite) + 上 (período).",
                characters: chars("晚上", ["wǎn", "shang"], [1, 1], ["noite", "período"]),
              },
              { id: "s301-t2", hanzi: "，", isPunctuation: true },
              {
                id: "s301-t3",
                hanzi: "林明",
                pinyin: "Lín Míng",
                hskLevel: 1,
                meaningPt: "Lin Ming",
                partOfSpeech: "nome próprio",
                compoundLogicPt: "林 (bosque) + 明 (brilhante).",
                characters: chars("林明", ["Lín", "Míng"], [1, 1], ["bosque", "brilhante"]),
              },
              {
                id: "s301-t4",
                hanzi: "和",
                pinyin: "hé",
                hskLevel: 1,
                meaningPt: "e",
                partOfSpeech: "conjunção",
                compoundLogicPt: "Une dois nomes.",
                characters: chars("和", ["hé"], [1], ["e"]),
              },
              {
                id: "s301-t5",
                hanzi: "小美",
                pinyin: "Xiǎoměi",
                hskLevel: 1,
                meaningPt: "Xiaomei",
                partOfSpeech: "nome próprio",
                compoundLogicPt: "小 (pequena) + 美 (bela).",
                characters: chars("小美", ["Xiǎo", "měi"], [1, 1], ["pequena", "bela"]),
              },
              {
                id: "s301-t6",
                hanzi: "来到",
                pinyin: "láidào",
                hskLevel: 1,
                meaningPt: "chegaram a / vieram até",
                partOfSpeech: "verbo + complemento de resultado",
                compoundLogicPt: "来 (vir) + 到 (chegar ao destino).",
                characters: chars("来到", ["lái", "dào"], [1, 1], ["vir", "chegar"]),
              },
              {
                id: "s301-t7",
                hanzi: "北京",
                pinyin: "Běijīng",
                hskLevel: 1,
                meaningPt: "Pequim",
                partOfSpeech: "nome próprio",
                compoundLogicPt: "北 (norte) + 京 (capital).",
                characters: chars("北京", ["běi", "jīng"], [1, 1], ["norte", "capital"]),
              },
              {
                id: "s301-t8",
                hanzi: "的",
                pinyin: "de",
                hskLevel: 1,
                meaningPt: "de",
                partOfSpeech: "partícula",
                compoundLogicPt: "Conecta Pequim à rua antiga.",
                characters: chars("的", ["de"], [1], ["de"]),
              },
              {
                id: "s301-t9",
                hanzi: "一条",
                pinyin: "yì tiáo",
                hskLevel: 2,
                meaningPt: "uma (rua/via longa)",
                partOfSpeech: "numeral + classificador",
                compoundLogicPt: "一 (uma) + 条 (classificador para ruas, rios e elementos alongados).",
                characters: chars("一条", ["yī", "tiáo"], [1, 2], ["um", "classificador longo"]),
              },
              {
                id: "s301-t10",
                hanzi: "老街",
                pinyin: "lǎo jiē",
                hskLevel: 2,
                meaningPt: "rua antiga / histórica",
                partOfSpeech: "adjetivo + substantivo",
                compoundLogicPt: "老 (antiga/tradicional) + 街 (rua comercial).",
                characters: chars("老街", ["lǎo", "jiē"], [1, 2], ["antiga", "rua"]),
              },
              { id: "s301-t11", hanzi: "。", isPunctuation: true },
            ],
          },
          {
            id: "s302",
            zhText: "门外有红色的灯笼，非常好看。",
            pinyinText: "Mén wài yǒu hóngsè de dēnglóng, fēicháng hǎokàn.",
            translationPt: "Do lado de fora das portas havia lanternas vermelhas, extremamente bonitas.",
            literalPt: "Porta fora havia cor-vermelha de lanternas, extraordinariamente bonitas.",
            grammarNotes: [
              {
                pattern: "Advérbio 非常 (fēicháng) = 'extremamente / muito'",
                explanationPt: "No HSK 2, 非常 substitui 很 quando queremos dar ênfase forte ('muitíssimo bonito').",
                hskLevel: 2,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s302-t1",
                hanzi: "门外",
                pinyin: "mén wài",
                hskLevel: 1,
                meaningPt: "fora das portas",
                partOfSpeech: "locução espacial",
                compoundLogicPt: "门 (porta) + 外 (fora).",
                characters: chars("门外", ["mén", "wài"], [1, 1], ["porta", "fora"]),
              },
              {
                id: "s302-t2",
                hanzi: "有",
                pinyin: "yǒu",
                hskLevel: 1,
                meaningPt: "havia",
                partOfSpeech: "verbo",
                compoundLogicPt: "Verbo existencial.",
                characters: chars("有", ["yǒu"], [1], ["haver"]),
              },
              {
                id: "s302-t3",
                hanzi: "红色",
                pinyin: "hóngsè",
                hskLevel: 1,
                meaningPt: "cor vermelha / vermelhas",
                partOfSpeech: "substantivo/adjetivo",
                compoundLogicPt: "红 (vermelho, com radical de seda tingida 纟) + 色 (cor).",
                characters: chars("红色", ["hóng", "sè"], [1, 1], ["vermelho", "cor"]),
              },
              {
                id: "s302-t4",
                hanzi: "的",
                pinyin: "de",
                hskLevel: 1,
                meaningPt: "de (qualificador)",
                partOfSpeech: "partícula",
                compoundLogicPt: "Conecta a cor 红色 ao substantivo 灯笼.",
                characters: chars("的", ["de"], [1], ["de"]),
              },
              {
                id: "s302-t5",
                hanzi: "灯笼",
                pinyin: "dēnglóng",
                hskLevel: 3,
                meaningPt: "lanterna tradicional chinesa",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Formada por 灯 (lâmpada/fogo 火) + 笼 (gaiola/armação de bambu ⺮ + dragão 龙) → lanterna coberta com estrutura de bambu.",
                characters: chars("灯笼", ["dēng", "lóng"], [2, 3], ["lâmpada/luz", "cesto de bambu"]),
              },
              { id: "s302-t6", hanzi: "，", isPunctuation: true },
              {
                id: "s302-t7",
                hanzi: "非常",
                pinyin: "fēicháng",
                hskLevel: 2,
                meaningPt: "extremamente / muito",
                partOfSpeech: "advérbio",
                compoundLogicPt: "非 (não) + 常 (comum/ordinário) → literalmente 'fora do comum' = extremamente.",
                characters: chars("非常", ["fēi", "cháng"], [2, 2], ["não/fora de", "comum"]),
              },
              {
                id: "s302-t8",
                hanzi: "好看",
                pinyin: "hǎokàn",
                hskLevel: 1,
                meaningPt: "bonitas",
                partOfSpeech: "adjetivo",
                compoundLogicPt: "好 (bom de) + 看 (olhar).",
                characters: chars("好看", ["hǎo", "kàn"], [1, 1], ["bom", "olhar"]),
              },
              { id: "s302-t9", hanzi: "。", isPunctuation: true },
            ],
          },
          {
            id: "s303",
            zhText: "他们已经买了两张火车票，明天早上八点去车站。",
            pinyinText: "Tāmen yǐjīng mǎi le liǎng zhāng huǒchēpiào, míngtiān zǎoshang bā diǎn qù chēzhàn.",
            translationPt: "Eles já compraram duas passagens de trem e amanhã de manhã às oito horas vão para a estação.",
            literalPt: "Eles já compraram duas [classificador plano] trem-passagens, amanhã manhã oito horas vão estação.",
            grammarNotes: [
              {
                pattern: "Classificador 张 (zhāng) para superfícies planas",
                explanationPt: "Bilhetes, passagens, mesas, folhas de papel e camas usam o classificador 张 (zhāng): 两张火车票 (duas passagens de trem).",
                hskLevel: 2,
              },
            ],
            startMs: 0,
            endMs: 0,
            tokens: [
              {
                id: "s303-t1",
                hanzi: "他们",
                pinyin: "tāmen",
                hskLevel: 1,
                meaningPt: "eles",
                partOfSpeech: "pronome",
                compoundLogicPt: "他 + 们.",
                characters: chars("他们", ["tā", "men"], [1, 1], ["ele", "plural"]),
              },
              {
                id: "s303-t2",
                hanzi: "已经",
                pinyin: "yǐjīng",
                hskLevel: 2,
                meaningPt: "já",
                partOfSpeech: "advérbio de tempo",
                compoundLogicPt: "已 (já concluído) + 经 (passar por) → ação já completada.",
                characters: chars("已经", ["yǐ", "jīng"], [2, 2], ["já", "passar por"]),
              },
              {
                id: "s303-t3",
                hanzi: "买了",
                pinyin: "mǎi le",
                hskLevel: 1,
                meaningPt: "compraram",
                partOfSpeech: "verbo + partícula",
                compoundLogicPt: "买 (comprar) + 了.",
                characters: chars("买了", ["mǎi", "le"], [1, 1], ["comprar", "concluído"]),
              },
              {
                id: "s303-t4",
                hanzi: "两张",
                pinyin: "liǎng zhāng",
                hskLevel: 2,
                meaningPt: "duas (unidades planas/bilhetes)",
                partOfSpeech: "numeral + classificador",
                compoundLogicPt: "两 (dois) + 张 (classificador para bilhetes, papéis e mesas).",
                characters: chars("两张", ["liǎng", "zhāng"], [1, 2], ["dois", "classificador plano"]),
              },
              {
                id: "s303-t5",
                hanzi: "火车票",
                pinyin: "huǒchēpiào",
                hskLevel: 2,
                meaningPt: "passagens de trem",
                partOfSpeech: "substantivo composto",
                compoundLogicPt: "Formada por 火 (fogo) + 车 (veículo → 火车 = 'veículo a fogo/vapor' = trem) + 票 (bilhete/passagem).",
                characters: chars("火车票", ["huǒ", "chē", "piào"], [1, 1, 2], ["fogo", "veículo", "bilhete"]),
              },
              { id: "s303-t6", hanzi: "，", isPunctuation: true },
              {
                id: "s303-t7",
                hanzi: "明天",
                pinyin: "míngtiān",
                hskLevel: 1,
                meaningPt: "amanhã",
                partOfSpeech: "substantivo de tempo",
                compoundLogicPt: "明 (brilhante/próximo) + 天 (dia).",
                characters: chars("明天", ["míng", "tiān"], [1, 1], ["próximo/claro", "dia"]),
              },
              {
                id: "s303-t8",
                hanzi: "早上",
                pinyin: "zǎoshang",
                hskLevel: 1,
                meaningPt: "de manhã",
                partOfSpeech: "substantivo de tempo",
                compoundLogicPt: "早 (cedo) + 上.",
                characters: chars("早上", ["zǎo", "shang"], [1, 1], ["cedo", "manhã"]),
              },
              {
                id: "s303-t9",
                hanzi: "八点",
                pinyin: "bā diǎn",
                hskLevel: 1,
                meaningPt: "oito horas (8h00)",
                partOfSpeech: "expressão de hora",
                compoundLogicPt: "八 (oito) + 点 (ponto no relógio/hora).",
                characters: chars("八点", ["bā", "diǎn"], [1, 1], ["oito", "hora/ponto"]),
              },
              {
                id: "s303-t10",
                hanzi: "去",
                pinyin: "qù",
                hskLevel: 1,
                meaningPt: "vão para",
                partOfSpeech: "verbo",
                compoundLogicPt: "Ir em direção a um destino.",
                characters: chars("去", ["qù"], [1], ["ir"]),
              },
              {
                id: "s303-t11",
                hanzi: "车站",
                pinyin: "chēzhàn",
                hskLevel: 1,
                meaningPt: "a estação",
                partOfSpeech: "substantivo",
                compoundLogicPt: "Formada por 车 (veículo/trem) + 站 (parada/estação).",
                characters: chars("车站", ["chē", "zhàn"], [1, 1], ["veículo", "estação/parada"]),
              },
              { id: "s303-t12", hanzi: "。", isPunctuation: true },
            ],
          },
        ],
      },
    ],
  },
  {
    "id": "story-4",
    "slug": "a-montanha-vazia-e-a-coragem",
    "titleZh": "空山里的勇气",
    "titlePinyin": "Kōng shān lǐ de yǒngqì",
    "titlePt": "O Guerreiro e a Coragem na Montanha Vazia",
    "subtitlePt": "Uma jornada filosófica do herói em 10 capítulos sobre o medo, a montanha e a virtude.",
    "synopsisPt": "Li Yun é um jovem espadachim que guarda um segredo: toda vez que empunha sua espada, sente o coração tremer de medo. Acreditando que um verdadeiro guerreiro jamais deveria temer, ele parte em uma jornada de 10 capítulos até o topo da Montanha Vazia em busca de um lendário mestre. Entre pontes sob vendavais, noites na floresta escura e um resgate na nevasca, ele descobre através de uma simples pedra na neve que a coragem sempre caminhou ao seu lado.",
    "category": "Cultura & Folclore",
    "targetHsk": 2,
    "targetRule": {
      "descriptionPt": "Padrão Jornada Filosófica Completa (HSK 2): 75%–82% HSK 1 · 15%–22% HSK 2 · ≤ 5% HSK 3",
      "minBasePercentage": 75,
      "maxAbovePercentage": 5
    },
    "estimatedMinutes": 18,
    "tags": [
      "Filosofia",
      "Jornada do Herói",
      "10 Capítulos",
      "Coragem",
      "Guerreiro",
      "HSK 2"
    ],
    "chapters": [
      {
        "id": "ch-1",
        "chapterNumber": 1,
        "titleZh": "第一章：害怕的剑客",
        "titlePinyin": "Dì yī zhāng: Hàipà de jiànkè",
        "titlePt": "Capítulo 1: O Espadachim que Sentia Medo",
        "summaryPt": "No Mundo Comum, Li Yun é admirado na cidade por sua espada, mas guarda um segredo doloroso: toda vez que precisa enfrentar o perigo, suas mãos tremem e seu coração sente medo.",
        "estimatedMinutes": 2,
        "audioUrl": "/audio/stories/a-montanha-vazia-e-a-coragem/ch-1.mp3",
        "audioDurationMs": 0,
        "voiceName": "zh-CN-YunxiNeural",
        "hskDistribution": [],
        "keyVocabulary": [
          {
            "hanzi": "年轻人",
            "pinyin": "niánqīngrén",
            "meaningPt": "jovem",
            "hskLevel": 2
          },
          {
            "hanzi": "一把剑",
            "pinyin": "yì bǎ jiàn",
            "meaningPt": "uma espada",
            "hskLevel": 3
          },
          {
            "hanzi": "害怕",
            "pinyin": "hàipà",
            "meaningPt": "ter medo / temer",
            "hskLevel": 2
          },
          {
            "hanzi": "勇气",
            "pinyin": "yǒngqì",
            "meaningPt": "coragem / bravura",
            "hskLevel": 3
          },
          {
            "hanzi": "心里",
            "pinyin": "xīnlǐ",
            "meaningPt": "no coração / por dentro",
            "hskLevel": 1
          }
        ],
        "sentences": [
          {
            "id": "s401",
            "zhText": "李云是一个年轻人，手里有一把剑。",
            "pinyinText": "Lǐ Yún shì yí gè niánqīngrén, shǒulǐ yǒu yì bǎ jiàn.",
            "translationPt": "Li Yun era um jovem que tinha uma espada na mão.",
            "literalPt": "Li Yun é um jovem-pessoa, mão-dentro tem uma [classificador de empunhadura] espada.",
            "grammarNotes": [
              {
                "pattern": "Local + 有 (yǒu) + Objeto",
                "explanationPt": "Para dizer o que alguém traz nas mãos, o Mandarim inicia pelo local: 手里有一把剑 ('na mão há uma espada').",
                "hskLevel": 1
              },
              {
                "pattern": "Classificador 把 (bǎ) para objetos com cabo",
                "explanationPt": "Espadas, facas, guarda-chuvas e cadeiras que seguramos com a mão usam o classificador 把 (bǎ): 一把剑 (uma espada).",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s401-t1",
                "hanzi": "李云",
                "pinyin": "Lǐ Yún",
                "hskLevel": 1,
                "meaningPt": "Li Yun (protagonista)",
                "partOfSpeech": "nome próprio",
                "compoundLogicPt": "Sobrenome 李 (ameixeira) + 云 (nuvem).",
                characters: chars("李云", [
                    "Lǐ",
                    "Yún"
                  ], [
                    1,
                    1
                  ], [
                    "Li",
                    "nuvem"
                  ])
              },
              {
                "id": "s401-t2",
                "hanzi": "是",
                "pinyin": "shì",
                "hskLevel": 1,
                "meaningPt": "era / é",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Verbo de ligação 'ser'.",
                characters: chars("是", [
                    "shì"
                  ], [
                    1
                  ], [
                    "ser"
                  ])
              },
              {
                "id": "s401-t3",
                "hanzi": "一个",
                "pinyin": "yí gè",
                "hskLevel": 1,
                "meaningPt": "um",
                "partOfSpeech": "numeral + classificador",
                "compoundLogicPt": "一 (yí antes de 4º tom) + 个.",
                characters: chars("一个", [
                    "yī",
                    "gè"
                  ], [
                    1,
                    1
                  ], [
                    "um",
                    "classificador"
                  ])
              },
              {
                "id": "s401-t4",
                "hanzi": "年轻人",
                "pinyin": "niánqīngrén",
                "hskLevel": 2,
                "meaningPt": "jovem",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "年 (idade) + 轻 (leve/pouca) + 人 (pessoa) → pessoa de pouca idade.",
                characters: chars("年轻人", [
                    "nián",
                    "qīng",
                    "rén"
                  ], [
                    1,
                    2,
                    1
                  ], [
                    "idade",
                    "jovem",
                    "pessoa"
                  ])
              },
              {
                "id": "s401-t5",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s401-t6",
                "hanzi": "手里",
                "pinyin": "shǒulǐ",
                "hskLevel": 1,
                "meaningPt": "na mão",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "手 (mão) + 里 (dentro/na palma).",
                characters: chars("手里", [
                    "shǒu",
                    "lǐ"
                  ], [
                    1,
                    1
                  ], [
                    "mão",
                    "dentro"
                  ])
              },
              {
                "id": "s401-t7",
                "hanzi": "有",
                "pinyin": "yǒu",
                "hskLevel": 1,
                "meaningPt": "tinha / há",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Verbo ter/haver.",
                characters: chars("有", [
                    "yǒu"
                  ], [
                    1
                  ], [
                    "ter"
                  ])
              },
              {
                "id": "s401-t8",
                "hanzi": "一把",
                "pinyin": "yì bǎ",
                "hskLevel": 2,
                "meaningPt": "uma (espada)",
                "partOfSpeech": "numeral + classificador",
                "compoundLogicPt": "一 (uma) + 把 (classificador para objetos com cabo).",
                characters: chars("一把", [
                    "yī",
                    "bǎ"
                  ], [
                    1,
                    2
                  ], [
                    "um",
                    "classificador"
                  ])
              },
              {
                "id": "s401-t9",
                "hanzi": "剑",
                "pinyin": "jiàn",
                "hskLevel": 3,
                "meaningPt": "espada",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Espada tradicional de dois gumes (radical de lâmina 刂).",
                characters: chars("剑", [
                    "jiàn"
                  ], [
                    3
                  ], [
                    "espada"
                  ])
              },
              {
                "id": "s401-t10",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s402",
            "zhText": "大家都说他很强，但是他心里有一件事。",
            "pinyinText": "Dàjiā dōu shuō tā hěn qiáng, dànshì tā xīnlǐ yǒu yí jiàn shì.",
            "translationPt": "Todos diziam que ele era muito forte, mas ele guardava um assunto no coração.",
            "literalPt": "Todos sempre diziam ele muito forte, mas ele coração-dentro tinha um [classificador] assunto.",
            "grammarNotes": [
              {
                "pattern": "Classificador 件 (jiàn) para assuntos e acontecimentos",
                "explanationPt": "Para assuntos, preocupações ou negócios (事 shì), usa-se obrigatoriamente o classificador 件 (jiàn): 一件事 ('um assunto / um segredo no coração').",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s402-t1",
                "hanzi": "大家",
                "pinyin": "dàjiā",
                "hskLevel": 1,
                "meaningPt": "todos / todo mundo",
                "partOfSpeech": "pronome coletivo",
                "compoundLogicPt": "大 (grande) + 家 (família) → todas as pessoas.",
                characters: chars("大家", [
                    "dà",
                    "jiā"
                  ], [
                    1,
                    1
                  ], [
                    "grande",
                    "família/todos"
                  ])
              },
              {
                "id": "s402-t2",
                "hanzi": "都",
                "pinyin": "dōu",
                "hskLevel": 1,
                "meaningPt": "todos",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Advérbio de totalidade.",
                characters: chars("都", [
                    "dōu"
                  ], [
                    1
                  ], [
                    "todos"
                  ])
              },
              {
                "id": "s402-t3",
                "hanzi": "说",
                "pinyin": "shuō",
                "hskLevel": 1,
                "meaningPt": "diziam",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Dizer / falar.",
                characters: chars("说", [
                    "shuō"
                  ], [
                    1
                  ], [
                    "dizer"
                  ])
              },
              {
                "id": "s402-t4",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Ele (Li Yun).",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s402-t5",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Ligador de adjetivo.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s402-t6",
                "hanzi": "强",
                "pinyin": "qiáng",
                "hskLevel": 2,
                "meaningPt": "forte / habilidoso",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "Traz o radical de arco (弓) à esquerda → força de um arqueiro e guerreiro.",
                characters: chars("强", [
                    "qiáng"
                  ], [
                    2
                  ], [
                    "forte"
                  ])
              },
              {
                "id": "s402-t7",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s402-t8",
                "hanzi": "但是",
                "pinyin": "dànshì",
                "hskLevel": 2,
                "meaningPt": "mas / porém",
                "partOfSpeech": "conjunção",
                "compoundLogicPt": "但 + 是 → oposição.",
                characters: chars("但是", [
                    "dàn",
                    "shì"
                  ], [
                    2,
                    1
                  ], [
                    "porém",
                    "ser"
                  ])
              },
              {
                "id": "s402-t9",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Ele.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s402-t9b",
                "hanzi": "心里",
                "pinyin": "xīnlǐ",
                "hskLevel": 1,
                "meaningPt": "no coração",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "心 (coração) + 里 (dentro).",
                characters: chars("心里", [
                    "xīn",
                    "lǐ"
                  ], [
                    1,
                    1
                  ], [
                    "coração",
                    "dentro"
                  ])
              },
              {
                "id": "s402-t10",
                "hanzi": "有",
                "pinyin": "yǒu",
                "hskLevel": 1,
                "meaningPt": "tinha / guardava",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Possuir.",
                characters: chars("有", [
                    "yǒu"
                  ], [
                    1
                  ], [
                    "ter"
                  ])
              },
              {
                "id": "s402-t11",
                "hanzi": "一件",
                "pinyin": "yí jiàn",
                "hskLevel": 1,
                "meaningPt": "um (assunto)",
                "partOfSpeech": "numeral + classificador",
                "compoundLogicPt": "一 + 件 (classificador específico para assuntos e roupas).",
                characters: chars("一件", [
                    "yī",
                    "jiàn"
                  ], [
                    1,
                    1
                  ], [
                    "um",
                    "classificador"
                  ])
              },
              {
                "id": "s402-t12",
                "hanzi": "事",
                "pinyin": "shì",
                "hskLevel": 1,
                "meaningPt": "assunto / segredo",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Assunto que o preocupava em segredo.",
                characters: chars("事", [
                    "shì"
                  ], [
                    1
                  ], [
                    "assunto"
                  ])
              },
              {
                "id": "s402-t13",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s403",
            "zhText": "每次看到剑，他心里都很害怕。",
            "pinyinText": "Měi cì kàndào jiàn, tā xīnlǐ dōu hěn hàipà.",
            "translationPt": "Toda vez que olhava para a espada, ele sentia muito medo no coração.",
            "literalPt": "Cada vez via-alcançando espada, ele coração-dentro sempre muito temia.",
            "grammarNotes": [
              {
                "pattern": "每次 (měi cì) ... 都 (dōu) ... = 'Toda vez que...'",
                "explanationPt": "Estrutura clássica para ações que se repetem sempre da mesma forma.",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s403-t1",
                "hanzi": "每次",
                "pinyin": "měi cì",
                "hskLevel": 2,
                "meaningPt": "toda vez",
                "partOfSpeech": "pronome + classificador",
                "compoundLogicPt": "每 (cada) + 次 (vez).",
                characters: chars("每次", [
                    "měi",
                    "cì"
                  ], [
                    2,
                    1
                  ], [
                    "cada",
                    "vez"
                  ])
              },
              {
                "id": "s403-t2",
                "hanzi": "看到",
                "pinyin": "kàndào",
                "hskLevel": 1,
                "meaningPt": "via / olhava para",
                "partOfSpeech": "verbo + resultado",
                "compoundLogicPt": "看 (olhar) + 到 (alcançar com a vista).",
                characters: chars("看到", [
                    "kàn",
                    "dào"
                  ], [
                    1,
                    1
                  ], [
                    "olhar",
                    "alcançar"
                  ])
              },
              {
                "id": "s403-t3",
                "hanzi": "剑",
                "pinyin": "jiàn",
                "hskLevel": 2,
                "meaningPt": "a espada",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Espada.",
                characters: chars("剑", [
                    "jiàn"
                  ], [
                    2
                  ], [
                    "espada"
                  ])
              },
              {
                "id": "s403-t4",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s403-t5",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s403-t6",
                "hanzi": "心里",
                "pinyin": "xīnlǐ",
                "hskLevel": 1,
                "meaningPt": "no coração",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "心 (coração) + 里 (dentro).",
                characters: chars("心里", [
                    "xīn",
                    "lǐ"
                  ], [
                    1,
                    1
                  ], [
                    "coração",
                    "dentro"
                  ])
              },
              {
                "id": "s403-t7",
                "hanzi": "都",
                "pinyin": "dōu",
                "hskLevel": 1,
                "meaningPt": "sempre",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Fecha a estrutura 每次...都.",
                characters: chars("都", [
                    "dōu"
                  ], [
                    1
                  ], [
                    "sempre"
                  ])
              },
              {
                "id": "s403-t8",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Intensificador.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s403-t9",
                "hanzi": "害怕",
                "pinyin": "hàipà",
                "hskLevel": 2,
                "meaningPt": "sentia medo",
                "partOfSpeech": "verbo/adjetivo",
                "compoundLogicPt": "害 (recear) + 怕 (temer).",
                characters: chars("害怕", [
                    "hài",
                    "pà"
                  ], [
                    2,
                    2
                  ], [
                    "recear",
                    "temer"
                  ])
              },
              {
                "id": "s403-t10",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s404",
            "zhText": "他常常想：“我为什么没有勇气呢？”",
            "pinyinText": "Tā chángcháng xiǎng: “Wǒ wèishénme méiyǒu yǒngqì ne?”",
            "translationPt": "Ele frequentemente pensava: “Por que será que eu não tenho coragem?”",
            "literalPt": "Ele frequentemente pensava: “Eu por-quê não-tenho coragem [partícula reflexiva]?”",
            "grammarNotes": [
              {
                "pattern": "为什么 (wèishénme) ... 呢 (ne)?",
                "explanationPt": "A partícula 呢 no final de uma pergunta com 为什么 suaviza o tom, expressando uma dúvida íntima que o personagem faz a si mesmo.",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s404-t1",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Ele.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s404-t2",
                "hanzi": "常常",
                "pinyin": "chángcháng",
                "hskLevel": 1,
                "meaningPt": "frequentemente / sempre",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Repetição de 常 (constante) indicando hábito frequente.",
                characters: chars("常常", [
                    "cháng",
                    "cháng"
                  ], [
                    1,
                    1
                  ], [
                    "constante",
                    "constante"
                  ])
              },
              {
                "id": "s404-t3",
                "hanzi": "想",
                "pinyin": "xiǎng",
                "hskLevel": 1,
                "meaningPt": "pensava",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Pensar / refletir no coração (心).",
                characters: chars("想", [
                    "xiǎng"
                  ], [
                    1
                  ], [
                    "pensar"
                  ])
              },
              {
                "id": "s404-t4",
                "hanzi": "：",
                "isPunctuation": true
              },
              {
                "id": "s404-t5",
                "hanzi": "“",
                "isPunctuation": true
              },
              {
                "id": "s404-t6",
                "hanzi": "我",
                "pinyin": "wǒ",
                "hskLevel": 1,
                "meaningPt": "eu",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Eu.",
                characters: chars("我", [
                    "wǒ"
                  ], [
                    1
                  ], [
                    "eu"
                  ])
              },
              {
                "id": "s404-t7",
                "hanzi": "为什么",
                "pinyin": "wèishénme",
                "hskLevel": 1,
                "meaningPt": "por que",
                "partOfSpeech": "advérbio interrogativo",
                "compoundLogicPt": "为 (por) + 什么 (quê) → por qual razão.",
                characters: chars("为什么", [
                    "wèi",
                    "shén",
                    "me"
                  ], [
                    2,
                    1,
                    1
                  ], [
                    "por",
                    "quê",
                    "partícula"
                  ])
              },
              {
                "id": "s404-t8",
                "hanzi": "没有",
                "pinyin": "méiyǒu",
                "hskLevel": 1,
                "meaningPt": "não tenho",
                "partOfSpeech": "negação + verbo",
                "compoundLogicPt": "Negação obrigatória do verbo 有.",
                characters: chars("没有", [
                    "méi",
                    "yǒu"
                  ], [
                    1,
                    1
                  ], [
                    "não",
                    "ter"
                  ])
              },
              {
                "id": "s404-t9",
                "hanzi": "勇气",
                "pinyin": "yǒngqì",
                "hskLevel": 3,
                "meaningPt": "coragem",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "勇 (bravura) + 气 (sopro vital).",
                characters: chars("勇气", [
                    "yǒng",
                    "qì"
                  ], [
                    3,
                    1
                  ], [
                    "bravura",
                    "energia"
                  ])
              },
              {
                "id": "s404-t10",
                "hanzi": "呢",
                "pinyin": "ne",
                "hskLevel": 1,
                "meaningPt": "será? (partícula reflexiva)",
                "partOfSpeech": "partícula modal",
                "compoundLogicPt": "Dá tom de questionamento interior.",
                characters: chars("呢", [
                    "ne"
                  ], [
                    1
                  ], [
                    "partícula"
                  ])
              },
              {
                "id": "s404-t11",
                "hanzi": "？",
                "isPunctuation": true
              },
              {
                "id": "s404-t12",
                "hanzi": "”",
                "isPunctuation": true
              }
            ]
          }
        ]
      },
      {
        "id": "ch-2",
        "chapterNumber": 2,
        "titleZh": "第二章：茶馆里的老人",
        "titlePinyin": "Dì èr zhāng: Cháguǎn lǐ de lǎorén",
        "titlePt": "Capítulo 2: O Ancião na Casa de Chá",
        "summaryPt": "Em uma casa de chá da cidade, Li Yun ouve falar de um sábio mestre que vive no topo da distante Montanha Vazia e conhece o segredo da verdadeira coragem.",
        "estimatedMinutes": 2,
        "audioUrl": "/audio/stories/a-montanha-vazia-e-a-coragem/ch-2.mp3",
        "audioDurationMs": 0,
        "voiceName": "zh-CN-YunxiNeural",
        "hskDistribution": [],
        "keyVocabulary": [
          {
            "hanzi": "茶馆",
            "pinyin": "cháguǎn",
            "meaningPt": "casa de chá",
            "hskLevel": 1
          },
          {
            "hanzi": "老人",
            "pinyin": "lǎorén",
            "meaningPt": "ancião / idoso",
            "hskLevel": 1
          },
          {
            "hanzi": "空山",
            "pinyin": "kōng shān",
            "meaningPt": "Montanha Vazia",
            "hskLevel": 2
          },
          {
            "hanzi": "很远",
            "pinyin": "hěn yuǎn",
            "meaningPt": "muito longe",
            "hskLevel": 2
          },
          {
            "hanzi": "真正",
            "pinyin": "zhēnzhèng",
            "meaningPt": "verdadeiro / autêntico",
            "hskLevel": 2
          }
        ],
        "sentences": [
          {
            "id": "s405",
            "zhText": "一天上午，李云去了一家安静的茶馆。",
            "pinyinText": "Yì tiān shàngwǔ, Lǐ Yún qù le yì jiā ānjìng de cháguǎn.",
            "translationPt": "Certa manhã, Li Yun foi a uma tranquila casa de chá.",
            "literalPt": "Um dia manhã, Li Yun foi [concluído] uma [classificador] tranquila de casa-de-chá.",
            "grammarNotes": [
              {
                "pattern": "Classificador 家 (jiā) + Adjetivo + 的 + Substantivo",
                "explanationPt": "O classificador vem antes do adjetivo: 一家安静的茶馆 ('uma tranquila casa de chá').",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s405-t1",
                "hanzi": "一天",
                "pinyin": "yì tiān",
                "hskLevel": 1,
                "meaningPt": "certo dia / um dia",
                "partOfSpeech": "expressão de tempo",
                "compoundLogicPt": "一 (um) + 天 (dia).",
                characters: chars("一天", [
                    "yī",
                    "tiān"
                  ], [
                    1,
                    1
                  ], [
                    "um",
                    "dia"
                  ])
              },
              {
                "id": "s405-t2",
                "hanzi": "上午",
                "pinyin": "shàngwǔ",
                "hskLevel": 1,
                "meaningPt": "de manhã",
                "partOfSpeech": "substantivo de tempo",
                "compoundLogicPt": "上 (antes) + 午 (meio-dia).",
                characters: chars("上午", [
                    "shàng",
                    "wǔ"
                  ], [
                    1,
                    1
                  ], [
                    "antes",
                    "meio-dia"
                  ])
              },
              {
                "id": "s405-t3",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s405-t4",
                "hanzi": "李云",
                "pinyin": "Lǐ Yún",
                "hskLevel": 1,
                "meaningPt": "Li Yun",
                "partOfSpeech": "nome próprio",
                "compoundLogicPt": "Li Yun.",
                characters: chars("李云", [
                    "Lǐ",
                    "Yún"
                  ], [
                    1,
                    1
                  ], [
                    "Li",
                    "nuvem"
                  ])
              },
              {
                "id": "s405-t5",
                "hanzi": "去了",
                "pinyin": "qù le",
                "hskLevel": 1,
                "meaningPt": "foi a",
                "partOfSpeech": "verbo + partícula",
                "compoundLogicPt": "去 (ir) + 了 (ação concluída).",
                characters: chars("去了", [
                    "qù",
                    "le"
                  ], [
                    1,
                    1
                  ], [
                    "ir",
                    "concluído"
                  ])
              },
              {
                "id": "s405-t6",
                "hanzi": "一家",
                "pinyin": "yì jiā",
                "hskLevel": 1,
                "meaningPt": "uma (casa comercial)",
                "partOfSpeech": "numeral + classificador",
                "compoundLogicPt": "Classificador 家 para estabelecimentos.",
                characters: chars("一家", [
                    "yī",
                    "jiā"
                  ], [
                    1,
                    1
                  ], [
                    "um",
                    "estabelecimento"
                  ])
              },
              {
                "id": "s405-t7",
                "hanzi": "安静",
                "pinyin": "ānjìng",
                "hskLevel": 2,
                "meaningPt": "tranquila / silenciosa",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "安 (paz) + 静 (silêncio).",
                characters: chars("安静", [
                    "ān",
                    "jìng"
                  ], [
                    2,
                    2
                  ], [
                    "paz",
                    "silêncio"
                  ])
              },
              {
                "id": "s405-t8",
                "hanzi": "的",
                "pinyin": "de",
                "hskLevel": 1,
                "meaningPt": "de (qualificador)",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Conecta 安静 a 茶馆.",
                characters: chars("的", [
                    "de"
                  ], [
                    1
                  ], [
                    "de"
                  ])
              },
              {
                "id": "s405-t9",
                "hanzi": "茶馆",
                "pinyin": "cháguǎn",
                "hskLevel": 1,
                "meaningPt": "casa de chá",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "茶 (chá) + 馆 (pavilhão).",
                characters: chars("茶馆", [
                    "chá",
                    "guǎn"
                  ], [
                    1,
                    1
                  ], [
                    "chá",
                    "estabelecimento"
                  ])
              },
              {
                "id": "s405-t10",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s406",
            "zhText": "茶馆里坐着一位老人，正在喝热茶。",
            "pinyinText": "Cháguǎn lǐ zuòzhe yí wèi lǎorén, zhèngzài hē rè chá.",
            "translationPt": "Dentro da casa de chá estava sentado um ancião, que tomava chá quente naquele momento.",
            "literalPt": "Casa-de-chá dentro sentava-permanecendo um [respeitoso] velho-pessoa, justamente-estava bebendo quente chá.",
            "grammarNotes": [
              {
                "pattern": "Local + Verbo + 着 (zhe) + Pessoa",
                "explanationPt": "Frase existencial clássica do Mandarim para descrever cenas: 茶馆里坐着一位老人 ('na casa de chá estava sentado um ancião').",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s406-t1",
                "hanzi": "茶馆",
                "pinyin": "cháguǎn",
                "hskLevel": 1,
                "meaningPt": "casa de chá",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "茶 + 馆.",
                characters: chars("茶馆", [
                    "chá",
                    "guǎn"
                  ], [
                    1,
                    1
                  ], [
                    "chá",
                    "pavilhão"
                  ])
              },
              {
                "id": "s406-t2",
                "hanzi": "里",
                "pinyin": "lǐ",
                "hskLevel": 1,
                "meaningPt": "dentro",
                "partOfSpeech": "posposição",
                "compoundLogicPt": "Interior do local.",
                characters: chars("里", [
                    "lǐ"
                  ], [
                    1
                  ], [
                    "dentro"
                  ])
              },
              {
                "id": "s406-t3",
                "hanzi": "坐着",
                "pinyin": "zuòzhe",
                "hskLevel": 2,
                "meaningPt": "estava sentado",
                "partOfSpeech": "verbo + partícula durativa",
                "compoundLogicPt": "坐 (sentar) + 着 (zhe, mantendo a postura sentada).",
                characters: chars("坐着", [
                    "zuò",
                    "zhe"
                  ], [
                    1,
                    2
                  ], [
                    "sentar",
                    "estado contínuo"
                  ])
              },
              {
                "id": "s406-t4",
                "hanzi": "一位",
                "pinyin": "yí wèi",
                "hskLevel": 1,
                "meaningPt": "um (respeitoso)",
                "partOfSpeech": "numeral + classificador",
                "compoundLogicPt": "Classificador respeitoso 位.",
                characters: chars("一位", [
                    "yī",
                    "wèi"
                  ], [
                    1,
                    1
                  ], [
                    "um",
                    "classificador"
                  ])
              },
              {
                "id": "s406-t5",
                "hanzi": "老人",
                "pinyin": "lǎorén",
                "hskLevel": 1,
                "meaningPt": "ancião / idoso",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "老 (velho) + 人 (pessoa).",
                characters: chars("老人", [
                    "lǎo",
                    "rén"
                  ], [
                    1,
                    1
                  ], [
                    "idoso",
                    "pessoa"
                  ])
              },
              {
                "id": "s406-t6",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s406-t7",
                "hanzi": "正在",
                "pinyin": "zhèngzài",
                "hskLevel": 2,
                "meaningPt": "estava justamente",
                "partOfSpeech": "advérbio de aspecto contínuo",
                "compoundLogicPt": "正 (exatamente) + 在 (em curso).",
                characters: chars("正在", [
                    "zhèng",
                    "zài"
                  ], [
                    1,
                    1
                  ], [
                    "justamente",
                    "em curso"
                  ])
              },
              {
                "id": "s406-t8",
                "hanzi": "喝",
                "pinyin": "hē",
                "hskLevel": 1,
                "meaningPt": "bebendo",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Beber.",
                characters: chars("喝", [
                    "hē"
                  ], [
                    1
                  ], [
                    "beber"
                  ])
              },
              {
                "id": "s406-t9",
                "hanzi": "热茶",
                "pinyin": "rè chá",
                "hskLevel": 1,
                "meaningPt": "chá quente",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "热 (quente) + 茶 (chá).",
                characters: chars("热茶", [
                    "rè",
                    "chá"
                  ], [
                    1,
                    1
                  ], [
                    "quente",
                    "chá"
                  ])
              },
              {
                "id": "s406-t10",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s407",
            "zhText": "老人对他说：“在很远的空山上，住着一位老老师。”",
            "pinyinText": "Lǎorén duì tā shuō: “Zài hěn yuǎn de Kōng Shān shàng, zhùzhe yí wèi lǎo lǎoshī.”",
            "translationPt": "O ancião disse para ele: “No alto da distante Montanha Vazia, mora um velho mestre.”",
            "literalPt": "Ancião para ele disse: “Em muito distante de Vazia Montanha em-cima, mora-permanecendo um velho mestre.”",
            "grammarNotes": [
              {
                "pattern": "A 对 (duì) B 说 (shuō) = 'A disse para B'",
                "explanationPt": "Em Mandarim, quem recebe a fala é introduzido pela preposição 对 antes do verbo 说.",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s407-t1",
                "hanzi": "老人",
                "pinyin": "lǎorén",
                "hskLevel": 1,
                "meaningPt": "o ancião",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "老 + 人.",
                characters: chars("老人", [
                    "lǎo",
                    "rén"
                  ], [
                    1,
                    1
                  ], [
                    "velho",
                    "pessoa"
                  ])
              },
              {
                "id": "s407-t2",
                "hanzi": "对",
                "pinyin": "duì",
                "hskLevel": 1,
                "meaningPt": "para",
                "partOfSpeech": "preposição",
                "compoundLogicPt": "Indica o destinatário da fala.",
                characters: chars("对", [
                    "duì"
                  ], [
                    1
                  ], [
                    "para"
                  ])
              },
              {
                "id": "s407-t3",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s407-t4",
                "hanzi": "说",
                "pinyin": "shuō",
                "hskLevel": 1,
                "meaningPt": "disse",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Dizer.",
                characters: chars("说", [
                    "shuō"
                  ], [
                    1
                  ], [
                    "dizer"
                  ])
              },
              {
                "id": "s407-t5",
                "hanzi": "：",
                "isPunctuation": true
              },
              {
                "id": "s407-t6",
                "hanzi": "“",
                "isPunctuation": true
              },
              {
                "id": "s407-t7",
                "hanzi": "在",
                "pinyin": "zài",
                "hskLevel": 1,
                "meaningPt": "em / no",
                "partOfSpeech": "preposição",
                "compoundLogicPt": "Locativo.",
                characters: chars("在", [
                    "zài"
                  ], [
                    1
                  ], [
                    "em"
                  ])
              },
              {
                "id": "s407-t8",
                "hanzi": "很远",
                "pinyin": "hěn yuǎn",
                "hskLevel": 2,
                "meaningPt": "muito distante",
                "partOfSpeech": "advérbio + adjetivo",
                "compoundLogicPt": "很 (muito) + 远 (longe/distante).",
                characters: chars("很远", [
                    "hěn",
                    "yuǎn"
                  ], [
                    1,
                    2
                  ], [
                    "muito",
                    "longe"
                  ])
              },
              {
                "id": "s407-t9",
                "hanzi": "的",
                "pinyin": "de",
                "hskLevel": 1,
                "meaningPt": "de",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Qualifica 空山.",
                characters: chars("的", [
                    "de"
                  ], [
                    1
                  ], [
                    "de"
                  ])
              },
              {
                "id": "s407-t10",
                "hanzi": "空山",
                "pinyin": "Kōng Shān",
                "hskLevel": 2,
                "meaningPt": "Montanha Vazia",
                "partOfSpeech": "nome próprio / local",
                "compoundLogicPt": "空 (vazia/silenciosa) + 山 (montanha).",
                characters: chars("空山", [
                    "kōng",
                    "shān"
                  ], [
                    2,
                    1
                  ], [
                    "vazio",
                    "montanha"
                  ])
              },
              {
                "id": "s407-t11",
                "hanzi": "上",
                "pinyin": "shàng",
                "hskLevel": 1,
                "meaningPt": "no alto de",
                "partOfSpeech": "posposição",
                "compoundLogicPt": "Sobre a montanha.",
                characters: chars("上", [
                    "shàng"
                  ], [
                    1
                  ], [
                    "em cima"
                  ])
              },
              {
                "id": "s407-t12",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s407-t13",
                "hanzi": "住着",
                "pinyin": "zhùzhe",
                "hskLevel": 2,
                "meaningPt": "mora / vive",
                "partOfSpeech": "verbo + partícula",
                "compoundLogicPt": "住 (morar) + 着 (estado contínuo).",
                characters: chars("住着", [
                    "zhù",
                    "zhe"
                  ], [
                    1,
                    2
                  ], [
                    "morar",
                    "contínuo"
                  ])
              },
              {
                "id": "s407-t14",
                "hanzi": "一位",
                "pinyin": "yí wèi",
                "hskLevel": 1,
                "meaningPt": "um",
                "partOfSpeech": "numeral + classificador",
                "compoundLogicPt": "Classificador respeitoso.",
                characters: chars("一位", [
                    "yī",
                    "wèi"
                  ], [
                    1,
                    1
                  ], [
                    "um",
                    "classificador"
                  ])
              },
              {
                "id": "s407-t15",
                "hanzi": "老",
                "pinyin": "lǎo",
                "hskLevel": 1,
                "meaningPt": "velho / sábio",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "Idoso.",
                characters: chars("老", [
                    "lǎo"
                  ], [
                    1
                  ], [
                    "velho"
                  ])
              },
              {
                "id": "s407-t16",
                "hanzi": "老师",
                "pinyin": "lǎoshī",
                "hskLevel": 1,
                "meaningPt": "mestre",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "老 + 师.",
                characters: chars("老师", [
                    "lǎo",
                    "shī"
                  ], [
                    1,
                    1
                  ], [
                    "experiente",
                    "mestre"
                  ])
              },
              {
                "id": "s407-t17",
                "hanzi": "。",
                "isPunctuation": true
              },
              {
                "id": "s407-t18",
                "hanzi": "”",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s408",
            "zhText": "“那位老师知道什么是真正的勇气。”",
            "pinyinText": "“Nà wèi lǎoshī zhīdào shénme shì zhēnzhèng de yǒngqì.”",
            "translationPt": "“Aquele mestre sabe o que é a verdadeira coragem.”",
            "literalPt": "“Aquele [respeitoso] mestre sabe o-quê é verdadeira de coragem.”",
            "grammarNotes": [
              {
                "pattern": "知道 (zhīdào) + Oração Interrogativa Indireta",
                "explanationPt": "A ordem da pergunta indireta não muda: 知道什么是真正的勇气 ('sabe o que é a verdadeira coragem').",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s408-t1",
                "hanzi": "“",
                "isPunctuation": true
              },
              {
                "id": "s408-t2",
                "hanzi": "那位",
                "pinyin": "nà wèi",
                "hskLevel": 1,
                "meaningPt": "aquele",
                "partOfSpeech": "demonstrativo + classificador",
                "compoundLogicPt": "那 (aquele) + 位.",
                characters: chars("那位", [
                    "nà",
                    "wèi"
                  ], [
                    1,
                    1
                  ], [
                    "aquele",
                    "classificador"
                  ])
              },
              {
                "id": "s408-t3",
                "hanzi": "老师",
                "pinyin": "lǎoshī",
                "hskLevel": 1,
                "meaningPt": "mestre",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Mestre.",
                characters: chars("老师", [
                    "lǎo",
                    "shī"
                  ], [
                    1,
                    1
                  ], [
                    "sábio",
                    "mestre"
                  ])
              },
              {
                "id": "s408-t4",
                "hanzi": "知道",
                "pinyin": "zhīdào",
                "hskLevel": 1,
                "meaningPt": "sabe / conhece",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "知 (conhecer: flecha 矢 + boca 口) + 道 (o Caminho/Tao) → conhecer a verdade.",
                characters: chars("知道", [
                    "zhī",
                    "dào"
                  ], [
                    1,
                    1
                  ], [
                    "saber",
                    "caminho/verdade"
                  ])
              },
              {
                "id": "s408-t5",
                "hanzi": "什么",
                "pinyin": "shénme",
                "hskLevel": 1,
                "meaningPt": "o que",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "O quê.",
                characters: chars("什么", [
                    "shén",
                    "me"
                  ], [
                    1,
                    1
                  ], [
                    "quê",
                    "partícula"
                  ])
              },
              {
                "id": "s408-t6",
                "hanzi": "是",
                "pinyin": "shì",
                "hskLevel": 1,
                "meaningPt": "é",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Ser.",
                characters: chars("是", [
                    "shì"
                  ], [
                    1
                  ], [
                    "ser"
                  ])
              },
              {
                "id": "s408-t7",
                "hanzi": "真正",
                "pinyin": "zhēnzhèng",
                "hskLevel": 2,
                "meaningPt": "verdadeira / autêntica",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "真 (real/verdadeiro) + 正 (reto/autêntico).",
                characters: chars("真正", [
                    "zhēn",
                    "zhèng"
                  ], [
                    1,
                    1
                  ], [
                    "verdadeiro",
                    "correto"
                  ])
              },
              {
                "id": "s408-t8",
                "hanzi": "的",
                "pinyin": "de",
                "hskLevel": 1,
                "meaningPt": "de",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Liga 真正 a 勇气.",
                characters: chars("的", [
                    "de"
                  ], [
                    1
                  ], [
                    "de"
                  ])
              },
              {
                "id": "s408-t9",
                "hanzi": "勇气",
                "pinyin": "yǒngqì",
                "hskLevel": 3,
                "meaningPt": "coragem",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "勇 (bravura) + 气 (espírito).",
                characters: chars("勇气", [
                    "yǒng",
                    "qì"
                  ], [
                    3,
                    1
                  ], [
                    "bravura",
                    "espírito"
                  ])
              },
              {
                "id": "s408-t10",
                "hanzi": "。",
                "isPunctuation": true
              },
              {
                "id": "s408-t11",
                "hanzi": "”",
                "isPunctuation": true
              }
            ]
          }
        ]
      },
      {
        "id": "ch-3",
        "chapterNumber": 3,
        "titleZh": "第三章：走出城门",
        "titlePinyin": "Dì sān zhāng: Zǒuchū chéngmén",
        "titlePt": "Capítulo 3: Saindo pelos Portões da Cidade",
        "summaryPt": "Decidido a encontrar a virtude que julga não possuir, Li Yun prepara água, duas obras antigas e sua espada, deixando os portões da cidade ao amanhecer rumo ao desconhecido.",
        "estimatedMinutes": 2,
        "audioUrl": "/audio/stories/a-montanha-vazia-e-a-coragem/ch-3.mp3",
        "audioDurationMs": 0,
        "voiceName": "zh-CN-YunxiNeural",
        "hskDistribution": [],
        "keyVocabulary": [
          {
            "hanzi": "城门",
            "pinyin": "chéngmén",
            "meaningPt": "portão da cidade",
            "hskLevel": 2
          },
          {
            "hanzi": "走出",
            "pinyin": "zǒuchū",
            "meaningPt": "sair caminhando",
            "hskLevel": 1
          },
          {
            "hanzi": "两本书",
            "pinyin": "liǎng běn shū",
            "meaningPt": "dois livros",
            "hskLevel": 1
          },
          {
            "hanzi": "高山",
            "pinyin": "gāoshān",
            "meaningPt": "montanha alta",
            "hskLevel": 1
          },
          {
            "hanzi": "找到",
            "pinyin": "zhǎodào",
            "meaningPt": "encontrar",
            "hskLevel": 1
          }
        ],
        "sentences": [
          {
            "id": "s409",
            "zhText": "第二天早上，李云很早就起床了。",
            "pinyinText": "Dì èr tiān zǎoshang, Lǐ Yún hěn zǎo jiù qǐchuáng le.",
            "translationPt": "Na manhã do dia seguinte, Li Yun levantou-se da cama bem cedo.",
            "literalPt": "Segundo dia manhã, Li Yun muito cedo já levantou-cama [concluído].",
            "grammarNotes": [
              {
                "pattern": "很早就...了 (hěn zǎo jiù ... le) = 'bem cedo já...'",
                "explanationPt": "O advérbio 就 (jiù) indica que a ação aconteceu mais cedo ou mais rápido do que o habitual.",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s409-t1",
                "hanzi": "第二天",
                "pinyin": "dì èr tiān",
                "hskLevel": 1,
                "meaningPt": "no dia seguinte",
                "partOfSpeech": "expressão de tempo",
                "compoundLogicPt": "第 (ordinal) + 二 (dois) + 天 (dia) → o segundo dia / dia seguinte.",
                characters: chars("第二天", [
                    "dì",
                    "èr",
                    "tiān"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "ordinal",
                    "dois",
                    "dia"
                  ])
              },
              {
                "id": "s409-t2",
                "hanzi": "早上",
                "pinyin": "zǎoshang",
                "hskLevel": 1,
                "meaningPt": "de manhã",
                "partOfSpeech": "substantivo de tempo",
                "compoundLogicPt": "早 + 上.",
                characters: chars("早上", [
                    "zǎo",
                    "shang"
                  ], [
                    1,
                    1
                  ], [
                    "cedo",
                    "manhã"
                  ])
              },
              {
                "id": "s409-t3",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s409-t4",
                "hanzi": "李云",
                "pinyin": "Lǐ Yún",
                "hskLevel": 1,
                "meaningPt": "Li Yun",
                "partOfSpeech": "nome próprio",
                "compoundLogicPt": "Li Yun.",
                characters: chars("李云", [
                    "Lǐ",
                    "Yún"
                  ], [
                    1,
                    1
                  ], [
                    "Li",
                    "nuvem"
                  ])
              },
              {
                "id": "s409-t5",
                "hanzi": "很早",
                "pinyin": "hěn zǎo",
                "hskLevel": 1,
                "meaningPt": "muito cedo",
                "partOfSpeech": "advérbio + adjetivo",
                "compoundLogicPt": "很 (muito) + 早 (cedo).",
                characters: chars("很早", [
                    "hěn",
                    "zǎo"
                  ], [
                    1,
                    1
                  ], [
                    "muito",
                    "cedo"
                  ])
              },
              {
                "id": "s409-t6",
                "hanzi": "就",
                "pinyin": "jiù",
                "hskLevel": 2,
                "meaningPt": "já / logo",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Indica prontidão cedo pela manhã.",
                characters: chars("就", [
                    "jiù"
                  ], [
                    2
                  ], [
                    "logo/já"
                  ])
              },
              {
                "id": "s409-t7",
                "hanzi": "起床",
                "pinyin": "qǐchuáng",
                "hskLevel": 1,
                "meaningPt": "levantou da cama",
                "partOfSpeech": "verbo separável (VO)",
                "compoundLogicPt": "起 (levantar) + 床 (cama).",
                characters: chars("起床", [
                    "qǐ",
                    "chuáng"
                  ], [
                    1,
                    1
                  ], [
                    "levantar",
                    "cama"
                  ])
              },
              {
                "id": "s409-t8",
                "hanzi": "了",
                "pinyin": "le",
                "hskLevel": 1,
                "meaningPt": "ação concluída",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Conclui a ação.",
                characters: chars("了", [
                    "le"
                  ], [
                    1
                  ], [
                    "concluído"
                  ])
              },
              {
                "id": "s409-t9",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s410",
            "zhText": "他带了水、两本书和那把剑。",
            "pinyinText": "Tā dài le shuǐ, liǎng běn shū hé nà bǎ jiàn.",
            "translationPt": "Ele levou água, dois livros e aquela espada.",
            "literalPt": "Ele levou [concluído] água, dois [classificador] livros e aquela [classificador] espada.",
            "grammarNotes": [
              {
                "pattern": "Regra de 两 (liǎng) + Classificador 本 (běn)",
                "explanationPt": "Para contar dois livros, usa-se obrigatoriamente 两本书 (liǎng běn shū), nunca *二本书.",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s410-t1",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s410-t2",
                "hanzi": "带了",
                "pinyin": "dài le",
                "hskLevel": 1,
                "meaningPt": "levou / trouxe consigo",
                "partOfSpeech": "verbo + partícula",
                "compoundLogicPt": "带 (levar junto) + 了.",
                characters: chars("带了", [
                    "dài",
                    "le"
                  ], [
                    1,
                    1
                  ], [
                    "levar",
                    "concluído"
                  ])
              },
              {
                "id": "s410-t3",
                "hanzi": "水",
                "pinyin": "shuǐ",
                "hskLevel": 1,
                "meaningPt": "água",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Pictograma de água corrente.",
                characters: chars("水", [
                    "shuǐ"
                  ], [
                    1
                  ], [
                    "água"
                  ])
              },
              {
                "id": "s410-t4",
                "hanzi": "、",
                "isPunctuation": true
              },
              {
                "id": "s410-t5",
                "hanzi": "两本",
                "pinyin": "liǎng běn",
                "hskLevel": 1,
                "meaningPt": "dois (livros)",
                "partOfSpeech": "numeral + classificador",
                "compoundLogicPt": "两 (dois) + 本 (classificador para livros).",
                characters: chars("两本", [
                    "liǎng",
                    "běn"
                  ], [
                    1,
                    1
                  ], [
                    "dois",
                    "classificador de livros"
                  ])
              },
              {
                "id": "s410-t6",
                "hanzi": "书",
                "pinyin": "shū",
                "hskLevel": 1,
                "meaningPt": "livros",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Livros.",
                characters: chars("书", [
                    "shū"
                  ], [
                    1
                  ], [
                    "livro"
                  ])
              },
              {
                "id": "s410-t7",
                "hanzi": "和",
                "pinyin": "hé",
                "hskLevel": 1,
                "meaningPt": "e",
                "partOfSpeech": "conjunção",
                "compoundLogicPt": "Une os itens.",
                characters: chars("和", [
                    "hé"
                  ], [
                    1
                  ], [
                    "e"
                  ])
              },
              {
                "id": "s410-t8",
                "hanzi": "那把",
                "pinyin": "nà bǎ",
                "hskLevel": 2,
                "meaningPt": "aquela (espada)",
                "partOfSpeech": "demonstrativo + classificador",
                "compoundLogicPt": "那 (aquela) + 把 (classificador de empunhadura).",
                characters: chars("那把", [
                    "nà",
                    "bǎ"
                  ], [
                    1,
                    2
                  ], [
                    "aquela",
                    "classificador"
                  ])
              },
              {
                "id": "s410-t9",
                "hanzi": "剑",
                "pinyin": "jiàn",
                "hskLevel": 3,
                "meaningPt": "espada",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "A espada do guerreiro.",
                characters: chars("剑", [
                    "jiàn"
                  ], [
                    3
                  ], [
                    "espada"
                  ])
              },
              {
                "id": "s410-t10",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s411",
            "zhText": "走出城门的时候，他看了看后面的家。",
            "pinyinText": "Zǒuchū chéngmén de shíhou, tā kàn le kàn hòumiàn de jiā.",
            "translationPt": "Quando saiu caminhando pelo portão da cidade, ele deu uma olhada para sua casa lá atrás.",
            "literalPt": "Caminhar-saindo cidade-portão de momento, ele olhou-olhou atrás de casa.",
            "grammarNotes": [
              {
                "pattern": "...的时候 (... de shíhou) = 'Quando... / No momento em que...'",
                "explanationPt": "Colocado ao final da oração temporal, transforma a ação 走出城门 em 'quando saiu pelo portão da cidade'.",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s411-t1",
                "hanzi": "走出",
                "pinyin": "zǒuchū",
                "hskLevel": 1,
                "meaningPt": "saiu caminhando",
                "partOfSpeech": "verbo + direção",
                "compoundLogicPt": "走 (andar) + 出 (sair).",
                characters: chars("走出", [
                    "zǒu",
                    "chū"
                  ], [
                    1,
                    1
                  ], [
                    "andar",
                    "sair"
                  ])
              },
              {
                "id": "s411-t2",
                "hanzi": "城门",
                "pinyin": "chéngmén",
                "hskLevel": 2,
                "meaningPt": "o portão da cidade",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "城 (muralha da cidade) + 门 (portão).",
                characters: chars("城门", [
                    "chéng",
                    "mén"
                  ], [
                    2,
                    1
                  ], [
                    "muralha/cidade",
                    "portão"
                  ])
              },
              {
                "id": "s411-t3",
                "hanzi": "的时候",
                "pinyin": "de shíhou",
                "hskLevel": 1,
                "meaningPt": "quando / no momento em que",
                "partOfSpeech": "locução temporal",
                "compoundLogicPt": "的 + 时候 (momento/tempo).",
                characters: chars("的时候", [
                    "de",
                    "shí",
                    "hou"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "de",
                    "tempo",
                    "momento"
                  ])
              },
              {
                "id": "s411-t4",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s411-t5",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s411-t6",
                "hanzi": "看了看",
                "pinyin": "kàn le kàn",
                "hskLevel": 1,
                "meaningPt": "deu uma olhada",
                "partOfSpeech": "verbo reduplicado",
                "compoundLogicPt": "Reduplicação do verbo 看 com 了 no meio indicando uma olhada breve.",
                characters: chars("看了看", [
                    "kàn",
                    "le",
                    "kàn"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "olhar",
                    "breve",
                    "olhar"
                  ])
              },
              {
                "id": "s411-t7",
                "hanzi": "后面",
                "pinyin": "hòumiàn",
                "hskLevel": 1,
                "meaningPt": "atrás",
                "partOfSpeech": "substantivo de localização",
                "compoundLogicPt": "后 (atrás) + 面 (lado).",
                characters: chars("后面", [
                    "hòu",
                    "miàn"
                  ], [
                    1,
                    1
                  ], [
                    "atrás",
                    "lado"
                  ])
              },
              {
                "id": "s411-t8",
                "hanzi": "的",
                "pinyin": "de",
                "hskLevel": 1,
                "meaningPt": "de",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Conecta 后面 a 家.",
                characters: chars("的", [
                    "de"
                  ], [
                    1
                  ], [
                    "de"
                  ])
              },
              {
                "id": "s411-t9",
                "hanzi": "家",
                "pinyin": "jiā",
                "hskLevel": 1,
                "meaningPt": "casa / lar",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Seu lar na cidade.",
                characters: chars("家", [
                    "jiā"
                  ], [
                    1
                  ], [
                    "casa"
                  ])
              },
              {
                "id": "s411-t10",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s412",
            "zhText": "他心里有一点儿怕，但还是往高山走去。",
            "pinyinText": "Tā xīnlǐ yǒu yìdiǎnr pà, dàn háishì wǎng gāoshān zǒu qù.",
            "translationPt": "Ele estava com um pouco de medo no coração, mas ainda assim seguiu caminhando em direção à montanha alta.",
            "literalPt": "Ele coração-dentro tinha um-pouco medo, mas ainda-assim rumo alta-montanha caminhou indo.",
            "grammarNotes": [
              {
                "pattern": "有一点儿 (yǒu yìdiǎnr) + Adjetivo/Verbo Psicológico",
                "explanationPt": "Usado antes de sentimentos ou qualidades para expressar 'um pouco de...': 有一点儿怕 ('um pouco de medo').",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s412-t1",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Ele.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s412-t2",
                "hanzi": "心里",
                "pinyin": "xīnlǐ",
                "hskLevel": 1,
                "meaningPt": "no coração",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "心 + 里.",
                characters: chars("心里", [
                    "xīn",
                    "lǐ"
                  ], [
                    1,
                    1
                  ], [
                    "coração",
                    "dentro"
                  ])
              },
              {
                "id": "s412-t3",
                "hanzi": "有一点儿",
                "pinyin": "yǒu yìdiǎnr",
                "hskLevel": 1,
                "meaningPt": "um pouco",
                "partOfSpeech": "locução adverbial",
                "compoundLogicPt": "有 (ter) + 一点儿 (um pouquinho).",
                characters: chars("有一点儿", [
                    "yǒu",
                    "yī",
                    "diǎn",
                    "r"
                  ], [
                    1,
                    1,
                    1,
                    1
                  ], [
                    "ter",
                    "um",
                    "ponto",
                    "sufixo"
                  ])
              },
              {
                "id": "s412-t4",
                "hanzi": "怕",
                "pinyin": "pà",
                "hskLevel": 2,
                "meaningPt": "medo / receoso",
                "partOfSpeech": "verbo/adjetivo",
                "compoundLogicPt": "Temer.",
                characters: chars("怕", [
                    "pà"
                  ], [
                    2
                  ], [
                    "temer"
                  ])
              },
              {
                "id": "s412-t5",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s412-t6",
                "hanzi": "但",
                "pinyin": "dàn",
                "hskLevel": 1,
                "meaningPt": "mas",
                "partOfSpeech": "conjunção",
                "compoundLogicPt": "Mas.",
                characters: chars("但", [
                    "dàn"
                  ], [
                    1
                  ], [
                    "mas"
                  ])
              },
              {
                "id": "s412-t7",
                "hanzi": "还是",
                "pinyin": "háishì",
                "hskLevel": 2,
                "meaningPt": "ainda assim / mesmo assim",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "还 (ainda) + 是 (é) → apesar de tudo, manteve a decisão.",
                characters: chars("还是", [
                    "hái",
                    "shì"
                  ], [
                    1,
                    1
                  ], [
                    "ainda",
                    "ser"
                  ])
              },
              {
                "id": "s412-t8",
                "hanzi": "往",
                "pinyin": "wǎng",
                "hskLevel": 2,
                "meaningPt": "em direção a",
                "partOfSpeech": "preposição",
                "compoundLogicPt": "Indica rumo do movimento.",
                characters: chars("往", [
                    "wǎng"
                  ], [
                    2
                  ], [
                    "rumo a"
                  ])
              },
              {
                "id": "s412-t9",
                "hanzi": "高山",
                "pinyin": "gāoshān",
                "hskLevel": 1,
                "meaningPt": "a montanha alta",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "高 (alta) + 山 (montanha).",
                characters: chars("高山", [
                    "gāo",
                    "shān"
                  ], [
                    1,
                    1
                  ], [
                    "alta",
                    "montanha"
                  ])
              },
              {
                "id": "s412-t10",
                "hanzi": "走去",
                "pinyin": "zǒu qù",
                "hskLevel": 1,
                "meaningPt": "foi caminhando",
                "partOfSpeech": "verbo + direção",
                "compoundLogicPt": "走 (caminhar) + 去 (ir).",
                characters: chars("走去", [
                    "zǒu",
                    "qù"
                  ], [
                    1,
                    1
                  ], [
                    "caminhar",
                    "ir"
                  ])
              },
              {
                "id": "s412-t11",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          }
        ]
      },
      {
        "id": "ch-4",
        "chapterNumber": 4,
        "titleZh": "第四章：大河上的木桥",
        "titlePinyin": "Dì sì zhāng: Dàhé shàng de mùqiáo",
        "titlePt": "Capítulo 4: A Ponte de Madeira sobre o Grande Rio",
        "summaryPt": "A primeira prova do caminho surge diante de um rio turbulento: uma velha ponte de madeira sacudida pelo vento forte. Com as mãos tremendo, Li Yun dá um passo após o outro.",
        "estimatedMinutes": 2,
        "audioUrl": "/audio/stories/a-montanha-vazia-e-a-coragem/ch-4.mp3",
        "audioDurationMs": 0,
        "voiceName": "zh-CN-YunxiNeural",
        "hskDistribution": [],
        "keyVocabulary": [
          {
            "hanzi": "一条大河",
            "pinyin": "yì tiáo dàhé",
            "meaningPt": "um grande rio",
            "hskLevel": 2
          },
          {
            "hanzi": "木桥",
            "pinyin": "mùqiáo",
            "meaningPt": "ponte de madeira",
            "hskLevel": 3
          },
          {
            "hanzi": "大风",
            "pinyin": "dàfēng",
            "meaningPt": "vento forte",
            "hskLevel": 1
          },
          {
            "hanzi": "慢慢",
            "pinyin": "mànmàn",
            "meaningPt": "devagar / passo a passo",
            "hskLevel": 2
          },
          {
            "hanzi": "走过去",
            "pinyin": "zǒu guòqù",
            "meaningPt": "atravessar caminhando",
            "hskLevel": 1
          }
        ],
        "sentences": [
          {
            "id": "s413",
            "zhText": "中午，李云来到了一条大河旁边。",
            "pinyinText": "Zhōngwǔ, Lǐ Yún láidào le yì tiáo dàhé pángbiān.",
            "translationPt": "Ao meio-dia, Li Yun chegou à margem de um grande rio.",
            "literalPt": "Meio-dia, Li Yun veio-chegando [concluído] um [classificador longo] grande-rio ao-lado.",
            "grammarNotes": [
              {
                "pattern": "Classificador 条 (tiáo) para rios e estradas",
                "explanationPt": "Elementos longos e sinuosos como rios (河) e ruas (街) usam sempre o classificador 条 (tiáo): 一条大河 (um grande rio).",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s413-t1",
                "hanzi": "中午",
                "pinyin": "zhōngwǔ",
                "hskLevel": 1,
                "meaningPt": "ao meio-dia",
                "partOfSpeech": "substantivo de tempo",
                "compoundLogicPt": "中 (meio) + 午 (meio-dia).",
                characters: chars("中午", [
                    "zhōng",
                    "wǔ"
                  ], [
                    1,
                    1
                  ], [
                    "meio",
                    "meio-dia"
                  ])
              },
              {
                "id": "s413-t2",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s413-t3",
                "hanzi": "李云",
                "pinyin": "Lǐ Yún",
                "hskLevel": 1,
                "meaningPt": "Li Yun",
                "partOfSpeech": "nome próprio",
                "compoundLogicPt": "Li Yun.",
                characters: chars("李云", [
                    "Lǐ",
                    "Yún"
                  ], [
                    1,
                    1
                  ], [
                    "Li",
                    "nuvem"
                  ])
              },
              {
                "id": "s413-t4",
                "hanzi": "来到了",
                "pinyin": "láidào le",
                "hskLevel": 1,
                "meaningPt": "chegou a",
                "partOfSpeech": "verbo + resultado + partícula",
                "compoundLogicPt": "来 (vir) + 到 (chegar) + 了.",
                characters: chars("来到了", [
                    "lái",
                    "dào",
                    "le"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "vir",
                    "chegar",
                    "concluído"
                  ])
              },
              {
                "id": "s413-t5",
                "hanzi": "一条",
                "pinyin": "yì tiáo",
                "hskLevel": 2,
                "meaningPt": "um (rio longo)",
                "partOfSpeech": "numeral + classificador",
                "compoundLogicPt": "一 + 条 (classificador para rios).",
                characters: chars("一条", [
                    "yī",
                    "tiáo"
                  ], [
                    1,
                    2
                  ], [
                    "um",
                    "classificador longo"
                  ])
              },
              {
                "id": "s413-t6",
                "hanzi": "大河",
                "pinyin": "dàhé",
                "hskLevel": 2,
                "meaningPt": "grande rio",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "大 (grande) + 河 (rio).",
                characters: chars("大河", [
                    "dà",
                    "hé"
                  ], [
                    1,
                    2
                  ], [
                    "grande",
                    "rio"
                  ])
              },
              {
                "id": "s413-t7",
                "hanzi": "旁边",
                "pinyin": "pángbiān",
                "hskLevel": 2,
                "meaningPt": "ao lado / à margem",
                "partOfSpeech": "localizador",
                "compoundLogicPt": "旁 (lado) + 边 (borda).",
                characters: chars("旁边", [
                    "páng",
                    "biān"
                  ], [
                    2,
                    1
                  ], [
                    "lado",
                    "borda"
                  ])
              },
              {
                "id": "s413-t8",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s414",
            "zhText": "河上有一座小小的木桥，河水很快，风也很大。",
            "pinyinText": "Hé shàng yǒu yí zuò xiǎoxiǎo de mùqiáo, héshuǐ hěn kuài, fēng yě hěn dà.",
            "translationPt": "Sobre o rio havia uma pequenina ponte de madeira; a correnteza do rio era muito rápida e o vento também estava muito forte.",
            "literalPt": "Rio sobre havia uma [estrutura] pequena-pequena de madeira-ponte, rio-água muito rápida, vento também muito grande.",
            "grammarNotes": [
              {
                "pattern": "Classificador 座 (zuò) para pontes e montanhas",
                "explanationPt": "Pontes, montanhas e grandes edifícios usam o classificador 座 (zuò): 一座木桥 (uma ponte de madeira).",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s414-t1",
                "hanzi": "河上",
                "pinyin": "hé shàng",
                "hskLevel": 1,
                "meaningPt": "sobre o rio",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "河 (rio) + 上 (sobre).",
                characters: chars("河上", [
                    "hé",
                    "shàng"
                  ], [
                    2,
                    1
                  ], [
                    "rio",
                    "sobre"
                  ])
              },
              {
                "id": "s414-t2",
                "hanzi": "有",
                "pinyin": "yǒu",
                "hskLevel": 1,
                "meaningPt": "havia",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Haver.",
                characters: chars("有", [
                    "yǒu"
                  ], [
                    1
                  ], [
                    "haver"
                  ])
              },
              {
                "id": "s414-t3",
                "hanzi": "一座",
                "pinyin": "yí zuò",
                "hskLevel": 2,
                "meaningPt": "uma (ponte)",
                "partOfSpeech": "numeral + classificador",
                "compoundLogicPt": "一 + 座 (classificador para pontes e montanhas).",
                characters: chars("一座", [
                    "yī",
                    "zuò"
                  ], [
                    1,
                    2
                  ], [
                    "uma",
                    "classificador"
                  ])
              },
              {
                "id": "s414-t4",
                "hanzi": "小小的",
                "pinyin": "xiǎoxiǎo de",
                "hskLevel": 1,
                "meaningPt": "pequenina / estreita",
                "partOfSpeech": "adjetivo reduplicado",
                "compoundLogicPt": "Reduplicação de 小 (pequeno) + 的 para dar expressividade.",
                characters: chars("小小的", [
                    "xiǎo",
                    "xiǎo",
                    "de"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "pequena",
                    "pequena",
                    "de"
                  ])
              },
              {
                "id": "s414-t5",
                "hanzi": "木桥",
                "pinyin": "mùqiáo",
                "hskLevel": 3,
                "meaningPt": "ponte de madeira",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "木 (madeira) + 桥 (ponte).",
                characters: chars("木桥", [
                    "mù",
                    "qiáo"
                  ], [
                    1,
                    3
                  ], [
                    "madeira",
                    "ponte"
                  ])
              },
              {
                "id": "s414-t6",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s414-t7",
                "hanzi": "河水",
                "pinyin": "héshuǐ",
                "hskLevel": 1,
                "meaningPt": "a água do rio / correnteza",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "河 (rio) + 水 (água).",
                characters: chars("河水", [
                    "hé",
                    "shuǐ"
                  ], [
                    2,
                    1
                  ], [
                    "rio",
                    "água"
                  ])
              },
              {
                "id": "s414-t8",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Ligador.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s414-t9",
                "hanzi": "快",
                "pinyin": "kuài",
                "hskLevel": 1,
                "meaningPt": "rápida / veloz",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "Rápido.",
                characters: chars("快", [
                    "kuài"
                  ], [
                    1
                  ], [
                    "rápida"
                  ])
              },
              {
                "id": "s414-t10",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s414-t11",
                "hanzi": "风",
                "pinyin": "fēng",
                "hskLevel": 1,
                "meaningPt": "o vento",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Vento.",
                characters: chars("风", [
                    "fēng"
                  ], [
                    1
                  ], [
                    "vento"
                  ])
              },
              {
                "id": "s414-t12",
                "hanzi": "也",
                "pinyin": "yě",
                "hskLevel": 1,
                "meaningPt": "também",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Também.",
                characters: chars("也", [
                    "yě"
                  ], [
                    1
                  ], [
                    "também"
                  ])
              },
              {
                "id": "s414-t13",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Muito.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s414-t14",
                "hanzi": "大",
                "pinyin": "dà",
                "hskLevel": 1,
                "meaningPt": "forte (grande)",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "Em chinês, vento forte é 风很大 ('vento muito grande').",
                characters: chars("大", [
                    "dà"
                  ], [
                    1
                  ], [
                    "grande/forte"
                  ])
              },
              {
                "id": "s414-t15",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s415",
            "zhText": "李云看着下面的水，心里很怕，但他还是慢慢地走了过去。",
            "pinyinText": "Lǐ Yún kànzhe xiàmiàn de shuǐ, xīnlǐ hěn pà, dàn tā háishì mànmàn de zǒu le guòqù.",
            "translationPt": "Li Yun, olhando para a água lá embaixo, sentiu muito medo no coração, mas ainda assim atravessou caminhando bem devagar.",
            "literalPt": "Li Yun olhando embaixo de água, coração-dentro muito temeu, mas ele ainda-assim devagar-mente caminhou [concluído] atravessando-para-lá.",
            "grammarNotes": [
              {
                "pattern": "Partícula adverbial 地 (de): 慢慢地走 (mànmàn de zǒu)",
                "explanationPt": "Quando um adjetivo reduplicado como 慢慢 ('devagar') modifica um verbo, usamos a partícula 地 (de) entre o advérbio e o verbo.",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s415-t1",
                "hanzi": "李云",
                "pinyin": "Lǐ Yún",
                "hskLevel": 1,
                "meaningPt": "Li Yun",
                "partOfSpeech": "nome próprio",
                "compoundLogicPt": "Li Yun.",
                characters: chars("李云", [
                    "Lǐ",
                    "Yún"
                  ], [
                    1,
                    1
                  ], [
                    "Li",
                    "nuvem"
                  ])
              },
              {
                "id": "s415-t2",
                "hanzi": "看着",
                "pinyin": "kànzhe",
                "hskLevel": 2,
                "meaningPt": "olhando para",
                "partOfSpeech": "verbo + partícula",
                "compoundLogicPt": "看 (olhar) + 着 (zhe).",
                characters: chars("看着", [
                    "kàn",
                    "zhe"
                  ], [
                    1,
                    2
                  ], [
                    "olhar",
                    "contínuo"
                  ])
              },
              {
                "id": "s415-t3",
                "hanzi": "下面",
                "pinyin": "xiàmiàn",
                "hskLevel": 1,
                "meaningPt": "lá embaixo",
                "partOfSpeech": "localizador",
                "compoundLogicPt": "下 (embaixo) + 面 (lado).",
                characters: chars("下面", [
                    "xià",
                    "miàn"
                  ], [
                    1,
                    1
                  ], [
                    "embaixo",
                    "lado"
                  ])
              },
              {
                "id": "s415-t4",
                "hanzi": "的",
                "pinyin": "de",
                "hskLevel": 1,
                "meaningPt": "de",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Conecta 下面 a 水.",
                characters: chars("的", [
                    "de"
                  ], [
                    1
                  ], [
                    "de"
                  ])
              },
              {
                "id": "s415-t5",
                "hanzi": "水",
                "pinyin": "shuǐ",
                "hskLevel": 1,
                "meaningPt": "a água",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Água.",
                characters: chars("水", [
                    "shuǐ"
                  ], [
                    1
                  ], [
                    "água"
                  ])
              },
              {
                "id": "s415-t6",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s415-t7",
                "hanzi": "心里",
                "pinyin": "xīnlǐ",
                "hskLevel": 1,
                "meaningPt": "no coração",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "心 + 里.",
                characters: chars("心里", [
                    "xīn",
                    "lǐ"
                  ], [
                    1,
                    1
                  ], [
                    "coração",
                    "dentro"
                  ])
              },
              {
                "id": "s415-t8",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Muito.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s415-t9",
                "hanzi": "怕",
                "pinyin": "pà",
                "hskLevel": 2,
                "meaningPt": "sentiu medo",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Temer.",
                characters: chars("怕", [
                    "pà"
                  ], [
                    2
                  ], [
                    "temer"
                  ])
              },
              {
                "id": "s415-t10",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s415-t11",
                "hanzi": "但",
                "pinyin": "dàn",
                "hskLevel": 1,
                "meaningPt": "mas",
                "partOfSpeech": "conjunção",
                "compoundLogicPt": "Mas.",
                characters: chars("但", [
                    "dàn"
                  ], [
                    1
                  ], [
                    "mas"
                  ])
              },
              {
                "id": "s415-t12",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Ele.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s415-t13",
                "hanzi": "还是",
                "pinyin": "háishì",
                "hskLevel": 2,
                "meaningPt": "ainda assim",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Apesar do medo.",
                characters: chars("还是", [
                    "hái",
                    "shì"
                  ], [
                    1,
                    1
                  ], [
                    "ainda",
                    "ser"
                  ])
              },
              {
                "id": "s415-t14",
                "hanzi": "慢慢",
                "pinyin": "mànmàn",
                "hskLevel": 2,
                "meaningPt": "bem devagar",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Reduplicação de 慢 (lento/devagar).",
                characters: chars("慢慢", [
                    "màn",
                    "màn"
                  ], [
                    2,
                    2
                  ], [
                    "devagar",
                    "devagar"
                  ])
              },
              {
                "id": "s415-t15",
                "hanzi": "地",
                "pinyin": "de",
                "hskLevel": 2,
                "meaningPt": "partícula adverbial (-mente)",
                "partOfSpeech": "partícula estrutural",
                "compoundLogicPt": "Transforma 慢慢 em advérbio antes do verbo 走.",
                characters: chars("地", [
                    "de"
                  ], [
                    2
                  ], [
                    "partícula adverbial"
                  ])
              },
              {
                "id": "s415-t16",
                "hanzi": "走了",
                "pinyin": "zǒu le",
                "hskLevel": 1,
                "meaningPt": "caminhou",
                "partOfSpeech": "verbo + partícula",
                "compoundLogicPt": "走 + 了.",
                characters: chars("走了", [
                    "zǒu",
                    "le"
                  ], [
                    1,
                    1
                  ], [
                    "caminhar",
                    "concluído"
                  ])
              },
              {
                "id": "s415-t17",
                "hanzi": "过去",
                "pinyin": "guòqù",
                "hskLevel": 1,
                "meaningPt": "atravessando para o outro lado",
                "partOfSpeech": "complemento direcional",
                "compoundLogicPt": "过 (atravessar) + 去 (para lá).",
                characters: chars("过去", [
                    "guò",
                    "qù"
                  ], [
                    1,
                    1
                  ], [
                    "atravessar",
                    "ir"
                  ])
              },
              {
                "id": "s415-t18",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s416",
            "zhText": "过了桥，他想：“我这么害怕，真没有勇气。”",
            "pinyinText": "Guò le qiáo, tā xiǎng: “Wǒ zhème hàipà, zhēn méiyǒu yǒngqì.”",
            "translationPt": "Depois de atravessar a ponte, ele pensou: “Eu senti tanto medo... realmente não tenho coragem.”",
            "literalPt": "Atravessou [concluído] ponte, ele pensou: “Eu tão temeroso, realmente não-tenho coragem.”",
            "grammarNotes": [
              {
                "pattern": "这么 (zhème) + Adjetivo = 'tão...'",
                "explanationPt": "O demonstrativo 这么 antes de um verbo psicológico ou adjetivo intensifica o grau: 这么害怕 ('com tanto medo / tão assustado').",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s416-t1",
                "hanzi": "过了",
                "pinyin": "guò le",
                "hskLevel": 1,
                "meaningPt": "depois de atravessar",
                "partOfSpeech": "verbo + partícula",
                "compoundLogicPt": "过 (atravessar) + 了.",
                characters: chars("过了", [
                    "guò",
                    "le"
                  ], [
                    1,
                    1
                  ], [
                    "atravessar",
                    "concluído"
                  ])
              },
              {
                "id": "s416-t2",
                "hanzi": "桥",
                "pinyin": "qiáo",
                "hskLevel": 3,
                "meaningPt": "a ponte",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Ponte.",
                characters: chars("桥", [
                    "qiáo"
                  ], [
                    3
                  ], [
                    "ponte"
                  ])
              },
              {
                "id": "s416-t3",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s416-t4",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s416-t5",
                "hanzi": "想",
                "pinyin": "xiǎng",
                "hskLevel": 1,
                "meaningPt": "pensou",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Pensar.",
                characters: chars("想", [
                    "xiǎng"
                  ], [
                    1
                  ], [
                    "pensar"
                  ])
              },
              {
                "id": "s416-t6",
                "hanzi": "：",
                "isPunctuation": true
              },
              {
                "id": "s416-t7",
                "hanzi": "“",
                "isPunctuation": true
              },
              {
                "id": "s416-t8",
                "hanzi": "我",
                "pinyin": "wǒ",
                "hskLevel": 1,
                "meaningPt": "eu",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Eu.",
                characters: chars("我", [
                    "wǒ"
                  ], [
                    1
                  ], [
                    "eu"
                  ])
              },
              {
                "id": "s416-t9",
                "hanzi": "这么",
                "pinyin": "zhème",
                "hskLevel": 2,
                "meaningPt": "tão / desse jeito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "这 (este) + 么 (modo) → tão.",
                characters: chars("这么", [
                    "zhè",
                    "me"
                  ], [
                    1,
                    1
                  ], [
                    "este",
                    "modo"
                  ])
              },
              {
                "id": "s416-t10",
                "hanzi": "害怕",
                "pinyin": "hàipà",
                "hskLevel": 2,
                "meaningPt": "com medo / assustado",
                "partOfSpeech": "verbo/adjetivo",
                "compoundLogicPt": "害 + 怕.",
                characters: chars("害怕", [
                    "hài",
                    "pà"
                  ], [
                    2,
                    2
                  ], [
                    "recear",
                    "temer"
                  ])
              },
              {
                "id": "s416-t11",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s416-t12",
                "hanzi": "真",
                "pinyin": "zhēn",
                "hskLevel": 1,
                "meaningPt": "realmente",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "De fato.",
                characters: chars("真", [
                    "zhēn"
                  ], [
                    1
                  ], [
                    "realmente"
                  ])
              },
              {
                "id": "s416-t13",
                "hanzi": "没有",
                "pinyin": "méiyǒu",
                "hskLevel": 1,
                "meaningPt": "não tenho",
                "partOfSpeech": "negação + verbo",
                "compoundLogicPt": "Não ter.",
                characters: chars("没有", [
                    "méi",
                    "yǒu"
                  ], [
                    1,
                    1
                  ], [
                    "não",
                    "ter"
                  ])
              },
              {
                "id": "s416-t14",
                "hanzi": "勇气",
                "pinyin": "yǒngqì",
                "hskLevel": 3,
                "meaningPt": "coragem",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "勇 + 气.",
                characters: chars("勇气", [
                    "yǒng",
                    "qì"
                  ], [
                    3,
                    1
                  ], [
                    "bravura",
                    "energia"
                  ])
              },
              {
                "id": "s416-t15",
                "hanzi": "。",
                "isPunctuation": true
              },
              {
                "id": "s416-t16",
                "hanzi": "”",
                "isPunctuation": true
              }
            ]
          }
        ]
      },
      {
        "id": "ch-5",
        "chapterNumber": 5,
        "titleZh": "第五章：山林里的黑夜",
        "titlePinyin": "Dì wǔ zhāng: Shānlín lǐ de hēiyè",
        "titlePt": "Capítulo 5: A Noite Escura na Floresta da Montanha",
        "summaryPt": "Quando a noite cai na floresta da montanha, a escuridão e o frio cercam Li Yun. Mesmo assustado com a solidão, ele não volta para trás e permanece firme até o sol nascer.",
        "estimatedMinutes": 2,
        "audioUrl": "/audio/stories/a-montanha-vazia-e-a-coragem/ch-5.mp3",
        "audioDurationMs": 0,
        "voiceName": "zh-CN-YunxiNeural",
        "hskDistribution": [],
        "keyVocabulary": [
          {
            "hanzi": "天黑",
            "pinyin": "tiānhēi",
            "meaningPt": "anoitecer / escurecer",
            "hskLevel": 2
          },
          {
            "hanzi": "山林",
            "pinyin": "shānlín",
            "meaningPt": "floresta da montanha",
            "hskLevel": 1
          },
          {
            "hanzi": "一个人",
            "pinyin": "yí gè rén",
            "meaningPt": "sozinho / uma pessoa só",
            "hskLevel": 1
          },
          {
            "hanzi": "回去",
            "pinyin": "huíqù",
            "meaningPt": "voltar para trás",
            "hskLevel": 1
          },
          {
            "hanzi": "早上",
            "pinyin": "zǎoshang",
            "meaningPt": "manhã",
            "hskLevel": 1
          }
        ],
        "sentences": [
          {
            "id": "s417",
            "zhText": "晚上天黑了，李云走到了山林里。",
            "pinyinText": "Wǎnshang tiānhēi le, Lǐ Yún zǒudào le shānlín lǐ.",
            "translationPt": "À noite o céu escureceu, e Li Yun chegou caminhando ao interior da floresta da montanha.",
            "literalPt": "Noite céu-escureceu [mudança], Li Yun caminhou-chegando [concluído] montanha-bosque dentro.",
            "grammarNotes": [
              {
                "pattern": "天黑了 (tiānhēi le) = 'escureceu / anoiteceu'",
                "explanationPt": "Expressão natural formada por 天 ('céu') + 黑 ('preto/escuro') + 了 (mudança de estado).",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s417-t1",
                "hanzi": "晚上",
                "pinyin": "wǎnshang",
                "hskLevel": 1,
                "meaningPt": "à noite",
                "partOfSpeech": "substantivo de tempo",
                "compoundLogicPt": "晚 + 上.",
                characters: chars("晚上", [
                    "wǎn",
                    "shang"
                  ], [
                    1,
                    1
                  ], [
                    "noite",
                    "período"
                  ])
              },
              {
                "id": "s417-t2",
                "hanzi": "天黑",
                "pinyin": "tiānhēi",
                "hskLevel": 2,
                "meaningPt": "o céu escureceu",
                "partOfSpeech": "sujeito + predicado",
                "compoundLogicPt": "天 (céu) + 黑 (escuro).",
                characters: chars("天黑", [
                    "tiān",
                    "hēi"
                  ], [
                    1,
                    2
                  ], [
                    "céu",
                    "escuro"
                  ])
              },
              {
                "id": "s417-t3",
                "hanzi": "了",
                "pinyin": "le",
                "hskLevel": 1,
                "meaningPt": "mudança de estado",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Indica que ficou escuro.",
                characters: chars("了", [
                    "le"
                  ], [
                    1
                  ], [
                    "mudança"
                  ])
              },
              {
                "id": "s417-t4",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s417-t5",
                "hanzi": "李云",
                "pinyin": "Lǐ Yún",
                "hskLevel": 1,
                "meaningPt": "Li Yun",
                "partOfSpeech": "nome próprio",
                "compoundLogicPt": "Li Yun.",
                characters: chars("李云", [
                    "Lǐ",
                    "Yún"
                  ], [
                    1,
                    1
                  ], [
                    "Li",
                    "nuvem"
                  ])
              },
              {
                "id": "s417-t6",
                "hanzi": "走到了",
                "pinyin": "zǒudào le",
                "hskLevel": 1,
                "meaningPt": "chegou caminhando a",
                "partOfSpeech": "verbo + resultado",
                "compoundLogicPt": "走 + 到 + 了.",
                characters: chars("走到了", [
                    "zǒu",
                    "dào",
                    "le"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "andar",
                    "chegar",
                    "concluído"
                  ])
              },
              {
                "id": "s417-t7",
                "hanzi": "山林",
                "pinyin": "shānlín",
                "hskLevel": 1,
                "meaningPt": "floresta da montanha",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "山 (montanha) + 林 (bosque/floresta).",
                characters: chars("山林", [
                    "shān",
                    "lín"
                  ], [
                    1,
                    1
                  ], [
                    "montanha",
                    "bosque"
                  ])
              },
              {
                "id": "s417-t8",
                "hanzi": "里",
                "pinyin": "lǐ",
                "hskLevel": 1,
                "meaningPt": "dentro",
                "partOfSpeech": "posposição",
                "compoundLogicPt": "No interior da mata.",
                characters: chars("里", [
                    "lǐ"
                  ], [
                    1
                  ], [
                    "dentro"
                  ])
              },
              {
                "id": "s417-t9",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s418",
            "zhText": "山林里没有灯，也没有别人，只有他一个人。",
            "pinyinText": "Shānlín lǐ méiyǒu dēng, yě méiyǒu biérén, zhǐyǒu tā yí gè rén.",
            "translationPt": "Na floresta da montanha não havia luz, nem havia outras pessoas; havia apenas ele sozinho.",
            "literalPt": "Montanha-bosque dentro não-havia lâmpada, também não-havia outras-pessoas, apenas-havia ele uma pessoa.",
            "grammarNotes": [
              {
                "pattern": "没有 A，也没有 B (méiyǒu A, yě méiyǒu B) = 'Não há A, nem há B'",
                "explanationPt": "Para encadear duas ausências em Mandarim, repete-se 没有 após o advérbio 也 ('também não').",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s418-t1",
                "hanzi": "山林",
                "pinyin": "shānlín",
                "hskLevel": 1,
                "meaningPt": "floresta da montanha",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "山 + 林.",
                characters: chars("山林", [
                    "shān",
                    "lín"
                  ], [
                    1,
                    1
                  ], [
                    "montanha",
                    "bosque"
                  ])
              },
              {
                "id": "s418-t2",
                "hanzi": "里",
                "pinyin": "lǐ",
                "hskLevel": 1,
                "meaningPt": "dentro",
                "partOfSpeech": "posposição",
                "compoundLogicPt": "No interior.",
                characters: chars("里", [
                    "lǐ"
                  ], [
                    1
                  ], [
                    "dentro"
                  ])
              },
              {
                "id": "s418-t3",
                "hanzi": "没有",
                "pinyin": "méiyǒu",
                "hskLevel": 1,
                "meaningPt": "não havia",
                "partOfSpeech": "negação + verbo",
                "compoundLogicPt": "Ausência.",
                characters: chars("没有", [
                    "méi",
                    "yǒu"
                  ], [
                    1,
                    1
                  ], [
                    "não",
                    "haver"
                  ])
              },
              {
                "id": "s418-t4",
                "hanzi": "灯",
                "pinyin": "dēng",
                "hskLevel": 2,
                "meaningPt": "luz / lanterna",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Fogo (火) + suporte (丁).",
                characters: chars("灯", [
                    "dēng"
                  ], [
                    2
                  ], [
                    "luz/lanterna"
                  ])
              },
              {
                "id": "s418-t5",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s418-t6",
                "hanzi": "也",
                "pinyin": "yě",
                "hskLevel": 1,
                "meaningPt": "também / nem",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Também.",
                characters: chars("也", [
                    "yě"
                  ], [
                    1
                  ], [
                    "também"
                  ])
              },
              {
                "id": "s418-t7",
                "hanzi": "没有",
                "pinyin": "méiyǒu",
                "hskLevel": 1,
                "meaningPt": "não havia",
                "partOfSpeech": "negação + verbo",
                "compoundLogicPt": "Nem havia.",
                characters: chars("没有", [
                    "méi",
                    "yǒu"
                  ], [
                    1,
                    1
                  ], [
                    "não",
                    "haver"
                  ])
              },
              {
                "id": "s418-t8",
                "hanzi": "别人",
                "pinyin": "biérén",
                "hskLevel": 2,
                "meaningPt": "outras pessoas",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "别 (outro) + 人 (pessoa).",
                characters: chars("别人", [
                    "bié",
                    "rén"
                  ], [
                    2,
                    1
                  ], [
                    "outro",
                    "pessoa"
                  ])
              },
              {
                "id": "s418-t9",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s418-t10",
                "hanzi": "只有",
                "pinyin": "zhǐyǒu",
                "hskLevel": 2,
                "meaningPt": "havia apenas",
                "partOfSpeech": "advérbio + verbo",
                "compoundLogicPt": "只 (zhǐ, 'apenas') + 有 (haver).",
                characters: chars("只有", [
                    "zhǐ",
                    "yǒu"
                  ], [
                    2,
                    1
                  ], [
                    "apenas",
                    "haver"
                  ])
              },
              {
                "id": "s418-t11",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s418-t12",
                "hanzi": "一个人",
                "pinyin": "yí gè rén",
                "hskLevel": 1,
                "meaningPt": "sozinho (uma pessoa só)",
                "partOfSpeech": "locução",
                "compoundLogicPt": "Em Mandarim, 'uma pessoa' após o sujeito significa 'sozinho'.",
                characters: chars("一个人", [
                    "yī",
                    "gè",
                    "rén"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "uma",
                    "classificador",
                    "pessoa"
                  ])
              },
              {
                "id": "s418-t13",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s419",
            "zhText": "夜里很冷，他听见风声，心里非常害怕。",
            "pinyinText": "Yèlǐ hěn lěng, tā tīngjiàn fēngshēng, xīnlǐ fēicháng hàipà.",
            "translationPt": "Durante a noite estava muito frio; ele ouvia o som do vento e sentia muitíssimo medo no coração.",
            "literalPt": "Noite-dentro muito frio, ele ouviu vento-som, coração-dentro extremamente temia.",
            "grammarNotes": [
              {
                "pattern": "Verbo perceptual 听见 (tīngjiàn) = 'ouvir'",
                "explanationPt": "Assim como 看见 une 'olhar + ver', 听见 une 听 ('escutar') + 见 ('perceber o som').",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s419-t1",
                "hanzi": "夜里",
                "pinyin": "yèlǐ",
                "hskLevel": 2,
                "meaningPt": "durante a noite",
                "partOfSpeech": "locução temporal",
                "compoundLogicPt": "夜 (noite escura) + 里 (dentro).",
                characters: chars("夜里", [
                    "yè",
                    "lǐ"
                  ], [
                    2,
                    1
                  ], [
                    "noite",
                    "dentro"
                  ])
              },
              {
                "id": "s419-t2",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Muito.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s419-t3",
                "hanzi": "冷",
                "pinyin": "lěng",
                "hskLevel": 1,
                "meaningPt": "frio",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "Frio.",
                characters: chars("冷", [
                    "lěng"
                  ], [
                    1
                  ], [
                    "frio"
                  ])
              },
              {
                "id": "s419-t4",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s419-t5",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Ele.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s419-t6",
                "hanzi": "听见",
                "pinyin": "tīngjiàn",
                "hskLevel": 1,
                "meaningPt": "ouviu",
                "partOfSpeech": "verbo + resultado",
                "compoundLogicPt": "听 (escutar) + 见 (perceber).",
                characters: chars("听见", [
                    "tīng",
                    "jiàn"
                  ], [
                    1,
                    1
                  ], [
                    "escutar",
                    "perceber"
                  ])
              },
              {
                "id": "s419-t7",
                "hanzi": "风声",
                "pinyin": "fēngshēng",
                "hskLevel": 1,
                "meaningPt": "o som do vento",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "风 (vento) + 声 (som/voz).",
                characters: chars("风声", [
                    "fēng",
                    "shēng"
                  ], [
                    1,
                    1
                  ], [
                    "vento",
                    "som"
                  ])
              },
              {
                "id": "s419-t8",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s419-t9",
                "hanzi": "心里",
                "pinyin": "xīnlǐ",
                "hskLevel": 1,
                "meaningPt": "no coração",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "心 + 里.",
                characters: chars("心里", [
                    "xīn",
                    "lǐ"
                  ], [
                    1,
                    1
                  ], [
                    "coração",
                    "dentro"
                  ])
              },
              {
                "id": "s419-t10",
                "hanzi": "非常",
                "pinyin": "fēicháng",
                "hskLevel": 2,
                "meaningPt": "extremamente / muitíssimo",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "非 (fora do) + 常 (comum).",
                characters: chars("非常", [
                    "fēi",
                    "cháng"
                  ], [
                    2,
                    2
                  ], [
                    "não",
                    "comum"
                  ])
              },
              {
                "id": "s419-t11",
                "hanzi": "害怕",
                "pinyin": "hàipà",
                "hskLevel": 2,
                "meaningPt": "com medo",
                "partOfSpeech": "verbo/adjetivo",
                "compoundLogicPt": "Temer.",
                characters: chars("害怕", [
                    "hài",
                    "pà"
                  ], [
                    2,
                    2
                  ], [
                    "recear",
                    "temer"
                  ])
              },
              {
                "id": "s419-t12",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s420",
            "zhText": "但是他没有回去，他坐在树下，一直等到早上。",
            "pinyinText": "Dànshì tā méiyǒu huíqù, tā zuò zài shù xià, yìzhí děngdào zǎoshang.",
            "translationPt": "Mas ele não voltou para trás; sentou-se debaixo de uma árvore e esperou continuamente até de manhã.",
            "literalPt": "Mas ele não voltou-indo, ele sentou em árvore embaixo, continuamente esperou-chegando manhã.",
            "grammarNotes": [
              {
                "pattern": "一直 + Verbo + 到 + Tempo (yìzhí děngdào zǎoshang)",
                "explanationPt": "Indica uma ação sustentada com perseverança até um marco temporal: 'esperou sem desistir até a manhã chegar'.",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s420-t1",
                "hanzi": "但是",
                "pinyin": "dànshì",
                "hskLevel": 2,
                "meaningPt": "mas",
                "partOfSpeech": "conjunção",
                "compoundLogicPt": "Oposição.",
                characters: chars("但是", [
                    "dàn",
                    "shì"
                  ], [
                    2,
                    1
                  ], [
                    "mas",
                    "ser"
                  ])
              },
              {
                "id": "s420-t2",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s420-t3",
                "hanzi": "没有",
                "pinyin": "méiyǒu",
                "hskLevel": 1,
                "meaningPt": "não",
                "partOfSpeech": "negação passada",
                "compoundLogicPt": "Negação de ação passada.",
                characters: chars("没有", [
                    "méi",
                    "yǒu"
                  ], [
                    1,
                    1
                  ], [
                    "não",
                    "haver"
                  ])
              },
              {
                "id": "s420-t4",
                "hanzi": "回去",
                "pinyin": "huíqù",
                "hskLevel": 1,
                "meaningPt": "voltou para trás",
                "partOfSpeech": "verbo + direção",
                "compoundLogicPt": "回 (retornar) + 去 (para lá).",
                characters: chars("回去", [
                    "huí",
                    "qù"
                  ], [
                    1,
                    1
                  ], [
                    "voltar",
                    "ir"
                  ])
              },
              {
                "id": "s420-t5",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s420-t6",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Ele.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s420-t7",
                "hanzi": "坐在",
                "pinyin": "zuò zài",
                "hskLevel": 1,
                "meaningPt": "sentou-se em",
                "partOfSpeech": "verbo + preposição",
                "compoundLogicPt": "坐 + 在.",
                characters: chars("坐在", [
                    "zuò",
                    "zài"
                  ], [
                    1,
                    1
                  ], [
                    "sentar",
                    "em"
                  ])
              },
              {
                "id": "s420-t8",
                "hanzi": "树下",
                "pinyin": "shù xià",
                "hskLevel": 1,
                "meaningPt": "debaixo da árvore",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "树 (árvore) + 下 (embaixo).",
                characters: chars("树下", [
                    "shù",
                    "xià"
                  ], [
                    1,
                    1
                  ], [
                    "árvore",
                    "embaixo"
                  ])
              },
              {
                "id": "s420-t9",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s420-t10",
                "hanzi": "一直",
                "pinyin": "yìzhí",
                "hskLevel": 2,
                "meaningPt": "continuamente / sem desistir",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "一 + 直 (direto).",
                characters: chars("一直", [
                    "yī",
                    "zhí"
                  ], [
                    1,
                    2
                  ], [
                    "um",
                    "reto/contínuo"
                  ])
              },
              {
                "id": "s420-t11",
                "hanzi": "等到",
                "pinyin": "děngdào",
                "hskLevel": 1,
                "meaningPt": "esperou até",
                "partOfSpeech": "verbo + resultado",
                "compoundLogicPt": "等 (esperar) + 到 (chegar a).",
                characters: chars("等到", [
                    "děng",
                    "dào"
                  ], [
                    1,
                    1
                  ], [
                    "esperar",
                    "até"
                  ])
              },
              {
                "id": "s420-t12",
                "hanzi": "早上",
                "pinyin": "zǎoshang",
                "hskLevel": 1,
                "meaningPt": "a manhã",
                "partOfSpeech": "substantivo de tempo",
                "compoundLogicPt": "Amadurecer da aurora.",
                characters: chars("早上", [
                    "zǎo",
                    "shang"
                  ], [
                    1,
                    1
                  ], [
                    "cedo",
                    "manhã"
                  ])
              },
              {
                "id": "s420-t13",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          }
        ]
      },
      {
        "id": "ch-6",
        "chapterNumber": 6,
        "titleZh": "第六章：雪地里的哭声",
        "titlePinyin": "Dì liù zhāng: Xuědì lǐ de kūshēng",
        "titlePt": "Capítulo 6: O Choro na Neve da Montanha",
        "summaryPt": "Subindo a encosta gelada sob uma forte nevasca, Li Yun encontra um viajante caído na neve. Apesar de temer o frio extremo, ele divide sua água quente e salva o desconhecido.",
        "estimatedMinutes": 2,
        "audioUrl": "/audio/stories/a-montanha-vazia-e-a-coragem/ch-6.mp3",
        "audioDurationMs": 0,
        "voiceName": "zh-CN-YunxiNeural",
        "hskDistribution": [],
        "keyVocabulary": [
          {
            "hanzi": "下雪",
            "pinyin": "xiàxuě",
            "meaningPt": "nevar",
            "hskLevel": 2
          },
          {
            "hanzi": "不好走",
            "pinyin": "bù hǎo zǒu",
            "meaningPt": "difícil de caminhar",
            "hskLevel": 1
          },
          {
            "hanzi": "哭",
            "pinyin": "kū",
            "meaningPt": "chorar",
            "hskLevel": 2
          },
          {
            "hanzi": "走开",
            "pinyin": "zǒukāi",
            "meaningPt": "ir embora / afastar-se",
            "hskLevel": 1
          },
          {
            "hanzi": "救",
            "pinyin": "jiù",
            "meaningPt": "salvar / socorrer",
            "hskLevel": 3
          }
        ],
        "sentences": [
          {
            "id": "s421",
            "zhText": "山上很冷，还下雪了，山路很不好走。",
            "pinyinText": "Shān shàng hěn lěng, hái xiàxuě le, shānlù hěn bù hǎo zǒu.",
            "translationPt": "No alto da montanha estava muito frio, e além disso começou a nevar; o caminho da montanha era muito difícil de percorrer.",
            "literalPt": "Montanha em-cima muito frio, ainda caiu-neve [mudança], montanha-caminho muito não bom caminhar.",
            "grammarNotes": [
              {
                "pattern": "不好 + Verbo (bù hǎo zǒu) = 'difícil de caminhar'",
                "explanationPt": "Estrutura natural do HSK 1–2 em que 好/不好 antes de um verbo indica facilidade ou dificuldade.",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s421-t1",
                "hanzi": "山上",
                "pinyin": "shān shàng",
                "hskLevel": 1,
                "meaningPt": "na montanha",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "山 + 上.",
                characters: chars("山上", [
                    "shān",
                    "shàng"
                  ], [
                    1,
                    1
                  ], [
                    "montanha",
                    "em cima"
                  ])
              },
              {
                "id": "s421-t2",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Muito.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s421-t3",
                "hanzi": "冷",
                "pinyin": "lěng",
                "hskLevel": 1,
                "meaningPt": "frio",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "Frio.",
                characters: chars("冷", [
                    "lěng"
                  ], [
                    1
                  ], [
                    "frio"
                  ])
              },
              {
                "id": "s421-t4",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s421-t5",
                "hanzi": "还",
                "pinyin": "hái",
                "hskLevel": 1,
                "meaningPt": "e ainda / além disso",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Polifônico 还 lido hái.",
                characters: chars("还", [
                    "hái"
                  ], [
                    1
                  ], [
                    "ainda"
                  ])
              },
              {
                "id": "s421-t6",
                "hanzi": "下雪",
                "pinyin": "xiàxuě",
                "hskLevel": 2,
                "meaningPt": "nevar",
                "partOfSpeech": "verbo + objeto",
                "compoundLogicPt": "下 (cair) + 雪 (neve).",
                characters: chars("下雪", [
                    "xià",
                    "xuě"
                  ], [
                    1,
                    2
                  ], [
                    "cair",
                    "neve"
                  ])
              },
              {
                "id": "s421-t7",
                "hanzi": "了",
                "pinyin": "le",
                "hskLevel": 1,
                "meaningPt": "começou a (mudança)",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Mudança climática.",
                characters: chars("了", [
                    "le"
                  ], [
                    1
                  ], [
                    "mudança"
                  ])
              },
              {
                "id": "s421-t8",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s421-t9",
                "hanzi": "山路",
                "pinyin": "shānlù",
                "hskLevel": 1,
                "meaningPt": "o caminho da montanha",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "山 + 路.",
                characters: chars("山路", [
                    "shān",
                    "lù"
                  ], [
                    1,
                    1
                  ], [
                    "montanha",
                    "caminho"
                  ])
              },
              {
                "id": "s421-t10",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Muito.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s421-t11",
                "hanzi": "不好",
                "pinyin": "bù hǎo",
                "hskLevel": 1,
                "meaningPt": "difícil de",
                "partOfSpeech": "negação + auxiliar",
                "compoundLogicPt": "Não é fácil de.",
                characters: chars("不好", [
                    "bù",
                    "hǎo"
                  ], [
                    1,
                    1
                  ], [
                    "não",
                    "fácil/bom"
                  ])
              },
              {
                "id": "s421-t12",
                "hanzi": "走",
                "pinyin": "zǒu",
                "hskLevel": 1,
                "meaningPt": "andar / percorrer",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Caminhar.",
                characters: chars("走", [
                    "zǒu"
                  ], [
                    1
                  ], [
                    "andar"
                  ])
              },
              {
                "id": "s421-t13",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s422",
            "zhText": "在路上，他看见一个人坐在雪里，还在哭。",
            "pinyinText": "Zài lù shàng, tā kànjiàn yí gè rén zuò zài xuě lǐ, hái zài kū.",
            "translationPt": "No caminho, ele viu uma pessoa sentada na neve, que ainda estava chorando.",
            "literalPt": "Em caminho sobre, ele viu uma pessoa sentada em neve dentro, ainda estava chorando.",
            "grammarNotes": [
              {
                "pattern": "还在 + Verbo (hái zài kū) = 'ainda estava chorando'",
                "explanationPt": "Une 还 ('ainda') + 在 (aspecto contínuo) + 哭 ('chorar').",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s422-t1",
                "hanzi": "在",
                "pinyin": "zài",
                "hskLevel": 1,
                "meaningPt": "no",
                "partOfSpeech": "preposição",
                "compoundLogicPt": "Em.",
                characters: chars("在", [
                    "zài"
                  ], [
                    1
                  ], [
                    "em"
                  ])
              },
              {
                "id": "s422-t2",
                "hanzi": "路上",
                "pinyin": "lù shàng",
                "hskLevel": 1,
                "meaningPt": "caminho",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "路 + 上.",
                characters: chars("路上", [
                    "lù",
                    "shàng"
                  ], [
                    1,
                    1
                  ], [
                    "caminho",
                    "sobre"
                  ])
              },
              {
                "id": "s422-t3",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s422-t4",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s422-t5",
                "hanzi": "看见",
                "pinyin": "kànjiàn",
                "hskLevel": 1,
                "meaningPt": "viu",
                "partOfSpeech": "verbo + resultado",
                "compoundLogicPt": "看 + 见.",
                characters: chars("看见", [
                    "kàn",
                    "jiàn"
                  ], [
                    1,
                    1
                  ], [
                    "olhar",
                    "ver"
                  ])
              },
              {
                "id": "s422-t6",
                "hanzi": "一个",
                "pinyin": "yí gè",
                "hskLevel": 1,
                "meaningPt": "uma",
                "partOfSpeech": "numeral + classificador",
                "compoundLogicPt": "一 + 个.",
                characters: chars("一个", [
                    "yī",
                    "gè"
                  ], [
                    1,
                    1
                  ], [
                    "um",
                    "classificador"
                  ])
              },
              {
                "id": "s422-t7",
                "hanzi": "人",
                "pinyin": "rén",
                "hskLevel": 1,
                "meaningPt": "pessoa",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Viajante.",
                characters: chars("人", [
                    "rén"
                  ], [
                    1
                  ], [
                    "pessoa"
                  ])
              },
              {
                "id": "s422-t8",
                "hanzi": "坐在",
                "pinyin": "zuò zài",
                "hskLevel": 1,
                "meaningPt": "sentada em",
                "partOfSpeech": "verbo + preposição",
                "compoundLogicPt": "坐 + 在.",
                characters: chars("坐在", [
                    "zuò",
                    "zài"
                  ], [
                    1,
                    1
                  ], [
                    "sentar",
                    "em"
                  ])
              },
              {
                "id": "s422-t9",
                "hanzi": "雪里",
                "pinyin": "xuě lǐ",
                "hskLevel": 2,
                "meaningPt": "na neve",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "雪 + 里.",
                characters: chars("雪里", [
                    "xuě",
                    "lǐ"
                  ], [
                    2,
                    1
                  ], [
                    "neve",
                    "dentro"
                  ])
              },
              {
                "id": "s422-t10",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s422-t11",
                "hanzi": "还在",
                "pinyin": "hái zài",
                "hskLevel": 1,
                "meaningPt": "ainda estava",
                "partOfSpeech": "advérbio + contínuo",
                "compoundLogicPt": "还 + 在.",
                characters: chars("还在", [
                    "hái",
                    "zài"
                  ], [
                    1,
                    1
                  ], [
                    "ainda",
                    "estar"
                  ])
              },
              {
                "id": "s422-t12",
                "hanzi": "哭",
                "pinyin": "kū",
                "hskLevel": 2,
                "meaningPt": "chorando",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Chorar.",
                characters: chars("哭", [
                    "kū"
                  ], [
                    2
                  ], [
                    "chorar"
                  ])
              },
              {
                "id": "s422-t13",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s423",
            "zhText": "李云很怕冷，但是他没有走开。",
            "pinyinText": "Lǐ Yún hěn pà lěng, dànshì tā méiyǒu zǒukāi.",
            "translationPt": "Li Yun tinha muito medo do frio, mas não foi embora.",
            "literalPt": "Li Yun muito temia frio, mas ele não caminhou-afastando.",
            "grammarNotes": [
              {
                "pattern": "没有 (méiyǒu) + Verbo de ação passada",
                "explanationPt": "Negação de ação pontual no passado: 'ele não se afastou'.",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s423-t1",
                "hanzi": "李云",
                "pinyin": "Lǐ Yún",
                "hskLevel": 1,
                "meaningPt": "Li Yun",
                "partOfSpeech": "nome próprio",
                "compoundLogicPt": "Li Yun.",
                characters: chars("李云", [
                    "Lǐ",
                    "Yún"
                  ], [
                    1,
                    1
                  ], [
                    "Li",
                    "nuvem"
                  ])
              },
              {
                "id": "s423-t2",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Muito.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s423-t3",
                "hanzi": "怕",
                "pinyin": "pà",
                "hskLevel": 2,
                "meaningPt": "temia",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Sentir medo.",
                characters: chars("怕", [
                    "pà"
                  ], [
                    2
                  ], [
                    "temer"
                  ])
              },
              {
                "id": "s423-t4",
                "hanzi": "冷",
                "pinyin": "lěng",
                "hskLevel": 1,
                "meaningPt": "o frio",
                "partOfSpeech": "adjetivo/substantivo",
                "compoundLogicPt": "Frio.",
                characters: chars("冷", [
                    "lěng"
                  ], [
                    1
                  ], [
                    "frio"
                  ])
              },
              {
                "id": "s423-t5",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s423-t6",
                "hanzi": "但是",
                "pinyin": "dànshì",
                "hskLevel": 2,
                "meaningPt": "mas",
                "partOfSpeech": "conjunção",
                "compoundLogicPt": "Mas.",
                characters: chars("但是", [
                    "dàn",
                    "shì"
                  ], [
                    2,
                    1
                  ], [
                    "mas",
                    "ser"
                  ])
              },
              {
                "id": "s423-t7",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Ele.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s423-t8",
                "hanzi": "没有",
                "pinyin": "méiyǒu",
                "hskLevel": 1,
                "meaningPt": "não",
                "partOfSpeech": "negação",
                "compoundLogicPt": "Não.",
                characters: chars("没有", [
                    "méi",
                    "yǒu"
                  ], [
                    1,
                    1
                  ], [
                    "não",
                    "haver"
                  ])
              },
              {
                "id": "s423-t9",
                "hanzi": "走开",
                "pinyin": "zǒukāi",
                "hskLevel": 1,
                "meaningPt": "foi embora / se afastou",
                "partOfSpeech": "verbo + direção",
                "compoundLogicPt": "走 (andar) + 开 (afastar).",
                characters: chars("走开", [
                    "zǒu",
                    "kāi"
                  ], [
                    1,
                    1
                  ], [
                    "andar",
                    "afastar"
                  ])
              },
              {
                "id": "s423-t10",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s424",
            "zhText": "他把自己的水给那个人喝，救了那个人。",
            "pinyinText": "Tā bǎ zìjǐ de shuǐ gěi nà gè rén hē, jiù le nà gè rén.",
            "translationPt": "Ele deu sua própria água para aquela pessoa beber e salvou aquela pessoa.",
            "literalPt": "Ele [pegou] si-mesmo de água deu aquela pessoa beber, salvou [concluído] aquela pessoa.",
            "grammarNotes": [
              {
                "pattern": "Estrutura 把 (bǎ): Sujeito + 把 + Objeto + Verbo + Resultado",
                "explanationPt": "A construção com 把 destaca o que foi feito com um objeto específico ('pegou a própria água e a deu para a pessoa beber').",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s424-t1",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s424-t2",
                "hanzi": "把",
                "pinyin": "bǎ",
                "hskLevel": 2,
                "meaningPt": "partícula de manipulação de objeto",
                "partOfSpeech": "preposição",
                "compoundLogicPt": "Antecipa o objeto 自己的水 antes do verbo 给.",
                characters: chars("把", [
                    "bǎ"
                  ], [
                    2
                  ], [
                    "partícula bǎ"
                  ])
              },
              {
                "id": "s424-t3",
                "hanzi": "自己",
                "pinyin": "zìjǐ",
                "hskLevel": 2,
                "meaningPt": "sua própria",
                "partOfSpeech": "pronome reflexivo",
                "compoundLogicPt": "自 + 己.",
                characters: chars("自己", [
                    "zì",
                    "jǐ"
                  ], [
                    1,
                    2
                  ], [
                    "próprio",
                    "si mesmo"
                  ])
              },
              {
                "id": "s424-t4",
                "hanzi": "的",
                "pinyin": "de",
                "hskLevel": 1,
                "meaningPt": "de",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Possessivo.",
                characters: chars("的", [
                    "de"
                  ], [
                    1
                  ], [
                    "de"
                  ])
              },
              {
                "id": "s424-t5",
                "hanzi": "水",
                "pinyin": "shuǐ",
                "hskLevel": 1,
                "meaningPt": "água",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Água.",
                characters: chars("水", [
                    "shuǐ"
                  ], [
                    1
                  ], [
                    "água"
                  ])
              },
              {
                "id": "s424-t6",
                "hanzi": "给",
                "pinyin": "gěi",
                "hskLevel": 1,
                "meaningPt": "deu para",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Dar.",
                characters: chars("给", [
                    "gěi"
                  ], [
                    1
                  ], [
                    "dar"
                  ])
              },
              {
                "id": "s424-t7",
                "hanzi": "那个",
                "pinyin": "nà gè",
                "hskLevel": 1,
                "meaningPt": "aquela",
                "partOfSpeech": "demonstrativo + classificador",
                "compoundLogicPt": "那 + 个.",
                characters: chars("那个", [
                    "nà",
                    "gè"
                  ], [
                    1,
                    1
                  ], [
                    "aquela",
                    "classificador"
                  ])
              },
              {
                "id": "s424-t8",
                "hanzi": "人",
                "pinyin": "rén",
                "hskLevel": 1,
                "meaningPt": "pessoa",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Viajante.",
                characters: chars("人", [
                    "rén"
                  ], [
                    1
                  ], [
                    "pessoa"
                  ])
              },
              {
                "id": "s424-t9",
                "hanzi": "喝",
                "pinyin": "hē",
                "hskLevel": 1,
                "meaningPt": "beber",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Beber.",
                characters: chars("喝", [
                    "hē"
                  ], [
                    1
                  ], [
                    "beber"
                  ])
              },
              {
                "id": "s424-t10",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s424-t11",
                "hanzi": "救了",
                "pinyin": "jiù le",
                "hskLevel": 3,
                "meaningPt": "salvou",
                "partOfSpeech": "verbo + partícula",
                "compoundLogicPt": "救 (salvar/socorrer) + 了.",
                characters: chars("救了", [
                    "jiù",
                    "le"
                  ], [
                    3,
                    1
                  ], [
                    "salvar",
                    "concluído"
                  ])
              },
              {
                "id": "s424-t12",
                "hanzi": "那个",
                "pinyin": "nà gè",
                "hskLevel": 1,
                "meaningPt": "aquela",
                "partOfSpeech": "demonstrativo + classificador",
                "compoundLogicPt": "那 + 个.",
                characters: chars("那个", [
                    "nà",
                    "gè"
                  ], [
                    1,
                    1
                  ], [
                    "aquela",
                    "classificador"
                  ])
              },
              {
                "id": "s424-t13",
                "hanzi": "人",
                "pinyin": "rén",
                "hskLevel": 1,
                "meaningPt": "pessoa",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Pessoa.",
                characters: chars("人", [
                    "rén"
                  ], [
                    1
                  ], [
                    "pessoa"
                  ])
              },
              {
                "id": "s424-t14",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          }
        ]
      },
      {
        "id": "ch-7",
        "chapterNumber": 7,
        "titleZh": "第七章：山上的小茶桌",
        "titlePinyin": "Dì qī zhāng: Shān shàng de xiǎo cházhuō",
        "titlePt": "Capítulo 7: A Pequena Mesa de Chá no Topo da Montanha",
        "summaryPt": "Na tarde do terceiro dia, Li Yun finalmente alcança o cume silencioso da Montanha Vazia. Lá ele encontra o velho mestre preparando chá quente ao lado de uma pequena casa.",
        "estimatedMinutes": 2,
        "audioUrl": "/audio/stories/a-montanha-vazia-e-a-coragem/ch-7.mp3",
        "audioDurationMs": 0,
        "voiceName": "zh-CN-YunxiNeural",
        "hskDistribution": [],
        "keyVocabulary": [
          {
            "hanzi": "走到了",
            "pinyin": "zǒudào le",
            "meaningPt": "chegou caminhando a",
            "hskLevel": 1
          },
          {
            "hanzi": "那位",
            "pinyin": "nà wèi",
            "meaningPt": "aquele (respeitoso)",
            "hskLevel": 1
          },
          {
            "hanzi": "一杯热茶",
            "pinyin": "yì bēi rè chá",
            "meaningPt": "uma xícara de chá quente",
            "hskLevel": 1
          },
          {
            "hanzi": "桌子",
            "pinyin": "zhuōzi",
            "meaningPt": "mesa",
            "hskLevel": 1
          },
          {
            "hanzi": "找",
            "pinyin": "zhǎo",
            "meaningPt": "procurar / buscar",
            "hskLevel": 1
          }
        ],
        "sentences": [
          {
            "id": "s425",
            "zhText": "下午，李云走到了高山上，看见了那位老老师。",
            "pinyinText": "Xiàwǔ, Lǐ Yún zǒudào le gāoshān shàng, kànjiàn le nà wèi lǎo lǎoshī.",
            "translationPt": "À tarde, Li Yun chegou caminhando ao alto da montanha e avistou aquele velho mestre.",
            "literalPt": "Tarde, Li Yun caminhou-chegando [concluído] alta-montanha em-cima, viu [concluído] aquele [respeitoso] velho mestre.",
            "grammarNotes": [
              {
                "pattern": "Complemento de resultado 到 (dào) + 了",
                "explanationPt": "走到 (zǒudào) confirma que a longa caminhada atingiu seu ponto final no topo da montanha.",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s425-t1",
                "hanzi": "下午",
                "pinyin": "xiàwǔ",
                "hskLevel": 1,
                "meaningPt": "à tarde",
                "partOfSpeech": "substantivo de tempo",
                "compoundLogicPt": "下 + 午.",
                characters: chars("下午", [
                    "xià",
                    "wǔ"
                  ], [
                    1,
                    1
                  ], [
                    "após",
                    "meio-dia"
                  ])
              },
              {
                "id": "s425-t2",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s425-t3",
                "hanzi": "李云",
                "pinyin": "Lǐ Yún",
                "hskLevel": 1,
                "meaningPt": "Li Yun",
                "partOfSpeech": "nome próprio",
                "compoundLogicPt": "Li Yun.",
                characters: chars("李云", [
                    "Lǐ",
                    "Yún"
                  ], [
                    1,
                    1
                  ], [
                    "Li",
                    "nuvem"
                  ])
              },
              {
                "id": "s425-t4",
                "hanzi": "走到了",
                "pinyin": "zǒudào le",
                "hskLevel": 1,
                "meaningPt": "chegou caminhando a",
                "partOfSpeech": "verbo + resultado",
                "compoundLogicPt": "走 + 到 + 了.",
                characters: chars("走到了", [
                    "zǒu",
                    "dào",
                    "le"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "caminhar",
                    "chegar",
                    "concluído"
                  ])
              },
              {
                "id": "s425-t5",
                "hanzi": "高山",
                "pinyin": "gāoshān",
                "hskLevel": 1,
                "meaningPt": "a montanha alta",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "高 + 山.",
                characters: chars("高山", [
                    "gāo",
                    "shān"
                  ], [
                    1,
                    1
                  ], [
                    "alta",
                    "montanha"
                  ])
              },
              {
                "id": "s425-t6",
                "hanzi": "上",
                "pinyin": "shàng",
                "hskLevel": 1,
                "meaningPt": "ao topo de",
                "partOfSpeech": "posposição",
                "compoundLogicPt": "Topo.",
                characters: chars("上", [
                    "shàng"
                  ], [
                    1
                  ], [
                    "em cima"
                  ])
              },
              {
                "id": "s425-t7",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s425-t8",
                "hanzi": "看见了",
                "pinyin": "kànjiàn le",
                "hskLevel": 1,
                "meaningPt": "avistou / viu",
                "partOfSpeech": "verbo + partícula",
                "compoundLogicPt": "看 + 见 + 了.",
                characters: chars("看见了", [
                    "kàn",
                    "jiàn",
                    "le"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "olhar",
                    "ver",
                    "concluído"
                  ])
              },
              {
                "id": "s425-t9",
                "hanzi": "那位",
                "pinyin": "nà wèi",
                "hskLevel": 1,
                "meaningPt": "aquele",
                "partOfSpeech": "demonstrativo + classificador",
                "compoundLogicPt": "那 + 位.",
                characters: chars("那位", [
                    "nà",
                    "wèi"
                  ], [
                    1,
                    1
                  ], [
                    "aquele",
                    "classificador"
                  ])
              },
              {
                "id": "s425-t10",
                "hanzi": "老",
                "pinyin": "lǎo",
                "hskLevel": 1,
                "meaningPt": "velho",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "Ancião.",
                characters: chars("老", [
                    "lǎo"
                  ], [
                    1
                  ], [
                    "velho"
                  ])
              },
              {
                "id": "s425-t11",
                "hanzi": "老师",
                "pinyin": "lǎoshī",
                "hskLevel": 1,
                "meaningPt": "mestre",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Mestre sábio.",
                characters: chars("老师", [
                    "lǎo",
                    "shī"
                  ], [
                    1,
                    1
                  ], [
                    "experiente",
                    "mestre"
                  ])
              },
              {
                "id": "s425-t12",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s426",
            "zhText": "老师坐在小桌子旁边，请李云坐下。",
            "pinyinText": "Lǎoshī zuò zài xiǎo zhuōzi pángbiān, qǐng Lǐ Yún zuòxià.",
            "translationPt": "O mestre estava sentado ao lado de uma pequena mesa e convidou Li Yun a se sentar.",
            "literalPt": "Mestre sentado em pequena mesa ao-lado, convidou Li Yun sentar-descer.",
            "grammarNotes": [
              {
                "pattern": "请 (qǐng) + Pessoa + Verbo = 'convidar/pedir a alguém para...'",
                "explanationPt": "Estrutura pivotal cortês: 请李云坐下 ('convidou Li Yun a se sentar').",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s426-t1",
                "hanzi": "老师",
                "pinyin": "lǎoshī",
                "hskLevel": 1,
                "meaningPt": "o mestre",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "老 + 师.",
                characters: chars("老师", [
                    "lǎo",
                    "shī"
                  ], [
                    1,
                    1
                  ], [
                    "sábio",
                    "mestre"
                  ])
              },
              {
                "id": "s426-t2",
                "hanzi": "坐在",
                "pinyin": "zuò zài",
                "hskLevel": 1,
                "meaningPt": "estava sentado em",
                "partOfSpeech": "verbo + preposição",
                "compoundLogicPt": "坐 + 在.",
                characters: chars("坐在", [
                    "zuò",
                    "zài"
                  ], [
                    1,
                    1
                  ], [
                    "sentar",
                    "em"
                  ])
              },
              {
                "id": "s426-t3",
                "hanzi": "小",
                "pinyin": "xiǎo",
                "hskLevel": 1,
                "meaningPt": "pequena",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "Pequena.",
                characters: chars("小", [
                    "xiǎo"
                  ], [
                    1
                  ], [
                    "pequena"
                  ])
              },
              {
                "id": "s426-t4",
                "hanzi": "桌子",
                "pinyin": "zhuōzi",
                "hskLevel": 1,
                "meaningPt": "mesa",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "桌 + 子.",
                characters: chars("桌子", [
                    "zhuō",
                    "zi"
                  ], [
                    1,
                    1
                  ], [
                    "mesa",
                    "sufixo"
                  ])
              },
              {
                "id": "s426-t5",
                "hanzi": "旁边",
                "pinyin": "pángbiān",
                "hskLevel": 2,
                "meaningPt": "ao lado",
                "partOfSpeech": "localizador",
                "compoundLogicPt": "旁 + 边.",
                characters: chars("旁边", [
                    "páng",
                    "biān"
                  ], [
                    2,
                    1
                  ], [
                    "lado",
                    "borda"
                  ])
              },
              {
                "id": "s426-t6",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s426-t7",
                "hanzi": "请",
                "pinyin": "qǐng",
                "hskLevel": 1,
                "meaningPt": "convidou",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Convidar com cortesia.",
                characters: chars("请", [
                    "qǐng"
                  ], [
                    1
                  ], [
                    "convidar"
                  ])
              },
              {
                "id": "s426-t8",
                "hanzi": "李云",
                "pinyin": "Lǐ Yún",
                "hskLevel": 1,
                "meaningPt": "Li Yun",
                "partOfSpeech": "nome próprio",
                "compoundLogicPt": "Li Yun.",
                characters: chars("李云", [
                    "Lǐ",
                    "Yún"
                  ], [
                    1,
                    1
                  ], [
                    "Li",
                    "nuvem"
                  ])
              },
              {
                "id": "s426-t9",
                "hanzi": "坐下",
                "pinyin": "zuòxià",
                "hskLevel": 1,
                "meaningPt": "a se sentar",
                "partOfSpeech": "verbo + direção",
                "compoundLogicPt": "坐 (sentar) + 下 (para baixo/acomodar-se).",
                characters: chars("坐下", [
                    "zuò",
                    "xià"
                  ], [
                    1,
                    1
                  ], [
                    "sentar",
                    "abaixar"
                  ])
              },
              {
                "id": "s426-t10",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s427",
            "zhText": "老师给他一杯热茶，问他：“你来山上找什么？”",
            "pinyinText": "Lǎoshī gěi tā yì bēi rè chá, wèn tā: “Nǐ lái shān shàng zhǎo shénme?”",
            "translationPt": "O mestre deu a ele uma xícara de chá quente e perguntou-lhe: “O que você veio procurar na montanha?”",
            "literalPt": "Mestre deu ele uma xícara quente chá, perguntou ele: “Você veio montanha em-cima procurar o-quê?”",
            "grammarNotes": [
              {
                "pattern": "Classificador 杯 (bēi) para bebidas",
                "explanationPt": "Xícaras de chá, café ou copos de água usam sempre 杯 (bēi): 一杯热茶.",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s427-t1",
                "hanzi": "老师",
                "pinyin": "lǎoshī",
                "hskLevel": 1,
                "meaningPt": "o mestre",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Mestre.",
                characters: chars("老师", [
                    "lǎo",
                    "shī"
                  ], [
                    1,
                    1
                  ], [
                    "velho",
                    "mestre"
                  ])
              },
              {
                "id": "s427-t2",
                "hanzi": "给",
                "pinyin": "gěi",
                "hskLevel": 1,
                "meaningPt": "deu a",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Dar.",
                characters: chars("给", [
                    "gěi"
                  ], [
                    1
                  ], [
                    "dar"
                  ])
              },
              {
                "id": "s427-t3",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s427-t4",
                "hanzi": "一杯",
                "pinyin": "yì bēi",
                "hskLevel": 1,
                "meaningPt": "uma xícara de",
                "partOfSpeech": "numeral + classificador",
                "compoundLogicPt": "一 + 杯.",
                characters: chars("一杯", [
                    "yī",
                    "bēi"
                  ], [
                    1,
                    1
                  ], [
                    "uma",
                    "xícara"
                  ])
              },
              {
                "id": "s427-t5",
                "hanzi": "热茶",
                "pinyin": "rè chá",
                "hskLevel": 1,
                "meaningPt": "chá quente",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "热 + 茶.",
                characters: chars("热茶", [
                    "rè",
                    "chá"
                  ], [
                    1,
                    1
                  ], [
                    "quente",
                    "chá"
                  ])
              },
              {
                "id": "s427-t6",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s427-t7",
                "hanzi": "问",
                "pinyin": "wèn",
                "hskLevel": 1,
                "meaningPt": "perguntou a",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Perguntar.",
                characters: chars("问", [
                    "wèn"
                  ], [
                    1
                  ], [
                    "perguntar"
                  ])
              },
              {
                "id": "s427-t8",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Ele.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s427-t9",
                "hanzi": "：",
                "isPunctuation": true
              },
              {
                "id": "s427-t10",
                "hanzi": "“",
                "isPunctuation": true
              },
              {
                "id": "s427-t11",
                "hanzi": "你",
                "pinyin": "nǐ",
                "hskLevel": 1,
                "meaningPt": "você",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Você.",
                characters: chars("你", [
                    "nǐ"
                  ], [
                    1
                  ], [
                    "você"
                  ])
              },
              {
                "id": "s427-t12",
                "hanzi": "来",
                "pinyin": "lái",
                "hskLevel": 1,
                "meaningPt": "veio a",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Vir.",
                characters: chars("来", [
                    "lái"
                  ], [
                    1
                  ], [
                    "vir"
                  ])
              },
              {
                "id": "s427-t13",
                "hanzi": "山上",
                "pinyin": "shān shàng",
                "hskLevel": 1,
                "meaningPt": "a montanha",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "山 + 上.",
                characters: chars("山上", [
                    "shān",
                    "shàng"
                  ], [
                    1,
                    1
                  ], [
                    "montanha",
                    "topo"
                  ])
              },
              {
                "id": "s427-t14",
                "hanzi": "找",
                "pinyin": "zhǎo",
                "hskLevel": 1,
                "meaningPt": "procurar",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Buscar.",
                characters: chars("找", [
                    "zhǎo"
                  ], [
                    1
                  ], [
                    "procurar"
                  ])
              },
              {
                "id": "s427-t15",
                "hanzi": "什么",
                "pinyin": "shénme",
                "hskLevel": 1,
                "meaningPt": "o quê",
                "partOfSpeech": "pronome interrogativo",
                "compoundLogicPt": "O quê.",
                characters: chars("什么", [
                    "shén",
                    "me"
                  ], [
                    1,
                    1
                  ], [
                    "quê",
                    "partícula"
                  ])
              },
              {
                "id": "s427-t16",
                "hanzi": "？",
                "isPunctuation": true
              },
              {
                "id": "s427-t17",
                "hanzi": "”",
                "isPunctuation": true
              }
            ]
          }
        ]
      },
      {
        "id": "ch-8",
        "chapterNumber": 8,
        "titleZh": "第八章：李云的心事",
        "titlePinyin": "Dì bā zhāng: Lǐ Yún de xīnshì",
        "titlePt": "Capítulo 8: A Confissão do Guerreiro",
        "summaryPt": "Segurando a xícara de chá quente, Li Yun abre seu coração ao mestre e confessa que sentiu medo na ponte de madeira, na floresta escura e na nevasca — acreditando ter falhado como guerreiro.",
        "estimatedMinutes": 2,
        "audioUrl": "/audio/stories/a-montanha-vazia-e-a-coragem/ch-8.mp3",
        "audioDurationMs": 0,
        "voiceName": "zh-CN-YunxiNeural",
        "hskDistribution": [],
        "keyVocabulary": [
          {
            "hanzi": "总是",
            "pinyin": "zǒngshì",
            "meaningPt": "sempre",
            "hskLevel": 2
          },
          {
            "hanzi": "过桥",
            "pinyin": "guò qiáo",
            "meaningPt": "atravessar a ponte",
            "hskLevel": 3
          },
          {
            "hanzi": "觉得",
            "pinyin": "juéde",
            "meaningPt": "achar / sentir",
            "hskLevel": 1
          },
          {
            "hanzi": "怎么",
            "pinyin": "zěnme",
            "meaningPt": "como",
            "hskLevel": 1
          },
          {
            "hanzi": "走上来",
            "pinyin": "zǒu shànglái",
            "meaningPt": "subir caminhando até aqui",
            "hskLevel": 1
          }
        ],
        "sentences": [
          {
            "id": "s428",
            "zhText": "李云看着手里的茶杯，说：“我心里总是很害怕，我想找勇气。”",
            "pinyinText": "Lǐ Yún kànzhe shǒulǐ de chábēi, shuō: “Wǒ xīnlǐ zǒngshì hěn hàipà, wǒ xiǎng zhǎo yǒngqì.”",
            "translationPt": "Li Yun, olhando para a xícara de chá em sua mão, disse: “Meu coração está sempre com muito medo; eu quero encontrar a coragem.”",
            "literalPt": "Li Yun olhando mão-dentro de chá-xícara, disse: “Eu coração-dentro sempre muito temo, eu quero procurar coragem.”",
            "grammarNotes": [
              {
                "pattern": "Modificador Espacial + 的 + Substantivo (手里的茶杯)",
                "explanationPt": "Para especificar 'a xícara que estava na mão', coloca-se 手里 ('na mão') + 的 antes de 茶杯.",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s428-t1",
                "hanzi": "李云",
                "pinyin": "Lǐ Yún",
                "hskLevel": 1,
                "meaningPt": "Li Yun",
                "partOfSpeech": "nome próprio",
                "compoundLogicPt": "Li Yun.",
                characters: chars("李云", [
                    "Lǐ",
                    "Yún"
                  ], [
                    1,
                    1
                  ], [
                    "Li",
                    "nuvem"
                  ])
              },
              {
                "id": "s428-t2",
                "hanzi": "看着",
                "pinyin": "kànzhe",
                "hskLevel": 2,
                "meaningPt": "olhando para",
                "partOfSpeech": "verbo + partícula",
                "compoundLogicPt": "看 + 着.",
                characters: chars("看着", [
                    "kàn",
                    "zhe"
                  ], [
                    1,
                    2
                  ], [
                    "olhar",
                    "contínuo"
                  ])
              },
              {
                "id": "s428-t3",
                "hanzi": "手里",
                "pinyin": "shǒulǐ",
                "hskLevel": 1,
                "meaningPt": "na mão",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "手 + 里.",
                characters: chars("手里", [
                    "shǒu",
                    "lǐ"
                  ], [
                    1,
                    1
                  ], [
                    "mão",
                    "dentro"
                  ])
              },
              {
                "id": "s428-t4",
                "hanzi": "的",
                "pinyin": "de",
                "hskLevel": 1,
                "meaningPt": "de",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Qualifica 茶杯.",
                characters: chars("的", [
                    "de"
                  ], [
                    1
                  ], [
                    "de"
                  ])
              },
              {
                "id": "s428-t5",
                "hanzi": "茶杯",
                "pinyin": "chábēi",
                "hskLevel": 1,
                "meaningPt": "xícara de chá",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "茶 (chá) + 杯 (xícara).",
                characters: chars("茶杯", [
                    "chá",
                    "bēi"
                  ], [
                    1,
                    1
                  ], [
                    "chá",
                    "xícara"
                  ])
              },
              {
                "id": "s428-t6",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s428-t7",
                "hanzi": "说",
                "pinyin": "shuō",
                "hskLevel": 1,
                "meaningPt": "disse",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Dizer.",
                characters: chars("说", [
                    "shuō"
                  ], [
                    1
                  ], [
                    "dizer"
                  ])
              },
              {
                "id": "s428-t8",
                "hanzi": "：",
                "isPunctuation": true
              },
              {
                "id": "s428-t9",
                "hanzi": "“",
                "isPunctuation": true
              },
              {
                "id": "s428-t10",
                "hanzi": "我",
                "pinyin": "wǒ",
                "hskLevel": 1,
                "meaningPt": "eu / meu",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Eu.",
                characters: chars("我", [
                    "wǒ"
                  ], [
                    1
                  ], [
                    "eu"
                  ])
              },
              {
                "id": "s428-t11",
                "hanzi": "心里",
                "pinyin": "xīnlǐ",
                "hskLevel": 1,
                "meaningPt": "no coração",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "心 + 里.",
                characters: chars("心里", [
                    "xīn",
                    "lǐ"
                  ], [
                    1,
                    1
                  ], [
                    "coração",
                    "dentro"
                  ])
              },
              {
                "id": "s428-t12",
                "hanzi": "总是",
                "pinyin": "zǒngshì",
                "hskLevel": 2,
                "meaningPt": "sempre",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "总 + 是.",
                characters: chars("总是", [
                    "zǒng",
                    "shì"
                  ], [
                    2,
                    1
                  ], [
                    "sempre",
                    "ser"
                  ])
              },
              {
                "id": "s428-t13",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Muito.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s428-t14",
                "hanzi": "害怕",
                "pinyin": "hàipà",
                "hskLevel": 2,
                "meaningPt": "com medo",
                "partOfSpeech": "verbo/adjetivo",
                "compoundLogicPt": "害 + 怕.",
                characters: chars("害怕", [
                    "hài",
                    "pà"
                  ], [
                    2,
                    2
                  ], [
                    "recear",
                    "temer"
                  ])
              },
              {
                "id": "s428-t15",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s428-t16",
                "hanzi": "我",
                "pinyin": "wǒ",
                "hskLevel": 1,
                "meaningPt": "eu",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Eu.",
                characters: chars("我", [
                    "wǒ"
                  ], [
                    1
                  ], [
                    "eu"
                  ])
              },
              {
                "id": "s428-t17",
                "hanzi": "想",
                "pinyin": "xiǎng",
                "hskLevel": 1,
                "meaningPt": "quero",
                "partOfSpeech": "verbo modal",
                "compoundLogicPt": "Querer.",
                characters: chars("想", [
                    "xiǎng"
                  ], [
                    1
                  ], [
                    "querer"
                  ])
              },
              {
                "id": "s428-t18",
                "hanzi": "找",
                "pinyin": "zhǎo",
                "hskLevel": 1,
                "meaningPt": "encontrar / procurar",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Buscar.",
                characters: chars("找", [
                    "zhǎo"
                  ], [
                    1
                  ], [
                    "procurar"
                  ])
              },
              {
                "id": "s428-t19",
                "hanzi": "勇气",
                "pinyin": "yǒngqì",
                "hskLevel": 3,
                "meaningPt": "a coragem",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "勇 + 气.",
                characters: chars("勇气", [
                    "yǒng",
                    "qì"
                  ], [
                    3,
                    1
                  ], [
                    "bravura",
                    "espírito"
                  ])
              },
              {
                "id": "s428-t20",
                "hanzi": "。",
                "isPunctuation": true
              },
              {
                "id": "s428-t21",
                "hanzi": "”",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s429",
            "zhText": "“过桥的时候我很怕，夜里在山林里我也很怕。”",
            "pinyinText": "“Guò qiáo de shíhou wǒ hěn pà, yèlǐ zài shānlín lǐ wǒ yě hěn pà.”",
            "translationPt": "“Quando atravessei a ponte eu senti muito medo, e à noite na floresta da montanha eu também senti muito medo.”",
            "literalPt": "“Atravessar ponte de momento eu muito temi, noite-dentro em montanha-bosque dentro eu também muito temi.”",
            "grammarNotes": [
              {
                "pattern": "Ordem Tempo + Lugar + Sujeito + Predicado",
                "explanationPt": "Em 夜里在山林里我也很怕, o tempo (夜里) e o lugar (在山林里) vêm no início para emoldurar a cena.",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s429-t1",
                "hanzi": "“",
                "isPunctuation": true
              },
              {
                "id": "s429-t2",
                "hanzi": "过",
                "pinyin": "guò",
                "hskLevel": 1,
                "meaningPt": "atravessar",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Cruzar.",
                characters: chars("过", [
                    "guò"
                  ], [
                    1
                  ], [
                    "atravessar"
                  ])
              },
              {
                "id": "s429-t3",
                "hanzi": "桥",
                "pinyin": "qiáo",
                "hskLevel": 3,
                "meaningPt": "a ponte",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Ponte.",
                characters: chars("桥", [
                    "qiáo"
                  ], [
                    3
                  ], [
                    "ponte"
                  ])
              },
              {
                "id": "s429-t4",
                "hanzi": "的时候",
                "pinyin": "de shíhou",
                "hskLevel": 1,
                "meaningPt": "quando",
                "partOfSpeech": "locução temporal",
                "compoundLogicPt": "No momento em que.",
                characters: chars("的时候", [
                    "de",
                    "shí",
                    "hou"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "de",
                    "tempo",
                    "momento"
                  ])
              },
              {
                "id": "s429-t5",
                "hanzi": "我",
                "pinyin": "wǒ",
                "hskLevel": 1,
                "meaningPt": "eu",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Eu.",
                characters: chars("我", [
                    "wǒ"
                  ], [
                    1
                  ], [
                    "eu"
                  ])
              },
              {
                "id": "s429-t6",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Muito.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s429-t7",
                "hanzi": "怕",
                "pinyin": "pà",
                "hskLevel": 2,
                "meaningPt": "senti medo",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Temer.",
                characters: chars("怕", [
                    "pà"
                  ], [
                    2
                  ], [
                    "temer"
                  ])
              },
              {
                "id": "s429-t8",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s429-t9",
                "hanzi": "夜里",
                "pinyin": "yèlǐ",
                "hskLevel": 2,
                "meaningPt": "à noite",
                "partOfSpeech": "locução temporal",
                "compoundLogicPt": "夜 + 里.",
                characters: chars("夜里", [
                    "yè",
                    "lǐ"
                  ], [
                    2,
                    1
                  ], [
                    "noite",
                    "dentro"
                  ])
              },
              {
                "id": "s429-t10",
                "hanzi": "在",
                "pinyin": "zài",
                "hskLevel": 1,
                "meaningPt": "em",
                "partOfSpeech": "preposição",
                "compoundLogicPt": "Em.",
                characters: chars("在", [
                    "zài"
                  ], [
                    1
                  ], [
                    "em"
                  ])
              },
              {
                "id": "s429-t11",
                "hanzi": "山林",
                "pinyin": "shānlín",
                "hskLevel": 1,
                "meaningPt": "floresta da montanha",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "山 + 林.",
                characters: chars("山林", [
                    "shān",
                    "lín"
                  ], [
                    1,
                    1
                  ], [
                    "montanha",
                    "floresta"
                  ])
              },
              {
                "id": "s429-t12",
                "hanzi": "里",
                "pinyin": "lǐ",
                "hskLevel": 1,
                "meaningPt": "dentro",
                "partOfSpeech": "posposição",
                "compoundLogicPt": "Interior.",
                characters: chars("里", [
                    "lǐ"
                  ], [
                    1
                  ], [
                    "dentro"
                  ])
              },
              {
                "id": "s429-t13",
                "hanzi": "我",
                "pinyin": "wǒ",
                "hskLevel": 1,
                "meaningPt": "eu",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Eu.",
                characters: chars("我", [
                    "wǒ"
                  ], [
                    1
                  ], [
                    "eu"
                  ])
              },
              {
                "id": "s429-t14",
                "hanzi": "也",
                "pinyin": "yě",
                "hskLevel": 1,
                "meaningPt": "também",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Também.",
                characters: chars("也", [
                    "yě"
                  ], [
                    1
                  ], [
                    "também"
                  ])
              },
              {
                "id": "s429-t15",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Muito.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s429-t16",
                "hanzi": "怕",
                "pinyin": "pà",
                "hskLevel": 2,
                "meaningPt": "senti medo",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Temer.",
                characters: chars("怕", [
                    "pà"
                  ], [
                    2
                  ], [
                    "temer"
                  ])
              },
              {
                "id": "s429-t17",
                "hanzi": "。",
                "isPunctuation": true
              },
              {
                "id": "s429-t18",
                "hanzi": "”",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s430",
            "zhText": "老师听完，问他：“你这么害怕，那你是怎么走上来的？”",
            "pinyinText": "Lǎoshī tīngwán, wèn tā: “Nǐ zhème hàipà, nà nǐ shì zěnme zǒu shànglái de?”",
            "translationPt": "Após terminar de ouvir, o mestre perguntou-lhe: “Se você estava com tanto medo, então como foi que você subiu caminhando até aqui?”",
            "literalPt": "Mestre ouviu-terminando, perguntou ele: “Você tão temeroso, então você é como caminhou subindo-vindo [de]?”",
            "grammarNotes": [
              {
                "pattern": "Estrutura de ênfase 是...的 (shì zěnme zǒu shànglái de)",
                "explanationPt": "Quando uma ação já aconteceu (ele já subiu a montanha) e queremos perguntar COMO ela foi realizada, usamos 是 + 怎么 + Verbo + 的.",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s430-t1",
                "hanzi": "老师",
                "pinyin": "lǎoshī",
                "hskLevel": 1,
                "meaningPt": "o mestre",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Mestre.",
                characters: chars("老师", [
                    "lǎo",
                    "shī"
                  ], [
                    1,
                    1
                  ], [
                    "sábio",
                    "mestre"
                  ])
              },
              {
                "id": "s430-t2",
                "hanzi": "听完",
                "pinyin": "tīngwán",
                "hskLevel": 1,
                "meaningPt": "terminou de ouvir",
                "partOfSpeech": "verbo + resultado",
                "compoundLogicPt": "听 (ouvir) + 完 (terminar/concluir).",
                characters: chars("听完", [
                    "tīng",
                    "wán"
                  ], [
                    1,
                    1
                  ], [
                    "ouvir",
                    "terminar"
                  ])
              },
              {
                "id": "s430-t3",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s430-t4",
                "hanzi": "问",
                "pinyin": "wèn",
                "hskLevel": 1,
                "meaningPt": "perguntou a",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Perguntar.",
                characters: chars("问", [
                    "wèn"
                  ], [
                    1
                  ], [
                    "perguntar"
                  ])
              },
              {
                "id": "s430-t5",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s430-t6",
                "hanzi": "：",
                "isPunctuation": true
              },
              {
                "id": "s430-t7",
                "hanzi": "“",
                "isPunctuation": true
              },
              {
                "id": "s430-t8",
                "hanzi": "你",
                "pinyin": "nǐ",
                "hskLevel": 1,
                "meaningPt": "você",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Você.",
                characters: chars("你", [
                    "nǐ"
                  ], [
                    1
                  ], [
                    "você"
                  ])
              },
              {
                "id": "s430-t9",
                "hanzi": "这么",
                "pinyin": "zhème",
                "hskLevel": 2,
                "meaningPt": "tão",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Tanto assim.",
                characters: chars("这么", [
                    "zhè",
                    "me"
                  ], [
                    1,
                    1
                  ], [
                    "este",
                    "modo"
                  ])
              },
              {
                "id": "s430-t10",
                "hanzi": "害怕",
                "pinyin": "hàipà",
                "hskLevel": 2,
                "meaningPt": "com medo",
                "partOfSpeech": "verbo/adjetivo",
                "compoundLogicPt": "Temer.",
                characters: chars("害怕", [
                    "hài",
                    "pà"
                  ], [
                    2,
                    2
                  ], [
                    "recear",
                    "temer"
                  ])
              },
              {
                "id": "s430-t11",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s430-t12",
                "hanzi": "那",
                "pinyin": "nà",
                "hskLevel": 1,
                "meaningPt": "então",
                "partOfSpeech": "conjunção",
                "compoundLogicPt": "Nesse caso / então.",
                characters: chars("那", [
                    "nà"
                  ], [
                    1
                  ], [
                    "então"
                  ])
              },
              {
                "id": "s430-t13",
                "hanzi": "你",
                "pinyin": "nǐ",
                "hskLevel": 1,
                "meaningPt": "você",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Você.",
                characters: chars("你", [
                    "nǐ"
                  ], [
                    1
                  ], [
                    "você"
                  ])
              },
              {
                "id": "s430-t14",
                "hanzi": "是",
                "pinyin": "shì",
                "hskLevel": 1,
                "meaningPt": "foi (ênfase 是...的)",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Abre a estrutura 是...的.",
                characters: chars("是", [
                    "shì"
                  ], [
                    1
                  ], [
                    "ser"
                  ])
              },
              {
                "id": "s430-t15",
                "hanzi": "怎么",
                "pinyin": "zěnme",
                "hskLevel": 1,
                "meaningPt": "como",
                "partOfSpeech": "pronome interrogativo",
                "compoundLogicPt": "De que maneira.",
                characters: chars("怎么", [
                    "zěn",
                    "me"
                  ], [
                    1,
                    1
                  ], [
                    "como",
                    "partícula"
                  ])
              },
              {
                "id": "s430-t16",
                "hanzi": "走上来",
                "pinyin": "zǒu shànglái",
                "hskLevel": 1,
                "meaningPt": "subiu caminhando até aqui",
                "partOfSpeech": "verbo + direcional composto",
                "compoundLogicPt": "走 (caminhar) + 上 (subir) + 来 (em direção a quem fala, no topo).",
                characters: chars("走上来", [
                    "zǒu",
                    "shàng",
                    "lái"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "andar",
                    "subir",
                    "vir"
                  ])
              },
              {
                "id": "s430-t17",
                "hanzi": "的",
                "pinyin": "de",
                "hskLevel": 1,
                "meaningPt": "partícula final (是...的)",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Fecha a estrutura de foco no modo.",
                characters: chars("的", [
                    "de"
                  ], [
                    1
                  ], [
                    "partícula"
                  ])
              },
              {
                "id": "s430-t18",
                "hanzi": "？",
                "isPunctuation": true
              },
              {
                "id": "s430-t19",
                "hanzi": "”",
                "isPunctuation": true
              }
            ]
          }
        ]
      },
      {
        "id": "ch-9",
        "chapterNumber": 9,
        "titleZh": "第九章：雪里的石头",
        "titlePinyin": "Dì jiǔ zhāng: Xuě lǐ de shítou",
        "titlePt": "Capítulo 9: A Pedra na Neve e a Revelação",
        "summaryPt": "O mestre aponta para uma pedra pousada na neve e faz a pergunta que transforma a visão de Li Yun: uma pedra não sente frio nem medo, mas ninguém chama uma pedra de corajosa.",
        "estimatedMinutes": 2,
        "audioUrl": "/audio/stories/a-montanha-vazia-e-a-coragem/ch-9.mp3",
        "audioDurationMs": 0,
        "voiceName": "zh-CN-YunxiNeural",
        "hskDistribution": [],
        "keyVocabulary": [
          {
            "hanzi": "一块石头",
            "pinyin": "yí kuài shítou",
            "meaningPt": "uma pedra",
            "hskLevel": 2
          },
          {
            "hanzi": "不怕",
            "pinyin": "bú pà",
            "meaningPt": "não temer",
            "hskLevel": 2
          },
          {
            "hanzi": "往前走",
            "pinyin": "wǎng qián zǒu",
            "meaningPt": "caminhar para a frente",
            "hskLevel": 2
          },
          {
            "hanzi": "才是",
            "pinyin": "cái shì",
            "meaningPt": "é que é de verdade",
            "hskLevel": 2
          },
          {
            "hanzi": "笑着",
            "pinyin": "xiàozhe",
            "meaningPt": "sorrindo",
            "hskLevel": 2
          }
        ],
        "sentences": [
          {
            "id": "s431",
            "zhText": "老师看着雪里的一块石头，问：“那块石头怕冷吗？”",
            "pinyinText": "Lǎoshī kànzhe xuě lǐ de yí kuài shítou, wèn: “Nà kuài shítou pà lěng ma?”",
            "translationPt": "O mestre, olhando para uma pedra na neve, perguntou: “Aquela pedra tem medo do frio?”",
            "literalPt": "Mestre olhando neve dentro de um [pedaço] pedra, perguntou: “Aquele [pedaço] pedra teme frio [pergunta]?”",
            "grammarNotes": [
              {
                "pattern": "Classificador 块 (kuài) para pedras e blocos",
                "explanationPt": "Para pedras e pedaços sólidos, usa-se o classificador 块 (kuài): 一块石头 (uma pedra).",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s431-t1",
                "hanzi": "老师",
                "pinyin": "lǎoshī",
                "hskLevel": 1,
                "meaningPt": "o mestre",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "老 + 师.",
                characters: chars("老师", [
                    "lǎo",
                    "shī"
                  ], [
                    1,
                    1
                  ], [
                    "velho",
                    "mestre"
                  ])
              },
              {
                "id": "s431-t2",
                "hanzi": "看着",
                "pinyin": "kànzhe",
                "hskLevel": 2,
                "meaningPt": "olhando para",
                "partOfSpeech": "verbo + partícula",
                "compoundLogicPt": "看 + 着 (zhe).",
                characters: chars("看着", [
                    "kàn",
                    "zhe"
                  ], [
                    1,
                    2
                  ], [
                    "olhar",
                    "contínuo"
                  ])
              },
              {
                "id": "s431-t3",
                "hanzi": "雪里",
                "pinyin": "xuě lǐ",
                "hskLevel": 2,
                "meaningPt": "na neve",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "雪 + 里.",
                characters: chars("雪里", [
                    "xuě",
                    "lǐ"
                  ], [
                    2,
                    1
                  ], [
                    "neve",
                    "dentro"
                  ])
              },
              {
                "id": "s431-t4",
                "hanzi": "的",
                "pinyin": "de",
                "hskLevel": 1,
                "meaningPt": "de",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Conecta 雪里 a 石头.",
                characters: chars("的", [
                    "de"
                  ], [
                    1
                  ], [
                    "de"
                  ])
              },
              {
                "id": "s431-t5",
                "hanzi": "一块",
                "pinyin": "yí kuài",
                "hskLevel": 1,
                "meaningPt": "uma (pedra)",
                "partOfSpeech": "numeral + classificador",
                "compoundLogicPt": "一 + 块.",
                characters: chars("一块", [
                    "yī",
                    "kuài"
                  ], [
                    1,
                    1
                  ], [
                    "um",
                    "pedaço/bloco"
                  ])
              },
              {
                "id": "s431-t6",
                "hanzi": "石头",
                "pinyin": "shítou",
                "hskLevel": 2,
                "meaningPt": "pedra",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "石 (rocha) + 头.",
                characters: chars("石头", [
                    "shí",
                    "tou"
                  ], [
                    2,
                    1
                  ], [
                    "pedra",
                    "sufixo"
                  ])
              },
              {
                "id": "s431-t7",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s431-t8",
                "hanzi": "问",
                "pinyin": "wèn",
                "hskLevel": 1,
                "meaningPt": "perguntou",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Perguntar.",
                characters: chars("问", [
                    "wèn"
                  ], [
                    1
                  ], [
                    "perguntar"
                  ])
              },
              {
                "id": "s431-t9",
                "hanzi": "：",
                "isPunctuation": true
              },
              {
                "id": "s431-t10",
                "hanzi": "“",
                "isPunctuation": true
              },
              {
                "id": "s431-t11",
                "hanzi": "那块",
                "pinyin": "nà kuài",
                "hskLevel": 1,
                "meaningPt": "aquela",
                "partOfSpeech": "demonstrativo + classificador",
                "compoundLogicPt": "那 + 块.",
                characters: chars("那块", [
                    "nà",
                    "kuài"
                  ], [
                    1,
                    1
                  ], [
                    "aquela",
                    "pedra"
                  ])
              },
              {
                "id": "s431-t12",
                "hanzi": "石头",
                "pinyin": "shítou",
                "hskLevel": 2,
                "meaningPt": "pedra",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Pedra.",
                characters: chars("石头", [
                    "shí",
                    "tou"
                  ], [
                    2,
                    1
                  ], [
                    "pedra",
                    "sufixo"
                  ])
              },
              {
                "id": "s431-t13",
                "hanzi": "怕",
                "pinyin": "pà",
                "hskLevel": 2,
                "meaningPt": "teme",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Temer.",
                characters: chars("怕", [
                    "pà"
                  ], [
                    2
                  ], [
                    "temer"
                  ])
              },
              {
                "id": "s431-t14",
                "hanzi": "冷",
                "pinyin": "lěng",
                "hskLevel": 1,
                "meaningPt": "o frio",
                "partOfSpeech": "substantivo/adjetivo",
                "compoundLogicPt": "Frio.",
                characters: chars("冷", [
                    "lěng"
                  ], [
                    1
                  ], [
                    "frio"
                  ])
              },
              {
                "id": "s431-t15",
                "hanzi": "吗",
                "pinyin": "ma",
                "hskLevel": 1,
                "meaningPt": "?",
                "partOfSpeech": "partícula interrogativa",
                "compoundLogicPt": "Pergunta sim/não.",
                characters: chars("吗", [
                    "ma"
                  ], [
                    1
                  ], [
                    "pergunta"
                  ])
              },
              {
                "id": "s431-t16",
                "hanzi": "？",
                "isPunctuation": true
              },
              {
                "id": "s431-t17",
                "hanzi": "”",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s432",
            "zhText": "李云说：“石头没有心，它不怕冷，但它也不是真有勇气。”",
            "pinyinText": "Lǐ Yún shuō: “Shítou méiyǒu xīn, tā bú pà lěng, dàn tā yě bú shì zhēn yǒu yǒngqì.”",
            "translationPt": "Li Yun respondeu: “A pedra não tem coração; ela não tem medo do frio, mas ela também não tem coragem de verdade.”",
            "literalPt": "Li Yun disse: “Pedra não-tem coração, ela não teme frio, mas ela também não é realmente ter coragem.”",
            "grammarNotes": [
              {
                "pattern": "Tone Sandhi de 不 (bù → bú antes de 4º tom)",
                "explanationPt": "Em 不怕 (bú pà) e 不是 (bú shì), o 不 sobe para o 2º tom antes de sílabas de 4º tom.",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s432-t1",
                "hanzi": "李云",
                "pinyin": "Lǐ Yún",
                "hskLevel": 1,
                "meaningPt": "Li Yun",
                "partOfSpeech": "nome próprio",
                "compoundLogicPt": "Li Yun.",
                characters: chars("李云", [
                    "Lǐ",
                    "Yún"
                  ], [
                    1,
                    1
                  ], [
                    "Li",
                    "nuvem"
                  ])
              },
              {
                "id": "s432-t2",
                "hanzi": "说",
                "pinyin": "shuō",
                "hskLevel": 1,
                "meaningPt": "disse",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Dizer.",
                characters: chars("说", [
                    "shuō"
                  ], [
                    1
                  ], [
                    "dizer"
                  ])
              },
              {
                "id": "s432-t3",
                "hanzi": "：",
                "isPunctuation": true
              },
              {
                "id": "s432-t4",
                "hanzi": "“",
                "isPunctuation": true
              },
              {
                "id": "s432-t5",
                "hanzi": "石头",
                "pinyin": "shítou",
                "hskLevel": 2,
                "meaningPt": "a pedra",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "石 + 头.",
                characters: chars("石头", [
                    "shí",
                    "tou"
                  ], [
                    2,
                    1
                  ], [
                    "pedra",
                    "sufixo"
                  ])
              },
              {
                "id": "s432-t6",
                "hanzi": "没有",
                "pinyin": "méiyǒu",
                "hskLevel": 1,
                "meaningPt": "não tem",
                "partOfSpeech": "negação + verbo",
                "compoundLogicPt": "Não possui.",
                characters: chars("没有", [
                    "méi",
                    "yǒu"
                  ], [
                    1,
                    1
                  ], [
                    "não",
                    "ter"
                  ])
              },
              {
                "id": "s432-t7",
                "hanzi": "心",
                "pinyin": "xīn",
                "hskLevel": 1,
                "meaningPt": "coração",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Coração / alma.",
                characters: chars("心", [
                    "xīn"
                  ], [
                    1
                  ], [
                    "coração"
                  ])
              },
              {
                "id": "s432-t8",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s432-t9",
                "hanzi": "它",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ela (a pedra)",
                "partOfSpeech": "pronome neutro",
                "compoundLogicPt": "Pronome para objetos.",
                characters: chars("它", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ela"
                  ])
              },
              {
                "id": "s432-t10",
                "hanzi": "不怕",
                "pinyin": "bú pà",
                "hskLevel": 2,
                "meaningPt": "não teme",
                "partOfSpeech": "negação + verbo",
                "compoundLogicPt": "不 (bú) + 怕.",
                characters: chars("不怕", [
                    "bù",
                    "pà"
                  ], [
                    1,
                    2
                  ], [
                    "não",
                    "temer"
                  ])
              },
              {
                "id": "s432-t11",
                "hanzi": "冷",
                "pinyin": "lěng",
                "hskLevel": 1,
                "meaningPt": "o frio",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Frio.",
                characters: chars("冷", [
                    "lěng"
                  ], [
                    1
                  ], [
                    "frio"
                  ])
              },
              {
                "id": "s432-t12",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s432-t13",
                "hanzi": "但",
                "pinyin": "dàn",
                "hskLevel": 1,
                "meaningPt": "mas",
                "partOfSpeech": "conjunção",
                "compoundLogicPt": "Mas.",
                characters: chars("但", [
                    "dàn"
                  ], [
                    1
                  ], [
                    "mas"
                  ])
              },
              {
                "id": "s432-t14",
                "hanzi": "它",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ela",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "A pedra.",
                characters: chars("它", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ela"
                  ])
              },
              {
                "id": "s432-t15",
                "hanzi": "也",
                "pinyin": "yě",
                "hskLevel": 1,
                "meaningPt": "também",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Também.",
                characters: chars("也", [
                    "yě"
                  ], [
                    1
                  ], [
                    "também"
                  ])
              },
              {
                "id": "s432-t16",
                "hanzi": "不是",
                "pinyin": "bú shì",
                "hskLevel": 1,
                "meaningPt": "não é",
                "partOfSpeech": "negação + verbo",
                "compoundLogicPt": "不 (bú) + 是.",
                characters: chars("不是", [
                    "bù",
                    "shì"
                  ], [
                    1,
                    1
                  ], [
                    "não",
                    "ser"
                  ])
              },
              {
                "id": "s432-t17",
                "hanzi": "真",
                "pinyin": "zhēn",
                "hskLevel": 1,
                "meaningPt": "de verdade",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Realmente.",
                characters: chars("真", [
                    "zhēn"
                  ], [
                    1
                  ], [
                    "realmente"
                  ])
              },
              {
                "id": "s432-t18",
                "hanzi": "有",
                "pinyin": "yǒu",
                "hskLevel": 1,
                "meaningPt": "ter",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Ter.",
                characters: chars("有", [
                    "yǒu"
                  ], [
                    1
                  ], [
                    "ter"
                  ])
              },
              {
                "id": "s432-t19",
                "hanzi": "勇气",
                "pinyin": "yǒngqì",
                "hskLevel": 3,
                "meaningPt": "coragem",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "勇 + 气.",
                characters: chars("勇气", [
                    "yǒng",
                    "qì"
                  ], [
                    3,
                    1
                  ], [
                    "bravura",
                    "espírito"
                  ])
              },
              {
                "id": "s432-t20",
                "hanzi": "。",
                "isPunctuation": true
              },
              {
                "id": "s432-t21",
                "hanzi": "”",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s433",
            "zhText": "老师笑着对他说：“对，不怕不是勇气；你心里怕，还往前走，这才是它。”",
            "pinyinText": "Lǎoshī xiàozhe duì tā shuō: “Duì, bú pà bú shì yǒngqì; nǐ xīnlǐ pà, hái wǎng qián zǒu, zhè cái shì tā.”",
            "translationPt": "O mestre disse a ele sorrindo: “Exato! Não sentir medo não é coragem; você sentir medo no coração e, ainda assim, caminhar para a frente — isso, sim, é que é ela.”",
            "literalPt": "Mestre sorrindo para ele disse: “Certo, não temer não é coragem; você coração-dentro temer, ainda rumo frente caminhar, isto apenas-então é ela.”",
            "grammarNotes": [
              {
                "pattern": "这才是... (zhè cái shì...) = 'Isso, sim, é que é...'",
                "explanationPt": "O advérbio 才 (cái) antes de 是 destaca a condição essencial para que a virtude exista.",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s433-t1",
                "hanzi": "老师",
                "pinyin": "lǎoshī",
                "hskLevel": 1,
                "meaningPt": "o mestre",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Mestre.",
                characters: chars("老师", [
                    "lǎo",
                    "shī"
                  ], [
                    1,
                    1
                  ], [
                    "velho",
                    "mestre"
                  ])
              },
              {
                "id": "s433-t2",
                "hanzi": "笑着",
                "pinyin": "xiàozhe",
                "hskLevel": 2,
                "meaningPt": "sorrindo",
                "partOfSpeech": "verbo + partícula",
                "compoundLogicPt": "笑 + 着.",
                characters: chars("笑着", [
                    "xiào",
                    "zhe"
                  ], [
                    2,
                    2
                  ], [
                    "sorrir",
                    "contínuo"
                  ])
              },
              {
                "id": "s433-t3",
                "hanzi": "对",
                "pinyin": "duì",
                "hskLevel": 1,
                "meaningPt": "para",
                "partOfSpeech": "preposição",
                "compoundLogicPt": "Para.",
                characters: chars("对", [
                    "duì"
                  ], [
                    1
                  ], [
                    "para"
                  ])
              },
              {
                "id": "s433-t4",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s433-t5",
                "hanzi": "说",
                "pinyin": "shuō",
                "hskLevel": 1,
                "meaningPt": "disse",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Dizer.",
                characters: chars("说", [
                    "shuō"
                  ], [
                    1
                  ], [
                    "dizer"
                  ])
              },
              {
                "id": "s433-t6",
                "hanzi": "：",
                "isPunctuation": true
              },
              {
                "id": "s433-t7",
                "hanzi": "“",
                "isPunctuation": true
              },
              {
                "id": "s433-t8",
                "hanzi": "对",
                "pinyin": "duì",
                "hskLevel": 1,
                "meaningPt": "exato / correto",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "Certo.",
                characters: chars("对", [
                    "duì"
                  ], [
                    1
                  ], [
                    "certo"
                  ])
              },
              {
                "id": "s433-t9",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s433-t10",
                "hanzi": "不怕",
                "pinyin": "bú pà",
                "hskLevel": 2,
                "meaningPt": "não ter medo",
                "partOfSpeech": "locução verbal",
                "compoundLogicPt": "不 + 怕.",
                characters: chars("不怕", [
                    "bù",
                    "pà"
                  ], [
                    1,
                    2
                  ], [
                    "não",
                    "temer"
                  ])
              },
              {
                "id": "s433-t11",
                "hanzi": "不是",
                "pinyin": "bú shì",
                "hskLevel": 1,
                "meaningPt": "não é",
                "partOfSpeech": "negação + verbo",
                "compoundLogicPt": "不 + 是.",
                characters: chars("不是", [
                    "bù",
                    "shì"
                  ], [
                    1,
                    1
                  ], [
                    "não",
                    "ser"
                  ])
              },
              {
                "id": "s433-t12",
                "hanzi": "勇气",
                "pinyin": "yǒngqì",
                "hskLevel": 3,
                "meaningPt": "coragem",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "勇 + 气.",
                characters: chars("勇气", [
                    "yǒng",
                    "qì"
                  ], [
                    3,
                    1
                  ], [
                    "bravura",
                    "energia"
                  ])
              },
              {
                "id": "s433-t13",
                "hanzi": "；",
                "isPunctuation": true
              },
              {
                "id": "s433-t14",
                "hanzi": "你",
                "pinyin": "nǐ",
                "hskLevel": 1,
                "meaningPt": "você",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Você.",
                characters: chars("你", [
                    "nǐ"
                  ], [
                    1
                  ], [
                    "você"
                  ])
              },
              {
                "id": "s433-t15",
                "hanzi": "心里",
                "pinyin": "xīnlǐ",
                "hskLevel": 1,
                "meaningPt": "no coração",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "心 + 里.",
                characters: chars("心里", [
                    "xīn",
                    "lǐ"
                  ], [
                    1,
                    1
                  ], [
                    "coração",
                    "dentro"
                  ])
              },
              {
                "id": "s433-t16",
                "hanzi": "怕",
                "pinyin": "pà",
                "hskLevel": 2,
                "meaningPt": "sentir medo",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Temer.",
                characters: chars("怕", [
                    "pà"
                  ], [
                    2
                  ], [
                    "temer"
                  ])
              },
              {
                "id": "s433-t17",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s433-t18",
                "hanzi": "还",
                "pinyin": "hái",
                "hskLevel": 1,
                "meaningPt": "e ainda assim",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Ainda assim.",
                characters: chars("还", [
                    "hái"
                  ], [
                    1
                  ], [
                    "ainda"
                  ])
              },
              {
                "id": "s433-t19",
                "hanzi": "往前",
                "pinyin": "wǎng qián",
                "hskLevel": 2,
                "meaningPt": "para a frente",
                "partOfSpeech": "preposição + direção",
                "compoundLogicPt": "往 + 前.",
                characters: chars("往前", [
                    "wǎng",
                    "qián"
                  ], [
                    2,
                    1
                  ], [
                    "rumo a",
                    "frente"
                  ])
              },
              {
                "id": "s433-t20",
                "hanzi": "走",
                "pinyin": "zǒu",
                "hskLevel": 1,
                "meaningPt": "caminhar / avançar",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Dar o passo.",
                characters: chars("走", [
                    "zǒu"
                  ], [
                    1
                  ], [
                    "caminhar"
                  ])
              },
              {
                "id": "s433-t21",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s433-t22",
                "hanzi": "这",
                "pinyin": "zhè",
                "hskLevel": 1,
                "meaningPt": "isso",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Isto.",
                characters: chars("这", [
                    "zhè"
                  ], [
                    1
                  ], [
                    "isto"
                  ])
              },
              {
                "id": "s433-t23",
                "hanzi": "才是",
                "pinyin": "cái shì",
                "hskLevel": 2,
                "meaningPt": "é que é de verdade",
                "partOfSpeech": "advérbio + verbo",
                "compoundLogicPt": "才 + 是.",
                characters: chars("才是", [
                    "cái",
                    "shì"
                  ], [
                    2,
                    1
                  ], [
                    "apenas então",
                    "ser"
                  ])
              },
              {
                "id": "s433-t24",
                "hanzi": "它",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ela (a coragem)",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Retoma 勇气.",
                characters: chars("它", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ela"
                  ])
              },
              {
                "id": "s433-t25",
                "hanzi": "。",
                "isPunctuation": true
              },
              {
                "id": "s433-t26",
                "hanzi": "”",
                "isPunctuation": true
              }
            ]
          }
        ]
      },
      {
        "id": "ch-10",
        "chapterNumber": 10,
        "titleZh": "第十章：下山的路",
        "titlePinyin": "Dì shí zhāng: Xiàshān de lù",
        "titlePt": "Capítulo 10: O Caminho de Volta da Montanha",
        "summaryPt": "Li Yun finalmente compreende que a coragem nunca esteve fora dele: foi ela quem o guiou na ponte, na noite escura e no resgate na neve. Com o coração em paz, o guerreiro desce a montanha.",
        "estimatedMinutes": 2,
        "audioUrl": "/audio/stories/a-montanha-vazia-e-a-coragem/ch-10.mp3",
        "audioDurationMs": 0,
        "voiceName": "zh-CN-YunxiNeural",
        "hskDistribution": [],
        "keyVocabulary": [
          {
            "hanzi": "明白",
            "pinyin": "míngbai",
            "meaningPt": "compreender claramente",
            "hskLevel": 2
          },
          {
            "hanzi": "一直",
            "pinyin": "yìzhí",
            "meaningPt": "sempre / desde o início",
            "hskLevel": 2
          },
          {
            "hanzi": "下山",
            "pinyin": "xiàshān",
            "meaningPt": "descer a montanha",
            "hskLevel": 1
          },
          {
            "hanzi": "高兴",
            "pinyin": "gāoxìng",
            "meaningPt": "feliz / sereno",
            "hskLevel": 1
          },
          {
            "hanzi": "老朋友",
            "pinyin": "lǎo péngyou",
            "meaningPt": "velho amigo",
            "hskLevel": 1
          }
        ],
        "sentences": [
          {
            "id": "s434",
            "zhText": "李云明白了：走上雪山、救那个人，勇气一直都在他心里。",
            "pinyinText": "Lǐ Yún míngbai le: zǒushàng xuěshān, jiù nà gè rén, yǒngqì yìzhí dōu zài tā xīnlǐ.",
            "translationPt": "Li Yun compreendeu tudo: ao subir a montanha de neve e ao salvar aquela pessoa, a coragem sempre esteve dentro do seu próprio coração.",
            "literalPt": "Li Yun compreendeu [mudança]: caminhar-subindo neve-montanha, salvar aquela pessoa, coragem sempre toda estava ele coração-dentro.",
            "grammarNotes": [
              {
                "pattern": "一直都在 (yìzhí dōu zài) + Local = 'sempre esteve em...'",
                "explanationPt": "Expressa que aquilo que o herói buscava no mundo exterior já habitava nele desde o primeiro passo.",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s434-t1",
                "hanzi": "李云",
                "pinyin": "Lǐ Yún",
                "hskLevel": 1,
                "meaningPt": "Li Yun",
                "partOfSpeech": "nome próprio",
                "compoundLogicPt": "Li Yun.",
                characters: chars("李云", [
                    "Lǐ",
                    "Yún"
                  ], [
                    1,
                    1
                  ], [
                    "Li",
                    "nuvem"
                  ])
              },
              {
                "id": "s434-t2",
                "hanzi": "明白",
                "pinyin": "míngbai",
                "hskLevel": 2,
                "meaningPt": "compreendeu",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "明 (claro) + 白 (nítido).",
                characters: chars("明白", [
                    "míng",
                    "bai"
                  ], [
                    1,
                    1
                  ], [
                    "claro",
                    "branco"
                  ])
              },
              {
                "id": "s434-t3",
                "hanzi": "了",
                "pinyin": "le",
                "hskLevel": 1,
                "meaningPt": "despertar de consciência",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Mudança interior.",
                characters: chars("了", [
                    "le"
                  ], [
                    1
                  ], [
                    "concluído"
                  ])
              },
              {
                "id": "s434-t4",
                "hanzi": "：",
                "isPunctuation": true
              },
              {
                "id": "s434-t5",
                "hanzi": "走上",
                "pinyin": "zǒushàng",
                "hskLevel": 1,
                "meaningPt": "subir caminhando",
                "partOfSpeech": "verbo + direção",
                "compoundLogicPt": "走 + 上.",
                characters: chars("走上", [
                    "zǒu",
                    "shàng"
                  ], [
                    1,
                    1
                  ], [
                    "caminhar",
                    "subir"
                  ])
              },
              {
                "id": "s434-t6",
                "hanzi": "雪山",
                "pinyin": "xuěshān",
                "hskLevel": 2,
                "meaningPt": "a montanha de neve",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "雪 + 山.",
                characters: chars("雪山", [
                    "xuě",
                    "shān"
                  ], [
                    2,
                    1
                  ], [
                    "neve",
                    "montanha"
                  ])
              },
              {
                "id": "s434-t7",
                "hanzi": "、",
                "isPunctuation": true
              },
              {
                "id": "s434-t8",
                "hanzi": "救",
                "pinyin": "jiù",
                "hskLevel": 2,
                "meaningPt": "salvar",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Socorrer.",
                characters: chars("救", [
                    "jiù"
                  ], [
                    2
                  ], [
                    "salvar"
                  ])
              },
              {
                "id": "s434-t9",
                "hanzi": "那个",
                "pinyin": "nà gè",
                "hskLevel": 1,
                "meaningPt": "aquela",
                "partOfSpeech": "demonstrativo + classificador",
                "compoundLogicPt": "那 + 个.",
                characters: chars("那个", [
                    "nà",
                    "gè"
                  ], [
                    1,
                    1
                  ], [
                    "aquela",
                    "classificador"
                  ])
              },
              {
                "id": "s434-t10",
                "hanzi": "人",
                "pinyin": "rén",
                "hskLevel": 1,
                "meaningPt": "pessoa",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Viajante.",
                characters: chars("人", [
                    "rén"
                  ], [
                    1
                  ], [
                    "pessoa"
                  ])
              },
              {
                "id": "s434-t11",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s434-t12",
                "hanzi": "勇气",
                "pinyin": "yǒngqì",
                "hskLevel": 3,
                "meaningPt": "a coragem",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "勇 + 气.",
                characters: chars("勇气", [
                    "yǒng",
                    "qì"
                  ], [
                    3,
                    1
                  ], [
                    "bravura",
                    "espírito"
                  ])
              },
              {
                "id": "s434-t13",
                "hanzi": "一直",
                "pinyin": "yìzhí",
                "hskLevel": 2,
                "meaningPt": "sempre / o tempo todo",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "一 + 直.",
                characters: chars("一直", [
                    "yī",
                    "zhí"
                  ], [
                    1,
                    2
                  ], [
                    "um",
                    "direto"
                  ])
              },
              {
                "id": "s434-t14",
                "hanzi": "都",
                "pinyin": "dōu",
                "hskLevel": 1,
                "meaningPt": "sempre",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Ênfase.",
                characters: chars("都", [
                    "dōu"
                  ], [
                    1
                  ], [
                    "sempre"
                  ])
              },
              {
                "id": "s434-t15",
                "hanzi": "在",
                "pinyin": "zài",
                "hskLevel": 1,
                "meaningPt": "esteve em",
                "partOfSpeech": "verbo locativo",
                "compoundLogicPt": "Estar em.",
                characters: chars("在", [
                    "zài"
                  ], [
                    1
                  ], [
                    "estar em"
                  ])
              },
              {
                "id": "s434-t16",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "seu",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Dele.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s434-t17",
                "hanzi": "心里",
                "pinyin": "xīnlǐ",
                "hskLevel": 1,
                "meaningPt": "no coração",
                "partOfSpeech": "locução espacial",
                "compoundLogicPt": "心 + 里.",
                characters: chars("心里", [
                    "xīn",
                    "lǐ"
                  ], [
                    1,
                    1
                  ], [
                    "coração",
                    "dentro"
                  ])
              },
              {
                "id": "s434-t18",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s435",
            "zhText": "他喝完那杯热茶，高兴地对老师说：“谢谢您，老师！”",
            "pinyinText": "Tā hēwán nà bēi rè chá, gāoxìng de duì lǎoshī shuō: “Xièxie nín, lǎoshī!”",
            "translationPt": "Ele terminou de beber aquela xícara de chá quente e disse alegremente ao mestre: “Muito obrigado ao senhor, mestre!”",
            "literalPt": "Ele bebeu-terminando aquela xícara quente chá, feliz-mente para mestre disse: “Obrigado senhor, mestre!”",
            "grammarNotes": [
              {
                "pattern": "Pronome de respeito 您 (nín) = 'o senhor / a senhora'",
                "explanationPt": "Graficamente formado por 你 ('você') sobre 心 ('coração'): tratar o mestre com reverência de coração.",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s435-t1",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s435-t2",
                "hanzi": "喝完",
                "pinyin": "hēwán",
                "hskLevel": 1,
                "meaningPt": "terminou de beber",
                "partOfSpeech": "verbo + resultado",
                "compoundLogicPt": "喝 (beber) + 完 (terminar).",
                characters: chars("喝完", [
                    "hē",
                    "wán"
                  ], [
                    1,
                    1
                  ], [
                    "beber",
                    "terminar"
                  ])
              },
              {
                "id": "s435-t3",
                "hanzi": "那杯",
                "pinyin": "nà bēi",
                "hskLevel": 1,
                "meaningPt": "aquela xícara de",
                "partOfSpeech": "demonstrativo + classificador",
                "compoundLogicPt": "那 + 杯.",
                characters: chars("那杯", [
                    "nà",
                    "bēi"
                  ], [
                    1,
                    1
                  ], [
                    "aquela",
                    "xícara"
                  ])
              },
              {
                "id": "s435-t4",
                "hanzi": "热茶",
                "pinyin": "rè chá",
                "hskLevel": 1,
                "meaningPt": "chá quente",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "热 + 茶.",
                characters: chars("热茶", [
                    "rè",
                    "chá"
                  ], [
                    1,
                    1
                  ], [
                    "quente",
                    "chá"
                  ])
              },
              {
                "id": "s435-t5",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s435-t6",
                "hanzi": "高兴",
                "pinyin": "gāoxìng",
                "hskLevel": 1,
                "meaningPt": "alegre / sereno",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "高 (elevado) + 兴 (ânimo).",
                characters: chars("高兴", [
                    "gāo",
                    "xìng"
                  ], [
                    1,
                    1
                  ], [
                    "alto",
                    "ânimo"
                  ])
              },
              {
                "id": "s435-t7",
                "hanzi": "地",
                "pinyin": "de",
                "hskLevel": 2,
                "meaningPt": "partícula adverbial (-mente)",
                "partOfSpeech": "partícula",
                "compoundLogicPt": "Conecta 高兴 ao verbo 说.",
                characters: chars("地", [
                    "de"
                  ], [
                    2
                  ], [
                    "partícula adverbial"
                  ])
              },
              {
                "id": "s435-t8",
                "hanzi": "对",
                "pinyin": "duì",
                "hskLevel": 1,
                "meaningPt": "para",
                "partOfSpeech": "preposição",
                "compoundLogicPt": "Para.",
                characters: chars("对", [
                    "duì"
                  ], [
                    1
                  ], [
                    "para"
                  ])
              },
              {
                "id": "s435-t9",
                "hanzi": "老师",
                "pinyin": "lǎoshī",
                "hskLevel": 1,
                "meaningPt": "o mestre",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Mestre.",
                characters: chars("老师", [
                    "lǎo",
                    "shī"
                  ], [
                    1,
                    1
                  ], [
                    "sábio",
                    "mestre"
                  ])
              },
              {
                "id": "s435-t10",
                "hanzi": "说",
                "pinyin": "shuō",
                "hskLevel": 1,
                "meaningPt": "disse",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Dizer.",
                characters: chars("说", [
                    "shuō"
                  ], [
                    1
                  ], [
                    "dizer"
                  ])
              },
              {
                "id": "s435-t11",
                "hanzi": "：",
                "isPunctuation": true
              },
              {
                "id": "s435-t12",
                "hanzi": "“",
                "isPunctuation": true
              },
              {
                "id": "s435-t13",
                "hanzi": "谢谢",
                "pinyin": "xièxie",
                "hskLevel": 1,
                "meaningPt": "muito obrigado",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Agradecer.",
                characters: chars("谢谢", [
                    "xiè",
                    "xie"
                  ], [
                    1,
                    1
                  ], [
                    "agradecer",
                    "agradecer"
                  ])
              },
              {
                "id": "s435-t14",
                "hanzi": "您",
                "pinyin": "nín",
                "hskLevel": 1,
                "meaningPt": "ao senhor (você respeitoso)",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "你 (você) + 心 (coração).",
                characters: chars("您", [
                    "nín"
                  ], [
                    1
                  ], [
                    "senhor(a)"
                  ])
              },
              {
                "id": "s435-t15",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s435-t16",
                "hanzi": "老师",
                "pinyin": "lǎoshī",
                "hskLevel": 1,
                "meaningPt": "mestre",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Mestre.",
                characters: chars("老师", [
                    "lǎo",
                    "shī"
                  ], [
                    1,
                    1
                  ], [
                    "sábio",
                    "mestre"
                  ])
              },
              {
                "id": "s435-t17",
                "hanzi": "！",
                "isPunctuation": true
              },
              {
                "id": "s435-t18",
                "hanzi": "”",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s436",
            "zhText": "下山的时候，山路还是很难走，风还是很大。",
            "pinyinText": "Xiàshān de shíhou, shānlù háishì hěn nán zǒu, fēng háishì hěn dà.",
            "translationPt": "Quando desceu a montanha, o caminho ainda era muito difícil de andar e o vento ainda estava muito forte.",
            "literalPt": "Descer-montanha de momento, montanha-caminho ainda-era muito difícil andar, vento ainda-era muito grande.",
            "grammarNotes": [
              {
                "pattern": "还是 (háishì) = 'continuava sendo / ainda era'",
                "explanationPt": "Mostra o princípio filosófico central: o mundo externo não mudou (o caminho e o vento continuam difíceis), mas quem mudou foi o olhar do guerreiro.",
                "hskLevel": 2
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s436-t1",
                "hanzi": "下山",
                "pinyin": "xiàshān",
                "hskLevel": 1,
                "meaningPt": "descer a montanha",
                "partOfSpeech": "verbo + objeto",
                "compoundLogicPt": "下 (descer) + 山 (montanha).",
                characters: chars("下山", [
                    "xià",
                    "shān"
                  ], [
                    1,
                    1
                  ], [
                    "descer",
                    "montanha"
                  ])
              },
              {
                "id": "s436-t2",
                "hanzi": "的时候",
                "pinyin": "de shíhou",
                "hskLevel": 1,
                "meaningPt": "quando",
                "partOfSpeech": "locução temporal",
                "compoundLogicPt": "No momento de.",
                characters: chars("的时候", [
                    "de",
                    "shí",
                    "hou"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "de",
                    "tempo",
                    "momento"
                  ])
              },
              {
                "id": "s436-t3",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s436-t4",
                "hanzi": "山路",
                "pinyin": "shānlù",
                "hskLevel": 1,
                "meaningPt": "o caminho da montanha",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "山 + 路.",
                characters: chars("山路", [
                    "shān",
                    "lù"
                  ], [
                    1,
                    1
                  ], [
                    "montanha",
                    "caminho"
                  ])
              },
              {
                "id": "s436-t5",
                "hanzi": "还是",
                "pinyin": "háishì",
                "hskLevel": 2,
                "meaningPt": "ainda era / continuava",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "还 + 是.",
                characters: chars("还是", [
                    "hái",
                    "shì"
                  ], [
                    1,
                    1
                  ], [
                    "ainda",
                    "ser"
                  ])
              },
              {
                "id": "s436-t6",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Muito.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s436-t7",
                "hanzi": "难",
                "pinyin": "nán",
                "hskLevel": 2,
                "meaningPt": "difícil",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "Difícil / árduo.",
                characters: chars("难", [
                    "nán"
                  ], [
                    2
                  ], [
                    "difícil"
                  ])
              },
              {
                "id": "s436-t8",
                "hanzi": "走",
                "pinyin": "zǒu",
                "hskLevel": 1,
                "meaningPt": "de andar",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Caminhar.",
                characters: chars("走", [
                    "zǒu"
                  ], [
                    1
                  ], [
                    "andar"
                  ])
              },
              {
                "id": "s436-t9",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s436-t10",
                "hanzi": "风",
                "pinyin": "fēng",
                "hskLevel": 1,
                "meaningPt": "o vento",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "Vento.",
                characters: chars("风", [
                    "fēng"
                  ], [
                    1
                  ], [
                    "vento"
                  ])
              },
              {
                "id": "s436-t11",
                "hanzi": "还是",
                "pinyin": "háishì",
                "hskLevel": 2,
                "meaningPt": "continuava / ainda estava",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "还 + 是.",
                characters: chars("还是", [
                    "hái",
                    "shì"
                  ], [
                    1,
                    1
                  ], [
                    "ainda",
                    "ser"
                  ])
              },
              {
                "id": "s436-t12",
                "hanzi": "很",
                "pinyin": "hěn",
                "hskLevel": 1,
                "meaningPt": "muito",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "Muito.",
                characters: chars("很", [
                    "hěn"
                  ], [
                    1
                  ], [
                    "muito"
                  ])
              },
              {
                "id": "s436-t13",
                "hanzi": "大",
                "pinyin": "dà",
                "hskLevel": 1,
                "meaningPt": "forte",
                "partOfSpeech": "adjetivo",
                "compoundLogicPt": "Forte.",
                characters: chars("大", [
                    "dà"
                  ], [
                    1
                  ], [
                    "forte"
                  ])
              },
              {
                "id": "s436-t14",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          },
          {
            "id": "s437",
            "zhText": "但是这一次，李云笑着往前走，因为勇气一直和他在一起。",
            "pinyinText": "Dànshì zhè yí cì, Lǐ Yún xiàozhe wǎng qián zǒu, yīnwèi yǒngqì yìzhí hé tā zài yìqǐ.",
            "translationPt": "Mas, desta vez, Li Yun caminhou para a frente sorrindo, porque a coragem sempre esteve junto com ele.",
            "literalPt": "Mas esta uma vez, Li Yun sorrindo rumo frente caminhou, porque coragem sempre com ele estava junto.",
            "grammarNotes": [
              {
                "pattern": "和 (hé) + Pessoa + 在一起 (zài yìqǐ) = 'estar junto com...'",
                "explanationPt": "Fechamento poético da jornada: 勇气一直和他在一起 ('a coragem sempre esteve junto com ele').",
                "hskLevel": 1
              }
            ],
            "startMs": 0,
            "endMs": 0,
            "tokens": [
              {
                "id": "s437-t1",
                "hanzi": "但是",
                "pinyin": "dànshì",
                "hskLevel": 2,
                "meaningPt": "mas",
                "partOfSpeech": "conjunção",
                "compoundLogicPt": "Mas.",
                characters: chars("但是", [
                    "dàn",
                    "shì"
                  ], [
                    2,
                    1
                  ], [
                    "mas",
                    "ser"
                  ])
              },
              {
                "id": "s437-t2",
                "hanzi": "这一次",
                "pinyin": "zhè yí cì",
                "hskLevel": 1,
                "meaningPt": "desta vez",
                "partOfSpeech": "demonstrativo + numeral + classificador",
                "compoundLogicPt": "这 (esta) + 一 (uma) + 次 (vez).",
                characters: chars("这一次", [
                    "zhè",
                    "yī",
                    "cì"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "esta",
                    "uma",
                    "vez"
                  ])
              },
              {
                "id": "s437-t3",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s437-t4",
                "hanzi": "李云",
                "pinyin": "Lǐ Yún",
                "hskLevel": 1,
                "meaningPt": "Li Yun",
                "partOfSpeech": "nome próprio",
                "compoundLogicPt": "Li Yun.",
                characters: chars("李云", [
                    "Lǐ",
                    "Yún"
                  ], [
                    1,
                    1
                  ], [
                    "Li",
                    "nuvem"
                  ])
              },
              {
                "id": "s437-t5",
                "hanzi": "笑着",
                "pinyin": "xiàozhe",
                "hskLevel": 2,
                "meaningPt": "sorrindo",
                "partOfSpeech": "verbo + partícula",
                "compoundLogicPt": "笑 + 着.",
                characters: chars("笑着", [
                    "xiào",
                    "zhe"
                  ], [
                    2,
                    2
                  ], [
                    "sorrir",
                    "contínuo"
                  ])
              },
              {
                "id": "s437-t6",
                "hanzi": "往前",
                "pinyin": "wǎng qián",
                "hskLevel": 2,
                "meaningPt": "para a frente",
                "partOfSpeech": "preposição + direção",
                "compoundLogicPt": "往 + 前.",
                characters: chars("往前", [
                    "wǎng",
                    "qián"
                  ], [
                    2,
                    1
                  ], [
                    "rumo a",
                    "frente"
                  ])
              },
              {
                "id": "s437-t7",
                "hanzi": "走",
                "pinyin": "zǒu",
                "hskLevel": 1,
                "meaningPt": "caminhou / avançou",
                "partOfSpeech": "verbo",
                "compoundLogicPt": "Andar.",
                characters: chars("走", [
                    "zǒu"
                  ], [
                    1
                  ], [
                    "andar"
                  ])
              },
              {
                "id": "s437-t8",
                "hanzi": "，",
                "isPunctuation": true
              },
              {
                "id": "s437-t9",
                "hanzi": "因为",
                "pinyin": "yīnwèi",
                "hskLevel": 2,
                "meaningPt": "porque",
                "partOfSpeech": "conjunção",
                "compoundLogicPt": "因 (causa) + 为 (por).",
                characters: chars("因为", [
                    "yīn",
                    "wèi"
                  ], [
                    2,
                    2
                  ], [
                    "causa",
                    "por"
                  ])
              },
              {
                "id": "s437-t10",
                "hanzi": "勇气",
                "pinyin": "yǒngqì",
                "hskLevel": 3,
                "meaningPt": "a coragem",
                "partOfSpeech": "substantivo",
                "compoundLogicPt": "勇 + 气.",
                characters: chars("勇气", [
                    "yǒng",
                    "qì"
                  ], [
                    3,
                    1
                  ], [
                    "bravura",
                    "espírito"
                  ])
              },
              {
                "id": "s437-t11",
                "hanzi": "一直",
                "pinyin": "yìzhí",
                "hskLevel": 2,
                "meaningPt": "sempre / o tempo todo",
                "partOfSpeech": "advérbio",
                "compoundLogicPt": "一 + 直.",
                characters: chars("一直", [
                    "yī",
                    "zhí"
                  ], [
                    1,
                    2
                  ], [
                    "um",
                    "direto"
                  ])
              },
              {
                "id": "s437-t12",
                "hanzi": "和",
                "pinyin": "hé",
                "hskLevel": 1,
                "meaningPt": "com",
                "partOfSpeech": "preposição",
                "compoundLogicPt": "Com.",
                characters: chars("和", [
                    "hé"
                  ], [
                    1
                  ], [
                    "com"
                  ])
              },
              {
                "id": "s437-t13",
                "hanzi": "他",
                "pinyin": "tā",
                "hskLevel": 1,
                "meaningPt": "ele",
                "partOfSpeech": "pronome",
                "compoundLogicPt": "Li Yun.",
                characters: chars("他", [
                    "tā"
                  ], [
                    1
                  ], [
                    "ele"
                  ])
              },
              {
                "id": "s437-t14",
                "hanzi": "在一起",
                "pinyin": "zài yìqǐ",
                "hskLevel": 1,
                "meaningPt": "esteve junto",
                "partOfSpeech": "locução verbal",
                "compoundLogicPt": "在 (estar) + 一起 (juntos).",
                characters: chars("在一起", [
                    "zài",
                    "yī",
                    "qǐ"
                  ], [
                    1,
                    1,
                    1
                  ], [
                    "estar",
                    "um",
                    "junto"
                  ])
              },
              {
                "id": "s437-t15",
                "hanzi": "。",
                "isPunctuation": true
              }
            ]
          }
        ]
      }
    ]
  },
];
