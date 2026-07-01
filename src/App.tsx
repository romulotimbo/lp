import { StickyCta } from "@/components/sticky-cta";
import { Hero } from "@/sections/Hero";
import { Manifesto } from "@/sections/Manifesto";
import { PowerGrid } from "@/sections/PowerGrid";
import { TechMechanism } from "@/sections/TechMechanism";
import { Testimonials } from "@/sections/Testimonials";
import { Pricing } from "@/sections/Pricing";
import { Faq } from "@/sections/Faq";
import { RestrictedArea } from "@/sections/RestrictedArea";

export default function App() {
  return (
    <main className="bg-cyber-black text-cyber-titanium antialiased pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <Hero />
      <Manifesto />
      <PowerGrid />
      <TechMechanism />
      <Testimonials />
      <Pricing />
      <Faq />
      <RestrictedArea />
      <StickyCta />
    </main>
  );
}
