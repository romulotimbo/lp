import { BorderBeamWrapper } from "@/components/border-beam";
import { MagneticButton } from "@/components/magnetic-button";
import { ProductGlow } from "@/components/product-glow";
import { handleCheckoutClick } from "@/lib/checkout-tracking";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { product } from "@/product/active";
import type { Plan } from "@/product/types";

function HudFeatureList({
  features,
  className,
}: {
  features: string[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-2", className)}>
      {features.map((feature) => (
        <li
          key={feature}
          className="flex items-baseline gap-3 text-sm leading-snug text-cyber-muted"
        >
          <span
            className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-blood-red/70"
            aria-hidden
          >
            //
          </span>
          {feature}
        </li>
      ))}
    </ul>
  );
}

function SatellitePlanCard({ plan }: { plan: Plan }) {
  const ctaClassName = cn(
    "mt-5 inline-flex w-full min-h-11 items-center justify-center rounded-lg border border-blood-red/40 px-5 py-2.5 text-center font-display text-xs uppercase tracking-wider text-blood-red transition-[background-color,border-color,transform] duration-300 hover:border-blood-red/65 hover:bg-blood-red/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-red/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker active:scale-[0.98] sm:text-sm",
  );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cyber-graphite/80 bg-cyber-graphite/45 p-5 transition-[border-color,background-color] duration-300 hover:border-cyber-graphite hover:bg-cyber-graphite/65 sm:p-6">
      <div className="flex items-start gap-4 sm:gap-5">
        <ProductGlow className="shrink-0">
          <img
            src={plan.image}
            alt={plan.imageAlt}
            className="h-20 w-auto object-contain sm:h-24"
          />
        </ProductGlow>

        <div className="min-w-0 flex-1">
          {plan.hudLabel ? (
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red/75">
              {plan.hudLabel}
            </p>
          ) : null}
          <h3 className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-cyber-titanium sm:text-2xl">
            {plan.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-cyber-muted">
            {plan.description}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-cyber-graphite/70 pt-5">
        <div>
          <span className="font-display text-3xl font-bold tabular-nums text-cyber-titanium">
            {plan.price}
          </span>
          {plan.perUnit ? (
            <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-cyber-muted/80">
              {plan.perUnit}
            </span>
          ) : null}
        </div>
      </div>

      <p className="mt-3 font-mono text-[10px] leading-relaxed uppercase tracking-wide text-cyber-muted/75">
        {plan.features.slice(0, 2).join(" · ")}
      </p>

      <a
        href={plan.href}
        rel="noopener noreferrer"
        onClick={(e) =>
          handleCheckoutClick(e, {
            planId: plan.id,
            planName: plan.name,
            value: plan.value,
            url: plan.href,
          })
        }
        className={ctaClassName}
      >
        {plan.ctaLabel}
      </a>
    </article>
  );
}

function RecommendedPlanCard({ plan, badge }: { plan: Plan; badge?: string }) {
  const ctaClassName = cn(
    "block w-full min-h-12 rounded-lg bg-blood-red px-8 py-3 text-center font-display text-sm uppercase tracking-wider text-cyber-titanium transition-[background-color,transform] duration-300 hover:bg-blood-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-graphite active:scale-[0.98]",
  );

  return (
    <div className="relative flex h-full flex-col overflow-hidden p-6 sm:p-8 lg:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 72% 28%, rgb(var(--color-accent) / 0.14), transparent 60%)",
        }}
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10 xl:gap-14">
        <div className="flex shrink-0 justify-center lg:w-[42%] lg:justify-end">
          <ProductGlow className="w-full max-w-[280px] lg:max-w-none">
            <img
              src={plan.image}
              alt={plan.imageAlt}
              className="mx-auto h-44 w-auto object-contain sm:h-52 lg:h-56 xl:h-64"
            />
          </ProductGlow>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-3">
            {plan.hudLabel ? (
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blood-red/85 sm:text-xs">
                {plan.hudLabel}
                {badge ? " · recommended" : ""}
              </p>
            ) : null}
            {badge ? (
              <span className="rounded-full border border-blood-red/55 bg-blood-red/8 px-3 py-1 font-display text-[10px] uppercase tracking-wider text-blood-red sm:text-xs">
                {badge}
              </span>
            ) : null}
          </div>

          <h3 className="mt-4 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-cyber-titanium sm:text-4xl">
            {plan.name}
          </h3>
          <p className="mt-3 max-w-md text-base leading-relaxed text-cyber-muted">
            {plan.description}
          </p>

          <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-2">
            <span className="font-display text-5xl font-bold tabular-nums leading-none text-cyber-titanium sm:text-6xl">
              {plan.price}
            </span>
            {plan.perUnit ? (
              <span className="pb-1 font-mono text-xs uppercase tracking-wider text-cyber-muted">
                {plan.perUnit}
              </span>
            ) : null}
          </div>

          <HudFeatureList features={plan.features} className="mt-7" />

          <div className="mt-8 lg:mt-10">
            <MagneticButton
              href={plan.href}
              rel="noopener noreferrer"
              onClick={(e) =>
                handleCheckoutClick(e, {
                  planId: plan.id,
                  planName: plan.name,
                  value: plan.value,
                  url: plan.href,
                })
              }
              className="w-full sm:w-auto"
            >
              <span className={cn(ctaClassName, "sm:min-w-[220px]")}>{plan.ctaLabel}</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-8% 0px" });

  const { plans, spokesperson, pricing } = product;
  if (!plans?.length || !pricing) return null;

  const recommended =
    plans.length === 1 ? plans[0] : plans.find((p) => p.recommended);
  const satellites = recommended ? plans.filter((p) => p.id !== recommended.id) : plans;
  const badge = recommended && plans.length > 1 ? spokesperson?.recommendationBadge : undefined;

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="pricing" className="section-block bg-cyber-darker px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="section-eyebrow mb-5">{pricing.eyebrow}</p>
              <h2 className="section-title">{pricing.title}</h2>
              <p className="section-lead mt-5">{pricing.lead}</p>
            </div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyber-muted/55 lg:pb-1 lg:text-right"
              aria-hidden
            >
              {pricing.tag}
            </p>
          </div>

          <motion.div
            ref={gridRef}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "grid grid-cols-1 gap-4 lg:gap-5",
              recommended && satellites.length > 0 && "lg:grid-cols-12",
              !recommended && "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {recommended ? (
              <div
                className={cn(
                  "order-1",
                  satellites.length > 0 ? "lg:order-2 lg:col-span-7" : "",
                )}
              >
                <BorderBeamWrapper className="h-full" duration={5} beamSize={120}>
                  <RecommendedPlanCard plan={recommended} badge={badge} />
                </BorderBeamWrapper>
              </div>
            ) : null}

            {satellites.length > 0 ? (
              <div
                className={cn(
                  "order-2 flex flex-col gap-4",
                  recommended ? "lg:order-1 lg:col-span-5" : "contents",
                )}
              >
                {satellites.map((plan) => (
                  <SatellitePlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            ) : null}
          </motion.div>

          {product.sections.includes("restricted") ? (
            <p
              id="restricted-hint"
              className="mx-auto mt-12 max-w-md text-center font-mono text-[10px] tracking-wide text-cyber-muted/45 sm:mt-14 sm:text-xs"
            >
              // {product.restrictedArea?.hintFromPricing}
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
