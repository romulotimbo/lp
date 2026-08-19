import { handleOutboundClick } from "@/lib/checkout-tracking";
import { cn } from "@/lib/utils";

interface OutboundLinkProps {
  href: string;
  label: string;
  className?: string;
}

export function OutboundLink({ href, label, className }: OutboundLinkProps) {
  // href cru — não parsear URL. Hash de afiliado (#aff=) tem que sobreviver.
  return (
    <a
      href={href}
      className={cn(className)}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      onClick={(e) => handleOutboundClick(e, href)}
    >
      {label}
    </a>
  );
}
