-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Community Reports
CREATE TABLE community_reports (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  neighborhood  TEXT NOT NULL,
  zip_code      TEXT,
  report_text   TEXT NOT NULL CHECK (char_length(report_text) BETWEEN 10 AND 1000),
  language      TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'es')),
  ip_hash       TEXT,
  is_moderated  BOOLEAN NOT NULL DEFAULT false,
  is_visible    BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX idx_reports_neighborhood_time
  ON community_reports (neighborhood, created_at DESC);

ALTER TABLE community_reports ENABLE ROW LEVEL SECURITY;

-- Server-side only access (service role bypasses RLS)
CREATE POLICY "no_anon_access_reports"
  ON community_reports FOR ALL TO anon USING (false);

-- SMS Subscriptions
CREATE TABLE sms_subscriptions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  phone_e164      TEXT NOT NULL,
  zip_code        TEXT NOT NULL,
  neighborhood    TEXT,
  language        TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'es')),
  is_active       BOOLEAN NOT NULL DEFAULT true,
  last_alerted_at TIMESTAMPTZ,
  consent_text    TEXT NOT NULL,
  consented_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (phone_e164, zip_code)
);

CREATE INDEX idx_sms_zip_active
  ON sms_subscriptions (zip_code, is_active)
  WHERE is_active = true;

ALTER TABLE sms_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "no_anon_access_sms"
  ON sms_subscriptions FOR ALL TO anon USING (false);
