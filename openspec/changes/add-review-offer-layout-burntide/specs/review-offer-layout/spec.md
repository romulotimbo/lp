## ADDED Requirements

### Requirement: Review-offer layout shell
A Produto config MAY set `layout` to `"review-offer"`. When it does, the built Instância SHALL render an advertorial review-offer shell (Hero, configured offer modules, repeated outbound CTA, footer) instead of the sales shell or the editorial review shell. The Instância SHALL NOT render Pricing, HUD tags, Spokesperson video, or checkout plan cards.

#### Scenario: Review-offer Produto builds the advertorial shell
- **WHEN** a Produto config sets `layout` to `"review-offer"`
- **THEN** the built Instância SHALL render Hero, the configured modules, an outbound CTA, and the footer, and SHALL NOT render Pricing, HUD tags, or checkout plan cards

#### Scenario: Review layout stays editorial
- **WHEN** a Produto config sets `layout` to `"review"`
- **THEN** the built Instância SHALL keep the existing editorial review shell and SHALL NOT render review-offer modules unless those ids are also valid on review and explicitly listed

### Requirement: Review-offer section modules
A review-offer Instância SHALL support the section ids `what-is`, `formula`, `authenticity`, `side-effects`, `pros-cons`, and `offer` as independently enabled, disabled, and ordered modules. Each enabled id SHALL render from the matching config block. A review-offer Instância MAY also enable `guarantee`, `faq`, `trust`, and `mid-cta`.

#### Scenario: Burntide enables the advertorial stack
- **WHEN** a review-offer Produto lists `what-is`, `formula`, `authenticity`, `side-effects`, `pros-cons`, `offer`, `guarantee`, and `faq` in `sections`
- **THEN** the Instância SHALL render those modules in that list order, each using the configured copy and the shared outbound hop where a CTA is shown

#### Scenario: Review-offer module omitted
- **WHEN** a review-offer Produto does not list `pros-cons` in `sections`
- **THEN** the Instância SHALL omit the pros-cons block entirely, with no placeholder

### Requirement: Dated offer table is not Pricing
A review-offer Instância MAY render an `offer` module that displays dated package prices from the official store. Those packages SHALL be display-only: each CTA SHALL navigate to `outboundCta.href` and SHALL NOT create Base checkout plan cards or a `#pricing` section. The `offer` block SHALL include a non-empty `asOf` date and `sourceLabel`.

#### Scenario: Visitor follows an offer package CTA
- **WHEN** a visitor clicks a package card or the offer-section CTA on a review-offer Instância
- **THEN** the browser SHALL navigate to the Produto's configured outbound hop/official URL and SHALL NOT submit a checkout form on the Instância

#### Scenario: Offer without a date fails the build
- **WHEN** a review-offer Produto lists `offer` but omits `offer.asOf` or `offer.sourceLabel`
- **THEN** the build SHALL fail before producing an Instância

### Requirement: Shared outbound CTA on review-offer
A review-offer Instância SHALL expose a single outbound CTA (label + hop/official URL) used by the Hero, authenticity, offer, guarantee, footer, and mobile sticky bar. Section-specific `ctaLabel` values MAY change the visible button text. The href SHALL remain `outboundCta.href`. Clicks on that CTA SHALL NOT fire checkout conversion events.

#### Scenario: Visitor follows any review-offer CTA
- **WHEN** a visitor clicks the Hero, authenticity, offer, guarantee, footer, or sticky control on a review-offer Instância
- **THEN** the browser SHALL navigate to the Produto's configured outbound hop/official URL

### Requirement: Clinical chrome without sales HUD
A review-offer Instância SHALL use sentence-case headings, the Produto token palette, and SHALL NOT render HUD tags, `HUD::` locks, neon product glow, or sales-style uppercase display type. Review-offer chrome MAY show editorial eyebrows, trust chips, a package table, and repeated outbound CTAs.

#### Scenario: Review-offer Hero without sales chrome
- **WHEN** a review-offer Instância renders the Hero
- **THEN** the Hero SHALL show sentence-case headline, subhead, product image, and outbound CTA, and SHALL NOT show a spokesperson video, HUD tag, or neon glow around the product
