import type { CloneProductConfig } from "@/product/types";

/**
 * Produto Pawlax — Instância `clone`.
 * HTML sanitizado da PDP/checkout salva, cookie popup na raiz, hop clickrtrckr.
 *
 * Fonte visual: products/pawlax/Get Pawlax Now!.html (dump, não servir).
 * Página publicada: products/pawlax/page/index.html.
 *
 * Deploy: pawlax.thebuylens.shop. Google Ads AW-18405296029 + conversion Compra.
 */
const HOP =
  "https://www.clickrtrckr.com/JF816B6/92HCXFN/?__efq=9AHZHiJrzZfjA5wUzYqt9AQ0GOzhEzubez7qKC7Uef8";
const DOMAIN = "https://pawlax.thebuylens.shop";

const pawlax: CloneProductConfig = {
  slug: "pawlax",
  productName: "Pawlax",
  domain: "pawlax.thebuylens.shop",
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
    accent: "#0D40FF",
    accentDark: "#0A32C7",
  },

  seo: {
    title: "Get Pawlax Now",
    description:
      "Pawlax cooling mat for pets — instant cooling fabric, waterproof base, 70×70 cm Ocean Blue. 30-day money-back guarantee.",
    ogImage: `${DOMAIN}/assets/product1-1.png`,
    url: `${DOMAIN}/`,
    themeColor: "#0D40FF",
  },

  trackingTags: [
    {
      type: "google_ads",
      id: "AW-18405296029",
      conversionLabel: "AW-18405296029/L-OtCI7xw-YcEJ2PqshE",
      conversionValue: 1.0,
      conversionCurrency: "BRL",
    },
  ],

  clone: {
    htmlFile: "page/index.html",
    affiliateHref: HOP,
  },
};

export default pawlax;
