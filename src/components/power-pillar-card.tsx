import { useRef, type ElementType, type MouseEvent } from "react";
import {
  motion,
  useInView,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface PowerPillar {
  id: string;
  hudLabel: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  telemetry: number;
  icon: ElementType<{ className?: string; strokeWidth?: number }>;
  className?: string;
  featured?: boolean;
  image?: string;
  /** PNG de produto (cut-out) vs textura de fundo */
  imageFit?: "product" | "texture";
}

function HudBracket({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute h-4 w-4 border-blood-red/45",
        className,
      )}
      aria-hidden
    />
  );
}

function TelemetryBar({
  value,
  inView,
}: {
  value: number;
  inView: boolean;
}) {
  return (
    <div className="mt-4 space-y-1.5">
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-cyber-muted/70">
        <span>signal</span>
        <span>{value}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-cyber-black/80">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blood-dark via-blood-red to-blood-red"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${value}%` : 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </div>
    </div>
  );
}

export function PowerPillarCard({
  pillar,
  index,
}: {
  pillar: PowerPillar;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const Icon = pillar.icon;
  const progress = useSpring(0, { stiffness: 90, damping: 22 });
  if (inView) progress.set(pillar.telemetry);

  const statScale = useTransform(progress, [0, pillar.telemetry], [0.92, 1]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className={cn(
        "spotlight-border group relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl border border-[0.5px] border-cyber-graphite/90 bg-cyber-darker p-6 transition-shadow duration-300 md:min-h-[220px]",
        pillar.featured &&
          "md:min-h-0 md:shadow-[inset_0_0_48px_rgba(196,30,58,0.08)] md:ring-1 md:ring-blood-red/20",
        pillar.className,
      )}
    >
      {pillar.image && (
        <>
          <img
            src={pillar.image}
            alt=""
            aria-hidden
            className={cn(
              "pointer-events-none absolute transition-opacity duration-300",
              pillar.imageFit === "product"
                ? "bottom-0 right-0 h-[58%] w-[min(88%,280px)] object-contain object-bottom opacity-[0.42] saturate-[0.85] drop-shadow-[0_8px_32px_rgba(196,30,58,0.25)] group-hover:opacity-[0.52] sm:h-[62%]"
                : "inset-0 h-full w-full object-cover opacity-[0.22] saturate-[0.35] group-hover:opacity-[0.28]",
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              pillar.imageFit === "product"
                ? "bg-gradient-to-t from-cyber-darker via-cyber-darker/92 to-cyber-darker/55"
                : "bg-gradient-to-t from-cyber-darker via-cyber-darker/85 to-cyber-darker/40",
            )}
            aria-hidden
          />
        </>
      )}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(196,30,58,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(196,30,58,0.6) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />

      <HudBracket className="left-3 top-3 border-l border-t" />
      <HudBracket className="right-3 top-3 border-r border-t" />
      <HudBracket className="bottom-3 left-3 border-b border-l" />
      <HudBracket className="bottom-3 right-3 border-b border-r" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red/80 sm:text-xs">
            {pillar.hudLabel}
          </p>
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-lg border border-[0.5px] border-blood-red/35 bg-cyber-black/75",
              pillar.featured ? "h-12 w-12" : "h-10 w-10",
            )}
          >
            <Icon
              className={cn(
                "text-blood-red",
                pillar.featured ? "h-6 w-6" : "h-5 w-5",
              )}
              strokeWidth={1.5}
            />
          </div>
        </div>

        <motion.div style={{ scale: pillar.featured ? statScale : 1 }}>
          <p
            className={cn(
              "font-display font-bold leading-none text-blood-red",
              pillar.featured
                ? "text-6xl tracking-tight sm:text-7xl"
                : "text-4xl sm:text-5xl",
            )}
          >
            {pillar.stat}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-cyber-muted sm:text-xs">
            {pillar.statLabel}
          </p>
        </motion.div>

        <h3
          className={cn(
            "mt-5 font-display font-bold uppercase tracking-wide text-cyber-titanium",
            pillar.featured ? "text-3xl" : "text-xl",
          )}
        >
          {pillar.title}
        </h3>
        <p
          className={cn(
            "mt-2 leading-relaxed text-cyber-muted",
            pillar.featured ? "text-base" : "text-sm",
          )}
        >
          {pillar.description}
        </p>

        <div className="mt-auto pt-4">
          <TelemetryBar value={pillar.telemetry} inView={inView} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blood-red/8 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.article>
  );
}
