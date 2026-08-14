import { OutboundLink } from "@/components/outbound-link";
import { product } from "@/product/active";
import { ReviewHeading } from "@/sections/review-heading";

export function Guarantee() {
  const config = product.guarantee;
  const cta = product.outboundCta;
  if (!config) return null;

  const label = config.ctaLabel ?? cta?.label;

  return (
    <section id="guarantee" className="section-block px-6 lg:px-8">
      <div className="mx-auto max-w-5xl bg-cyber-graphite px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <ReviewHeading eyebrow={config.eyebrow} title={config.title} />
        <p className="mt-6 max-w-prose text-base leading-relaxed text-cyber-muted sm:text-lg">
          {config.body}
        </p>
        {config.note ? (
          <p className="review-micro mt-4 max-w-prose">{config.note}</p>
        ) : null}

        {config.bonuses && config.bonuses.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {config.bonuses.map((bonus) => (
              <li key={bonus.title} className="border border-cyber-titanium/12 px-5 py-4">
                <p className="font-review-display text-sm font-semibold text-cyber-titanium">
                  {bonus.title}
                </p>
                {bonus.body ? (
                  <p className="mt-2 text-sm leading-relaxed text-cyber-muted">{bonus.body}</p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        {cta && label ? (
          <div className="mt-8">
            <OutboundLink href={cta.href} label={label} className="btn-primary" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
