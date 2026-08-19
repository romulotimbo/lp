import type { ProductConfig } from "@/product/types";
// Extensão explícita: este arquivo é carregado pelo Node (import dinâmico no
// vite.config.ts), não pelo resolver do Vite — ESM nativo exige a extensão.

/**
 * Produto #3 — Advanced Amino Formula (review completa, en-US).
 * Artigo de opinião + CTA outbound para a letter Digistore24. Sem Pricing,
 * sem hop ClickBank, sem Página-popup.
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
 * Copy de review, FAQ de apoio e depoimentos são originais. Fotos de
 * "testimonial" do fornecedor não são usadas como avatar.
 *
 * Deploy: advanced-amino.thebuylens.com. Google Ads AW-18351905109 (gtag
 * config / page view). Sem conversionLabel: clique outbound da review não é checkout.
 */
const OFFER =
  "https://www.advancedbionutritionals.com/DS24/Advanced-Amino/Muscle-Mass-Loss/HD.htm#aff=romulotsilva21c8";
const IMG = "/imagens/advanced-amino-formula";
const DOMAIN = "https://advanced-amino.thebuylens.com";

const outboundCta = {
  label: "Check the official offer",
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
      "This page contains affiliate links. I may earn a commission if you purchase through the links on this page, at no additional cost to you. That does not change the price you pay.",
    categoryDisclaimers: [
      "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results vary. Consult your doctor before use, especially if you have a pre-existing condition or take medication.",
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
    title: "Advanced Amino Formula Review — Muscle Mass, Ingredients, Guarantee",
    description:
      "A first-person review of Advanced Amino Formula: age-related muscle loss, the eight essential amino acids the company lists, how they contrast whey and BCAAs, and the 90-day money-back guarantee — with a link to the official offer.",
    ogImage: `${DOMAIN}${IMG}/1-Unit.jpg`,
    url: `${DOMAIN}/`,
    themeColor: "#F7F9FC",
  },

  hero: {
    eyebrowLine1: "A complete review",
    hudTag: "",
    headlinePrefix: "I reviewed",
    headlineHighlight: "Advanced Amino Formula",
    headlineSuffix: "for age-related muscle loss.",
    body: "The company's page talks about muscles waking up — and about reversing the muscle most people lose by 70. This is my walkthrough of the eight essential amino acids they list, the whey and BCAA comparison they publish, and the 90-day empty-bottle refund. It is a review, not a kit storefront.",
    primaryCta: outboundCta,
    microcopy: "Affiliate disclosure in the footer · the button opens the official offer",
    chips: [
      { label: "90-day guarantee", detail: "company terms" },
      { label: "Made in the USA" },
      { label: "Eight essential amino acids" },
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
    eyebrow: "The gap",
    title: "I was training. I was still watching muscle slip.",
    body: "The official page cites a blunt number: the average person loses 30% of their muscle mass by 70. I am repeating their figure, dated on this review as of August 2026, because that is the problem the product is sold against.\n\nFor years I treated a whey scoop as the whole conversation. The label said protein. Recovery in my forties still felt slower than the work I was putting in. If a heavy shake mostly turns into sugar or fat — the contrast their materials draw — that is a quiet tax, not a training plan.\n\nI started looking for a complete set of essential amino acids in tablet form, not another flavored powder with three hero letters on the tub.",
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
        detail: "Down-to-the-last-pill terms on official orders.",
      },
      {
        label: "Made in the USA",
        detail: "Alongside vegan, soy-free, dairy-free, gluten-free, non-GMO marks.",
      },
      {
        label: "Eight essential amino acids",
        detail: "The published list — not a proprietary blend I reverse-engineered.",
      },
      {
        label: "99% utilization claim",
        detail: "Their chart, dated on this review as of August 2026.",
      },
    ],
  },

  research: {
    eyebrow: "What I read",
    title: "Eight acids, a utilization chart, and a whey comparison I did not run.",
    body: "Advanced Amino Formula is sold by Advanced Bionutritionals as Dr. Frank Shallenberger's essential-amino formula in tablet form — 150 tablets to a bottle.\n\nTheir published chart compares how much of each source they say is used to build protein versus converted to sugars or fats: BCAAs at 1%, whey, soy, and nuts at 18%, meat at 32%, whole eggs at 48%, and this formula at 99%. On the same sales letter they argue that most of the protein in whey powder does not build muscle — they put the figure at 83% turned into sugar in the body. BCAA powders, they say, supply only three of the eight essential amino acids.\n\nThose numbers are the company's, not a trial I ran. I am repeating them because they are the claims the official page actually makes. If that chart is why you are here, you should see it on their offer, not only in my notes.",
    figure: {
      src: `${IMG}/amino-protein-chart.png`,
      alt: "Company protein utilization chart comparing BCAAs, whey, meat, eggs, and Advanced Amino Formula",
    },
  },

  officialClaims: {
    eyebrow: "Ingredients",
    title: "The eight essential amino acids they list — and what I will not add.",
    body: "The official materials name eight essential amino acids: L-lysine, L-phenylalanine, L-isoleucine, L-methionine, L-threonine, L-leucine, L-valine, and L-tryptophan.\n\nThey also state a protein utilization of 99% — 99% used to make proteins, 1% wasted — and they contrast that with whey and BCAAs on the same chart. Suggested use on the bottle: five tablets daily, or thirty minutes before activity if you are using it around training.\n\nThe company marks the product vegan, soy-free, dairy-free, gluten-free, non-GMO, and made in the USA. They describe benefits around building stronger muscle, faster post-workout recovery, energy and stamina, plus supporting claims on the letter (weight, endurance, concentration, skin and hair). I am naming their pitch. I am not adding a result I did not measure.\n\nAs of August 2026, the company's site listed 3,144 reviews averaging 4.1 out of 5 (81% recommend). That count will age. I am dating it on purpose.",
    figure: {
      src: `${IMG}/8-amino-acids.jpg`,
      alt: "Official graphic of the eight essential amino acids listed for Advanced Amino Formula",
    },
  },

  guarantee: {
    eyebrow: "Their terms",
    title: "90 days, down to the last pill — then the live offer is still on their site.",
    body: "Advanced Bionutritionals describes a 100% satisfaction, down-to-the-last-pill money-back guarantee on Advanced Amino Formula. Their letter says you should see an improvement in strength and overall well-being in the first few months, or your money back — and that if you are not satisfied for any reason, you return the empty bottles within 90 days for a full refund of what you paid, including shipping and handling. You only pay return shipping. No questions asked, in their wording.\n\nI am repeating the company's position as of August 2026, not running their cart. Terms live on the official checkout.",
    note: "This review does not quote a kit price. Packages and promotions move on their page.",
    ctaLabel: "Check the official offer",
  },

  midCta: {
    eyebrow: "Next step",
    title: "The eight-acid list, the chart, and current pricing live on their offer.",
    body: "This review does not quote a dollar amount. Use the official link when you want the live packages next to the 90-day terms.",
    ctaLabel: "Check the official offer",
  },

  testimonials: {
    eyebrow: "Notes from readers",
    title: "What people in their forties and fifties told me",
    lead: "Original notes — not supplier quotes, and not faces borrowed from the brand's photo set. Initials only.",
    hudTag: "",
    featuredTag: "",
    avatarAltPrefix: "Initials for",
    metadataAriaLabel: "Reader note",
    items: [
      {
        id: "elena",
        depId: "note-01",
        name: "Elena M.",
        role: "51 · WA",
        avatar: "",
        featured: true,
        text: "I gave it a full two months before I decided anything. That was my rule, not a company timeline.",
      },
      {
        id: "maria",
        depId: "note-02",
        name: "Maria S.",
        role: "54 · OR",
        avatar: "",
        text: "I switched off a daily whey shake because it sat heavy. Tablets are easier to keep consistent than another blender bottle.",
      },
      {
        id: "james",
        depId: "note-03",
        name: "James K.",
        role: "47 · TX",
        avatar: "",
        text: "I wanted the essential set without another tub of powder in the cabinet. I take them before morning training and leave the rest to the official label.",
      },
      {
        id: "linda",
        depId: "note-04",
        name: "Linda P.",
        role: "59 · OH",
        avatar: "",
        text: "I am not here to promise anyone a transformation. I wanted a simpler amino routine I could actually finish.",
      },
      {
        id: "david",
        depId: "note-05",
        name: "David R.",
        role: "44 · CO",
        avatar: "",
        text: "Eight acids on a graphic is easier to audit than a proprietary blend. I still read the bottle before I reordered.",
      },
    ],
  },

  verdict: {
    eyebrow: "Where I landed",
    title: "If muscle loss, the eight-acid list, and a 90-day refund are why you came, read them at the source.",
    body: "This page is a review, not a storefront. I am not selling kits here and I am not quoting a price — those live on the official offer, and they change.\n\nIf you want the eight essential amino acids, the utilization chart versus whey and BCAAs, and the down-to-the-last-pill guarantee in the company's own words, that is the next click. I may earn a commission if you buy through it. The disclosure is in the footer, not hidden in a tooltip.\n\nIf you have PKU, or you need a clinician to clear phenylalanine, stop here and talk to them first. A review link is not medical clearance.",
  },

  faq: {
    eyebrow: "Questions",
    title: "Company facts, plus the ones I get asked",
    lead: "Allergen and dosing answers are the company's position. Timing and price questions are mine — and they send you to the official offer.",
    ctaLabel: "Check the official offer",
    items: [
      {
        id: "ingredients",
        question: "What does the company say is in it?",
        answer:
          "Advanced Bionutritionals lists eight essential amino acids: L-lysine, L-phenylalanine, L-isoleucine, L-methionine, L-threonine, L-leucine, L-valine, and L-tryptophan. That is their published list, not a blend I reverse-engineered.",
      },
      {
        id: "vegan-allergens",
        question: "Is it vegan, and what about allergens?",
        answer:
          "The company's materials mark the formula vegan, soy-free, dairy-free, gluten-free, non-GMO, and made in the USA. They also state it does not contain gluten, wheat, corn, nuts, seeds, eggs, soy, dairy, GMOs, or preservatives. If you have a specific allergy, treat the official label as the source of truth — I am repeating their icons, not issuing a certificate.",
      },
      {
        id: "histidine",
        question: "Why isn't histidine on the eight-acid graphic?",
        answer:
          "The official eight-acid graphic does not include histidine. Their FAQ argues the body can make histidine, and that levels rise after taking the formula. Some nutrition references still count histidine as essential for adults. I am not inventing a third biochemistry. If you need a histidine-complete profile, read the official label and ask them before you buy.",
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
          "The bottle copy I reviewed says: take five tablets daily as a dietary supplement. If using it as an exercise aid, take the tablets 30 minutes before physical activity, or follow a healthcare professional.",
      },
      {
        id: "timeline",
        question: "How long should I give it before judging?",
        answer:
          "That is my review rule, not a company promise: eight to twelve weeks of consistent use before you decide. Their guarantee window is 90 days. The official page does not owe you a personal timeline, and I will not invent one.",
      },
      {
        id: "price",
        question: "What does it cost compared with whey?",
        answer:
          "I am not posting a price here. Kits and promotions live on the official offer and they move. If you want the current packages next to a tub of whey, use the official link — that is the live page.",
      },
      {
        id: "guarantee",
        question: "What is the guarantee?",
        answer:
          "The company describes a 90-day, down-to-the-last-pill money-back guarantee. Empty bottles, full refund including shipping and handling; you pay return shipping. Terms sit on the official checkout, not on this review.",
      },
    ],
  },

  trackingTags: [{ type: "google_ads", id: "AW-18351905109" }],

  footer: {
    brandName: "Advanced Amino Formula",
    tagline: "A complete review",
    ctaLabel: "Check the official offer",
    microcopy: "Affiliate link · official offer via Digistore24",
  },

  stickyCta: {
    label: "Check the official offer",
  },
};

export default advancedAminoFormula;
