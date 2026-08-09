# lead-capture-module Specification

## Purpose
TBD - created by archiving change extract-reusable-base. Update Purpose after archive.
## Requirements
### Requirement: Optional, product-scoped lead capture
A Produto config MAY enable a lead-capture module with configurable hook copy (headline/incentive); when disabled, no lead-capture UI SHALL appear in that Instância.

#### Scenario: Produto without lead capture
- **WHEN** a Produto config does not enable lead capture
- **THEN** the built Instância SHALL contain no email-capture form or modal

#### Scenario: Produto with a custom hook
- **WHEN** a Produto config enables lead capture with its own hook copy
- **THEN** the rendered lead-capture form SHALL display that Produto's hook copy, not another Produto's

### Requirement: Shared backend across Produtos
All Produtos with lead capture enabled SHALL submit to the same backend storage, tagging each captured lead with the originating Produto identifier.

#### Scenario: Leads from two Produtos
- **WHEN** visitors submit their email on two different Produto Instâncias with lead capture enabled
- **THEN** both submissions SHALL be stored in the same underlying store, each tagged with its own Produto identifier

