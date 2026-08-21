## ADDED Requirements

### Requirement: Clone layout config
A Produto config MAY set `layout` to `"clone"`. A clone Produto SHALL include `clone.htmlFile` and `clone.affiliateHref`, SHALL include affiliate disclosure text, and SHALL NOT include `plans`, `popupGate`, or Base section ids that require the sales or review shell. The build SHALL fail if those clone fields are missing or if `plans` / `popupGate` are present.

#### Scenario: Clone missing affiliate href fails the build
- **WHEN** a Produto config sets `layout` to `"clone"` and omits `clone.affiliateHref`
- **THEN** the build SHALL fail before producing an Instância, reporting the missing clone affiliate href

#### Scenario: Clone with plans fails the build
- **WHEN** a Produto config sets `layout` to `"clone"` and also defines one or more plans
- **THEN** the build SHALL fail before producing an Instância

#### Scenario: Clone with popupGate fails the build
- **WHEN** a Produto config sets `layout` to `"clone"` and also defines `popupGate`
- **THEN** the build SHALL fail before producing an Instância

#### Scenario: Valid clone config builds
- **WHEN** a Produto config sets `layout` to `"clone"` with `clone.htmlFile`, `clone.affiliateHref`, locale disclosure, identity, SEO, tokens, and empty or product-specific tracking tags, and omits `plans` and `popupGate`
- **THEN** the build SHALL succeed and SHALL emit the static clone Instância

## MODIFIED Requirements

### Requirement: Produto configuration schema
The system SHALL define a single configuration schema per Produto capturing identity, locale, palette token values, layout mode (`sales`, `review`, or `clone`, defaulting to `sales`), tracking tags, and disclaimers, consumed by the Base to produce one Instância. A `sales` Produto SHALL include plans and active sections. A `review` Produto SHALL include an outbound CTA (label and hop/official URL) and SHALL NOT include plans. A `clone` Produto SHALL include `clone.htmlFile` and `clone.affiliateHref` and SHALL NOT include plans.

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
A Produto config MAY set `layout` to `"sales"`, `"review"`, or `"clone"`. When the field is omitted, the Base SHALL treat the Produto as `"sales"`.

#### Scenario: Existing Produto omits layout
- **WHEN** a Produto config does not set `layout`
- **THEN** the build SHALL treat it as a sales Produto and SHALL apply the existing sales validation rules (plans required, Pricing required)

#### Scenario: Clone layout is distinct from sales and review
- **WHEN** a Produto config sets `layout` to `"clone"`
- **THEN** the build SHALL apply clone validation rules and SHALL NOT require sales plans or a review outbound CTA
