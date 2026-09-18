import { OutboundLink } from "@/components/outbound-link";
import { complementaryProtocol } from "@/product/protocol-quiz";
import { useProtocolEmphasis } from "@/product/protocol-emphasis";
import { product } from "@/product/active";
import type { ProtocolId } from "@/product/types";
import { cn } from "@/lib/utils";

export function protocolDisplayName(id: ProtocolId): string {
  const offer = product.catalog?.[id];
  return offer?.productName ?? (id === "pills" ? "Ultimate Hair Boost" : "Haircare Set");
}

export function DualOfficialCtas({
  className,
  pillsClassName,
  sprayClassName,
  pillsLabel,
  sprayLabel,
  featuredFirst = false,
}: {
  className?: string;
  pillsClassName?: string;
  sprayClassName?: string;
  pillsLabel?: string;
  sprayLabel?: string;
  featuredFirst?: boolean;
}) {
  const catalog = product.catalog;
  const { emphasis } = useProtocolEmphasis();
  if (!catalog) return null;

  const featured: ProtocolId | null =
    emphasis === "unset" ? (featuredFirst ? catalog.defaultProtocol : null) : emphasis;
  const order: ProtocolId[] =
    featured === "spray" ? ["spray", "pills"] : ["pills", "spray"];

  return (
    <div className={cn("skeptic-cta-row", className)}>
      {order.map((id) => {
        const offer = catalog[id];
        const label = id === "pills" ? pillsLabel ?? offer.outboundCta.label : sprayLabel ?? offer.outboundCta.label;
        const isFeatured = featured === id;
        return (
          <OutboundLink
            key={id}
            href={offer.outboundCta.href}
            label={label}
            className={cn(
              isFeatured ? "skeptic-cta" : "skeptic-cta-ghost",
              id === "pills" ? pillsClassName : sprayClassName,
            )}
          />
        );
      })}
    </div>
  );
}

export function ComplementaryCta({ className, label }: { className?: string; label?: string }) {
  const catalog = product.catalog;
  const { emphasis } = useProtocolEmphasis();
  if (!catalog) return null;
  const current = emphasis === "unset" ? catalog.defaultProtocol : emphasis;
  const other = complementaryProtocol(current);
  const offer = catalog[other];
  return (
    <OutboundLink
      href={offer.outboundCta.href}
      label={label ?? offer.outboundCta.label}
      className={cn("skeptic-cta", className)}
    />
  );
}
