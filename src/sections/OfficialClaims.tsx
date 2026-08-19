import { AcidOctet } from "@/components/acid-octet";
import { product } from "@/product/active";
import { EditorialArticle } from "@/sections/editorial-article";

export function OfficialClaims() {
  if (!product.officialClaims) return null;
  const amino = product.slug === "advanced-amino-formula";
  return (
    <EditorialArticle
      id="official-claims"
      block={product.officialClaims}
      figureSide="end"
      sourceNote={amino ? "As published on the official offer" : undefined}
      mediaExtra={
        amino ? (
          <AcidOctet
            caption="The eight they name"
            dateline="company list · Aug 2026"
          />
        ) : undefined
      }
    />
  );
}
