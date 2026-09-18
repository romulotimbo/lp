## ADDED Requirements

### Requirement: Moérie hair skeptic instance
The system SHALL produce a review-skeptic Instância for the Produto `moerie-hair-boost` at `moerie-hair-boost.thebuylens.com`, in `en-US`, with `layout` set to `"review-skeptic"`, no Spokesperson, no plans, and a dual catalog whose pills hop is the official Moérie pills store and whose spray hop is the official Moérie spray store. Visible copy SHALL be English.

#### Scenario: Moérie builds as review-skeptic without pricing
- **WHEN** a build is invoked with `PRODUCT=moerie-hair-boost`
- **THEN** the Instância SHALL render the skeptic-journey shell (editorial bar, Hero, quiz, acts, dual hops, compliance footer) and SHALL NOT render Pricing, HUD tags, Spokesperson video, or checkout plan cards

#### Scenario: Moérie pills CTA opens the official pills store
- **WHEN** a visitor clicks a pills official CTA on the Moérie Instância
- **THEN** the browser SHALL navigate to the configured pills official/hop URL and SHALL NOT fire a checkout-initiated event

#### Scenario: Moérie spray CTA opens the official spray store
- **WHEN** a visitor clicks a spray official CTA on the Moérie Instância
- **THEN** the browser SHALL navigate to the configured spray official/hop URL and SHALL NOT fire a checkout-initiated event

### Requirement: Moérie narrative copy and claims compliance
Moérie copy SHALL follow the skeptic-journey beats in English: editorial bar tag “Independent Review | Real Hair Project 2026”; Hero headline about a 90-day test of the TikTok hair brand (mineral miracle vs expensive marketing); Act 1 genuine skepticism (drain clump, thinning ponytail, gummy biotin as mostly syrup, growth shampoo rinsed too fast); Act 2 investigation of the brand’s fulvic/mineral-complex framing and systemic pills vs topical spray, attributed to Moérie; Act 3 a 90-day desk diary (weeks 1–2 doubt, 3–5 less shed on the brush, 8–12 baby hairs) plus a UGC mosaic of real third-party clips or stills; Act 4 diagnosis cards for Ultimate Hair Boost / Hair Growth Pills vs Mineral Hair Growth Spray; Act 5 360° synergy cross-sell; Act 6 honest pros and cons (clean mineral formula vs higher price, no 7-day miracle, stockouts, official site only); Act 7 counterfeit warning and dual official CTAs. Copy SHALL NOT invent kit prices, review aggregates, clinical trials of the finished SKU, typical results, or fabricated testimonials. Health claims SHALL be attributed to the official pages or labeled as the desk’s experience.

#### Scenario: No fabricated typical-result claim
- **WHEN** the 90-day diary block is rendered
- **THEN** the copy SHALL present the timeline as the editorial desk’s experience, SHALL state that individual results vary, and SHALL NOT claim the diary is a typical or guaranteed outcome

#### Scenario: No marketplace counterfeit instruction is inverted
- **WHEN** Act 7 is rendered
- **THEN** the copy SHALL warn against unregulated marketplaces and steep unofficial discounts and SHALL point CTAs only at the official hops in the catalog

#### Scenario: Fulvic complex is attributed
- **WHEN** Act 2 describes fulvic acid or 70+ minerals
- **THEN** the copy SHALL attribute that framing to Moérie (or omit it if the live official page does not support it) and SHALL NOT present it as an independent lab finding

### Requirement: Moérie quiz maps to pills or spray
The Moérie quiz SHALL use the four English questions in the proposal (how shed shows up; nails and fiber; prior gummies/tonics; which routine the visitor can keep). Completing it SHALL emphasize either the pills protocol (inside-out follicular nutrition / diffuse shed) or the spray protocol (localized topical fill-in) in Act 4 without removing the other card or Act 5.

#### Scenario: Diffuse shed and weak nails emphasize pills
- **WHEN** a visitor answers the Moérie quiz with diffuse shed, weak nails, failed gummies, and a capsule routine
- **THEN** Act 4 SHALL visually feature Moérie Ultimate Hair Boost / Hair Growth Pills and SHALL still include the spray card in the document

#### Scenario: Localized gaps and a spray routine emphasize spray
- **WHEN** a visitor answers the Moérie quiz with localized gaps, normal nails with root fill-in concern, never tried a protocol beyond shampoo, and a nightly spray routine
- **THEN** Act 4 SHALL visually feature Moérie Mineral Hair Growth Spray and SHALL still include the pills card in the document

### Requirement: Moérie asset and UGC mapping
The Moérie Hero and protocol cards SHALL use published product photography of the real SKUs (pills bottle and spray, once the spray asset exists). UGC mosaic items SHALL be real captures or brand-published media with attribution. Supplier lifestyle photos SHALL NOT be reused as invented reviewer avatars. Multi-bottle kit shots SHALL NOT appear as checkout cards.

#### Scenario: Kit shots stay off the page as checkout
- **WHEN** the Moérie Instância is rendered
- **THEN** the page SHALL NOT display Base plan/kit checkout cards

#### Scenario: UGC is attributed
- **WHEN** the UGC mosaic renders an item
- **THEN** that item SHALL include attribution (source or “brand-published”) and SHALL NOT invent a personal name for an unnamed photo
