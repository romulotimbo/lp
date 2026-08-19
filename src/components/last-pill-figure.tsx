import { useId } from "react";

export function LastPillFigure() {
  const clipId = `pill-body-${useId().replace(/:/g, "")}`;

  return (
    <figure className="pill-figure">
      <figcaption>
        <span className="pill-caption">Down to the last pill</span>
        <span className="pill-dateline">company terms · Aug 2026</span>
      </figcaption>
      <svg
        className="pill-bottle"
        viewBox="0 0 84 132"
        aria-hidden
        focusable="false"
      >
        <defs>
          <clipPath id={clipId}>
            <path d="M30 34 C20 38 18 44 18 54 V110 C18 120 26 124 42 124 C58 124 66 120 66 110 V54 C66 44 64 38 54 34 Z" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect className="pill-level" x="18" y="34" width="48" height="90" />
          <ellipse className="pill-last" cx="42" cy="116" rx="8" ry="3.6" />
        </g>
        <path
          className="pill-outline"
          d="M32 8 H52 C56 8 58 10 58 14 V22 H54 V28 C66 32 68 40 68 50 V110 C68 122 58 128 42 128 C26 128 16 122 16 110 V50 C16 40 18 32 30 28 V22 H26 V14 C26 10 28 8 32 8 Z"
        />
        <path className="pill-outline" d="M30 22 H54" />
      </svg>
    </figure>
  );
}
