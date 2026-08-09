import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { product } from "@/product/active";

function ManifestoWord({ word, index, total }: { word: string; index: number; total: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);

  const color = useTransform(
    scrollYProgress,
    [0, 1],
    ["var(--manifesto-dim)", "var(--manifesto-lit)"],
  );

  return (
    <motion.span
      ref={ref}
      style={{ opacity, color }}
      className="mr-[0.28em] inline"
    >
      {word}
      {index < total - 1 ? " " : ""}
    </motion.span>
  );
}

/** Renderiza a "voz" do Spokesperson do Produto. Só é montado quando `spokesperson` está definido (ver product/registry.tsx). */
export function Manifesto() {
  const { spokesperson } = product;
  if (!spokesperson) return null;

  const words = spokesperson.manifesto.text.split(" ");

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section className="section-block--loose relative overflow-hidden bg-cyber-black px-6 lg:px-8">
        {spokesperson.mediaPack.watermark ? (
          <img
            src={spokesperson.mediaPack.watermark}
            alt=""
            aria-hidden
            width={1200}
            height={1600}
            decoding="async"
            className="pointer-events-none absolute -right-[12%] top-1/2 z-0 w-[min(72vw,28rem)] -translate-y-1/2 select-none object-contain opacity-[0.06] saturate-0 sm:-right-[8%] sm:opacity-[0.07] lg:w-[32rem] lg:opacity-[0.08]"
          />
        ) : null}
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="section-eyebrow">{spokesperson.manifesto.eyebrow}</p>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyber-muted/50"
              aria-hidden
            >
              manifesto · voice_profile · scroll_reveal
            </p>
          </div>

          <p className="text-manifesto text-balance font-display font-medium uppercase leading-[1.15] tracking-tight">
            {words.map((word, i) => (
              <ManifestoWord
                key={`${word}-${i}`}
                word={word}
                index={i}
                total={words.length}
              />
            ))}
          </p>
        </div>
      </section>
    </>
  );
}
