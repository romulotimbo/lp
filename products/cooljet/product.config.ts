import type { CloneProductConfig } from "@/product/types";

/**
 * Produto CoolJet — Instância `clone`.
 * HTML sanitizado da PDP/checkout salva, cookie popup na raiz, hop clickrtrckr.
 *
 * Fonte visual: products/cooljet/Get CoolJet Now.html (dump, não servir).
 * Página publicada: products/cooljet/page/index.html.
 *
 * Deploy: cooljet.thebuylens.shop. Cópia IT em /it (hop 8XLSNQG).
 * Cópia UK em /uk (hop 8WXDBFZ). Cópia ES em /es (hop 8WZR76K).
 * Google Ads AW-18351905109 + conversionLabel.
 */
const HOP =
  "https://www.clickrtrckr.com/JF816B6/8WW1FPC/?__efq=1XzZiNTLF3AgCfINH2PTisIlTzd8oVcx";
const HOP_IT = "https://www.clickrtrckr.com/JF816B6/8XLSNQG/";
const HOP_UK =
  "https://www.clickrtrckr.com/JF816B6/8WXDBFZ/?creative_id=9155&uid=15838";
const HOP_ES =
  "https://www.clickrtrckr.com/JF816B6/8WZR76K/?creative_id=9157&uid=15843";
const DOMAIN = "https://cooljet.thebuylens.shop";

const cooljet: CloneProductConfig = {
  slug: "cooljet",
  productName: "CoolJet",
  domain: "cooljet.thebuylens.shop",
  layout: "clone",

  locale: {
    language: "en-US",
    ogLocale: "en_US",
    currency: "USD",
    affiliateDisclosure:
      "This page contains affiliate links. We may earn a commission when you make a purchase through the links on this page, at no additional cost to you.",
  },

  tokens: {
    background: "#FFFFFF",
    surface: "#F5F7FA",
    textPrimary: "#1A1A1A",
    textMuted: "#5A6570",
    accent: "#0173AD",
    accentDark: "#015A87",
  },

  seo: {
    title: "Get CoolJet Now",
    description:
      "CoolJet portable cooling for home — energy-efficient, 3 fan speeds, silent mode. 30-day money-back guarantee.",
    ogImage: `${DOMAIN}/assets/560x650-header-product.png`,
    url: `${DOMAIN}/`,
    themeColor: "#0173AD",
  },

  trackingTags: [
    {
      type: "google_ads",
      id: "AW-18351905109",
      conversionLabel: "AW-18351905109/zci5CMmw_d4cENWy765E",
    },
  ],

  clone: {
    htmlFile: "page/index.html",
    affiliateHref: HOP,
    extraPages: [
      {
        path: "it",
        htmlFile: "page/it/index.html",
        affiliateHref: HOP_IT,
        affiliateDisclosure:
          "Questa pagina contiene link di affiliazione. Potremmo guadagnare una commissione quando effettui un acquisto tramite i link in questa pagina, senza costi aggiuntivi per te.",
      },
      {
        path: "uk",
        htmlFile: "page/uk/index.html",
        affiliateHref: HOP_UK,
      },
      {
        path: "es",
        htmlFile: "page/es/index.html",
        affiliateHref: HOP_ES,
        affiliateDisclosure:
          "Esta página contiene enlaces de afiliados. Podemos ganar una comisión cuando realices una compra a través de los enlaces de esta página, sin coste adicional para ti.",
      },
    ],
  },
};

export default cooljet;
