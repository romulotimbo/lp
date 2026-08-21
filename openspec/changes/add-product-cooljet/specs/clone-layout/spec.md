## ADDED Requirements

### Requirement: Clone layout emits static HTML at the instance root
A Produto config MAY set `layout` to `"clone"`. When it does, the build SHALL emit a static HTML document as the Instância root page from `clone.htmlFile` and SHALL NOT load the sales or review React shell. The build SHALL copy the visual assets that the published HTML references. The Instância SHALL NOT emit a second HTML page at a nested path.

#### Scenario: Clone build skips the React shell
- **WHEN** a build is invoked with a Produto whose `layout` is `"clone"`
- **THEN** the output SHALL contain the published static HTML as the root `index.html` and SHALL NOT include the sales or review SPA bundle as the root page

#### Scenario: Clone has no nested popup path
- **WHEN** a clone Produto is built
- **THEN** the output SHALL NOT contain a nested popup `index.html` at a path such as `/cooljet` or `/popup`

### Requirement: Cookie overlay on the clone root navigates every action to the affiliate hop
The clone root page SHALL present a cookie-policy overlay (`#cookie-popup-modern`) that is visible on first paint. The overlay SHALL include an Allow control and a Close control. Both controls SHALL use the `ratoeira-trackable` class, SHALL call `handleClick` on click, and SHALL navigate to `clone.affiliateHref`. Close SHALL NOT dismiss the overlay without navigating.

#### Scenario: Overlay is visible on load
- **WHEN** a visitor opens the clone Instância root
- **THEN** the cookie overlay SHALL be visible (not `opacity: 0` with `pointer-events: none`) and SHALL sit above the cloned page

#### Scenario: Allow navigates to the affiliate hop
- **WHEN** a visitor clicks Allow on the cookie overlay
- **THEN** the browser SHALL navigate to `clone.affiliateHref` and SHALL NOT remain on the clone page

#### Scenario: Close navigates to the same hop
- **WHEN** a visitor clicks Close on the cookie overlay
- **THEN** the browser SHALL navigate to the same `clone.affiliateHref` and SHALL NOT hide the overlay without navigating

### Requirement: Clone page is a sanitized visual copy
The published clone HTML SHALL preserve the visual structure of the source dump (product presentation, package cards, FAQ, logos). It SHALL NOT include the source merchant's payment SDKs, captcha, or third-party tags from the dump (GTM, Clarity, Everflow, checkout/card SDKs). Forms on the clone SHALL NOT submit an order to the source merchant.

#### Scenario: Payment scripts are absent
- **WHEN** the published clone HTML is served
- **THEN** the document SHALL NOT load CheckoutSDK, card capture, Google Pay, Stripe elements, or hCaptcha from the source dump

#### Scenario: Remaining CTAs do not check out on the source merchant
- **WHEN** a visitor activates a package or purchase control on the clone while the overlay is absent
- **THEN** the control SHALL navigate to `clone.affiliateHref` or do nothing, and SHALL NOT POST an order to the source merchant
