import { motion, useReducedMotion } from "motion/react";
import { OutboundLink } from "@/components/outbound-link";
import { cn } from "@/lib/utils";
import { product } from "@/product/active";
import { ReviewHeading } from "@/sections/review-heading";

function OfferSeal({ bottles }: { bottles: number }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <path
        d="M33.2 3.8c6.8.4 12.4 3.6 16.2 8.6 3.8 2.8 8.6 5.2 9.4 11.4.8 6.2-2.4 11.2-5.2 15.8-2.2 5.4-6.8 13.6-20.4 14.8C19.8 55.6 11 49.2 7.2 42.4 3.6 36.8 1.8 31.4 2.4 24.8c.6-6.6 5.2-11.4 10.6-14.8C18.8 6.4 26.4 3.4 33.2 3.8Z"
        fill="currentColor"
      />
      <path
        d="M32.4 14.2c8.6 0 15.2 6.2 15.2 15.4S41 45 32.4 45 17.2 38.8 17.2 29.6s6.6-15.4 15.2-15.4Z"
        fill="none"
        stroke="rgb(var(--color-background) / 0.42)"
        strokeWidth="1.2"
      />
      <text
        x="32.4"
        y="28.2"
        textAnchor="middle"
        fill="rgb(var(--color-background) / 0.92)"
        fontSize="13"
      >
        {bottles}
      </text>
      <text
        x="32.4"
        y="38.6"
        textAnchor="middle"
        fill="rgb(var(--color-background) / 0.72)"
        fontSize="6.4"
      >
        PK
      </text>
    </svg>
  );
}

export function Offer() {
  const config = product.offer;
  const cta = product.outboundCta;
  const reducedMotion = useReducedMotion();
  if (!config || config.packages.length === 0) return null;

  const label = config.ctaLabel ?? cta?.label;

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="offer" className="section-block px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <ReviewHeading eyebrow={config.eyebrow} title={config.title} lead={config.lead} />
          <p className="offer-ledger review-micro mt-4">
            <span>Prices as of {config.asOf}</span>
            <span className="offer-ledger-rule" aria-hidden />
            <span>
              {config.sourceLabel}. Confirm the live total on the official checkout.
            </span>
          </p>

          <ul className="offer-table mt-10">
            {config.packages.map((pack) => (
              <li
                key={pack.id}
                className={cn(
                  "offer-pack flex flex-col px-5 py-6",
                  pack.featured && "offer-pack--featured",
                )}
              >
                {pack.featured ? (
                  <motion.span
                    className="offer-seal"
                    aria-hidden
                    initial={reducedMotion ? false : { scale: 1.28, rotate: -16, y: -14 }}
                    whileInView={reducedMotion ? undefined : { scale: 1, rotate: -8, y: 0 }}
                    viewport={{ once: true, amount: 0.55 }}
                    transition={{ type: "spring", stiffness: 420, damping: 16 }}
                  >
                    <OfferSeal bottles={pack.bottles} />
                  </motion.span>
                ) : null}
                <p className="font-review-display text-lg font-semibold text-cyber-titanium">
                  {pack.name}
                </p>
                <p className="mt-1 text-sm text-cyber-muted">
                  {pack.bottles} {pack.bottles === 1 ? "bottle" : "bottles"} · {pack.supplyLabel}
                </p>
                <p className="mt-5 font-review-display text-3xl font-semibold tabular-nums text-cyber-titanium">
                  {pack.pricePerBottle}
                  <span className="ml-1 text-sm font-normal text-cyber-muted">/ bottle</span>
                </p>
                <p className="mt-2 text-sm text-cyber-muted">
                  {pack.compareAtTotal ? (
                    <span className="mr-2 line-through opacity-60">{pack.compareAtTotal}</span>
                  ) : null}
                  <span className="font-semibold text-cyber-titanium">{pack.total}</span>
                  <span> · {pack.shipping}</span>
                </p>
                {pack.badges && pack.badges.length > 0 ? (
                  <ul className="mt-4 space-y-1">
                    {pack.badges.map((badge) => (
                      <li key={badge} className="text-xs text-cyber-muted">
                        {badge}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {cta ? (
                  <div className="mt-auto pt-5">
                    <OutboundLink
                      href={cta.href}
                      label={label ?? cta.label}
                      className="btn-primary w-full"
                    />
                  </div>
                ) : null}
              </li>
            ))}
          </ul>

          {config.advice ? (
            <p className="mt-8 max-w-prose text-sm leading-relaxed text-cyber-muted sm:text-base">
              {config.advice}
            </p>
          ) : null}

          {cta && label ? (
            <div className="mt-8">
              <OutboundLink href={cta.href} label={label} className="btn-primary" />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
