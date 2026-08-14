# tracking-tags Specification

## Purpose
TBD - created by archiving change extract-reusable-base. Update Purpose after archive.
## Requirements
### Requirement: Per-Produto tracking tags
A Produto config SHALL define zero or more tracking tags (e.g. Meta Pixel, Google Ads), each with its own identifier; no tracking tag SHALL be shared between Produto configs.

#### Scenario: Produto with a Meta Pixel and a Google Ads tag
- **WHEN** a Produto config defines both a Meta Pixel id and a Google Ads id
- **THEN** the built Instância SHALL load both tags using those ids

#### Scenario: Produto with no tracking tags
- **WHEN** a Produto config defines no tracking tags
- **THEN** the built Instância SHALL load no tracking tag scripts

### Requirement: Generic checkout event mechanism
The checkout-click tracking mechanism (firing an event before redirecting to the checkout URL) SHALL remain generic in the Base, independent of which tracking tags a Produto has configured.

#### Scenario: Checkout click with Meta Pixel configured
- **WHEN** a visitor clicks a checkout CTA on a Produto with a Meta Pixel tag configured
- **THEN** the system SHALL fire the checkout-initiated event to that tag before redirecting to the checkout URL

### Requirement: Outbound CTA does not fire checkout events
A click on a review outbound CTA (Hero, verdict, footer, or sticky bar navigating to a hop/official URL) SHALL NOT fire the checkout-initiated event (`InitiateCheckout`, Google Ads checkout conversion, or equivalent). The generic checkout-click mechanism SHALL apply only to sales checkout CTAs.

#### Scenario: Review hop click is not a checkout event
- **WHEN** a visitor clicks the outbound CTA on a review Instância
- **THEN** the system SHALL navigate to the hop/official URL and SHALL NOT fire a checkout-initiated event to any configured tracking tag

#### Scenario: Sales checkout click is unchanged
- **WHEN** a visitor clicks a checkout CTA on a sales Produto with a tracking tag configured
- **THEN** the system SHALL still fire the checkout-initiated event to that tag before redirecting to the checkout URL
