## MODIFIED Requirements

### Requirement: Editorial content required for listed review sections
When a review Produto lists an editorial or conversion section id (`pain`, `research`, `official-claims`, `verdict`, `trust`, `highlights`, `ritual`, `compare`, `guarantee`, `mid-cta`) in `sections`, the config SHALL include the matching content block. The build SHALL fail if the section is listed without that block. Listing any of those ids SHALL NOT require or allow `plans` on a review Produto.

#### Scenario: Listed editorial section without content
- **WHEN** a review Produto lists `"pain"` in `sections` but omits the pain article block
- **THEN** the build SHALL fail, reporting that `pain` is listed without content

#### Scenario: Listed conversion section without content
- **WHEN** a review Produto lists `"trust"` in `sections` but omits the trust content block
- **THEN** the build SHALL fail, reporting that `trust` is listed without content

#### Scenario: Review conversion modules still reject plans
- **WHEN** a review Produto lists `highlights` or `guarantee` and also defines one or more plans
- **THEN** the build SHALL fail before producing an Instância
