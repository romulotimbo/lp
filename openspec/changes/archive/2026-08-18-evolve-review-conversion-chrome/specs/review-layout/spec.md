## MODIFIED Requirements

### Requirement: Outbound CTA replaces Pricing
A review Instância SHALL expose a single outbound CTA (label + hop/official URL) used by the Hero, the verdict block, the footer, the mobile sticky bar, and any enabled `guarantee` or `mid-cta` modules. That CTA SHALL navigate to the configured official/hop URL and SHALL NOT present plan prices or checkout links. Clicks on that CTA SHALL NOT fire checkout conversion events.

#### Scenario: Visitor follows the review CTA
- **WHEN** a visitor clicks the Hero, verdict, footer, sticky, guarantee, or mid-cta control on a review Instância
- **THEN** the browser SHALL navigate to the Produto's configured outbound hop/official URL

#### Scenario: Review Instância has no pricing cards
- **WHEN** a review Instância is rendered
- **THEN** the page SHALL NOT display plan prices, kit cards, or a `#pricing` section

### Requirement: Clinical chrome on review layout
A review Instância SHALL use sentence-case headings, the Produto token palette (including light or dark backgrounds), and SHALL NOT render HUD tags, `HUD::` locks, neon product glow, or sales-style uppercase display type. Review chrome MAY show editorial eyebrows, trust chips, and repeated outbound CTAs.

#### Scenario: Review Hero without sales chrome
- **WHEN** a review Instância renders the Hero
- **THEN** the Hero SHALL show sentence-case headline, subhead, product image, and outbound CTA, and SHALL NOT show a spokesperson video, HUD tag, or neon glow around the product

#### Scenario: Review Hero with trust chips
- **WHEN** a review Produto sets `hero.chips` with one or more items
- **THEN** the Hero SHALL render those chips near the primary outbound CTA

## ADDED Requirements

### Requirement: Conversion modules on review layout
A review Instância SHALL support the section ids `trust`, `highlights`, `ritual`, `compare`, `guarantee`, and `mid-cta` as independently enabled, disabled, and ordered modules. Each enabled id SHALL render from the matching config block. A sales Instância MAY list these ids only if the corresponding content exists; they remain review-oriented modules and SHALL NOT introduce plan prices.

#### Scenario: Audifort enables the conversion stack
- **WHEN** a review Produto lists `trust`, `highlights`, `ritual`, `compare`, `guarantee`, and `mid-cta` in `sections`
- **THEN** the Instância SHALL render those modules in that list order, each using the configured copy and the shared outbound hop where a CTA is shown

#### Scenario: Conversion module omitted
- **WHEN** a review Produto does not list `compare` in `sections`
- **THEN** the Instância SHALL omit the compare block entirely, with no placeholder
