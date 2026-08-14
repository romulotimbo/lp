import { OutboundLink } from "@/components/outbound-link";
import { product } from "@/product/active";

export function MidCta() {
  const config = product.midCta;
  const cta = product.outboundCta;
  if (!config || !cta) return null;

  const label = config.ctaLabel ?? cta.label;

  return (
    <section id="mid-cta" className="section-block--tight px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 border-y border-cyber-titanium/12 py-12 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div className="max-w-xl">
          {config.eyebrow ? <p className="section-eyebrow mb-3">{config.eyebrow}</p> : null}
          <h2 className="section-title text-balance">{config.title}</h2>
          {config.body ? (
            <p className="mt-4 text-base leading-relaxed text-cyber-muted">{config.body}</p>
          ) : null}
        </div>
        <OutboundLink href={cta.href} label={label} className="btn-primary shrink-0" />
      </div>
    </section>
  );
}
