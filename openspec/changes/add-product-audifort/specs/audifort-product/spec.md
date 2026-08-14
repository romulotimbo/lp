## ADDED Requirements

### Requirement: Audifort review instance
The system SHALL produce a review Instância for the Produto `audifort` at `audifort.nothforge.com`, with `layout` set to `"review"`, no Spokesperson, no plans, and a single outbound CTA whose href is the ClickBank hop `https://hop.clickbank.net/?affiliate=romulotsil&vendor=audifort&pid=pre1`.

#### Scenario: Audifort builds as review without pricing
- **WHEN** a build is invoked with `PRODUCT=audifort`
- **THEN** the Instância SHALL render the editorial review shell (Hero, configured article sections, outbound CTA, footer) and SHALL NOT render Pricing, HUD tags, Spokesperson video, or checkout plan cards

#### Scenario: Audifort CTA opens the official hop
- **WHEN** a visitor clicks the Hero, verdict, footer, or sticky CTA on the Audifort Instância
- **THEN** the browser SHALL navigate to `https://hop.clickbank.net/?affiliate=romulotsil&vendor=audifort&pid=pre1` and SHALL NOT fire a checkout-initiated event

### Requirement: Audifort amber palette
The Audifort Produto config SHALL supply the six design token roles with a warm light background and an amber/bronze accent (`background` `#F7F3EA`, `surface` `#FFFCF7`, `textPrimary` `#2A2218`, `textMuted` `#6E6256`, `accent` `#9A5A16`, `accentDark` `#734210`).

#### Scenario: Audifort tokens apply without extra roles
- **WHEN** the Audifort Instância is built
- **THEN** the page SHALL use those six token values and SHALL NOT introduce additional or renamed token roles

### Requirement: Audifort copy and claims compliance
Audifort copy SHALL be first-person review prose in `en-US`, SHALL NOT use the word "independent", SHALL NOT state prices or kit totals, and SHALL attribute health and formula claims only to what the official Audifort page already states. The config SHALL NOT invent an aggregate review count or average rating. Affiliate disclosure SHALL appear in the footer. Category disclaimers SHALL include the FDA supplement statement and the ClickBank-as-retailer statement.

#### Scenario: No fabricated review stats
- **WHEN** the research or official-claims block is rendered
- **THEN** the copy SHALL NOT include an invented review count, star average, or "most-cited usage period"

#### Scenario: No medical cure claims
- **WHEN** any Audifort section is rendered
- **THEN** the copy SHALL NOT claim that Audifort cures, restores hearing, or eliminates tinnitus

#### Scenario: Affiliate disclosure in the footer
- **WHEN** a visitor reaches the Audifort footer
- **THEN** the Instância SHALL display the affiliate disclosure text (and SHALL NOT require a top disclosure bar)

### Requirement: Audifort asset mapping
The Audifort Hero SHALL use `bottle-label.webp` as the product image. The pain section, when enabled, SHALL use a `person*` photo as an editorial figure whose alt text does not name the subject. Testimonials, when enabled, SHALL use original initials-only notes with empty avatars and SHALL NOT use `person*` photos as reviewer faces. Multi-bottle kit shots (`PRODx2`, `PRODx3`, `PRODx6`) SHALL NOT appear on the Instância.

#### Scenario: Hero uses the bottle plate
- **WHEN** the Audifort Hero is rendered
- **THEN** the product image SHALL be the published `bottle-label.webp` asset

#### Scenario: Pain figure has no invented identity
- **WHEN** the Audifort pain section is rendered with a person photo
- **THEN** the figure alt text SHALL NOT include a personal name, and no testimonial SHALL be attributed to that photo

#### Scenario: Kit shots stay off the page
- **WHEN** the Audifort Instância is rendered
- **THEN** the page SHALL NOT display `PRODx2`, `PRODx3`, or `PRODx6` images
