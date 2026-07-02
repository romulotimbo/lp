export interface VaultWaitlistResponse {
  ok: boolean;
  alreadyRegistered?: boolean;
  message?: string;
  error?: string;
}

export async function submitVaultWaitlist(
  email: string,
): Promise<VaultWaitlistResponse> {
  const res = await fetch("/api/vault/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, website: "" }),
  });

  const data = (await res.json()) as VaultWaitlistResponse;

  if (!res.ok && !data.error) {
    return { ok: false, error: "Falha ao registrar. Tente novamente." };
  }

  return data;
}
