import { product } from "@/product/active";
import { ReviewHeading } from "@/sections/review-heading";

export function ProsCons() {
  const config = product.prosCons;
  if (!config || (config.pros.length === 0 && config.cons.length === 0)) return null;

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="pros-cons" className="section-block px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <ReviewHeading eyebrow={config.eyebrow} title={config.title} lead={config.lead} />
          <div className="review-ledger mt-10 grid gap-8 lg:grid-cols-2">
            <div className="review-ledger-col review-ledger-col--pro">
              <h3 className="font-review-display text-lg font-semibold tracking-tight text-cyber-titanium">
                Pros
              </h3>
              <ul className="review-ledger-list">
                {config.pros.map((item) => (
                  <li key={item} className="review-ledger-item text-sm leading-relaxed text-cyber-muted sm:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="review-ledger-col">
              <h3 className="font-review-display text-lg font-semibold tracking-tight text-cyber-titanium">
                Cons
              </h3>
              <ul className="review-ledger-list">
                {config.cons.map((item) => (
                  <li key={item} className="review-ledger-item text-sm leading-relaxed text-cyber-muted sm:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
