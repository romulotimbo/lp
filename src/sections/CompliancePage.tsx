import { product } from "@/product/active";
import { getPathname, siteHref } from "@/lib/pathname";

const PATH_TO_PAGE = {
  "/terms": "terms",
  "/privacy": "privacy",
  "/medical-disclaimer": "medicalDisclaimer",
  "/about": "about",
} as const;

export function CompliancePageView() {
  const pathname = getPathname();
  const key = PATH_TO_PAGE[pathname as keyof typeof PATH_TO_PAGE];
  const page = key ? product.compliancePages?.[key] : undefined;

  if (!page) {
    return (
      <article className="skeptic-legal">
        <h1>Page not found</h1>
        <p>
          <a href={siteHref("/")}>Back to the review</a>
        </p>
      </article>
    );
  }

  return (
    <article className="skeptic-legal">
      <p className="skeptic-kicker">
        <a href={siteHref("/")}>← Independent review</a>
      </p>
      <h1>{page.title}</h1>
      {page.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 64)}>{paragraph}</p>
      ))}
    </article>
  );
}

export function isCompliancePath(pathname: string): boolean {
  return pathname in PATH_TO_PAGE;
}
