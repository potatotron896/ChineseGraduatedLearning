import { NextRequest, NextResponse } from "next/server";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth-session";

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super(
      "DATABASE_URL não configurada. Configure um branch do Neon ou Postgres local no .env.local e rode `npm run db:migrate`."
    );
    this.name = "DatabaseNotConfiguredError";
  }
}

let cachedSql: NeonQueryFunction<false, false> | null = null;

export function getDatabaseUrl(): string | undefined {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL;
}

export function getDb(): NeonQueryFunction<false, false> {
  const url = getDatabaseUrl();
  if (!url) {
    throw new DatabaseNotConfiguredError();
  }
  if (!cachedSql) {
    cachedSql = neon(url);
  }
  return cachedSql;
}

export function requireUser(request: NextRequest): string | null {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export function requireAuthOr401(
  request: NextRequest
): { username: string } | { error: NextResponse } {
  const username = requireUser(request);
  if (!username) {
    return {
      error: NextResponse.json(
        { error: "Autenticação necessária. Faça login para sincronizar." },
        { status: 401 }
      ),
    };
  }
  return { username };
}

export function handleApiError(err: unknown, fallbackMessage: string): NextResponse {
  if (err instanceof DatabaseNotConfiguredError) {
    return NextResponse.json({ error: err.message }, { status: 503 });
  }
  console.error(fallbackMessage, err);
  return NextResponse.json({ error: fallbackMessage }, { status: 500 });
}

