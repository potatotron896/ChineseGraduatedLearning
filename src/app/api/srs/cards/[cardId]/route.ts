import { NextRequest, NextResponse } from "next/server";
import { handleApiError, requireAuthOr401 } from "@/lib/db/client";
import { updateCardAction } from "@/lib/db/srs";
import { getLocalDayString } from "@/lib/client-day";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ cardId: string }> }
) {
  try {
    const auth = requireAuthOr401(request);
    if ("error" in auth) return auth.error;

    const { cardId } = await context.params;
    const body = (await request.json()) as {
      action: "suspend" | "unsuspend" | "bury" | "reset" | "note";
      note?: string;
      today?: string;
    };

    const card = await updateCardAction(
      auth.username,
      cardId,
      body.action,
      body.today || getLocalDayString(),
      body.note
    );

    if (!card) {
      return NextResponse.json({ error: "Card não encontrado." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, card });
  } catch (err) {
    return handleApiError(err, "Erro ao atualizar card.");
  }
}

