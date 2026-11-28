import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getDb, handleApiError, requireAuthOr401 } from "@/lib/db/client";
import { ensureCardForVocabulary } from "@/lib/db/srs";
import { recordUserEvent } from "@/lib/db/telemetry";
import { getLocalDayString } from "@/lib/client-day";
import type { SavedVocabularyItem } from "@/types/story";

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuthOr401(request);
    if ("error" in auth) return auth.error;

    const body = (await request.json()) as {
      item: SavedVocabularyItem;
      clientDay?: string;
      clientEventId?: string;
    };

    const item = body.item;
    if (!item?.hanzi) {
      return NextResponse.json({ error: "Palavra inválida." }, { status: 400 });
    }

    const sql = getDb();
    const addedAt = item.addedAt || new Date().toISOString();
    const charactersJson = item.characters ? JSON.stringify(item.characters) : null;

    await sql`
      INSERT INTO user_saved_vocabulary (
        username, hanzi, pinyin, meaning_pt, compound_logic_pt, hsk_level,
        story_slug, story_title_pt, characters, example_sentence_zh, example_sentence_pt, added_at
      )
      VALUES (
        ${auth.username},
        ${item.hanzi},
        ${item.pinyin || ""},
        ${item.meaningPt || ""},
        ${item.compoundLogicPt ?? null},
        ${item.hskLevel || 1},
        ${item.storySlug || ""},
        ${item.storyTitlePt || ""},
        ${charactersJson}::jsonb,
        ${item.exampleSentenceZh ?? null},
        ${item.exampleSentencePt ?? null},
        ${addedAt}::timestamptz
      )
      ON CONFLICT (username, hanzi) DO UPDATE SET
        pinyin = EXCLUDED.pinyin,
        meaning_pt = EXCLUDED.meaning_pt,
        compound_logic_pt = EXCLUDED.compound_logic_pt,
        hsk_level = EXCLUDED.hsk_level,
        example_sentence_zh = COALESCE(EXCLUDED.example_sentence_zh, user_saved_vocabulary.example_sentence_zh),
        example_sentence_pt = COALESCE(EXCLUDED.example_sentence_pt, user_saved_vocabulary.example_sentence_pt)
    `;

    const card = await ensureCardForVocabulary(auth.username, item);

    const { newlyUnlocked } = await recordUserEvent(auth.username, {
      clientEventId: body.clientEventId || crypto.randomUUID(),
      type: "word_saved",
      payload: { hanzi: item.hanzi, hskLevel: item.hskLevel, storySlug: item.storySlug },
      occurredAt: addedAt,
      clientDay: body.clientDay || getLocalDayString(),
    });

    return NextResponse.json({ ok: true, card, newlyUnlocked });
  } catch (err) {
    return handleApiError(err, "Erro ao salvar palavra.");
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = requireAuthOr401(request);
    if ("error" in auth) return auth.error;

    const { searchParams } = new URL(request.url);
    const hanzi = searchParams.get("hanzi");
    if (!hanzi) {
      return NextResponse.json({ error: "Parâmetro hanzi obrigatório." }, { status: 400 });
    }

    const sql = getDb();
    await sql`
      DELETE FROM user_saved_vocabulary
      WHERE username = ${auth.username} AND hanzi = ${hanzi}
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleApiError(err, "Erro ao remover palavra.");
  }
}

