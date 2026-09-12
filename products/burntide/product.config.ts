import type { ProductConfig } from "@/product/types";

/**
 * Produto #8 — Burntide (review-offer, en-US).
 * Review independente + link outbound para a loja oficial. Sem Pricing da Base,
 * sem Spokesperson.
 *
 * Copy calibrada para Google Ads (set 2026): identidade/afiliação no Hero,
 * destino burntide.us declarado, sem clickbait "scam/alert/fat burner",
 * claims de saúde só como citação datada da loja. Ver
 * docs/research/google-ads-circumventing-systems-thebuylens.md.
 *
 * Fatos reproduzidos dos funis oficiais burntide.us (v3, acessados 6 set 2026):
 * - Gummy, 30 gummies/frasco, rótulo "Weight Loss Support · Dietary Supplement"
 * - Blend 525 mg: Apple Cider Vinegar + BHB Salts (Calcium / Magnesium / Sodium
 *   β-hydroxybutyrate); 1 gummy/dia, ~30 min antes de uma refeição
 * - Sem cafeína / stimulant-free; non-GMO; gluten-free; made in USA
 * - Instalação FDA-registered, GMP-certified (texto deles — não aprovação FDA)
 * - Garantia 60 dias, pagamento único, venda só no site oficial
 * - Kits: 2 frascos $79/un → $158 + frete; 3 frascos $69/un → $207 + frete;
 *   6 frascos $49/un → $294 + frete grátis + 3 bônus digitais
 * - Papers citados na letter (ACV/BHB em geral, não trial do SKU): Kondo 2009
 *   PMID 19661687; Newman/Verdin 2017 PMID 28826372
 *
 * Copy desta Instância é original. Depoimentos nomeados da oficial (Henry C.,
 * Samuel H., Harper E.) não entram. Sem kit de 1 frasco — a loja não vende.
 *
 * Deploy: burntide.thebuylens.shop. Host antigo burntide.thebuylens.com
 * ainda responde no Traefik. Google Ads AW-18351905109 (gtag config /
 * page view). Sem conversionLabel: clique outbound da review-offer
 * não é checkout.
 */
const OFFER = "https://burntide.us/funnelb3/v3/?aff_id=31010";
const IMG = "/imagens/burntide";
const DOMAIN = "https://burntide.thebuylens.shop";

const outboundCta = {
  label: "Visit the official Burntide website",
  href: OFFER,
};

const burntide: ProductConfig = {
  slug: "burntide",
  productName: "Burntide",
  domain: "burntide.thebuylens.shop",
  layout: "review-offer",
  outboundCta,

  locale: {
    language: "en-US",
    ogLocale: "en_US",
    currency: "USD",
    affiliateDisclosure:
      "This is an independent review published by TheBuyLens — not the Burntide manufacturer. Buttons on this page open burntide.us. If you buy through those links, we may earn a commission at no extra cost to you. That does not change the price you pay.",
    categoryDisclaimers: [
      "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results vary. Consult your doctor before use, especially if you are pregnant, nursing, take medication, or have a medical condition. TheBuyLens does not provide medical advice.",
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
    title: "Burntide Gummies Review (2026): Ingredients, Packages, Official Store",
    description:
      "Independent TheBuyLens review of Burntide dietary-supplement gummies: what the official label lists, how the company describes the formula, a dated package snapshot, and a link to burntide.us. Affiliate disclosure on this page.",
    ogImage: `${DOMAIN}${IMG}/bottle-hero.png`,
    url: `${DOMAIN}/`,
    themeColor: "#06090B",
  },

  hero: {
    eyebrowLine1: "Independent review · TheBuyLens · 2026",
    hudTag: "",
    headlinePrefix: "Burntide gummies:",
    headlineHighlight: "what's on the official label",
    headlineSuffix: " — and what this page is.",
    body: "This page is a dated walkthrough of the Burntide dietary-supplement gummy sold on burntide.us. It is not the manufacturer's site and it is not medical advice. As of September 2026 the official store listed a once-daily gummy, a 525 mg apple cider vinegar and BHB blend, a 60-day refund window, and three multi-bottle packages. Buttons here open that official website so you can read today's terms yourself.",
    primaryCta: outboundCta,
    microcopy: "Opens burntide.us in a new tab · same page for visitors and crawlers · no overlay",
    chips: [
      { label: "Independent review", detail: "not the manufacturer" },
      { label: "Destination: burntide.us" },
      { label: "Dietary supplement", detail: "not a drug" },
    ],
    productImage: {
      src: `${IMG}/bottle-hero.png`,
      alt: "Burntide jar with three red gummies — 30-count dietary supplement labeled Weight Loss Support",
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
    title: "A once-daily gummy the company sells as a dietary supplement.",
    body: "Burntide is sold on burntide.us as a gummy dietary supplement. The jar published on their September 2026 letter is labeled Weight Loss Support, 30 gummies. The company lists a 525 mg blend of Apple Cider Vinegar and BHB salts, one gummy a day.\n\nTheir page contrasts that with stimulant products that use caffeine. That contrast is theirs, dated here as of September 2026. This review does not say the gummy causes weight loss, treats a condition, or replaces a clinician, a diet, or an exercise plan.\n\nThey say it is made in the USA in an FDA-registered, GMP-certified facility, and that it is non-GMO, gluten-free, and stimulant-free. \"FDA-registered facility\" is their wording for the manufacturing site. It is not FDA approval of Burntide as a drug or as a treatment.",
    figure: {
      src: `${IMG}/bottle-hero.png`,
      alt: "Burntide bottle shot published on the official September 2026 sales letter",
    },
  },

  formula: {
    eyebrow: "How they describe the formula",
    title: "Two ingredients. One 525 mg blend. That is the published stack.",
    lead: "The official letter names Apple Cider Vinegar and BHB salts — Calcium, Magnesium, and Sodium β-hydroxybutyrate — and stops there. This review does not add Green Tea, L-Carnitine, or Chromium. Those names are not on their formula page.",
    blendLabel: "Official blend · 525 mg · one gummy a day (company label)",
    items: [
      {
        name: "Apple Cider Vinegar",
        role: "The company calls this a traditional ingredient they put in a gummy so people will take it. Their letter discusses acetic acid in the context of everyday diet, not as a medicine. That is their framing, dated September 2026 — not a trial this review ran, and not a claim that the gummy treats a disease.",
      },
      {
        name: "BHB Salts",
        role: "The letter describes beta-hydroxybutyrate as a ketone body the body can make, and lists three mineral-bound forms: calcium, magnesium, and sodium BHB. They position it as a stimulant-free formula. Again: their copy, not a clinical result for this SKU.",
      },
    ],
    note: "The official page cites papers on vinegar and BHB as a class (including Kondo et al., 2009, PMID 19661687, and Newman & Verdin, 2017, PMID 28826372). Those are ingredient-level citations on their letter. They are not a clinical trial of the Burntide product.",
  },

  authenticity: {
    eyebrow: "Where it is sold",
    title: "The company says it sells only on burntide.us.",
    body: "This review looked at the official funnels: a labeled gummy, a published blend, a 60-day refund policy, and a US checkout. That is not the same as a clinical endorsement, and it is not a guarantee of results.\n\nThe official page warns that Burntide is sold only on burntide.us, and that bottles on Amazon, eBay, or similar marketplaces are not their product and do not carry their guarantee. That is their September 2026 position, repeated here — not a marketplace audit by TheBuyLens.\n\nIf you want the bottle they actually sell, the next step is their website. The buttons on this page open that site.",
    ctaLabel: "Open burntide.us",
    figure: {
      src: `${IMG}/label.jpg`,
      alt: "Burntide Supplement Facts label published on the official September 2026 letter",
    },
  },

  sideEffects: {
    eyebrow: "Safety language on their page",
    title: "Stimulant-free on their label. Ask a clinician if you are not a simple case.",
    body: "The official FAQ says the formula is made in an FDA-registered, GMP-certified US facility, non-GMO, and stimulant-free. They do not publish a side-effect trial, so this review will not invent one.\n\nTheir own precaution is the one that matters: if you are pregnant, nursing, taking medication, or managing a condition, show the bottle to your doctor before you start. A product review is not medical clearance.\n\nSuggested use on the letter: one gummy daily with a full glass of water, about 30 minutes before a morning or afternoon meal. Consistency is their instruction, not a results promise.",
  },

  prosCons: {
    eyebrow: "From the official page",
    title: "What the store states — and the limits it also states.",
    lead: "The points below are constraints the store itself publishes, not invented downsides.",
    pros: [
      "Published 525 mg blend: ACV + BHB salts, not a long unlisted stack — their contrast.",
      "Made in the USA in an FDA-registered, GMP-certified facility (company wording, September 2026 — not FDA product approval).",
      "Stimulant-free, non-GMO, gluten-free on their marks.",
      "60-day money-back guarantee and a one-time payment — they say there is no subscription.",
    ],
    cons: [
      "Sold only on the official website, per their FAQ — no retail shelf.",
      "Free US shipping is on the 6-bottle pack on the September 2026 checkout; 2- and 3-bottle orders add shipping.",
      "Sale totals move. A price printed here is a snapshot, not a contract — confirm the live store.",
    ],
  },

  offer: {
    eyebrow: "Packages on the official store",
    title: "Three kits recorded on 6 September 2026 — not a one-bottle starter.",
    lead: "These figures are a snapshot from the official checkout. They can change. The button opens burntide.us so you can see today's total and terms.",
    asOf: "6 September 2026",
    sourceLabel: "burntide.us official store (funnel recorded 6 September 2026)",
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
      "The official page recommends the 6-bottle pack for a longer supply window and the free-shipping / bonus bundle. This review is not inventing a 1-bottle kit — that SKU was not on their checkout on the date above. Individual results vary; this table is price information, not an outcome promise.",
    ctaLabel: "See current packages on burntide.us",
  },

  guarantee: {
    eyebrow: "Refund window they publish",
    title: "They describe a 60-day money-back policy — their terms, not ours.",
    body: "The official letter describes a 60-day, 100% money-back guarantee: if you are not satisfied, or you change your mind, contact them within 60 days and they refund the purchase — their language, September 2026.\n\nRead the refund policy on their site before you pay. TheBuyLens does not process refunds and does not sell the bottles.",
    note: "Bonuses on the 6-bottle pack are digital downloads they name The Vinegar Window, The Steady Embers, and The Companion Day. Instant access is their claim.",
    ctaLabel: "Read terms on burntide.us",
  },

  faq: {
    eyebrow: "Questions",
    title: "What the official page already answers",
    lead: "Dosing, exclusivity, and refund language are the company's. Prices here are dated. Buttons open burntide.us.",
    ctaLabel: "Open burntide.us",
    items: [
      {
        id: "what",
        question: "What is Burntide, exactly?",
        answer:
          "A once-daily gummy sold as a dietary supplement. The official letter names a 525 mg proprietary blend of apple cider vinegar and BHB salts. The jar shot they publish is 30 gummies. The label wording Weight Loss Support is theirs — this review does not treat that phrase as a proven result.",
      },
      {
        id: "who",
        question: "Who publishes this page?",
        answer:
          "TheBuyLens. This is an independent review with affiliate links to burntide.us. We are not the manufacturer, we do not process orders, and we do not provide medical advice.",
      },
      {
        id: "ingredients",
        question: "What is in it?",
        answer:
          "Apple cider vinegar plus calcium, magnesium, and sodium BHB, according to the September 2026 letter. This review does not list Green Tea, L-Carnitine, or Chromium — those are not their published ingredients.",
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
          "They say it is made in an FDA-registered, GMP-certified US facility and is stimulant-free and non-GMO. They also say: if you take medication or manage a condition, show a bottle to your doctor. Pregnant or nursing — same stop. This page cannot answer that question for you.",
      },
      {
        id: "subscription",
        question: "Is this a subscription?",
        answer:
          "The official FAQ says no: one-time payment, no hidden charges, no automatic re-bills. Confirm that on their checkout — this review is repeating their September 2026 copy.",
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
          "On 6 September 2026 the official store showed 2 bottles at $79 each ($158 + shipping), 3 at $69 ($207 + shipping), and 6 at $49 ($294, free US shipping, three digital bonuses). Those numbers age. Use the official website for the live total.",
      },
      {
        id: "guarantee",
        question: "What is the refund policy?",
        answer:
          "60 days, money-back, per their FAQ and letter. Contact their support inside that window. Shipping and handling details live on their refund page, not here.",
      },
    ],
  },

  trackingTags: [{ type: "google_ads", id: "AW-18351905109" }],

  footer: {
    brandName: "TheBuyLens · independent Burntide review",
    tagline: "Not the manufacturer · destination burntide.us",
    ctaLabel: "Visit burntide.us",
    microcopy: "Affiliate link to the official Burntide website",
  },

  stickyCta: {
    label: "Visit burntide.us",
  },
};

export default burntide;
