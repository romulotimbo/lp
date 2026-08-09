# design-token-contract Specification

## Purpose
TBD - created by archiving change extract-reusable-base. Update Purpose after archive.
## Requirements
### Requirement: Fixed token role contract
Every Produto config SHALL supply a value for the same fixed set of design token roles (background, surface, text-primary, text-muted, accent, accent-dark), and SHALL NOT introduce additional or renamed roles.

#### Scenario: Produto with a light palette
- **WHEN** a Produto config sets the background token to a light value and the accent token to a brand color
- **THEN** the build SHALL apply those values to the same token roles used by every other Produto, without requiring changes to shared components

#### Scenario: Produto config missing a token role
- **WHEN** a Produto config omits one of the fixed token roles
- **THEN** the build SHALL fail, reporting the missing role

### Requirement: Contrast-adaptive shared components
Shared visual components that render glow, perimeter-beam, or HUD effects (`ProductGlow`, `BorderBeamWrapper`, `HudFrame`) SHALL derive their visual treatment from the contrast between the Produto's token values, and SHALL NOT assume a dark background.

#### Scenario: Glow on a light-background Produto
- **WHEN** a Produto config defines a light background token
- **THEN** `ProductGlow` SHALL render a legible glow treatment for that background instead of the treatment tuned for a fixed dark background

