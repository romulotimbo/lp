import { OutboundLink } from "@/components/outbound-link";
import { product } from "@/product/active";
import { EditorialArticle } from "@/sections/editorial-article";

export function Verdict() {
  if (!product.verdict) return null;

  const cta = product.outboundCta;

  return (
    <EditorialArticle id="verdict" block={product.verdict}>
      {cta ? (
        <div className="pt-4">
          <OutboundLink href={cta.href} label={cta.label} className="btn-primary" />
        </div>
      ) : null}
    </EditorialArticle>
  );
}