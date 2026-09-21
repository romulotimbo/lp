import { timingSafeEqual } from "node:crypto";

const CLICK_ID = /^[A-Za-z0-9._~-]{8,300}$/;
const EMAIL_HASH = /^[a-fA-F0-9]{64}$/;
const MACRO = /^\{[A-Z0-9_]+\}$/;
const CURRENCY = /^[A-Z]{3}$/;

export function firstQueryValue(value) {
  if (Array.isArray(value)) return firstQueryValue(value[0]);
  if (value == null) return "";
  return String(value).trim();
}

export function blankMacro(value) {
  const text = firstQueryValue(value);
  if (!text || MACRO.test(text)) return "";
  return text;
}

export function validClickId(value) {
  const text = blankMacro(value);
  return CLICK_ID.test(text) ? text : "";
}

export function validEmailHash(value) {
  const text = blankMacro(value);
  return EMAIL_HASH.test(text) ? text.toUpperCase() : "";
}

export function tokensMatch(provided, expected) {
  if (!provided || !expected) return false;
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function parseCommission(value) {
  const text = blankMacro(value).replace(/[$,\s]/g, "");
  if (!text) return null;
  const amount = Number(text);
  if (!Number.isFinite(amount) || amount < 0 || amount > 1_000_000) return null;
  return Math.round(amount * 100) / 100;
}

/**
 * Normaliza o postback da BuyGoods. `allowedProducts` vem do ambiente
 * (default: burntide). Macros não substituídos (`{ORDERID}`) viram vazio.
 */
export function normalizeBuygoodsPostback(input, allowedProducts) {
  const product = blankMacro(input.product).toLowerCase();
  const orderId = blankMacro(input.order_id);
  const currencyRaw = blankMacro(input.currency).toUpperCase();
  const currency = CURRENCY.test(currencyRaw) ? currencyRaw : "USD";
  const gclid = validClickId(input.gclid);
  const gbraid = validClickId(input.gbraid);
  const wbraid = validClickId(input.wbraid);

  if (!product || !allowedProducts.has(product)) {
    return { ok: false, reason: "unknown-product" };
  }
  if (!orderId || orderId.length > 120) {
    return { ok: false, reason: "missing-order" };
  }

  return {
    ok: true,
    product,
    orderId,
    gclid,
    gbraid,
    wbraid,
    emailHash: validEmailHash(input.email_hash),
    commission: parseCommission(input.value),
    currency,
    convType: blankMacro(input.conv_type).slice(0, 40),
    productCodename: blankMacro(input.product_codename).slice(0, 120),
    attributed: Boolean(gclid || gbraid || wbraid),
  };
}

export function googleAdsDigits(value) {
  return String(value ?? "").replace(/\D/g, "");
}

/**
 * Corpo do `events:ingest` para uma conversão offline de clique.
 * Sem click id não há o que atribuir — devolve null.
 */
export function buildIngestRequest(event, destination) {
  const customerId = googleAdsDigits(destination.customerId);
  const conversionActionId = googleAdsDigits(destination.conversionActionId);
  const loginCustomerId = googleAdsDigits(destination.loginCustomerId) || customerId;
  if (!customerId || !conversionActionId) return null;

  const adIdentifiers = {};
  if (event.gclid) adIdentifiers.gclid = event.gclid;
  if (event.gbraid) adIdentifiers.gbraid = event.gbraid;
  if (event.wbraid) adIdentifiers.wbraid = event.wbraid;
  if (Object.keys(adIdentifiers).length === 0) return null;

  const body = {
    destinations: [
      {
        operatingAccount: { accountType: "GOOGLE_ADS", accountId: customerId },
        loginAccount: { accountType: "GOOGLE_ADS", accountId: loginCustomerId },
        productDestinationId: conversionActionId,
      },
    ],
    events: [
      {
        adIdentifiers,
        eventTimestamp: event.eventTimestamp,
        transactionId: event.orderId,
        eventSource: "WEB",
      },
    ],
  };

  if (event.commission != null) {
    body.events[0].conversionValue = event.commission;
    body.events[0].currency = event.currency || "USD";
  }
  if (event.emailHash) {
    body.encoding = "HEX";
    body.events[0].userData = {
      userIdentifiers: [{ emailAddress: event.emailHash }],
    };
  }
  return body;
}

export function eventTimestamp(date = new Date()) {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}
