import { product } from "@/product/active";
import { ReviewHeading } from "@/sections/review-heading";

export function Compare() {
  const config = product.compare;
  if (!config || config.rows.length === 0) return null;

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="compare" className="section-block px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <ReviewHeading eyebrow={config.eyebrow} title={config.title} lead={config.lead} />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left">
              <caption className="sr-only">{config.title}</caption>
              <thead>
                <tr className="border-b border-cyber-titanium/15">
                  <th scope="col" className="py-3 pr-4 text-sm font-medium text-cyber-muted">
                    <span className="sr-only">Topic</span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-review-display text-sm font-semibold text-cyber-titanium"
                  >
                    {config.usLabel}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-review-display text-sm font-semibold text-cyber-muted"
                  >
                    {config.themLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {config.rows.map((row) => (
                  <tr key={row.label} className="border-b border-cyber-titanium/10">
                    <th
                      scope="row"
                      className="py-4 pr-4 text-sm font-medium text-cyber-titanium sm:text-base"
                    >
                      {row.label}
                    </th>
                    <td className="px-4 py-4 text-sm text-cyber-titanium sm:text-base">{row.us}</td>
                    <td className="px-4 py-4 text-sm text-cyber-muted sm:text-base">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
