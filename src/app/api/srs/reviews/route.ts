import { NextRequest, NextResponse } from "next/server";
import { handleApiError, requireAuthOr401 } from "@/lib/db/client";
import { submitReviewsBatch } from "@/lib/db/srs";
import { getLocalDayString } from "@/lib/client-day";
import type { SrsReviewQueueItem } from "@/types/learning";

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuthOr401(request);
    if ("error" in auth) return auth.error;

    const body = (await request.json()) as {
      reviews: SrsReviewQueueItem[];
      today?: string;
    };

    if (!Array.isArray(body.reviews)) {
      return NextResponse.json({ error: "Lista de revisões inválida." }, { status: 400 });
    }

    const result = await submitReviewsBatch(
      auth.username,
      body.reviews,
      body.today || getLocalDayString()
    );
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return handleApiError(err, "Erro ao registrar revisões de flashcards.");
  }
}

