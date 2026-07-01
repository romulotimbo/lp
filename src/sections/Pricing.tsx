import { BorderBeamWrapper } from "@/components/border-beam";
import { MagneticButton } from "@/components/magnetic-button";
import { ProductGlow } from "@/components/product-glow";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const plans = [
  {
    name: "1 Pote",
    image: "/imagens/1 POTE.png",
    price: "R$ 97",
    perUnit: "R$ 97/pote",
    description: "Teste o protocolo. Veja se aguenta.",
    features: [
      "30 cápsulas",
      "Embalagem discreta",
      "Garantia 7 dias",
    ],
    recommended: false,
    href: "#",
  },
  {
    name: "3 Potes",
    image: "/imagens/3 POTES.png",
    price: "R$ 237",
    perUnit: "R$ 79/pote",
    description: "O kit que a Vee indica. Resultado consistente.",
    features: [
      "90 cápsulas",
      "Frete grátis · discreto",
      "Garantia 30 dias",
      "Resultados em dias, não meses",
    ],
    recommended: true,
    href: "#",
  },
  {
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
    href: "#",
  },
];

export function Pricing() {
  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="pricing" className="section-block bg-cyber-darker px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-xl lg:mb-20">
            <p className="section-eyebrow mb-5">O Ultimato</p>
            <h2 className="section-title">Prove que aguenta</h2>
            <p className="section-lead mt-5">
              Três kits. Uma decisão. Escolhe teu arsenal e mostra que merece.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan) => {
              const ctaClassName = cn(
                "block rounded-lg px-6 py-3 text-center font-display text-sm uppercase tracking-wider transition-[background-color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-graphite active:scale-[0.98]",
                plan.recommended
                  ? "bg-blood-red text-cyber-titanium hover:bg-blood-dark"
                  : "border border-blood-red/50 text-blood-red hover:border-blood-red hover:bg-blood-red/10",
              );

              const card = (
                <div
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-[14px] p-7 sm:p-8",
                    !plan.recommended &&
                      "border border-cyber-graphite/80 bg-cyber-graphite/80",
                  )}
                >
                  {plan.recommended && (
                    <span className="absolute right-4 top-4 rounded-full border border-blood-red/60 bg-blood-red/5 px-3 py-1 font-display text-xs uppercase tracking-wider text-blood-red">
                      O que a Vee usa
                    </span>
                  )}

                  <ProductGlow className="mb-6">
                    <img
                      src={plan.image}
                      alt={`Kit ${plan.name} — Energi Power`}
                      className="mx-auto h-36 w-auto object-contain sm:h-40"
                    />
                  </ProductGlow>

                  <h3 className="font-display text-2xl font-bold uppercase text-cyber-titanium">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-cyber-muted">{plan.description}</p>

                  <div className="my-6 border-b border-cyber-graphite/60 pb-6">
                    <span className="font-display text-4xl font-bold tabular-nums text-cyber-titanium">
                      {plan.price}
                    </span>
                    <span className="ml-2 text-sm text-cyber-muted/80">
                      {plan.perUnit}
                    </span>
                  </div>

                  <ul className="mb-8 flex flex-1 flex-col gap-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-cyber-muted"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-blood-red"
                          strokeWidth={2}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {plan.recommended ? (
                    <MagneticButton href={plan.href} className="w-full">
                      <span className={cn(ctaClassName, "block w-full")}>
                        Garantir agora
                      </span>
                    </MagneticButton>
                  ) : (
                    <a href={plan.href} className={cn(ctaClassName, "cursor-pointer")}>
                      Garantir agora
                    </a>
                  )}
                </div>
              );

              if (plan.recommended) {
                return (
                  <BorderBeamWrapper key={plan.name} className="h-full" duration={5}>
                    {card}
                  </BorderBeamWrapper>
                );
              }

              return <div key={plan.name}>{card}</div>;
            })}
          </div>

          <p
            id="restricted-hint"
            className="mx-auto mt-14 max-w-md text-center font-mono text-[10px] tracking-wide text-cyber-muted/45 sm:text-xs"
          >
            // Quem chegar até o fim da página pode ganhar mais do que cápsulas.
          </p>
        </div>
      </section>
    </>
  );
}
