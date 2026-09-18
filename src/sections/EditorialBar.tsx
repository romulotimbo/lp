import { product } from "@/product/active";

export function EditorialBar() {
  const bar = product.editorialBar;
  if (!bar) return null;

  return (
    <header className="skeptic-bar">
      <div className="skeptic-bar-inner">
        <p className="skeptic-bar-tag">{bar.tag}</p>
        <p className="skeptic-bar-disclosure">
          {bar.disclosure}{" "}
          <a className="skeptic-bar-learn" href={bar.learnMoreHref}>
            Learn more
          </a>
        </p>
        <p className="skeptic-bar-meta">
          <time dateTime={bar.asOf}>Updated {bar.asOf}</time>
          <span aria-hidden="true"> · </span>
          <span>{bar.readingMinutes} min read</span>
        </p>
      </div>
    </header>
  );
}
