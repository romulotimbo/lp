## ADDED Requirements

### Requirement: Outbound CTA does not fire checkout events
A click on a review outbound CTA (Hero, verdict, footer, or sticky bar navigating to a hop/official URL) SHALL NOT fire the checkout-initiated event (`InitiateCheckout`, Google Ads checkout conversion, or equivalent). The generic checkout-click mechanism SHALL apply only to sales checkout CTAs.

#### Scenario: Review hop click is not a checkout event
- **WHEN** a visitor clicks the outbound CTA on a review Instância
- **THEN** the system SHALL navigate to the hop/official URL and SHALL NOT fire a checkout-initiated event to any configured tracking tag

#### Scenario: Sales checkout click is unchanged
- **WHEN** a visitor clicks a checkout CTA on a sales Produto with a tracking tag configured
- **THEN** the system SHALL still fire the checkout-initiated event to that tag before redirecting to the checkout URL
