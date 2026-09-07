## ADDED Requirements

### Requirement: Review-offer config
A Produto config MAY set `layout` to `"review-offer"`. A review-offer Produto SHALL include `outboundCta` label and href, SHALL include affiliate disclosure text, and SHALL NOT include `plans`, `"pricing"` in `sections`, or `popupGate`. When `offer` is listed in `sections`, the config SHALL include an `offer` block with non-empty `asOf`, `sourceLabel`, and at least one package. The build SHALL fail if those fields are missing or if `plans` / `"pricing"` / `popupGate` are present.

#### Scenario: Review-offer missing outbound CTA fails the build
- **WHEN** a Produto config sets `layout` to `"review-offer"` and omits `outboundCta` label or href
- **THEN** the build SHALL fail before producing an Instância, reporting the missing outbound CTA field

#### Scenario: Review-offer with plans fails the build
- **WHEN** a Produto config sets `layout` to `"review-offer"` and also defines one or more plans
- **THEN** the build SHALL fail before producing an Instância

#### Scenario: Review-offer listing offer without asOf fails the build
- **WHEN** a review-offer Produto lists `"offer"` in `sections` but omits `offer.asOf`
- **THEN** the build SHALL fail, reporting that `offer` is listed without a dated source

#### Scenario: Valid review-offer config builds
- **WHEN** a Produto config sets `layout` to `"review-offer"` with `outboundCta`, locale disclosure, identity, SEO, tokens, ordered sections, and matching content blocks, and omits `plans` and `popupGate`
- **THEN** the build SHALL succeed and SHALL emit the review-offer Instância

### Requirement: Review-offer content required for listed modules
When a review-offer Produto lists `what-is`, `formula`, `authenticity`, `side-effects`, `pros-cons`, or `offer` in `sections`, the config SHALL include the matching content block. The build SHALL fail if the section is listed without that block.

#### Scenario: Listed formula section without content
- **WHEN** a review-offer Produto lists `"formula"` in `sections` but omits the formula content block
- **THEN** the build SHALL fail, reporting that `formula` is listed without content

## MODIFIED Requirements

### Requirement: Produto configuration schema
The system SHALL define a single configuration schema per Produto capturing identity, locale, palette token values, layout mode (`sales` or `review` or `review-offer`, defaulting to `sales`), active sections, an optional spokesperson, an optional lead-capture hook, tracking tags, and disclaimers, consumed by the Base to produce one Instância. A `sales` Produto SHALL include plans. A `review` Produto SHALL include an outbound CTA (label and hop/official URL) and SHALL NOT include plans. A `review-offer` Produto SHALL include an outbound CTA and SHALL NOT include plans.

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
A Produto config MAY set `layout` to `"sales"`, `"review"`, or `"review-offer"`. When the field is omitted, the Base SHALL treat the Produto as `"sales"`.

#### Scenario: Existing Produto omits layout
- **WHEN** a Produto config does not set `layout`
- **THEN** the build SHALL treat it as a sales Produto and SHALL apply the existing sales validation rules (plans required, Pricing required)

#### Scenario: Review-offer layout is distinct from sales and review
- **WHEN** a Produto config sets `layout` to `"review-offer"`
- **THEN** the build SHALL apply review-offer validation rules and SHALL NOT require sales plans
