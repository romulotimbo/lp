import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AminoFaqContent } from "@/components/amino-faq-content";
import { OutboundLink } from "@/components/outbound-link";
import { cn } from "@/lib/utils";
import { product } from "@/product/active";
import type { FaqItemContent } from "@/product/types";
import { useState } from "react";

function HaltMark() {
  return (
    <svg
      className="faq-index-halt"
      viewBox="0 0 12 12"
      aria-hidden
      focusable="false"
    >
      <rect x="2" y="2" width="3" height="8" rx="0.4" />
      <rect x="7" y="2" width="3" height="8" rx="0.4" />
    </svg>
  );
}

function AminoFaqIndex({
  items,
  open,
  onOpen,
}: {
  items: FaqItemContent[];
  open: string | undefined;
  onOpen: (id: string) => void;
}) {
  const reduced = Boolean(useReducedMotion());

  return (
    <LayoutGroup>
      <nav className="faq-index hidden lg:block" aria-label="Questions on this page">
        <ul>
          {items.map((item) => {
            const current = open === item.id;
            const stop = item.id === "pku";
            return (
              <li
                key={item.id}
                className={cn("faq-index-item", stop && "faq-index-item--stop")}
              >
                {current ? (
                  <motion.span
                    layoutId={reduced ? undefined : "faq-ink"}
                    className="faq-index-ink"
                    aria-hidden
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 36 }
                    }
                  />
                ) : null}
                <button
                  type="button"
                  className="faq-index-btn"
                  aria-current={current ? "true" : undefined}
                  aria-controls={`faq-${item.id}`}
                  onClick={() => onOpen(item.id)}
                >
                  {stop ? <HaltMark /> : null}
                  <span>{item.question}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </LayoutGroup>
  );
}

export function AminoFaq({
  config,
}: {
  config: NonNullable<typeof product.faq>;
}) {
  const cta = product.outboundCta;
  const [open, setOpen] = useState<string | undefined>(config.items[0]?.id);
  const reduced = Boolean(useReducedMotion());

  const openFromIndex = (id: string) => {
    setOpen(id);
    const node = document.getElementById(`faq-${id}`);
    node?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="faq" className="amino-faq section-block px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-x-16 xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:gap-x-20">
            <header className="lg:sticky lg:top-8 lg:self-start">
              {config.eyebrow ? (
                <p className="section-eyebrow mb-5">{config.eyebrow}</p>
              ) : null}
              <h2 className="section-title text-balance">{config.title}</h2>
              {config.lead ? (
                <p className="mt-5 text-sm leading-relaxed text-cyber-muted">
                  {config.lead}
                </p>
              ) : null}
              <AminoFaqIndex
                items={config.items}
                open={open}
                onOpen={openFromIndex}
              />
              {cta ? (
                <OutboundLink
                  href={cta.href}
                  label={config.ctaLabel}
                  className="btn-primary mt-8"
                />
              ) : null}
            </header>

            <Accordion
              type="single"
              collapsible
              value={open}
              onValueChange={(value) => setOpen(value || undefined)}
              className="relative review-rule border-t"
            >
              {config.items.map((faq) => {
                const stop = faq.id === "pku";
                return (
                  <AccordionItem
                    key={faq.id}
                    id={`faq-${faq.id}`}
                    value={faq.id}
                    className={cn("review-rule", stop && "faq-item-stop")}
                  >
                    <AccordionTrigger className="amino-faq-trigger">
                      <span className="flex min-w-0 flex-1 items-baseline gap-3">
                        {stop ? <HaltMark /> : null}
                        <span className="font-body text-base font-semibold leading-snug tracking-tight text-cyber-titanium sm:text-lg">
                          {faq.question}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AminoFaqContent open={open === faq.id} stop={stop}>
                      {faq.answer}
                    </AminoFaqContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
