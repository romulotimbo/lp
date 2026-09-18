import { product } from "@/product/active";
import { SkepticSection } from "@/sections/skeptic-section";

export function HonestyScale() {
  const scale = product.honestyScale;
  if (!scale || (scale.pros.length === 0 && scale.cons.length === 0)) return null;

  return (
    <SkepticSection
      id="act-6"
      act="Act 6"
      eyebrow={scale.eyebrow}
      title={scale.title}
      lead={scale.lead}
    >
      <div className="skeptic-honesty">
        <div>
          <h3>What holds up</h3>
          <ul>
            {scale.pros.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>What you should know</h3>
          <ul>
            {scale.cons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </SkepticSection>
  );
}
