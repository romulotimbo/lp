export interface LeadCaptureResponse {
  ok: boolean;
  alreadyRegistered?: boolean;
  message?: string;
  error?: string;
}

export async function submitLead(
  email: string,
  productSlug: string,
  source: string,
): Promise<LeadCaptureResponse> {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, product: productSlug, source, website: "" }),
  });

  const data = (await res.json()) as LeadCaptureResponse;

  if (!res.ok && !data.error) {
    return { ok: false, error: "Falha ao registrar. Tente novamente." };
  }

  return data;
}
