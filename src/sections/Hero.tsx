import { motion, useReducedMotion } from "motion/react";
import type { MouseEvent } from "react";
import { OutboundLink } from "@/components/outbound-link";
import { ProductGlow } from "@/components/product-glow";
import { HeroVideoBackground } from "@/components/hero-video-background";
import { ReviewStillLife, useStudioLight } from "@/components/review-still-life";
import { TiltCard } from "@/components/tilt-card";
import { handleCheckoutClick } from "@/lib/checkout-tracking";
import { cn } from "@/lib/utils";
import { isReviewLayout, product } from "@/product/active";
import { isDarkBackground } from "@/product/tokens";

/**
 * CTAs do Hero podem apontar direto pro checkout (ex. Alpha Surge) ou pra uma
 * âncora interna tipo `#pricing` (ex. Vee). Só rastreia/intercepta quando é
 * link externo de checkout — âncora interna segue o comportamento padrão.
 */
function handleHeroCtaClick(
  e: MouseEvent<HTMLAnchorElement>,
  cta: { label: string; href: string },
) {
  if (cta.href.startsWith("#")) return;
  handleCheckoutClick(e, { planId: "hero-cta", planName: cta.label, value: 0, url: cta.href });
}

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

const stampStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.28 },
  },
};

const stamp = {
  hidden: { opacity: 0, scale: 1.14, y: -8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 520, damping: 24 },
  },
};

export function Hero() {
  const reducedMotion = useReducedMotion();
  const { hero, spokesperson, outboundCta } = product;
  const mediaPack = spokesperson?.mediaPack;
  const review = isReviewLayout();
  const primaryCta = review && outboundCta ? outboundCta : hero.primaryCta;
  const darkReview = review && isDarkBackground(product.tokens);
  const stillLife = review && !darkReview;
  const studioRef = useStudioLight(stillLife);
  const chips = review ? hero.chips ?? [] : [];

  return (
    <section
      id="hero"
      ref={studioRef}
      className={cn(
        "relative min-h-screen",
        review ? "overflow-x-clip" : "overflow-hidden",
        stillLife && "review-still-stage",
      )}
    >
      <div className="absolute inset-0 bg-cyber-darker" />
      {review ? <div className="review-hero-glow pointer-events-none absolute inset-0" aria-hidden /> : null}
      {!review && mediaPack?.heroVideo ? (
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
          {!review ? (
            <div
              className="pointer-events-none absolute -inset-x-6 -inset-y-8 rounded-3xl bg-gradient-to-br from-cyber-black/75 via-cyber-black/25 to-transparent lg:-inset-x-10 lg:-inset-y-12 lg:from-cyber-black/65 lg:via-cyber-black/15"
              aria-hidden
            />
          ) : null}

          <div className="relative flex flex-col gap-7 lg:gap-8">
            {review && hero.eyebrowLine1 ? (
              <motion.p variants={fadeUp} className="section-eyebrow">
                {hero.eyebrowLine1}
              </motion.p>
            ) : null}

            {!review ? (
              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center gap-2 lg:items-start"
              >
                <p className="section-eyebrow tracking-[0.35em]">{hero.eyebrowLine1}</p>
                {hero.hudTag ? (
                  <p
                    className="hud-tag font-mono text-[10px] uppercase tracking-[0.18em] text-cyber-muted/50"
                    aria-hidden
                  >
                    {hero.hudTag}
                  </p>
                ) : null}
              </motion.div>
            ) : null}

            <motion.h1
              variants={fadeUp}
              className={cn(
                "text-display-hero text-balance font-bold tracking-tight text-cyber-titanium",
                review ? "font-review-display leading-[1.05]" : "font-display uppercase leading-[0.95]",
              )}
            >
              {hero.headlinePrefix}{" "}
              <span
                className={
                  review
                    ? "font-semibold text-blood-red"
                    : "underline decoration-blood-red decoration-2 underline-offset-[0.2em]"
                }
              >
                {hero.headlineHighlight}
              </span>
              {hero.headlineSuffix}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className={cn(
                "text-lg leading-relaxed sm:text-[1.125rem] sm:leading-relaxed",
                review ? "text-pretty text-cyber-muted" : "text-balance text-cyber-muted/90",
              )}
            >
              {hero.body}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              {chips.length > 0 ? (
                <motion.ul
                  variants={reducedMotion ? undefined : stampStagger}
                  className="flex flex-wrap justify-center gap-2 lg:justify-start"
                >
                  {chips.map((chip) => (
                    <motion.li
                      key={chip.label}
                      variants={reducedMotion ? undefined : stamp}
                      className="review-chip origin-center px-3 py-1.5 text-left text-xs leading-snug text-cyber-titanium sm:text-sm"
                    >
                      <span className="font-semibold">{chip.label}</span>
                      {chip.detail ? (
                        <span className="text-cyber-muted"> · {chip.detail}</span>
                      ) : null}
                    </motion.li>
                  ))}
                </motion.ul>
              ) : null}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                {review ? (
                  <OutboundLink
                    href={primaryCta.href}
                    label={primaryCta.label}
                    className="btn-primary w-full sm:w-auto"
                  />
                ) : (
                  <a
                    href={hero.primaryCta.href}
                    className="btn-primary"
                    onClick={(e) => handleHeroCtaClick(e, hero.primaryCta)}
                  >
                    {hero.primaryCta.label}
                  </a>
                )}
                {!review && hero.secondaryCta ? (
                  <a
                    href={hero.secondaryCta.href}
                    className="btn-ghost"
                    onClick={(e) => handleHeroCtaClick(e, hero.secondaryCta!)}
                  >
                    {hero.secondaryCta.label}
                  </a>
                ) : null}
              </div>
              <p
                className={cn(
                  review
                    ? "review-micro"
                    : "hud-tag font-mono text-[10px] uppercase tracking-[0.16em] text-cyber-muted/45",
                )}
              >
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
          className={cn(
            "relative z-10 w-full max-w-[min(100%,22rem)] shrink-0 sm:max-w-md lg:max-w-lg lg:flex-1",
            stillLife && "[transform-style:preserve-3d]",
          )}
        >
          {stillLife ? (
            <ReviewStillLife
              src={hero.productImage.src}
              alt={hero.productImage.alt}
            />
          ) : review ? (
            <figure className="review-product-shot">
              <img
                src={hero.productImage.src}
                alt={hero.productImage.alt}
                width={720}
                height={720}
                decoding="async"
              />
            </figure>
          ) : (
            <>
              <p
                className="hud-tag mb-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red/65 lg:text-left"
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
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
