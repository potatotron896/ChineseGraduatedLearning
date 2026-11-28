import { NextRequest, NextResponse } from "next/server";
import { handleApiError, requireAuthOr401 } from "@/lib/db/client";
import { getSrsQueue } from "@/lib/db/srs";
import { getLocalDayString } from "@/lib/client-day";

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuthOr401(request);
    if ("error" in auth) return auth.error;

    const { searchParams } = new URL(request.url);
    const today = searchParams.get("today") || getLocalDayString();
    const newPerDay = Math.max(1, Number(searchParams.get("newPerDay") || 10));
    const reviewsPerDay = Math.max(1, Number(searchParams.get("reviewsPerDay") || 100));

    const result = await getSrsQueue(auth.username, today, newPerDay, reviewsPerDay);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return handleApiError(err, "Erro ao carregar fila de flashcards.");
  }
}

