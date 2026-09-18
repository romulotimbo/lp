import { product } from "@/product/active";
import { SkepticProse, SkepticSection } from "@/sections/skeptic-section";

export function Skepticism() {
  const block = product.skepticism;
  if (!block) return null;
  return (
    <SkepticSection id="act-1" act="Act 1" eyebrow={block.eyebrow} title={block.title}>
      <SkepticProse text={block.body} />
    </SkepticSection>
  );
}
