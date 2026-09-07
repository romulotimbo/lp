import { PageFooter } from "@/components/page-footer";
import { StickyCta } from "@/components/sticky-cta";
import { Hero } from "@/sections/Hero";
import { Pricing } from "@/sections/Pricing";
import { OPTIONAL_SECTION_COMPONENTS } from "@/product/registry";
import { activeLayout, product } from "@/product/active";
import type { OptionalSectionId } from "@/product/types";

const GLASS_LAB_CONTRACT = `<!--
THESIS: A metabolic glass lab after hours — the jar sits on a refractive plate, not a fire. Refuses the fat-burner ember letter.
OWN-WORLD: Ink ground, citric-amber reagent light, optical edges, glass slabs, Sora display. Rest-state caustic ridges; pointer modulates; scroll-driven refraction.
STORY: The visitor inspects a dated review under lab light, believes the formula is inspectable, and hops to the official checkout.
FIRST VIEWPORT: Full-bleed ink field. Copy left on a glass veil. Right: jar on an elliptical glass plate with live caustics. Citric CTA. No heat, no screen-blend.
FORM: Overdrive glass-lab (user-locked). Seed: overdrive-glass-lab.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function App() {
  const layout = activeLayout();

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
        // Seções desconhecidas ou sem componente próprio (ex. "lead-capture",
        // que é consumido por outra seção) simplesmente não produzem bloco.
        return Component ? <Component key={id} /> : null;
      })}

      <PageFooter />
      <StickyCta />
    </main>
  );
}
