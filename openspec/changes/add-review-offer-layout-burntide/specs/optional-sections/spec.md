## ADDED Requirements

### Requirement: Review-offer optional modules
A Produto config SHALL be able to independently enable, disable, and order the review-offer modules `what-is`, `formula`, `authenticity`, `side-effects`, `pros-cons`, and `offer`. A review Instância SHALL NOT be required to list those ids. Listing `offer` on a `review` Produto SHALL fail the build.

#### Scenario: Review-offer orders advertorial sections
- **WHEN** a review-offer Produto lists `authenticity` before `side-effects` and `offer` before `guarantee`
- **THEN** the Instância SHALL render those modules in that list order

#### Scenario: Editorial review rejects offer
- **WHEN** a `review` Produto lists `"offer"` in `sections`
- **THEN** the build SHALL fail before producing an Instância

## MODIFIED Requirements

### Requirement: Mandatory core sections
Every sales Instância SHALL include a Hero section, a Pricing section, and a footer, regardless of optional modules. Every review Instância SHALL include a Hero section, an outbound CTA, and a footer, and SHALL NOT be required to include Pricing. Every review-offer Instância SHALL include a Hero section, an outbound CTA, and a footer, and SHALL NOT be required to include Pricing.

#### Scenario: Minimal sales Produto config
- **WHEN** a sales Produto config specifies no optional sections at all
- **THEN** the built Instância SHALL still render Hero, Pricing, and the footer

#### Scenario: Minimal review Produto config
- **WHEN** a review Produto config specifies no optional sections at all
- **THEN** the built Instância SHALL still render Hero, the outbound CTA, and the footer, and SHALL NOT render Pricing

#### Scenario: Minimal review-offer Produto config
- **WHEN** a review-offer Produto config specifies no optional sections at all
- **THEN** the built Instância SHALL still render Hero, the outbound CTA, and the footer, and SHALL NOT render Pricing

### Requirement: Optional section modules
A Produto config SHALL be able to independently enable, disable, and order each of the following section modules: Manifesto/Spokesperson, mechanism sections (e.g. Power Grid, Tech Mechanism), Testimonials, FAQ, lead capture, a restricted/bonus-content section, the editorial modules pain, research, official-claims, and verdict, the review conversion modules trust, highlights, ritual, compare, guarantee, and mid-cta, and the review-offer modules what-is, formula, authenticity, side-effects, pros-cons, and offer.

#### Scenario: Produto without mechanism sections
- **WHEN** a Produto config does not enable any mechanism section
- **THEN** the built Instância SHALL omit those sections entirely, with no placeholder left in their place

#### Scenario: Produto reorders optional sections
- **WHEN** a Produto config lists Testimonials before FAQ
- **THEN** the built Instância SHALL render Testimonials before FAQ

#### Scenario: Review Produto orders editorial sections
- **WHEN** a review Produto lists `verdict` before `faq`
- **THEN** the built Instância SHALL render the verdict block before the FAQ

#### Scenario: Review Produto orders conversion modules
- **WHEN** a review Produto lists `trust` before `research` and `mid-cta` before `verdict`
- **THEN** the Instância SHALL render those modules in that list order
