## ADDED Requirements

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
