import { pool } from "./db.js";
import {
  buildIngestRequest,
  eventTimestamp,
  firstQueryValue,
  normalizeBuygoodsPostback,
  tokensMatch,
} from "./buygoods-conversion.js";

const INGEST_URL = "https://datamanager.googleapis.com/v1/events:ingest";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

let cachedToken = null;
let loggedMissingConfig = false;

function allowedProducts() {
  const raw = process.env.BUYGOODS_PRODUCTS || "burntide";
  return new Set(
    raw
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean),
  );
}

function postbackToken() {
  return process.env.BUYGOODS_POSTBACK_TOKEN?.trim() || "";
}

export function googleDestinationFromEnv() {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.trim() || "";
  const conversionActionId = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID?.trim() || "";
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.trim() || "";
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim() || "";
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim() || "";
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim() || "";
  const configured = Boolean(
    customerId && conversionActionId && clientId && clientSecret && refreshToken,
  );
  return {
    configured,
    customerId,
    conversionActionId,
    loginCustomerId,
    clientId,
    clientSecret,
    refreshToken,
  };
}

function readPayload(req) {
  const source = req.method === "GET" ? req.query : { ...req.query, ...req.body };
  return {
    key: firstQueryValue(source.key),
    product: source.product,
    order_id: source.order_id,
    gclid: source.gclid,
    gbraid: source.gbraid,
    wbraid: source.wbraid,
    value: source.value,
    currency: source.currency,
    conv_type: source.conv_type,
    product_codename: source.product_codename,
    email_hash: source.email_hash,
  };
}

function ack(res) {
  res.status(200).type("text/plain").send("ok");
}

/** Sem corpo: a BuyGoods trata resposta vazia como falha e tenta de novo por até 3 dias. */
function retry(res) {
  res.status(503).end();
}

async function getAccessToken(destination) {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) return cachedToken.value;

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: destination.clientId,
    client_secret: destination.clientSecret,
    refresh_token: destination.refreshToken,
  });
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.access_token) {
    const detail = payload.error_description || payload.error || `HTTP ${response.status}`;
    throw new Error(`oauth ${detail}`);
  }
  cachedToken = {
    value: payload.access_token,
    expiresAt: now + Number(payload.expires_in || 3600) * 1000,
  };
  return cachedToken.value;
}

async function uploadConversion(row, destination) {
  const requestBody = buildIngestRequest(
    {
      gclid: row.gclid || "",
      gbraid: row.gbraid || "",
      wbraid: row.wbraid || "",
      emailHash: row.email_hash || "",
      commission: row.commission_amount == null ? null : Number(row.commission_amount),
      currency: row.currency || "USD",
      orderId: row.order_id,
      eventTimestamp: eventTimestamp(),
    },
    destination,
  );
  if (!requestBody) {
    return { status: "unattributed", requestId: null, error: null };
  }

  const accessToken = await getAccessToken(destination);
  const response = await fetch(INGEST_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const text = await response.text();
  let payload = {};
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = {};
  }
  if (!response.ok) {
    const message = payload.error?.message || text.slice(0, 400) || `HTTP ${response.status}`;
    return { status: "failed", requestId: null, error: message.slice(0, 500) };
  }
  return {
    status: "uploaded",
    requestId: payload.requestId || payload.name || "ok",
    error: null,
  };
}

async function saveStatus(id, result) {
  await pool.query(
    `UPDATE landing.buygoods_conversion
        SET status = $2,
            google_request_id = $3,
            google_error = $4,
            updated_at = now()
      WHERE id = $1`,
    [id, result.status, result.requestId, result.error],
  );
}

async function insertConversion(event) {
  const inserted = await pool.query(
    `INSERT INTO landing.buygoods_conversion (
       product_slug, order_id, gclid, gbraid, wbraid, email_hash,
       commission_amount, currency, conv_type, product_codename, status
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     ON CONFLICT (product_slug, order_id) DO NOTHING
     RETURNING *`,
    [
      event.product,
      event.orderId,
      event.gclid || null,
      event.gbraid || null,
      event.wbraid || null,
      event.emailHash || null,
      event.commission,
      event.currency,
      event.convType || null,
      event.productCodename || null,
      event.attributed ? "pending" : "unattributed",
    ],
  );
  if (inserted.rowCount > 0) return { row: inserted.rows[0], duplicate: false };

  const existing = await pool.query(
    `SELECT * FROM landing.buygoods_conversion
      WHERE product_slug = $1 AND order_id = $2`,
    [event.product, event.orderId],
  );
  return { row: existing.rows[0], duplicate: true };
}

function logOutcome(row, result) {
  console.log(
    `[buygoods-postback] ${result.status} product=${row.product_slug} order=${row.order_id}` +
      (result.requestId ? ` request=${result.requestId}` : "") +
      (result.error ? ` error=${result.error}` : ""),
  );
}

async function deliver(row, destination) {
  if (row.status === "uploaded" || row.status === "unattributed") {
    return { delivered: true, result: { status: row.status, requestId: row.google_request_id, error: null } };
  }
  if (!row.gclid && !row.gbraid && !row.wbraid) {
    const result = { status: "unattributed", requestId: null, error: null };
    await saveStatus(row.id, result);
    return { delivered: true, result };
  }
  if (!destination.configured) {
    if (!loggedMissingConfig) {
      loggedMissingConfig = true;
      console.error(
        "[buygoods-postback] Google Ads não configurado. Defina GOOGLE_ADS_CUSTOMER_ID, GOOGLE_ADS_CONVERSION_ACTION_ID e o refresh token OAuth.",
      );
    }
    return { delivered: false, result: { status: "pending", requestId: null, error: "google-not-configured" } };
  }

  try {
    const result = await uploadConversion(row, destination);
    await saveStatus(row.id, result);
    logOutcome(row, result);
    return { delivered: result.status === "uploaded" || result.status === "unattributed", result };
  } catch (err) {
    const result = {
      status: "failed",
      requestId: null,
      error: String(err?.message || err).slice(0, 500),
    };
    await saveStatus(row.id, result);
    logOutcome(row, result);
    return { delivered: false, result };
  }
}

export function registerBuygoodsPostback(app) {
  app.get("/api/postback/buygoods/status", (req, res) => {
    if (!tokensMatch(firstQueryValue(req.query.key), postbackToken())) {
      res.status(401).end();
      return;
    }
    const destination = googleDestinationFromEnv();
    res.json({
      ok: true,
      products: [...allowedProducts()],
      googleConfigured: destination.configured,
    });
  });

  app.post("/api/postback/buygoods/replay", async (req, res) => {
    if (!tokensMatch(firstQueryValue(req.query.key || req.body?.key), postbackToken())) {
      res.status(401).end();
      return;
    }
    const destination = googleDestinationFromEnv();
    if (!destination.configured) {
      res.status(503).json({ ok: false, error: "google-not-configured" });
      return;
    }
    const pending = await pool.query(
      `SELECT * FROM landing.buygoods_conversion
        WHERE status IN ('pending', 'failed')
        ORDER BY created_at ASC
        LIMIT 50`,
    );
    let uploaded = 0;
    let failed = 0;
    for (const row of pending.rows) {
      const outcome = await deliver(row, destination);
      if (outcome.result.status === "uploaded") uploaded += 1;
      else failed += 1;
    }
    res.json({ ok: true, scanned: pending.rowCount, uploaded, failed });
  });

  const receive = async (req, res) => {
    const token = postbackToken();
    if (!token) {
      console.error("[buygoods-postback] BUYGOODS_POSTBACK_TOKEN ausente");
      retry(res);
      return;
    }

    const payload = readPayload(req);
    if (!tokensMatch(payload.key, token)) {
      res.status(401).end();
      return;
    }

    const event = normalizeBuygoodsPostback(payload, allowedProducts());
    if (!event.ok) {
      console.error(`[buygoods-postback] ignorado reason=${event.reason}`);
      ack(res);
      return;
    }

    try {
      const { row, duplicate } = await insertConversion(event);
      if (!row) {
        retry(res);
        return;
      }
      if (duplicate && (row.status === "uploaded" || row.status === "unattributed")) {
        ack(res);
        return;
      }
      const outcome = await deliver(row, googleDestinationFromEnv());
      if (outcome.delivered) ack(res);
      else retry(res);
    } catch (err) {
      console.error("[buygoods-postback]", err);
      retry(res);
    }
  };

  app.get("/api/postback/buygoods", receive);
  app.post("/api/postback/buygoods", receive);
}
