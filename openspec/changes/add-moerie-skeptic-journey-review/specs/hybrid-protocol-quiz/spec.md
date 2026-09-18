## ADDED Requirements

### Requirement: Four-question protocol quiz
A review-skeptic Produto SHALL include a protocol quiz of exactly four questions. Question 1, 2, 3, and 4 SHALL each offer two answers that score toward `pills` or `spray` as specified by the Produto config (diffuse shed / weak nails / failed gummies / capsule routine → pills; localized gaps / roots-only concern / never tried a protocol / spray routine → spray). Completing the quiz SHALL compute a winning protocol and an affinity percentage equal to winning votes divided by four, rounded to the nearest integer.

#### Scenario: Four pills answers select the pills protocol
- **WHEN** a visitor submits answers A, A, A, and A on the four questions as configured for Moérie
- **THEN** the winning protocol SHALL be `pills` and the affinity percentage SHALL be 100

#### Scenario: Mixed answers do not hardcode ninety-two percent
- **WHEN** a visitor submits three answers for `pills` and one answer for `spray`
- **THEN** the winning protocol SHALL be `pills` and the affinity percentage SHALL be 75, not a hardcoded 92

#### Scenario: Tied score uses the catalog default
- **WHEN** a visitor submits two answers for `pills` and two answers for `spray`
- **THEN** the winning protocol SHALL equal `catalog.defaultProtocol`

### Requirement: Quiz is emphasis and scroll, not a content gate
The protocol quiz SHALL NOT hide, unmount, or `display:none` the narrative acts, the non-winning protocol card, Act 5, or Act 7. Before any interaction, `data-protocol-emphasis` SHALL be `unset` (or omitted) and both protocol cards SHALL remain fully readable. After a result, the diagnose control SHALL smooth-scroll to Act 4 (`#act-4` or equivalent) and MAY restyle the winning card as featured. The losing card SHALL remain in the DOM with its full copy and CTA.

#### Scenario: Googlebot or a no-JS client reads the full article
- **WHEN** the review-skeptic page is loaded with scripting disabled or without quiz interaction
- **THEN** the document SHALL contain the full editorial copy of the enabled acts and both protocol recommendation cards

#### Scenario: Quiz result scrolls to Act 4 without removing the other SKU
- **WHEN** a visitor completes the quiz and activates the diagnose control
- **THEN** the page SHALL smooth-scroll to the Act 4 diagnosis region, SHALL mark the winning protocol as the visual emphasis, and SHALL keep the other protocol card visible and readable in the same region

#### Scenario: Quiz state is not required to render acts
- **WHEN** a crawler fetches `/` and does not POST or click quiz answers
- **THEN** Acts 1 through 7 that are listed in `sections` SHALL still be present in the HTML response

### Requirement: Default protocol emphasis is not exclusive
When no quiz result is stored, the Instância MAY visually hint `catalog.defaultProtocol` but SHALL still render the complementary SKU in Act 4, Act 5, and Act 7 at readable contrast (not removed, not `aria-hidden` on its body copy).

#### Scenario: Unset emphasis still shows both official CTAs in Act 7
- **WHEN** the page renders with no stored quiz result
- **THEN** Act 7 SHALL display both the pills official CTA and the spray official CTA
