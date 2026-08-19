import { UtilizationFigure } from "@/components/utilization-figure";
import { product } from "@/product/active";
import { EditorialArticle } from "@/sections/editorial-article";

/** Company chart figures dated on this review as of August 2026. */
const AMINO_UTILIZATION = [
  { source: "BCAAs", percent: 1 },
  { source: "Whey, soy, and nuts", percent: 18 },
  { source: "Meat, poultry, and fish", percent: 32 },
  { source: "Whole eggs", percent: 48 },
  { source: "This formula", percent: 99, emphasis: true },
] as const;

export function Research() {
  if (!product.research) return null;
  const amino = product.slug === "advanced-amino-formula";
  return (
    <EditorialArticle
      id="research"
      block={product.research}
      figureSide="start"
      sourceNote={amino ? "As published on the official offer" : undefined}
      mediaExtra={
        amino ? (
          <UtilizationFigure
            caption="Share they say is used to build protein"
            dateline="company chart · Aug 2026"
            rows={AMINO_UTILIZATION}
          />
        ) : undefined
      }
    />
  );
}
