import pg from "pg";

const { Pool } = pg;

function buildConnectionString() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const password = process.env.POSTGRES_PASSWORD;
  if (!password) {
    throw new Error("DATABASE_URL ou POSTGRES_PASSWORD é obrigatório");
  }

  const host = process.env.POSTGRES_HOST || "postgres";
  const port = process.env.POSTGRES_PORT || "5432";
  const user = process.env.POSTGRES_USER || "romulo_db_user";
  const database = process.env.POSTGRES_DB || "personal_db";

  return `postgresql://${user}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
}

export const pool = new Pool({
  connectionString: buildConnectionString(),
  max: 10,
  idleTimeoutMillis: 30_000,
});

pool.on("connect", (client) => {
  client.query("SET search_path TO landing, public").catch(() => {});
});

// Tabela compartilhada entre todos os Produtos — cada lead é identificado por
// `product_slug`. Instalações existentes com a tabela antiga `vault_waitlist`
// são migradas por sql/02-generalize-lead-capture.sql (fora do boot da API,
// rodado manualmente no deploy — ver esse arquivo para o racional).
export async function ensureSchema() {
  await pool.query(`
    CREATE SCHEMA IF NOT EXISTS landing;

    CREATE TABLE IF NOT EXISTS landing.lead_capture (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL,
      email_normalized TEXT NOT NULL,
      product_slug TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'lead_capture_modal',
      notify_adult_pack BOOLEAN NOT NULL DEFAULT true,
      gift_claimed BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT lead_capture_email_per_product_unique UNIQUE (product_slug, email_normalized)
    );

    CREATE INDEX IF NOT EXISTS idx_lead_capture_created_at
      ON landing.lead_capture (created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_lead_capture_product_slug
      ON landing.lead_capture (product_slug);
  `);
}
