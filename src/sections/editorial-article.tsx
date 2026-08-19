import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { OutboundLink } from "@/components/outbound-link";
import { isReviewLayout, product } from "@/product/active";
import type { EditorialBlock } from "@/product/types";
import { cn } from "@/lib/utils";

function parseStat(value: string): { target: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: Number(match[1]), suffix: match[2] };
}

function paragraphs(body: string): string[] {
  return body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function markOnce(
  text: string,
  phrase: string | undefined,
  render: (phrase: string) => ReactNode,
): ReactNode {
  if (!phrase) return text;
  const index = text.indexOf(phrase);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      {render(phrase)}
      {text.slice(index + phrase.length)}
    </>
  );
}

function PainInk({
  phrase,
  count,
  suffix,
  ink,
  reduced,
}: {
  phrase: string;
  count: number;
  suffix: string;
  ink: MotionValue<number>;
  reduced: boolean;
}) {
  return (
    <span className="pain-ink">
      <span className="sr-only">{phrase}</span>
      <span aria-hidden className="pain-ink-count">
        {reduced ? phrase : `${count}${suffix}`}
      </span>
      <motion.span
        className="pain-ink-rule"
        aria-hidden
        style={reduced ? { scaleX: 1 } : { scaleX: ink }}
      />
    </span>
  );
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

function MediaColumn({
  block,
  extra,
  sourceNote,
}: {
  block: EditorialBlock;
  extra?: ReactNode;
  sourceNote?: string;
}) {
  if (!block.figure && !extra) return null;
  return (
    <div className={cn("editorial-media", extra && "editorial-media--stack")}>
      {extra}
      {block.figure ? (
        <div className={sourceNote ? "util-source-plate" : undefined}>
          {sourceNote ? (
            <p className="util-source-label">{sourceNote}</p>
          ) : null}
          <Figure block={block} />
        </div>
      ) : null}
    </div>
  );
}

export function EditorialArticle({
  id,
  block,
  figureSide = "end",
  children,
  mediaExtra,
  sourceNote,
  ctaVariant = "ghost",
  markPhrase,
  ghostStat,
}: {
  id: string;
  block: EditorialBlock;
  figureSide?: "start" | "end";
  children?: ReactNode;
  /** Extra visual with the figure — live chart, reconstructed data, etc. */
  mediaExtra?: ReactNode;
  sourceNote?: string;
  /** Fold CTAs stay ghost so guarantee / mid-cta / Hero keep the primary weight. */
  ctaVariant?: "primary" | "ghost";
  markPhrase?: string;
  ghostStat?: { value: string; dateline: string };
}) {
  const paras = paragraphs(block.body);
  const figureFirst = figureSide === "start" && Boolean(block.figure);
  const cta = isReviewLayout() ? product.outboundCta : undefined;
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const live = Boolean(ghostStat) && !reducedMotion;
  const statTarget = ghostStat ? parseStat(ghostStat.value).target : 0;
  const statSuffix = ghostStat ? parseStat(ghostStat.value).suffix : "";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "end 0.18"],
  });
  const ghostOp = useTransform(scrollYProgress, [0.08, 0.48], [0.06, 0.2]);
  const dateOp = useTransform(scrollYProgress, [0.28, 0.58], [0, 0.78]);
  const rawCount = useTransform(scrollYProgress, [0.06, 0.5], [0, statTarget]);
  const roundedCount = useTransform(rawCount, (v) => Math.round(v));
  const ink = useTransform(scrollYProgress, [0.16, 0.54], [0, 1]);
  const [count, setCount] = useState(() => (live ? 0 : statTarget));

  useMotionValueEvent(roundedCount, "change", setCount);
  useEffect(() => {
    if (!ghostStat) return;
    setCount(live ? Math.round(roundedCount.get()) : statTarget);
  }, [ghostStat, live, roundedCount, statTarget]);

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id={id} ref={sectionRef} className="section-block px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:max-w-5xl">
          {block.eyebrow ? <p className="section-eyebrow mb-3">{block.eyebrow}</p> : null}
          <h2 className="section-title text-balance">{block.title}</h2>

          <div
            className={
              block.figure || mediaExtra
                ? cn(
                    "mt-8 grid gap-10 lg:mt-10 lg:grid-cols-2 lg:gap-14",
                    mediaExtra ? "items-start" : "items-center",
                  )
                : "mt-8 max-w-prose"
            }
          >
            {figureFirst ? (
              <MediaColumn
                block={block}
                extra={mediaExtra}
                sourceNote={sourceNote}
              />
            ) : null}

            <div
              className={cn(
                "relative max-w-prose space-y-5",
                ghostStat && "editorial-cinema-prose",
              )}
            >
              {ghostStat ? (
                <span className="pain-ghost" aria-hidden>
                  <motion.span
                    className="pain-ghost-num"
                    style={live ? { opacity: ghostOp } : undefined}
                  >
                    {live ? `${count}${statSuffix}` : ghostStat.value}
                  </motion.span>
                  <motion.span
                    className="pain-ghost-date"
                    style={live ? { opacity: dateOp } : undefined}
                  >
                    {ghostStat.dateline}
                  </motion.span>
                </span>
              ) : null}
              {paras.map((paragraph, index) => (
                <p
                  key={`${id}-${index}`}
                  className="relative text-base leading-[1.7] text-cyber-muted sm:text-lg"
                >
                  {markOnce(paragraph, markPhrase, (phrase) =>
                    ghostStat ? (
                      <PainInk
                        phrase={phrase}
                        count={count}
                        suffix={statSuffix}
                        ink={ink}
                        reduced={!live}
                      />
                    ) : (
                      <span className="pain-ink">{phrase}</span>
                    ),
                  )}
                </p>
              ))}
              {children}
              {cta ? (
                <div className="pt-2">
                  <OutboundLink
                    href={cta.href}
                    label={cta.label}
                    className={ctaVariant === "primary" ? "btn-primary" : "btn-ghost"}
                  />
                </div>
              ) : null}
            </div>

            {block.figure && !figureFirst ? (
              <MediaColumn
                block={block}
                extra={mediaExtra}
                sourceNote={sourceNote}
              />
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
