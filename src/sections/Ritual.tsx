import { product } from "@/product/active";
import { ReviewHeading } from "@/sections/review-heading";

export function Ritual() {
  const config = product.ritual;
  if (!config || config.steps.length === 0) return null;

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="ritual" className="section-block px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <ReviewHeading eyebrow={config.eyebrow} title={config.title} lead={config.lead} />
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-14">
            {config.steps.map((step, index) => (
              <li key={step.title} className="relative">
                <p
                  className="font-review-display text-5xl font-semibold tabular-nums leading-none text-blood-red/80"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-review-display text-xl font-semibold tracking-tight text-cyber-titanium">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-cyber-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
