-- Schema derived from data-model/entities.md
-- PostgreSQL DDL for MVP domain entities

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE app_user (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_id TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES app_user(id) ON DELETE CASCADE,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE letter_visibility AS ENUM ('private', 'open');
CREATE TYPE letter_status AS ENUM ('queued', 'delivered', 'hidden_moderation');

CREATE TABLE letter (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES app_user(id) ON DELETE SET NULL,
  parent_letter_id UUID REFERENCES letter(id) ON DELETE SET NULL,
  visibility letter_visibility NOT NULL,
  status letter_status NOT NULL DEFAULT 'queued',
  subject TEXT,
  body TEXT NOT NULL,
  scheduled_for TIMESTAMPTZ NOT NULL,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT private_letter_requires_recipient
    CHECK (
      (visibility = 'private' AND recipient_id IS NOT NULL)
      OR visibility = 'open'
    )
);

CREATE TYPE postcard_source_type AS ENUM ('achievement', 'event');

CREATE TABLE postcard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  source_type postcard_source_type NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE postcard_unlock_source AS ENUM ('achievement', 'event', 'admin_grant');

CREATE TABLE user_postcard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  postcard_id UUID NOT NULL REFERENCES postcard(id) ON DELETE CASCADE,
  unlocked_by postcard_unlock_source NOT NULL,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE letter_postcard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  letter_id UUID NOT NULL UNIQUE REFERENCES letter(id) ON DELETE CASCADE,
  user_postcard_id UUID NOT NULL REFERENCES user_postcard(id) ON DELETE RESTRICT,
  attached_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE moderation_report_status AS ENUM ('open', 'reviewed', 'dismissed', 'actioned');

CREATE TABLE moderation_report (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_user_id UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  letter_id UUID NOT NULL REFERENCES letter(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status moderation_report_status NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

CREATE INDEX idx_letter_sender_created_at
  ON letter(sender_id, created_at DESC);

CREATE INDEX idx_letter_recipient_created_at
  ON letter(recipient_id, created_at DESC);

CREATE INDEX idx_letter_visibility_created_at
  ON letter(visibility, created_at DESC);

CREATE INDEX idx_letter_parent_letter_id
  ON letter(parent_letter_id);

CREATE INDEX idx_user_postcard_user_unlocked_at
  ON user_postcard(user_id, unlocked_at DESC);

CREATE INDEX idx_moderation_report_status_created_at
  ON moderation_report(status, created_at DESC);

