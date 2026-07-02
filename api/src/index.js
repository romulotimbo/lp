import express from "express";
import { z } from "zod";
import { ensureSchema, pool } from "./db.js";

const PORT = Number(process.env.PORT || 3001);
const app = express();

const rateLimit = new Map();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;

app.set("trust proxy", 1);
app.use(express.json({ limit: "16kb" }));

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

function clientKey(req) {
  return req.ip || req.socket.remoteAddress || "unknown";
}

function isRateLimited(req) {
  const key = clientKey(req);
  const now = Date.now();
  const bucket = rateLimit.get(key) ?? [];
  const recent = bucket.filter((t) => now - t < RATE_WINDOW_MS);

  if (recent.length >= RATE_MAX) {
    rateLimit.set(key, recent);
    return true;
  }

  recent.push(now);
  rateLimit.set(key, recent);
  return false;
}

const waitlistSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(320),
  website: z.string().max(0).optional(),
});

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, service: "landing-api" });
  } catch {
    res.status(503).json({ ok: false, service: "landing-api" });
  }
});

app.post("/api/vault/waitlist", async (req, res) => {
  if (isRateLimited(req)) {
    res.status(429).json({
      ok: false,
      error: "Muitas tentativas. Aguarde um minuto.",
    });
    return;
  }

  const parsed = waitlistSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    });
    return;
  }

  if (parsed.data.website) {
    res.status(400).json({ ok: false, error: "Requisição inválida" });
    return;
  }

  const email = parsed.data.email.trim();
  const emailNormalized = email.toLowerCase();

  try {
    const insert = await pool.query(
      `INSERT INTO landing.vault_waitlist (email, email_normalized, source)
       VALUES ($1, $2, 'vault_modal')
       ON CONFLICT (email_normalized) DO NOTHING
       RETURNING id, created_at`,
      [email, emailNormalized],
    );

    if (insert.rowCount === 0) {
      res.status(200).json({
        ok: true,
        alreadyRegistered: true,
        message:
          "Esse e-mail já está na lista. A Vee avisa quando o pack estiver no ar.",
      });
      return;
    }

    res.status(201).json({
      ok: true,
      message:
        "Presente reservado. Você será avisado quando o pack exclusivo estiver disponível.",
    });
  } catch (err) {
    console.error("[vault/waitlist]", err);
    res.status(500).json({
      ok: false,
      error: "Não foi possível registrar agora. Tente de novo em instantes.",
    });
  }
});

async function main() {
  await ensureSchema();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`landing-api listening on :${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
