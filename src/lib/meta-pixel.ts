import { product } from "@/product/active";

const CHECKOUT_REDIRECT_MS = 800;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export interface CheckoutPixelPayload {
  planId: string;
  planName: string;
  value: number;
  url: string;
}

/**
 * Dispara o evento de checkout-iniciado em cada Tag de rastreamento configurada
 * pelo Produto (Meta Pixel, Google Ads, ...) antes de redirecionar pro link de
 * checkout. Genérico na Base — a lista de tags vem do ProductConfig.
 */
export function trackInitiateCheckout(payload: CheckoutPixelPayload): void {
  const tags = product.trackingTags ?? [];
  const redirect = () => {
    window.location.assign(payload.url);
  };

  const metaPixel = tags.find((t) => t.type === "meta_pixel");
  const googleAds = tags.find((t) => t.type === "google_ads");
  const hasMetaPixel = Boolean(metaPixel) && typeof window.fbq === "function";
  const hasGoogleAds = Boolean(googleAds) && typeof window.gtag === "function";

  if (!hasMetaPixel && !hasGoogleAds) {
    redirect();
    return;
  }

  let redirected = false;
  const go = () => {
    if (redirected) return;
    redirected = true;
    redirect();
  };

  // Fallback: se nenhum event_callback disparar (bloqueador de rastreamento,
  // rede lenta, etc.), redireciona mesmo assim.
  window.setTimeout(go, CHECKOUT_REDIRECT_MS);

  if (hasMetaPixel) {
    window.fbq!(
      "track",
      "InitiateCheckout",
      {
        content_ids: [payload.planId],
        content_name: payload.planName,
        content_type: "product",
        num_items: 1,
        value: payload.value,
        currency: product.locale.currency,
      },
      { event_callback: go },
    );
  }

  if (hasGoogleAds && googleAds) {
    if (googleAds.conversionLabel) {
      // Conversion action específica (Google Ads) — dispara no clique de
      // qualquer CTA de checkout, antes do redirect.
      window.gtag!("event", "conversion", {
        send_to: googleAds.conversionLabel,
        value: payload.value,
        currency: product.locale.currency,
        event_callback: go,
      });
    } else {
      // Sem conversion label configurada: só o evento genérico de e-commerce.
      window.gtag!("event", "begin_checkout", {
        currency: product.locale.currency,
        value: payload.value,
        items: [{ item_id: payload.planId, item_name: payload.planName }],
      });
      if (!hasMetaPixel) go();
    }
  }
}
