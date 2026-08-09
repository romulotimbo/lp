import { cn } from "@/lib/utils";

interface ProductGlowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Glow vermelho colado na silhueta do PNG (drop-shadow segue o alpha).
 * Evita o disco radial desassociado do frasco.
 */
export function ProductGlow({ children, className }: ProductGlowProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className,
      )}
    >
      <div
        className="relative"
        style={{
          filter:
            "drop-shadow(0 0 8px rgb(var(--color-accent) / 0.65)) " +
            "drop-shadow(0 0 20px rgb(var(--color-accent) / 0.38)) " +
            "drop-shadow(0 0 44px rgb(var(--color-accent) / 0.14)) " +
            "drop-shadow(0 22px 36px rgba(0, 0, 0, 0.72))",
        }}
      >
        {children}
      </div>
    </div>
  );
}
