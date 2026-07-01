import { cn } from "@/lib/utils";

interface HudFrameProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  flash?: boolean;
}

function HudCorner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute h-3 w-3 border-blood-red/50",
        className,
      )}
      aria-hidden
    />
  );
}

export function HudFrame({
  children,
  className,
  label = "HUD::ACTIVE",
  flash = false,
}: HudFrameProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[280px] items-center justify-center sm:min-h-[320px]",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl border border-[0.5px] border-cyber-graphite motion-safe:animate-hud-border-pulse",
          flash && "motion-safe:!animate-none !border-blood-red/60 !shadow-neon-red",
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(196,30,58,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(196,30,58,0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      {/* Cantoneiras HUD */}
      <HudCorner className="left-2 top-2 border-l border-t sm:left-3 sm:top-3" />
      <HudCorner className="right-2 top-2 border-r border-t sm:right-3 sm:top-3" />
      <HudCorner className="bottom-2 left-2 border-b border-l sm:bottom-3 sm:left-3" />
      <HudCorner className="bottom-2 right-2 border-b border-r sm:bottom-3 sm:right-3" />

      {/* Linha de scan vertical */}
      <div
        className="pointer-events-none absolute left-4 right-4 h-px bg-gradient-to-r from-transparent via-blood-red/50 to-transparent motion-safe:animate-hud-scan sm:left-6 sm:right-6"
        aria-hidden
      />

      {/* Label superior */}
      <div className="absolute left-4 top-4 flex items-center gap-1.5 font-mono text-[10px] text-blood-red/70 sm:left-6 sm:text-xs">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-blood-red motion-safe:animate-hud-blink"
          aria-hidden
        />
        <span>{label}</span>
      </div>

      {/* Readouts decorativos */}
      <div className="pointer-events-none absolute bottom-4 left-4 space-y-0.5 font-mono text-[9px] text-cyber-muted/40 sm:bottom-6 sm:left-6 sm:text-[10px]">
        <p>absorption_rate: optimal</p>
        <p>batch: EP-vee-004</p>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-[9px] text-cyber-muted/40 sm:bottom-6 sm:right-6 sm:text-[10px]">
        <p className="motion-safe:animate-hud-blink">rec ●</p>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
