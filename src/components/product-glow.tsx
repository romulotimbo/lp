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
        className={cn(
          "relative",
          "[&_img]:[filter:drop-shadow(0_0_8px_rgba(196,30,58,0.65))_drop-shadow(0_0_20px_rgba(196,30,58,0.38))_drop-shadow(0_0_44px_rgba(196,30,58,0.14))_drop-shadow(0_22px_36px_rgba(0,0,0,0.72))]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
