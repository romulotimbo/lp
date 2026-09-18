import { ComplementaryCta, protocolDisplayName } from "@/components/dual-official-ctas";
import { complementaryProtocol } from "@/product/protocol-quiz";
import { useProtocolEmphasis } from "@/product/protocol-emphasis";
import { product } from "@/product/active";
import { SkepticProse, SkepticSection } from "@/sections/skeptic-section";

export function Synergy() {
  const synergy = product.synergy;
  const catalog = product.catalog;
  const { emphasis } = useProtocolEmphasis();
  if (!synergy || !catalog) return null;

  const current = emphasis === "unset" ? catalog.defaultProtocol : emphasis;
  const other = complementaryProtocol(current);

  return (
    <SkepticSection id="act-5" act="Act 5" eyebrow={synergy.eyebrow} title={synergy.title}>
      <SkepticProse text={synergy.body} />
      <p className="skeptic-synergy-note">
        360° accelerator: {protocolDisplayName(other)} sits beside {protocolDisplayName(current)}{" "}
        — inside-out nutrition and the Haircare Set ritual, not a hidden SKU.
      </p>
      <ComplementaryCta label={synergy.acceleratorCtaLabel} />
    </SkepticSection>
  );
}
