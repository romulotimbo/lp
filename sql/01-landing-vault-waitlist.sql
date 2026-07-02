-- Landing page — schema e fila de e-mails da Área Restrita (vault waitlist)
-- Banco: personal_db | Owner: romulo_db_user
-- Idempotente — seguro rodar mais de uma vez.
--
-- VPS (banco já existente):
--   docker exec -i postgres psql -U romulo_db_user -d personal_db < sql/01-landing-vault-waitlist.sql

CREATE SCHEMA IF NOT EXISTS landing AUTHORIZATION romulo_db_user;

CREATE TABLE IF NOT EXISTS landing.vault_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'vault_modal',
  notify_adult_pack BOOLEAN NOT NULL DEFAULT true,
  gift_claimed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT vault_waitlist_email_normalized_unique UNIQUE (email_normalized)
);

CREATE INDEX IF NOT EXISTS idx_vault_waitlist_created_at
  ON landing.vault_waitlist (created_at DESC);

COMMENT ON TABLE landing.vault_waitlist IS
  'E-mails capturados no modal da Área Restrita — presente + aviso do pack adulto.';
