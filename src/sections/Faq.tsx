import { AminoFaq } from "@/sections/amino-faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { OutboundLink } from "@/components/outbound-link";
import { cn } from "@/lib/utils";
import { isReviewLayout, product } from "@/product/active";

/** Seção opcional — só montada quando `faq` está configurado (ver product/registry.tsx). */
export function Faq() {
  const config = product.faq;
  if (!config || config.items.length === 0) return null;

  if (product.slug === "advanced-amino-formula") {
    return <AminoFaq config={config} />;
  }

  const review = isReviewLayout();
  const ctaHref = review && product.outboundCta ? product.outboundCta.href : "#pricing";

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="faq" className="section-block bg-cyber-black px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-0 xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] xl:gap-x-20">
            <header className="lg:sticky lg:top-8 lg:self-start">
              <p className="section-eyebrow mb-5">{config.eyebrow}</p>
              <h2 className="section-title text-balance">{config.title}</h2>
              <p className="mt-5 text-sm leading-relaxed text-cyber-muted">{config.lead}</p>
              {!review ? (
                <p
                  className="hud-tag mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-cyber-muted/45"
                  aria-hidden
                >
                  faq_index · {config.items.length} entries
                </p>
              ) : null}
              {review && product.outboundCta ? (
                <OutboundLink
                  href={ctaHref}
                  label={config.ctaLabel}
                  className="btn-primary mt-8"
                />
              ) : (
                <a
                  href={ctaHref}
                  className="group mt-8 inline-flex items-center gap-2 font-display text-sm uppercase tracking-wider text-blood-red transition-colors duration-300 hover:text-cyber-titanium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-black"
                >
                  {config.ctaLabel}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
              )}
            </header>

            <Accordion
              type="single"
              collapsible
              defaultValue={config.items[0]?.id}
              className="relative border-t border-cyber-graphite/50 review-rule"
            >
              {config.items.map((faq, index) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>
                    <span className="flex min-w-0 flex-1 items-baseline gap-4 sm:gap-5">
                      {!review ? (
                        <span
                          className="shrink-0 font-display text-sm tabular-nums text-blood-red/55 transition-colors duration-300 group-data-[state=open]:text-blood-red"
                          aria-hidden
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      ) : null}
                      <span
                        className={cn(
                          "font-semibold leading-snug tracking-tight text-cyber-titanium transition-colors duration-300 group-data-[state=open]:text-inherit sm:text-lg",
                          review
                            ? "font-body text-base"
                            : "font-display text-base uppercase",
                        )}
                      >
                        {faq.question}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className={review ? "pl-0 sm:pl-0" : undefined}>
                    {!review ? (
                      <span className="hud-tag mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-blood-red/55">
                        ans::{faq.id}
                      </span>
                    ) : null}
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
