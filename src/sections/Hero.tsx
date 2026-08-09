import { motion, useReducedMotion } from "motion/react";
import { ProductGlow } from "@/components/product-glow";
import { HeroVideoBackground } from "@/components/hero-video-background";
import { TiltCard } from "@/components/tilt-card";
import { product } from "@/product/active";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const reducedMotion = useReducedMotion();
  const { hero, spokesperson } = product;
  const mediaPack = spokesperson?.mediaPack;

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-cyber-darker" />
      {mediaPack?.heroVideo ? (
        <HeroVideoBackground
          src={mediaPack.heroVideo}
          poster={mediaPack.heroPoster}
          fallbackPortrait={mediaPack.heroFallbackPortrait}
        />
      ) : null}

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-10 px-6 py-20 sm:gap-12 sm:py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-8 lg:py-28">
        <motion.div
          variants={reducedMotion ? undefined : stagger}
          initial={reducedMotion ? undefined : "hidden"}
          animate={reducedMotion ? undefined : "show"}
          className="relative z-10 flex w-full max-w-xl flex-col gap-7 text-center lg:max-w-2xl lg:gap-8 lg:text-left"
        >
          <div
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 rounded-3xl bg-gradient-to-br from-cyber-black/75 via-cyber-black/25 to-transparent lg:-inset-x-10 lg:-inset-y-12 lg:from-cyber-black/65 lg:via-cyber-black/15"
            aria-hidden
          />

          <div className="relative flex flex-col gap-7 lg:gap-8">
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center gap-2 lg:items-start"
            >
              <p className="section-eyebrow tracking-[0.35em]">{hero.eyebrowLine1}</p>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyber-muted/50"
                aria-hidden
              >
                {hero.hudTag}
              </p>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-display-hero text-balance font-display font-bold uppercase leading-[0.95] tracking-tight text-cyber-titanium"
            >
              {hero.headlinePrefix}{" "}
              <span className="underline decoration-blood-red decoration-2 underline-offset-[0.2em]">
                {hero.headlineHighlight}
              </span>
              {hero.headlineSuffix}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-balance text-lg leading-relaxed text-cyber-muted/90 sm:text-[1.125rem] sm:leading-relaxed"
            >
              {hero.body}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a href={hero.primaryCta.href} className="btn-primary">
                  {hero.primaryCta.label}
                </a>
                {hero.secondaryCta ? (
                  <a href={hero.secondaryCta.href} className="btn-ghost">
                    {hero.secondaryCta.label}
                  </a>
                ) : null}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyber-muted/45">
                {hero.microcopy}
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
          animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="relative z-10 w-full max-w-[min(100%,22rem)] shrink-0 sm:max-w-md lg:max-w-lg lg:flex-1"
        >
          <p
            className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red/65 lg:text-left"
            aria-hidden
          >
            HUD::PRODUCT_LOCK
          </p>
          <ProductGlow className="relative w-full">
            <TiltCard
              src={hero.productImage.src}
              alt={hero.productImage.alt}
              className="relative w-full"
            />
          </ProductGlow>
        </motion.div>
      </div>
    </section>
  );
}
