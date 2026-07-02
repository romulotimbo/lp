const CHECKOUT_REDIRECT_MS = 800;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export interface CheckoutPixelPayload {
  planId: string;
  planName: string;
  value: number;
  url: string;
}

function isFbqReady(): boolean {
  return typeof window.fbq === "function";
}

export function trackInitiateCheckout(payload: CheckoutPixelPayload): void {
  const redirect = () => {
    window.location.assign(payload.url);
  };

  if (!isFbqReady()) {
    redirect();
    return;
  }

  let redirected = false;
  const go = () => {
    if (redirected) return;
    redirected = true;
    redirect();
  };

  window.setTimeout(go, CHECKOUT_REDIRECT_MS);

  window.fbq!(
    "track",
    "InitiateCheckout",
    {
      content_ids: [payload.planId],
      content_name: payload.planName,
      content_type: "product",
      num_items: 1,
      value: payload.value,
      currency: "BRL",
    },
    { event_callback: go },
  );
}
