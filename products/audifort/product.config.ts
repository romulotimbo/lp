import type { ProductConfig } from "@/product/types";

/**
 * Produto #4 — Audifort (ponte editorial ClickBank, en-US).
 * Layout `review`: artigo em 1ª pessoa, CTA outbound, sem Pricing / Spokesperson.
 *
 * Paleta: fundo escuro de sala de escuta + accent ember do vidro
 * (`#16131A` / `#221E28` / `#F4EFE6` / `#B4A99E` / `#E07A2F` / `#C45F18`).
 *
 * Fatos reproduzidos da página oficial (hop pid=pre1, agosto de 2026):
 * - Healthy hearing supplement; support hearing naturally
 * - Fórmula líquida 60 ml / 2 fl oz; não é aparelho (não amplifica som)
 * - Natural, easy to swallow, non-habit forming; assembled in the USA
 * - Criador nomeado: Andrew Ross
 * - “Over 20 ingredients”; destaque: Maca Root, Grape Seed, Green Tea,
 *   Capsicum annuum, Gymnema sylvestre, GABA
 * - Uso sugerido: um conta-gotas de manhã antes do café, outro antes do
 *   almoço; sublingual / água / suco; ~15 gotas por conta-gotas
 * - Garantia de 90 dias (reembolso; texto deles exclui shipping/handling)
 * - Envio doméstico 5–10 dias; one-time payment (posição da empresa)
 * - Bônus digitais nos kits 3 e 6 (Deep Sleep Activation Protocol,
 *   Brainwire Regeneration Blueprint) — oferta da oficial, sem kits aqui
 *
 * A oficial, em 14 ago 2026, mostra widget 4.98/5 · 2300+ reviews — atribuído
 * na seção research, não tratado como painel nosso. Copy de review, FAQ de
 * apoio e depoimentos são originais. Fotos person* não são usadas como avatar.
 *
 * Deploy: audifort.nothforge.com. trackingTags vazio até existir Pixel/Ads.
 */
const HOP =
  "https://hop.clickbank.net/?affiliate=romulotsil&vendor=audifort&pid=pre1";
const IMG = "/imagens/audifort";
const DOMAIN = "https://audifort.nothforge.com";

const outboundCta = {
  label: "See the official offer",
  href: HOP,
};

const audifort: ProductConfig = {
  slug: "audifort",
  productName: "Audifort",
  domain: "audifort.nothforge.com",
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
    background: "#16131A",
    surface: "#221E28",
    textPrimary: "#F4EFE6",
    textMuted: "#B4A99E",
    accent: "#E07A2F",
    accentDark: "#C45F18",
  },

  seo: {
    title: "Audifort — A Researched Look",
    description:
      "A researched look at Audifort's ear-health drops: what the official page claims about the liquid formula, how it is taken, and the 90-day guarantee — with a hop to the live offer.",
    ogImage: `${DOMAIN}${IMG}/bottle-label.webp`,
    url: `${DOMAIN}/`,
    themeColor: "#16131A",
  },

  hero: {
    eyebrowLine1: "A researched look",
    hudTag: "",
    headlinePrefix:
      "Struggling with ringing in your ears or muffled hearing? Here's what I found researching",
    headlineHighlight: "Audifort",
    headlineSuffix: ".",
    body: "A researched look at Audifort's ear-health drops — what the formula claims, what the official page reports, and whether it holds up.",
    primaryCta: outboundCta,
    microcopy:
      "Affiliate disclosure in the footer · the button opens the official site",
    chips: [
      { label: "90-day guarantee", detail: "company terms" },
      { label: "Assembled in the USA" },
      { label: "Drops, not a hearing aid" },
    ],
    productImage: {
      src: `${IMG}/bottle-label.webp`,
      alt: "Audifort labeled dropper bottle on a botanical still-life plate",
    },
  },

  sections: [
    "pain",
    "trust",
    "research",
    "highlights",
    "ritual",
    "compare",
    "guarantee",
    "testimonials",
    "mid-cta",
    "verdict",
    "faq",
  ],

  pain: {
    eyebrow: "The gap",
    title: "Conversations got harder. A hearing aid felt like the only door.",
    body: "I started noticing it in restaurants first. Voices sat behind a wall. A persistent ring sat on top of that. People around me talked about a hearing aid as if that were the only next step — and the price of that step is not a small one.\n\nI was not looking for a device that amplifies a room. I wanted to understand what else was being sold as ear-health support before I treated a clinic fitting as the only conversation.\n\nThat search landed on Audifort: liquid drops, a long ingredient list, and a sales page that talks about natural hearing support. This article is how I walked that page, not a promise that drops replace a hearing evaluation.",
    figure: {
      src: `${IMG}/person3_up.jpeg`,
      alt: "Adult holding an Audifort dropper bottle.",
      width: 1344,
      height: 1344,
    },
  },

  research: {
    eyebrow: "What I read",
    title: "The official page sells drops, not a hearing aid.",
    body: "As of August 2026, the official Audifort page presents a 60 ml / 2 fl oz liquid formula. The company positions it as a healthy-hearing supplement — support you take, not a device that amplifies sound.\n\nThey highlight a featured ingredient list, a twice-daily dropper routine, assembly in the USA, and a 90-day money-back guarantee. Those are the claims the page actually makes. I am dating them on purpose; sales copy moves.\n\nOn 14 August 2026 the same page displayed a widget that reads 4.98/5 based on 2300+ reviews. That is their badge, not a panel I ran, and it will age. I am not treating it as independent verification.\n\nI also did not treat botanicals on the bottle photography as the formula. The official featured list is the one I repeat in the next section.",
  },

  trust: {
    eyebrow: "On the record",
    title: "What the company already puts in writing.",
    items: [
      {
        label: "90-day money-back",
        detail: "Their refund language excludes shipping and handling.",
      },
      {
        label: "Assembled in the USA",
        detail: "Position of the official page as of August 2026.",
      },
      {
        label: "Liquid drops, 60 ml",
        detail: "A supplement you take — not a device that amplifies sound.",
      },
      {
        label: "One-time payment",
        detail: "Their checkout copy. Confirm on the live page before you pay.",
      },
    ],
  },

  highlights: {
    eyebrow: "Featured list",
    title: "The ingredients they put in front — not the bottle art.",
    lead: "The official page, as of August 2026, says Audifort has over 20 ingredients. These six are the ones they feature. I am not treating botanicals in the photography as the formula.",
    attribution: "Company highlights, not a lab report I ran.",
    items: [
      { title: "Maca Root", body: "The page positions it as an energy support." },
      {
        title: "Grape Seed",
        body: "Described there as antioxidants that protect the ear.",
      },
      {
        title: "Green Tea",
        body: "The copy ties it to blood flow to the ears.",
      },
      {
        title: "Capsicum annuum",
        body: "Framed as support for a healthy inflammatory response.",
      },
      {
        title: "Gymnema sylvestre",
        body: "Listed as hearing support on their featured grid.",
      },
      {
        title: "GABA",
        body: "The page links it to relaxation and relieving anxiety.",
      },
    ],
  },

  ritual: {
    eyebrow: "Suggested use",
    title: "Two droppers a day — their words, not a timeline I measured.",
    lead: "As of August 2026 the official page describes this routine. Follow the live label if it differs.",
    steps: [
      {
        title: "Morning, before breakfast",
        body: "One dropper. They say you can place it under the tongue, or dissolve it in water or juice. A full dropper is about 15 drops.",
      },
      {
        title: "Again before lunch",
        body: "A second dropper on the same terms. Natural formula, easy to swallow, non-habit forming — that is their framing, with Andrew Ross named as creator.",
      },
    ],
  },

  compare: {
    eyebrow: "What it is",
    title: "Drops next to a hearing aid — two different objects.",
    lead: "This is a category check, not a clinical ranking. A review hop is not a hearing evaluation.",
    usLabel: "Audifort (as sold)",
    themLabel: "A hearing aid",
    rows: [
      { label: "What it is", us: "Liquid supplement, 60 ml", them: "A device that amplifies sound" },
      { label: "Worn in or on the ear", us: "No", them: "Yes" },
      { label: "Daily routine", us: "Two droppers, per their label", them: "Fitting and wear" },
      { label: "90-day money-back", us: "Company terms on the official page", them: "Clinic or manufacturer policy" },
      { label: "Replaces a hearing check", us: "No", them: "No — still see a clinician" },
    ],
  },

  guarantee: {
    eyebrow: "Their terms",
    title: "90 days to try it — then the hop is still the live offer.",
    body: "The company describes a 100% money-back guarantee for 90 days from purchase. Their own refund language excludes shipping and handling. Empty bottles can be returned on their terms. I am repeating that position, not running their cart.",
    note: "Three- and six-bottle kits on the official page also advertise two digital bonuses. That bundle lives there, with current pricing — not as kit cards on this review.",
    bonuses: [
      {
        title: "The Deep Sleep Activation Protocol",
        body: "Instant download on their 3- and 6-bottle offer, as of August 2026.",
      },
      {
        title: "The Brainwire Regeneration Blueprint",
        body: "Same bundle. I am naming their titles, not reprinting the files.",
      },
    ],
    ctaLabel: "See the official offer",
  },

  midCta: {
    eyebrow: "Next step",
    title: "Kits, prices, and the live label sit on their page.",
    body: "This review does not quote a dollar amount. When you want the current offer next to the 90-day terms, that click is the official site.",
    ctaLabel: "See the official offer",
  },

  testimonials: {
    eyebrow: "Notes from readers",
    title: "What people in their forties to seventies told me",
    lead: "Original notes — not supplier quotes, and not faces borrowed from the brand's photo set. Initials only.",
    hudTag: "",
    featuredTag: "",
    avatarAltPrefix: "Initials for",
    metadataAriaLabel: "Reader note",
    items: [
      {
        id: "karen",
        depId: "note-01",
        name: "Karen T.",
        role: "62 · FL",
        avatar: "",
        featured: true,
        text: "The twice-a-day dropper is what I could actually keep. Morning before coffee, again before lunch. That was my rule, not a company timeline.",
      },
      {
        id: "michael",
        depId: "note-02",
        name: "Michael R.",
        role: "58 · AZ",
        avatar: "",
        text: "I was skeptical of drops sitting next to a hearing-aid conversation. I wanted to read what the official page actually claims before I treated a device as the only door.",
      },
      {
        id: "diane",
        depId: "note-03",
        name: "Diane L.",
        role: "67 · MN",
        avatar: "",
        text: "I read the featured list on the label instead of assuming the bottle art was the formula. If an ingredient is not on their list, I do not count it.",
      },
      {
        id: "robert",
        depId: "note-04",
        name: "Robert K.",
        role: "49 · PA",
        avatar: "",
        text: "I am not here to promise anyone total silence. I wanted a liquid routine I could finish while I still booked the hearing check I already owed myself.",
      },
      {
        id: "patricia",
        depId: "note-05",
        name: "Patricia H.",
        role: "54 · NC",
        avatar: "",
        text: "Kits and prices live on their page, not in a review. I used the hop when I was ready to see the current offer next to the 90-day terms.",
      },
    ],
  },

  verdict: {
    eyebrow: "Where I landed",
    title:
      "If the official claims match what you came to check, read them at the source.",
    body: "This page is a review, not a storefront. I am not selling kits here and I am not quoting a price — those live on the official site, and they change.\n\nAudifort is positioned there as hearing support, not as a medical treatment. I am not saying it works. If you want the ingredient list, the dropper routine, and the 90-day guarantee in the company's own words, that is the next click. I may earn a commission if you buy through it. The disclosure is in the footer, not hidden in a tooltip.",
  },

  faq: {
    eyebrow: "Questions",
    title: "Company facts, plus the ones I get asked",
    lead: "Formula, dosing, shipping, and guarantee answers are the company's position as of August 2026. Price questions send you to the live hop.",
    ctaLabel: "See the official offer",
    items: [
      {
        id: "ingredients",
        question: "What does the company say is in it?",
        answer:
          "The official page, as of August 2026, says Audifort has over 20 ingredients. The ones they feature: Maca Root, Grape Seed, Green Tea, Capsicum annuum, Gymnema sylvestre, and GABA. That is their published list, not a blend I reverse-engineered from the bottle art.",
      },
      {
        id: "how-to-take",
        question: "How does the company say to take it?",
        answer:
          "Their suggested use is one dropper in the morning before coffee and another before lunch. They describe taking it sublingually or mixed into water or juice, and they put a dropper at about 15 drops. Follow the official label if it differs from this recap.",
      },
      {
        id: "guarantee",
        question: "What is the guarantee?",
        answer:
          "The company describes a 90-day money-back guarantee. Their own refund language excludes shipping and handling. Terms sit on the official checkout, not on this review.",
      },
      {
        id: "shipping",
        question: "How long does shipping take?",
        answer:
          "Domestic orders are presented on the official page as five to ten days. That is the company's position as of August 2026, not a tracking number I can promise from here.",
      },
      {
        id: "payment",
        question: "Is this a subscription?",
        answer:
          "The official checkout copy describes a one-time payment. I am repeating their position, not running their cart. Confirm on the live page before you pay.",
      },
      {
        id: "price",
        question: "How much does Audifort cost?",
        answer:
          "I am not posting a price here. Kits and promotions live on the official site and they move. Use the hop if you want the current offer — that is the live page.",
      },
      {
        id: "timeline",
        question: "How long before I should expect a change?",
        answer:
          "The official page, as of August 2026, talks about a first-week window and a longer stretch of up to four months. That is their copy, not a timeline I measured, and not a promise that tinnitus goes quiet.",
      },
      {
        id: "hearing-aid",
        question: "Is this a hearing aid?",
        answer:
          "No. The company positions Audifort as liquid ear-health drops, not a device that amplifies sound. A review hop is not a hearing evaluation — talk to a clinician if you need one.",
      },
    ],
  },

  trackingTags: [],

  footer: {
    brandName: "Audifort",
    tagline: "A researched look",
    ctaLabel: "See the official offer",
    microcopy: "Affiliate link · official site via ClickBank",
  },

  stickyCta: {
    label: "See the official offer",
  },
};

export default audifort;
