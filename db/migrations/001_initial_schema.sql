-- 001_initial_schema.sql
-- Tabelas base de usuários, progresso de capítulos e vocabulário salvo

CREATE TABLE IF NOT EXISTS users (
  username TEXT PRIMARY KEY,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  preferences JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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
);

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
);

ALTER TABLE user_saved_vocabulary ADD COLUMN IF NOT EXISTS example_sentence_zh TEXT;
ALTER TABLE user_saved_vocabulary ADD COLUMN IF NOT EXISTS example_sentence_pt TEXT;

