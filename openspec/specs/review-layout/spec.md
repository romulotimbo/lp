# review-layout Specification

## Purpose
Define the editorial review shell as an alternative to the sales landing layout: article sections, a single outbound CTA, and clinical chrome, without Pricing or checkout plan cards.
## Requirements
### Requirement: Review layout shell
A Produto config MAY set `layout` to `"review"`. When it does, the built Instância SHALL render an editorial review shell (article sections, outbound CTA, clinical chrome) instead of the sales shell (HUD, Pricing, checkout CTAs). When `layout` is omitted or set to `"sales"`, the Instância SHALL keep the existing sales shell unchanged.

#### Scenario: Review Produto builds the editorial shell
- **WHEN** a Produto config sets `layout` to `"review"`
- **THEN** the built Instância SHALL render Hero, the configured editorial and optional modules, an outbound CTA, and the footer, and SHALL NOT render Pricing, HUD tags, or checkout plan cards

#### Scenario: Sales Produto is unchanged
- **WHEN** a Produto config omits `layout` or sets it to `"sales"`
- **THEN** the built Instância SHALL render the existing sales shell, including mandatory Pricing

### Requirement: Editorial article sections
A review Instância SHALL support the section ids `pain`, `research`, `official-claims`, and `verdict` as independently enabled, disabled, and ordered modules. Each enabled id SHALL render one article block from the Produto config (title, body, optional eyebrow and figure) in sentence case, without HUD chrome.

#### Scenario: Amino enables the four editorial blocks
- **WHEN** a review Produto lists `pain`, `research`, `official-claims`, and `verdict` in `sections`
- **THEN** the Instância SHALL render those four article blocks in that list order

#### Scenario: Editorial section omitted
- **WHEN** a review Produto does not list `research` in `sections`
- **THEN** the Instância SHALL omit the research block entirely, with no placeholder

### Requirement: Outbound CTA replaces Pricing
A review Instância SHALL expose a single outbound CTA (label + hop/official URL) used by the Hero, the verdict block, the footer, and the mobile sticky bar. That CTA SHALL navigate to the configured official/hop URL and SHALL NOT present plan prices or checkout links.

#### Scenario: Visitor follows the review CTA
- **WHEN** a visitor clicks the Hero, verdict, footer, or sticky CTA on a review Instância
- **THEN** the browser SHALL navigate to the Produto's configured outbound hop/official URL

#### Scenario: Review Instância has no pricing cards
- **WHEN** a review Instância is rendered
- **THEN** the page SHALL NOT display plan prices, kit cards, or a `#pricing` section

### Requirement: Clinical chrome on review layout
A review Instância SHALL use sentence-case headings, the Produto token palette (including light backgrounds), and SHALL NOT render HUD tags, `HUD::` locks, neon product glow, or sales-style uppercase display type.

#### Scenario: Review Hero without sales chrome
- **WHEN** a review Instância renders the Hero
- **THEN** the Hero SHALL show sentence-case headline, subhead, product image, and outbound CTA, and SHALL NOT show a spokesperson video, HUD tag, or neon glow around the product

### Requirement: Sales modules available without HUD on review
A review Produto MAY enable Testimonials and FAQ. When enabled on `layout: "review"`, those modules SHALL render without HUD tags and without uppercase display treatment.

#### Scenario: Review FAQ without HUD
- **WHEN** a review Produto includes `faq` in `sections`
- **THEN** the Instância SHALL render the FAQ accordion using the review clinical chrome, with no HUD tag

#### Scenario: Review testimonials without HUD
- **WHEN** a review Produto includes `testimonials` in `sections`
- **THEN** the Instância SHALL render the testimonials using the review clinical chrome, with no HUD tag
