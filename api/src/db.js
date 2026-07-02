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

export async function ensureSchema() {
  await pool.query(`
    CREATE SCHEMA IF NOT EXISTS landing;

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
  `);
}
