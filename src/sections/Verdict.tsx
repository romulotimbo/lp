import { InkSignature } from "@/components/ink-signature";
import { OutboundLink } from "@/components/outbound-link";
import { product } from "@/product/active";
import { EditorialArticle } from "@/sections/editorial-article";

const AMINO_INDEX = [
  {
    label: "Eight essential amino acids",
    detail: "their published list",
  },
  {
    label: "Utilization chart versus whey and BCAAs",
    detail: "company figures · Aug 2026",
  },
  {
    label: "Down-to-the-last-pill guarantee",
    detail: "90-day terms on official orders",
  },
] as const;

function paragraphs(body: string): string[] {
  return body
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function AminoVerdict() {
  const block = product.verdict;
  const cta = product.outboundCta;
  if (!block || !cta) return null;

  const [finding, nextClick, pku] = paragraphs(block.body);

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="verdict" className="section-block px-6 lg:px-8">
        <div className="verdict-letter mx-auto max-w-3xl lg:max-w-5xl">
          {block.eyebrow ? (
            <p className="section-eyebrow mb-3">{block.eyebrow}</p>
          ) : null}
          <h2 className="section-title text-balance">{block.title}</h2>

          <div className="verdict-finding mt-8 max-w-prose">
            {finding ? (
              <p className="text-base leading-[1.7] text-cyber-muted sm:text-lg">
                {finding}
              </p>
            ) : null}

            <ul className="verdict-index">
              {AMINO_INDEX.map((item) => (
                <li key={item.label} className="verdict-index-item">
                  <span className="verdict-index-label">{item.label}</span>
                  <span className="verdict-index-detail">{item.detail}</span>
                </li>
              ))}
            </ul>

            {nextClick ? (
              <p className="mt-6 text-base leading-[1.7] text-cyber-muted sm:text-lg">
                {nextClick}
              </p>
            ) : null}
          </div>

          {pku ? (
            <aside className="verdict-stop" aria-label="Phenylketonuria caution">
              <p>{pku}</p>
            </aside>
          ) : null}

          <div className="verdict-close">
            <OutboundLink
              href={cta.href}
              label={cta.label}
              className="btn-primary"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export function Verdict() {
  if (!product.verdict) return null;

  if (product.slug === "advanced-amino-formula") {
    return <AminoVerdict />;
  }

  return <EditorialArticle id="verdict" block={product.verdict} ctaVariant="primary" />;
}
