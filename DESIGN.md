---
name: WenDu (文读) — Leitura Graduada de Mandarim
description: Plataforma de leitura graduada em Mandarim (HSK 3.0) com áudio neural sincronizado e decomposição etimológica de caracteres.
colors:
  primary: "oklch(0.350 0.075 110.0)"
  primary-deep: "oklch(0.280 0.068 110.0)"
  primary-soft: "oklch(0.945 0.022 110.0)"
  accent-cinnabar: "oklch(0.540 0.190 28.0)"
  accent-cinnabar-soft: "oklch(0.950 0.032 28.0)"
  tertiary-ginkgo: "oklch(0.620 0.135 75.0)"
  neutral-canvas: "oklch(1.000 0.000 0)"
  neutral-surface: "oklch(0.972 0.004 110.0)"
  neutral-ink: "oklch(0.180 0.015 110.0)"
  neutral-muted: "oklch(0.450 0.015 110.0)"
  neutral-border: "oklch(0.895 0.007 110.0)"
typography:
  display:
    fontFamily: "Noto Serif SC, Songti SC, serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.35
  headline:
    fontFamily: "Plus Jakarta Sans, -apple-system, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.3
  body-hanzi:
    fontFamily: "var(--font-zh-active)"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 2.5
  body:
    fontFamily: "Plus Jakarta Sans, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.15
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-canvas}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  card-story:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.md}"
    padding: "20px"
---

# Design System: WenDu (文读)

## 1. Overview

**Creative North Star: "O Estúdio de Jade e Cinábrio (The Jade & Cinnabar Scholar's Desk)"**

O sistema visual do WenDu combina a precisão silenciosa de ferramentas modernas de leitura como **Readwise Reader** e **Pleco** com a autoridade tipográfica de livros impressos chineses. Em vez de recorrer ao clichê de fundos creme/bege de IA ou à estética infantilizada de aplicativos gamificados (como Duolingo), o WenDu opera sobre uma superfície de branco puro (`oklch(1.000 0.000 0)`) no modo diurno e carvão puro (`oklch(0.110 0.000 0)`) no modo noturno. Isso garante contraste máximo para a leitura de caracteres complexos (Hanzi) em três registros tipográficos: App (Sans), Escola (Kaiti / 楷体) e Livro (Songti / 宋体).

A identidade cromática é contida (**Restrained Strategy**): a cor primária é ancorada no **Jade Antigo / Verde-Oliva Profundo** (`oklch(0.350 0.075 110.0)`), que transmite serenidade e foco acadêmico nos controles principais e barras de composição HSK. O contraponto energético é o **Vermelho Cinábrio** (`oklch(0.540 0.190 28.0)`), inspirado nos carimbos tradicionais chineses (*chop/hanko*), reservado cirurgicamente para o destaque sincronizado da palavra falada no áudio (karaokê), o caractere selecionado no inspetor etimológico e selos de destaque.

**Key Characteristics:**
- **Pure Surface Contrast:** Fundo branco puro (`oklch(1 0 0)`) e tinta escura com leve matiz oliva (`oklch(0.18 0.015 110)`), atingindo contraste >14:1 para máxima nitidez dos traços de Hanzi.
- **Tri-Script Chinese Typography:** Troca instantânea via CSS Custom Properties entre `Noto Sans SC` (Fonte de App), `LXGW WenKai / KaiTi` (Fonte de Escola caligráfica) e `Noto Serif SC / Songti SC` (Fonte de Livro).
- **Split-Context Etymology Inspector:** Painel lateral fixo no desktop que decompõe a palavra composta e cada Hanzi/radical sem ocultar a frase original.
- **Responsive Motion Energy:** Transições rápidas (150ms `cubic-bezier(0.22, 1, 0.36, 1)`) focadas exclusivamente em estado (karaokê de áudio, abertura do inspetor, expansão de tradução por frase).

## 2. Colors

A paleta segue a estratégia **Restrained** em OKLCH: superfícies neutras puras onde a personalidade emerge apenas nos acentos funcionais de Jade Antigo (110°) e Vermelho Cinábrio (28°).

### Primary
- **Jade Antigo / Sun-Cured Olive**: Cor primária da marca. Usada em botões de ação principal, cabeçalhos ativos, indicador de nível primário da história (ex: barra de 85% HSK 1) e estados selecionados de filtro.
- **Jade Suave / Mist Olive**: Superfície de fundo para pills selecionadas, destaque suave da frase ativa durante a reprodução do áudio e container de composição HSK.

### Secondary
- **Vermelho Cinábrio / Cinnabar Seal**: Acento de alta precisão (<5% da tela). Usado exclusivamente para a palavra exata sendo pronunciada no momento pelo TTS (destaque karaokê), para o caractere focado no inspetor de decomposição e para o botão de favoritar vocabulário.

### Tertiary
- **Âmbar Dourado / Ginkgo Gold**: Usado na barra de distribuição proporcional de vocabulário para diferenciar níveis HSK adjacentes (ex: os 15% de HSK 2 dentro do modal/cabeçalho da história) e sublinhado sutil opcional de palavras acima do nível.

### Neutral
- **Branco Puro / Pure Canvas**: Superfície principal de leitura (Light Mode).
- **Superfície Lateral / Stone Wash**: Fundo da barra lateral do inspetor de caracteres, player de áudio fixo e cards do catálogo.
- **Tinta Hanzi / Deep Ink**: Cor principal do texto em Mandarim e títulos em Português.
- **Grafite Pinyin / Muted Slate**: Cor do Pinyin acima dos caracteres, traduções interlineares e metadados secundários ($\ge 4.5:1$ de contraste).
- **Borda Fina / Hairline Rule**: Divisores estruturais de 1px entre o texto da história e o painel etimológico.

### Named Rules
**The Pure Canvas Rule.** A área de leitura do capítulo nunca deve usar fundos creme, bege ou sépia (`--cream`, `--parchment`). O contraste puro entre o fundo branco e a tinta escura é sagrado para a leitura de caracteres com mais de 15 traços.
**The Cinnabar Rarity Rule.** O Vermelho Cinábrio só aparece quando há foco ativo do usuário ou do áudio (a palavra sendo falada agora ou o caractere clicado). Nunca o utilize em elementos estáticos decorativos.

## 3. Typography

**UI & Portuguese Font:** `Plus Jakarta Sans`, `-apple-system`, `sans-serif`
**Chinese App Font (Padrão):** `Noto Sans SC`, `PingFang SC`, `Microsoft YaHei`, `sans-serif`
**Chinese School Font (Escola / Caligrafia Didática):** `LXGW WenKai`, `KaiTi`, `STKaiti`, `楷体`, `serif`
**Chinese Book Font (Livro Impresso):** `Noto Serif SC`, `Songti SC`, `SimSun`, `宋体`, `serif`
**Pinyin & Timestamps Font:** `JetBrains Mono`

**Character:** Uma interface ocidental ultra-limpa e geométrica em Português que serve de moldura silenciosa para três tradições tipográficas chinesas autênticas.

### Hierarchy
- **Display (Capítulo / Título da História em Hanzi)** (`600`, `2.25rem`, `line-height: 1.35`): Título principal da história em Mandarim acompanhado do título em Português logo abaixo.
- **Headline (Seções do Catálogo e Inspetor)** (`600`, `1.375rem`, `line-height: 1.3`): Cabeçalhos de categorias e título do painel de decomposição.
- **Body Hanzi (Texto Corrido do Capítulo)** (`400`, `1.75rem`, `line-height: 2.5`): O texto principal da história com espaço reservado para `<ruby>`.
- **Body PT-BR (Traduções e Explicações Etimológicas)** (`400`, `1rem`, `line-height: 1.6`): Explicações de formação do caractere, significados isolados/conjuntos e tradução das frases.
- **Label / Pinyin Ruby** (`500`, `0.75rem`): Texto fonético Pinyin posicionado sobre cada palavra/caractere e badges de nível HSK 3.0.

### Named Rules
**The Zero-Jump Ruby Rule.** Alternar o Pinyin entre "Sempre", "Ao Tocar" e "Oculto" nunca deve fazer o parágrafo pular ou mudar de altura.

## 4. Elevation

O sistema é **Flat-By-Default** (plano por padrão), utilizando camadas tonais sutis e divisores de `1px solid`.

### Named Rules
**The Flat-By-Default Rule.** Cards e blocos de frase permanecem planos em repouso, demarcados por bordas de 1px; sombras são reservadas exclusivamente à barra fixa do player de áudio e diálogos sobrepostos.

## 5. Components

### Buttons
- **Shape:** Bordas levemente arredondadas (`6px` radius).
- **Primary:** Fundo Jade Antigo com texto Branco Puro e hover em Jade Profundo.
- **Secondary / Ghost:** Fundo Canvas com borda `1px` neutra.

### Cards / Containers
- **Corner Style:** `10px` radius.
- **Background:** Stone Wash (`neutral-surface`) com painéis internos em Branco Puro (`neutral-canvas`).
- **Border:** `1px solid` (`neutral-border`), mudando para Jade Suave no hover.

### Signature Component: Ruby Token & Etymology Inspector
- Cada palavra em Mandarim é renderizada em um elemento `<ruby class="zh-token">` com `<rt>` de altura fixa (`1.05rem`). Quando o áudio pronuncia a palavra, ela recebe fundo `accent-cinnabar-soft` e texto `accent-cinnabar`.

## 6. Do's and Don'ts

### Do:
- **Do** exibir a barra de composição percentual de HSK 3.0 (ex: `91.0% HSK 1 · 9.0% HSK 2`) tanto no card/modal de detalhes da história quanto no topo do leitor.
- **Do** estruturar o Inspetor de Caracteres em duas seções claras ao clicar numa palavra: (1) **A Palavra no Contexto** (significado conjunto, pinyin, nível HSK 3.0 e lógica da combinação) e (2) **Anatomia de Cada Caractere** (decomposição em radicais/componentes e o que significam isoladamente).
- **Do** manter as três fontes chinesas (`App`, `Escola`, `Livro`) acessíveis com 1 clique na barra superior do leitor.

### Don't:
- **Don't** usar gamificação infantil e barulhenta (estilo Duolingo): sem mascotes, ofensivas punitivas, moedas ou popups que interrompam a leitura.
- **Don't** usar o clichê de IA "Creme/Bege/Pergaminho" (`--paper`, `--cream`, `--sand`) na superfície de leitura.
- **Don't** pintar cada palavra do texto da história com cores diferentes por nível HSK (poluição visual de arco-íris).
- **Don't** abrir modais centrais bloqueantes ao clicar num caractere; mantenha a frase da história sempre visível ao lado do inspetor etimológico.
