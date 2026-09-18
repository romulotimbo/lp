## MODIFIED Requirements

### Requirement: Outbound CTA does not fire checkout events
A click on a review outbound CTA (Hero, verdict, footer, or sticky bar navigating to a hop/official URL), a review-offer outbound CTA, or a review-skeptic catalog hop (Hero, Act 4, Act 5, Act 7, footer, or sticky bar navigating to a pills or spray official URL) SHALL NOT fire the checkout-initiated event (`InitiateCheckout`, Google Ads checkout conversion, or equivalent). The generic checkout-click mechanism SHALL apply only to sales checkout CTAs.

#### Scenario: Review hop click is not a checkout event
- **WHEN** a visitor clicks the outbound CTA on a review Instância
- **THEN** the system SHALL navigate to the hop/official URL and SHALL NOT fire a checkout-initiated event to any configured tracking tag

#### Scenario: Review-skeptic pills hop click is not a checkout event
- **WHEN** a visitor clicks a pills official CTA on a review-skeptic Instância
- **THEN** the system SHALL navigate to `catalog.pills.outboundCta.href` and SHALL NOT fire a checkout-initiated event to any configured tracking tag

#### Scenario: Review-skeptic spray hop click is not a checkout event
- **WHEN** a visitor clicks a spray official CTA on a review-skeptic Instância
- **THEN** the system SHALL navigate to `catalog.spray.outboundCta.href` and SHALL NOT fire a checkout-initiated event to any configured tracking tag

#### Scenario: Sales checkout click is unchanged
- **WHEN** a visitor clicks a checkout CTA on a sales Produto with a tracking tag configured
- **THEN** the system SHALL still fire the checkout-initiated event to that tag before redirecting to the checkout URL
