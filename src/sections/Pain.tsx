import { product } from "@/product/active";
import { EditorialArticle } from "@/sections/editorial-article";

export function Pain() {
  if (!product.pain) return null;
  return <EditorialArticle id="pain" block={product.pain} figureSide="end" />;
}
