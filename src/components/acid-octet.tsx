type AcidMark = {
  name: string;
  code: string;
  abbr: string;
  paths: string[];
};

/** Schematic side-chain marks — not the vendor ball-and-stick plate. */
const AMINO_OCTET: readonly AcidMark[] = [
  {
    name: "L-lysine",
    abbr: "Lys",
    code: "K",
    paths: ["M16 30 V7", "M16 7 H23", "M23 7 V3"],
  },
  {
    name: "L-phenylalanine",
    abbr: "Phe",
    code: "F",
    paths: [
      "M16 30 V17",
      "M16 17 L10.8 14 V8 L16 5 L21.2 8 V14 Z",
    ],
  },
  {
    name: "L-isoleucine",
    abbr: "Ile",
    code: "I",
    paths: ["M16 30 V13", "M16 13 H24", "M16 13 V4"],
  },
  {
    name: "L-methionine",
    abbr: "Met",
    code: "M",
    paths: ["M16 30 V6", "M16 12 H21", "M21 12 L26 6"],
  },
  {
    name: "L-threonine",
    abbr: "Thr",
    code: "T",
    paths: ["M16 30 V14", "M16 14 L24 5", "M21 8 H25"],
  },
  {
    name: "L-leucine",
    abbr: "Leu",
    code: "L",
    paths: ["M16 30 V16", "M9 6 L16 16 L23 6"],
  },
  {
    name: "L-valine",
    abbr: "Val",
    code: "V",
    paths: ["M8 8 L16 22 L24 8"],
  },
  {
    name: "L-tryptophan",
    abbr: "Trp",
    code: "W",
    paths: [
      "M12 30 V19",
      "M12 19 L8 14 L10 7 L16 6 L19 12 L15 18 Z",
      "M16 6 H25 V17 H19",
    ],
  },
];

function AcidGlyph({ paths }: { paths: string[] }) {
  return (
    <svg
      className="acid-glyph"
      viewBox="0 0 32 32"
      aria-hidden
      focusable="false"
    >
      {paths.map((d) => (
        <path key={d} d={d} pathLength={1} />
      ))}
    </svg>
  );
}

export function AcidOctet({
  caption,
  dateline,
}: {
  caption: string;
  dateline: string;
}) {
  return (
    <figure className="acid-figure">
      <figcaption>
        <span className="acid-caption">{caption}</span>
        <span className="acid-dateline">{dateline}</span>
      </figcaption>
      <ol className="acid-roster">
        {AMINO_OCTET.map((acid) => (
          <li key={acid.code} className="acid-row">
            <AcidGlyph paths={acid.paths} />
            <span className="acid-code">{acid.code}</span>
            <span className="acid-name">
              {acid.name}
              <span className="acid-abbr">{acid.abbr}</span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
