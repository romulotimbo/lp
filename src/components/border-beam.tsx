import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderRadius?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

/**
 * Feixe laser único percorrendo o perímetro (offset-path), estilo 21st.dev.
 * Visível apenas na faixa de borda — o filho sólido do wrapper cobre o centro.
 */
export function BorderBeam({
  className,
  size = 100,
  duration = 5,
  borderRadius = 16,
  colorFrom = "#C41E3A",
  colorTo = "#8B0000",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] motion-reduce:hidden",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute animate-border-beam"
        style={
          {
            width: size,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
            boxShadow: `0 0 12px ${colorFrom}, 0 0 24px rgba(196, 30, 58, 0.35)`,
            offsetPath: `rect(0 auto auto 0 round ${borderRadius}px)`,
            offsetRotate: "auto",
            offsetAnchor: "center",
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

interface BorderBeamWrapperProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  beamSize?: number;
}

export function BorderBeamWrapper({
  children,
  className,
  duration = 5,
  beamSize = 100,
}: BorderBeamWrapperProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-[2px] motion-reduce:p-0",
        className,
      )}
    >
      <BorderBeam duration={duration} size={beamSize} borderRadius={16} />
      <div className="relative rounded-[14px] bg-cyber-graphite">{children}</div>
    </div>
  );
}
