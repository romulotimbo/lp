import { product } from "@/product/active";
import { SkepticProse, SkepticSection } from "@/sections/skeptic-section";

export function Investigation() {
  const block = product.investigation;
  if (!block) return null;
  return (
    <SkepticSection id="act-2" act="Act 2" eyebrow={block.eyebrow} title={block.title}>
      <SkepticProse text={block.body} />
    </SkepticSection>
  );
}
