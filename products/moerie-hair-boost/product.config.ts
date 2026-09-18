import type { ProductConfig } from "@/product/types";

/**
 * Produto #7 — Moérie (review-skeptic, en-US, dual SKU).
 *
 * Apply notes (Sep 2026):
 * - The topical protocol is the **Moérie Haircare Set** (shampoo, conditioner,
 *   mask, and thickening spray). Editorial focus stays on the spray ritual.
 * - Affiliate HOP links are not issued yet — they wait on landing-page approval
 *   by the platform manager. Catalog hrefs are the official stores, not hops.
 * - UGC video is reserved until that approval; mosaic slots are labeled, not faked.
 * - Product questions: info@moerie.com
 * - Testimonials gallery used as a source pointer only: https://moerie.com/testimonials/
 *
 * Pills facts from pills.moerie.com (label + checkout, Sep 2026). Fulvic / 70+
 * mineral framing is Moérie's language on the Haircare Set pages
 * (store.moerie.com / moerie.com) — attributed, not an independent lab finding.
 */
const BASE_PATH = "/real-hair-project-2026";
const ORIGIN = "https://hair.thebuylens.com";
const SITE = `${ORIGIN}${BASE_PATH}`;
const IMG = `${BASE_PATH}/imagens/moerie-hair-boost`;
const PILLS_HREF = "https://pills.moerie.com/";
const SET_HREF = "https://store.moerie.com/moe-hair-growth-set";

const moerieHairBoost: ProductConfig = {
  slug: "moerie-hair-boost",
  productName: "Moérie Ultimate Hair Boost",
  domain: "hair.thebuylens.com",
  basePath: BASE_PATH,
  layout: "review-skeptic",

  locale: {
    language: "en-US",
    ogLocale: "en_US",
    currency: "USD",
    affiliateDisclosure:
      "This is an independent review published on The Buy Lens, not the official Moérie site. The buttons on this page go to Moérie's official stores. We do not currently have an affiliate hop or a commission on these links — if the platform issues hops after this landing page is approved, this notice will be updated to say so.",
    categoryDisclaimers: [
      "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results vary. Consult a qualified clinician before use, especially if you have a pre-existing condition or take medication.",
    ],
  },

  tokens: {
    background: "#D7E3DC",
    surface: "#F4F8F5",
    textPrimary: "#1C2A24",
    textMuted: "#5A6D64",
    accent: "#C4A035",
    accentDark: "#5C3E0A",
  },

  seo: {
    title: "I tested Moérie for 90 days — mineral miracle or expensive marketing?",
    description:
      "An independent 90-day desk review of Moérie Ultimate Hair Boost and the Haircare Set. Two official stores, no kit prices, no invented testimonials.",
    ogImage: `${ORIGIN}${IMG}/bottle-hero.webp`,
    url: `${SITE}/`,
    themeColor: "#D7E3DC",
  },

  editorialBar: {
    tag: "Independent Review | Real Hair Project 2026",
    disclosure:
      "Editorial desk review. Links go to Moérie's official stores. No affiliate commission today.",
    asOf: "2026-09-18",
    readingMinutes: 12,
    learnMoreHref: "#footer-disclosure",
  },

  hero: {
    eyebrowLine1: "Desk notes, not a brand film",
    hudTag: "",
    headlinePrefix: "I tested the hair brand that took over TikTok for 90 days:",
    headlineHighlight: "mineral miracle, or expensive marketing?",
    headlineSuffix: "",
    body: "Gummies that mostly gave me a breakout. Growth shampoo that rinsed off before it could do anything interesting. This page is the 90-day read of Moérie's inside-out capsules and the Haircare Set — whose leave-in spray is the topical half of the story — plus a four-question filter for which ritual you can actually keep.",
    primaryCta: { label: "See Ultimate Hair Boost", href: PILLS_HREF },
    secondaryCta: { label: "See the Haircare Set", href: SET_HREF },
    microcopy: "Official stores only. No affiliate hop until the platform approves this page.",
    chips: [
      { label: "90-day desk diary", detail: "editorial experience, not a typical result" },
      { label: "Two official stores", detail: "pills and the Haircare Set" },
      { label: "No kit price on this page", detail: "sale banners move" },
    ],
    productImage: {
      src: `${IMG}/bottle-hero.webp`,
      alt: "Moérie Ultimate Hair Boost bottle, official product photography",
    },
  },

  catalog: {
    defaultProtocol: "pills",
    pills: {
      id: "pills",
      productName: "Moérie Ultimate Hair Boost",
      approachLabel: "Inside-out · capsules",
      whyForYou:
        "Diffuse shed, weak nails, and a routine you can keep with water — two vegan capsules a day, per their label. This is the systemic side of the desk.",
      outboundCta: { label: "Open the official pills store", href: PILLS_HREF },
      image: {
        src: `${IMG}/bottle-hero.webp`,
        alt: "Moérie Ultimate Hair Boost bottle",
      },
    },
    spray: {
      id: "spray",
      productName: "Moérie Haircare Set",
      approachLabel: "Topical ritual · set",
      whyForYou:
        "Localized gaps at the temples, crown, or part. The Haircare Set includes shampoo, conditioner, mask, and the thickening spray this review focuses on — a leave-in you massage into the scalp after washing.",
      outboundCta: { label: "Open the official Haircare Set", href: SET_HREF },
    },
  },

  protocolQuiz: {
    diagnoseLabel: "See my protocol",
    resultTemplate:
      "Analyzing your answers: your profile has {affinity}% affinity with the {protocol} protocol…",
    questions: [
      {
        id: "shed",
        prompt: "How does the thinning show up in your day?",
        answers: [
          {
            label: "Diffuse — more hair on the brush, in the drain, around the house",
            scores: "pills",
          },
          {
            label: "Local — temples, crown, a widening part, a thinning edge",
            scores: "spray",
          },
        ],
      },
      {
        id: "nails",
        prompt: "What about nails and the fiber of the hair itself?",
        answers: [
          {
            label: "Weak nails and thinning hair in the same season",
            scores: "pills",
          },
          {
            label: "Nails are fine — I want fill-in at the root",
            scores: "spray",
          },
        ],
      },
      {
        id: "tried",
        prompt: "Have you already tried gummies or growth tonics?",
        answers: [
          {
            label: "Yes — and it felt like nothing absorbed",
            scores: "pills",
          },
          {
            label: "No. Shampoo is as far as I have gone",
            scores: "spray",
          },
        ],
      },
      {
        id: "routine",
        prompt: "Which ritual can you actually keep?",
        answers: [
          {
            label: "One or two capsules with water, most days",
            scores: "pills",
          },
          {
            label: "Spray and massage the Haircare Set leave-in at night",
            scores: "spray",
          },
        ],
      },
    ],
  },

  sections: [
    "skepticism",
    "investigation",
    "test-diary",
    "ugc-mosaic",
    "protocol-verdict",
    "synergy",
    "honesty-scale",
    "safe-buy",
  ],

  skepticism: {
    eyebrow: "The drain clump",
    title: "I did not want another hair miracle. I wanted to know why the last ones failed.",
    body: "The ponytail wrapped one extra time before I said it out loud. The clump in the drain stopped being \"just winter.\" By then I had already bought the biotin gummies that tasted like syrup and did more for my chin than my hairline, and a \"growth\" shampoo that sat on the scalp for the length of a chorus and then went down the same drain.\n\nTikTok made Moérie look inevitable. Yellow capsules. A spray. A mineral story. I did not want a conversion. I wanted a reason the last aisle had been a waste of money — and whether this brand was doing a different job, or the same job with better lighting.",
  },

  investigation: {
    eyebrow: "Their framing, dated",
    title: "Moérie describes a fulvic mineral complex. I am not running that lab.",
    body: "On the live Haircare Set and spray pages, Moérie describes fulvic acid as the thread through the line — their copy talks about more than 70 trace minerals, amino acids, and vitamins in that complex, and they put biotin, caffeine, and botanicals around it. That is their language, as of September 2026, not a trial this desk ran.\n\nThe split that actually matters for a routine is simpler. Ultimate Hair Boost is a two-capsule-a-day dietary supplement (eight nutrients on the photographed Supplement Facts panel, biotin dosed far above the rest). The Haircare Set is the topical stack: strengthening shampoo, conditioner, mask, and the thickening spray you leave on the scalp after a wash. One is inside-out. One is on the part you can see. I am not collapsing them into a single miracle SKU.\n\nI also am not quoting their sale prices. Banners move. If you want a total, the official stores have it today.",
  },

  testDiary: {
    eyebrow: "Ninety days at the desk",
    title: "What I wrote down — not what I will promise you.",
    lead: "This timeline is the editorial desk's experience with the line. It is not a clinical trial of the finished products, and it is not a typical result.",
    phases: [
      {
        label: "Weeks 1–2",
        title: "Doubt, and the same drain",
        body: "Nothing photogenic. I kept taking the capsules with water and using the Haircare Set spray on wash nights because the alternative was quitting on day nine, which is how the gummies had gone. The brush still looked busy.",
      },
      {
        label: "Weeks 3–5",
        title: "Less hair on the brush — maybe",
        body: "The clump in the drain looked smaller. I did not measure grams. I noticed I was less angry at the shower. That is a mood, not a study. I wrote it down anyway.",
      },
      {
        label: "Weeks 8–12",
        title: "Baby hairs along the part",
        body: "Short, stubborn hairs along the part and the temples, the kind you only see in bad bathroom light. I still would not call it regrowth. I would call it a reason I did not throw the bottles out. Individual results vary; this was mine.",
      },
    ],
    caveat:
      "Individual results vary. This diary is not typical, not guaranteed, and not a substitute for a dermatologist. Hair shedding has medical causes this page cannot diagnose.",
  },

  ugcMosaic: {
    eyebrow: "Third-party clips, later",
    title: "UGC sits here after the landing page is approved.",
    lead: "We are not inventing faces, names, or quotes. Moérie publishes a testimonials gallery; our own short videos will be shot only after the platform signs off on this page.",
    items: [
      {
        kind: "reserved",
        caption:
          "Reserved UGC 1 — a short clip of the Haircare Set spray misted along the hairline at night, shot after landing-page approval. Not a testimonial yet.",
        attribution: "Production slot. Brand gallery: moerie.com/testimonials",
      },
      {
        kind: "reserved",
        caption:
          "Reserved UGC 2 — a still of the Ultimate Hair Boost bottle in a real bathroom, not a supplier lifestyle crop reused as a reviewer avatar.",
        attribution: "Production slot. Official product photography will be credited as brand-published.",
      },
      {
        kind: "reserved",
        caption:
          "Reserved UGC 3 — a 15-second wash-night routine (shampoo to leave-in spray) without before/after scalp photography.",
        attribution: "Production slot. No fabricated names.",
      },
      {
        kind: "reserved",
        caption:
          "Reserved UGC 4 — a screen capture from Moérie's own testimonials page, attributed as brand-published, if we need a still before the shoot lands.",
        attribution: "Source pointer: https://moerie.com/testimonials/",
      },
    ],
  },

  protocolVerdict: {
    eyebrow: "Diagnosis",
    title: "Two official protocols. The quiz only lights one up.",
    lead: "Both cards stay on the page. If you skipped the quiz, the capsules are the default emphasis — the Haircare Set is still a real option.",
  },

  synergy: {
    eyebrow: "360°",
    title: "The other half of the sink",
    body: "If the quiz pointed you at capsules, the Haircare Set is the topical accelerator — same brand, different job, spray-first ritual after you wash. If it pointed you at the set, Ultimate Hair Boost is the inside-out half: two capsules, eight nutrients on the label, no extra theater.\n\nI am not bundling a kit price. I am saying the 90-day desk used both, and the honest cross-sell is the SKU you did not just choose.",
    acceleratorCtaLabel: "See the complementary official store",
  },

  honestyScale: {
    eyebrow: "The scale",
    title: "What I will defend, and what I will not dress up",
    lead: "No seven-day miracle. If someone in an ad promised you that, they were not this desk.",
    pros: [
      "A photographed Supplement Facts panel for the capsules — eight nutrients, biotin dose in writing.",
      "A clear split between systemic capsules and a Haircare Set whose spray you actually leave on.",
      "Moérie's own 90-day money-back badge on the pills store (read the live policy before you lean on it).",
      "Official stores only on this page — no marketplace \"70% off\" treasure hunt.",
    ],
    cons: [
      "Priced above a drugstore biotin bottle. I am not pretending otherwise, and I am not printing a kit total that will be wrong next week.",
      "Sixty to ninety days before this desk saw anything worth writing down. It will not save a wedding next Saturday.",
      "Stock runs out. Official pages go to waitlists. That is a hassle, not a scarcity trick I am going to perform.",
      "Sold on the official sites, not the random listing with the too-good discount.",
      "It does not generate a miracle in seven days. If that is the only timeline you have, skip it.",
    ],
  },

  safeBuy: {
    eyebrow: "Buy it where it is actually made",
    title: "Skip the marketplace clone with the heroic discount.",
    body: "If a listing is 70–80% off and ships from a warehouse you cannot name, it is not a deal. It is how counterfeit bottles show up. This page only points at Moérie's official pills store and the official Haircare Set page.\n\nAffiliate hops are not live yet. Until the platform manager approves this landing page, the buttons above are the official URLs — not a tracked hop, not a checkout we host.",
    counterfeitWarning:
      "Do not buy Moérie from unregulated marketplaces or steep unofficial discounts. The two buttons below are the official stores this desk used.",
    guaranteeNote:
      "Moérie displays a 90-day money-back policy on the pills store. That is their claim. Read the live terms on the official site; this review does not restate fine print we did not open.",
  },

  compliancePages: {
    terms: {
      title: "Terms of Service",
      paragraphs: [
        "This independent review is published at hair.thebuylens.com/real-hair-project-2026 (\"the site\") by The Buy Lens. It is not the official Moérie website and is not affiliated with Moérie as a commissioned partner today.",
        "The site is provided as editorial information. Product availability, labels, policies, and prices are controlled by Moérie on their official stores. We do not process payments or take orders.",
        "Outbound buttons open third-party stores in a new tab. Those stores have their own terms. We are not responsible for their checkout, shipping, or refunds.",
        "You may not scrape, republish, or misrepresent this review as Moérie's own marketing. You may not use the site to sell counterfeit goods.",
        "These terms are governed by the laws applicable to the publisher's operations. If a provision is unenforceable, the rest remain in effect. Questions about this site: use the contact on the About page. Questions about Moérie products: info@moerie.com.",
      ],
    },
    privacy: {
      title: "Privacy Policy",
      paragraphs: [
        "This page explains how the independent review at hair.thebuylens.com/real-hair-project-2026 handles information. We do not run an account system or a checkout.",
        "Cookies and similar storage. The site may use strictly necessary cookies to deliver the page. The protocol quiz can store a result in sessionStorage on your device so a refresh can remember which protocol you highlighted. That value does not leave the browser unless you send it yourself. We do not use that quiz as a content gate.",
        "If advertising pixels are added later, they will be listed in this product's tracking configuration and this policy will be updated. Today the instance ships with no Meta Pixel and no Google Ads conversion tag.",
        "GDPR. If you are in the European Economic Area or the United Kingdom, you have rights to access, rectify, erase, restrict, or object to processing of personal data we might hold, and to lodge a complaint with a supervisory authority. We do not sell personal data.",
        "CCPA / CPRA. If you are a California resident, you have rights to know, delete, and correct personal information, and to opt out of sale or sharing. We do not sell personal information. We do not currently share it for cross-context behavioral advertising.",
        "LGPD. If we process personal data of a Brazilian data subject, Lei Geral de Proteção de Dados (Law 13.709/2018) rights — including access, correction, anonymization, portability, and information about sharing — apply. Contact the publisher using the About page.",
        "Outbound stores (pills.moerie.com and store.moerie.com) are separate controllers. Their privacy notices govern what they collect after you click through.",
        "To ask a privacy question about this review site, use the contact on About. For Moérie's own privacy practices, write to info@moerie.com.",
      ],
    },
    medicalDisclaimer: {
      title: "Medical Disclaimer",
      paragraphs: [
        "This review is not medical advice and is not a substitute for a consultation with a qualified clinician or dermatologist.",
        "Moérie Ultimate Hair Boost is a dietary supplement. The Haircare Set is cosmetic haircare. Neither is intended to diagnose, treat, cure, or prevent any disease. Individual results vary.",
        "The 90-day diary on the landing page is the editorial desk's experience. It is not a typical result, not a guarantee, and not evidence that you will see baby hairs, less shed, or any change at all.",
        "Hair shedding and thinning have many causes, including thyroid disease, iron deficiency, postpartum change, medication, and androgenetic alopecia. Do not delay medical care because of something you read here.",
        "Consult a qualified clinician before using a supplement or a new scalp product, especially if you are pregnant, nursing, have a pre-existing condition, or take medication. These statements have not been evaluated by the Food and Drug Administration.",
      ],
    },
    about: {
      title: "About this review",
      paragraphs: [
        "The Buy Lens publishes independent product reviews. This instance covers Moérie Ultimate Hair Boost and the Moérie Haircare Set for a US audience. It is not the official Moérie site.",
        "We do not currently earn a commission on the official-store buttons. Affiliate hops will be added only after the platform manager approves this landing page, and the disclosure will change on the same day.",
        "We do not invent testimonials, review counts, kit prices, or clinical trials of the finished SKUs. Claims about fulvic acid and mineral content are attributed to Moérie's own pages.",
        "Publisher contact for this review site is listed with the host: hair.thebuylens.com/real-hair-project-2026. For questions about Moérie products, ingredients, orders, or subscriptions, write to info@moerie.com.",
        "Learn more about the relationship disclosed in the footer of every page on this host.",
      ],
    },
  },

  trackingTags: [],

  footer: {
    brandName: "Moérie — Independent Review",
    tagline: "Not the official Moérie site · Real Hair Project 2026",
    ctaLabel: "Official stores",
    microcopy: "No affiliate hop today — official URLs only",
  },

  stickyCta: {
    label: "Official stores",
  },
};

export default moerieHairBoost;
