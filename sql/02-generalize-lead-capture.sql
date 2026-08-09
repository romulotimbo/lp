-- Generaliza a captura de lead de "Vault" (Vee) para um mecanismo compartilhado
-- entre todos os Produtos — ver openspec/changes/extract-reusable-base/.
-- Banco: personal_db | Owner: romulo_db_user
-- Idempotente e aditivo — renomeia a tabela existente e adiciona as colunas
-- novas em vez de recriar do zero, preservando os registros já capturados.
--
-- VPS:
--   docker exec -i postgres psql -U romulo_db_user -d personal_db < sql/02-generalize-lead-capture.sql

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'landing' AND table_name = 'vault_waitlist'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'landing' AND table_name = 'lead_capture'
  ) THEN
    ALTER TABLE landing.vault_waitlist RENAME TO lead_capture;
    ALTER TABLE landing.lead_capture RENAME CONSTRAINT vault_waitlist_email_normalized_unique
      TO lead_capture_email_per_product_unique;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS landing.lead_capture (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL,
  product_slug TEXT NOT NULL DEFAULT 'energi-power-vee',
  source TEXT NOT NULL DEFAULT 'vault_modal',
  notify_adult_pack BOOLEAN NOT NULL DEFAULT true,
  gift_claimed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Registros migrados da tabela antiga (que não tinha essa coluna) ficam
-- atribuídos ao único Produto que existia até aqui.
ALTER TABLE landing.lead_capture
  ADD COLUMN IF NOT EXISTS product_slug TEXT NOT NULL DEFAULT 'energi-power-vee';

-- A unicidade de e-mail passa a ser por Produto, não global — o mesmo e-mail
-- pode se cadastrar em Produtos diferentes.
ALTER TABLE landing.lead_capture
  DROP CONSTRAINT IF EXISTS lead_capture_email_normalized_unique;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'lead_capture_email_per_product_unique'
  ) THEN
    ALTER TABLE landing.lead_capture
      ADD CONSTRAINT lead_capture_email_per_product_unique UNIQUE (product_slug, email_normalized);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_lead_capture_created_at
  ON landing.lead_capture (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_capture_product_slug
  ON landing.lead_capture (product_slug);

COMMENT ON TABLE landing.lead_capture IS
  'E-mails capturados via módulo de Captura de lead — compartilhado entre todos os Produtos, identificados por product_slug.';
