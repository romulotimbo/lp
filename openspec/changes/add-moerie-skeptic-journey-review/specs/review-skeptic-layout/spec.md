## ADDED Requirements

### Requirement: Review-skeptic layout shell
A Produto config MAY set `layout` to `"review-skeptic"`. When it does, the built Instância SHALL render the skeptic-journey shell: an editorial transparency bar, a Hero with the protocol quiz, the configured narrative acts, dual official outbound hops, compliance footer links, and SHALL NOT render Pricing, HUD tags, Spokesperson video, checkout plan cards, or the generic review section ids `pain`, `research`, `official-claims`, and `verdict` as the page skeleton.

#### Scenario: Review-skeptic Produto builds the skeptic shell
- **WHEN** a Produto config sets `layout` to `"review-skeptic"`
- **THEN** the built Instância SHALL render the editorial bar, Hero, protocol quiz, configured acts, dual outbound hops, and footer, and SHALL NOT render Pricing, HUD tags, or checkout plan cards

#### Scenario: Review layout stays the single-hop editorial shell
- **WHEN** a Produto config sets `layout` to `"review"`
- **THEN** the Instância SHALL keep the existing editorial review shell and SHALL NOT render review-skeptic acts unless those ids are also valid on review (they are not)

#### Scenario: Review-offer layout stays the dated-offer shell
- **WHEN** a Produto config sets `layout` to `"review-offer"`
- **THEN** the Instância SHALL keep the existing review-offer shell and SHALL NOT render review-skeptic acts

### Requirement: Narrative act modules
A review-skeptic Instância SHALL support the section ids `skepticism`, `investigation`, `test-diary`, `ugc-mosaic`, `protocol-verdict`, `synergy`, `honesty-scale`, and `safe-buy` as independently enabled, disabled, and ordered modules. Each enabled id SHALL render from the matching config block. The editorial bar, Hero, and protocol quiz SHALL render even when `sections` is empty.

#### Scenario: Moérie enables the skeptic-journey stack
- **WHEN** a review-skeptic Produto lists `skepticism`, `investigation`, `test-diary`, `ugc-mosaic`, `protocol-verdict`, `synergy`, `honesty-scale`, and `safe-buy` in `sections`
- **THEN** the Instância SHALL render those modules in that list order, in English, using the configured copy and the matching catalog hop where a CTA is shown

#### Scenario: Review-skeptic module omitted
- **WHEN** a review-skeptic Produto does not list `ugc-mosaic` in `sections`
- **THEN** the Instância SHALL omit the UGC mosaic entirely, with no placeholder

### Requirement: Dual official hops are not Pricing
A review-skeptic Instância SHALL expose two outbound hops from `catalog.pills.outboundCta` and `catalog.spray.outboundCta`. Act 4 SHALL render both protocol cards in the document. Act 5 SHALL present the complementary SKU. Act 7 SHALL present both official CTAs side by side. Clicks SHALL navigate to the chosen SKU's official/hop URL and SHALL NOT create Base checkout plan cards or a `#pricing` section.

#### Scenario: Visitor follows the pills official CTA
- **WHEN** a visitor clicks a pills CTA on the Hero, Act 4, Act 5, Act 7, footer, or sticky bar
- **THEN** the browser SHALL navigate to `catalog.pills.outboundCta.href` and SHALL NOT submit a checkout form on the Instância

#### Scenario: Visitor follows the spray official CTA
- **WHEN** a visitor clicks a spray CTA on Act 4, Act 5, Act 7, footer, or sticky bar
- **THEN** the browser SHALL navigate to `catalog.spray.outboundCta.href` and SHALL NOT submit a checkout form on the Instância

#### Scenario: Both protocol cards exist without a quiz
- **WHEN** the page is rendered with no quiz answers
- **THEN** both the pills card and the spray card SHALL be present in the document with their full recommendation copy and CTAs

### Requirement: Editorial bar on review-skeptic
A review-skeptic Instância SHALL render a top editorial transparency bar containing an independent-review tag, affiliate-or-relationship disclosure with a learn-more link, a non-empty updated-as-of date, and a reading-time indicator. The bar SHALL be in the initial HTML.

#### Scenario: Editorial bar is visible on first paint
- **WHEN** a review-skeptic Instância is rendered
- **THEN** the document SHALL include the independent-review tag, the relationship disclosure, the `asOf` date, and the reading time without requiring a quiz or other scripted interaction

### Requirement: English skeptic chrome without sales HUD
A review-skeptic Instância SHALL use `en-US` sentence-case headings, the Produto token palette, and SHALL NOT render HUD tags, `HUD::` locks, neon product glow, or sales-style uppercase display type. Visible copy SHALL be English. The layout SHALL NOT reuse the generic review modules `pain`, `research`, `official-claims`, or `verdict` as its narrative skeleton.

#### Scenario: Review-skeptic Hero without sales chrome
- **WHEN** a review-skeptic Instância renders the Hero
- **THEN** the Hero SHALL show a sentence-case skeptic headline, English subhead, protocol quiz, and SHALL NOT show a spokesperson video, HUD tag, or neon glow around the product

#### Scenario: Generic review skeleton is absent
- **WHEN** a review-skeptic Instância is rendered
- **THEN** the page SHALL NOT use `pain`, `research`, `official-claims`, or `verdict` section ids as the article structure

### Requirement: Prerendered article HTML
A review-skeptic build SHALL emit prerendered HTML for `/` in which the Hero headline and the titles of every enabled act are present as text in the file. The first document returned for `/` SHALL NOT be an empty application shell that only fills after JavaScript.

#### Scenario: Built index contains editorial titles without executing JS
- **WHEN** `build` runs for a review-skeptic Produto that lists all eight act ids
- **THEN** the emitted `/` HTML SHALL contain the Hero headline and the titles of Acts 1 through 7 as plain text in the document
