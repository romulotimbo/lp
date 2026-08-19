## ADDED Requirements

### Requirement: Injected overlay pages are forbidden
A Produto config SHALL NOT include `popupGate` or any other second page that injects a blocking overlay (including a dialog over a blurred checkout replica whose primary and close actions both navigate to an offer). The build SHALL fail if `popupGate` is present. The built Instância SHALL emit only the root page for that Produto; it SHALL NOT emit a Página-popup HTML file at a nested path.

#### Scenario: popupGate present fails the build
- **WHEN** a Produto config defines `popupGate`
- **THEN** the build SHALL fail before producing an Instância, reporting that injected overlay pages are forbidden

#### Scenario: Produto without popupGate emits only the root page
- **WHEN** a Produto config omits `popupGate`
- **THEN** the build SHALL succeed and SHALL NOT emit a nested popup `index.html` (paths such as `/advanced-amino` or `/alphasurge` are absent from the output)

### Requirement: Review outbound CTA may be a vendor official URL
A review Produto's `outboundCta.href` SHALL be a hop or official vendor URL (including a Digistore24 sales-letter URL with an affiliate hash). The field SHALL NOT require a ClickBank hop. Category disclaimers that name a retailer SHALL match the retailer actually used by that Produto.

#### Scenario: Amino Digistore24 URL is valid outbound CTA
- **WHEN** a review Produto sets `outboundCta.href` to an Advanced Bionutritionals Digistore24 URL that includes `#aff=` and omits a ClickBank hop
- **THEN** the build SHALL succeed and every review outbound control SHALL use that href, including the hash fragment
