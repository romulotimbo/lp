import { product } from "@/product/active";
import { SkepticSection } from "@/sections/skeptic-section";
import type { ProtocolUgcSlot } from "@/product/types";

function UgcSlot({ item, index }: { item: ProtocolUgcSlot; index: number }) {
  if (item.kind === "reserved" || !item.src) {
    return (
      <figure className="skeptic-ugc-slot skeptic-ugc-slot--reserved">
        <div className="skeptic-ugc-frame" aria-hidden="true">
          <span>UGC {index + 1}</span>
        </div>
        <figcaption>
          <strong>UGC reserved.</strong> {item.caption}
          {item.attribution ? <span className="skeptic-ugc-attr">{item.attribution}</span> : null}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="skeptic-ugc-slot">
      {item.kind === "video" ? (
        <video src={item.src} controls playsInline preload="metadata" />
      ) : (
        <img src={item.src} alt={item.caption} />
      )}
      <figcaption>
        {item.caption}
        {item.attribution ? <span className="skeptic-ugc-attr">{item.attribution}</span> : null}
      </figcaption>
    </figure>
  );
}

export function UgcMosaic() {
  const mosaic = product.ugcMosaic;
  if (!mosaic) return null;
  return (
    <SkepticSection
      id="ugc-mosaic"
      act="Act 3"
      eyebrow={mosaic.eyebrow}
      title={mosaic.title}
      lead={mosaic.lead}
    >
      <div className="skeptic-ugc-grid">
        {mosaic.items.map((item, index) => (
          <UgcSlot key={`${item.caption}-${index}`} item={item} index={index} />
        ))}
      </div>
    </SkepticSection>
  );
}
