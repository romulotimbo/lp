import { OutboundLink } from "@/components/outbound-link";
import { isReviewLayout, product } from "@/product/active";
import { cn } from "@/lib/utils";

export function PageFooter() {
  const { footer, locale, outboundCta } = product;
  const review = isReviewLayout();
  const ctaHref = review && outboundCta ? outboundCta.href : "#pricing";
  const ctaClassName = cn(
    "transition-colors duration-300 hover:text-blood-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-red/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker",
    review
      ? "font-body text-sm font-semibold text-cyber-muted"
      : "font-display text-xs uppercase tracking-wider text-cyber-muted",
  );

  return (
    <footer className="border-t border-blood-red/12 bg-cyber-darker px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className={cn(
                "text-lg font-bold tracking-tight text-cyber-titanium",
                review ? "font-body" : "font-display uppercase",
              )}
            >
              {footer.brandName}
            </p>
            <p
              className={cn(
                "mt-1 text-blood-red/70",
                review
                  ? "text-xs tracking-wide"
                  : "hud-tag font-mono text-[10px] uppercase tracking-[0.18em]",
              )}
            >
              {footer.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            {review && outboundCta ? (
              <OutboundLink href={ctaHref} label={footer.ctaLabel} className={ctaClassName} />
            ) : (
              <a href={ctaHref} className={ctaClassName}>
                {footer.ctaLabel}
              </a>
            )}
            <p
              className={cn(
                review
                  ? "review-micro"
                  : "hud-tag font-mono text-[10px] uppercase tracking-[0.14em] text-cyber-muted/40",
              )}
            >
              {footer.microcopy}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "border-t pt-5 leading-relaxed",
            review
              ? "review-rule border-cyber-graphite/60 text-xs text-cyber-muted"
              : "border-cyber-graphite/60 text-[11px] text-cyber-muted/70",
          )}
        >
          <p>{locale.affiliateDisclosure}</p>
          {locale.categoryDisclaimers?.map((text, i) => (
            <p key={i} className="mt-2">
              {text}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
