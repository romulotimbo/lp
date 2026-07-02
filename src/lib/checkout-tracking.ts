import type { MouseEvent } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function handleCheckoutClick(
  event: MouseEvent<HTMLAnchorElement>,
  url: string,
) {
  event.preventDefault();

  if (typeof window.fbq === "function") {
    window.fbq("track", "InitiateCheckout");
  }

  window.location.assign(url);
}
