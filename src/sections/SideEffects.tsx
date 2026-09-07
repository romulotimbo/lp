import { product } from "@/product/active";
import { EditorialArticle } from "@/sections/editorial-article";

export function SideEffects() {
  if (!product.sideEffects) return null;
  return <EditorialArticle id="side-effects" block={product.sideEffects} />;
}
