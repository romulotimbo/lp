import { product } from "@/product/active";
import { EditorialArticle } from "@/sections/editorial-article";

export function Authenticity() {
  if (!product.authenticity) return null;
  return (
    <EditorialArticle
      id="authenticity"
      block={product.authenticity}
      ctaVariant="primary"
    />
  );
}
