import { useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Luz de estúdio no Hero editorial claro (Amino): uma key que orbita
 * sozinha e segue o pointer fino. `--lx` / `--ly` (0–1) alimentam glow,
 * sombra do prato e speculares — o mesmo feixe, três superfícies.
 */
export function useStudioLight(enabled: boolean): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const clamp = (n: number, min: number, max: number) =>
      Math.min(max, Math.max(min, n));

    let tracking = false;
    let lx = 0.32;
    let ly = 0.28;
    let tx = lx;
    let ty = ly;
    let raf = 0;
    let origin = performance.now();
    let inView = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.08 },
    );
    io.observe(el);

    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)");

    const onMove = (e: PointerEvent) => {
      if (!finePointer.matches) return;
      tracking = true;
      const r = el.getBoundingClientRect();
      tx = clamp((e.clientX - r.left) / r.width, 0.12, 0.88);
      ty = clamp((e.clientY - r.top) / r.height, 0.1, 0.68);
    };

    const onLeave = () => {
      tracking = false;
      origin = performance.now();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    const write = (x: number, y: number) => {
      el.style.setProperty("--lx", x.toFixed(4));
      el.style.setProperty("--ly", y.toFixed(4));
    };

    if (reducedMotion) {
      write(0.32, 0.28);
      return () => {
        io.disconnect();
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        el.style.removeProperty("--lx");
        el.style.removeProperty("--ly");
      };
    }

    const damp = 0.075;
    const tick = (now: number) => {
      if (inView) {
        if (!tracking) {
          const t = (now - origin) / 18000;
          const a = t * Math.PI * 2;
          tx = 0.5 + Math.cos(a) * 0.26;
          ty = 0.34 + Math.sin(a * 0.88) * 0.16;
        }
        lx += (tx - lx) * damp;
        ly += (ty - ly) * damp;
        write(lx, ly);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.removeProperty("--lx");
      el.style.removeProperty("--ly");
    };
  }, [enabled, reducedMotion]);

  return ref;
}

export function ReviewStillLife({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="review-still-rig">
      <div className="review-still-ground" aria-hidden />
      <figure className="review-product-shot review-product-shot--plate review-still-life">
        <img
          src={src}
          alt={alt}
          width={720}
          height={720}
          decoding="async"
        />
        <span className="review-still-fill" aria-hidden />
        <span className="review-still-key" aria-hidden />
        <span className="review-still-specular" aria-hidden />
      </figure>
    </div>
  );
}
