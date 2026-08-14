export function ReviewHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? <p className="section-eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="section-title text-balance">{title}</h2>
      {lead ? <p className="section-lead mt-4 max-w-prose">{lead}</p> : null}
    </header>
  );
}
