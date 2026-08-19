import { product } from "@/product/active";
import { EditorialArticle } from "@/sections/editorial-article";

export function Pain() {
  if (!product.pain) return null;
  const amino = product.slug === "advanced-amino-formula";
  return (
    <EditorialArticle
      id="pain"
      block={product.pain}
      figureSide="end"
      markPhrase={amino ? "30%" : undefined}
      ghostStat={
        amino
          ? { value: "30%", dateline: "company figure · Aug 2026" }
          : undefined
      }
    />
  );
}
