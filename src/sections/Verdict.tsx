import { product } from "@/product/active";
import { EditorialArticle } from "@/sections/editorial-article";

export function Verdict() {
  if (!product.verdict) return null;
  return <EditorialArticle id="verdict" block={product.verdict} ctaVariant="primary" />;
}
