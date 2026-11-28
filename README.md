# WenDu (文读) — Leitura Graduada de Mandarim HSK 3.0

Aplicativo de leitura graduada em Mandarim com áudio neural sincronizado, decomposição etimológica de caracteres, telemetria de estudo, conquistas (badges) e flashcards com repetição espaçada (FSRS).

## Configuração do Banco de Dados (Postgres / Neon)

As funcionalidades de telemetria, badges e flashcards (SRS) utilizam Postgres via `DATABASE_URL`.
Visitantes sem login continuam funcionando offline no navegador (`localStorage`) e têm seus dados mesclados automaticamente ao criar conta ou fazer login.

1. Copie `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Em desenvolvimento, recomenda-se criar um **branch do Neon** (ou usar Postgres local) e preencher `DATABASE_URL` no `.env.local`.
3. Rode as migrations versionadas:
   ```bash
   npm run db:migrate
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

