import type { ReactNode } from "react";
import type { EditorialBlock } from "@/product/types";

function paragraphs(body: string): string[] {
  return body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function Figure({ block }: { block: EditorialBlock }) {
  if (!block.figure) return null;

  return (
    <figure className="editorial-figure">
      <img
        src={block.figure.src}
        alt={block.figure.alt}
        width={block.figure.width ?? 960}
        height={block.figure.height ?? 720}
        decoding="async"
        className="mx-auto h-auto w-auto max-w-full object-contain"
      />
    </figure>
  );
}

export function EditorialArticle({
  id,
  block,
  figureSide = "end",
  children,
}: {
  id: string;
  block: EditorialBlock;
  figureSide?: "start" | "end";
  children?: ReactNode;
}) {
  const paras = paragraphs(block.body);
  const figureFirst = figureSide === "start" && Boolean(block.figure);

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id={id} className="section-block px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:max-w-5xl">
          {block.eyebrow ? <p className="section-eyebrow mb-3">{block.eyebrow}</p> : null}
          <h2 className="section-title text-balance">{block.title}</h2>

          <div
            className={
              block.figure
                ? "mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-2 lg:gap-14"
                : "mt-8 max-w-prose"
            }
          >
            {figureFirst ? <Figure block={block} /> : null}

            <div className="max-w-prose space-y-5">
              {paras.map((paragraph, index) => (
                <p
                  key={`${id}-${index}`}
                  className="text-base leading-[1.7] text-cyber-muted sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
              {children}
            </div>

            {block.figure && !figureFirst ? <Figure block={block} /> : null}
          </div>
        </div>
      </section>
    </>
  );
}
