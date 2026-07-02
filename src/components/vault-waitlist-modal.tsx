import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { submitVaultWaitlist } from "@/lib/vault-waitlist";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type FormState = "idle" | "loading" | "success" | "error";

interface VaultWaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

export function VaultWaitlistModal({ open, onClose }: VaultWaitlistModalProps) {
  const titleId = useId();
  const descId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;

    setState("idle");
    setMessage("");
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;

    setState("loading");
    setMessage("");

    try {
      const result = await submitVaultWaitlist(email);
      if (result.ok) {
        if (typeof window.fbq === "function") {
          window.fbq("track", "Lead");
        }
        setState("success");
        setMessage(
          result.message ??
            "Presente reservado. A Vee avisa quando o pack estiver no ar.",
        );
        return;
      }
      setState("error");
      setMessage(result.error ?? "Não foi possível registrar.");
    } catch {
      setState("error");
      setMessage("Sem conexão com o servidor. Tente de novo.");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          role="presentation"
        >
          <button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-cyber-black/80 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-blood-red/35 bg-cyber-graphite shadow-lift-sm"
          >
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
              aria-hidden
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(196,30,58,0.5) 2px, rgba(196,30,58,0.5) 3px)",
              }}
            />

            <div className="relative z-10 border-b border-blood-red/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-blood-red/80 sm:px-6">
              vault_access · gift_queue · notify_pack
            </div>

            <div className="relative z-10 px-5 py-6 sm:px-6 sm:py-7">
              <p
                id={titleId}
                className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-cyber-titanium"
              >
                Presente da Vee
              </p>
              <p id={descId} className="mt-3 text-sm leading-relaxed text-cyber-muted">
                Deixa teu e-mail. Presente agora + aviso quando o pack exclusivo
                da Vee abrir.
              </p>

              {state === "success" ? (
                <div className="mt-6 rounded-lg border border-blood-red/30 bg-blood-red/8 px-4 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-blood-red/90">
                    status · queued
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-cyber-titanium">
                    {message}
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-primary mt-5 w-full"
                  >
                    Fechar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-cyber-muted">
                      E-mail
                    </span>
                    <input
                      ref={inputRef}
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full rounded-lg border border-cyber-graphite bg-cyber-darker px-4 py-3 font-body text-sm text-cyber-titanium outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-cyber-muted/50 focus:border-blood-red/50 focus:ring-2 focus:ring-blood-red/25"
                    />
                  </label>

                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden
                  />

                  {state === "error" && message ? (
                    <p className="text-sm text-blood-red" role="alert">
                      {message}
                    </p>
                  ) : null}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={state === "loading"}
                      className={cn(
                        "btn-primary w-full sm:flex-1",
                        state === "loading" && "opacity-70",
                      )}
                    >
                      {state === "loading" ? "Registrando…" : "Quero meu presente"}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-ghost w-full sm:w-auto"
                    >
                      Agora não
                    </button>
                  </div>
                </form>
              )}
            </div>

            <p className="relative z-10 border-t border-blood-red/10 px-5 py-3 text-center font-mono text-[10px] text-cyber-muted/45 sm:px-6">
              discreet_list · aes-256 · owner VEE
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
