# product-configuration Specification

## Purpose
TBD - created by archiving change extract-reusable-base. Update Purpose after archive.
## Requirements
### Requirement: Produto configuration schema
The system SHALL define a single configuration schema per Produto capturing identity, locale, palette token values, active sections, plans, an optional spokesperson, an optional lead-capture hook, tracking tags, and disclaimers, consumed by the Base to produce one Instância.

#### Scenario: Valid Produto config selected for build
- **WHEN** a build is invoked with a Produto identifier whose config satisfies the schema
- **THEN** the build SHALL produce a single Instância containing only that Produto's palette, copy, sections, and links

#### Scenario: Missing required field fails the build
- **WHEN** a Produto config omits a required field defined by the schema (e.g. affiliate disclosure text)
- **THEN** the build SHALL fail before producing an Instância, reporting which required field is missing

### Requirement: One Produto maps to exactly one Instância
A Produto config SHALL correspond to exactly one built Instância. The same underlying affiliate offer sold under a different Locale or market SHALL be represented as a separate Produto config, not as multiple Instância outputs from one config.

#### Scenario: Same offer in two markets
- **WHEN** the same affiliate offer needs an English/USD Instância and a French/EUR Instância
- **THEN** two separate Produto configs SHALL exist, each producing its own Instância

### Requirement: Shared Base logic propagates to every Produto
Changes to the Base's shared components and section logic SHALL apply to every Produto's next build without requiring changes to that Produto's config.

#### Scenario: Shared component fix
- **WHEN** a bug is fixed in a Base shared component (e.g. `ProductGlow`)
- **THEN** rebuilding any existing Produto SHALL include the fix without modifying that Produto's config

