import { PageFooter } from "@/components/page-footer";
import { StickyCta } from "@/components/sticky-cta";
import { Hero } from "@/sections/Hero";
import { Pricing } from "@/sections/Pricing";
import { OPTIONAL_SECTION_COMPONENTS } from "@/product/registry";
import { product } from "@/product/active";
import type { OptionalSectionId } from "@/product/types";

export default function App() {
  return (
    <main className="bg-cyber-black text-cyber-titanium antialiased pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <Hero />

      {product.sections.map((id) => {
        if (id === "pricing") return <Pricing key="pricing" />;

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
