import { DualOfficialCtas } from "@/components/dual-official-ctas";
import { OutboundLink } from "@/components/outbound-link";
import { isReviewSkepticLayout, product, usesOutboundCta } from "@/product/active";
import { siteHref } from "@/lib/pathname";
import { cn } from "@/lib/utils";

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/medical-disclaimer", label: "Medical disclaimer" },
  { href: "/about", label: "About" },
] as const;

export function PageFooter() {
  const { footer, locale, outboundCta } = product;
  const skeptic = isReviewSkepticLayout();
  const outbound = usesOutboundCta();
  const ctaHref = outbound && outboundCta ? outboundCta.href : "#pricing";
  const ctaClassName = outbound
    ? skeptic
      ? "skeptic-cta"
      : "btn-primary"
    : "font-display text-xs uppercase tracking-wider text-cyber-muted transition-colors duration-300 hover:text-blood-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-red/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker";

  return (
    <footer
      className={cn(
        "border-t px-6 py-8 lg:px-8",
        skeptic
          ? "skeptic-footer"
          : outbound
            ? "review-rule border-cyber-titanium/12 bg-cyber-black"
            : "border-blood-red/12 bg-cyber-darker",
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className={cn(
                "text-lg font-bold tracking-tight text-cyber-titanium",
                outbound ? "font-body" : "font-display uppercase",
                skeptic && "skeptic-footer-brand",
              )}
            >
              {footer.brandName}
            </p>
            <p
              className={cn(
                "mt-1 text-blood-red/70",
                outbound
                  ? "text-xs tracking-wide"
                  : "hud-tag font-mono text-[10px] uppercase tracking-[0.18em]",
              )}
            >
              {footer.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            {skeptic ? (
              <DualOfficialCtas
                pillsLabel={product.catalog?.pills.outboundCta.label}
                sprayLabel={product.catalog?.spray.outboundCta.label}
              />
            ) : outbound && outboundCta ? (
              <OutboundLink href={ctaHref} label={footer.ctaLabel} className={ctaClassName} />
            ) : (
              <a href={ctaHref} className={ctaClassName}>
                {footer.ctaLabel}
              </a>
            )}
            <p
              className={cn(
                outbound
                  ? "review-micro"
                  : "hud-tag font-mono text-[10px] uppercase tracking-[0.14em] text-cyber-muted/40",
              )}
            >
              {footer.microcopy}
            </p>
          </div>
        </div>

        {skeptic ? (
          <nav className="skeptic-legal-nav" aria-label="Legal">
            {LEGAL_LINKS.map((link) => (
              <a key={link.href} href={siteHref(link.href)}>
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div
          id="footer-disclosure"
          className={cn(
            "border-t pt-5 leading-relaxed",
            outbound
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
