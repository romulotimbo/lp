import { product } from "@/product/active";
import { SkepticSection } from "@/sections/skeptic-section";

export function TestDiary() {
  const diary = product.testDiary;
  if (!diary) return null;
  return (
    <SkepticSection
      id="act-3"
      act="Act 3"
      eyebrow={diary.eyebrow}
      title={diary.title}
      lead={diary.lead}
    >
      <ol className="skeptic-diary">
        {diary.phases.map((phase) => (
          <li key={phase.label} className="skeptic-diary-phase">
            <p className="skeptic-kicker">{phase.label}</p>
            <h3>{phase.title}</h3>
            <p>{phase.body}</p>
          </li>
        ))}
      </ol>
      <p className="skeptic-caveat">{diary.caveat}</p>
    </SkepticSection>
  );
}
