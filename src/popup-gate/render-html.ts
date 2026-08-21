/**
 * Renderiza a Página-popup de um Produto (ver `PopupGateConfig`) como um
 * documento HTML autocontido — sem React, sem bundle, sem request extra além
 * das imagens dos Planos. É emitida em build time pelo plugin `product-popup-gate`
 * (vite.config.ts) no path `<popupGate.path>/index.html`.
 *
 * Por que HTML estático em vez de uma rota da SPA: a página tem uma única
 * decisão na tela e é o destino de tráfego pago — carregar o bundle inteiro da
 * página de review só pra desenhar um popup atrasaria o first paint sem
 * nenhum ganho. Os metadados de SEO/OG e as Tags de rastreamento são os mesmos
 * da página de review porque saem do mesmo `ProductConfig`.
 */
import type {
  PopupGateBackdropCard,
  PopupGateConfig,
  SpaProductConfig,
} from "../product/types";

/** Tags de rastreamento já renderizadas pelo vite.config (mesma fonte da página de review). */
export interface TrackingMarkup {
  /** `<script>`s que vão no `<head>`. */
  head: string;
  /** `<noscript>`s correspondentes, que só são válidos dentro do `<body>`. */
  noscript: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** JSON seguro dentro de `<script>` — `</script>` no meio de uma string fecharia a tag. */
function inlineJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/** Cards da réplica: `backdrop.cards` ganha de `plans` (review não tem planos). */
function replicaCards(config: SpaProductConfig, gate: PopupGateConfig): PopupGateBackdropCard[] {
  if ((gate.backdrop.cards?.length ?? 0) > 0) return gate.backdrop.cards ?? [];
  return (config.plans ?? []).map((plan) => ({
    name: plan.name,
    image: plan.image,
    price: plan.price,
    perUnit: plan.perUnit,
    description: plan.description,
    featured: plan.recommended,
    id: plan.id,
    value: plan.value,
  }));
}

/**
 * Valor da conversão — card featured / plano recommended, senão o primeiro.
 * Sem os dois: nome do Produto e value 0.
 */
function conversionTarget(
  config: SpaProductConfig,
  gate: PopupGateConfig,
): { id: string; name: string; value: number } {
  const cards = replicaCards(config, gate);
  const featured = cards.find((card) => card.featured) ?? cards[0];
  if (!featured) {
    return { id: gate.path, name: config.productName, value: 0 };
  }
  return {
    id: featured.id ?? gate.path,
    name: featured.name,
    value: featured.value ?? 0,
  };
}

/** URL de checkout com o parâmetro de origem já aplicado — usada no `href` do CTA (funciona sem JS). */
function applyCheckoutHash(url: URL, hash: string | undefined): void {
  const fragment = (hash ?? "").replace(/^#/, "").trim();
  if (fragment) url.hash = fragment;
}

function checkoutUrlWithSource(gate: PopupGateConfig, source: string): string {
  const url = new URL(gate.checkoutHref);
  url.searchParams.set(gate.sourceParam, source);
  applyCheckoutHash(url, gate.checkoutHash);
  return url.toString();
}

function backdropCard(card: PopupGateBackdropCard, gate: PopupGateConfig): string {
  const featured = card.featured ? " co-card--featured" : "";
  return `
        <article class="co-card${featured}">
          <header class="co-card__head">${escapeHtml(card.name)}</header>
          <img class="co-card__img" src="${escapeHtml(card.image)}" alt="" />
          <p class="co-card__price">${escapeHtml(card.price)}</p>
          <p class="co-card__per">${escapeHtml(card.perUnit ?? "")}</p>
          <p class="co-card__desc">${escapeHtml(card.description)}</p>
          <p class="co-card__btn">${escapeHtml(gate.backdrop.cardCtaLabel)}</p>
        </article>`;
}

/**
 * Banda de conteúdo abaixo dos cards, montada a partir dos pilares do Produto —
 * existe só pra réplica encher a tela em viewports altos, senão sobra uma faixa
 * lisa embaixo que denuncia que o fundo não é uma página de verdade.
 */
function backdropBand(config: SpaProductConfig): string {
  const pillars = (config.powerGrid?.pillars ?? []).slice(0, 3);
  if (pillars.length === 0) return "";
  return `
        <div class="co-band">${pillars
          .map(
            (pillar) => `
          <div class="co-band__item">
            <p class="co-band__title">${escapeHtml(pillar.title)}</p>
            <p class="co-band__text">${escapeHtml(pillar.description)}</p>
          </div>`,
          )
          .join("")}
        </div>`;
}

function styles(gate: PopupGateConfig): string {
  return `
    *, *::before, *::after { box-sizing: border-box; }
    :root {
      --dark: ${gate.colors.dark};
      --accent: ${gate.colors.accent};
      --on-accent: ${gate.colors.onAccent ?? gate.colors.dark};
    }
    html, body { height: 100%; }
    body {
      margin: 0;
      overflow: hidden;
      background: #eceef1;
      color: var(--dark);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* --- Réplica desfocada da página de checkout (puramente decorativa) --- */
    .stage { position: fixed; inset: 0; overflow: hidden; }
    /* inset negativo + scale evitam a borda clara que o blur deixa nas beiradas */
    .stage__page {
      position: absolute;
      inset: -4%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      filter: blur(7px);
      transform: scale(1.04);
      pointer-events: none;
      user-select: none;
      background: #eceef1;
    }
    .stage__veil { position: absolute; inset: 0; background: rgb(33 37 41 / 0.62); }

    .co-bar {
      background: var(--dark);
      color: #fff;
      padding: 16px 28px;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }
    .co-bar em { color: var(--accent); font-style: normal; }
    .co-ribbon {
      background: var(--accent);
      color: var(--on-accent);
      text-align: center;
      font-size: 22px;
      font-weight: 800;
      padding: 18px 24px;
    }
    .co-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 22px;
      max-width: 1060px;
      margin: 0 auto;
      padding: 36px 24px 8px;
    }
    .co-card {
      background: #fff;
      border: 1px solid #dee2e6;
      border-radius: 10px;
      overflow: hidden;
      text-align: center;
      padding-bottom: 16px;
    }
    .co-card--featured { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 45%, transparent); }
    .co-card__head {
      background: var(--dark);
      color: #fff;
      padding: 11px;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .co-card--featured .co-card__head { background: var(--accent); color: var(--on-accent); }
    .co-card__img { display: block; width: 100%; height: 190px; object-fit: contain; padding: 14px; }
    .co-card__price { margin: 0; font-size: 36px; font-weight: 800; line-height: 1; }
    .co-card__per { margin: 6px 0 0; color: #6c757d; font-size: 14px; }
    .co-card__desc { margin: 10px 18px 0; color: #495057; font-size: 13px; line-height: 1.4; }
    .co-card__btn {
      margin: 16px 18px 0;
      background: var(--accent);
      color: var(--on-accent);
      border-radius: 6px;
      padding: 13px;
      font-size: 15px;
      font-weight: 800;
      text-transform: uppercase;
    }
    .co-note { margin: 26px auto 0; max-width: 1060px; padding: 0 24px; text-align: center; color: #495057; font-size: 15px; }
    .co-band {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
      max-width: 1060px;
      margin: 34px auto 0;
      padding: 34px 24px 0;
      border-top: 1px solid #dee2e6;
    }
    .co-band__title { margin: 0 0 8px; font-size: 19px; font-weight: 800; }
    .co-band__text { margin: 0; color: #495057; font-size: 14px; line-height: 1.5; }
    /* margin-top auto (com o .stage__page em coluna) ancora o rodapé no fim da
       tela — sem isso sobra uma faixa lisa embaixo em viewports altos. */
    .co-foot { margin-top: auto; background: var(--dark); color: #adb5bd; padding: 26px 24px; text-align: center; font-size: 13px; }
    .co-foot strong { display: block; margin-bottom: 6px; color: var(--accent); letter-spacing: 0.14em; text-transform: uppercase; }

    /* --- Popup --- */
    .gate { position: fixed; inset: 0; display: grid; place-items: center; padding: 20px; }
    .gate__card {
      width: 100%;
      max-width: 388px;
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 24px 64px rgb(0 0 0 / 0.45);
      animation: gate-in 0.28s cubic-bezier(0.2, 0.8, 0.3, 1) both;
    }
    @keyframes gate-in {
      from { opacity: 0; transform: translateY(10px) scale(0.97); }
      to { opacity: 1; transform: none; }
    }
    .gate__head { display: flex; align-items: center; gap: 10px; background: var(--dark); padding: 15px 20px; }
    .gate__head svg { flex: none; width: 20px; height: 20px; color: var(--accent); }
    .gate__title { margin: 0; color: #fff; font-size: 15px; font-weight: 700; line-height: 1.3; }
    .gate__body { padding: 20px; }
    .gate__text { margin: 0 0 18px; color: #343a40; font-size: 14.5px; line-height: 1.55; }
    .gate__cta {
      display: block;
      width: 100%;
      border: 0;
      border-radius: 8px;
      background: var(--accent);
      color: var(--on-accent);
      padding: 14px 16px;
      font: inherit;
      font-size: 15px;
      font-weight: 800;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.15s ease, transform 0.15s ease, filter 0.15s ease;
    }
    .gate__cta:hover { filter: brightness(1.08); }
    .gate__cta:active { transform: translateY(1px); }
    .gate__cta:focus-visible, .gate__close:focus-visible { outline: 3px solid var(--dark); outline-offset: 2px; }
    .gate__close {
      display: block;
      margin: 10px 0 0;
      padding: 6px;
      color: #6c757d;
      font-size: 12.5px;
      text-align: center;
      text-decoration: underline;
      cursor: pointer;
    }
    .gate__close:hover { color: var(--dark); }

    @media (max-width: 720px) {
      .co-grid, .co-band { grid-template-columns: 1fr; }
      .co-ribbon { font-size: 17px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .gate__card { animation: none; }
      .gate__cta { transition: none; }
    }`;
}

/** Dispara as Tags de rastreamento e só então redireciona — mesmo contrato de `trackInitiateCheckout`. */
function script(config: SpaProductConfig, gate: PopupGateConfig): string {
  const conversion = conversionTarget(config, gate);
  const metaPixel = (config.trackingTags ?? []).find((tag) => tag.type === "meta_pixel");
  const googleAds = (config.trackingTags ?? []).find((tag) => tag.type === "google_ads");

  const settings = {
    checkoutHref: gate.checkoutHref,
    sourceParam: gate.sourceParam,
    defaultSource: gate.defaultSource,
    checkoutHash: gate.checkoutHash ?? "",
    currency: config.locale.currency,
    planId: conversion.id,
    planName: conversion.name,
    value: conversion.value,
    hasMetaPixel: Boolean(metaPixel),
    googleAdsLabel: googleAds?.conversionLabel ?? null,
  };

  return `
      (function () {
        var S = ${inlineJson(settings)};
        var REDIRECT_MS = 800;

        // A origem chega no querystring da própria página e segue pro checkout,
        // pra que o relatório do fornecedor separe o tráfego desta página do
        // tráfego da página de review.
        var pageParams = new URLSearchParams(window.location.search);
        var source = (pageParams.get(S.sourceParam) || "").trim() || S.defaultSource;

        var checkout = new URL(S.checkoutHref);
        checkout.searchParams.set(S.sourceParam, source);
        if (S.checkoutHash) checkout.hash = S.checkoutHash;
        var checkoutUrl = checkout.toString();

        // Os dois links levam ao mesmo destino — o secundário ("Close") não
        // fecha nada, é a segunda porta pro mesmo checkout.
        var targets = [document.getElementById("gate-cta"), document.getElementById("gate-close")];
        targets.forEach(function (el) {
          el.setAttribute("href", checkoutUrl);
        });

        function toCheckout(event) {
          event.preventDefault();

          // Latch por clique, não do módulo inteiro: só serve pra decidir entre
          // o event_callback da tag e o timeout de fallback deste clique. Se
          // fosse compartilhado, um retorno pelo botão "voltar" do navegador
          // (bfcache restaura o closure com o latch já ligado) deixaria os dois
          // links inertes.
          var redirected = false;
          function go() {
            if (redirected) return;
            redirected = true;
            window.location.assign(checkoutUrl);
          }

          var fired = false;

          if (S.hasMetaPixel && typeof window.fbq === "function") {
            fired = true;
            window.fbq(
              "track",
              "InitiateCheckout",
              {
                content_ids: [S.planId],
                content_name: S.planName,
                content_type: "product",
                num_items: 1,
                value: S.value,
                currency: S.currency,
                source: source
              },
              { event_callback: go }
            );
          }

          if (S.googleAdsLabel && typeof window.gtag === "function") {
            fired = true;
            window.gtag("event", "conversion", {
              send_to: S.googleAdsLabel,
              value: S.value,
              currency: S.currency,
              event_callback: go
            });
          }

          if (!fired) {
            go();
            return;
          }
          // Fallback: bloqueador de rastreamento ou rede lenta não podem travar o clique.
          window.setTimeout(go, REDIRECT_MS);
        }

        targets.forEach(function (el) {
          el.addEventListener("click", toCheckout);
        });
      })();`;
}

export function renderPopupGateHtml(config: SpaProductConfig, tracking: TrackingMarkup): string {
  const gate = config.popupGate;
  if (!gate) throw new Error("renderPopupGateHtml chamado sem popupGate configurado");

  const { seo, locale } = config;
  const pageUrl = new URL(`/${gate.path}`, seo.url).toString();
  const initialHref = checkoutUrlWithSource(gate, gate.defaultSource);

  return `<!doctype html>
<html lang="${escapeHtml(locale.language)}">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <!-- Página de tráfego pago, não de busca orgânica: indexá-la só criaria um
         concorrente raso da página de review no mesmo domínio. -->
    <meta name="robots" content="noindex, nofollow" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:image" content="${escapeHtml(seo.ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(pageUrl)}" />
    <meta property="og:locale" content="${escapeHtml(locale.ogLocale)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${escapeHtml(seo.ogImage)}" />
    <meta name="theme-color" content="${escapeHtml(seo.themeColor ?? config.tokens.background)}" />
    <style>${styles(gate)}
    </style>${tracking.head}
  </head>
  <body>${tracking.noscript}
    <div class="stage">
      <div class="stage__page" aria-hidden="true">
        <div class="co-bar"><em>${escapeHtml(config.productName)}</em></div>
        <p class="co-ribbon">${escapeHtml(gate.backdrop.headline)}</p>
        <div class="co-grid">${replicaCards(config, gate)
          .map((card) => backdropCard(card, gate))
          .join("")}
        </div>
        <p class="co-note">${escapeHtml(gate.backdrop.reassurance)}</p>${backdropBand(config)}
        <div class="co-foot">
          <strong>${escapeHtml(config.footer.brandName)}</strong>
          ${escapeHtml(config.footer.tagline)}
        </div>
      </div>
      <div class="stage__veil"></div>
    </div>

    <div class="gate">
      <div class="gate__card" role="dialog" aria-modal="true" aria-labelledby="gate-title" aria-describedby="gate-text">
        <div class="gate__head">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <h1 class="gate__title" id="gate-title">${escapeHtml(gate.title)}</h1>
        </div>
        <div class="gate__body">
          <p class="gate__text" id="gate-text">${escapeHtml(gate.body)}</p>
          <a class="gate__cta" id="gate-cta" href="${escapeHtml(initialHref)}" rel="nofollow sponsored noopener">${escapeHtml(gate.ctaLabel)}</a>
          <!-- Link, não button: o link secundário tem a mesma ação do CTA, então
               precisa do mesmo comportamento sem JS (âncora navega sozinha). -->
          <a class="gate__close" id="gate-close" href="${escapeHtml(initialHref)}" rel="nofollow sponsored noopener">${escapeHtml(gate.closeLabel)}</a>
        </div>
      </div>
    </div>

    <script>${script(config, gate)}
    </script>
  </body>
</html>
`;
}
