import { NextRequest, NextResponse } from "next/server";
import { handleApiError, requireAuthOr401 } from "@/lib/db/client";
import {
  getTelemetrySummary,
  recordUserEvent,
  upsertReadingSession,
} from "@/lib/db/telemetry";
import { getLocalDayString } from "@/lib/client-day";
import type { ReadingSessionInput, UserEventInput } from "@/types/learning";

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuthOr401(request);
    if ("error" in auth) return auth.error;

    const { searchParams } = new URL(request.url);
    const today = searchParams.get("today") || getLocalDayString();
    const summary = await getTelemetrySummary(auth.username, today);
    return NextResponse.json({ ok: true, summary });
  } catch (err) {
    return handleApiError(err, "Erro ao carregar telemetria.");
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuthOr401(request);
    if ("error" in auth) return auth.error;

    const rawText = await request.text();
    const body = JSON.parse(rawText) as
      | { kind: "session"; session: ReadingSessionInput }
      | { kind: "event"; event: UserEventInput };

    if (body.kind === "session" && body.session) {
      const { newlyUnlocked } = await upsertReadingSession(auth.username, body.session);
      return NextResponse.json({ ok: true, newlyUnlocked });
    }

    if (body.kind === "event" && body.event) {
      const { inserted, newlyUnlocked } = await recordUserEvent(auth.username, body.event);
      return NextResponse.json({ ok: true, inserted, newlyUnlocked });
    }

    return NextResponse.json({ error: "Payload de telemetria inválido." }, { status: 400 });
  } catch (err) {
    return handleApiError(err, "Erro ao registrar telemetria.");
  }
}

