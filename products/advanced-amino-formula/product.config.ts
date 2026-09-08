import type { ProductConfig } from "@/product/types";
// Extensão explícita: este arquivo é carregado pelo Node (import dinâmico no
// vite.config.ts), não pelo resolver do Vite — ESM nativo exige a extensão.

/**
 * Produto #3 — Advanced Amino Formula (review completa, en-US).
 * Artigo + CTA outbound para a letter oficial Advanced Bionutritionals /
 * Digistore24. Sem Pricing, sem hop ClickBank, sem Página-popup.
 *
 * Copy calibrada para Google Ads (set 2026): identidade TheBuyLens no Hero,
 * destino advancedbionutritionals.com declarado, sem H1 de doença/resultado,
 * depoimentos rotulados como notas ilustrativas. Ver
 * docs/research/google-ads-circumventing-systems-thebuylens.md.
 *
 * Fatos reproduzidos da página oficial (Advanced Bionutritionals / Digistore24,
 * Muscle-Mass-Loss, agosto de 2026):
 * - Perda média de 30% da massa muscular até os 70 (posição da empresa)
 * - Oito aminoácidos essenciais listados no gráfico do fabricante
 * - Protein utilization 99% vs whey/BCAA no chart oficial; whey: 83% vira açúcar
 *   (claim da empresa); BCAA: só 3 dos 8 essenciais
 * - Fórmula apresentada como do Dr. Frank Shallenberger
 * - Suggested use no rótulo: 5 tablets daily; 30 min before activity
 * - Vegan / soy-free / dairy-free / gluten-free / non-GMO / made in USA
 * - Garantia 90 dias “down-to-the-last-pill” (posição da empresa)
 * - Reviews no site da empresa em agosto de 2026: 3.144, média 4.1, 81% recommend
 *
 * Copy de review e notas ilustrativas são originais. Fotos de "testimonial"
 * do fornecedor não são usadas como avatar.
 *
 * Deploy: advanced-amino.thebuylens.com. Google Ads AW-18351905109 (gtag
 * config / page view). Sem conversionLabel: clique outbound da review não é checkout.
 */
const OFFER =
  "https://www.advancedbionutritionals.com/DS24/Advanced-Amino/Muscle-Mass-Loss/HD.htm#aff=romulotsilva21c8";
const IMG = "/imagens/advanced-amino-formula";
const DOMAIN = "https://advanced-amino.thebuylens.com";

const outboundCta = {
  label: "Visit the official Advanced Bionutritionals page",
  href: OFFER,
};

const advancedAminoFormula: ProductConfig = {
  slug: "advanced-amino-formula",
  productName: "Advanced Amino Formula",
  domain: "advanced-amino.thebuylens.com",
  layout: "review",
  outboundCta,

  locale: {
    language: "en-US",
    ogLocale: "en_US",
    currency: "USD",
    affiliateDisclosure:
      "This is an independent review published by TheBuyLens — not Advanced Bionutritionals. Buttons on this page open the official Advanced Bionutritionals website. If you buy through those links, we may earn a commission at no extra cost to you. That does not change the price you pay.",
    categoryDisclaimers: [
      "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results vary. Consult your doctor before use, especially if you have a pre-existing condition or take medication. TheBuyLens does not provide medical advice.",
    ],
  },

  tokens: {
    background: "#F7F9FC",
    surface: "#FFFFFF",
    textPrimary: "#1B3A5C",
    textMuted: "#5A6A7A",
    accent: "#2E6BA6",
    accentDark: "#1E4F7A",
  },

  seo: {
    title: "Advanced Amino Formula Review (2026): Ingredients, Chart, Official Store",
    description:
      "Independent TheBuyLens review of Advanced Amino Formula: the eight essential amino acids the company lists, the utilization chart they publish, the 90-day refund terms, and a link to advancedbionutritionals.com. Affiliate disclosure on this page.",
    ogImage: `${DOMAIN}${IMG}/1-Unit.jpg`,
    url: `${DOMAIN}/`,
    themeColor: "#F7F9FC",
  },

  hero: {
    eyebrowLine1: "Independent review · TheBuyLens · 2026",
    hudTag: "",
    headlinePrefix: "Advanced Amino Formula:",
    headlineHighlight: "what's on the official page",
    headlineSuffix: " — and what this page is.",
    body: "This page is a dated walkthrough of the Advanced Amino Formula tablets sold by Advanced Bionutritionals. It is not the manufacturer's site and it is not medical advice. As of August 2026 their letter listed eight essential amino acids, a protein-utilization chart versus whey and BCAAs, and a 90-day empty-bottle refund. Buttons here open that official website so you can read today's terms yourself.",
    primaryCta: outboundCta,
    microcopy:
      "Opens advancedbionutritionals.com in a new tab · same page for visitors and crawlers · no overlay",
    chips: [
      { label: "Independent review", detail: "not the manufacturer" },
      { label: "Destination: Advanced Bionutritionals" },
      { label: "Dietary supplement", detail: "not a drug" },
    ],
    productImage: {
      src: `${IMG}/1-Unit.jpg`,
      alt: "Advanced Amino Formula — 150-tablet bottle from Advanced Bionutritionals",
    },
  },

  sections: [
    "pain",
    "trust",
    "research",
    "official-claims",
    "guarantee",
    "testimonials",
    "mid-cta",
    "verdict",
    "faq",
  ],

  pain: {
    eyebrow: "The company's framing",
    title: "Their letter starts with a muscle-mass number. This review starts there too.",
    body: "The official page cites a figure: the average person loses 30% of their muscle mass by 70. That number is theirs, dated on this review as of August 2026. This page repeats it because it is the problem they sell against — not because this review measured it, and not because tablets are being promised as a treatment.\n\nI had been using a whey scoop as the whole protein conversation. Recovery in my forties still felt slower than the work I was putting in. Their materials contrast whey with a complete essential-amino tablet. That contrast is theirs.\n\nI wanted to read the published eight-acid list in tablet form, not another flavored powder with three hero letters on the tub. What follows is that reading.",
    figure: {
      src: `${IMG}/man-running.webp`,
      alt: "Runner on an open road — the training context that started this review",
    },
  },

  trust: {
    eyebrow: "On the record",
    title: "What the company already puts in writing.",
    items: [
      {
        label: "90-day money-back",
        detail: "Down-to-the-last-pill terms on official orders — their policy.",
      },
      {
        label: "Made in the USA",
        detail: "Alongside vegan, soy-free, dairy-free, gluten-free, non-GMO marks.",
      },
      {
        label: "Eight essential amino acids",
        detail: "The published list — not a proprietary blend this review reverse-engineered.",
      },
      {
        label: "99% utilization claim",
        detail: "Their chart, dated on this review as of August 2026 — not a trial we ran.",
      },
    ],
  },

  research: {
    eyebrow: "What the letter publishes",
    title: "Eight acids, a utilization chart, and a whey comparison this review did not run.",
    body: "Advanced Amino Formula is sold by Advanced Bionutritionals as Dr. Frank Shallenberger's essential-amino formula in tablet form — 150 tablets to a bottle.\n\nTheir published chart compares how much of each source they say is used to build protein versus converted to sugars or fats: BCAAs at 1%, whey, soy, and nuts at 18%, meat at 32%, whole eggs at 48%, and this formula at 99%. On the same sales letter they argue that most of the protein in whey powder does not build muscle — they put the figure at 83% turned into sugar in the body. BCAA powders, they say, supply only three of the eight essential amino acids.\n\nThose numbers are the company's, not a trial this review ran. They are repeated here because they are the claims the official page actually makes. If that chart is why you are here, you should see it on their site, not only in these notes.",
    figure: {
      src: `${IMG}/amino-protein-chart.png`,
      alt: "Company protein utilization chart comparing BCAAs, whey, meat, eggs, and Advanced Amino Formula",
    },
  },

  officialClaims: {
    eyebrow: "Ingredients",
    title: "The eight essential amino acids they list — and what this review will not add.",
    body: "The official materials name eight essential amino acids: L-lysine, L-phenylalanine, L-isoleucine, L-methionine, L-threonine, L-leucine, L-valine, and L-tryptophan.\n\nThey also state a protein utilization of 99% — 99% used to make proteins, 1% wasted — and they contrast that with whey and BCAAs on the same chart. Suggested use on the bottle: five tablets daily, or thirty minutes before activity if you are using it around training.\n\nThe company marks the product vegan, soy-free, dairy-free, gluten-free, non-GMO, and made in the USA. Their letter also describes intended uses around training recovery, stamina, and appearance. That is their pitch. This review does not treat those lines as proven results and does not add a measurement we did not take.\n\nAs of August 2026, the company's site listed 3,144 reviews averaging 4.1 out of 5 (81% recommend). That count will age. It is dated on purpose. Those reviews are theirs, not ours.",
    figure: {
      src: `${IMG}/8-amino-acids.jpg`,
      alt: "Official graphic of the eight essential amino acids listed for Advanced Amino Formula",
    },
  },

  guarantee: {
    eyebrow: "Their terms",
    title: "They describe a 90-day, down-to-the-last-pill refund — their policy, not ours.",
    body: "Advanced Bionutritionals describes a 100% satisfaction, down-to-the-last-pill money-back guarantee on Advanced Amino Formula. Their letter says that if you are not satisfied for any reason, you return the empty bottles within 90 days for a full refund of what you paid, including shipping and handling. You only pay return shipping. No questions asked, in their wording.\n\nThis review repeats the company's position as of August 2026. TheBuyLens does not process refunds and does not sell the bottles. Read the terms on their site before you pay.",
    note: "This review does not quote a kit price. Packages and promotions move on their page.",
    ctaLabel: "Read terms on the official site",
  },

  midCta: {
    eyebrow: "Next step",
    title: "The eight-acid list, the chart, and current pricing live on their site.",
    body: "This review does not quote a dollar amount. Use the official link when you want the live packages next to the 90-day terms.",
    ctaLabel: "Open the official Advanced Bionutritionals page",
  },

  testimonials: {
    eyebrow: "Illustrative notes",
    title: "Composite notes written for this review — not verified customer reviews.",
    lead: "These are original composite notes for this page. They are not supplier quotes, not faces borrowed from the brand's photo set, and not verified buyer testimonials. Initials only.",
    hudTag: "",
    featuredTag: "",
    avatarAltPrefix: "Initials for",
    metadataAriaLabel: "Illustrative note",
    items: [
      {
        id: "elena",
        depId: "note-01",
        name: "Elena M.",
        role: "composite note · 50s",
        avatar: "",
        featured: true,
        text: "I gave it a full two months before I decided anything. That was my rule, not a company timeline.",
      },
      {
        id: "maria",
        depId: "note-02",
        name: "Maria S.",
        role: "composite note · 50s",
        avatar: "",
        text: "I switched off a daily whey shake because it sat heavy. Tablets are easier to keep consistent than another blender bottle.",
      },
      {
        id: "james",
        depId: "note-03",
        name: "James K.",
        role: "composite note · 40s",
        avatar: "",
        text: "I wanted the essential set without another tub of powder in the cabinet. I take them before morning training and leave the rest to the official label.",
      },
      {
        id: "linda",
        depId: "note-04",
        name: "Linda P.",
        role: "composite note · 50s",
        avatar: "",
        text: "I am not here to promise anyone a transformation. I wanted a simpler amino routine I could actually finish.",
      },
      {
        id: "david",
        depId: "note-05",
        name: "David R.",
        role: "composite note · 40s",
        avatar: "",
        text: "Eight acids on a graphic is easier to audit than a proprietary blend. I still read the bottle before I reordered.",
      },
    ],
  },

  verdict: {
    eyebrow: "Where this review lands",
    title: "If the eight-acid list, the chart, and the 90-day refund are why you came, read them at the source.",
    body: "This page is an independent TheBuyLens review, not a storefront and not the Advanced Bionutritionals site. We are not selling kits here and we are not quoting a price — those live on the official page, and they change.\n\nIf you want the eight essential amino acids, the utilization chart versus whey and BCAAs, and the down-to-the-last-pill guarantee in the company's own words, the buttons on this page open that site. We may earn a commission if you buy through them. That disclosure is also in the header and the footer.\n\nIf you have PKU, or you need a clinician to clear phenylalanine, stop here and talk to them first. A review link is not medical clearance.",
  },

  faq: {
    eyebrow: "Questions",
    title: "Company facts, plus the ones this review gets asked",
    lead: "Allergen and dosing answers are the company's position. Price questions send you to their site. Buttons open advancedbionutritionals.com.",
    ctaLabel: "Open the official site",
    items: [
      {
        id: "who",
        question: "Who publishes this page?",
        answer:
          "TheBuyLens. This is an independent review with affiliate links to the official Advanced Bionutritionals page. We are not the manufacturer, we do not process orders, and we do not provide medical advice.",
      },
      {
        id: "ingredients",
        question: "What does the company say is in it?",
        answer:
          "Advanced Bionutritionals lists eight essential amino acids: L-lysine, L-phenylalanine, L-isoleucine, L-methionine, L-threonine, L-leucine, L-valine, and L-tryptophan. That is their published list, not a blend this review reverse-engineered.",
      },
      {
        id: "vegan-allergens",
        question: "Is it vegan, and what about allergens?",
        answer:
          "The company's materials mark the formula vegan, soy-free, dairy-free, gluten-free, non-GMO, and made in the USA. They also state it does not contain gluten, wheat, corn, nuts, seeds, eggs, soy, dairy, GMOs, or preservatives. If you have a specific allergy, treat the official label as the source of truth — this review is repeating their icons, not issuing a certificate.",
      },
      {
        id: "histidine",
        question: "Why isn't histidine on the eight-acid graphic?",
        answer:
          "The official eight-acid graphic does not include histidine. Their FAQ argues the body can make histidine, and that levels rise after taking the formula. Some nutrition references still count histidine as essential for adults. This review is not inventing a third biochemistry. If you need a histidine-complete profile, read the official label and ask them before you buy.",
      },
      {
        id: "pku",
        question: "I have PKU — is phenylalanine a problem?",
        answer:
          "Yes, this is a stop sign. The official list includes L-phenylalanine. People with phenylketonuria need to limit phenylalanine. The company says anyone with PKU should only take amino acids under a doctor's supervision. Do not treat a review link as medical clearance.",
      },
      {
        id: "suggested-use",
        question: "How does the company say to take it?",
        answer:
          "The bottle copy reviewed here says: take five tablets daily as a dietary supplement. If using it as an exercise aid, take the tablets 30 minutes before physical activity, or follow a healthcare professional.",
      },
      {
        id: "timeline",
        question: "How long should I give it before judging?",
        answer:
          "That is a reviewer's habit, not a company promise: eight to twelve weeks of consistent use before you decide. Their guarantee window is 90 days. The official page does not owe you a personal timeline, and this review will not invent one as a typical result.",
      },
      {
        id: "price",
        question: "What does it cost compared with whey?",
        answer:
          "This review does not post a price. Kits and promotions live on the official site and they move. If you want the current packages next to a tub of whey, use the official link — that is the live page.",
      },
      {
        id: "guarantee",
        question: "What is the guarantee?",
        answer:
          "The company describes a 90-day, down-to-the-last-pill money-back guarantee. Empty bottles, full refund including shipping and handling; you pay return shipping. Terms sit on their checkout, not on this review.",
      },
    ],
  },

  trackingTags: [{ type: "google_ads", id: "AW-18351905109" }],

  footer: {
    brandName: "TheBuyLens · independent Advanced Amino Formula review",
    tagline: "Not the manufacturer · destination advancedbionutritionals.com",
    ctaLabel: "Visit the official site",
    microcopy: "Affiliate link to the official Advanced Bionutritionals page",
  },

  stickyCta: {
    label: "Visit the official site",
  },
};

export default advancedAminoFormula;
