import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { product } from "@/product/active";
import type { TrustChip } from "@/product/types";
import { ReviewHeading } from "@/sections/review-heading";
import { cn } from "@/lib/utils";

function TrustEntry({
  item,
  index,
  total,
  progress,
  reduced,
}: {
  item: TrustChip;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const span = 0.3;
  const step = total > 1 ? (0.72 - span) / (total - 1) : 0;
  const start = index * step;
  const end = start + span;
  const ink = useTransform(progress, [start, end], [0, 1]);
  const clip = useTransform(ink, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`);

  return (
    <li className="trust-entry">
      <motion.span
        className="trust-rule"
        aria-hidden
        style={reduced ? { scaleX: 1 } : { scaleX: ink }}
      />
      <motion.div
        className="trust-entry-body"
        style={reduced ? undefined : { clipPath: clip }}
      >
        <p className="font-review-display text-base font-semibold tracking-tight text-cyber-titanium">
          {item.label}
        </p>
        {item.detail ? (
          <p className="mt-2 text-sm leading-relaxed text-cyber-muted">{item.detail}</p>
        ) : null}
      </motion.div>
    </li>
  );
}

function AminoLedger({
  items,
  titled,
}: {
  items: TrustChip[];
  titled: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const ledgerRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ledgerRef,
    offset: ["start 0.92", "end 0.5"],
  });

  return (
    <ul ref={ledgerRef} className={cn("trust-ledger", titled && "mt-8")}>
      {items.map((item, index) => (
        <TrustEntry
          key={item.label}
          item={item}
          index={index}
          total={items.length}
          progress={scrollYProgress}
          reduced={Boolean(reducedMotion)}
        />
      ))}
    </ul>
  );
}

export function Trust() {
  const config = product.trust;
  if (!config || config.items.length === 0) return null;

  const amino = product.slug === "advanced-amino-formula";

  return (
    <section id="trust" className="section-block--tight px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {config.title ? (
          <ReviewHeading eyebrow={config.eyebrow} title={config.title} />
        ) : null}
        {amino ? (
          <AminoLedger items={config.items} titled={Boolean(config.title)} />
        ) : (
          <ul
            className={
              config.title
                ? "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            }
          >
            {config.items.map((item) => (
              <li
                key={item.label}
                className="border border-cyber-titanium/12 bg-cyber-graphite px-5 py-5"
              >
                <p className="font-review-display text-base font-semibold tracking-tight text-cyber-titanium">
                  {item.label}
                </p>
                {item.detail ? (
                  <p className="mt-2 text-sm leading-relaxed text-cyber-muted">{item.detail}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
