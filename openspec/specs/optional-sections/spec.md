# optional-sections Specification

## Purpose
TBD - created by archiving change extract-reusable-base. Update Purpose after archive.
## Requirements
### Requirement: Mandatory core sections
Every sales Instância SHALL include a Hero section, a Pricing section, and a footer, regardless of optional modules. Every review Instância SHALL include a Hero section, an outbound CTA, and a footer, and SHALL NOT be required to include Pricing.

#### Scenario: Minimal sales Produto config
- **WHEN** a sales Produto config specifies no optional sections at all
- **THEN** the built Instância SHALL still render Hero, Pricing, and the footer

#### Scenario: Minimal review Produto config
- **WHEN** a review Produto config specifies no optional sections at all
- **THEN** the built Instância SHALL still render Hero, the outbound CTA, and the footer, and SHALL NOT render Pricing

### Requirement: Optional section modules
A Produto config SHALL be able to independently enable, disable, and order each of the following section modules: Manifesto/Spokesperson, mechanism sections (e.g. Power Grid, Tech Mechanism), Testimonials, FAQ, lead capture, a restricted/bonus-content section, and — on review layout — the editorial modules pain, research, official-claims, and verdict.

#### Scenario: Produto without mechanism sections
- **WHEN** a Produto config does not enable any mechanism section
- **THEN** the built Instância SHALL omit those sections entirely, with no placeholder left in their place

#### Scenario: Produto reorders optional sections
- **WHEN** a Produto config lists Testimonials before FAQ
- **THEN** the built Instância SHALL render Testimonials before FAQ

#### Scenario: Review Produto orders editorial sections
- **WHEN** a review Produto lists `verdict` before `faq`
- **THEN** the built Instância SHALL render the verdict block before the FAQ
