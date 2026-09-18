import type { ReactNode } from "react";

export function SkepticSection({
  id,
  act,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  act: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="skeptic-act">
      <header className="skeptic-act-header">
        <p className="skeptic-kicker">
          <span className="skeptic-act-num">{act}</span>
          {eyebrow ? ` · ${eyebrow}` : null}
        </p>
        <h2 className="skeptic-act-title">{title}</h2>
        {lead ? <p className="skeptic-lede">{lead}</p> : null}
      </header>
      {children}
    </section>
  );
}

export function SkepticProse({ text }: { text: string }) {
  return (
    <div className="skeptic-prose">
      {text.split(/\n{2,}/).map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}
