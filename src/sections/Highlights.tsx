import { product } from "@/product/active";
import { ReviewHeading } from "@/sections/review-heading";

export function Highlights() {
  const config = product.highlights;
  if (!config || config.items.length === 0) return null;

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="highlights" className="section-block px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <ReviewHeading eyebrow={config.eyebrow} title={config.title} lead={config.lead} />
          {config.attribution ? (
            <p className="mt-3 text-sm text-cyber-muted">{config.attribution}</p>
          ) : null}
          <ul className="mt-10 grid gap-px bg-cyber-titanium/12 sm:grid-cols-2 lg:grid-cols-3">
            {config.items.map((item) => (
              <li key={item.title} className="bg-cyber-black px-6 py-8">
                <h3 className="font-review-display text-lg font-semibold tracking-tight text-cyber-titanium">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cyber-muted sm:text-base">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
