import type { CharacterEtymology, HskLevel } from "../types/story";

/**
 * Rich Etymological Character Dictionary (Hanzi -> Formation, Radicals & Isolated Meaning in PT-BR)
 */
export const CHARACTER_DICTIONARY: Record<string, CharacterEtymology> = {
  "林": {
    char: "林",
    pinyin: "lín",
    hskLevel: 1,
    isolatedMeaningPt: "bosque / floresta / sobrenome comum (Lin)",
    formationExplanationPt: "Ideograma composto (会意): duas árvores (木 + 木) lado a lado formando um bosque.",
    components: [
      { symbol: "木", pinyin: "mù", meaningPt: "árvore / madeira (duplicado)", role: "semântico" }
    ],
    commonExamples: [
      { word: "森林", pinyin: "sēnlín", meaningPt: "floresta densa" },
      { word: "林明", pinyin: "Lín Míng", meaningPt: "Lin Ming (nome próprio)" }
    ]
  },
  "明": {
    char: "明",
    pinyin: "míng",
    hskLevel: 1,
    isolatedMeaningPt: "brilhante / claro / próximo (dia/ano)",
    formationExplanationPt: "Ideograma clássico: junta o Sol (日) à esquerda e a Lua (月) à direita — os dois maiores astros luminosos juntos simbolizando 'claridade / brilho'.",
    components: [
      { symbol: "日", pinyin: "rì", meaningPt: "sol / dia", role: "semântico" },
      { symbol: "月", pinyin: "yuè", meaningPt: "lua / mês", role: "semântico" }
    ],
    commonExamples: [
      { word: "明天", pinyin: "míngtiān", meaningPt: "amanhã" },
      { word: "明白", pinyin: "míngbai", meaningPt: "entender / claro" }
    ]
  },
  "今": {
    char: "今",
    pinyin: "jīn",
    hskLevel: 1,
    isolatedMeaningPt: "agora / atual / presente",
    formationExplanationPt: "Pictograma antigo de um sino ou cobertura apontando para o momento imediato ('o agora').",
    components: [
      { symbol: "亼", pinyin: "jí", meaningPt: "reunir / cobertura superior", role: "estrutural" }
    ],
    commonExamples: [
      { word: "今天", pinyin: "jīntiān", meaningPt: "hoje" },
      { word: "今年", pinyin: "jīnnián", meaningPt: "este ano" }
    ]
  },
  "天": {
    char: "天",
    pinyin: "tiān",
    hskLevel: 1,
    isolatedMeaningPt: "céu / dia / clima",
    formationExplanationPt: "Mostra uma pessoa de braços abertos (大 'grande') com uma linha horizontal acima da cabeça (一), indicando o firmamento ou o céu acima da humanidade.",
    components: [
      { symbol: "一", pinyin: "yī", meaningPt: "um / linha superior do firmamento", role: "pictográfico" },
      { symbol: "大", pinyin: "dà", meaningPt: "grande / pessoa de braços abertos", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "今天", pinyin: "jīntiān", meaningPt: "hoje" },
      { word: "天气", pinyin: "tiānqì", meaningPt: "clima / tempo" }
    ]
  },
  "早": {
    char: "早",
    pinyin: "zǎo",
    hskLevel: 1,
    isolatedMeaningPt: "cedo / manhã",
    formationExplanationPt: "Ideograma: o Sol (日) nascendo logo acima da copa das plantas ou da linha do horizonte (十), simbolizando o início da manhã.",
    components: [
      { symbol: "日", pinyin: "rì", meaningPt: "sol", role: "semântico" },
      { symbol: "十", pinyin: "shí", meaningPt: "horizonte / haste de planta ao amanhecer", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "早上", pinyin: "zǎoshang", meaningPt: "manhã (início do dia)" },
      { word: "早饭", pinyin: "zǎofàn", meaningPt: "café da manhã" }
    ]
  },
  "上": {
    char: "上",
    pinyin: "shàng",
    hskLevel: 1,
    isolatedMeaningPt: "em cima / subir / ir para / parte de",
    formationExplanationPt: "Indicativo simples (指事): um traço vertical apontando acima de uma linha base horizontal.",
    components: [
      { symbol: "卜", pinyin: "bǔ", meaningPt: "marcador vertical superior", role: "pictográfico" },
      { symbol: "一", pinyin: "yī", meaningPt: "linha base horizontal", role: "estrutural" }
    ],
    commonExamples: [
      { word: "早上", pinyin: "zǎoshang", meaningPt: "manhã" },
      { word: "桌子上", pinyin: "zhuōzi shàng", meaningPt: "em cima da mesa" }
    ]
  },
  "去": {
    char: "去",
    pinyin: "qù",
    hskLevel: 1,
    isolatedMeaningPt: "ir / partir (afastando-se de onde se fala)",
    formationExplanationPt: "Originalmente mostrava uma pessoa saindo de uma caverna ou recinto: terra/local acima (土) e uma abertura abaixo (厶).",
    components: [
      { symbol: "土", pinyin: "tǔ", meaningPt: "terra / chão", role: "semântico" },
      { symbol: "厶", pinyin: "sī", meaningPt: "recinto / passo de saída", role: "estrutural" }
    ],
    commonExamples: [
      { word: "回去", pinyin: "huíqù", meaningPt: "voltar para lá" },
      { word: "去年", pinyin: "qùnián", meaningPt: "ano passado" }
    ]
  },
  "了": {
    char: "了",
    pinyin: "le",
    hskLevel: 1,
    isolatedMeaningPt: "partícula de ação concluída ou mudança de estado",
    formationExplanationPt: "Partícula gramatical essencial do Mandarim: logo após um verbo indica que a ação se concretizou; no fim da frase indica nova situação.",
    components: [
      { symbol: "了", pinyin: "le", meaningPt: "traço contínuo de conclusão", role: "estrutural" }
    ]
  },
  "北": {
    char: "北",
    pinyin: "běi",
    hskLevel: 1,
    isolatedMeaningPt: "norte",
    formationExplanationPt: "Pictograma de duas pessoas de costas uma para a outra. Como as casas chinesas tradicionais olhavam para o sul, 'dar as costas' (背) significava apontar para o Norte.",
    components: [
      { symbol: "爿", pinyin: "pán", meaningPt: "pessoa voltada para a esquerda", role: "pictográfico" },
      { symbol: "匕", pinyin: "bǐ", meaningPt: "pessoa voltada para a direita", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "北京", pinyin: "Běijīng", meaningPt: "Pequim (Capital do Norte)" },
      { word: "北边", pinyin: "běibian", meaningPt: "lado norte" }
    ]
  },
  "京": {
    char: "京",
    pinyin: "jīng",
    hskLevel: 1,
    isolatedMeaningPt: "capital",
    formationExplanationPt: "Pictograma de uma torre alta de palácio construída sobre uma colina elevada (亠 telhado + 口 janela + 小 pilares), simbolizando a capital imperial.",
    components: [
      { symbol: "亠", pinyin: "tóu", meaningPt: "telhado alto", role: "pictográfico" },
      { symbol: "口", pinyin: "kǒu", meaningPt: "câmara central", role: "pictográfico" },
      { symbol: "小", pinyin: "xiǎo", meaningPt: "base elevada / pilares", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "北京", pinyin: "Běijīng", meaningPt: "Pequim" }
    ]
  },
  "的": {
    char: "的",
    pinyin: "de",
    hskLevel: 1,
    isolatedMeaningPt: "de (partícula possessiva ou descritiva)",
    formationExplanationPt: "Conecta um possuidor ou qualidade ao substantivo que vem depois (Modificador + 的 + Substantivo). Graficamente une 白 (branco/claro) + 勺 (concha/alvo).",
    components: [
      { symbol: "白", pinyin: "bái", meaningPt: "branco / claro", role: "semântico" },
      { symbol: "勺", pinyin: "sháo", meaningPt: "colher / centro do alvo", role: "fonético" }
    ],
    commonExamples: [
      { word: "我的", pinyin: "wǒ de", meaningPt: "meu / minha" },
      { word: "好喝的茶", pinyin: "hǎohē de chá", meaningPt: "chá saboroso" }
    ]
  },
  "一": {
    char: "一",
    pinyin: "yī",
    hskLevel: 1,
    isolatedMeaningPt: "um / único",
    formationExplanationPt: "Um único traço horizontal representando a unidade e o início da contagem.",
    components: [
      { symbol: "一", pinyin: "yī", meaningPt: "traço horizontal unitário", role: "pictográfico" }
    ]
  },
  "家": {
    char: "家",
    pinyin: "jiā",
    hskLevel: 1,
    isolatedMeaningPt: "casa / família / classificador para lojas e restaurantes",
    formationExplanationPt: "Ideograma histórico: um telhado de casa (宀) abrigando um porco doméstico (豕) embaixo — na China antiga, ter criação sob um teto definia um lar estabelecido.",
    components: [
      { symbol: "宀", pinyin: "mián", meaningPt: "telhado / teto de casa", role: "semântico" },
      { symbol: "豕", pinyin: "shǐ", meaningPt: "porco / criação doméstica", role: "semântico" }
    ],
    commonExamples: [
      { word: "回家", pinyin: "huíjiā", meaningPt: "voltar para casa" },
      { word: "一家茶馆", pinyin: "yì jiā cháguǎn", meaningPt: "uma casa de chá" }
    ]
  },
  "茶": {
    char: "茶",
    pinyin: "chá",
    hskLevel: 1,
    isolatedMeaningPt: "chá (planta e bebida)",
    formationExplanationPt: "Uma pessoa (人) colhendo folhas de ervas/plantas (艹 no topo) entre os galhos de uma árvore/arbusto (木 na base).",
    components: [
      { symbol: "艹", pinyin: "cǎo", meaningPt: "grama / folha vegetal", role: "semântico" },
      { symbol: "人", pinyin: "rén", meaningPt: "pessoa / telhado de colheita", role: "pictográfico" },
      { symbol: "木", pinyin: "mù", meaningPt: "árvore / arbusto de chá", role: "semântico" }
    ],
    commonExamples: [
      { word: "喝茶", pinyin: "hē chá", meaningPt: "beber chá" },
      { word: "绿茶", pinyin: "lǜchá", meaningPt: "chá verde" }
    ]
  },
  "馆": {
    char: "馆",
    pinyin: "guǎn",
    hskLevel: 1,
    isolatedMeaningPt: "estabelecimento / pavilhão / casa pública (restaurante, biblioteca, museu)",
    formationExplanationPt: "Composto fono-semântico: radical de comida/ospitalidade (饣) à esquerda + 官 (guān, 'edifício público/oficial') à direita dando o som e a ideia de salão.",
    components: [
      { symbol: "饣", pinyin: "shí", meaningPt: "comida / hospitalidade", role: "semântico" },
      { symbol: "官", pinyin: "guān", meaningPt: "salão oficial (dá o som guǎn)", role: "fonético" }
    ],
    commonExamples: [
      { word: "茶馆", pinyin: "cháguǎn", meaningPt: "casa de chá" },
      { word: "饭馆", pinyin: "fànguǎn", meaningPt: "restaurante" }
    ]
  },
  "店": {
    char: "店",
    pinyin: "diàn",
    hskLevel: 1,
    isolatedMeaningPt: "loja / comércio / pousada",
    formationExplanationPt: "Radical de edifício aberto/abrigo (广) cobrindo 占 (zhàn, 'ocupar um posto'), indicando um espaço comercial aberto à rua.",
    components: [
      { symbol: "广", pinyin: "guǎng", meaningPt: "edifício / teto com parede lateral", role: "semântico" },
      { symbol: "占", pinyin: "zhàn", meaningPt: "ocupar lugar (fonético)", role: "fonético" }
    ],
    commonExamples: [
      { word: "书店", pinyin: "shūdiàn", meaningPt: "livraria" },
      { word: "商店", pinyin: "shāngdiàn", meaningPt: "loja" }
    ]
  },
  "里": {
    char: "里",
    pinyin: "lǐ",
    hskLevel: 1,
    isolatedMeaningPt: "dentro / interior",
    formationExplanationPt: "União de campo cultivado (田) sobre a terra (土) — originalmente significava 'aldeia/interior onde se mora'.",
    components: [
      { symbol: "田", pinyin: "tián", meaningPt: "campo cultivado", role: "semântico" },
      { symbol: "土", pinyin: "tǔ", meaningPt: "terra / solo", role: "semântico" }
    ],
    commonExamples: [
      { word: "家里", pinyin: "jiālǐ", meaningPt: "dentro de casa" },
      { word: "这里", pinyin: "zhèlǐ", meaningPt: "aqui" }
    ]
  },
  "人": {
    char: "人",
    pinyin: "rén",
    hskLevel: 1,
    isolatedMeaningPt: "pessoa / ser humano",
    formationExplanationPt: "Pictograma de uma pessoa caminhando vista de perfil, apoiada sobre as duas pernas.",
    components: [
      { symbol: "人", pinyin: "rén", meaningPt: "figura humana bípede", role: "pictográfico" }
    ]
  },
  "不": {
    char: "不",
    pinyin: "bù",
    hskLevel: 1,
    isolatedMeaningPt: "não (negação para presente, futuro e estados habituais)",
    formationExplanationPt: "Originalmente o cálice de uma flor ou um pássaro voando em direção ao céu sem descer, passando a significar 'não'. Muda para 2º tom (bú) antes de palavras de 4º tom.",
    components: [
      { symbol: "一", pinyin: "yī", meaningPt: "limite superior / céu", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "不是", pinyin: "bú shì", meaningPt: "não é" },
      { word: "不多", pinyin: "bù duō", meaningPt: "não são muitos" }
    ]
  },
  "多": {
    char: "多",
    pinyin: "duō",
    hskLevel: 1,
    isolatedMeaningPt: "muito / muitos",
    formationExplanationPt: "Duplicação do caractere 夕 (noite / pedaço de carne em inscrições antigas): acumular um sobre o outro gera a ideia de 'muitos / abundância'.",
    components: [
      { symbol: "夕", pinyin: "xī", meaningPt: "noite / porção duplicada", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "很多", pinyin: "hěn duō", meaningPt: "muitos" },
      { word: "多少", pinyin: "duōshao", meaningPt: "quanto / quantos" }
    ]
  },
  "很": {
    char: "很",
    pinyin: "hěn",
    hskLevel: 1,
    isolatedMeaningPt: "muito (ou ligador neutro antes de adjetivos)",
    formationExplanationPt: "Radical de passo/caminho (彳) + 艮 (gèn, firme/olhar para trás). Na gramática chinesa, conecta o sujeito ao adjetivo (ex: 很安静 'é tranquilo').",
    components: [
      { symbol: "彳", pinyin: "chì", meaningPt: "passo / caminhar", role: "semântico" },
      { symbol: "艮", pinyin: "gèn", meaningPt: "firme (fonético)", role: "fonético" }
    ]
  },
  "安": {
    char: "安",
    pinyin: "ān",
    hskLevel: 2,
    isolatedMeaningPt: "paz / calmo / seguro",
    formationExplanationPt: "Ideograma clássico: uma mulher (女) abrigada em segurança debaixo do teto de uma casa (宀) → paz e tranquilidade.",
    components: [
      { symbol: "宀", pinyin: "mián", meaningPt: "telhado de casa", role: "semântico" },
      { symbol: "女", pinyin: "nǚ", meaningPt: "mulher em repouso", role: "semântico" }
    ],
    commonExamples: [
      { word: "安静", pinyin: "ānjìng", meaningPt: "silencioso / tranquilo" },
      { word: "安全", pinyin: "ānquán", meaningPt: "seguro / segurança" }
    ]
  },
  "静": {
    char: "静",
    pinyin: "jìng",
    hskLevel: 2,
    isolatedMeaningPt: "silencioso / quieto / imóvel",
    formationExplanationPt: "Une 青 (qīng, 'verde-azulado puro da natureza') + 争 (zhēng, 'disputar'), evocando o estado em que toda agitação cessa e resta a clareza serena.",
    components: [
      { symbol: "青", pinyin: "qīng", meaningPt: "puro / verde-azulado", role: "semântico" },
      { symbol: "争", pinyin: "zhēng", meaningPt: "contenda que seaquieta (fonético)", role: "fonético" }
    ]
  },
  "他": {
    char: "他",
    pinyin: "tā",
    hskLevel: 1,
    isolatedMeaningPt: "ele",
    formationExplanationPt: "Radical de pessoa em pé (亻) à esquerda + 也 (yě, 'também/outro') à direita → 'aquela outra pessoa (masculino)'.",
    components: [
      { symbol: "亻", pinyin: "rén", meaningPt: "pessoa (radical lateral)", role: "semântico" },
      { symbol: "也", pinyin: "yě", meaningPt: "outro / também", role: "estrutural" }
    ]
  },
  "她": {
    char: "她",
    pinyin: "tā",
    hskLevel: 1,
    isolatedMeaningPt: "ela",
    formationExplanationPt: "Radical de mulher (女) à esquerda + 也 (yě) à direita → pronome de terceira pessoa feminino.",
    components: [
      { symbol: "女", pinyin: "nǚ", meaningPt: "mulher / feminino", role: "semântico" },
      { symbol: "也", pinyin: "yě", meaningPt: "outro / também", role: "estrutural" }
    ]
  },
  "坐": {
    char: "坐",
    pinyin: "zuò",
    hskLevel: 1,
    isolatedMeaningPt: "sentar-se / viajar de (transporte)",
    formationExplanationPt: "Ideograma visual: duas pessoas (人 + 人) sentadas frente a frente sobre a terra/chão (土).",
    components: [
      { symbol: "人", pinyin: "rén", meaningPt: "duas pessoas sentadas", role: "pictográfico" },
      { symbol: "土", pinyin: "tǔ", meaningPt: "terra / assento", role: "semântico" }
    ],
    commonExamples: [
      { word: "请坐", pinyin: "qǐng zuò", meaningPt: "por favor, sente-se" },
      { word: "坐车", pinyin: "zuò chē", meaningPt: "ir de carro/ônibus" }
    ]
  },
  "在": {
    char: "在",
    pinyin: "zài",
    hskLevel: 1,
    isolatedMeaningPt: "estar em (local) / em / indica ação em andamento",
    formationExplanationPt: "Combina a estrutura de força/mão (𠂇) com terra/chão (土), indicando 'estar presente em um lugar concreto'.",
    components: [
      { symbol: "𠂇", pinyin: "zuǒ", meaningPt: "mão / presença", role: "estrutural" },
      { symbol: "土", pinyin: "tǔ", meaningPt: "terra / lugar físico", role: "semântico" }
    ]
  },
  "桌": {
    char: "桌",
    pinyin: "zhuō",
    hskLevel: 1,
    isolatedMeaningPt: "mesa",
    formationExplanationPt: "Composto fono-semântico: 卓 (zhuó, 'alto/elevado') no topo dando o som e a ideia de superfície erguida + 木 (mù, 'madeira') na base.",
    components: [
      { symbol: "卓", pinyin: "zhuó", meaningPt: "elevado (dá o som zhuō)", role: "fonético" },
      { symbol: "木", pinyin: "mù", meaningPt: "madeira / móvel", role: "semântico" }
    ],
    commonExamples: [
      { word: "桌子", pinyin: "zhuōzi", meaningPt: "mesa" }
    ]
  },
  "子": {
    char: "子",
    pinyin: "zi",
    hskLevel: 1,
    isolatedMeaningPt: "filho / criança / sufixo nominal (tom neutro)",
    formationExplanationPt: "Pictograma de um bebê envolto em mantas com os braços abertos. Como sufixo em 桌子 (mesa) ou 杯子 (copo), perde o tom (zi) para formar substantivos.",
    components: [
      { symbol: "子", pinyin: "zǐ", meaningPt: "criança / sufixo substantivador", role: "pictográfico" }
    ]
  },
  "旁": {
    char: "旁",
    pinyin: "páng",
    hskLevel: 2,
    isolatedMeaningPt: "lado / ao lado",
    formationExplanationPt: "Traz 立/冖 no topo e 方 (fāng, 'direção/quadrado') na base, indicando as bordas laterais de um espaço.",
    components: [
      { symbol: "方", pinyin: "fāng", meaningPt: "direção / lado (fonético)", role: "fonético" }
    ],
    commonExamples: [
      { word: "旁边", pinyin: "pángbiān", meaningPt: "ao lado" }
    ]
  },
  "边": {
    char: "边",
    pinyin: "biān",
    hskLevel: 1,
    isolatedMeaningPt: "lado / borda / margem",
    formationExplanationPt: "Une 力 (força/contorno) com o radical de caminhar/estrada (辶), indicando o limite ou lado por onde se anda.",
    components: [
      { symbol: "辶", pinyin: "chuò", meaningPt: "caminhar / deslocamento", role: "semântico" },
      { symbol: "力", pinyin: "lì", meaningPt: "força / contorno", role: "estrutural" }
    ]
  },
  "要": {
    char: "要",
    pinyin: "yào",
    hskLevel: 1,
    isolatedMeaningPt: "querer / pedir (comida/bebida) / precisar / ir (futuro)",
    formationExplanationPt: "Originalmente mostrava duas mãos na cintura (腰) de uma figura feminina (女), evoluindo para 'o ponto central / desejar / pedir'.",
    components: [
      { symbol: "覀", pinyin: "xī", meaningPt: "mãos apoiadas / topo", role: "pictográfico" },
      { symbol: "女", pinyin: "nǚ", meaningPt: "figura central", role: "pictográfico" }
    ]
  },
  "杯": {
    char: "杯",
    pinyin: "bēi",
    hskLevel: 1,
    isolatedMeaningPt: "xícara / copo (classificador para bebidas)",
    formationExplanationPt: "Composto fono-semântico: 木 (madeira, material das taças antigas) à esquerda + 不 (bù, fonético antigo para bēi) à direita.",
    components: [
      { symbol: "木", pinyin: "mù", meaningPt: "madeira (recipiente)", role: "semântico" },
      { symbol: "不", pinyin: "bù", meaningPt: "componente fonético (bēi)", role: "fonético" }
    ],
    commonExamples: [
      { word: "一杯茶", pinyin: "yì bēi chá", meaningPt: "uma xícara de chá" },
      { word: "杯子", pinyin: "bēizi", meaningPt: "copo / caneca" }
    ]
  },
  "热": {
    char: "热",
    pinyin: "rè",
    hskLevel: 1,
    isolatedMeaningPt: "quente / calor / aquecer",
    formationExplanationPt: "No topo traz 执 ('segurar com a mão') e na base o radical de fogo de quatro chamas (灬), ilustrando aquecer algo sobre as brasas.",
    components: [
      { symbol: "执", pinyin: "zhí", meaningPt: "segurar / manejar", role: "semântico" },
      { symbol: "灬", pinyin: "huǒ", meaningPt: "fogo / brasas (4 gotas de fogo)", role: "semântico" }
    ],
    commonExamples: [
      { word: "热茶", pinyin: "rè chá", meaningPt: "chá quente" },
      { word: "很热", pinyin: "hěn rè", meaningPt: "muito quente" }
    ]
  },
  "和": {
    char: "和",
    pinyin: "hé",
    hskLevel: 1,
    isolatedMeaningPt: "e (conecta substantivos) / com / harmonia",
    formationExplanationPt: "Espiga de cereal/grão (禾) à esquerda + boca (口) à direita: quando todos têm grãos para comer, há paz, união e harmonia ('e').",
    components: [
      { symbol: "禾", pinyin: "hé", meaningPt: "grão / cereal (fonético e semântico)", role: "semântico" },
      { symbol: "口", pinyin: "kǒu", meaningPt: "boca", role: "semântico" }
    ]
  },
  "本": {
    char: "本",
    pinyin: "běn",
    hskLevel: 1,
    isolatedMeaningPt: "classificador para livros e cadernos / raiz / origem",
    formationExplanationPt: "Indicativo (指事): uma árvore (木) com um traço horizontal marcando a base do tronco, apontando para a 'raiz / origem' — e, por extensão, um volume encadernado.",
    components: [
      { symbol: "木", pinyin: "mù", meaningPt: "árvore", role: "pictográfico" },
      { symbol: "一", pinyin: "yī", meaningPt: "marca na raiz da árvore", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "一本书", pinyin: "yì běn shū", meaningPt: "um livro" },
      { word: "日本", pinyin: "Rìběn", meaningPt: "Japão (origem do sol)" }
    ]
  },
  "书": {
    char: "书",
    pinyin: "shū",
    hskLevel: 1,
    isolatedMeaningPt: "livro / escrever",
    formationExplanationPt: "Forma simplificada cursiva de 書, que representava uma mão segurando um pincel vertical para registrar palavras.",
    components: [
      { symbol: "聿", pinyin: "yù", meaningPt: "pincel de escrita (simplificado)", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "看书", pinyin: "kàn shū", meaningPt: "ler um livro" },
      { word: "书店", pinyin: "shūdiàn", meaningPt: "livraria" }
    ]
  },
  "包": {
    char: "包",
    pinyin: "bāo",
    hskLevel: 1,
    isolatedMeaningPt: "bolsa / pacote / pãozinho recheado (baozi) / embrulhar",
    formationExplanationPt: "Pictograma de um contorno envolvente (勹) abrigando um embrião/conteúdo (巳) dentro → 'envolver / bolsa / pão recheado'.",
    components: [
      { symbol: "勹", pinyin: "bāo", meaningPt: "envolver / abraçar", role: "pictográfico" },
      { symbol: "巳", pinyin: "sì", meaningPt: "conteúdo interno", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "书包", pinyin: "shūbāo", meaningPt: "mochila escolar" },
      { word: "包子", pinyin: "bāozi", meaningPt: "pãozinho cozido no vapor" }
    ]
  },
  "拿": {
    char: "拿",
    pinyin: "ná",
    hskLevel: 1,
    isolatedMeaningPt: "pegar / segurar / trazer na mão",
    formationExplanationPt: "Ideograma transparente: 合 (hé, 'juntar/fechar') no topo + 手 (shǒu, 'mão') na base → fechar a mão para pegar algo.",
    components: [
      { symbol: "合", pinyin: "hé", meaningPt: "juntar / unir", role: "semântico" },
      { symbol: "手", pinyin: "shǒu", meaningPt: "mão", role: "semântico" }
    ]
  },
  "出": {
    char: "出",
    pinyin: "chū",
    hskLevel: 1,
    isolatedMeaningPt: "sair / tirar para fora",
    formationExplanationPt: "Originalmente mostrava um pé saindo de uma cavidade; hoje lembra um broto crescendo para fora de dois níveis de terra.",
    components: [
      { symbol: "山", pinyin: "shān", meaningPt: "broto / passo saindo da cavidade", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "拿出", pinyin: "náchū", meaningPt: "tirar para fora (da bolsa/bolso)" },
      { word: "出去", pinyin: "chūqù", meaningPt: "sair" }
    ]
  },
  "电": {
    char: "电",
    pinyin: "diàn",
    hskLevel: 1,
    isolatedMeaningPt: "eletricidade / raio / eletrônico",
    formationExplanationPt: "Pictograma de um relâmpago se estendendo para baixo a partir das nuvens (日/申 com cauda curvada). Na forma tradicional (電) traz 雨 (chuva) no topo.",
    components: [
      { symbol: "日", pinyin: "rì", meaningPt: "nuvem carregada", role: "pictográfico" },
      { symbol: "乚", pinyin: "yǐn", meaningPt: "cauda do relâmpago", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "电脑", pinyin: "diànnǎo", meaningPt: "computador (cérebro elétrico)" },
      { word: "电话", pinyin: "diànhuà", meaningPt: "telefone (fala elétrica)" },
      { word: "电影", pinyin: "diànyǐng", meaningPt: "filme (sombra elétrica)" }
    ]
  },
  "脑": {
    char: "脑",
    pinyin: "nǎo",
    hskLevel: 1,
    isolatedMeaningPt: "cérebro / mente / cabeça",
    formationExplanationPt: "Composto anatômico: radical 月 (肉 ròu, 'carne/órgão do corpo') à esquerda + 亠 e 凶 à direita representando a cabeça e a fontanela craniana.",
    components: [
      { symbol: "月 (肉)", pinyin: "ròu", meaningPt: "carne / órgão do corpo humano", role: "semântico" },
      { symbol: "亠", pinyin: "tóu", meaningPt: "topo da cabeça", role: "pictográfico" },
      { symbol: "凶", pinyin: "xiōng", meaningPt: "cavidade craniana", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "电脑", pinyin: "diànnǎo", meaningPt: "computador" }
    ]
  },
  "服": {
    char: "服",
    pinyin: "fú",
    hskLevel: 1,
    isolatedMeaningPt: "servir / roupa / adaptar-se",
    formationExplanationPt: "Originalmente mostrava um barco (舟, hoje escrito 月) e uma mão governando/servindo (卩+又).",
    components: [
      { symbol: "月 (舟)", pinyin: "zhōu", meaningPt: "barco / corpo", role: "semântico" },
      { symbol: "卩+又", pinyin: "fú", meaningPt: "pessoa ajoelhada e mão que serve", role: "semântico" }
    ],
    commonExamples: [
      { word: "服务员", pinyin: "fúwùyuán", meaningPt: "garçom / atendente" },
      { word: "衣服", pinyin: "yīfu", meaningPt: "roupa" }
    ]
  },
  "务": {
    char: "务",
    pinyin: "wù",
    hskLevel: 1,
    isolatedMeaningPt: "tarefa / serviço / assunto",
    formationExplanationPt: "Une 夂 (passo/ação) no topo com 力 (lì, 'força/esforço') na base → dedicar esforço a um serviço ou tarefa.",
    components: [
      { symbol: "夂", pinyin: "zhǐ", meaningPt: "ação / movimento", role: "estrutural" },
      { symbol: "力", pinyin: "lì", meaningPt: "força / trabalho", role: "semântico" }
    ]
  },
  "员": {
    char: "员",
    pinyin: "yuán",
    hskLevel: 1,
    isolatedMeaningPt: "membro / funcionário / profissional",
    formationExplanationPt: "Mostra uma abertura circular (口) sobre um caldeirão/concha de valor (贝 bèi), usado como sufixo para indicar quem exerce uma função.",
    components: [
      { symbol: "口", pinyin: "kǒu", meaningPt: "círculo / pessoa", role: "pictográfico" },
      { symbol: "贝", pinyin: "bèi", meaningPt: "concha / valor / ofício", role: "semântico" }
    ]
  },
  "走": {
    char: "走",
    pinyin: "zǒu",
    hskLevel: 1,
    isolatedMeaningPt: "caminhar / andar / ir embora",
    formationExplanationPt: "Ideograma dinâmico: uma pessoa balançando os braços sobre a terra (土) no topo + um pé (止) em movimento na base.",
    components: [
      { symbol: "土", pinyin: "tǔ", meaningPt: "terra / figura em movimento", role: "semântico" },
      { symbol: "止", pinyin: "zhǐ", meaningPt: "pé caminhando", role: "semântico" }
    ]
  },
  "过": {
    char: "过",
    pinyin: "guò",
    hskLevel: 1,
    isolatedMeaningPt: "passar / atravessar / partícula de experiência vivida",
    formationExplanationPt: "Une 寸 (cùn, 'mão/medida') com o radical de caminhar/deslocamento (辶) → passar por um caminho ou aproximar-se.",
    components: [
      { symbol: "辶", pinyin: "chuò", meaningPt: "caminhar / estrada", role: "semântico" },
      { symbol: "寸", pinyin: "cùn", meaningPt: "mão / passo medido", role: "semântico" }
    ]
  },
  "来": {
    char: "来",
    pinyin: "lái",
    hskLevel: 1,
    isolatedMeaningPt: "vir (em direção a quem fala)",
    formationExplanationPt: "Originalmente o pictograma de uma planta de trigo trazida de terras distantes, passando a significar 'vir / chegar'.",
    components: [
      { symbol: "木", pinyin: "mù", meaningPt: "haste central da planta", role: "pictográfico" }
    ]
  },
  "笑": {
    char: "笑",
    pinyin: "xiào",
    hskLevel: 1,
    isolatedMeaningPt: "sorrir / rir",
    formationExplanationPt: "Poético ideograma chinês: bambu (竹) no topo + 夭 (yāo, 'inclinar-se suavemente como bambu ao vento') na base → o corpo e os olhos se curvando ao sorrir.",
    components: [
      { symbol: "⺮ (竹)", pinyin: "zhú", meaningPt: "bambu que se curva ao vento", role: "semântico" },
      { symbol: "夭", pinyin: "yāo", meaningPt: "curvar-se alegremente", role: "semântico" }
    ]
  },
  "着": {
    char: "着",
    pinyin: "zhe",
    hskLevel: 1,
    isolatedMeaningPt: "partícula de estado contínuo ('-ndo', ex: sorrindo, olhando)",
    formationExplanationPt: "Polifônico clássico: lido em tom neutro (zhe) logo após um verbo indica que a ação continua enquanto outra acontece (笑着说 = 'disse sorrindo').",
    components: [
      { symbol: "羊", pinyin: "yáng", meaningPt: "topo estrutural", role: "estrutural" },
      { symbol: "目", pinyin: "mù", meaningPt: "olho que permanece focado", role: "semântico" }
    ]
  },
  "说": {
    char: "说",
    pinyin: "shuō",
    hskLevel: 1,
    isolatedMeaningPt: "falar / dizer",
    formationExplanationPt: "Radical da fala/palavra (讠) à esquerda + 兑 (duì, 'trocar/expressar com alegria') à direita → expressar ideias em palavras.",
    components: [
      { symbol: "讠", pinyin: "yán", meaningPt: "fala / palavra", role: "semântico" },
      { symbol: "兑", pinyin: "duì", meaningPt: "expressar / trocar", role: "fonético" }
    ]
  },
  "先": {
    char: "先",
    pinyin: "xiān",
    hskLevel: 1,
    isolatedMeaningPt: "primeiro / antes / senhor (em 先生)",
    formationExplanationPt: "Mostra um pé/planta (之) avançando acima de uma pessoa (儿) → aquele que caminha à frente ('primeiro').",
    components: [
      { symbol: "土/之", pinyin: "zhī", meaningPt: "pé que avança à frente", role: "semântico" },
      { symbol: "儿", pinyin: "rén", meaningPt: "pessoa embaixo", role: "pictográfico" }
    ]
  },
  "生": {
    char: "生",
    pinyin: "shēng",
    hskLevel: 1,
    isolatedMeaningPt: "nascer / vida / estudante / cru",
    formationExplanationPt: "Pictograma de um broto de planta (丿+一) rompendo e crescendo vigorosamente acima do solo (土).",
    components: [
      { symbol: "丿", pinyin: "piě", meaningPt: "folha brotando", role: "pictográfico" },
      { symbol: "土", pinyin: "tǔ", meaningPt: "solo fértil", role: "semântico" }
    ]
  },
  "您": {
    char: "您",
    pinyin: "nín",
    hskLevel: 1,
    isolatedMeaningPt: "você / o senhor / a senhora (tratamento formal respeitoso)",
    formationExplanationPt: "Ideograma transparente de cortesia: coloca 'você' (你 nǐ) apoiado sobre o 'coração' (心 xīn) → tratar o interlocutor com respeito.",
    components: [
      { symbol: "你", pinyin: "nǐ", meaningPt: "você (semântico e fonético)", role: "semântico" },
      { symbol: "心", pinyin: "xīn", meaningPt: "coração / respeito", role: "semântico" }
    ]
  },
  "请": {
    char: "请",
    pinyin: "qǐng",
    hskLevel: 1,
    isolatedMeaningPt: "por favor / convidar",
    formationExplanationPt: "Radical de palavra/fala (讠) à esquerda + 青 (qīng, 'puro/verde-azulado', dando o som qǐng) à direita → falar com polidez e pureza.",
    components: [
      { symbol: "讠", pinyin: "yán", meaningPt: "fala / palavra cortês", role: "semântico" },
      { symbol: "青", pinyin: "qīng", meaningPt: "puro (fonético qǐng)", role: "fonético" }
    ]
  },
  "慢": {
    char: "慢",
    pinyin: "màn",
    hskLevel: 1,
    isolatedMeaningPt: "devagar / lento",
    formationExplanationPt: "Radical de coração/mente (忄) à esquerda + 曼 (màn, 'estender-se longamente') à direita → ritmo calmo e sem pressa.",
    components: [
      { symbol: "忄", pinyin: "xīn", meaningPt: "coração / estado mental", role: "semântico" },
      { symbol: "曼", pinyin: "màn", meaningPt: "longo / prolongado (fonético)", role: "fonético" }
    ]
  },
  "用": {
    char: "用",
    pinyin: "yòng",
    hskLevel: 1,
    isolatedMeaningPt: "usar / servir-se / desfrutar (em 慢用)",
    formationExplanationPt: "Pictograma de um balde ou grade de madeira utilitária → 'utilizar / fazer uso de'.",
    components: [
      { symbol: "用", pinyin: "yòng", meaningPt: "utensílio de uso", role: "pictográfico" }
    ]
  },
  "喝": {
    char: "喝",
    pinyin: "hē",
    hskLevel: 1,
    isolatedMeaningPt: "beber / tomar (líquido)",
    formationExplanationPt: "Radical de boca (口) à esquerda indicando ação oral + 曷 (hé, fonético) à direita.",
    components: [
      { symbol: "口", pinyin: "kǒu", meaningPt: "boca", role: "semântico" },
      { symbol: "曷", pinyin: "hé", meaningPt: "componente fonético (hē)", role: "fonético" }
    ]
  },
  "口": {
    char: "口",
    pinyin: "kǒu",
    hskLevel: 1,
    isolatedMeaningPt: "boca / gole / mordida (classificador)",
    formationExplanationPt: "Pictograma direto do contorno de uma boca aberta. Como classificador (一口茶), significa 'um gole de chá'.",
    components: [
      { symbol: "口", pinyin: "kǒu", meaningPt: "boca aberta", role: "pictográfico" }
    ]
  },
  "觉": {
    char: "觉",
    pinyin: "jué",
    hskLevel: 1,
    isolatedMeaningPt: "sentir / achar (jué) | dormir (jiào)",
    formationExplanationPt: "No topo traz uma cobertura luminosa (𰃮) e na base 见 (jiàn, 'ver/perceber') → despertar a percepção ou sentir.",
    components: [
      { symbol: "见", pinyin: "jiàn", meaningPt: "ver / perceber", role: "semântico" }
    ]
  },
  "得": {
    char: "得",
    pinyin: "de",
    hskLevel: 1,
    isolatedMeaningPt: "partícula estrutural (de) / precisar (děi) / obter (dé)",
    formationExplanationPt: "Radical de passo (彳) + sol/concha e mão (寸). Em 觉得 (juéde) forma o verbo 'achar/sentir'.",
    components: [
      { symbol: "彳", pinyin: "chì", meaningPt: "passo / caminhar", role: "semântico" },
      { symbol: "寸", pinyin: "cùn", meaningPt: "mão que alcança", role: "semântico" }
    ]
  },
  "香": {
    char: "香",
    pinyin: "xiāng",
    hskLevel: 2,
    isolatedMeaningPt: "aromático / cheiroso / saboroso",
    formationExplanationPt: "Ideograma sensorial: cereal/grão maduro (禾) no topo + doce/boca apreciando (日/甘) na base → o aroma agradável da comida ou do chá quente.",
    components: [
      { symbol: "禾", pinyin: "hé", meaningPt: "grão / planta aromática", role: "semântico" },
      { symbol: "日 (甘)", pinyin: "gān", meaningPt: "doçura / paladar", role: "semântico" }
    ]
  },
  "这": {
    char: "这",
    pinyin: "zhè",
    hskLevel: 1,
    isolatedMeaningPt: "este / esta / isto",
    formationExplanationPt: "Une 文 (texto/marca) com o radical de caminhar/proximidade (辶) → o que está aqui perto.",
    components: [
      { symbol: "辶", pinyin: "chuò", meaningPt: "proximidade / passo", role: "semântico" },
      { symbol: "文", pinyin: "wén", meaningPt: "marca / traço", role: "estrutural" }
    ]
  },
  "时": {
    char: "时",
    pinyin: "shí",
    hskLevel: 1,
    isolatedMeaningPt: "tempo / hora / momento",
    formationExplanationPt: "O Sol (日) à esquerda marcando a passagem do dia + 寸 (cùn, 'medida/pulso') à direita → o tempo medido pelo movimento do sol.",
    components: [
      { symbol: "日", pinyin: "rì", meaningPt: "sol / ciclo diário", role: "semântico" },
      { symbol: "寸", pinyin: "cùn", meaningPt: "medida / pulso", role: "semântico" }
    ]
  },
  "候": {
    char: "候",
    pinyin: "hou",
    hskLevel: 1,
    isolatedMeaningPt: "momento / esperar / estação",
    formationExplanationPt: "Mostra uma pessoa (亻) observando uma flecha (矢) atingir o alvo → aguardar o momento exato (时候 = 'momento / quando').",
    components: [
      { symbol: "亻", pinyin: "rén", meaningPt: "pessoa que observa", role: "semântico" },
      { symbol: "矢", pinyin: "shǐ", meaningPt: "flecha / instante", role: "semântico" }
    ]
  },
  "看": {
    char: "看",
    pinyin: "kàn",
    hskLevel: 1,
    isolatedMeaningPt: "olhar / ver / ler",
    formationExplanationPt: "Um dos ideogramas mais visuais do chinês: uma mão (手, inclinada no topo) colocada como viseira acima do olho (目, na base) para enxergar ao longe.",
    components: [
      { symbol: "手", pinyin: "shǒu", meaningPt: "mão fazendo sombra na testa", role: "pictográfico" },
      { symbol: "目", pinyin: "mù", meaningPt: "olho", role: "pictográfico" }
    ]
  },
  "见": {
    char: "见",
    pinyin: "jiàn",
    hskLevel: 1,
    isolatedMeaningPt: "ver / perceber (resultado de olhar) / encontrar",
    formationExplanationPt: "Um grande olho (目) sobre duas pernas humanas (儿) → a percepção visual chegando até a pessoa (看见 = 'olhar e de fato avistar').",
    components: [
      { symbol: "目", pinyin: "mù", meaningPt: "olho aberto", role: "pictográfico" },
      { symbol: "儿", pinyin: "rén", meaningPt: "pessoa", role: "pictográfico" }
    ]
  },
  "门": {
    char: "门",
    pinyin: "mén",
    hskLevel: 1,
    isolatedMeaningPt: "porta / portão",
    formationExplanationPt: "Pictograma direto dos batentes de uma porta de duas folhas.",
    components: [
      { symbol: "门", pinyin: "mén", meaningPt: "batente da porta", role: "pictográfico" }
    ]
  },
  "外": {
    char: "外",
    pinyin: "wài",
    hskLevel: 1,
    isolatedMeaningPt: "fora / exterior",
    formationExplanationPt: "Une 夕 (noite) + 卜 (adivinhação): adivinhações feitas à noite ocorriam fora do protocolo habitual, passando a significar 'fora / exterior'.",
    components: [
      { symbol: "夕", pinyin: "xī", meaningPt: "noite", role: "semântico" },
      { symbol: "卜", pinyin: "bǔ", meaningPt: "sinal externo", role: "semântico" }
    ]
  },
  "小": {
    char: "小",
    pinyin: "xiǎo",
    hskLevel: 1,
    isolatedMeaningPt: "pequeno / jovem",
    formationExplanationPt: "Três pequenos grãos de areia ou gotas divididas ao meio, simbolizando algo miúdo.",
    components: [
      { symbol: "小", pinyin: "xiǎo", meaningPt: "três pequenos fragmentos", role: "pictográfico" }
    ]
  },
  "美": {
    char: "美",
    pinyin: "měi",
    hskLevel: 1,
    isolatedMeaningPt: "belo / bonito / beleza",
    formationExplanationPt: "Combina 羊 (yáng, 'carneiro/cabra') no topo com 大 (dà, 'grande') na base: na cultura antiga, um carneiro grande ou um adorno de plumas na cabeça simbolizava beleza e prosperidade.",
    components: [
      { symbol: "羊", pinyin: "yáng", meaningPt: "carneiro / adorno superior", role: "semântico" },
      { symbol: "大", pinyin: "dà", meaningPt: "grande / pessoa adornada", role: "semântico" }
    ]
  },
  "手": {
    char: "手",
    pinyin: "shǒu",
    hskLevel: 1,
    isolatedMeaningPt: "mão",
    formationExplanationPt: "Pictograma de uma mão aberta mostrando os cinco dedos e a linha do pulso.",
    components: [
      { symbol: "手", pinyin: "shǒu", meaningPt: "mão com dedos abertos", role: "pictográfico" }
    ]
  },
  "有": {
    char: "有",
    pinyin: "yǒu",
    hskLevel: 1,
    isolatedMeaningPt: "ter / haver / existir",
    formationExplanationPt: "Uma mão (𠂇) no topo segurando um pedaço de carne/lua (月) → possuir algo concreto ('ter').",
    components: [
      { symbol: "𠂇", pinyin: "zuǒ", meaningPt: "mão que segura", role: "pictográfico" },
      { symbol: "月 (肉)", pinyin: "ròu", meaningPt: "carne / posse valiosa", role: "semântico" }
    ]
  },
  "两": {
    char: "两",
    pinyin: "liǎng",
    hskLevel: 1,
    isolatedMeaningPt: "dois (usado obrigatoriamente antes de classificadores)",
    formationExplanationPt: "Mostra dois elementos simétricos (人 + 人) equilibrados sob uma balança ou canga → um par ('dois').",
    components: [
      { symbol: "一/冂", pinyin: "jiōng", meaningPt: "balança / moldura dupla", role: "pictográfico" },
      { symbol: "人", pinyin: "rén", meaningPt: "par simétrico", role: "pictográfico" }
    ]
  },
  "旧": {
    char: "旧",
    pinyin: "jiù",
    hskLevel: 2,
    isolatedMeaningPt: "usado / antigo / velho (para objetos, não pessoas)",
    formationExplanationPt: "Um traço vertical (丨) ao lado do Sol/dia (日) que já passou → algo que tem história e uso anterior.",
    components: [
      { symbol: "丨", pinyin: "gǔn", meaningPt: "tempo decorrido", role: "estrutural" },
      { symbol: "日", pinyin: "rì", meaningPt: "sol / dias passados", role: "semântico" }
    ]
  },
  "高": {
    char: "高",
    pinyin: "gāo",
    hskLevel: 1,
    isolatedMeaningPt: "alto / elevado (e em 高兴: feliz)",
    formationExplanationPt: "Pictograma de um pavilhão ou torre alta de dois andares com telhado pontiagudo e portão na base.",
    components: [
      { symbol: "亠", pinyin: "tóu", meaningPt: "telhado superior da torre", role: "pictográfico" },
      { symbol: "口", pinyin: "kǒu", meaningPt: "janelas e entrada da torre", role: "pictográfico" }
    ]
  },
  "兴": {
    char: "兴",
    pinyin: "xìng",
    hskLevel: 1,
    isolatedMeaningPt: "ânimo / entusiasmo / erguer",
    formationExplanationPt: "Várias mãos erguendo juntas um objeto ao alto → entusiasmo e alegria coletiva (高兴 gāoxìng = 'espírito elevado → feliz').",
    components: [
      { symbol: "八", pinyin: "bā", meaningPt: "mãos que apoiam na base", role: "pictográfico" }
    ]
  },
  "叫": {
    char: "叫",
    pinyin: "jiào",
    hskLevel: 1,
    isolatedMeaningPt: "chamar / chamar-se / gritar",
    formationExplanationPt: "Radical de boca (口) à esquerda + 丩 (jiū, fonético que lembra som projetado) à direita.",
    components: [
      { symbol: "口", pinyin: "kǒu", meaningPt: "boca que chama", role: "semântico" },
      { symbol: "丩", pinyin: "jiū", meaningPt: "som projetado (fonético)", role: "fonético" }
    ]
  },
  "找": {
    char: "找",
    pinyin: "zhǎo",
    hskLevel: 1,
    isolatedMeaningPt: "procurar / buscar / dar troco",
    formationExplanationPt: "Radical de mão (扌) à esquerda + 戈 (gē, alabarda/instrumento) à direita → estender a mão em busca de alguém ou algo.",
    components: [
      { symbol: "扌", pinyin: "shǒu", meaningPt: "mão em busca", role: "semântico" },
      { symbol: "戈", pinyin: "gē", meaningPt: "alcance / busca", role: "estrutural" }
    ]
  },
  "久": {
    char: "久",
    pinyin: "jiǔ",
    hskLevel: 1,
    isolatedMeaningPt: "muito tempo / longa duração",
    formationExplanationPt: "Figura inclinada com um apoio atrás das pernas, indicando permanecer em um estado por longo tempo (好久 = 'há muito tempo').",
    components: [
      { symbol: "久", pinyin: "jiǔ", meaningPt: "duração prolongada", role: "pictográfico" }
    ]
  },
  "好": {
    char: "好",
    pinyin: "hǎo",
    hskLevel: 1,
    isolatedMeaningPt: "bom / bem / muito (antes de 久/多)",
    formationExplanationPt: "Ideograma clássico de afeto e bem-estar: mulher/mãe (女) à esquerda junto de seu filho/criança (子) à direita → 'bom / harmonia'.",
    components: [
      { symbol: "女", pinyin: "nǚ", meaningPt: "mulher / mãe", role: "semântico" },
      { symbol: "子", pinyin: "zǐ", meaningPt: "filho / criança", role: "semântico" }
    ]
  },
  "下": {
    char: "下",
    pinyin: "xià",
    hskLevel: 1,
    isolatedMeaningPt: "embaixo / descer / cair (chuva) / próximo",
    formationExplanationPt: "Indicativo oposto a 上: um traço vertical apontando para baixo a partir de uma linha horizontal superior.",
    components: [
      { symbol: "一", pinyin: "yī", meaningPt: "linha base superior", role: "pictográfico" },
      { symbol: "卜", pinyin: "bǔ", meaningPt: "marcador apontando para baixo", role: "pictográfico" }
    ]
  },
  "雨": {
    char: "雨",
    pinyin: "yǔ",
    hskLevel: 1,
    isolatedMeaningPt: "chuva",
    formationExplanationPt: "Pictograma cristalino: o céu (一) e a nuvem (冂) com quatro gotas de água caindo lá dentro.",
    components: [
      { symbol: "雨", pinyin: "yǔ", meaningPt: "gotas caindo da nuvem", role: "pictográfico" }
    ]
  },
  "买": {
    char: "买",
    pinyin: "mǎi",
    hskLevel: 1,
    isolatedMeaningPt: "comprar",
    formationExplanationPt: "Derivado de 買 (rede que recolhe + concha de dinheiro 贝): adquirir mercadorias.",
    components: [
      { symbol: "乛", pinyin: "wǎng", meaningPt: "recolher / adquirir", role: "semântico" },
      { symbol: "头", pinyin: "tóu", meaningPt: "base derivada de 贝 (moeda)", role: "semântico" }
    ]
  },
  "送": {
    char: "送",
    pinyin: "sòng",
    hskLevel: 2,
    isolatedMeaningPt: "presentear / entregar / acompanhar alguém",
    formationExplanationPt: "Une 关 (segurar com as duas mãos) com o radical de caminhar (辶) → levar algo até outra pessoa como presente.",
    components: [
      { symbol: "辶", pinyin: "chuò", meaningPt: "caminhar / levar até", role: "semântico" },
      { symbol: "关", pinyin: "guān", meaningPt: "oferecer com as mãos", role: "semântico" }
    ]
  },
  "给": {
    char: "给",
    pinyin: "gěi",
    hskLevel: 1,
    isolatedMeaningPt: "dar / para (destinatário)",
    formationExplanationPt: "Radical de fio de seda (纟, ligar/conectar) à esquerda + 合 (hé, 'juntar/unir') à direita → entregar algo conectando quem dá e quem recebe.",
    components: [
      { symbol: "纟", pinyin: "sī", meaningPt: "fio de seda / conexão", role: "semântico" },
      { symbol: "合", pinyin: "hé", meaningPt: "unir / entregar", role: "semântico" }
    ]
  },
  "你": {
    char: "你",
    pinyin: "nǐ",
    hskLevel: 1,
    isolatedMeaningPt: "você / tu",
    formationExplanationPt: "Radical de pessoa (亻) à esquerda + 尔 (ěr, 'tu' em chinês clássico) à direita.",
    components: [
      { symbol: "亻", pinyin: "rén", meaningPt: "pessoa", role: "semântico" },
      { symbol: "尔", pinyin: "ěr", meaningPt: "tu (fonético e histórico)", role: "fonético" }
    ]
  },
  "我": {
    char: "我",
    pinyin: "wǒ",
    hskLevel: 1,
    isolatedMeaningPt: "eu / me",
    formationExplanationPt: "Combina的手 (mão) à esquerda segurando uma alabarda (戈) à direita, usado desde as inscrições em ossos oraculares como pronome de 1ª pessoa ('eu').",
    components: [
      { symbol: "手", pinyin: "shǒu", meaningPt: "mão", role: "pictográfico" },
      { symbol: "戈", pinyin: "gē", meaningPt: "lança / afirmação do eu", role: "pictográfico" }
    ]
  },
  "们": {
    char: "们",
    pinyin: "men",
    hskLevel: 1,
    isolatedMeaningPt: "sufixo de plural para pronomes e pessoas (我们 = nós)",
    formationExplanationPt: "Radical de pessoa (亻) à esquerda + 门 (mén, 'porta', dando o som men) à direita.",
    components: [
      { symbol: "亻", pinyin: "rén", meaningPt: "pessoas (plural)", role: "semântico" },
      { symbol: "门", pinyin: "mén", meaningPt: "porta (fonético men)", role: "fonético" }
    ]
  },
  "起": {
    char: "起",
    pinyin: "qǐ",
    hskLevel: 1,
    isolatedMeaningPt: "levantar-se / começar (e em 一起: juntos)",
    formationExplanationPt: "Radical de caminhar/correr (走) + 己 (jǐ, 'si mesmo') → erguer o próprio corpo e pôr-se em movimento.",
    components: [
      { symbol: "走", pinyin: "zǒu", meaningPt: "caminhar / erguer-se", role: "semântico" },
      { symbol: "己", pinyin: "jǐ", meaningPt: "si mesmo (fonético)", role: "fonético" }
    ]
  },
  "汉": {
    char: "汉",
    pinyin: "hàn",
    hskLevel: 1,
    isolatedMeaningPt: "etnia Han / chinês (língua e escrita)",
    formationExplanationPt: "Radical de água de 3 gotas (氵) à esquerda referindo-se ao histórico Rio Han (汉水), berço da dinastia Han que deu nome à língua chinesa (汉语) e aos caracteres (汉字).",
    components: [
      { symbol: "氵", pinyin: "shuǐ", meaningPt: "água (Rio Han)", role: "semântico" },
      { symbol: "又", pinyin: "yòu", meaningPt: "forma simplificada fonética", role: "estrutural" }
    ]
  },
  "字": {
    char: "字",
    pinyin: "zì",
    hskLevel: 1,
    isolatedMeaningPt: "caractere / letra / palavra escrita",
    formationExplanationPt: "Uma criança (子) sob um teto (宀): originalmente significava 'criar/multiplicar', e passou a designar os caracteres que se multiplicam a partir de radicais básicos.",
    components: [
      { symbol: "宀", pinyin: "mián", meaningPt: "telhado / abrigo", role: "semântico" },
      { symbol: "子", pinyin: "zǐ", meaningPt: "criança / criação (fonético zì)", role: "fonético" }
    ]
  },
  "故": {
    char: "故",
    pinyin: "gù",
    hskLevel: 2,
    isolatedMeaningPt: "antigo / passado / causa (em 故事: história)",
    formationExplanationPt: "Une 古 (gǔ, 'antigo', dez gerações de tradição oral) à esquerda + 攵 (ação) à direita → fatos que aconteceram no passado.",
    components: [
      { symbol: "古", pinyin: "gǔ", meaningPt: "antigo (dez 十 bocas 口)", role: "semântico" },
      { symbol: "攵", pinyin: "pū", meaningPt: "ação / transmissão", role: "semântico" }
    ]
  },
  "事": {
    char: "事",
    pinyin: "shì",
    hskLevel: 1,
    isolatedMeaningPt: "assunto / acontecimento / coisa",
    formationExplanationPt: "Mostra uma mão (彐) segurando um estandarte ou registro vertical → um fato ou acontecimento registrado (故事 gùshi = 'acontecimento antigo → história').",
    components: [
      { symbol: "口", pinyin: "kǒu", meaningPt: "relato / registro", role: "semântico" },
      { symbol: "彐", pinyin: "jì", meaningPt: "mão que registra", role: "pictográfico" }
    ]
  },
  "真": {
    char: "真",
    pinyin: "zhēn",
    hskLevel: 1,
    isolatedMeaningPt: "verdadeiro / realmente / muito (exclamativo)",
    formationExplanationPt: "Representa um olhar atento (目) sobre um tripé firme (具) → aquilo que é autêntico e real.",
    components: [
      { symbol: "十", pinyin: "shí", meaningPt: "prumo / retidão", role: "semântico" },
      { symbol: "目", pinyin: "mù", meaningPt: "olho que verifica a verdade", role: "semântico" }
    ]
  },
  "意": {
    char: "意",
    pinyin: "yì",
    hskLevel: 2,
    isolatedMeaningPt: "significado / ideia / intenção",
    formationExplanationPt: "Joia etimológica: 音 (yīn, 'som/voz') no topo + 心 (xīn, 'coração/mente') na base → 'o som que nasce dentro do coração' = ideia / significado.",
    components: [
      { symbol: "音", pinyin: "yīn", meaningPt: "som / palavra interior", role: "semântico" },
      { symbol: "心", pinyin: "xīn", meaningPt: "coração / mente", role: "semântico" }
    ]
  },
  "思": {
    char: "思",
    pinyin: "si",
    hskLevel: 2,
    isolatedMeaningPt: "pensar / pensamento / refletir",
    formationExplanationPt: "Une 田 (tián, originalmente o crânio/cérebro) no topo + 心 (xīn, 'coração') na base → para a cultura chinesa, pensar une mente e coração (有意思 = 'tem significado/graça → interessante').",
    components: [
      { symbol: "田", pinyin: "tián", meaningPt: "cabeça / campo mental", role: "semântico" },
      { symbol: "心", pinyin: "xīn", meaningPt: "coração / sentimento", role: "semântico" }
    ]
  },
  "晚": {
    char: "晚",
    pinyin: "wǎn",
    hskLevel: 1,
    isolatedMeaningPt: "noite / tarde (no horário)",
    formationExplanationPt: "Sol (日) à esquerda + 免 (miǎn, 'retirar-se', dando também o som wǎn) à direita → quando o sol se retira e chega o entardecer/noite.",
    components: [
      { symbol: "日", pinyin: "rì", meaningPt: "sol / tempo do dia", role: "semântico" },
      { symbol: "免", pinyin: "miǎn", meaningPt: "retirar-se (fonético)", role: "fonético" }
    ]
  },
  "车": {
    char: "车",
    pinyin: "chē",
    hskLevel: 1,
    isolatedMeaningPt: "veículo / carro / trem",
    formationExplanationPt: "Pictograma de uma carruagem vista de cima, mostrando o eixo central e as rodas.",
    components: [
      { symbol: "车", pinyin: "chē", meaningPt: "eixo e roda de veículo", role: "pictográfico" }
    ]
  },
  "站": {
    char: "站",
    pinyin: "zhàn",
    hskLevel: 1,
    isolatedMeaningPt: "estação / parada / ficar em pé",
    formationExplanationPt: "Radical de ficar em pé (立 lì) à esquerda + 占 (zhàn, 'ocupar um ponto', dando o som zhàn) à direita → ponto de parada ou estação.",
    components: [
      { symbol: "立", pinyin: "lì", meaningPt: "ficar em pé / parar", role: "semântico" },
      { symbol: "占", pinyin: "zhàn", meaningPt: "ponto fixo (fonético zhàn)", role: "fonético" }
    ]
  },
  "火": {
    char: "火",
    pinyin: "huǒ",
    hskLevel: 1,
    isolatedMeaningPt: "fogo",
    formationExplanationPt: "Pictograma de uma fogueira com uma chama central alta e duas fagulhas laterais.",
    components: [
      { symbol: "火", pinyin: "huǒ", meaningPt: "chamas de fogo", role: "pictográfico" }
    ]
  },
  "票": {
    char: "票",
    pinyin: "piào",
    hskLevel: 2,
    isolatedMeaningPt: "bilhete / passagem / ingresso",
    formationExplanationPt: "Originalmente fagulhas leves subindo do fogo (西 + 示), passando a designar cédulas e bilhetes de papel leve.",
    components: [
      { symbol: "覀", pinyin: "xī", meaningPt: "topo do bilhete", role: "estrutural" },
      { symbol: "示", pinyin: "shì", meaningPt: "sinal / comprovante", role: "semântico" }
    ]
  },
  "红": {
    char: "红",
    pinyin: "hóng",
    hskLevel: 1,
    isolatedMeaningPt: "vermelho (cor da sorte na China) / chá preto (红茶)",
    formationExplanationPt: "Radical de fio de seda (纟) à esquerda + 工 (gōng, fonético) à direita → tecido de seda tingido de vermelho.",
    components: [
      { symbol: "纟", pinyin: "sī", meaningPt: "seda / tecido tingido", role: "semântico" },
      { symbol: "工", pinyin: "gōng", meaningPt: "componente fonético", role: "fonético" }
    ]
  },
  "色": {
    char: "色",
    pinyin: "sè",
    hskLevel: 1,
    isolatedMeaningPt: "cor / aspecto / expressão",
    formationExplanationPt: "Mostra uma pessoa inclinada sobre outra, refletindo a cor do rosto e, por extensão, qualquer cor (颜色).",
    components: [
      { symbol: "巴", pinyin: "bā", meaningPt: "contorno visual", role: "pictográfico" }
    ]
  },
  "灯": {
    char: "灯",
    pinyin: "dēng",
    hskLevel: 2,
    isolatedMeaningPt: "lâmpada / lanterna / luz",
    formationExplanationPt: "Composto fono-semântico perfeito: 火 (huǒ, 'fogo/luz') à esquerda + 丁 (dīng, dando o som dēng e o formato de suporte) à direita.",
    components: [
      { symbol: "火", pinyin: "huǒ", meaningPt: "fogo / chama luminosa", role: "semântico" },
      { symbol: "丁", pinyin: "dīng", meaningPt: "suporte / prego (fonético dēng)", role: "fonético" }
    ]
  },
  "笼": {
    char: "笼",
    pinyin: "lóng",
    hskLevel: 3,
    isolatedMeaningPt: "cesto / gaiola / lanterna de bambu (em 灯笼)",
    formationExplanationPt: "Radical de bambu (⺮) no topo indicando a armação trançada + 龙 (lóng, 'dragão', dando o som lóng) na base.",
    components: [
      { symbol: "⺮ (竹)", pinyin: "zhú", meaningPt: "bambu trançado", role: "semântico" },
      { symbol: "龙", pinyin: "lóng", meaningPt: "dragão (fonético lóng)", role: "fonético" }
    ]
  },
  "街": {
    char: "街",
    pinyin: "jiē",
    hskLevel: 2,
    isolatedMeaningPt: "rua / avenida comercial",
    formationExplanationPt: "O caractere 行 (xíng, 'encruzilhada/andar', dividido nas laterais 彳 e 亍) envolvendo 圭 (guī, 'terra batida') no centro → rua pavimentada da cidade.",
    components: [
      { symbol: "行 (彳+亍)", pinyin: "xíng", meaningPt: "encruzilhada / avenida", role: "semântico" },
      { symbol: "圭", pinyin: "guī", meaningPt: "solo / pavimento de terra", role: "semântico" }
    ]
  },
  "老": {
    char: "老",
    pinyin: "lǎo",
    hskLevel: 1,
    isolatedMeaningPt: "velho / antigo / experiente / respeitável",
    formationExplanationPt: "Pictograma de uma pessoa idosa de cabelos longos e costas curvadas apoiada em um cajado.",
    components: [
      { symbol: "耂", pinyin: "lǎo", meaningPt: "idoso de cabelos longos", role: "pictográfico" },
      { symbol: "匕", pinyin: "bǐ", meaningPt: "apoio / cajado", role: "pictográfico" }
    ]
  },
  "师": {
    char: "师",
    pinyin: "shī",
    hskLevel: 1,
    isolatedMeaningPt: "mestre / professor",
    formationExplanationPt: "Representa uma colina/insígnia de comando à esquerda e um estandarte (巾) à direita → aquele que guia e ensina (老师 = professor).",
    components: [
      { symbol: "巾", pinyin: "jīn", meaningPt: "estandarte / modelo a seguir", role: "semântico" }
    ]
  },
  "猫": {
    char: "猫",
    pinyin: "māo",
    hskLevel: 1,
    isolatedMeaningPt: "gato",
    formationExplanationPt: "Composto fono-semântico delicioso: radical de animal quadrúpede (犭) à esquerda + 苗 (miáo, 'broto no campo', que imita o miado 'miao!' do gato) à direita.",
    components: [
      { symbol: "犭", pinyin: "quǎn", meaningPt: "animal mamífero/quadrúpede", role: "semântico" },
      { symbol: "苗", pinyin: "miáo", meaningPt: "broto (onomatopeia do miado māo/miáo)", role: "fonético" }
    ]
  },
  "只": {
    char: "只",
    pinyin: "zhī",
    hskLevel: 2,
    isolatedMeaningPt: "classificador para animais pequenos (gatos, pássaros) / apenas (zhǐ)",
    formationExplanationPt: "Originalmente mostrava um único pássaro na mão, tornando-se o classificador padrão para animais como gatos (一只猫).",
    components: [
      { symbol: "口", pinyin: "kǒu", meaningPt: "corpo do pequeno animal", role: "pictográfico" },
      { symbol: "八", pinyin: "bā", meaningPt: "patas / asas", role: "pictográfico" }
    ]
  },
  "睡": {
    char: "睡",
    pinyin: "shuì",
    hskLevel: 1,
    isolatedMeaningPt: "dormir",
    formationExplanationPt: "Ideograma fono-semântico: 目 (mù, 'olho') à esquerda + 垂 (chuí, 'pender/cair pesadamente') à direita → quando as pálpebras dos olhos pesam e se fecham = dormir.",
    components: [
      { symbol: "目", pinyin: "mù", meaningPt: "olho / pálpebra", role: "semântico" },
      { symbol: "垂", pinyin: "chuí", meaningPt: "pender / pesar para baixo", role: "semântico" }
    ]
  },
  "椅子": {
    char: "椅",
    pinyin: "yǐ",
    hskLevel: 2,
    isolatedMeaningPt: "cadeira",
    formationExplanationPt: "Radical de madeira (木) à esquerda + 奇 (qí/yī, 'apoiar-se') à direita → móvel de madeira com encosto para se apoiar.",
    components: [
      { symbol: "木", pinyin: "mù", meaningPt: "madeira", role: "semântico" },
      { symbol: "奇", pinyin: "qí", meaningPt: "apoiar-se (fonético)", role: "fonético" }
    ]
  },
  "椅": {
    char: "椅",
    pinyin: "yǐ",
    hskLevel: 2,
    isolatedMeaningPt: "cadeira",
    formationExplanationPt: "Radical de madeira (木) à esquerda + 奇 (apoiar-se) à direita → móvel de madeira com encosto.",
    components: [
      { symbol: "木", pinyin: "mù", meaningPt: "madeira / móvel", role: "semântico" },
      { symbol: "奇", pinyin: "qí", meaningPt: "apoiar-se (fonético yǐ)", role: "fonético" }
    ]
  },
  "山": {
    char: "山",
    pinyin: "shān",
    hskLevel: 1,
    isolatedMeaningPt: "montanha / colina",
    formationExplanationPt: "Pictograma puro de uma cadeia montanhosa com três picos, sendo o pico central mais elevado.",
    components: [
      { symbol: "山", pinyin: "shān", meaningPt: "três picos de montanha", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "高山", pinyin: "gāoshān", meaningPt: "montanha alta" },
      { word: "山上", pinyin: "shān shàng", meaningPt: "no alto da montanha" }
    ]
  },
  "心": {
    char: "心",
    pinyin: "xīn",
    hskLevel: 1,
    isolatedMeaningPt: "coração / mente / espírito / interior",
    formationExplanationPt: "Pictograma anatômico estilizado do coração humano com suas câmaras e artérias superiores. Na filosofia chinesa, 心 une razão e emoção (coração-mente).",
    components: [
      { symbol: "心", pinyin: "xīn", meaningPt: "coração / mente", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "心里", pinyin: "xīnlǐ", meaningPt: "no coração / por dentro" },
      { word: "小心", pinyin: "xiǎoxīn", meaningPt: "ter cuidado" }
    ]
  },
  "怕": {
    char: "怕",
    pinyin: "pà",
    hskLevel: 2,
    isolatedMeaningPt: "temer / ter medo",
    formationExplanationPt: "Composto fono-semântico expressivo: radical de coração vertical (忄) à esquerda + 白 (bái, 'branco/pálido', dando também a pista sonora pà/bó) à direita → quando o coração faz o rosto ficar pálido de susto = sentir medo.",
    components: [
      { symbol: "忄 (心)", pinyin: "xīn", meaningPt: "coração / emoção", role: "semântico" },
      { symbol: "白", pinyin: "bái", meaningPt: "branco / pálido (fonético e imagético)", role: "fonético" }
    ],
    commonExamples: [
      { word: "害怕", pinyin: "hàipà", meaningPt: "ter medo / temer" },
      { word: "不怕", pinyin: "bú pà", meaningPt: "não ter medo" }
    ]
  },
  "害": {
    char: "害",
    pinyin: "hài",
    hskLevel: 2,
    isolatedMeaningPt: "dano / mal / recear (em 害怕: sentir medo)",
    formationExplanationPt: "Mostra um teto (宀) com hastes de bloqueio (丰) sobre uma boca (口) → vulnerabilidade ou receio de sofrer algum mal.",
    components: [
      { symbol: "宀", pinyin: "mián", meaningPt: "teto / abrigo", role: "semântico" },
      { symbol: "丰", pinyin: "fēng", meaningPt: "bloqueio / perturbação", role: "semântico" },
      { symbol: "口", pinyin: "kǒu", meaningPt: "boca / fala", role: "semântico" }
    ],
    commonExamples: [
      { word: "害怕", pinyin: "hàipà", meaningPt: "sentir medo" }
    ]
  },
  "勇": {
    char: "勇",
    pinyin: "yǒng",
    hskLevel: 3,
    isolatedMeaningPt: "corajoso / bravo / destemido",
    formationExplanationPt: "Composto fono-semântico: 甬 (yǒng, 'brotar/avançar por um caminho', dando o som yǒng) no topo + 力 (lì, 'força/vigor') na base → a força interior que impulsiona alguém a avançar.",
    components: [
      { symbol: "甬", pinyin: "yǒng", meaningPt: "brotar / caminho à frente (fonético yǒng)", role: "fonético" },
      { symbol: "力", pinyin: "lì", meaningPt: "força / vigor", role: "semântico" }
    ],
    commonExamples: [
      { word: "勇气", pinyin: "yǒngqì", meaningPt: "coragem / bravura" },
      { word: "勇敢", pinyin: "yǒnggǎn", meaningPt: "corajoso" }
    ]
  },
  "气": {
    char: "气",
    pinyin: "qì",
    hskLevel: 1,
    isolatedMeaningPt: "ar / sopro vital / energia / espírito (Qi)",
    formationExplanationPt: "Pictograma de três camadas de vapor ou nuvens subindo para o céu. Na filosofia chinesa, 气 (Qi) é a energia vital que anima o corpo e a alma (勇气 = 'energia da bravura → coragem').",
    components: [
      { symbol: "气", pinyin: "qì", meaningPt: "vapor / sopro vital", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "天气", pinyin: "tiānqì", meaningPt: "clima / tempo" },
      { word: "勇气", pinyin: "yǒngqì", meaningPt: "coragem" }
    ]
  },
  "敢": {
    char: "敢",
    pinyin: "gǎn",
    hskLevel: 3,
    isolatedMeaningPt: "ousar / atrever-se / ter coragem de agir",
    formationExplanationPt: "Mostra uma mão em ação decidida (攵) enfrentando um obstáculo/javali à esquerda → ter a ousadia de agir diante do perigo.",
    components: [
      { symbol: "耳", pinyin: "ěr", meaningPt: "enfrentar de frente", role: "estrutural" },
      { symbol: "攵", pinyin: "pū", meaningPt: "mão que age com firmeza", role: "semântico" }
    ],
    commonExamples: [
      { word: "勇敢", pinyin: "yǒnggǎn", meaningPt: "corajoso / valente" }
    ]
  },
  "石": {
    char: "石",
    pinyin: "shí",
    hskLevel: 2,
    isolatedMeaningPt: "pedra / rocha",
    formationExplanationPt: "Pictograma de um penhasco rochoso (厂) com um bloco de pedra (口) desprendido na base.",
    components: [
      { symbol: "厂", pinyin: "hǎn", meaningPt: "encosta de penhasco", role: "pictográfico" },
      { symbol: "口", pinyin: "kǒu", meaningPt: "bloco de rocha", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "石头", pinyin: "shítou", meaningPt: "pedra" }
    ]
  },
  "头": {
    char: "头",
    pinyin: "tóu",
    hskLevel: 1,
    isolatedMeaningPt: "cabeça / topo / sufixo nominal para objetos sólidos (石头 = pedra)",
    formationExplanationPt: "Derivado de 頭 (cabeça humana): em palavras como 石头 (shítou, 'pedra') e 木头 (mùtou, 'madeira'), funciona como sufixo nominal em tom neutro.",
    components: [
      { symbol: "丶", pinyin: "zhǔ", meaningPt: "topo / cabelos", role: "pictográfico" },
      { symbol: "大", pinyin: "dà", meaningPt: "figura humana", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "石头", pinyin: "shítou", meaningPt: "pedra" }
    ]
  },
  "冷": {
    char: "冷",
    pinyin: "lěng",
    hskLevel: 1,
    isolatedMeaningPt: "frio / gelado",
    formationExplanationPt: "Composto fono-semântico: radical de gelo de duas gotas (冫) à esquerda + 令 (lìng, dando o som lěng) à direita → temperatura fria.",
    components: [
      { symbol: "冫", pinyin: "bīng", meaningPt: "cristal de gelo / frio", role: "semântico" },
      { symbol: "令", pinyin: "lìng", meaningPt: "componente fonético (lěng)", role: "fonético" }
    ],
    commonExamples: [
      { word: "很冷", pinyin: "hěn lěng", meaningPt: "muito frio" }
    ]
  },
  "雪": {
    char: "雪",
    pinyin: "xuě",
    hskLevel: 2,
    isolatedMeaningPt: "neve",
    formationExplanationPt: "Ideograma poético: chuva que cai do céu (雨 no topo) e que pode ser varrida com a mão/vassoura (彐 na base) porque é sólida e branca = neve.",
    components: [
      { symbol: "雨", pinyin: "yǔ", meaningPt: "chuva / precipitação das nuvens", role: "semântico" },
      { symbol: "彐", pinyin: "jì", meaningPt: "mão / vassoura que limpa a neve", role: "semântico" }
    ],
    commonExamples: [
      { word: "下雪", pinyin: "xiàxuě", meaningPt: "nevar" },
      { word: "白雪", pinyin: "báixuě", meaningPt: "neve branca" }
    ]
  },
  "路": {
    char: "路",
    pinyin: "lù",
    hskLevel: 1,
    isolatedMeaningPt: "caminho / estrada / jornada",
    formationExplanationPt: "Radical de pé (⻊/足) à esquerda + 各 (gè, 'cada um seguindo seu rumo') à direita → o caminho percorrido pelos pés.",
    components: [
      { symbol: "⻊ (足)", pinyin: "zú", meaningPt: "pé / caminhar", role: "semântico" },
      { symbol: "各", pinyin: "gè", meaningPt: "ir / deslocar-se (fonético)", role: "fonético" }
    ],
    commonExamples: [
      { word: "山路", pinyin: "shānlù", meaningPt: "caminho da montanha" },
      { word: "走路", pinyin: "zǒulù", meaningPt: "caminhar / andar" }
    ]
  },
  "住": {
    char: "住",
    pinyin: "zhù",
    hskLevel: 1,
    isolatedMeaningPt: "morar / habitar / parar firme",
    formationExplanationPt: "Radical de pessoa (亻) à esquerda + 主 (zhǔ, 'anfitrião/lamparina fixa', dando o som zhù) à direita → o lugar onde uma pessoa permanece e habita.",
    components: [
      { symbol: "亻", pinyin: "rén", meaningPt: "pessoa", role: "semântico" },
      { symbol: "主", pinyin: "zhǔ", meaningPt: "permanecer / dono (fonético zhù)", role: "fonético" }
    ],
    commonExamples: [
      { word: "住在", pinyin: "zhù zài", meaningPt: "morar em" }
    ]
  },
  "但": {
    char: "但",
    pinyin: "dàn",
    hskLevel: 2,
    isolatedMeaningPt: "mas / porém (em 但是)",
    formationExplanationPt: "Radical de pessoa (亻) à esquerda + 旦 (dàn, 'sol nascendo no horizonte', dando o som dàn) à direita.",
    components: [
      { symbol: "亻", pinyin: "rén", meaningPt: "pessoa", role: "semântico" },
      { symbol: "旦", pinyin: "dàn", meaningPt: "alvorada (fonético dàn)", role: "fonético" }
    ],
    commonExamples: [
      { word: "但是", pinyin: "dànshì", meaningPt: "mas / porém / contudo" }
    ]
  },
  "每": {
    char: "每",
    pinyin: "měi",
    hskLevel: 2,
    isolatedMeaningPt: "cada / todo",
    formationExplanationPt: "Originalmente mostrava uma planta brotando incessantemente sobre uma mãe (母) → repetição constante: 'cada / toda vez'.",
    components: [
      { symbol: "𠂉", pinyin: "tóu", meaningPt: "broto que se renova", role: "pictográfico" },
      { symbol: "母", pinyin: "mǔ", meaningPt: "mãe / origem (fonético)", role: "fonético" }
    ],
    commonExamples: [
      { word: "每天", pinyin: "měitiān", meaningPt: "todos os dias" },
      { word: "每次", pinyin: "měi cì", meaningPt: "toda vez / cada vez" }
    ]
  },
  "次": {
    char: "次",
    pinyin: "cì",
    hskLevel: 1,
    isolatedMeaningPt: "vez (classificador de frequência) / seguinte",
    formationExplanationPt: "Mostra duas marcas (冫) + pessoa respirando em sequência (欠) → ordem de acontecimentos ou número de vezes (一次 = uma vez, 每次 = toda vez).",
    components: [
      { symbol: "冫", pinyin: "èr", meaningPt: "sequência / repetição", role: "semântico" },
      { symbol: "欠", pinyin: "qiàn", meaningPt: "pessoa / sopro em sequência", role: "semântico" }
    ],
    commonExamples: [
      { word: "每次", pinyin: "měi cì", meaningPt: "toda vez" },
      { word: "第一次", pinyin: "dì yī cì", meaningPt: "primeira vez" }
    ]
  },
  "前": {
    char: "前",
    pinyin: "qián",
    hskLevel: 1,
    isolatedMeaningPt: "frente / adiante / antes",
    formationExplanationPt: "Originalmente mostrava um pé avançando sobre um barco → seguir em frente (往前走 = caminhar para a frente).",
    components: [
      { symbol: "月", pinyin: "zhōu", meaningPt: "embarcação que avança", role: "semântico" },
      { symbol: "刂", pinyin: "dāo", meaningPt: "abrir caminho à frente", role: "semântico" }
    ],
    commonExamples: [
      { word: "前面", pinyin: "qiánmiàn", meaningPt: "na frente / adiante" },
      { word: "以前", pinyin: "yǐqián", meaningPt: "antes / antigamente" }
    ]
  },
  "动": {
    char: "动",
    pinyin: "dòng",
    hskLevel: 1,
    isolatedMeaningPt: "mover-se / agir / movimento",
    formationExplanationPt: "Combina 云 (nuvem em movimento) à esquerda + 力 (lì, 'força/músculo') à direita → aplicar força para gerar movimento.",
    components: [
      { symbol: "云", pinyin: "yún", meaningPt: "movimento contínuo", role: "semântico" },
      { symbol: "力", pinyin: "lì", meaningPt: "força / energia", role: "semântico" }
    ]
  },
  "剑": {
    char: "剑",
    pinyin: "jiàn",
    hskLevel: 3,
    isolatedMeaningPt: "espada de dois gumes",
    formationExplanationPt: "Composto fono-semântico: 佥 (qiān, fonético) à esquerda + radical de lâmina/faca vertical (刂) à direita → a espada tradicional do guerreiro e espadachim chinês.",
    components: [
      { symbol: "佥", pinyin: "qiān", meaningPt: "unir / componente fonético", role: "fonético" },
      { symbol: "刂 (刀)", pinyin: "dāo", meaningPt: "lâmina / espada afiada", role: "semântico" }
    ]
  },
  "救": {
    char: "救",
    pinyin: "jiù",
    hskLevel: 3,
    isolatedMeaningPt: "salvar / socorrer / resgatar",
    formationExplanationPt: "Composto fono-semântico: 求 (qiú, 'pedir ajuda', dando o som jiù) à esquerda + 攵 (mão que age prontamente) à direita → agir para socorrer quem precisa.",
    components: [
      { symbol: "求", pinyin: "qiú", meaningPt: "pedido de socorro (fonético jiù)", role: "fonético" },
      { symbol: "攵", pinyin: "pū", meaningPt: "mão que intervém e salva", role: "semântico" }
    ]
  },
  "直": {
    char: "直",
    pinyin: "zhí",
    hskLevel: 2,
    isolatedMeaningPt: "reto / direto / sempre (em 一直: o tempo todo / sempre)",
    formationExplanationPt: "Um olho (目) olhando ao longo de uma linha perfeitamente vertical (十) e uma base reta (L) → sem desvio, reto, continuamente (一直).",
    components: [
      { symbol: "十", pinyin: "shí", meaningPt: "linha de prumo reta", role: "semântico" },
      { symbol: "目", pinyin: "mù", meaningPt: "olho que mira em linha reta", role: "semântico" }
    ],
    commonExamples: [
      { word: "一直", pinyin: "yìzhí", meaningPt: "sempre / o tempo todo / reto" }
    ]
  },
  "城": {
    char: "城",
    pinyin: "chéng",
    hskLevel: 2,
    isolatedMeaningPt: "muralha / cidade",
    formationExplanationPt: "Composto fono-semântico: radical de terra batida (土) à esquerda indicando as grandes muralhas + 成 (chéng, 'completar/erguer', dando o som chéng) à direita → cidade murada.",
    components: [
      { symbol: "土", pinyin: "tǔ", meaningPt: "terra batida da muralha", role: "semântico" },
      { symbol: "成", pinyin: "chéng", meaningPt: "erguer / fonético chéng", role: "fonético" }
    ],
    commonExamples: [
      { word: "城门", pinyin: "chéngmén", meaningPt: "portão da cidade" }
    ]
  },
  "河": {
    char: "河",
    pinyin: "hé",
    hskLevel: 2,
    isolatedMeaningPt: "rio",
    formationExplanationPt: "Radical de água de três gotas (氵) à esquerda + 可 (kě, fonético antigo que evoca o som da correnteza) à direita → curso de água natural, rio.",
    components: [
      { symbol: "氵", pinyin: "shuǐ", meaningPt: "água corrente", role: "semântico" },
      { symbol: "可", pinyin: "kě", meaningPt: "componente fonético", role: "fonético" }
    ],
    commonExamples: [
      { word: "大河", pinyin: "dàhé", meaningPt: "grande rio" }
    ]
  },
  "桥": {
    char: "桥",
    pinyin: "qiáo",
    hskLevel: 3,
    isolatedMeaningPt: "ponte",
    formationExplanationPt: "Composto fono-semântico: radical de árvore/madeira (木) à esquerda indicando as vigas das pontes antigas + 乔 (qiáo, 'alto/arqueado', dando o som qiáo) à direita → estrutura de madeira elevada sobre a água.",
    components: [
      { symbol: "木", pinyin: "mù", meaningPt: "madeira / estrutura", role: "semântico" },
      { symbol: "乔", pinyin: "qiáo", meaningPt: "alto / arqueado (fonético qiáo)", role: "fonético" }
    ],
    commonExamples: [
      { word: "木桥", pinyin: "mùqiáo", meaningPt: "ponte de madeira" }
    ]
  },
  "木": {
    char: "木",
    pinyin: "mù",
    hskLevel: 1,
    isolatedMeaningPt: "árvore / madeira",
    formationExplanationPt: "Pictograma direto de uma árvore: o traço vertical é o tronco, os traços superiores/laterais são a copa e os inferiores são as raízes sob a terra.",
    components: [
      { symbol: "木", pinyin: "mù", meaningPt: "tronco, galhos e raízes da árvore", role: "pictográfico" }
    ],
    commonExamples: [
      { word: "木桥", pinyin: "mùqiáo", meaningPt: "ponte de madeira" }
    ]
  },
  "风": {
    char: "风",
    pinyin: "fēng",
    hskLevel: 1,
    isolatedMeaningPt: "vento",
    formationExplanationPt: "Mostra o contorno de uma vela ou corrente de ar que se espalha (几) com movimento interno (乂) → o sopro do vento.",
    components: [
      { symbol: "几", pinyin: "jī", meaningPt: "envelope de corrente de ar", role: "pictográfico" },
      { symbol: "乂", pinyin: "yì", meaningPt: "turbilhão / movimento do ar", role: "semântico" }
    ],
    commonExamples: [
      { word: "大风", pinyin: "dàfēng", meaningPt: "vento forte / ventania" }
    ]
  },
  "黑": {
    char: "黑",
    pinyin: "hēi",
    hskLevel: 2,
    isolatedMeaningPt: "preto / escuro",
    formationExplanationPt: "Pictograma antigo de uma chaminé ou janela por onde sai fumaça escurecida pelo fogo (灬, quatro brasas na base) → cor preta da fuligem ou escuridão da noite.",
    components: [
      { symbol: "里", pinyin: "lǐ", meaningPt: "chaminé / janela coberta de fuligem", role: "pictográfico" },
      { symbol: "灬 (火)", pinyin: "huǒ", meaningPt: "chamas de fogo na base", role: "semântico" }
    ],
    commonExamples: [
      { word: "天黑", pinyin: "tiānhēi", meaningPt: "escurecer / anoitecer" }
    ]
  },
  "慢": {
    char: "慢",
    pinyin: "màn",
    hskLevel: 2,
    isolatedMeaningPt: "devagar / lento",
    formationExplanationPt: "Radical de coração/mente (忄) à esquerda + 曼 (màn, 'estender-se longamente', dando o som màn) à direita → ritmo calmo e pausado.",
    components: [
      { symbol: "忄 (心)", pinyin: "xīn", meaningPt: "coração / ritmo mental", role: "semântico" },
      { symbol: "曼", pinyin: "màn", meaningPt: "prolongado (fonético màn)", role: "fonético" }
    ],
    commonExamples: [
      { word: "慢慢", pinyin: "mànmàn", meaningPt: "bem devagar / passo a passo" }
    ]
  },
  "快": {
    char: "快",
    pinyin: "kuài",
    hskLevel: 1,
    isolatedMeaningPt: "rápido / depressa / feliz",
    formationExplanationPt: "Radical de coração (忄) à esquerda + 夬 (guài, 'decisão rápida/fluir') à direita → agilidade ou coração leve.",
    components: [
      { symbol: "忄 (心)", pinyin: "xīn", meaningPt: "coração / impulso", role: "semântico" },
      { symbol: "夬", pinyin: "guài", meaningPt: "decisão ágil", role: "fonético" }
    ]
  },
  "远": {
    char: "远",
    pinyin: "yuǎn",
    hskLevel: 2,
    isolatedMeaningPt: "longe / distante",
    formationExplanationPt: "Radical de caminhar na estrada (辶) envolvendo 元 (yuán, dando o som yuǎn) → um caminho longo a percorrer.",
    components: [
      { symbol: "辶", pinyin: "chuò", meaningPt: "caminhar / estrada", role: "semântico" },
      { symbol: "元", pinyin: "yuán", meaningPt: "componente fonético (yuǎn)", role: "fonético" }
    ]
  },
  "脚": {
    char: "脚",
    pinyin: "jiǎo",
    hskLevel: 3,
    isolatedMeaningPt: "pé / perna / base (山脚 = pé da montanha)",
    formationExplanationPt: "Radical de carne/corpo (月/肉) à esquerda + 却 (què, 'recuar/passo') à direita → parte do corpo que dá os passos.",
    components: [
      { symbol: "月 (肉)", pinyin: "ròu", meaningPt: "parte do corpo", role: "semântico" },
      { symbol: "却", pinyin: "què", meaningPt: "passo / movimento", role: "fonético" }
    ]
  },
  "空": {
    char: "空",
    pinyin: "kōng",
    hskLevel: 2,
    isolatedMeaningPt: "vazio / céu / espaço aberto",
    formationExplanationPt: "Radical de caverna/abóbada (穴) no topo + 工 (gōng, dando o som kōng e a ideia de espaço escavado) na base → espaço aberto, vazio silencioso.",
    components: [
      { symbol: "穴", pinyin: "xué", meaningPt: "caverna / espaço abobadado", role: "semântico" },
      { symbol: "工", pinyin: "gōng", meaningPt: "componente fonético (kōng)", role: "fonético" }
    ]
  }
};

/**
 * Helper to look up or synthesize a CharacterEtymology so every single character clicked in the app has full details
 */
export function getCharacterEtymology(char: string, fallbackPinyin = "", fallbackHsk: HskLevel = 1, fallbackMeaning = ""): CharacterEtymology {
  if (CHARACTER_DICTIONARY[char]) {
    return CHARACTER_DICTIONARY[char];
  }
  return {
    char,
    pinyin: fallbackPinyin,
    hskLevel: fallbackHsk,
    isolatedMeaningPt: fallbackMeaning || "Caractere integrante do vocabulário da história",
    formationExplanationPt: `Caractere "${char}" (${fallbackPinyin}) pertencente ao vocabulário HSK ${fallbackHsk}, utilizado na formação de palavras compostas deste capítulo.`,
    components: [
      {
        symbol: char,
        pinyin: fallbackPinyin,
        meaningPt: fallbackMeaning || "Unidade semântica base",
        role: "semântico"
      }
    ]
  };
}

