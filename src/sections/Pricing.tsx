import { BorderBeamWrapper } from "@/components/border-beam";
import { MagneticButton } from "@/components/magnetic-button";
import { ProductGlow } from "@/components/product-glow";
import { handleCheckoutClick } from "@/lib/checkout-tracking";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface Plan {
  id: string;
  hudLabel: string;
  name: string;
  image: string;
  price: string;
  perUnit: string;
  description: string;
  features: string[];
  recommended: boolean;
  ctaLabel: string;
  href: string;
  value: number;
}

const CHECKOUT = {
  single:
    "https://pay.braip.co/ref?pl=plalx6jk&ck=cherxvrv&af=afi9eg2nj2",
  triple:
    "https://pay.braip.co/ref?pl=plagoemg&ck=cherxvrv&af=afi9eg2nj2",
  arsenal:
    "https://pay.braip.co/ref?pl=plavx2pj&ck=cherxvrv&af=afi9eg2nj2",
} as const;

const plans: Plan[] = [
  {
    id: "single",
    hudLabel: "KIT::01",
    name: "1 Pote",
    image: "/imagens/1 POTE.png",
    price: "R$ 97",
    perUnit: "R$ 97/pote",
    description: "Teste o protocolo. Veja se aguenta.",
    features: ["30 cápsulas", "Embalagem discreta", "Garantia 7 dias"],
    recommended: false,
    ctaLabel: "Testar o protocolo",
    href: CHECKOUT.single,
    value: 97,
  },
  {
    id: "triple",
    hudLabel: "KIT::03",
    name: "3 Potes",
    image: "/imagens/3 POTES.png",
    price: "R$ 237",
    perUnit: "R$ 79/pote",
    description: "O kit que a Vee indica. Pra quem não quer testar na hora H.",
    features: [
      "90 cápsulas",
      "Frete grátis · discreto",
      "Garantia 30 dias",
      "Resultados em dias, não meses",
    ],
    recommended: true,
    ctaLabel: "Garantir agora",
    href: CHECKOUT.triple,
    value: 237,
  },
  {
    id: "arsenal",
    hudLabel: "KIT::05",
    name: "5 Potes",
    image: "/imagens/5 POTES.png",
    price: "R$ 347",
    perUnit: "R$ 69/pote",
    description: "Arsenal completo. Máximo desconto, zero desculpa.",
    features: [
      "150 cápsulas",
      "Frete grátis · discreto",
      "Garantia 60 dias",
      "Protocolo longo prazo",
    ],
    recommended: false,
    ctaLabel: "Montar arsenal",
    href: CHECKOUT.arsenal,
    value: 347,
  },
];

const recommended = plans.find((p) => p.recommended)!;
const satellites = plans.filter((p) => !p.recommended);

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
            alt={`Kit ${plan.name} — Energi Power`}
            className="h-20 w-auto object-contain sm:h-24"
          />
        </ProductGlow>

        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red/75">
            {plan.hudLabel}
          </p>
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
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-cyber-muted/80">
            {plan.perUnit}
          </span>
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

function RecommendedPlanCard({ plan }: { plan: Plan }) {
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
            "radial-gradient(ellipse 70% 55% at 72% 28%, rgba(196, 30, 58, 0.14), transparent 60%)",
        }}
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10 xl:gap-14">
        <div className="flex shrink-0 justify-center lg:w-[42%] lg:justify-end">
          <ProductGlow className="w-full max-w-[280px] lg:max-w-none">
            <img
              src={plan.image}
              alt={`Kit ${plan.name} — Energi Power`}
              className="mx-auto h-44 w-auto object-contain sm:h-52 lg:h-56 xl:h-64"
            />
          </ProductGlow>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blood-red/85 sm:text-xs">
              {plan.hudLabel} · recommended
            </p>
            <span className="rounded-full border border-blood-red/55 bg-blood-red/8 px-3 py-1 font-display text-[10px] uppercase tracking-wider text-blood-red sm:text-xs">
              O que a Vee usa
            </span>
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
            <span className="pb-1 font-mono text-xs uppercase tracking-wider text-cyber-muted">
              {plan.perUnit}
            </span>
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
              <span className={cn(ctaClassName, "sm:min-w-[220px]")}>
                {plan.ctaLabel}
              </span>
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

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="pricing" className="section-block bg-cyber-darker px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="section-eyebrow mb-5">O Ultimato</p>
              <h2 className="section-title">Prove que aguenta</h2>
              <p className="section-lead mt-5">
                Três kits. Uma decisão. O de 3 potes é o que a Vee indica — o
                resto é teste ou arsenal.
              </p>
            </div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyber-muted/55 lg:pb-1 lg:text-right"
              aria-hidden
            >
              checkout · discreet_ship · batch EP-vee
            </p>
          </div>

          <motion.div
            ref={gridRef}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5"
          >
            {/* Hero — primeiro no mobile */}
            <div className="order-1 lg:order-2 lg:col-span-7 lg:row-span-2">
              <BorderBeamWrapper className="h-full" duration={5} beamSize={120}>
                <RecommendedPlanCard plan={recommended} />
              </BorderBeamWrapper>
            </div>

            {satellites.map((plan, index) => (
              <div
                key={plan.id}
                className={cn(
                  "lg:col-span-5",
                  index === 0 ? "order-2 lg:order-1" : "order-3 lg:order-3",
                )}
              >
                <SatellitePlanCard plan={plan} />
              </div>
            ))}
          </motion.div>

          <p
            id="restricted-hint"
            className="mx-auto mt-12 max-w-md text-center font-mono text-[10px] tracking-wide text-cyber-muted/45 sm:mt-14 sm:text-xs"
          >
            // Quem chegar até o fim da página descobre o que a Vee guardou além das cápsulas.
          </p>
        </div>
      </section>
    </>
  );
}
