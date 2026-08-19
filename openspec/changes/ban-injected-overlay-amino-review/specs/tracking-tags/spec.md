## MODIFIED Requirements

### Requirement: Outbound CTA does not fire checkout events
A click on a review outbound CTA SHALL NOT fire the checkout-initiated event (`InitiateCheckout`, Google Ads checkout conversion, or equivalent). That includes Hero, editorial article folds (`pain`, `research`, `official-claims`, `verdict`), footer, sticky bar, FAQ, `guarantee`, and `mid-cta` controls navigating to a hop or official vendor URL (including Digistore24). The generic checkout-click mechanism SHALL apply only to sales checkout CTAs. The Base SHALL NOT emit a Página-popup or other injected overlay whose click fires a checkout event.

#### Scenario: Review hop click is not a checkout event
- **WHEN** a visitor clicks the outbound CTA on a review Instância
- **THEN** the system SHALL navigate to the hop/official URL and SHALL NOT fire a checkout-initiated event to any configured tracking tag

#### Scenario: Editorial-fold Digistore24 click is not a checkout event
- **WHEN** a visitor clicks the outbound CTA after an editorial article block on a review Instância whose href is a Digistore24 official URL
- **THEN** the system SHALL navigate to that URL and SHALL NOT fire a checkout-initiated event

#### Scenario: Sales checkout click is unchanged
- **WHEN** a visitor clicks a checkout CTA on a sales Produto with a tracking tag configured
- **THEN** the system SHALL still fire the checkout-initiated event to that tag before redirecting to the checkout URL
