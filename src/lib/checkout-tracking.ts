import type { MouseEvent } from "react";
import { trackInitiateCheckout, type CheckoutPixelPayload } from "@/lib/meta-pixel";

export function handleCheckoutClick(
  event: MouseEvent<HTMLAnchorElement>,
  payload: CheckoutPixelPayload,
) {
  event.preventDefault();
  trackInitiateCheckout(payload);
}

/**
 * Clique em hop / página oficial (layout review). Não dispara
 * InitiateCheckout nem conversion de checkout — a navegação padrão do `<a>` segue.
 */
export function handleOutboundClick(
  _event: MouseEvent<HTMLAnchorElement>,
  _href: string,
) {
  // Intencionalmente vazio: sem preventDefault, sem pixel de checkout.
}
