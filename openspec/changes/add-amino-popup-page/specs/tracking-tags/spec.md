## MODIFIED Requirements

### Requirement: Outbound CTA does not fire checkout events
A click on a review outbound CTA (Hero, verdict, footer, or sticky bar navigating to a hop/official URL) SHALL NOT fire the checkout-initiated event (`InitiateCheckout`, Google Ads checkout conversion, or equivalent). The generic checkout-click mechanism SHALL apply to sales checkout CTAs and to Página-popup actions. It SHALL NOT apply to review-page outbound CTAs.

#### Scenario: Review hop click is not a checkout event
- **WHEN** a visitor clicks the outbound CTA on a review Instância root page
- **THEN** the system SHALL navigate to the hop/official URL and SHALL NOT fire a checkout-initiated event to any configured tracking tag

#### Scenario: Sales checkout click is unchanged
- **WHEN** a visitor clicks a checkout CTA on a sales Produto with a tracking tag configured
- **THEN** the system SHALL still fire the checkout-initiated event to that tag before redirecting to the checkout URL

## ADDED Requirements

### Requirement: Página-popup click fires checkout events
A click on the Página-popup primary CTA or close link SHALL fire the checkout-initiated event to each configured tracking tag (Meta Pixel `InitiateCheckout`, Google Ads conversion, or equivalent) before redirecting to `popupGate.checkoutHref`, including when the Produto layout is `review`. When no tracking tags are configured, the page SHALL redirect immediately. The event value SHALL come from the featured backdrop card or recommended plan when available, otherwise `0`.

#### Scenario: Popup click on a review Produto with a tracking tag
- **WHEN** a visitor clicks the popup CTA on a review Produto that has a Meta Pixel configured
- **THEN** the system SHALL fire `InitiateCheckout` to that tag and then navigate to the hop with the resolved source parameter

#### Scenario: Popup click with no tracking tags
- **WHEN** a visitor clicks the popup CTA on a Produto whose `trackingTags` list is empty
- **THEN** the browser SHALL navigate to the affiliate URL and SHALL NOT load a tracking-tag script
