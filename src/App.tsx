import { PageFooter } from "@/components/page-footer";
import { StickyCta } from "@/components/sticky-cta";
import { Hero } from "@/sections/Hero";
import { Pricing } from "@/sections/Pricing";
import { EditorialBar } from "@/sections/EditorialBar";
import { SkepticHero } from "@/sections/SkepticHero";
import { CompliancePageView, isCompliancePath } from "@/sections/CompliancePage";
import { OPTIONAL_SECTION_COMPONENTS } from "@/product/registry";
import { ProtocolEmphasisProvider, useProtocolEmphasis } from "@/product/protocol-emphasis";
import { activeLayout, isReviewSkepticLayout, product } from "@/product/active";
import { getPathname } from "@/lib/pathname";
import type { OptionalSectionId } from "@/product/types";

const GLASS_LAB_CONTRACT = `<!--
THESIS: A metabolic glass lab after hours — the jar sits on a refractive plate, not a fire. Refuses the fat-burner ember letter.
OWN-WORLD: Ink ground, citric-amber reagent light, optical edges, glass slabs, Sora display. Rest-state caustic ridges; pointer modulates; scroll-driven refraction.
STORY: The visitor inspects a dated review under lab light, believes the formula is inspectable, and hops to the official checkout.
FIRST VIEWPORT: Full-bleed ink field. Copy left on a glass veil. Right: jar on an elliptical glass plate with live caustics. Citric CTA. No heat, no screen-blend.
FORM: Overdrive glass-lab (user-locked). Seed: overdrive-glass-lab.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

const MINERAL_FOLIO_CONTRACT = `<!--
THESIS: A mineral compounding folio on celadon blotter — not a sales HUD, not a clinic chart, not a glass lab.
OWN-WORLD: Cool mineral paper, pharmacy ink, brass-ochre accent from the yellow capsules, Bodoni masthead + Figtree reading type, hairline rules.
STORY: A skeptical US reader tests the TikTok hair brand for 90 days, picks inside-out pills or the Haircare Set ritual, and hops only to official stores.
FIRST VIEWPORT: Editorial bar, sentence-case 90-day headline, four-question annotation quiz, bottle still-life with no glow. Dual official CTAs, never checkout.
FORM: Mineral Folio. Seed: mineral-folio-desk.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

function ReviewSkepticApp() {
  const pathname = getPathname();
  const legal = isCompliancePath(pathname);
  const { emphasis } = useProtocolEmphasis();

  return (
    <main
      data-layout="review-skeptic"
      data-protocol-emphasis={emphasis}
      className="bg-cyber-black text-cyber-titanium antialiased pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
    >
      <span hidden aria-hidden dangerouslySetInnerHTML={{ __html: MINERAL_FOLIO_CONTRACT }} />
      <EditorialBar />
      {legal ? (
        <CompliancePageView />
      ) : (
        <>
          <SkepticHero />
          {product.sections.map((id) => {
            if (id === "pricing") return null;
            const Component = OPTIONAL_SECTION_COMPONENTS[id as OptionalSectionId];
            return Component ? <Component key={id} /> : null;
          })}
        </>
      )}
      <PageFooter />
      {legal ? null : <StickyCta />}
    </main>
  );
}

export default function App() {
  const layout = activeLayout();

  if (isReviewSkepticLayout()) {
    return (
      <ProtocolEmphasisProvider>
        <ReviewSkepticApp />
      </ProtocolEmphasisProvider>
    );
  }

  return (
    <main
      data-layout={layout}
      className="bg-cyber-black text-cyber-titanium antialiased pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
    >
      {layout === "review-offer" ? (
        <span hidden aria-hidden dangerouslySetInnerHTML={{ __html: GLASS_LAB_CONTRACT }} />
      ) : null}
      <Hero />

      {product.sections.map((id) => {
        if (id === "pricing") {
          if (layout === "review" || layout === "review-offer") return null;
          return <Pricing key="pricing" />;
        }

        const Component = OPTIONAL_SECTION_COMPONENTS[id as OptionalSectionId];
        return Component ? <Component key={id} /> : null;
      })}

      <PageFooter />
      <StickyCta />
    </main>
  );
}
