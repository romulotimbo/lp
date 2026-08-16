/**
 * Contrato de configuração de Produto — ver CONTEXT.md e
 * openspec/changes/extract-reusable-base/ para o modelo de domínio completo.
 *
 * Um `ProductConfig` é aplicado sobre a Base para produzir uma Instância.
 * Todo campo marcado como obrigatório aqui é validado em `validateProductConfig`
 * (build falha se estiver ausente).
 */

/** Contrato fixo de papéis de token — valores livres por Produto, papéis fixos (ADR-0002). */
export interface DesignTokens {
  background: string;
  surface: string;
  textPrimary: string;
  textMuted: string;
  accent: string;
  accentDark: string;
}

/** Seções opcionais que um Produto pode ligar/desligar/ordenar. Hero e o rodapé são sempre presentes. Pricing é obrigatório só em layout `sales`. */
export type OptionalSectionId =
  | "manifesto"
  | "power-grid"
  | "tech-mechanism"
  | "testimonials"
  | "faq"
  | "lead-capture"
  | "restricted"
  | "pain"
  | "research"
  | "official-claims"
  | "verdict"
  | "trust"
  | "highlights"
  | "ritual"
  | "compare"
  | "guarantee"
  | "mid-cta";

/** `"pricing"` é obrigatório em layout `sales` (posição livre). Layout `review` rejeita esse id. */
export type SectionId = OptionalSectionId | "pricing";

export type PageLayout = "sales" | "review";

export interface OutboundCta {
  label: string;
  href: string;
}

export interface EditorialFigure {
  src: string;
  alt: string;
  /** Tamanho intrínseco do arquivo — evita upscale e CLS. */
  width?: number;
  height?: number;
}

/** Bloco de artigo para seções editoriais do layout `review`. */
export interface EditorialBlock {
  eyebrow?: string;
  title: string;
  body: string;
  figure?: EditorialFigure;
}

export interface Plan {
  id: string;
  hudLabel?: string;
  name: string;
  image: string;
  imageAlt: string;
  price: string;
  perUnit?: string;
  description: string;
  features: string[];
  recommended?: boolean;
  ctaLabel: string;
  href: string;
  value: number;
}

export interface MediaPack {
  /** Identificador estável do Banco de mídia — reaproveitável por Spokespersons de Produtos diferentes. */
  id: string;
  heroVideo?: string;
  heroPoster?: string;
  heroFallbackPortrait?: string;
  watermark?: string;
  avatars: string[];
  previewGallery: { src: string; alt: string }[];
}

export interface Spokesperson {
  name: string;
  /** Ex.: "o que a Vee usa" — selo de recomendação no Pricing. */
  recommendationBadge: string;
  mediaPack: MediaPack;
  manifesto: {
    eyebrow: string;
    text: string;
  };
}

export interface PowerPillarContent {
  id: string;
  hudLabel: string;
  moduleId: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  telemetry: number;
  image?: string;
  featured?: boolean;
  wide?: boolean;
  className?: string;
}

export interface PowerGridContent {
  eyebrow: string;
  title: string;
  lead: string;
  pillars: PowerPillarContent[];
  convergenceCopy: string;
  ctaLabel: string;
  /** Tag mono no canto superior direito, ex. "telemetry · live batch readout". */
  telemetryTag: string;
  /** Tag mono acima do CTA final, ex. "next_step · pricing". */
  nextStepTag: string;
}

export interface TechMechanismTab {
  value: string;
  label: string;
  moduleId: string;
  title: string;
  content: string;
  spec: string;
  specDetail: string;
  hud: {
    src: string;
    alt: string;
    label: string;
    readouts: { left: string[]; right: string };
  };
}

export interface TechMechanismContent {
  eyebrow: string;
  title: string;
  lead: string;
  tabs: TechMechanismTab[];
  /** Tag mono no canto superior direito, ex. "mechanism · hud_scan". */
  hudTag: string;
}

export interface TestimonialContent {
  id: string;
  depId: string;
  name: string;
  role: string;
  avatar: string;
  text: string;
  featured?: boolean;
}

export interface TestimonialsContent {
  eyebrow: string;
  title: string;
  lead: string;
  items: TestimonialContent[];
  /** Tag mono no canto superior direito, ex. "social_proof · field_reports". */
  hudTag: string;
  /** Tag mono acima do depoimento em destaque, ex. "field_report · primary". */
  featuredTag: string;
  /** Prefixo do alt text dos avatares, ex. "Portrait of" — concatenado com o nome. */
  avatarAltPrefix: string;
  /** aria-label da lista de metadados do depoimento em destaque (leitor de tela). */
  metadataAriaLabel: string;
}

export interface FaqItemContent {
  id: string;
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  lead: string;
  items: FaqItemContent[];
  /** Label do link que aponta pra Pricing, ex. "See the plans". */
  ctaLabel: string;
}

export interface PricingContent {
  eyebrow: string;
  title: string;
  lead: string;
  /** Tag mono no canto superior direito, ex. "checkout · discreet_ship". */
  tag: string;
}

/**
 * Captura de lead — opcional, gancho (copy do modal) configurável por Produto
 * (ver `lead-capture-module`). A seção que dispara o modal (ex. `restrictedArea`)
 * tem sua própria copy de teaser; este config é só o conteúdo do modal em si.
 */
export interface LeadCaptureConfig {
  modalHeaderTag: string;
  modalTitle: string;
  modalDescription: string;
  modalFooterTag: string;
  emailLabel: string;
  emailPlaceholder: string;
  ctaLabel: string;
  loadingLabel: string;
  dismissLabel: string;
  closeLabel: string;
  genericErrorMessage: string;
  networkErrorMessage: string;
  successMessage: string;
  alreadyRegisteredMessage: string;
  /** Identifica esse gancho nos registros da API (`source`). */
  source: string;
}

export interface RestrictedAreaContent {
  eyebrow: string;
  title: string;
  description: string;
  /** Teaser curto mostrado em outras seções (ex. rodapé do Pricing) apontando pra essa seção. */
  hintFromPricing: string;
  holdInstructions: string;
  holdAriaLabel: string;
  ownerLabel: string;
  files: { id: string; name: string }[];
  previewAssets: { src: string; alt: string }[];
  unlockedCtaLabel: string;
  /** aria-label da galeria de preview (leitor de tela). */
  galleryAriaLabel: string;
}

/** Tag de rastreamento — zero ou mais por Produto, nunca compartilhada entre Produtos. */
export interface TrackingTag {
  type: "meta_pixel" | "google_ads";
  id: string;
  /**
   * Google Ads apenas — rótulo da conversion action (`AW-XXX/label`). Quando
   * presente, todo clique num CTA de checkout dispara `gtag('event',
   * 'conversion', { send_to: conversionLabel, ... })` em vez do evento
   * genérico `begin_checkout`.
   */
  conversionLabel?: string;
}

/** Idioma, moeda e disclaimers legais — sempre config do Produto, nunca fixo na Base. */
export interface LocaleConfig {
  /** BCP-47, ex. "en-US". */
  language: string;
  /** Ex. "en_US" — usado em `og:locale`. */
  ogLocale: string;
  /** ISO 4217, ex. "USD". */
  currency: string;
  /** Obrigatório e bloqueante no build (exigência FTC). */
  affiliateDisclosure: string;
  /** Opcional — ativado quando a categoria do Produto exigir (ex. suplemento). */
  categoryDisclaimers?: string[];
}

export interface SeoConfig {
  title: string;
  description: string;
  ogImage: string;
  url: string;
  themeColor?: string;
}

export interface TrustChip {
  label: string;
  detail?: string;
}

export interface TrustContent {
  eyebrow?: string;
  title?: string;
  items: TrustChip[];
}

export interface HighlightItem {
  title: string;
  body: string;
}

export interface HighlightsContent {
  eyebrow?: string;
  title: string;
  lead?: string;
  attribution?: string;
  items: HighlightItem[];
}

export interface RitualStep {
  title: string;
  body: string;
}

export interface RitualContent {
  eyebrow?: string;
  title: string;
  lead?: string;
  steps: RitualStep[];
}

export interface CompareRow {
  label: string;
  us: string;
  them: string;
}

export interface CompareContent {
  eyebrow?: string;
  title: string;
  lead?: string;
  usLabel: string;
  themLabel: string;
  rows: CompareRow[];
}

export interface GuaranteeBonus {
  title: string;
  body?: string;
}

export interface GuaranteeContent {
  eyebrow?: string;
  title: string;
  body: string;
  note?: string;
  bonuses?: GuaranteeBonus[];
  ctaLabel?: string;
}

export interface MidCtaContent {
  eyebrow?: string;
  title: string;
  body?: string;
  ctaLabel?: string;
}

export interface HeroContent {
  eyebrowLine1: string;
  hudTag: string;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  microcopy: string;
  productImage: { src: string; alt: string };
  /** Chips de confiança no Hero (review). Omitir em sales. */
  chips?: TrustChip[];
}

export interface FooterContent {
  brandName: string;
  tagline: string;
  ctaLabel: string;
  microcopy: string;
}

export interface StickyCtaContent {
  label: string;
}

/**
 * Página-popup — módulo opcional da Base: uma segunda página estática da mesma
 * Instância, servida num path próprio, com uma única decisão na tela (o popup)
 * sobre uma réplica desfocada da página de checkout. Estratégia diferente da
 * página de review, que é a raiz do domínio.
 *
 * A origem do clique viaja pro checkout no parâmetro `sourceParam` — o valor
 * vem do querystring da própria página (ex. `/alphasurge?src=PopUp`) e cai em
 * `defaultSource` quando ausente, de forma que a mesma página serve várias
 * criações de anúncio com origens distintas.
 *
 * A réplica de fundo é montada a partir do que já existe no config (nome do
 * Produto e `plans`) — só a copy que não existe em nenhum outro lugar entra aqui.
 */
export interface PopupGateConfig {
  /** Segmento de path onde a página é publicada, sem barras. Ex.: "alphasurge" -> `/alphasurge`. */
  path: string;
  /** Nome do parâmetro de origem, lido da URL da página e repassado ao checkout. */
  sourceParam: string;
  /** Valor assumido quando a URL não traz o parâmetro de origem. */
  defaultSource: string;
  /** Link de afiliado de destino — o mesmo da página de review. */
  checkoutHref: string;
  title: string;
  body: string;
  ctaLabel: string;
  /** Link secundário discreto — mesma ação do CTA (decisão do usuário). */
  closeLabel: string;
  /** Cores da página, independentes dos tokens do Produto (imitam o checkout do fornecedor). */
  colors: {
    /** Barra/superfícies escuras. */
    dark: string;
    /** Cor de ação (CTA, fita, destaques). */
    accent: string;
  };
  backdrop: {
    /** Chamada da fita amarela, no topo da réplica de checkout. */
    headline: string;
    /** Linha de reforço abaixo dos cards (garantia/frete). */
    reassurance: string;
    /** Label do botão dos cards da réplica (decorativo, não clicável). */
    cardCtaLabel: string;
  };
}

export interface ProductConfig {
  slug: string;
  productName: string;
  domain: string;
  locale: LocaleConfig;
  tokens: DesignTokens;
  seo: SeoConfig;
  hero: HeroContent;
  /** Omitido = `"sales"`. */
  layout?: PageLayout;
  /** Obrigatório em layout `review`. Ignorado em `sales`. */
  outboundCta?: OutboundCta;
  /** Ordem das seções opcionais. `"pricing"` é obrigatório em `sales` e proibido em `review`. Hero e rodapé são sempre fixos. */
  sections: SectionId[];
  pricing?: PricingContent;
  plans?: Plan[];
  spokesperson?: Spokesperson;
  powerGrid?: PowerGridContent;
  techMechanism?: TechMechanismContent;
  testimonials?: TestimonialsContent;
  faq?: FaqContent;
  leadCapture?: LeadCaptureConfig;
  restrictedArea?: RestrictedAreaContent;
  pain?: EditorialBlock;
  research?: EditorialBlock;
  officialClaims?: EditorialBlock;
  verdict?: EditorialBlock;
  trust?: TrustContent;
  highlights?: HighlightsContent;
  ritual?: RitualContent;
  compare?: CompareContent;
  guarantee?: GuaranteeContent;
  midCta?: MidCtaContent;
  trackingTags: TrackingTag[];
  footer: FooterContent;
  stickyCta: StickyCtaContent;
  /** Página-popup opcional, publicada num path próprio da mesma Instância. */
  popupGate?: PopupGateConfig;
}

/** Ligações entre uma seção opcional e o campo do config que precisa estar presente pra ela renderizar. */
const SECTION_DEPENDENCY: Record<OptionalSectionId, keyof ProductConfig> = {
  manifesto: "spokesperson",
  "power-grid": "powerGrid",
  "tech-mechanism": "techMechanism",
  testimonials: "testimonials",
  faq: "faq",
  "lead-capture": "leadCapture",
  restricted: "restrictedArea",
  pain: "pain",
  research: "research",
  "official-claims": "officialClaims",
  verdict: "verdict",
  trust: "trust",
  highlights: "highlights",
  ritual: "ritual",
  compare: "compare",
  guarantee: "guarantee",
  "mid-cta": "midCta",
};

export function resolveLayout(config: ProductConfig): PageLayout {
  return config.layout ?? "sales";
}

export class ProductConfigError extends Error {}

/**
 * Valida um ProductConfig antes do build. Lança `ProductConfigError` (falha o build)
 * quando um campo obrigatório está ausente ou quando uma seção opcional está listada
 * em `sections` sem o conteúdo correspondente configurado.
 */
export function validateProductConfig(config: ProductConfig): void {
  const missing: string[] = [];

  if (!config.slug) missing.push("slug");
  if (!config.productName) missing.push("productName");
  if (!config.locale?.language) missing.push("locale.language");
  if (!config.locale?.currency) missing.push("locale.currency");
  if (!config.locale?.affiliateDisclosure?.trim()) {
    missing.push("locale.affiliateDisclosure");
  }

  (Object.keys(config.tokens ?? {}) as (keyof DesignTokens)[]).length !== 6 &&
    missing.push("tokens (background, surface, textPrimary, textMuted, accent, accentDark)");

  const layout = resolveLayout(config);

  if (layout === "review") {
    if (!config.outboundCta?.label?.trim()) missing.push("outboundCta.label");
    if (!config.outboundCta?.href?.trim()) missing.push("outboundCta.href");
    if ((config.plans?.length ?? 0) > 0) {
      missing.push('plans não é permitido quando layout é "review"');
    }
    if (config.sections?.includes("pricing")) {
      missing.push('sections não pode incluir "pricing" quando layout é "review"');
    }
  } else {
    if (!config.plans || config.plans.length < 1) missing.push("plans (mínimo 1)");
    if (!config.sections?.includes("pricing")) {
      missing.push('sections deve incluir "pricing"');
    }

    const recommendedCount = (config.plans ?? []).filter((p) => p.recommended).length;
    if (recommendedCount > 1) {
      missing.push("plans: no máximo 1 plano marcado como recommended");
    }
  }

  const gate = config.popupGate;
  if (gate) {
    if (!gate.path?.trim() || gate.path.includes("/")) {
      missing.push("popupGate.path (um único segmento de path, sem barras)");
    }
    if (!gate.checkoutHref?.trim()) missing.push("popupGate.checkoutHref");
    if (!gate.sourceParam?.trim()) missing.push("popupGate.sourceParam");
    if (!gate.defaultSource?.trim()) missing.push("popupGate.defaultSource");
  }

  for (const id of config.sections ?? []) {
    if (id === "pricing") continue;
    const dependency = SECTION_DEPENDENCY[id as OptionalSectionId];
    if (dependency && !config[dependency]) {
      missing.push(`sections inclui "${id}" sem o bloco de conteúdo correspondente`);
    }
  }

  if (missing.length > 0) {
    throw new ProductConfigError(
      `Produto "${config.slug || "?"}" com config inválida — campos ausentes:\n` +
        missing.map((m) => `  - ${m}`).join("\n"),
    );
  }
}
