import { InfiniteMarquee } from "@/components/infinite-marquee";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { product } from "@/product/active";
import type { TestimonialContent } from "@/product/types";

function FeaturedTestimonial({
  testimonial,
  tag,
  avatarAltPrefix,
  metadataAriaLabel,
}: {
  testimonial: TestimonialContent;
  tag: string;
  avatarAltPrefix: string;
  metadataAriaLabel: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative border-l-2 border-blood-red/80 pl-6 sm:pl-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-14 lg:pl-10"
    >
      <div>
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red/85">
          {tag}
        </p>

        <blockquote className="text-balance">
          <p className="font-display text-2xl font-medium uppercase leading-[1.12] tracking-tight text-cyber-titanium sm:text-3xl lg:text-[2.125rem] lg:leading-[1.08]">
            {testimonial.text}
          </p>
        </blockquote>

        <footer className="mt-8 flex items-center gap-4">
          <img
            src={testimonial.avatar}
            alt={`${avatarAltPrefix} ${testimonial.name}`}
            width={56}
            height={56}
            decoding="async"
            className="h-14 w-14 shrink-0 rounded-sm border border-blood-red/30 object-cover"
          />
          <div>
            <cite className="font-display text-lg font-bold not-italic text-cyber-titanium">
              {testimonial.name}
            </cite>
            <p className="mt-0.5 font-display text-sm uppercase tracking-wide text-cyber-muted">
              {testimonial.role}
            </p>
          </div>
        </footer>
      </div>

      <dl
        className="mt-8 hidden gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-cyber-muted/55 lg:mt-0 lg:block lg:text-right"
        aria-label={metadataAriaLabel}
      >
        <div>
          <dt className="sr-only">Status</dt>
          <dd className="text-blood-red/75">status · verified</dd>
        </div>
      </dl>
    </motion.article>
  );
}

function DossierCard({
  testimonial,
  avatarAltPrefix,
}: {
  testimonial: TestimonialContent;
  avatarAltPrefix: string;
}) {
  return (
    <article className="group flex h-full w-[min(300px,82vw)] flex-col border border-cyber-graphite/75 bg-cyber-darker/90 px-5 py-4 transition-[border-color,background-color] duration-300 hover:border-blood-red/35 hover:bg-cyber-graphite/40 sm:w-[320px]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-blood-red/75">
          {testimonial.depId}
        </span>
        <span className="font-display text-[10px] uppercase tracking-wider text-cyber-muted/80">
          {testimonial.role}
        </span>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-cyber-muted">{testimonial.text}</p>

      <div className="mt-4 flex items-center gap-2.5 border-t border-cyber-graphite/65 pt-3">
        <img
          src={testimonial.avatar}
          alt={`${avatarAltPrefix} ${testimonial.name}`}
          width={32}
          height={32}
          decoding="async"
          className="h-8 w-8 shrink-0 rounded-sm border border-blood-red/20 object-cover"
        />
        <p className="font-display text-sm font-semibold text-cyber-titanium">
          {testimonial.name}
        </p>
      </div>
    </article>
  );
}

/** Seção opcional — só montada quando `testimonials` está configurado (ver product/registry.tsx). */
export function Testimonials() {
  const config = product.testimonials;
  if (!config || config.items.length === 0) return null;

  const featured = config.items.find((t) => t.featured) ?? config.items[0];
  const marqueeItems = config.items.filter((t) => t !== featured);
  const cards = marqueeItems.map((t) => (
    <DossierCard key={t.id} testimonial={t} avatarAltPrefix={config.avatarAltPrefix} />
  ));

  return (
    <section className="section-block--tight overflow-hidden bg-cyber-black">
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="section-eyebrow mb-5">{config.eyebrow}</p>
              <h2 className="section-title max-w-lg">{config.title}</h2>
              <p className="section-lead mt-5">{config.lead}</p>
            </div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyber-muted/55 lg:pb-1 lg:text-right"
              aria-hidden
            >
              {config.hudTag}
            </p>
          </div>

          <FeaturedTestimonial
            testimonial={featured}
            tag={config.featuredTag}
            avatarAltPrefix={config.avatarAltPrefix}
            metadataAriaLabel={config.metadataAriaLabel}
          />
        </div>
      </div>

      {marqueeItems.length > 0 ? (
        <div className="mt-10 flex flex-col gap-3 lg:mt-14">
          <InfiniteMarquee items={cards} duration={52} />
          <InfiniteMarquee
            items={cards}
            reverse
            duration={58}
            className="hidden md:block"
          />
        </div>
      ) : null}
    </section>
  );
}
