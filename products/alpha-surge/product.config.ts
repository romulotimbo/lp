import type { ProductConfig } from "@/product/types";

/**
 * Produto #2 sobre a Base — Alpha Surge (mercado EUA/EN-US), spokesperson
 * "Nova" reaproveitando o Banco de mídia da Vee sob nome/copy novos.
 *
 * Fatos reais:
 * - Presell do fornecedor (https://heroichustle.com/b/order-now.php?aff_id=23898,
 *   consultado em 2026-08-08): categoria, os 3 tiers de preço, garantia de 90
 *   dias, disclaimer FDA padrão.
 * - Rótulo oficial (public/imagens/alpha-surge/label.webp, fornecido pelo
 *   usuário em 2026-08-09): paleta preto/dourado, tagline "Unlock Your Primal
 *   Power", lista completa de 7 ingredientes com dosagem, distribuído por
 *   Alphasurgehq.com.
 * - Fotos de produto e lifestyle fornecidas pelo usuário (2026-08-09) em
 *   public/imagens/alpha-surge/.
 *
 * Testemunhos e copy de marketing são originais (não copiados do
 * fornecedor), no mesmo estilo estrutural da Vee.
 *
 * Deploy: alphasurge.nothforge.com — subdomínio próprio (mesmo padrão da
 * Vee), não o path /alphasurge pedido inicialmente. nothforge.com raiz vive
 * no Hostinger Website Builder, não na VPS/Traefik — um path não dava pra
 * rotear pra um container externo. DNS: registro A pra 185.137.92.233.
 *
 * PENDENTE: Pixel/Google Ads ID de rastreamento (trackingTags vazio).
 */
const CHECKOUT = "https://heroichustle.com/b/order-now.php?aff_id=23898";
const IMG = "/imagens/alpha-surge";
const DOMAIN = "https://alphasurge.nothforge.com";

const alphaSurge: ProductConfig = {
  slug: "alpha-surge",
  productName: "Alpha Surge",
  domain: "alphasurge.nothforge.com",

  locale: {
    language: "en-US",
    ogLocale: "en_US",
    currency: "USD",
    affiliateDisclosure:
      "This page contains affiliate links. We may earn a commission when you make a purchase through the links on this page, at no additional cost to you.",
    categoryDisclaimers: [
      "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary. Consult your doctor before use, especially if you have a pre-existing condition or take medication.",
    ],
  },

  tokens: {
    // Preto/dourado — direto do rótulo oficial, não da paleta navy/laranja
    // da página de anúncio do fornecedor (essa era só o fundo do ad, não a
    // identidade do produto).
    background: "#0A0A0A",
    surface: "#18181B",
    textPrimary: "#F5F2E9",
    textMuted: "#8C8579",
    accent: "#D4A62B",
    accentDark: "#9C7A1E",
  },

  seo: {
    title: "Alpha Surge — Fast-Acting Performance Gummies",
    description:
      "Nova backs Alpha Surge — fast-acting stamina, energy and drive gummies for men. 90-day money-back guarantee.",
    ogImage: `${DOMAIN}${IMG}/hero-lifestyle.webp`, // PENDENTE: crop dedicado 1200x630
    url: `${DOMAIN}/`,
    themeColor: "#0A0A0A",
  },

  hero: {
    eyebrowLine1: "Nova presents · Alpha Surge",
    hudTag: "hero · live_feed · batch AS-01",
    headlinePrefix: "Nova doesn't waste time on a man running on",
    headlineHighlight: "empty",
    headlineSuffix: ". Do you?",
    body: "Fast-acting gummies built for stamina, energy, and drive. No pills to choke down, no waiting around — just the surge you need, when you need it.",
    primaryCta: { label: "Get My Surge", href: CHECKOUT },
    microcopy: "fast-acting · natural · 90-day guarantee",
    productImage: {
      src: `${IMG}/hero-lifestyle.webp`,
      alt: "Alpha Surge — unlock your primal power",
    },
  },

  sections: ["manifesto", "power-grid", "tech-mechanism", "testimonials", "pricing", "faq"],

  spokesperson: {
    name: "Nova",
    recommendationBadge: "Nova's Pick",
    mediaPack: {
      // Mesmo Banco de mídia da Vee, reaproveitado sob o nome Nova (ver
      // CONTEXT.md — Banco de mídia é reaproveitável entre Spokespersons).
      id: "vee",
      heroVideo: "/video/vee-hero.mp4",
      heroPoster: "/video/vee-hero-poster.png",
      heroFallbackPortrait: "/imagens/vee-portrait.jpg",
      watermark: "/imagens/vee-manifesto-watermark.webp",
      avatars: [
        "/imagens/avatars/01.webp",
        "/imagens/avatars/02.webp",
        "/imagens/avatars/03.webp",
        "/imagens/avatars/04.webp",
        "/imagens/avatars/05.webp",
        "/imagens/avatars/06.webp",
      ],
      previewGallery: [],
    },
    manifesto: {
      eyebrow: "Nova's Word",
      text: "I don't do halfway. Not in the gym, not in bed, not with a man who quits when it counts. Alpha Surge is the edge that separates the men who show up from the ones who make excuses. Natural. Fast. No apologies. Take it. Perform. Or watch from the sideline.",
    },
  },

  powerGrid: {
    eyebrow: "The 4 Pillars",
    title: "Peak Protocol",
    lead: "Four signals Nova looks for in a man who keeps up: power, drive, stamina, and follow-through — straight from the label to the bedroom.",
    convergenceCopy: "All four modules converge on one target: showing up when it matters.",
    ctaLabel: "Activate The Surge",
    telemetryTag: "telemetry · live batch readout",
    nextStepTag: "next_step · pricing",
    pillars: [
      {
        id: "power",
        hudLabel: "SURGE::POWER",
        moduleId: "MOD::01",
        title: "Power",
        description: "Real physical strength and grip when it matters most. No excuses in the gym.",
        stat: "MAX",
        statLabel: "physical power",
        telemetry: 96,
        featured: true,
        image: "/imagens/power/forca.webp", // placeholder — textura emprestada da Vee, trocar quando houver asset próprio
        className: "md:col-span-4 md:row-span-2",
      },
      {
        id: "stamina",
        hudLabel: "SURGE::STAMINA",
        moduleId: "MOD::02",
        title: "Stamina",
        description: "Endurance to spare — built to go the distance, not fade at the finish line.",
        stat: "12H",
        statLabel: "sustained endurance",
        telemetry: 90,
        image: "/imagens/power/vitalidade.webp",
        className: "md:col-span-2",
      },
      {
        id: "drive",
        hudLabel: "SURGE::DRIVE",
        moduleId: "MOD::03",
        title: "Drive",
        description: "Drive switched on, energy that doesn't quit halfway through the day.",
        stat: "ON",
        statLabel: "drive activated",
        telemetry: 93,
        image: "/imagens/power/energia.webp",
        className: "md:col-span-2",
      },
      {
        id: "performance",
        hudLabel: "SURGE::PERFORM",
        moduleId: "MOD::04",
        title: "Performance",
        description: "Performance under pressure. Show up, follow through, no excuses.",
        stat: "GO",
        statLabel: "on-demand performance",
        telemetry: 94,
        wide: true,
        image: "/imagens/power/desempenho.webp",
        className: "md:col-span-6",
      },
    ],
  },

  techMechanism: {
    eyebrow: "Inside The Formula",
    title: "The Alpha Surge Blend",
    lead: "What's actually in the gummy — real ingredients, dosed on the label, no mystery filler.",
    hudTag: "mechanism · hud_scan",
    tabs: [
      {
        value: "ingredients",
        label: "Key Ingredients",
        moduleId: "SCAN::BLEND",
        title: "The Core Blend",
        content:
          "L-Arginine HCl (50mg), Tongkat Ali extract (200mg), Maca root extract (100mg), Ashwagandha extract (100mg), Horny Goat Weed extract (100mg), Beet Root extract (50mg), and Grape Seed extract (50mg) — seven ingredients, every dose printed on the label.",
        spec: "7",
        specDetail: "key ingredients per gummy",
        hud: {
          src: `${IMG}/label.webp`,
          alt: "Alpha Surge — supplement facts label",
          label: "HUD::BLEND_SCAN",
          readouts: { left: ["format: gummy", "ingredients: 7-core"], right: "rec ●" },
        },
      },
      {
        value: "format",
        label: "Gummy Format",
        moduleId: "SCAN::FORMAT",
        title: "No Pills To Choke Down",
        content:
          "A gummy you actually want to take — no capsule, no chalky aftertaste, easy to keep on the counter and stay consistent.",
        spec: "1",
        specDetail: "gummy per serving",
        hud: {
          src: `${IMG}/gummies-lifestyle.webp`,
          alt: "Alpha Surge — gummies, one serving a day",
          label: "HUD::FORMAT_SCAN",
          readouts: { left: ["serving: 1 gummy/day", "no_water_needed: true"], right: "rec ●" },
        },
      },
      {
        value: "guarantee",
        label: "90-Day Guarantee",
        moduleId: "SCAN::GUARANTEE",
        title: "90-Day Money-Back Guarantee",
        content:
          "Every bottle is backed by a 90-day money-back guarantee — try the full protocol with nothing to lose.",
        spec: "90",
        specDetail: "day guarantee",
        hud: {
          src: `${IMG}/guy-holding.webp`,
          alt: "Alpha Surge — customer holding a bottle",
          label: "HUD::GUARANTEE_SCAN",
          readouts: { left: ["guarantee: 90_days", "risk: zero"], right: "verified ●" },
        },
      },
    ],
  },

  testimonials: {
    eyebrow: "Real Results",
    title: "Men Who Didn't Quit",
    lead: "Reports from guys who started the surge.",
    hudTag: "social_proof · field_reports",
    featuredTag: "field_report · primary",
    avatarAltPrefix: "Portrait of",
    metadataAriaLabel: "Testimonial metadata",
    items: [
      {
        id: "jason",
        depId: "DEP::01",
        name: "Jason S.",
        role: "36 · TX",
        avatar: "/imagens/avatars/01.webp",
        text: "My energy in the gym came back before the first bottle was even half gone. I'm not crashing by mid-afternoon anymore.",
      },
      {
        id: "mike",
        depId: "DEP::02",
        name: "Mike R.",
        role: "42 · OH",
        avatar: "/imagens/avatars/02.webp",
        text: "Stopped feeling like I was running on fumes by week two. First thing that actually stuck.",
      },
      {
        id: "derek",
        depId: "DEP::03",
        name: "Derek T.",
        role: "39 · FL",
        avatar: "/imagens/avatars/03.webp",
        text: "Stamina's up, confidence is up, and I'm not crashing by 3pm anymore. Already ordered the 6-bottle pack.",
        featured: true,
      },
      {
        id: "chris",
        depId: "DEP::04",
        name: "Chris B.",
        role: "31 · CA",
        avatar: "/imagens/avatars/04.webp",
        text: "Tried three other brands before this one. Alpha Surge is the only one that didn't feel like a placebo.",
      },
      {
        id: "anthony",
        depId: "DEP::05",
        name: "Anthony K.",
        role: "45 · NY",
        avatar: "/imagens/avatars/05.webp",
        text: "My energy at the gym is back, and I'm not dragging by dinner time. Already on my second bottle.",
      },
      {
        id: "ryan",
        depId: "DEP::06",
        name: "Ryan D.",
        role: "33 · IL",
        avatar: "/imagens/avatars/06.webp",
        text: "Energy, drive, focus — all up. No jitters, no crash.",
      },
    ],
  },

  pricing: {
    eyebrow: "The Verdict",
    title: "Pick Your Pace",
    lead: "Three tiers. One decision. Most guys land on the 3-bottle pack — it's the balance Nova recommends.",
    tag: "checkout · secure_order",
  },

  plans: [
    {
      id: "try-two",
      hudLabel: "TIER::02",
      name: "Try Two",
      image: `${IMG}/2-bottles.webp`,
      imageAlt: "Alpha Surge — 2 bottle pack",
      price: "$158",
      perUnit: "$79/bottle",
      description: "60-day supply. Dip a toe in before you commit.",
      features: ["2 bottles · 60-day supply", "90-day money-back guarantee", "Standard shipping"],
      recommended: false,
      ctaLabel: "Try It Now",
      href: CHECKOUT,
      value: 158,
    },
    {
      id: "most-popular",
      hudLabel: "TIER::03",
      name: "Most Popular",
      image: `${IMG}/3-bottles.webp`,
      imageAlt: "Alpha Surge — 3 bottle pack",
      price: "$207",
      perUnit: "$69/bottle",
      description: "90-day supply. The pace most guys land on.",
      features: [
        "3 bottles · 90-day supply",
        "Free US shipping",
        "90-day money-back guarantee",
        "Best balance of price and results",
      ],
      recommended: true,
      ctaLabel: "Get The Surge",
      href: CHECKOUT,
      value: 207,
    },
    {
      id: "best-value",
      hudLabel: "TIER::06",
      name: "Best Value",
      image: `${IMG}/6-bottles.webp`,
      imageAlt: "Alpha Surge — 6 bottle pack",
      price: "$294",
      perUnit: "$49/bottle",
      description: "180-day supply. Maximum discount, zero excuses.",
      features: [
        "6 bottles · 180-day supply",
        "Free US shipping",
        "90-day money-back guarantee",
        "Lowest price per bottle",
      ],
      recommended: false,
      ctaLabel: "Stock Up",
      href: CHECKOUT,
      value: 294,
    },
  ],

  faq: {
    eyebrow: "FAQ",
    title: "No Excuses",
    lead: "Ingredients, guarantee, how to use — straight answers, no runaround.",
    ctaLabel: "See the plans",
    items: [
      {
        id: "ingredients",
        question: "What's actually in Alpha Surge?",
        answer:
          "L-Arginine HCl, Tongkat Ali extract, Maca root extract, Ashwagandha extract, Horny Goat Weed extract, Beet Root extract, and Grape Seed extract — seven ingredients, every dose printed on the label. Tongkat Ali and Ashwagandha are included specifically to support the body's natural testosterone production, alongside Maca root for sustained energy.",
      },
      {
        id: "format",
        question: "Is it a pill or a gummy?",
        answer: "A gummy. One a day, no water needed, no capsule to choke down.",
      },
      {
        id: "guarantee",
        question: "What's the guarantee?",
        answer: "Every order is backed by a 90-day money-back guarantee. If it's not for you, you get your money back.",
      },
      {
        id: "how-long",
        question: "How long before I notice a difference?",
        answer:
          "Individual results vary. Most guys stick with a full bottle before judging results — consistency is the whole game.",
      },
      {
        id: "safety",
        question: "Is it safe? Any interactions?",
        answer:
          "Alpha Surge uses natural ingredients, but if you have a health condition or take medication, talk to your doctor before starting — full ingredient list and dosage are on the label. Not for use under 18, or by pregnant or nursing mothers.",
      },
      {
        id: "shipping",
        question: "How does shipping work?",
        answer: "Orders ship from the US. The 3-bottle and 6-bottle packs include free shipping.",
      },
    ],
  },

  // Sem leadCapture nem restrictedArea neste Produto — decisão do usuário
  // (sem gancho natural tipo "área restrita" pra esse nicho).

  trackingTags: [{ type: "google_ads", id: "AW-18351905109" }],

  footer: {
    brandName: "Alpha Surge",
    tagline: "Unlock Your Primal Power", // tagline oficial do rótulo
    ctaLabel: "Get My Surge →",
    microcopy: "fast-acting · natural · 90-day guarantee",
  },

  stickyCta: {
    label: "Get Alpha Surge · from $49/bottle",
  },
};

export default alphaSurge;
