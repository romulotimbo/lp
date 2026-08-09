import { PowerPillarCard } from "@/components/power-pillar-card";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { product } from "@/product/active";

/** Seção opcional "mecanismo" — só montada quando `powerGrid` está configurado (ver product/registry.tsx). */
export function PowerGrid() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const config = product.powerGrid;
  if (!config) return null;

  return (
    <section id="power" className="section-block relative overflow-hidden bg-cyber-black px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgb(var(--color-accent) / 0.1), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col gap-5 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="section-eyebrow mb-5">{config.eyebrow}</p>
            <h2 className="section-title">{config.title}</h2>
            <p className="section-lead mt-5 max-w-xl">{config.lead}</p>
          </div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyber-muted/55 lg:pb-1 lg:text-right"
            aria-hidden
          >
            {config.telemetryTag}
          </p>
        </motion.div>

        <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-3 md:grid-cols-6 md:auto-rows-[minmax(180px,auto)] md:gap-4">
          {config.pillars.map((pillar, index) => (
            <PowerPillarCard key={pillar.id} pillar={pillar} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 border-t border-blood-red/15 pt-8 lg:mt-14 lg:pt-10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div className="max-w-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red/70">
                {config.nextStepTag}
              </p>
              <p className="mt-3 text-base leading-relaxed text-cyber-muted sm:text-lg">
                {config.convergenceCopy}
              </p>
            </div>
            <a href="#pricing" className="btn-primary shrink-0 sm:min-w-[220px]">
              {config.ctaLabel}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
