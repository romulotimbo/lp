## ADDED Requirements

### Requirement: CoolJet clone instance
The system SHALL produce a clone Instância for the Produto `cooljet` at `cooljet.thebuylens.shop`, with `layout` set to `"clone"`, no Spokesperson, no plans, and `clone.affiliateHref` set to `https://www.clickrtrckr.com/JF816B6/8WW1FPC/?__efq=1XzZiNTLF3AgCfINH2PTisIlTzd8oVcx`. The published page SHALL be the sanitized copy of `products/cooljet/Get CoolJet Now.html` stored at `products/cooljet/page/index.html`.

#### Scenario: CoolJet builds as clone
- **WHEN** a build is invoked with `PRODUCT=cooljet`
- **THEN** the Instância SHALL serve the sanitized CoolJet HTML at the root and SHALL NOT render the sales or review React shell

#### Scenario: CoolJet popup actions open the clickrtrckr hop
- **WHEN** a visitor clicks Allow or Close on the CoolJet cookie overlay
- **THEN** the browser SHALL navigate to `https://www.clickrtrckr.com/JF816B6/8WW1FPC/?__efq=1XzZiNTLF3AgCfINH2PTisIlTzd8oVcx`

### Requirement: CoolJet cookie overlay markup
The CoolJet root page SHALL include the `#cookie-popup-modern` overlay with title "Cookie Policy", buttons labeled "Allow" and "Close", classes `cookie-btn-accept-modern` / `cookie-btn-close-modern` and `ratoeira-trackable`, and `onclick="return handleClick(event)"` on both controls. The overlay SHALL use the provided full-viewport styles (fixed, `z-index: 10000001`, dimmed backdrop) and SHALL be visible on load via `cookie-popup-visible-modern`.

#### Scenario: Overlay matches the requested controls
- **WHEN** the CoolJet page is rendered
- **THEN** the overlay SHALL contain the Cookie Policy copy and the Allow and Close controls with the `ratoeira-trackable` class

#### Scenario: Overlay covers the cloned checkout
- **WHEN** the CoolJet page is rendered
- **THEN** `#cookie-popup-modern` SHALL cover the viewport above the cloned page and SHALL accept pointer events

### Requirement: CoolJet identity and compliance
The CoolJet Produto config SHALL use slug `cooljet`, product name `CoolJet`, locale `en-US` / USD, domain `cooljet.thebuylens.shop`, empty `trackingTags`, and the six token roles with accent `#0173AD`. Affiliate disclosure SHALL appear on the published page. The dump files `Get CoolJet Now.html` and `Get CoolJet Now_files/` SHALL NOT be the files served by the Instância.

#### Scenario: CoolJet domain and empty tags
- **WHEN** the CoolJet Instância is built
- **THEN** SEO/canonical URLs SHALL use `https://cooljet.thebuylens.shop/` and the page SHALL load no Meta Pixel or Google Ads tag

#### Scenario: Source dump is not the public document
- **WHEN** a visitor requests the CoolJet root
- **THEN** the response SHALL be the sanitized `page/index.html` document, not the raw saved `Get CoolJet Now.html` dump
