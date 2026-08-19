import type { CSSProperties } from "react";

export type UtilizationRow = {
  source: string;
  percent: number;
  emphasis?: boolean;
};

export function UtilizationFigure({
  caption,
  dateline,
  rows,
}: {
  caption: string;
  dateline: string;
  rows: readonly UtilizationRow[];
}) {
  return (
    <figure className="util-figure">
      <figcaption>
        <span className="util-caption">{caption}</span>
        <span className="util-dateline">{dateline}</span>
      </figcaption>

      <p className="util-legend">
        <span>
          <span className="util-swatch util-swatch--protein" aria-hidden />
          Used to build protein
        </span>
        <span>
          <span className="util-swatch util-swatch--waste" aria-hidden />
          Converted to sugars or fats
        </span>
      </p>

      <div className="util-axis" aria-hidden>
        <span>0</span>
        <span>100%</span>
      </div>

      <ul className="util-rows">
        {rows.map((row) => (
          <li
            key={row.source}
            className={row.emphasis ? "util-row util-row--emphasis" : "util-row"}
          >
            <div className="util-meta">
              <span className="util-source">{row.source}</span>
              <span className="util-value">{row.percent}%</span>
            </div>
            <div className="util-track" aria-hidden>
              <span
                className="util-protein"
                style={{ "--bar": `${row.percent}%` } as CSSProperties}
              />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}
