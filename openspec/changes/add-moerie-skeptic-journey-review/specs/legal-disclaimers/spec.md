## ADDED Requirements

### Requirement: Review-skeptic disclosure above the fold
A review-skeptic Instância SHALL display the Produto's affiliate-or-relationship disclosure in the top editorial bar as well as in the footer. The wording SHALL match the real commercial relationship (commission possible vs no commission today). The learn-more control SHALL point to the footer disclosure and/or `/about`.

#### Scenario: Disclosure is in the editorial bar
- **WHEN** a visitor loads a review-skeptic landing
- **THEN** the editorial bar SHALL include the relationship disclosure text without requiring a scroll to the footer

#### Scenario: Disclosure does not invent an affiliate relationship
- **WHEN** the Produto config states there is no current affiliate commission
- **THEN** the bar and footer SHALL NOT claim that the page contains affiliate links that pay a commission

### Requirement: Category disclaimer on hair-supplement review-skeptic
A review-skeptic Produto for hair supplements or cosmetics with supplement claims SHALL include a category disclaimer with the FDA not-intended-to-diagnose-treat-cure-or-prevent statement. That text SHALL appear in the landing footer and SHALL be expanded on `/medical-disclaimer`.

#### Scenario: Moérie footer carries the FDA statement
- **WHEN** the Moérie review-skeptic Instância footer is rendered
- **THEN** it SHALL display the FDA supplement disclaimer from `locale.categoryDisclaimers`
