import { product } from "@/product/active";

export function PageFooter() {
  const { footer, locale } = product;

  return (
    <footer className="border-t border-blood-red/12 bg-cyber-darker px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg font-bold uppercase tracking-tight text-cyber-titanium">
              {footer.brandName}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-blood-red/70">
              {footer.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <a
              href="#pricing"
              className="font-display text-xs uppercase tracking-wider text-cyber-muted transition-colors duration-300 hover:text-blood-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-red/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker"
            >
              {footer.ctaLabel}
            </a>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyber-muted/40">
              {footer.microcopy}
            </p>
          </div>
        </div>

        <div className="border-t border-cyber-graphite/60 pt-5 text-[11px] leading-relaxed text-cyber-muted/70">
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
