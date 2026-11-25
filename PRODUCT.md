# Product

## Register

product

## Users

Estudantes brasileiros e lusófonos de Mandarim (do iniciante absoluto no HSK 3.0 Nível 1 ao avançado no Nível 9) que desejam adquirir e fixar vocabulário através de leitura graduada contextualizada (*comprehensible input*), em vez de memorização isolada de frases soltas. Eles utilizam o aplicativo tanto no computador (sessões focadas de estudo com inspeção de caracteres) quanto no celular (leitura e escuta de capítulos em deslocamento), sincronizando seu progresso com login e senha simples.

## Product Purpose

Uma plataforma web de leitura graduada em Mandarim que combina histórias interessantes em múltiplos capítulos com controle rigoroso de distribuição de vocabulário por nível HSK 3.0 (ex: 85% HSK 1 + 15% HSK 2), narração em áudio neural natural com destaque sincronizado palavra por palavra (estilo karaokê), alternância entre três tipografias chinesas (App, Escola/Kaiti, Livro/Songti) e um inspetor etimológico profundo que decompõe tanto palavras compostas quanto os caracteres individuais (Hanzi) e seus radicais constituintes em Português (PT-BR).

## Brand Personality

**Silencioso, Erudito, Tátil** (*Quiet, Scholarly, Tactile*).
A interface inspira a calma e a clareza de uma edição impressa de alta precisão combinada com a velocidade de uma ferramenta moderna de leitura. A superfície desaparece para que a estrutura visual dos caracteres chineses (Hanzi), a cadência do áudio e a decomposição semântica sejam os únicos protagonistas.

**Referências:**
- **Readwise Reader**: foco tipográfico absoluto, ausência de ruído visual na leitura longa, controles que só aparecem quando solicitados.
- **Du Chinese**: clareza no acompanhamento de áudio sincronizado com o texto e indicação discreta de níveis HSK.
- **Pleco (Modern UI)**: densidade cirúrgica e confiabilidade técnica na decomposição de caracteres, radicais e palavras compostas.

## Anti-references

- **Gamificação infantil e barulhenta (estilo Duolingo)**: sem mascotes, moedas, ofensivas (*streaks*) punitivas, confetes, sons de efeito ou popups interrompendo o fluxo de leitura.
- **Clichê de IA "Creme/Bege/Pergaminho" (2026 AI Slop)**: proibido o uso de fundos bege/areia (`--paper`, `--cream`, `--sand`) que reduzem o contraste dos traços complexos dos caracteres chineses. O fundo padrão é branco puro (`oklch(1 0 0)`) ou tinta carvão puro no modo noturno.
- **Poluição cromática de níveis HSK**: nunca pintar cada palavra do texto corrido com uma cor diferente do arco-íris para indicar o nível HSK; o texto principal deve manter contraste editorial limpo, usando apenas sublinhados sutis opcionais para palavras acima do nível da história.
- **Modais bloqueantes para dicionário**: clicar em um caractere ou palavra nunca deve abrir um modal central com backdrop escuro que esconda a frase que o leitor estava lendo. A inspeção acontece em um painel lateral (desktop) ou *bottom sheet* deslizante (mobile) que mantém o contexto visível.

## Design Principles

1. **O Hanzi é o Herói (Legibilidade Acima de Tudo)**: Caracteres chineses de 12 a 20 traços exigem contraste impecável ($\ge 7:1$) e espaçamento generoso para acomodar o Pinyin opcional (`<ruby>`) sem colidir linhas. A escolha entre Fonte de App (Sans), Fonte de Escola (Kaiti) e Fonte de Livro (Songti) altera imediatamente a percepção pedagógica do traço.
2. **Transparência Pedagógica (A Regra da Proporção HSK)**: O leitor sempre sabe exatamente onde está pisando. Cada história e capítulo expõe de forma honesta e visual sua composição exata de vocabulário (ex: 85% HSK 1, 15% HSK 2) antes e durante a leitura.
3. **Etimologia em Duas Camadas Sem Perder o Fio**: Ao tocar em uma palavra, o leitor entende primeiro o significado composto no contexto da frase ("o que significam juntos") e, imediatamente abaixo no mesmo painel, enxerga a anatomia de cada caractere e seus radicais ("o que significam isoladamente e como o símbolo é formado").
4. **Fricção Zero entre Dispositivos**: Qualquer visitante pode abrir uma história, ouvir o áudio e clicar em caracteres instantaneamente via `localStorage`. Quando quiser sincronizar entre PC e celular, um login e senha simples (persistido direto no Vercel Blob em JSON) sincroniza progresso, preferências e vocabulário salvo sem integrações complexas.

## Accessibility & Inclusion

- **Contraste WCAG AAA ($\ge 7:1$)** para todo o texto em Mandarim e Português contra o fundo, essencial para discernir radicais pequenos em caracteres densos.
- **Suporte nativo a `<ruby>` semântico** para Pinyin, garantindo que leitores de tela e seleção de texto não embaralhem fonética com caracteres.
- **Respeito a `prefers-reduced-motion`**: o destaque de karaokê do áudio e a abertura do painel de caracteres utilizam transições instantâneas ou *crossfade* suave sem deslocamento espacial brusco.
- **Controles de teclado completos** no leitor: `Espaço` para Play/Pause do áudio, setas `←`/`→` para avançar/voltar palavra ou frase, `P` para alternar Pinyin, `1`/`2`/`3` para alternar entre as fontes App/Escola/Livro.

