## ADDED Requirements

### Requirement: Review-skeptic config
A Produto config MAY set `layout` to `"review-skeptic"`. A review-skeptic Produto SHALL include `catalog.pills` and `catalog.spray` each with a non-empty `productName` and `outboundCta` label and href, a protocol quiz of four questions, affiliate disclosure text, an editorial-bar `asOf` date, and `compliancePages` for terms, privacy, medical disclaimer, and about. It SHALL NOT include `plans`, `"pricing"` in `sections`, `popupGate`, or the legacy single `outboundCta` field. The two catalog hrefs SHALL be distinct. The build SHALL fail if those rules are broken.

#### Scenario: Review-skeptic missing catalog hop fails the build
- **WHEN** a Produto config sets `layout` to `"review-skeptic"` and omits `catalog.spray.outboundCta.href`
- **THEN** the build SHALL fail before producing an Instância, reporting the missing spray hop

#### Scenario: Review-skeptic with plans fails the build
- **WHEN** a Produto config sets `layout` to `"review-skeptic"` and also defines one or more plans
- **THEN** the build SHALL fail before producing an Instância

#### Scenario: Review-skeptic with legacy single outboundCta fails the build
- **WHEN** a Produto config sets `layout` to `"review-skeptic"` and also sets `outboundCta`
- **THEN** the build SHALL fail before producing an Instância, reporting that dual catalog hops replace `outboundCta`

#### Scenario: Valid review-skeptic config builds
- **WHEN** a Produto config sets `layout` to `"review-skeptic"` with dual catalog hops, quiz, locale disclosure, identity, SEO, tokens, ordered acts, matching content blocks, and compliance pages, and omits `plans`, `outboundCta`, and `popupGate`
- **THEN** the build SHALL succeed and SHALL emit the review-skeptic Instância

### Requirement: Review-skeptic content required for listed acts
When a review-skeptic Produto lists `skepticism`, `investigation`, `test-diary`, `ugc-mosaic`, `protocol-verdict`, `synergy`, `honesty-scale`, or `safe-buy` in `sections`, the config SHALL include the matching content block. The build SHALL fail if the section is listed without that block. Listing any of those ids on a `review` or `review-offer` Produto SHALL fail the build.

#### Scenario: Listed skepticism section without content
- **WHEN** a review-skeptic Produto lists `"skepticism"` in `sections` but omits the skepticism content block
- **THEN** the build SHALL fail, reporting that `skepticism` is listed without content

#### Scenario: Editorial review rejects skeptic act ids
- **WHEN** a `review` Produto lists `"protocol-verdict"` in `sections`
- **THEN** the build SHALL fail before producing an Instância

## MODIFIED Requirements

### Requirement: Produto configuration schema
The system SHALL define a single configuration schema per Produto capturing identity, locale, palette token values, layout mode (`sales` or `review` or `review-offer` or `review-skeptic`, defaulting to `sales`), active sections, an optional spokesperson, an optional lead-capture hook, tracking tags, and disclaimers, consumed by the Base to produce one Instância. A `sales` Produto SHALL include plans. A `review` Produto SHALL include an outbound CTA (label and hop/official URL) and SHALL NOT include plans. A `review-offer` Produto SHALL include an outbound CTA and SHALL NOT include plans. A `review-skeptic` Produto SHALL include a dual protocol catalog (pills and spray hops) and SHALL NOT include plans or a single `outboundCta`.

#### Scenario: Valid Produto config selected for build
- **WHEN** a build is invoked with a Produto identifier whose config satisfies the schema
- **THEN** the build SHALL produce a single Instância containing only that Produto's palette, copy, sections, and links

#### Scenario: Missing required field fails the build
- **WHEN** a Produto config omits a required field defined by the schema (e.g. affiliate disclosure text)
- **THEN** the build SHALL fail before producing an Instância, reporting which required field is missing

#### Scenario: Review config missing outbound CTA fails the build
- **WHEN** a Produto config sets `layout` to `"review"` and omits `outboundCta` label or href
- **THEN** the build SHALL fail before producing an Instância, reporting the missing outbound CTA field

#### Scenario: Review config with plans fails the build
- **WHEN** a Produto config sets `layout` to `"review"` and also defines one or more plans
- **THEN** the build SHALL fail before producing an Instância

### Requirement: Layout mode on Produto config
A Produto config MAY set `layout` to `"sales"`, `"review"`, `"review-offer"`, or `"review-skeptic"`. When the field is omitted, the Base SHALL treat the Produto as `"sales"`.

#### Scenario: Existing Produto omits layout
- **WHEN** a Produto config does not set `layout`
- **THEN** the build SHALL treat it as a sales Produto and SHALL apply the existing sales validation rules (plans required, Pricing required)

#### Scenario: Review-skeptic layout is distinct from sales and review
- **WHEN** a Produto config sets `layout` to `"review-skeptic"`
- **THEN** the build SHALL apply review-skeptic validation rules and SHALL NOT require sales plans or a single `outboundCta`
