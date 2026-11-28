-- 002_telemetry_badges_srs.sql
-- Telemetria, congelamento de streak, badges e flashcards (FSRS)

CREATE TABLE IF NOT EXISTS reading_sessions (
  id UUID PRIMARY KEY,
  username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
  story_slug TEXT NOT NULL,
  chapter_id TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ NOT NULL,
  active_seconds INTEGER NOT NULL DEFAULT 0,
  sentences_read INTEGER NOT NULL DEFAULT 0,
  audio_ms_played INTEGER NOT NULL DEFAULT 0,
  client_day DATE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_reading_sessions_user_day
  ON reading_sessions (username, client_day DESC);

CREATE TABLE IF NOT EXISTS user_events (
  id BIGSERIAL PRIMARY KEY,
  client_event_id UUID UNIQUE NOT NULL,
  username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
  type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  client_day DATE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_user_events_user_type_day
  ON user_events (username, type, client_day DESC);

CREATE TABLE IF NOT EXISTS user_daily_stats (
  username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
  day DATE NOT NULL,
  active_seconds INTEGER NOT NULL DEFAULT 0,
  chapters_completed INTEGER NOT NULL DEFAULT 0,
  words_saved INTEGER NOT NULL DEFAULT 0,
  cards_reviewed INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (username, day)
);

CREATE TABLE IF NOT EXISTS user_streak_freezes (
  username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  used_on DATE NULL,
  PRIMARY KEY (username, week_start)
);

CREATE TABLE IF NOT EXISTS user_badges (
  username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  tier SMALLINT NOT NULL,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (username, badge_id, tier)
);

CREATE TABLE IF NOT EXISTS decks (
  id UUID PRIMARY KEY,
  username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_decks_user
  ON decks (username, is_default DESC);

CREATE TABLE IF NOT EXISTS cards (
  id UUID PRIMARY KEY,
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
  hanzi TEXT NOT NULL,
  state SMALLINT NOT NULL DEFAULT 0,
  due TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  stability REAL NOT NULL DEFAULT 0,
  difficulty REAL NOT NULL DEFAULT 0,
  elapsed_days REAL NOT NULL DEFAULT 0,
  scheduled_days REAL NOT NULL DEFAULT 0,
  reps INTEGER NOT NULL DEFAULT 0,
  lapses INTEGER NOT NULL DEFAULT 0,
  last_review TIMESTAMPTZ NULL,
  suspended BOOLEAN NOT NULL DEFAULT FALSE,
  buried_until DATE NULL,
  note TEXT NULL,
  story_slug TEXT NULL,
  example_sentence_zh TEXT NULL,
  example_sentence_pt TEXT NULL,
  snapshot JSONB NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (deck_id, hanzi)
);

CREATE INDEX IF NOT EXISTS idx_cards_user_due
  ON cards (username, suspended, due);

CREATE TABLE IF NOT EXISTS review_logs (
  id BIGSERIAL PRIMARY KEY,
  client_event_id UUID UNIQUE NOT NULL,
  card_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
  rating SMALLINT NOT NULL,
  state_before SMALLINT NOT NULL,
  elapsed_days REAL NOT NULL DEFAULT 0,
  scheduled_days REAL NOT NULL DEFAULT 0,
  duration_ms INTEGER NOT NULL DEFAULT 0,
  reviewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  client_day DATE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_review_logs_user_day
  ON review_logs (username, client_day DESC);

