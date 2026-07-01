import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const manifestoText =
  "Eu sou exigente. Corpo, mente e cama. Se você some no meio do jogo, nem chega perto. Energi Power existe pra homem que decide ser potente — natural, sem desculpa. Toma. Performa. Ou assiste de longe. Quem chegar até o fim da página talvez ganhe mais do que cápsulas.";

const words = manifestoText.split(" ");

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

export function Manifesto() {
  return (
    <>
      <div className="section-divider" aria-hidden />
      <section className="section-block--loose relative overflow-hidden bg-cyber-black px-6 lg:px-8">
        <img
          src="/imagens/vee-manifesto-watermark.webp"
          alt=""
          aria-hidden
          width={1200}
          height={1600}
          decoding="async"
          className="pointer-events-none absolute -right-[12%] top-1/2 z-0 w-[min(72vw,28rem)] -translate-y-1/2 select-none object-contain opacity-[0.06] saturate-0 sm:-right-[8%] sm:opacity-[0.07] lg:w-[32rem] lg:opacity-[0.08]"
        />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="section-eyebrow mb-10">A voz da Vee</p>

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
