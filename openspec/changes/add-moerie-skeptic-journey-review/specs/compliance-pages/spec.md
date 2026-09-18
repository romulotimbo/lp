## ADDED Requirements

### Requirement: Mandatory compliance pages on review-skeptic
A review-skeptic Produto SHALL define four compliance pages on the same Host: Terms of Service at `/terms`, Privacy Policy at `/privacy`, Medical Disclaimer at `/medical-disclaimer`, and About Us at `/about`. Each page SHALL be prerendered at build time. The footer of the landing and of every compliance page SHALL link to all four paths. The About page SHALL include a visible contact channel (email or equivalent).

#### Scenario: Footer lists the four legal routes
- **WHEN** a visitor views the review-skeptic landing or any compliance page
- **THEN** the footer SHALL expose links to `/terms`, `/privacy`, `/medical-disclaimer`, and `/about`

#### Scenario: Direct fetch of privacy returns HTML
- **WHEN** a client requests `/privacy` on a built review-skeptic Instância
- **THEN** the response SHALL be HTML that contains the privacy policy body without requiring a quiz or client-side navigation from `/`

#### Scenario: About page shows contact
- **WHEN** a visitor opens `/about`
- **THEN** the page SHALL identify the publisher and SHALL display a contact channel

### Requirement: Privacy policy covers cookies and privacy regimes
The `/privacy` page SHALL describe cookie use and SHALL reference GDPR and CCPA. If the publisher processes data of Brazilian residents, the page SHALL also reference LGPD.

#### Scenario: Privacy page names cookies and GDPR
- **WHEN** a visitor opens `/privacy`
- **THEN** the copy SHALL mention cookies and GDPR, and SHALL mention CCPA for the US audience

### Requirement: Medical disclaimer page is detailed
The `/medical-disclaimer` page SHALL state that the content is not medical advice, that the products are not intended to diagnose, treat, cure, or prevent disease, that individual results vary, and that the reader SHOULD consult a qualified clinician before use. The landing footer SHALL also link this page and MAY repeat a short FDA-style category disclaimer.

#### Scenario: Medical page qualifies hair and supplement claims
- **WHEN** a visitor opens `/medical-disclaimer`
- **THEN** the page SHALL include the not-intended-to-diagnose-treat-cure-or-prevent statement and a consult-a-doctor instruction

### Requirement: Compliance routes do not use the quiz as a gate
Compliance pages SHALL render without the protocol quiz as a blocker. They MAY reuse the editorial bar and footer.

#### Scenario: Terms is readable without quiz answers
- **WHEN** a crawler fetches `/terms` with scripting disabled
- **THEN** the Terms body SHALL be present in the HTML
