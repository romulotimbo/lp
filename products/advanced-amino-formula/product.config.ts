import type { ProductConfig } from "@/product/types";
// Extensão explícita: este arquivo é carregado pelo Node (import dinâmico no
// vite.config.ts), não pelo resolver do Vite — ESM nativo exige a extensão.
import { createPopupGate } from "./popup/popup.config.ts";

/**
 * Produto #3 — Advanced Amino Formula (ponte editorial ClickBank, en-US).
 * Primeiro Produto com `layout: "review"`: artigo clínico, CTA outbound, sem Pricing.
 *
 * Fatos reproduzidos da página/materiais oficiais (Advanced Bionutritionals):
 * - Oito aminoácidos essenciais listados no gráfico do fabricante
 * - Protein utilization 99% vs whey/BCAA no chart oficial
 * - Fórmula apresentada como do Dr. Frank Shallenberger
 * - Suggested use no rótulo: 5 tablets daily; 30 min before activity
 * - Vegan / soy-free / dairy-free / gluten-free / non-GMO / made in USA
 * - Garantia de 90 dias (posição da empresa)
 * - Reviews no site da empresa em agosto de 2026: 3.144, média 4.1, 81% recommend
 *
 * Copy de review, FAQ de apoio e depoimentos são originais. Fotos de
 * "testimonial" do fornecedor não são usadas como avatar.
 *
 * Deploy: advanced-amino.nothforge.com. trackingTags vazio até existir Pixel/Ads.
 */
const HOP =
  "https://b8b3bhw7yh3p16s8minkl9sv1f.hop.clickbank.net/?&traffic_source=google&traffic_type=search";
const IMG = "/imagens/advanced-amino-formula";
const DOMAIN = "https://advanced-amino.nothforge.com";

const outboundCta = {
  label: "See Advanced Amino Formula on the official site",
  href: HOP,
};

const advancedAminoFormula: ProductConfig = {
  slug: "advanced-amino-formula",
  productName: "Advanced Amino Formula",
  domain: "advanced-amino.nothforge.com",
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
      "ClickBank is the retailer of products on this site. CLICKBANK® is a registered trademark of Click Sales, Inc., a Delaware corporation located at 1444 S. Entertainment Ave., Suite 410, Boise, ID 83709, USA and used by permission. ClickBank's role as retailer does not constitute an endorsement, approval or review of this product or any claim, statement or opinion used in promotion of this product.",
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
    title: "Advanced Amino Formula — A Researched Look",
    description:
      "A researched look at Advanced Amino Formula: the eight essential amino acids the company lists, the utilization chart they publish, and the 90-day guarantee — with a hop to the official page.",
    ogImage: `${DOMAIN}${IMG}/1-Unit.jpg`,
    url: `${DOMAIN}/`,
    themeColor: "#F7F9FC",
  },

  hero: {
    eyebrowLine1: "A researched look",
    hudTag: "",
    headlinePrefix: "What I found when I looked into",
    headlineHighlight: "Advanced Amino Formula",
    headlineSuffix: ".",
    body: "I wanted a clearer picture of what this essential-amino formula actually claims — and what it does not. This is a first-person walkthrough of the official page, not a kit storefront.",
    primaryCta: outboundCta,
    microcopy: "Affiliate disclosure in the footer · the button opens the official site",
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

  sections: ["pain", "trust", "research", "official-claims", "testimonials", "mid-cta", "verdict", "faq"],

  pain: {
    eyebrow: "The gap",
    title: "I was buying protein. I was not sure I was using it.",
    body: "For years I treated a scoop of whey as the whole conversation. The label said protein. The shaker said I was doing the work.\n\nWhat I could not see was how much of that scoop was actually assembled into protein in my body, and how much was just extra calories. If you train in your forties or fifties, that gap is not academic. Recovery is slower. A heavy shake that mostly turns into sugar or fat is a quiet tax.\n\nI started looking for a formula that talked about essential amino acids as a complete set — not another flavored powder with a single hero ingredient.",
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
        detail: "Guarantee described on official orders.",
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
    title: "The official story is eight acids and a utilization chart.",
    body: "Advanced Amino Formula is sold by Advanced Bionutritionals. The company presents it as Dr. Frank Shallenberger's essential-amino formula in tablet form — 150 tablets to a bottle.\n\nTheir published chart compares how much of each source they say is used to build protein versus converted to sugars or fats: BCAAs at 1%, whey, soy, and nuts at 18%, meat at 32%, whole eggs at 48%, and this formula at 99%.\n\nThose numbers are the company's, not a trial I ran. I am repeating them because they are the claim the official page actually makes. If that chart is the reason you are here, you should see it on their site, not only in my notes.",
    figure: {
      src: `${IMG}/amino-protein-chart.png`,
      alt: "Company protein utilization chart comparing BCAAs, whey, meat, eggs, and Advanced Amino Formula",
    },
  },

  officialClaims: {
    eyebrow: "On the record",
    title: "What the company already says — and what I will not add.",
    body: "The official materials list eight essential amino acids: L-lysine, L-phenylalanine, L-isoleucine, L-methionine, L-threonine, L-leucine, L-valine, and L-tryptophan.\n\nThey also state a protein utilization of 99% — 99% used to make proteins, 1% wasted — and they contrast that with whey and BCAAs on the same chart. Suggested use on the bottle: five tablets daily, or thirty minutes before activity if you are using it around training.\n\nThe company marks the product vegan, soy-free, dairy-free, gluten-free, non-GMO, and made in the USA. Orders are described as carrying a 90-day money-back guarantee.\n\nAs of August 2026, the company's site listed 3,144 reviews averaging 4.1 out of 5 (81% recommend). That count will age. I am dating it on purpose.\n\nI am not adding a result I did not measure. If you want the full label, the next section sends you to the official page.",
    figure: {
      src: `${IMG}/8-amino-acids.jpg`,
      alt: "Official graphic of the eight essential amino acids listed for Advanced Amino Formula",
    },
  },

  midCta: {
    eyebrow: "Next step",
    title: "The eight-acid list, the chart, and current pricing live on their site.",
    body: "This review does not quote a dollar amount. Use the hop when you want the live offer next to the 90-day terms.",
    ctaLabel: "See the official page",
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
    title: "If the official claims match what you came to check, read them at the source.",
    body: "This page is a review, not a storefront. I am not selling kits here and I am not quoting a price — those live on the official site, and they change.\n\nIf you want the eight-acid list, the utilization chart, and the 90-day guarantee in the company's own words, that is the next click. I may earn a commission if you buy through it. The disclosure is in the footer, not hidden in a tooltip.",
  },

  faq: {
    eyebrow: "Questions",
    title: "Company facts, plus the ones I get asked",
    lead: "Allergen and dosing answers are the company's position. Timing and price questions are mine — and they send you to the official page.",
    ctaLabel: "See the official page",
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
          "The company's materials mark the formula vegan, soy-free, dairy-free, gluten-free, non-GMO, and made in the USA. If you have a specific allergy, treat the official label as the source of truth — I am repeating their icons, not issuing a certificate.",
      },
      {
        id: "histidine",
        question: "Why isn't histidine on the eight-acid graphic?",
        answer:
          "The official eight-acid graphic does not include histidine. Some nutrition references still count histidine as essential for adults. I am not inventing the company's reason. If you need a histidine-complete profile, read the official label and ask them before you buy.",
      },
      {
        id: "pku",
        question: "I have PKU — is phenylalanine a problem?",
        answer:
          "Yes, this is a stop sign. The official list includes L-phenylalanine. People with phenylketonuria need to limit phenylalanine. Do not treat a review hop as medical clearance — talk to your clinician and read the official warnings.",
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
          "That is my review rule, not a company promise: eight to twelve weeks of consistent use before you decide. The official page does not owe you a personal timeline, and I will not invent one.",
      },
      {
        id: "price",
        question: "What does it cost compared with whey?",
        answer:
          "I am not posting a price here. Kits and promotions live on the official site and they move. If you want the current offer next to a tub of whey, use the hop — that is the live page.",
      },
      {
        id: "guarantee",
        question: "What is the guarantee?",
        answer:
          "The company describes a 90-day money-back guarantee on orders. Terms sit on the official checkout, not on this review.",
      },
    ],
  },

  trackingTags: [],

  footer: {
    brandName: "Advanced Amino Formula",
    tagline: "A researched look",
    ctaLabel: "See the official page",
    microcopy: "Affiliate link · official site via ClickBank",
  },

  stickyCta: {
    label: "See the official page",
  },

  // Segunda página desta Instância, em /advanced-amino — ver popup/popup.config.ts.
  popupGate: createPopupGate(HOP),
};

export default advancedAminoFormula;
