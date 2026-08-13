import { product } from "@/product/active";
import { EditorialArticle } from "@/sections/editorial-article";

export function OfficialClaims() {
  if (!product.officialClaims) return null;
  return (
    <EditorialArticle
      id="official-claims"
      block={product.officialClaims}
      figureSide="end"
    />
  );
}
