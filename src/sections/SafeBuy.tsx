import { DualOfficialCtas } from "@/components/dual-official-ctas";
import { product } from "@/product/active";
import { SkepticProse, SkepticSection } from "@/sections/skeptic-section";

export function SafeBuy() {
  const block = product.safeBuy;
  if (!block) return null;
  return (
    <SkepticSection id="act-7" act="Act 7" eyebrow={block.eyebrow} title={block.title}>
      <p className="skeptic-warning">{block.counterfeitWarning}</p>
      <SkepticProse text={block.body} />
      <p className="skeptic-caveat">{block.guaranteeNote}</p>
      <DualOfficialCtas className="skeptic-act-ctas" featuredFirst />
    </SkepticSection>
  );
}
