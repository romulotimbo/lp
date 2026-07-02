import { useRef, type MouseEvent } from "react";
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
  moduleId: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  telemetry: number;
  className?: string;
  featured?: boolean;
  wide?: boolean;
  image?: string;
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
    <div className="space-y-1.5">
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-cyber-muted/70">
        <span>signal</span>
        <span>{value}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-cyber-black/80">
        <motion.div
          className="h-full w-full origin-left rounded-full bg-blood-red"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? value / 100 : 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </div>
    </div>
  );
}

function HudReadout({
  moduleId,
  featured,
}: {
  moduleId: string;
  featured?: boolean;
}) {
  return (
    <div className="flex shrink-0 flex-col items-end gap-0.5 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-cyber-muted/65">
      <span>{moduleId}</span>
      {featured ? (
        <span className="flex items-center gap-1.5 text-blood-red/90">
          <span className="inline-block h-1.5 w-1.5 animate-hud-blink rounded-full bg-blood-red" />
          rec
        </span>
      ) : (
        <span>standby</span>
      )}
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

  const progress = useSpring(0, { stiffness: 90, damping: 22 });
  if (inView) progress.set(pillar.telemetry);

  const statScale = useTransform(progress, [0, pillar.telemetry], [0.94, 1]);

  const statBlock = (
    <motion.div style={{ scale: pillar.featured || pillar.wide ? statScale : 1 }}>
      <p
        className={cn(
          "font-display font-bold leading-none text-blood-red",
          pillar.featured
            ? "text-6xl tracking-tight sm:text-7xl lg:text-8xl"
            : pillar.wide
              ? "text-5xl sm:text-6xl"
              : "text-4xl sm:text-5xl",
        )}
      >
        {pillar.stat}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-cyber-muted sm:text-xs">
        {pillar.statLabel}
      </p>
    </motion.div>
  );

  const copyBlock = (
    <>
      <h3
        className={cn(
          "font-display font-bold uppercase tracking-wide text-cyber-titanium",
          pillar.featured ? "text-3xl sm:text-4xl" : pillar.wide ? "text-2xl" : "text-xl",
        )}
      >
        {pillar.title}
      </h3>
      <p
        className={cn(
          "mt-2 leading-relaxed text-cyber-muted",
          pillar.featured ? "max-w-sm text-base" : pillar.wide ? "max-w-2xl text-sm sm:text-base" : "text-sm",
        )}
      >
        {pillar.description}
      </p>
    </>
  );

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
          "md:min-h-0 md:shadow-[inset_0_0_40px_rgba(196,30,58,0.06)] md:ring-1 md:ring-blood-red/15",
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
                : pillar.featured
                  ? "inset-0 h-full w-full object-cover object-[center_20%] opacity-[0.26] saturate-[0.4] group-hover:opacity-[0.32]"
                  : pillar.wide
                    ? "inset-0 h-full w-full object-cover object-right opacity-[0.18] saturate-[0.3] group-hover:opacity-[0.24]"
                    : "inset-0 h-full w-full object-cover opacity-[0.2] saturate-[0.35] group-hover:opacity-[0.26]",
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              pillar.wide
                ? "bg-gradient-to-r from-cyber-darker via-cyber-darker/92 to-cyber-darker/55"
                : "bg-gradient-to-t from-cyber-darker via-cyber-darker/88 to-cyber-darker/45",
            )}
            aria-hidden
          />
        </>
      )}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
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
        <div className="mb-5 flex items-start justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red/85 sm:text-xs">
            {pillar.hudLabel}
          </p>
          <HudReadout moduleId={pillar.moduleId} featured={pillar.featured} />
        </div>

        {pillar.wide ? (
          <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="shrink-0">{statBlock}</div>
            <div className="flex min-w-0 flex-1 flex-col md:pb-1">
              {copyBlock}
              <div className="mt-5 max-w-md">
                <TelemetryBar value={pillar.telemetry} inView={inView} />
              </div>
            </div>
          </div>
        ) : (
          <>
            {statBlock}
            <div className={cn("mt-5", pillar.featured && "mt-6 sm:mt-8")}>
              {copyBlock}
            </div>
            <div className="mt-auto pt-5">
              <TelemetryBar value={pillar.telemetry} inView={inView} />
            </div>
          </>
        )}
      </div>
    </motion.article>
  );
}
