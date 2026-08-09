# legal-disclaimers Specification

## Purpose
TBD - created by archiving change extract-reusable-base. Update Purpose after archive.
## Requirements
### Requirement: Mandatory affiliate disclosure
Every Produto config SHALL include affiliate disclosure text; the build SHALL fail if this text is missing or empty.

#### Scenario: Produto config missing affiliate disclosure
- **WHEN** a Produto config has no affiliate disclosure text
- **THEN** the build SHALL fail and SHALL NOT produce an Instância

#### Scenario: Produto config with affiliate disclosure
- **WHEN** a Produto config includes affiliate disclosure text
- **THEN** the built Instância SHALL display that text

### Requirement: Optional category disclaimer
A Produto config MAY include one or more category-specific disclaimers (e.g. a supplement claims disclaimer); when omitted, no category disclaimer SHALL be rendered.

#### Scenario: Supplement Produto with category disclaimer
- **WHEN** a Produto config for a supplement includes a category disclaimer
- **THEN** the built Instância SHALL display that disclaimer near the claims it qualifies

#### Scenario: Produto without category disclaimer
- **WHEN** a Produto config does not include a category disclaimer
- **THEN** the built Instância SHALL render no category disclaimer block

