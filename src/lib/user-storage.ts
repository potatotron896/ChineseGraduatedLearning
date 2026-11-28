import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type {
  ChapterProgress,
  CharacterEtymology,
  HskLevel,
  ReaderPreferences,
  SavedVocabularyItem,
  UserProfileData,
} from "../types/story";

export interface StoredUserAccount {
  username: string;
  passwordSalt: string;
  passwordHash: string;
  profile: UserProfileData;
  updatedAt: string;
}

const LOCAL_DIR = path.join(process.cwd(), ".data", "users");

let cachedSql: NeonQueryFunction<false, false> | null = null;
let schemaReadyPromise: Promise<void> | null = null;

export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
}

export function hashPassword(password: string, salt?: string) {
  const actualSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, actualSalt, 64).toString("hex");
  return { salt: actualSalt, hash };
}

export function verifyPassword(
  password: string,
  salt: string,
  expectedHash: string
): boolean {
  const { hash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(expectedHash, "hex")
  );
}

function getDatabaseUrl(): string | undefined {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL;
}

export function getStorageMode(): "neon-postgres" | "local-json" {
  return getDatabaseUrl() ? "neon-postgres" : "local-json";
}

function getNeonClient(): NeonQueryFunction<false, false> {
  if (!cachedSql) {
    const url = getDatabaseUrl();
    if (!url) {
      throw new Error("DATABASE_URL/POSTGRES_URL não configurada.");
    }
    cachedSql = neon(url);
  }
  return cachedSql;
}

async function ensureSchema(sql: NeonQueryFunction<false, false>): Promise<void> {
  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          username TEXT PRIMARY KEY,
          password_salt TEXT NOT NULL,
          password_hash TEXT NOT NULL,
          preferences JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS user_chapter_progress (
          username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
          progress_key TEXT NOT NULL,
          story_slug TEXT NOT NULL,
          chapter_id TEXT NOT NULL,
          completed BOOLEAN NOT NULL DEFAULT FALSE,
          last_sentence_id TEXT,
          last_audio_ms INTEGER,
          updated_at TIMESTAMPTZ NOT NULL,
          PRIMARY KEY (username, progress_key)
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS user_saved_vocabulary (
          username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
          hanzi TEXT NOT NULL,
          pinyin TEXT NOT NULL,
          meaning_pt TEXT NOT NULL,
          compound_logic_pt TEXT,
          hsk_level INTEGER NOT NULL,
          story_slug TEXT NOT NULL,
          story_title_pt TEXT NOT NULL,
          characters JSONB,
          example_sentence_zh TEXT,
          example_sentence_pt TEXT,
          added_at TIMESTAMPTZ NOT NULL,
          PRIMARY KEY (username, hanzi)
        )
      `;
      await sql`ALTER TABLE user_saved_vocabulary ADD COLUMN IF NOT EXISTS example_sentence_zh TEXT`;
      await sql`ALTER TABLE user_saved_vocabulary ADD COLUMN IF NOT EXISTS example_sentence_pt TEXT`;
    })().catch((err) => {
      schemaReadyPromise = null;
      throw err;
    });
  }
  await schemaReadyPromise;
}

export async function loadUserAccount(
  username: string
): Promise<StoredUserAccount | null> {
  const clean = normalizeUsername(username);
  if (!clean) return null;

  if (getDatabaseUrl()) {
    const sql = getNeonClient();
    await ensureSchema(sql);

    const userRows = await sql`
      SELECT username, password_salt, password_hash, preferences, updated_at
      FROM users
      WHERE username = ${clean}
      LIMIT 1
    `;

    if (userRows.length === 0) return null;
    const userRow = userRows[0];

    const [progressRows, vocabRows] = await Promise.all([
      sql`
        SELECT progress_key, story_slug, chapter_id, completed, last_sentence_id, last_audio_ms, updated_at
        FROM user_chapter_progress
        WHERE username = ${clean}
      `,
      sql`
        SELECT hanzi, pinyin, meaning_pt, compound_logic_pt, hsk_level, story_slug, story_title_pt, characters, example_sentence_zh, example_sentence_pt, added_at
        FROM user_saved_vocabulary
        WHERE username = ${clean}
      `,
    ]);

    const chapterProgress: Record<string, ChapterProgress> = {};
    for (const row of progressRows) {
      chapterProgress[String(row.progress_key)] = {
        storySlug: String(row.story_slug),
        chapterId: String(row.chapter_id),
        completed: Boolean(row.completed),
        ...(row.last_sentence_id ? { lastSentenceId: String(row.last_sentence_id) } : {}),
        ...(typeof row.last_audio_ms === "number" ? { lastAudioMs: row.last_audio_ms } : {}),
        updatedAt: new Date(row.updated_at as string | Date).toISOString(),
      };
    }

    const savedVocabulary: Record<string, SavedVocabularyItem> = {};
    for (const row of vocabRows) {
      savedVocabulary[String(row.hanzi)] = {
        hanzi: String(row.hanzi),
        pinyin: String(row.pinyin),
        meaningPt: String(row.meaning_pt),
        ...(row.compound_logic_pt ? { compoundLogicPt: String(row.compound_logic_pt) } : {}),
        hskLevel: Number(row.hsk_level) as HskLevel,
        storySlug: String(row.story_slug),
        storyTitlePt: String(row.story_title_pt),
        ...(row.characters ? { characters: row.characters as CharacterEtymology[] } : {}),
        ...(row.example_sentence_zh ? { exampleSentenceZh: String(row.example_sentence_zh) } : {}),
        ...(row.example_sentence_pt ? { exampleSentencePt: String(row.example_sentence_pt) } : {}),
        addedAt: new Date(row.added_at as string | Date).toISOString(),
      };
    }

    const updatedAt = new Date(userRow.updated_at as string | Date).toISOString();

    return {
      username: String(userRow.username),
      passwordSalt: String(userRow.password_salt),
      passwordHash: String(userRow.password_hash),
      updatedAt,
      profile: {
        username: String(userRow.username),
        preferences: userRow.preferences as ReaderPreferences,
        chapterProgress,
        savedVocabulary,
        updatedAt,
      },
    };
  }

  // Fallback local para desenvolvimento sem DATABASE_URL (.data/users/<username>.json)
  const filePath = path.join(LOCAL_DIR, `${clean}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as StoredUserAccount;
  } catch {
    return null;
  }
}

export async function saveUserAccount(account: StoredUserAccount): Promise<void> {
  const clean = normalizeUsername(account.username);
  if (!clean) {
    throw new Error("Nome de usuário inválido.");
  }

  if (getDatabaseUrl()) {
    const sql = getNeonClient();
    await ensureSchema(sql);

    const preferencesJson = JSON.stringify(account.profile.preferences);
    const progressEntries = Object.entries(account.profile.chapterProgress || {});
    const vocabEntries = Object.entries(account.profile.savedVocabulary || {});

    await sql.transaction((txn) => {
      const queries = [
        txn`
          INSERT INTO users (username, password_salt, password_hash, preferences, updated_at)
          VALUES (${clean}, ${account.passwordSalt}, ${account.passwordHash}, ${preferencesJson}::jsonb, ${account.updatedAt}::timestamptz)
          ON CONFLICT (username) DO UPDATE SET
            password_salt = EXCLUDED.password_salt,
            password_hash = EXCLUDED.password_hash,
            preferences = EXCLUDED.preferences,
            updated_at = EXCLUDED.updated_at
        `,
      ];

      for (const [progressKey, item] of progressEntries) {
        queries.push(
          txn`
            INSERT INTO user_chapter_progress (
              username, progress_key, story_slug, chapter_id, completed, last_sentence_id, last_audio_ms, updated_at
            )
            VALUES (
              ${clean},
              ${progressKey},
              ${item.storySlug},
              ${item.chapterId},
              ${Boolean(item.completed)},
              ${item.lastSentenceId ?? null},
              ${typeof item.lastAudioMs === "number" ? Math.round(item.lastAudioMs) : null},
              ${(item.updatedAt || account.updatedAt)}::timestamptz
            )
            ON CONFLICT (username, progress_key) DO UPDATE SET
              completed = EXCLUDED.completed,
              last_sentence_id = EXCLUDED.last_sentence_id,
              last_audio_ms = EXCLUDED.last_audio_ms,
              updated_at = EXCLUDED.updated_at
          `
        );
      }

      for (const [, vocab] of vocabEntries) {
        const charactersJson = vocab.characters ? JSON.stringify(vocab.characters) : null;
        queries.push(
          txn`
            INSERT INTO user_saved_vocabulary (
              username, hanzi, pinyin, meaning_pt, compound_logic_pt, hsk_level, story_slug, story_title_pt, characters, example_sentence_zh, example_sentence_pt, added_at
            )
            VALUES (
              ${clean},
              ${vocab.hanzi},
              ${vocab.pinyin},
              ${vocab.meaningPt},
              ${vocab.compoundLogicPt ?? null},
              ${vocab.hskLevel},
              ${vocab.storySlug},
              ${vocab.storyTitlePt},
              ${charactersJson}::jsonb,
              ${vocab.exampleSentenceZh ?? null},
              ${vocab.exampleSentencePt ?? null},
              ${(vocab.addedAt || account.updatedAt)}::timestamptz
            )
            ON CONFLICT (username, hanzi) DO UPDATE SET
              pinyin = EXCLUDED.pinyin,
              meaning_pt = EXCLUDED.meaning_pt,
              compound_logic_pt = EXCLUDED.compound_logic_pt,
              hsk_level = EXCLUDED.hsk_level,
              story_slug = EXCLUDED.story_slug,
              story_title_pt = EXCLUDED.story_title_pt,
              characters = EXCLUDED.characters,
              example_sentence_zh = COALESCE(EXCLUDED.example_sentence_zh, user_saved_vocabulary.example_sentence_zh),
              example_sentence_pt = COALESCE(EXCLUDED.example_sentence_pt, user_saved_vocabulary.example_sentence_pt)
          `
        );
      }

      return queries;
    });

    return;
  }

  const payload = JSON.stringify(account, null, 2);
  fs.mkdirSync(LOCAL_DIR, { recursive: true });
  const filePath = path.join(LOCAL_DIR, `${clean}.json`);
  fs.writeFileSync(filePath, payload, "utf8");
}
