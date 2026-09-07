import type { ProductConfig } from "@/product/types";

/**
 * Produto #8 — Burntide (review-offer, en-US).
 * Advertorial de busca + hop Direct-to-Cart. Sem Pricing da Base, sem Spokesperson.
 *
 * Fatos reproduzidos dos funis oficiais burntide.us (v3 letter + checkout,
 * acessados 6 set 2026):
 * - Gummy, 30 gummies/frasco, rótulo "Weight Loss Support · Dietary Supplement"
 * - Blend 525 mg: Apple Cider Vinegar + BHB Salts (Calcium / Magnesium / Sodium
 *   β-hydroxybutyrate); 1 gummy/dia, ~30 min antes de uma refeição
 * - Sem cafeína / stimulant-free; non-GMO; gluten-free; made in USA
 * - Instalação FDA-registered, GMP-certified (texto deles — não "FDA-compliant")
 * - Garantia 60 dias, pagamento único, venda só no site oficial
 * - Kits v4: 2 frascos $79/un → $158 + frete; 3 frascos $69/un → $207 + frete;
 *   6 frascos $49/un → $294 + frete grátis + 3 bônus digitais
 * - Papers citados na letter (ACV/BHB em geral, não trial do SKU): Kondo 2009
 *   PMID 19661687; Newman/Verdin 2017 PMID 28826372
 *
 * Copy desta Instância é original. Depoimentos nomeados da oficial (Henry C.,
 * Samuel H., Harper E.) não entram. Sem kit de 1 frasco — a loja não vende.
 *
 * Deploy: burntide.thebuylens.com. trackingTags vazio até Pixel/Ads.
 */
const OFFER = "https://burntide.us/funnelb3/v3/?aff_id=31010";
const IMG = "/imagens/burntide";
const DOMAIN = "https://burntide.thebuylens.com";

const outboundCta = {
  label: "Claim the official BurnTide offer",
  href: OFFER,
};

const burntide: ProductConfig = {
  slug: "burntide",
  productName: "Burntide",
  domain: "burntide.thebuylens.com",
  layout: "review-offer",
  outboundCta,

  locale: {
    language: "en-US",
    ogLocale: "en_US",
    currency: "USD",
    affiliateDisclosure:
      "This page contains affiliate links. I may earn a commission if you purchase through the links on this page, at no additional cost to you. That does not change the price you pay.",
    categoryDisclaimers: [
      "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results vary. Consult your doctor before use, especially if you are pregnant, nursing, take medication, or have a medical condition.",
    ],
  },

  tokens: {
    background: "#06090B",
    surface: "#10181C",
    textPrimary: "#F3F7F5",
    textMuted: "#9BB0AA",
    accent: "#E4C44A",
    accentDark: "#B8921C",
  },

  seo: {
    title: "BurnTide Reviews: Is It a Legit Fat Burner or a Cheap Scam? (2026)",
    description:
      "A dated look at Burntide gummies: the ACV + BHB formula on the official label, side-effect precautions, counterfeit warnings, and current official packages — with a link to the live store.",
    ogImage: `${DOMAIN}${IMG}/bottle-hero.png`,
    url: `${DOMAIN}/`,
    themeColor: "#06090B",
  },

  hero: {
    eyebrowLine1: "BurnTide reviews · 2026",
    hudTag: "",
    headlinePrefix: "BurnTide reviews:",
    headlineHighlight: "legit fat burner or a cheap scam?",
    headlineSuffix: " A 2026 alert.",
    body: "Don't buy BurnTide until you read what the official store actually sells: a once-daily gummy, a 525 mg ACV + BHB blend, a 60-day refund window, and three kits — not a mystery capsule list. This page is that walkthrough, with a hop to the manufacturer checkout.",
    primaryCta: outboundCta,
    microcopy: "Affiliate disclosure in the footer · the button opens the official checkout",
    chips: [
      { label: "60-day money-back", detail: "company terms" },
      { label: "FDA-registered facility", detail: "their wording" },
      { label: "GMP-certified" },
    ],
    productImage: {
      src: `${IMG}/bottle-hero.png`,
      alt: "Burntide jar with three red gummies — 30-count Weight Loss Support dietary supplement",
    },
  },

  sections: [
    "what-is",
    "formula",
    "authenticity",
    "side-effects",
    "pros-cons",
    "offer",
    "guarantee",
    "faq",
  ],

  whatIs: {
    eyebrow: "What it is",
    title: "A once-daily gummy sold as metabolism support — not a stimulant stack.",
    body: "Burntide is sold on burntide.us as a dual-action metabolism-support gummy: Apple Cider Vinegar plus BHB salts in one 525 mg blend. One gummy a day. The jar I pulled from their September 2026 letter is labeled Weight Loss Support, 30 gummies, dietary supplement.\n\nThe official page contrasts that with typical fat burners that lean on caffeine. Their pitch is cellular energy and fat oxidation without jitters — their words, dated on this review as of September 2026.\n\nThey say it is made in the USA in an FDA-registered, GMP-certified facility, non-GMO, gluten-free, and stimulant-free. This article is how I walked that letter and the Direct-to-Cart checkout behind it. It is not a promise that a gummy replaces a doctor visit or a calorie plan.",
    figure: {
      src: `${IMG}/bottle-hero.png`,
      alt: "Official Burntide bottle shot from the September 2026 sales letter",
    },
  },

  formula: {
    eyebrow: "How they say it works",
    title: "Two ingredients. One 525 mg blend. That is the whole stack.",
    lead: "The official letter names Apple Cider Vinegar and BHB salts — Calcium, Magnesium, and Sodium β-hydroxybutyrate — and stops there. I am not adding Green Tea, L-Carnitine, or Chromium. Those are not on their formula page.",
    blendLabel: "Official blend · 525 mg · one gummy a day",
    items: [
      {
        name: "Apple Cider Vinegar",
        role: "The company calls this the traditional metabolic activator. Their letter says the acetic acid in ACV may support healthy fat metabolism, blood sugar already in a normal range, and fullness between meals. They put a dose in a gummy so people actually take it — their framing, not a trial I ran.",
      },
      {
        name: "BHB Salts",
        role: "Beta-hydroxybutyrate is the ketone body the letter says your system makes in fat-burning states. Burntide lists three mineral-bound forms: calcium, magnesium, and sodium BHB, positioned as clean cellular fuel without the crash of a stimulant product.",
      },
    ],
    note: "The official page cites papers on vinegar and BHB as a class (including Kondo et al., 2009, PMID 19661687, and Newman & Verdin, 2017, PMID 28826372). Those are ingredient-level citations on their letter. They are not a clinical trial of the Burntide SKU, and I will not write them as one.",
  },

  authenticity: {
    eyebrow: "Is BurnTide a scam?",
    title: "The short answer is no — but knockoffs are the real complaint.",
    body: "I did not find a fake-company tell on the official funnels: there is a labeled gummy, a published blend, a 60-day refund, and a US checkout. Calling the product a scam because ads are loud is not the same as finding an empty legal entity.\n\nWhat the official page does warn about is third-party listings. They say Burntide is sold only on burntide.us, and that bottles on Amazon, eBay, or similar marketplaces are not their product and do not carry their guarantee. I am repeating their September 2026 position, not running a marketplace audit.\n\nIf you want the formula they actually bottle, the next click is their checkout — not a third-party listing with a similar label.",
    ctaLabel: "Avoid counterfeits — open the official store",
    figure: {
      src: `${IMG}/label.jpg`,
      alt: "Burntide Supplement Facts label published on the official September 2026 letter",
    },
  },

  sideEffects: {
    eyebrow: "Side effects",
    title: "Stimulant-free on their label. Still ask a clinician if you are not a simple case.",
    body: "The official FAQ says the formula is made in an FDA-registered, GMP-certified US facility, non-GMO, and stimulant-free — no caffeine, no jitters in their framing. They do not publish a side-effect trial or a \"thousands of customers, no major events\" study, so I will not invent one.\n\nTheir own precaution is the one that matters: if you are pregnant, nursing, taking medication, or managing a condition, show the bottle to your doctor before you start. A review hop is not medical clearance.\n\nSuggested use on the letter: one gummy daily with a full glass of water, about 30 minutes before a morning or afternoon meal. Same time every day is their consistency pitch.",
  },

  prosCons: {
    eyebrow: "Plain ledger",
    title: "What holds up on the official page — and what does not.",
    lead: "The cons below are constraints the store itself states, not invented downsides to look balanced.",
    pros: [
      "Focused 525 mg blend: ACV + BHB salts, not a fifteen-extract dusting — their contrast.",
      "Made in the USA in an FDA-registered, GMP-certified facility (company wording, September 2026).",
      "Stimulant-free, non-GMO, gluten-free on their marks.",
      "60-day money-back guarantee and a one-time payment — they say there is no subscription.",
    ],
    cons: [
      "Sold only on the official website, per their FAQ — no retail shelf.",
      "Free US shipping is on the 6-bottle pack on the September 2026 checkout; 2- and 3-bottle orders add shipping.",
      "Sale totals move. A price printed here is a snapshot, not a contract — confirm the live checkout.",
    ],
  },

  offer: {
    eyebrow: "Official packages",
    title: "Three kits on the live checkout — not a one-bottle starter.",
    lead: "These are the official packages I recorded on 6 September 2026. The table is a snapshot. The button opens the same checkout so you can see today's total.",
    asOf: "6 September 2026",
    sourceLabel: "burntide.us/funnelb3/v3 official checkout",
    packages: [
      {
        id: "basic-2",
        name: "Basic",
        bottles: 2,
        supplyLabel: "60-day supply",
        pricePerBottle: "$79",
        compareAtTotal: "$298",
        total: "$158",
        shipping: "+ shipping",
        badges: ["60-day guarantee"],
      },
      {
        id: "best-6",
        name: "Best value",
        bottles: 6,
        supplyLabel: "180-day supply",
        pricePerBottle: "$49",
        compareAtTotal: "$894",
        total: "$294",
        shipping: "free US shipping",
        badges: ["3 digital bonuses", "60-day guarantee"],
        featured: true,
      },
      {
        id: "bundle-3",
        name: "Bundle",
        bottles: 3,
        supplyLabel: "90-day supply",
        pricePerBottle: "$69",
        compareAtTotal: "$447",
        total: "$207",
        shipping: "+ shipping",
        badges: ["60-day guarantee"],
      },
    ],
    advice:
      "Weight change is slow. The official page pushes the 6-bottle pack for a longer window and the free-shipping / bonus bundle. I am not inventing a 1-bottle $69 kit — that SKU is not on their checkout.",
    ctaLabel: "See the live official packages",
  },

  guarantee: {
    eyebrow: "60-day window",
    title: "They will refund the order if you are not thrilled — their terms.",
    body: "The official letter calls it an iron-clad 60-day, 100% money-back guarantee: if you are not thrilled with how your body feels, or you simply change your mind, contact them within 60 days and they refund the purchase. No hoops, no questions asked — their language, September 2026.\n\nI am not adding an empty-bottle clause they did not print. Read the refund policy on the checkout before you pay.",
    note: "Bonuses on the 6-bottle pack are digital downloads they price as The Vinegar Window, The Steady Embers, and The Companion Day. Instant access is their claim.",
    ctaLabel: "Order on the official checkout",
  },

  faq: {
    eyebrow: "Questions",
    title: "What the official page already answers",
    lead: "Dosing, exclusivity, and refund language are theirs. Price questions send you to the live checkout — totals here are dated.",
    ctaLabel: "Open the official checkout",
    items: [
      {
        id: "what",
        question: "What is Burntide, exactly?",
        answer:
          "A once-daily gummy sold as metabolism / weight-loss support. The official letter names a 525 mg proprietary blend of apple cider vinegar and BHB salts. The jar shot they publish is 30 gummies.",
      },
      {
        id: "ingredients",
        question: "What is in it?",
        answer:
          "Apple cider vinegar plus calcium, magnesium, and sodium BHB. That is the dual-action stack on the September 2026 letter. I am not listing Green Tea, L-Carnitine, or Chromium — those are not their published ingredients.",
      },
      {
        id: "use",
        question: "How do they say to take it?",
        answer:
          "One gummy daily with a full glass of water, about 30 minutes before a morning or afternoon meal. No loading phase on their instructions.",
      },
      {
        id: "safe",
        question: "Is it safe?",
        answer:
          "They say it is made in an FDA-registered, GMP-certified US facility and is stimulant-free and non-GMO. They also say: if you take medication or manage a condition, show a bottle to your doctor. Pregnant or nursing — same stop.",
      },
      {
        id: "subscription",
        question: "Is this a subscription?",
        answer:
          "The official FAQ says no: one-time payment, no hidden charges, no automatic re-bills. Confirm that checkbox on checkout — I am repeating their September 2026 copy.",
      },
      {
        id: "where",
        question: "Can I buy it on Amazon?",
        answer:
          "They say no. Burntide is sold only on burntide.us. Marketplace bottles, they warn, are not their product and do not carry the 60-day guarantee.",
      },
      {
        id: "price",
        question: "What does it cost?",
        answer:
          "On 6 September 2026 the official checkout showed 2 bottles at $79 each ($158 + shipping), 3 at $69 ($207 + shipping), and 6 at $49 ($294, free US shipping, three digital bonuses). Those numbers age. Use the official button for the live total.",
      },
      {
        id: "guarantee",
        question: "What is the refund policy?",
        answer:
          "60 days, 100% money-back, no questions asked — their FAQ and letter. Contact support inside that window. Shipping and handling details live on their refund page, not here.",
      },
    ],
  },

  trackingTags: [],

  footer: {
    brandName: "BurnTide — a dated review",
    tagline: "Official checkout via burntide.us",
    ctaLabel: "Claim the official offer",
    microcopy: "Affiliate link · funnel v3 · aff_id=31010",
  },

  stickyCta: {
    label: "Official BurnTide offer",
  },
};

export default burntide;
