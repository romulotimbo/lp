## ADDED Requirements

### Requirement: Optional Spokesperson
A Produto config MAY omit a Spokesperson entirely; when omitted, the Base SHALL NOT render a Manifesto/narrator section or spokesperson-attributed recommendation badges.

#### Scenario: Produto without Spokesperson
- **WHEN** a Produto config has no Spokesperson defined
- **THEN** the built Instância SHALL contain no Manifesto section and no "what X uses" badge

### Requirement: Spokesperson references a reusable media pack
When a Produto config defines a Spokesperson, it SHALL reference a media pack (photos/videos) by identifier separately from the Spokesperson's name and copy, allowing the same media pack to be referenced by Spokespersons in different Produtos.

#### Scenario: Same media pack, different Produto
- **WHEN** two different Produto configs each define a Spokesperson referencing the same media pack identifier, with different names and copy
- **THEN** both built Instâncias SHALL display that media pack's photos/videos under their own Produto's Spokesperson name and copy
