import { OutboundLink } from "@/components/outbound-link";
import { useProtocolEmphasis } from "@/product/protocol-emphasis";
import { product } from "@/product/active";
import { SkepticSection } from "@/sections/skeptic-section";
import type { ProtocolId, ProtocolOffer } from "@/product/types";
import { cn } from "@/lib/utils";

function ProtocolCard({
  offer,
  featured,
  current,
}: {
  offer: ProtocolOffer;
  featured: boolean;
  current: boolean;
}) {
  return (
    <article
      className={cn("skeptic-protocol-card", featured && "skeptic-protocol-card--featured")}
      aria-current={current ? "true" : undefined}
    >
      <p className="skeptic-kicker">{offer.approachLabel}</p>
      <h3>{offer.productName}</h3>
      <p>{offer.whyForYou}</p>
      {offer.image ? (
        <img src={offer.image.src} alt={offer.image.alt} />
      ) : (
        <div className="skeptic-ugc-frame skeptic-ugc-frame--product" aria-hidden="true">
          <span>Official {offer.productName} photography reserved</span>
        </div>
      )}
      <OutboundLink
        href={offer.outboundCta.href}
        label={offer.outboundCta.label}
        className={featured ? "skeptic-cta" : "skeptic-cta-ghost"}
      />
    </article>
  );
}

export function ProtocolVerdict() {
  const verdict = product.protocolVerdict;
  const catalog = product.catalog;
  const { emphasis } = useProtocolEmphasis();
  if (!verdict || !catalog) return null;

  const order: ProtocolId[] = emphasis === "spray" ? ["spray", "pills"] : ["pills", "spray"];

  return (
    <SkepticSection
      id="act-4"
      act="Act 4"
      eyebrow={verdict.eyebrow}
      title={verdict.title}
      lead={verdict.lead}
    >
      <div className="skeptic-protocol-grid">
        {order.map((id) => {
          const isWinner = emphasis !== "unset" && emphasis === id;
          const hinted = emphasis === "unset" && id === catalog.defaultProtocol;
          return (
            <ProtocolCard
              key={id}
              offer={catalog[id]}
              featured={isWinner || hinted}
              current={isWinner}
            />
          );
        })}
      </div>
    </SkepticSection>
  );
}
