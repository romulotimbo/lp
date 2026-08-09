## ADDED Requirements

### Requirement: Mandatory core sections
Every Instância SHALL include a Hero section, a Pricing section, and a footer, regardless of Produto config.

#### Scenario: Minimal Produto config
- **WHEN** a Produto config specifies no optional sections at all
- **THEN** the built Instância SHALL still render Hero, Pricing, and the footer

### Requirement: Optional section modules
A Produto config SHALL be able to independently enable, disable, and order each of the following section modules: Manifesto/Spokesperson, mechanism sections (e.g. Power Grid, Tech Mechanism), Testimonials, FAQ, lead capture, and a restricted/bonus-content section.

#### Scenario: Produto without mechanism sections
- **WHEN** a Produto config does not enable any mechanism section
- **THEN** the built Instância SHALL omit those sections entirely, with no placeholder left in their place

#### Scenario: Produto reorders optional sections
- **WHEN** a Produto config lists Testimonials before FAQ
- **THEN** the built Instância SHALL render Testimonials before FAQ
