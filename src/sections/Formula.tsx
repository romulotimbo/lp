import { product } from "@/product/active";
import { cn } from "@/lib/utils";
import { ReviewHeading } from "@/sections/review-heading";

export function Formula() {
  const config = product.formula;
  if (!config || config.items.length === 0) return null;

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="formula" className="section-block px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <ReviewHeading eyebrow={config.eyebrow} title={config.title} lead={config.lead} />
          {config.blendLabel ? (
            <div className="letter-formula-blend">
              <p className="review-micro">{config.blendLabel}</p>
              <span className="letter-formula-rule" aria-hidden />
            </div>
          ) : null}
          <div className="letter-formula mt-10">
            {config.items.map((item, index) => (
              <article
                key={item.name}
                className={cn(
                  "letter-formula-sheet",
                  index === 0 && "letter-formula-sheet--start",
                  index === config.items.length - 1 && index > 0 && "letter-formula-sheet--end",
                )}
              >
                <div className="letter-formula-face">
                  <h3 className="letter-formula-name font-review-display text-xl font-semibold tracking-tight text-cyber-titanium">
                    {item.name}
                  </h3>
                  <p className="letter-formula-role mt-3 text-sm leading-relaxed text-cyber-muted sm:text-base">
                    {item.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
          {config.note ? (
            <p className="review-micro mt-6 max-w-prose">{config.note}</p>
          ) : null}
        </div>
      </section>
    </>
  );
}
