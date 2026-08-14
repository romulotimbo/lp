import { InfiniteMarquee } from "@/components/infinite-marquee";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { isReviewLayout, product } from "@/product/active";
import type { TestimonialContent } from "@/product/types";

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function AvatarMark({
  testimonial,
  avatarAltPrefix,
  size,
  review,
}: {
  testimonial: TestimonialContent;
  avatarAltPrefix: string;
  size: "sm" | "md";
  review: boolean;
}) {
  const dim = size === "md" ? "h-14 w-14 text-sm" : "h-8 w-8 text-[10px]";

  if (review || !testimonial.avatar) {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-sm border border-blood-red/25 bg-cyber-graphite font-body font-semibold text-cyber-titanium",
          review && "review-initials",
          dim,
        )}
      >
        {initialsFromName(testimonial.name)}
      </span>
    );
  }

  return (
    <img
      src={testimonial.avatar}
      alt={`${avatarAltPrefix} ${testimonial.name}`}
      width={size === "md" ? 56 : 32}
      height={size === "md" ? 56 : 32}
      decoding="async"
      className={cn(
        "shrink-0 rounded-sm border border-blood-red/30 object-cover",
        size === "md" ? "h-14 w-14" : "h-8 w-8",
      )}
    />
  );
}

function FeaturedTestimonial({
  testimonial,
  tag,
  avatarAltPrefix,
  metadataAriaLabel,
  review,
}: {
  testimonial: TestimonialContent;
  tag: string;
  avatarAltPrefix: string;
  metadataAriaLabel: string;
  review: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative",
        review
          ? "lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-14"
          : "border-l-2 border-blood-red/80 pl-6 sm:pl-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-14 lg:pl-10",
      )}
    >
      <div>
        {!review ? (
          <p className="hud-tag mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red/85">
            {tag}
          </p>
        ) : null}

        <blockquote className="text-balance">
          <p
            className={cn(
              "font-medium leading-[1.12] tracking-tight text-cyber-titanium",
              review
                ? "font-body text-xl sm:text-2xl lg:text-[1.75rem] lg:leading-[1.2]"
                : "font-display text-2xl uppercase sm:text-3xl lg:text-[2.125rem] lg:leading-[1.08]",
            )}
          >
            {testimonial.text}
          </p>
        </blockquote>

        <footer className="mt-8 flex items-center gap-4">
          <AvatarMark
            testimonial={testimonial}
            avatarAltPrefix={avatarAltPrefix}
            size="md"
            review={review}
          />
          <div>
            <cite
              className={cn(
                "text-lg font-bold not-italic text-cyber-titanium",
                review ? "font-body" : "font-display",
              )}
            >
              {testimonial.name}
            </cite>
            <p
              className={cn(
                "mt-0.5 text-cyber-muted",
                review ? "font-body text-sm" : "font-display text-sm uppercase tracking-wide",
              )}
            >
              {testimonial.role}
            </p>
          </div>
        </footer>
      </div>

      {!review ? (
        <dl
          className="hud-tag mt-8 hidden gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-cyber-muted/55 lg:mt-0 lg:block lg:text-right"
          aria-label={metadataAriaLabel}
        >
          <div>
            <dt className="sr-only">Status</dt>
            <dd className="text-blood-red/75">status · verified</dd>
          </div>
        </dl>
      ) : null}
    </motion.article>
  );
}

function DossierCard({
  testimonial,
  avatarAltPrefix,
  review,
}: {
  testimonial: TestimonialContent;
  avatarAltPrefix: string;
  review: boolean;
}) {
  return (
    <article className="group flex h-full w-[min(300px,82vw)] flex-col border border-cyber-graphite/75 bg-cyber-darker/90 px-5 py-4 transition-[border-color,background-color] duration-300 hover:border-blood-red/35 hover:bg-cyber-graphite/40 sm:w-[320px]">
      <div className="mb-3 flex items-center justify-between gap-3">
        {!review ? (
          <span className="hud-tag font-mono text-[10px] uppercase tracking-[0.16em] text-blood-red/75">
            {testimonial.depId}
          </span>
        ) : (
          <span className="font-body text-[11px] text-blood-red/80">{testimonial.name}</span>
        )}
        <span
          className={cn(
            "text-[10px] text-cyber-muted/80",
            review ? "font-body tracking-wide" : "font-display uppercase tracking-wider",
          )}
        >
          {testimonial.role}
        </span>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-cyber-muted">{testimonial.text}</p>

      <div className="mt-4 flex items-center gap-2.5 border-t border-cyber-graphite/65 pt-3">
        <AvatarMark
          testimonial={testimonial}
          avatarAltPrefix={avatarAltPrefix}
          size="sm"
          review={review}
        />
        <p className="font-display text-sm font-semibold text-cyber-titanium">
          {testimonial.name}
        </p>
      </div>
    </article>
  );
}

function ReviewQuoteList({
  items,
  avatarAltPrefix,
}: {
  items: TestimonialContent[];
  avatarAltPrefix: string;
}) {
  return (
    <ul className="mt-10 grid gap-6 sm:grid-cols-2">
      {items.map((testimonial) => (
        <li
          key={testimonial.id}
          className="review-rule border-t border-cyber-graphite/70 pt-5"
        >
          <blockquote className="text-sm leading-relaxed text-cyber-muted sm:text-base">
            {testimonial.text}
          </blockquote>
          <footer className="mt-4 flex items-center gap-3">
            <AvatarMark
              testimonial={testimonial}
              avatarAltPrefix={avatarAltPrefix}
              size="sm"
              review
            />
            <div>
              <cite className="font-body text-sm font-semibold not-italic text-cyber-titanium">
                {testimonial.name}
              </cite>
              <p className="text-xs text-cyber-muted">{testimonial.role}</p>
            </div>
          </footer>
        </li>
      ))}
    </ul>
  );
}

/** Seção opcional — só montada quando `testimonials` está configurado (ver product/registry.tsx). */
export function Testimonials() {
  const config = product.testimonials;
  if (!config || config.items.length === 0) return null;

  const review = isReviewLayout();
  const featured = config.items.find((t) => t.featured) ?? config.items[0];
  const rest = config.items.filter((t) => t !== featured);
  const cards = rest.map((t) => (
    <DossierCard
      key={t.id}
      testimonial={t}
      avatarAltPrefix={config.avatarAltPrefix}
      review={review}
    />
  ));

  return (
    <section className={cn("section-block--tight overflow-hidden", review ? "bg-cyber-graphite" : "bg-cyber-black")}>
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="section-eyebrow mb-5">{config.eyebrow}</p>
              <h2 className="section-title max-w-lg">{config.title}</h2>
              <p className="section-lead mt-5">{config.lead}</p>
            </div>
            {!review ? (
              <p
                className="hud-tag font-mono text-[10px] uppercase tracking-[0.18em] text-cyber-muted/55 lg:pb-1 lg:text-right"
                aria-hidden
              >
                {config.hudTag}
              </p>
            ) : null}
          </div>

          <FeaturedTestimonial
            testimonial={featured}
            tag={config.featuredTag}
            avatarAltPrefix={config.avatarAltPrefix}
            metadataAriaLabel={config.metadataAriaLabel}
            review={review}
          />

          {review && rest.length > 0 ? (
            <ReviewQuoteList items={rest} avatarAltPrefix={config.avatarAltPrefix} />
          ) : null}
        </div>
      </div>

      {!review && rest.length > 0 ? (
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
