import { product } from "@/product/active";
import { ReviewHeading } from "@/sections/review-heading";

export function Trust() {
  const config = product.trust;
  if (!config || config.items.length === 0) return null;

  return (
    <section id="trust" className="section-block--tight px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {config.title ? (
          <ReviewHeading eyebrow={config.eyebrow} title={config.title} />
        ) : null}
        <ul
          className={
            config.title
              ? "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          {config.items.map((item) => (
            <li
              key={item.label}
              className="border border-cyber-titanium/12 bg-cyber-graphite px-5 py-5"
            >
              <p className="font-review-display text-base font-semibold tracking-tight text-cyber-titanium">
                {item.label}
              </p>
              {item.detail ? (
                <p className="mt-2 text-sm leading-relaxed text-cyber-muted">{item.detail}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
