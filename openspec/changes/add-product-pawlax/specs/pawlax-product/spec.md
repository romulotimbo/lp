## ADDED Requirements

### Requirement: Pawlax clone instance
The system SHALL produce a clone Instância for the Produto `pawlax` at `pawlax.thebuylens.shop`, with `layout` set to `"clone"`, no Spokesperson, no plans, and `clone.affiliateHref` set to `https://www.clickrtrckr.com/JF816B6/92HCXFN/?__efq=9AHZHiJrzZfjA5wUzYqt9AQ0GOzhEzubez7qKC7Uef8`. The published page SHALL be the sanitized copy of `products/pawlax/Get Pawlax Now!.html` stored at `products/pawlax/page/index.html`.

#### Scenario: Pawlax builds as clone
- **WHEN** a build is invoked with `PRODUCT=pawlax`
- **THEN** the Instância SHALL serve the sanitized Pawlax HTML at the root and SHALL NOT render the sales or review React shell

#### Scenario: Pawlax popup actions open the clickrtrckr hop
- **WHEN** a visitor clicks Allow or Close on the Pawlax cookie overlay
- **THEN** the browser SHALL navigate to `https://www.clickrtrckr.com/JF816B6/92HCXFN/?__efq=9AHZHiJrzZfjA5wUzYqt9AQ0GOzhEzubez7qKC7Uef8`

### Requirement: Pawlax cookie overlay markup
The Pawlax root page SHALL include the `#cookie-popup-modern` overlay with title "Cookie Policy", buttons labeled "Allow" and "Close", classes `cookie-btn-accept-modern` / `cookie-btn-close-modern` and `ratoeira-trackable`, and `onclick="return handleClick(event)"` on both controls. The overlay SHALL use the provided full-viewport styles (fixed, `z-index: 10000001`, dimmed backdrop) and SHALL be visible on load via `cookie-popup-visible-modern`. Close SHALL NOT dismiss the overlay without navigating.

#### Scenario: Overlay matches the requested controls
- **WHEN** the Pawlax page is rendered
- **THEN** the overlay SHALL contain the Cookie Policy copy and the Allow and Close controls with the `ratoeira-trackable` class

#### Scenario: Overlay covers the cloned checkout
- **WHEN** the Pawlax page is rendered
- **THEN** `#cookie-popup-modern` SHALL cover the viewport above the cloned page and SHALL accept pointer events

#### Scenario: Overlay is visible on load
- **WHEN** a visitor opens the Pawlax Instância root
- **THEN** the cookie overlay SHALL be visible (not `opacity: 0` with `pointer-events: none`) and SHALL sit above the cloned page

### Requirement: Pawlax identity and compliance
The Pawlax Produto config SHALL use slug `pawlax`, product name `Pawlax`, locale `en-US` / USD, domain `pawlax.thebuylens.shop`, empty `trackingTags`, and the six token roles with accent `#0D40FF`. Affiliate disclosure SHALL appear on the published page. The dump files `Get Pawlax Now!.html` and `Get Pawlax Now!_files/` SHALL NOT be the files served by the Instância.

#### Scenario: Pawlax domain and empty tags
- **WHEN** the Pawlax Instância is built
- **THEN** SEO/canonical URLs SHALL use `https://pawlax.thebuylens.shop/` and the page SHALL load no Meta Pixel or Google Ads tag

#### Scenario: Source dump is not the public document
- **WHEN** a visitor requests the Pawlax root
- **THEN** the response SHALL be the sanitized `page/index.html` document, not the raw saved `Get Pawlax Now!.html` dump

### Requirement: Pawlax page is a sanitized visual copy
The published Pawlax HTML SHALL preserve the visual structure of the source dump (product presentation, 1×–3× package cards, FAQ, logos). It SHALL NOT include the source merchant's payment SDKs, captcha, or third-party tags from the dump (GTM `GTM-NTH4LNFK`, Everflow, CheckoutSDK, checkout/card SDKs, HumanSecurity, hCaptcha). Forms on the clone SHALL NOT submit an order to the source merchant.

#### Scenario: Payment scripts are absent
- **WHEN** the published Pawlax HTML is served
- **THEN** the document SHALL NOT load CheckoutSDK, card capture, Google Pay, Stripe elements, hCaptcha, or HumanSecurity from the source dump

#### Scenario: Remaining CTAs do not check out on the source merchant
- **WHEN** a visitor activates a package or purchase control on the Pawlax clone while the overlay is absent
- **THEN** the control SHALL navigate to `clone.affiliateHref` or do nothing, and SHALL NOT POST an order to the source merchant
