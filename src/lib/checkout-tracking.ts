import type { MouseEvent } from "react";
import { trackInitiateCheckout, type CheckoutPixelPayload } from "@/lib/meta-pixel";

export function handleCheckoutClick(
  event: MouseEvent<HTMLAnchorElement>,
  payload: CheckoutPixelPayload,
) {
  event.preventDefault();
  trackInitiateCheckout(payload);
}
