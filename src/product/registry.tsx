import type { ComponentType } from "react";
import type { OptionalSectionId } from "./types";
import { Manifesto } from "@/sections/Manifesto";
import { PowerGrid } from "@/sections/PowerGrid";
import { TechMechanism } from "@/sections/TechMechanism";
import { Testimonials } from "@/sections/Testimonials";
import { Faq } from "@/sections/Faq";
import { RestrictedArea } from "@/sections/RestrictedArea";

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
};
