## MODIFIED Requirements

### Requirement: Optional section modules
A Produto config SHALL be able to independently enable, disable, and order each of the following section modules: Manifesto/Spokesperson, mechanism sections (e.g. Power Grid, Tech Mechanism), Testimonials, FAQ, lead capture, a restricted/bonus-content section, the editorial modules pain, research, official-claims, and verdict, and the review conversion modules trust, highlights, ritual, compare, guarantee, and mid-cta.

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
