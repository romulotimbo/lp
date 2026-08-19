## MODIFIED Requirements

### Requirement: Outbound CTA replaces Pricing
A review Instância SHALL expose a single outbound CTA (label + hop/official URL) used by the Hero, each enabled editorial article block (`pain`, `research`, `official-claims`, `verdict`), the footer, the mobile sticky bar, FAQ when enabled, and any enabled `guarantee` or `mid-cta` modules. That CTA SHALL navigate to the configured official/hop URL (hash fragments SHALL be preserved) and SHALL NOT present plan prices or checkout links. Clicks on that CTA SHALL NOT fire checkout conversion events.

#### Scenario: Visitor follows the review CTA
- **WHEN** a visitor clicks the Hero, an editorial-fold, verdict, footer, sticky, FAQ, guarantee, or mid-cta control on a review Instância
- **THEN** the browser SHALL navigate to the Produto's configured outbound hop/official URL

#### Scenario: Editorial fold CTA appears without scrolling to the footer
- **WHEN** a review Produto enables `pain`, `research`, and `official-claims`
- **THEN** each of those article blocks SHALL render the shared outbound CTA after its body, so a visitor can leave for the official URL mid-article

#### Scenario: Affiliate hash on the official URL is preserved
- **WHEN** `outboundCta.href` includes a hash fragment such as `#aff=romulotsilva21c8`
- **THEN** the rendered links SHALL include that fragment unchanged

#### Scenario: Review Instância has no pricing cards
- **WHEN** a review Instância is rendered
- **THEN** the page SHALL NOT display plan prices, kit cards, or a `#pricing` section

### Requirement: Conversion modules on review layout
A review Instância SHALL support the section ids `trust`, `highlights`, `ritual`, `compare`, `guarantee`, and `mid-cta` as independently enabled, disabled, and ordered modules. Each enabled id SHALL render from the matching config block. A sales Instância MAY list these ids only if the corresponding content exists; they remain review-oriented modules and SHALL NOT introduce plan prices.

#### Scenario: Audifort enables the conversion stack
- **WHEN** a review Produto lists `trust`, `highlights`, `ritual`, `compare`, `guarantee`, and `mid-cta` in `sections`
- **THEN** the Instância SHALL render those modules in that list order, each using the configured copy and the shared outbound hop where a CTA is shown

#### Scenario: Complete review enables guarantee without the full conversion stack
- **WHEN** a review Produto lists `guarantee` among editorial ids and omits `highlights`, `ritual`, and `compare`
- **THEN** the Instância SHALL render the guarantee module in list order with the shared outbound CTA and SHALL NOT render the omitted modules

#### Scenario: Conversion module omitted
- **WHEN** a review Produto does not list `compare` in `sections`
- **THEN** the Instância SHALL omit the compare block entirely, with no placeholder
