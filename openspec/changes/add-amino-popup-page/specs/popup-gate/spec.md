## ADDED Requirements

### Requirement: Optional popup page on the same Instância
A Produto config MAY include `popupGate`. When present, the build SHALL emit a second static HTML page of the same Instância at `/{popupGate.path}/index.html`, without loading the review or sales SPA bundle. The page SHALL be `noindex, nofollow`. SEO title, description, Open Graph tags, and tracking-tag markup SHALL come from the same `ProductConfig` as the root page.

#### Scenario: Popup page is emitted at the configured path
- **WHEN** a Produto config sets `popupGate.path` to `advanced-amino`
- **THEN** the build SHALL emit `advanced-amino/index.html` for that Instância and SHALL NOT require a second Produto or Host

#### Scenario: Popup page is not indexed
- **WHEN** a visitor or crawler requests the Página-popup
- **THEN** the document SHALL include `noindex, nofollow`

#### Scenario: Produto without popupGate is unchanged
- **WHEN** a Produto config omits `popupGate`
- **THEN** the build SHALL NOT emit an extra popup HTML page

### Requirement: Source parameter forwarded to the affiliate URL
The Página-popup SHALL read `popupGate.sourceParam` from its own query string and append that value to `popupGate.checkoutHref`. When the parameter is absent or blank, the page SHALL use `popupGate.defaultSource`.

#### Scenario: Default source when the URL has no param
- **WHEN** a visitor opens `/{path}` with no `src` query param and `defaultSource` is `PopUp`
- **THEN** both popup actions SHALL navigate to the affiliate URL with `src=PopUp`

#### Scenario: Campaign-specific source is forwarded
- **WHEN** a visitor opens `/{path}?src=PopUpFB01`
- **THEN** both popup actions SHALL navigate to the affiliate URL with `src=PopUpFB01`

### Requirement: Every popup action goes to checkout
The Página-popup SHALL present a single dialog with a primary CTA and a secondary close link. Both controls SHALL navigate to the same affiliate URL (with the resolved source). The close control SHALL NOT dismiss the dialog without navigating.

#### Scenario: Primary CTA and close share the destination
- **WHEN** a visitor clicks either the primary CTA or the close link
- **THEN** the browser SHALL navigate to `popupGate.checkoutHref` with the resolved source parameter and SHALL NOT remain on the Página-popup

### Requirement: Blurred decorative checkout replica
The Página-popup SHALL render a non-interactive, blurred replica of a checkout behind the dialog. Replica cards SHALL NOT be clickable. When `popupGate.backdrop.cards` is present, the replica SHALL use those cards. When it is absent, the replica SHALL use the Produto `plans` (name, image, price, per-unit, description, recommended as featured).

#### Scenario: Review Produto supplies backdrop cards
- **WHEN** a review Produto configures `popupGate.backdrop.cards` with three package cards and omits `plans`
- **THEN** the replica SHALL show those three cards and the build SHALL succeed

#### Scenario: Sales Produto keeps using plans
- **WHEN** a sales Produto configures `popupGate` without `backdrop.cards` and has `plans`
- **THEN** the replica SHALL show one card per plan

#### Scenario: Replica is not a second storefront
- **WHEN** a visitor interacts with the blurred replica
- **THEN** pointer events on the replica SHALL be ignored and only the popup dialog SHALL navigate
