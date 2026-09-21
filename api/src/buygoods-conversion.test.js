import assert from "node:assert/strict";
import test from "node:test";
import {
  buildIngestRequest,
  normalizeBuygoodsPostback,
  tokensMatch,
  validClickId,
} from "./buygoods-conversion.js";

const allowed = new Set(["burntide"]);

test("aceita a venda do Burntide e guarda só click ids válidos", () => {
  const event = normalizeBuygoodsPostback(
    {
      product: "burntide",
      order_id: "BG-1001",
      gclid: "CjwKCAjwtestclickid",
      gbraid: "{SUBID2}",
      value: "$49.50",
      currency: "usd",
      email_hash: "3e693cf7e5b67880bff33b2d2626dadb7bf1d4bc737192e47cf8baa89acf2250",
      conv_type: "frontend",
    },
    allowed,
  );

  assert.equal(event.ok, true);
  assert.equal(event.orderId, "BG-1001");
  assert.equal(event.gclid, "CjwKCAjwtestclickid");
  assert.equal(event.gbraid, "");
  assert.equal(event.commission, 49.5);
  assert.equal(event.currency, "USD");
  assert.equal(event.emailHash, "3E693CF7E5B67880BFF33B2D2626DADB7BF1D4BC737192E47CF8BAA89ACF2250");
  assert.equal(event.attributed, true);
});

test("recusa produto fora da lista e pedido vazio", () => {
  assert.equal(
    normalizeBuygoodsPostback({ product: "outro", order_id: "1" }, allowed).reason,
    "unknown-product",
  );
  assert.equal(
    normalizeBuygoodsPostback({ product: "burntide", order_id: "{ORDERID}" }, allowed).reason,
    "missing-order",
  );
});

test("descarta click id curto", () => {
  assert.equal(validClickId("abc"), "");
});

test("o corpo do Google Ads leva gclid, valor e e-mail já hasheado", () => {
  const body = buildIngestRequest(
    {
      gclid: "CjwKCAjwtestclickid",
      gbraid: "",
      wbraid: "",
      emailHash: "3E693CF7E5B67880BFF33B2D2626DADB7BF1D4BC737192E47CF8BAA89ACF2250",
      commission: 49.5,
      currency: "USD",
      orderId: "BG-1001",
      eventTimestamp: "2026-09-21T19:00:00Z",
    },
    { customerId: "AW-18351905109", conversionActionId: "1234567890", loginCustomerId: "" },
  );

  assert.equal(body.destinations[0].operatingAccount.accountId, "18351905109");
  assert.equal(body.destinations[0].loginAccount.accountId, "18351905109");
  assert.equal(body.destinations[0].productDestinationId, "1234567890");
  assert.equal(body.events[0].adIdentifiers.gclid, "CjwKCAjwtestclickid");
  assert.equal(body.events[0].conversionValue, 49.5);
  assert.equal(body.events[0].transactionId, "BG-1001");
  assert.equal(body.encoding, "HEX");
  assert.equal(body.events[0].userData.userIdentifiers[0].emailAddress.length, 64);
});

test("sem click id não monta upload", () => {
  assert.equal(
    buildIngestRequest(
      {
        gclid: "",
        gbraid: "",
        wbraid: "",
        orderId: "BG-1",
        eventTimestamp: "2026-09-21T19:00:00Z",
      },
      { customerId: "18351905109", conversionActionId: "123" },
    ),
    null,
  );
});

test("compara o token em tempo constante e falha se o tamanho difere", () => {
  assert.equal(tokensMatch("mesmo-token-aqui", "mesmo-token-aqui"), true);
  assert.equal(tokensMatch("mesmo-token-aqui", "outro-token-aqui"), false);
  assert.equal(tokensMatch("curto", "mesmo-token-aqui"), false);
  assert.equal(tokensMatch("", "mesmo-token-aqui"), false);
});
