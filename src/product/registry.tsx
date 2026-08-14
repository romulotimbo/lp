import type { ComponentType } from "react";
import type { OptionalSectionId } from "./types";
import { Manifesto } from "@/sections/Manifesto";
import { PowerGrid } from "@/sections/PowerGrid";
import { TechMechanism } from "@/sections/TechMechanism";
import { Testimonials } from "@/sections/Testimonials";
import { Faq } from "@/sections/Faq";
import { RestrictedArea } from "@/sections/RestrictedArea";
import { Pain } from "@/sections/Pain";
import { Research } from "@/sections/Research";
import { OfficialClaims } from "@/sections/OfficialClaims";
import { Verdict } from "@/sections/Verdict";
import { Trust } from "@/sections/Trust";
import { Highlights } from "@/sections/Highlights";
import { Ritual } from "@/sections/Ritual";
import { Compare } from "@/sections/Compare";
import { Guarantee } from "@/sections/Guarantee";
import { MidCta } from "@/sections/MidCta";

/**
 * Registro de seções opcionais que renderizam um bloco próprio na página.
 *
 * `"lead-capture"` não está aqui: não é um bloco visual independente, é um
 * módulo que outras seções (hoje, `restricted`) consomem para decidir se
 * oferecem um CTA de captura de e-mail. Ver `RestrictedArea`.
 */
export const OPTIONAL_SECTION_COMPONENTS: Partial<
  Record<OptionalSectionId, ComponentType>
> = {
  manifesto: Manifesto,
  "power-grid": PowerGrid,
  "tech-mechanism": TechMechanism,
  testimonials: Testimonials,
  faq: Faq,
  restricted: RestrictedArea,
  pain: Pain,
  research: Research,
  "official-claims": OfficialClaims,
  verdict: Verdict,
  trust: Trust,
  highlights: Highlights,
  ritual: Ritual,
  compare: Compare,
  guarantee: Guarantee,
  "mid-cta": MidCta,
};
