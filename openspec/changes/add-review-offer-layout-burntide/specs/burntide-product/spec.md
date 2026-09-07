## ADDED Requirements

### Requirement: Burntide review-offer instance
The system SHALL produce a review-offer Instância for the Produto `burntide` at `burntide.thebuylens.com`, with `layout` set to `"review-offer"`, no Spokesperson, no `plans`, and a single outbound CTA whose href is `https://burntide.us/funnelb3/v3/?aff_id=31010`.

#### Scenario: Burntide builds as review-offer without Pricing
- **WHEN** a build is invoked with `PRODUCT=burntide`
- **THEN** the Instância SHALL render the review-offer shell (Hero, configured advertorial modules, outbound CTA, footer) and SHALL NOT render Pricing, HUD tags, Spokesperson video, or checkout plan cards

#### Scenario: Burntide CTA opens the v3 affiliate funnel
- **WHEN** a visitor clicks the Hero, authenticity, offer, guarantee, footer, or sticky CTA on the Burntide Instância
- **THEN** the browser SHALL navigate to `https://burntide.us/funnelb3/v3/?aff_id=31010` and SHALL NOT fire a checkout-initiated event

### Requirement: Burntide ember palette
The Burntide Produto config SHALL supply the six design token roles with a warm light background and an ember accent. Initial values are `background` `#FFF7F0`, `surface` `#FFFFFF`, `textPrimary` `#1C1410`, `textMuted` `#6A5348`, `accent` `#C2410C`, `accentDark` `#9A3412`. Implementation MAY adjust the hex values after sampling the official v3 funnel if button contrast would otherwise fall below 4.5:1, without adding or renaming token roles.

#### Scenario: Burntide tokens apply without extra roles
- **WHEN** the Burntide Instância is built
- **THEN** the page SHALL use six token values in those roles and SHALL NOT introduce additional or renamed token roles

### Requirement: Burntide official facts and compliance
Burntide copy SHALL be en-US advertorial prose based on the official v3/v4 funnels as of September 2026. The Instância SHALL describe Burntide as a once-daily gummy with a 525 mg Apple Cider Vinegar + BHB Salts blend, manufactured in the USA in an FDA-registered, GMP-certified facility, backed by a 60-day money-back guarantee. The config SHALL NOT call the product a capsule, SHALL NOT list Green Tea Extract, L-Carnitine, or Chromium as Burntide ingredients, SHALL NOT use the phrase "FDA-Compliant", SHALL NOT claim the Burntide SKU is clinically tested, and SHALL NOT invent a 1-bottle package. Affiliate disclosure SHALL appear in the footer. Category disclaimers SHALL include the FDA supplement statement.

#### Scenario: Formula names official ingredients
- **WHEN** the Burntide formula section is rendered
- **THEN** the copy SHALL name Apple Cider Vinegar and BHB Salts and SHALL NOT name Green Tea Extract, L-Carnitine, or Chromium as formula ingredients

#### Scenario: Offer table matches official kits
- **WHEN** the Burntide offer section is rendered
- **THEN** the table SHALL show the official 2-, 3-, and 6-bottle packages with dated September 2026 prices ($79 / $69 / $49 per bottle; totals $158 + shipping, $207 + shipping, $294 + free shipping) and SHALL NOT show a 1-bottle $69 kit

#### Scenario: No fabricated clinical claim
- **WHEN** any Burntide section is rendered
- **THEN** the copy SHALL NOT state that Burntide itself was clinically tested, and any cited paper SHALL be attributed to the official page as ingredient research, not as a product trial

#### Scenario: Affiliate disclosure in the footer
- **WHEN** a visitor reaches the Burntide footer
- **THEN** the Instância SHALL display the affiliate disclosure text

### Requirement: Burntide asset mapping
Visual assets SHALL come from the official v3 funnel (bottle, multi-bottle pack, 60-day seal, and label art when published). The Hero SHALL use the bottle shot plus trust chips for the 60-day guarantee, FDA-registered facility, and GMP-certified marks. Official customer quotes with personal names SHALL NOT be republished as first-party testimonials.

#### Scenario: Hero uses the official bottle
- **WHEN** the Burntide Hero is rendered
- **THEN** the product image SHALL be the published Burntide bottle asset from the v3 source set

#### Scenario: Official named reviews stay off the page
- **WHEN** the Burntide Instância is rendered
- **THEN** the page SHALL NOT attribute a testimonial to Henry C., Samuel H., or Harper E.
