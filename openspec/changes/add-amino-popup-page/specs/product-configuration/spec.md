## MODIFIED Requirements

### Requirement: Produto configuration schema
The system SHALL define a single configuration schema per Produto capturing identity, locale, palette token values, layout mode (`sales` or `review`, defaulting to `sales`), active sections, an optional spokesperson, an optional lead-capture hook, tracking tags, an optional Página-popup (`popupGate`), and disclaimers, consumed by the Base to produce one Instância. A `sales` Produto SHALL include plans. A `review` Produto SHALL include an outbound CTA (label and hop/official URL) and SHALL NOT include plans. A review Produto MAY include `popupGate` with decorative backdrop cards; those cards SHALL NOT count as plans.

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

#### Scenario: Review config with popupGate and no plans succeeds
- **WHEN** a Produto config sets `layout` to `"review"`, omits `plans`, and defines a valid `popupGate` including backdrop cards
- **THEN** the build SHALL succeed and SHALL emit both the review root page and the Página-popup

## ADDED Requirements

### Requirement: PopupGate fields are validated when present
When `popupGate` is set, the config SHALL include a single path segment (no slashes), a non-empty `checkoutHref`, a non-empty `sourceParam`, and a non-empty `defaultSource`. Backdrop cards, when present, SHALL each include name, image, and price. Missing popupGate fields SHALL fail the build.

#### Scenario: PopupGate missing checkoutHref fails the build
- **WHEN** a Produto config sets `popupGate` without `checkoutHref`
- **THEN** the build SHALL fail, reporting the missing `popupGate.checkoutHref` field

#### Scenario: PopupGate path with a slash fails the build
- **WHEN** a Produto config sets `popupGate.path` to a value containing `/`
- **THEN** the build SHALL fail, reporting that the path must be a single segment
