## ADDED Requirements

### Requirement: Configurable plan count
The Pricing section SHALL render between 1 and N plans as defined by the Produto config, without assuming a fixed count of 3.

#### Scenario: Single-plan Produto
- **WHEN** a Produto config defines exactly one plan
- **THEN** the Pricing section SHALL render that plan using the recommended-card layout, with no satellite cards

#### Scenario: Multi-plan Produto
- **WHEN** a Produto config defines more than one plan
- **THEN** the Pricing section SHALL render all plans, using the recommended-card layout for at most one plan marked as recommended

### Requirement: Optional recommended plan
A Produto config MAY mark zero or one plan as recommended; the Pricing layout SHALL adapt to whether a recommended plan is present.

#### Scenario: No recommended plan set
- **WHEN** a Produto config with multiple plans marks none of them as recommended
- **THEN** the Pricing section SHALL render all plans in the satellite layout, with no recommended-card treatment
