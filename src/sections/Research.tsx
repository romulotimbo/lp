import { product } from "@/product/active";
import { EditorialArticle } from "@/sections/editorial-article";

export function Research() {
  if (!product.research) return null;
  return <EditorialArticle id="research" block={product.research} figureSide="start" />;
}
