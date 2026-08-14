import { useEffect, useState } from "react";
import { OutboundLink } from "@/components/outbound-link";
import { cn } from "@/lib/utils";
import { isReviewLayout, product } from "@/product/active";

export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const review = isReviewLayout();
  const href = review && product.outboundCta ? product.outboundCta.href : "#pricing";

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] shadow-lift-sm transition-transform duration-500 ease-out-expo md:hidden",
        review
          ? "border-cyber-titanium/15 bg-cyber-black"
          : "border-blood-red/25 bg-cyber-black",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      {review && product.outboundCta ? (
        <OutboundLink href={href} label={product.stickyCta.label} className="btn-primary w-full" />
      ) : (
        <a href={href} className="btn-primary w-full">
          {product.stickyCta.label}
        </a>
      )}
    </div>
  );
}
