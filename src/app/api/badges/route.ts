import { NextRequest, NextResponse } from "next/server";
import { handleApiError, requireAuthOr401 } from "@/lib/db/client";
import { evaluateAndUnlockBadges } from "@/lib/db/badges";
import { getLocalDayString } from "@/lib/client-day";

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuthOr401(request);
    if ("error" in auth) return auth.error;

    const { searchParams } = new URL(request.url);
    const today = searchParams.get("today") || getLocalDayString();
    const result = await evaluateAndUnlockBadges(auth.username, today);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return handleApiError(err, "Erro ao carregar conquistas.");
  }
}

