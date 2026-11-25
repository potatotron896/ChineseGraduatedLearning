---
name: create-story
description: Protocolo oficial para criar, revisar gramaticalmente e integrar histórias de leitura graduada em Mandarim (HSK 3.0) no aplicativo WenDu (文读), garantindo 100% de naturalidade gramatical, respeito estrito às porcentagens de nível HSK, decomposição etimológica de palavras e caracteres em Português (PT-BR) e geração de áudio neural sincronizado.
---

# Skill: Criação de Histórias Graduadas de Mandarim (`create-story`)

Use esta skill sempre que o usuário pedir para criar, traduzir, expandir ou editar uma história ou capítulo em Mandarim no projeto **WenDu (文读)**.

---

## 1. Regra de Ouro: Protocolo Two-Pass (Gramática Nativa Primeiro, Matemática HSK Depois)

O maior erro ao gerar histórias de leitura graduada por IA é o **"Translationese"** (pensar na frase em português/inglês e trocar palavra por palavra por vocabulário do HSK 1). Isso destrói a sintaxe chinesa.

Você **DEVE** seguir este protocolo em duas passagens antes de salvar qualquer história:

### Passagem 1: Escrita & Auditoria Gramatical de Mandarim Padrão (*Putonghua*)
Toda frase criada deve passar pelo checklist de **5 Regras Sintáticas do Mandarim**:

1. **Ordem Canônica da Frase (STPVO):**
   - Estrutura obrigatória: `Sujeito + [Marcador de Tempo] + [Marcador de Lugar: 在 + Local] + [Advérbio/Negação] + Verbo + [Aspecto 了/过/着] + Objeto`.
   - *Correto:* `我今天早上在咖啡店喝了一杯茶。` (Eu hoje de manhã na cafeteria bebi uma xícara de chá.)
   - *Proibido (decalque do português):* `*我喝了一杯茶在咖啡店今天早上。`
2. **Classificadores Obrigatórios e Específicos (量词 - Measure Words):**
   - Nunca use `个 (gè)` para substantivos que exigem classificadores específicos do HSK 1–3:
     - Livros / cadernos / revistas → `本 (běn)` (`一本书`)
     - Xícaras / copos → `杯 (bēi)` (`一杯茶`, `一杯水`, `一杯咖啡`)
     - Roupas (camisa, casaco) / assuntos → `件 (jiàn)` (`一件衣服`, `一件事`)
     - Animais pequenos / gatos / pássaros / mãos → `只 (zhī)` (`一只猫`)
     - Objetos longos / ruas / peixes / cães / rios → `条 (tiáo)` (`一条街`, `一条狗`)
     - Mesas / papéis / ingressos / fotos / camas → `张 (zhāng)` (`一张桌子`, `一张票`)
     - Veículos → `辆 (liàng)` (`一辆车`)
     - Casas / lojas / empresas → `家 (jiā)` (`一家茶馆`, `一家医院`)
   - **Regra do Dois (`两` vs `二`):** Antes de qualquer classificador, use sempre `两 (liǎng)` (`两个人`, `两本书`, `两点钟`) e **nunca** `二` (`*二个人`).
3. **Negações (`不` vs `没 / 没有`) e Adjetivos Predicativos:**
   - Para o verbo `有` (ter/haver), a negação é **sempre** `没有` (nunca `*不有`).
   - Para ações que não aconteceram no passado, use `没` ou `没有` sem `了` no final (`昨天我没去`, nunca `*昨天我不去` nem `*昨天我没去了`).
   - Para adjetivos predicativos simples sem comparação (ex: "O chá é aromático", "Ele é alto"), use um advérbio de grau como `很 (hěn)` (`茶很香`, `他很高`), pois em Mandarim `茶香` sem `很` implica contraste ("o chá é cheiroso, mas outra coisa não é").
4. **As Três Partículas Estruturais (`的`, `得`, `地`) e Aspecto (`了`):**
   - `的 (de)`: Modificador + `的` + Substantivo (`我的朋友`, `好喝的茶`).
   - `得 (de)`: Verbo + `得` + Complemento de grau/resultado (`说得很好`, `走得很快`).
   - `地 (de)`: Advérbio + `地` + Verbo (`高兴地说`, `慢慢地走`).
5. **Verificação de Polifônicos (多音字 - Duōyīnzì):**
   - Verifique o Pinyin contextual de caracteres com mais de uma leitura:
     - `得`: partícula `de` (`觉得 juéde`, `说得很好 shuō de hěn hǎo`) vs verbo modal `děi` ("precisar": `我得走了 wǒ děi zǒu le`) vs obter `dé` (`得到 dédào`).
     - `着`: partícula durativa `zhe` (`看着 kànzhe`) vs alcançar/dormir/ansioso `zháo` (`睡着 shuìzháo`, `着急 zháojí`).
     - `长`: comprido `cháng` (`很长 hěn cháng`) vs crescer/chefe `zhǎng` (`长大 zhǎngdà`).
     - `还`: ainda `hái` (`还有 háiyǒu`) vs devolver `huán` (`还书 huán shū`).
     - `觉`: sentir/achar `jué` (`觉得 juéde`) vs sono `jiào` (`睡觉 shuìjiào`).
   - Aplique também as regras de **Tone Sandhi** nas explicações quando relevante (`你好 nǐ hǎo`, `不` antes de 4º tom vira `bú` como em `不是 bú shì`, `不对 bú duì`).

---

## 2. Regras de Distribuição Percentual de Vocabulário (HSK 3.0)

Cada história tem um `targetHsk` (1 a 9 no padrão Novo HSK 3.0) e deve obedecer à distribuição de palavras (excluindo pontuação):

- **História Nível HSK 1 (Iniciante Total):**
  - **≥ 85% de palavras HSK 1**
  - **≤ 15% de palavras HSK 2**
  - **0% de HSK 3+** (nomes próprios de personagens como `林明 Lín Míng` ou `小美 Xiǎoměi` contam como HSK 1 para fins de fluidez).
- **História Nível HSK 2 (Básico):**
  - **75% a 82% de palavras HSK 1**
  - **15% a 22% de palavras HSK 2**
  - **≤ 5% de palavras HSK 3**
- **História Nível HSK 3 (Intermediário I):**
  - **≥ 75% de palavras HSK 1 + HSK 2**
  - **15% a 20% de palavras HSK 3**
  - **≤ 5% de palavras HSK 4**

> **Como validar a matemática:** Após criar ou editar o arquivo da história, sempre execute `npm run story:build`. O script `scripts/build-story.mjs` calculará a porcentagem matemática exata de cada capítulo e da história inteira, atualizará o campo `hskDistribution` automaticamente e avisará se a porcentagem estiver fora da meta.

---

## 3. Estrutura Etimológica Obrigatória em Cada Palavra (`StoryToken`)

O diferencial pedagógico do **WenDu** é que ao clicar em qualquer palavra da história, o usuário vê **duas camadas de explicação em Português (PT-BR)**:

1. **Camada da Palavra (`meaningPt` + `compoundLogicPt`):**
   - `meaningPt`: O que a palavra significa naquela frase (ex: `"computador"`, `"cafeteria"`, `"com certeza"`).
   - `compoundLogicPt`: **A partir de quais palavras/caracteres ela é formada e por que juntas significam isso.**
     - *Exemplo para `电脑 (diànnǎo)`:* `"Formada por 电 (eletricidade) + 脑 (cérebro) → literalmente 'cérebro elétrico', ou seja, computador."`
     - *Exemplo para `茶馆 (cháguǎn)`:* `"Formada por 茶 (chá) + 馆 (estabelecimento/pavilhão) → casa de chá tradicional."`
     - *Exemplo para palavras de 1 caractere como `喝 (hē)`:* `"Verbo simples de ação oral: radical 口 (boca) + fonético 曷 → ato de beber líquidos."`
2. **Camada de Cada Caractere (`characters: CharacterEtymology[]`):**
   - Para **cada** Hanzi que compõe a palavra (se a palavra tem 2 caracteres, o array `characters` tem 2 itens; se tem 1, tem 1 item):
     - `char`: O caractere individual (ex: `"脑"`).
     - `pinyin`: O pinyin individual (ex: `"nǎo"`).
     - `hskLevel`: O nível HSK 3.0 do caractere.
     - `isolatedMeaningPt`: O que o caractere significa isoladamente (ex: `"cérebro / mente / cabeça"`).
     - `formationExplanationPt`: Como o símbolo é formado graficamente e etimologicamente (ex: `"Composto fono-semântico: traz o radical 月 (肉, carne/órgão do corpo) à esquerda e o componente 亠+凶 à direita representando a cabeça e a fontanela."`).
     - `components`: Lista dos radicais e partes constituintes (`symbol`, `pinyin`, `meaningPt`, `role`: `"semântico" | "fonético" | "pictográfico" | "estrutural"`).

---

## 4. Passo a Passo para Adicionar uma Nova História

1. **Criar ou atualizar o dicionário de caracteres/palavras** em `src/data/character-dictionary.ts` para que todos os caracteres e palavras usados na história tenham decomposição rica e reutilizável.
2. **Adicionar os capítulos e frases da história** em `src/data/stories-raw.ts` (incluindo `grammarNotes` em Português para explicar a estrutura das frases).
3. **Executar o script de build de histórias e áudio neural:**
   ```bash
   npm run story:build
   ```
   Esse comando:
   - Hidrata todos os tokens com o dicionário etimológico completo;
   - Calcula as porcentagens reais de HSK 3.0 (`hskDistribution`) por capítulo e por história;
   - Conecta ao `msedge-tts` (`zh-CN-XiaoxiaoNeural` ou `zh-CN-YunxiNeural`) para gerar os arquivos `.mp3` reais em `public/audio/stories/<slug>/chapter-<n>.mp3` e sincroniza os timestamps (`startMs` e `endMs`) de cada palavra e frase em `src/data/stories-built.json`.


---

## 5. Briefing Narrativo do Capítulo (Obrigatório antes de escrever)

Antes de escrever, defina (e mostre ao usuário) este briefing. Ele complementa a Passagem 1 (gramática) e a Seção 2 (porcentagens).

**Entradas:** número e título do capítulo; resumo da história; resumo dos capítulos anteriores; evento do capítulo; nível HSK; personagens; palavras-alvo novas; palavras de revisão.

### 5.1 Tamanho do capítulo (capítulos curtos demais não ensinam)

| Nível | Frases | Caracteres (total) |
|-------|--------|--------------------|
| HSK 1 | 30 a 40 | 300 a 450 |
| HSK 2 | 40 a 55 | 500 a 750 |
| HSK 3 | 55 a 75 | 800 a 1200 |

O capítulo deve ter começo, desenvolvimento (pelo menos 2 cenas ou momentos) e um gancho ou fecho emocional. Não repita frases só para encher: ganhe tamanho com cenas, diálogos e ações concretas.

### 5.2 Palavras-alvo e de revisão
- **Palavras-alvo novas** (introduzidas no capítulo): cada uma aparece **no mínimo 5 vezes**, em frases e contextos diferentes (sujeito, objeto, diálogo, pensamento, negação ou pergunta quando natural).
- **Palavras de revisão** (de capítulos anteriores): cada uma aparece **no mínimo 2 vezes**.
- Nomes próprios dos personagens são sempre permitidos.
- Vocabulário: use apenas palavras do nível-base e abaixo. A lista permitida é o teto; as porcentagens da Seção 2 continuam valendo.

### 5.3 Estrutura das frases
- **Máximo de 18 caracteres por frase**, uma ideia por frase.
- Gramática: apenas estruturas do nível (inclui 了, 的, 得, 地, 很, 没有 conforme a Passagem 1). Não use estruturas acima do nível.
- Frases naturais, como um nativo escreveria. Evite chinês de livro didático.

### 5.4 Padrão repetido (obrigatório)
Use **pelo menos 1** padrão que se repita no capítulo, para repetir vocabulário naturalmente:
- refrão do personagem (uma fala ou gesto de assinatura);
- cena paralela (a mesma ação em dois lugares ou momentos, com pequena variação);
- diálogo em espelho (duas falas com a mesma estrutura).

### 5.5 Mostrar, não dizer
O texto deve **mostrar** o conflito e a emoção do personagem com ações e sinais físicos concretos (mãos, olhar, respiração, objetos, ambiente), e não só nomear sentimentos. Ex.: prefira `他看着茶，没有喝。` a `他很不高兴。`.

### 5.6 Checklist de validação (antes de salvar)
1. Contagem de frases e caracteres dentro da tabela 5.1.
2. Nenhuma frase com mais de 18 caracteres.
3. Cada palavra-alvo com 5 ou mais ocorrências; cada palavra de revisão com 2 ou mais.
4. Pelo menos um padrão repetido (5.4) identificado.
5. Pelo menos 3 momentos de "mostrar, não dizer" (5.5).
6. Nenhuma palavra fora do vocabulário permitido.
7. Auditoria gramatical da Passagem 1 concluída.
8. Rodar `npm run story:build` e corrigir qualquer aviso de porcentagem.

Na resposta final, informe a contagem de frases, caracteres e ocorrências de cada palavra-alvo.
