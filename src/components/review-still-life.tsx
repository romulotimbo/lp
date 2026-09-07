import { useEffect, useId, useRef, type RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

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

function useHeatHaze(
  enabled: boolean,
  rootRef: RefObject<HTMLElement | null>,
  mapRef: RefObject<SVGFEDisplacementMapElement | null>,
  noiseRef: RefObject<SVGFETurbulenceElement | null>,
) {
  useEffect(() => {
    const root = rootRef.current;
    const map = mapRef.current;
    const noise = noiseRef.current;
    if (!enabled || !root || !map || !noise) return;

    let inView = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (!entry.isIntersecting) map.setAttribute("scale", "0");
      },
      { threshold: 0.08 },
    );
    io.observe(root);

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (inView && now - last >= 32) {
        last = now;
        const host = root.closest("[data-layout]") ?? document.documentElement;
        const heat = Number.parseFloat(getComputedStyle(host).getPropertyValue("--letter-heat")) || 0;
        const stage = root.closest(".review-still-stage");
        const light = getComputedStyle(stage ?? host);
        const lx = Number.parseFloat(light.getPropertyValue("--lx")) || 0.32;
        const ly = Number.parseFloat(light.getPropertyValue("--ly")) || 0.28;
        const offset = Math.hypot(lx - 0.5, ly - 0.34);
        map.setAttribute("scale", Math.min(16, 8 + heat * 6 + offset * 3).toFixed(2));
        const t = now / 1000;
        noise.setAttribute(
          "baseFrequency",
          `${(0.011 + Math.sin(t * 0.35) * 0.003).toFixed(4)} ${(0.024 + Math.cos(t * 0.28) * 0.004).toFixed(4)}`,
        );
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [enabled, mapRef, noiseRef, rootRef]);
}

export function ReviewStillLife({
  src,
  alt,
  heatHaze = false,
  caustic = false,
}: {
  src: string;
  alt: string;
  heatHaze?: boolean;
  caustic?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const haze = heatHaze && !reducedMotion;
  const glass = caustic;
  const filterId = `letter-heat-haze${useId().replace(/:/g, "")}`;
  const causticId = `lab-caustic${useId().replace(/:/g, "")}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<SVGFEDisplacementMapElement>(null);
  const noiseRef = useRef<SVGFETurbulenceElement>(null);
  useHeatHaze(Boolean(haze), rootRef, mapRef, noiseRef);

  return (
    <div
      className={cn("review-still-rig", glass && "review-still-rig--glass")}
      ref={rootRef}
    >
      {haze ? (
        <svg className="letter-heat-filter" aria-hidden>
          <filter
            id={filterId}
            x="-12%"
            y="-12%"
            width="124%"
            height="124%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={noiseRef}
              type="fractalNoise"
              baseFrequency="0.012 0.026"
              numOctaves="2"
              seed="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feDisplacementMap
              ref={mapRef}
              in="SourceGraphic"
              in2="noise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      ) : null}
      {glass ? (
        <>
          <svg className="review-glass-filter" aria-hidden>
            <filter
              id={causticId}
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.016 0.028"
                numOctaves="3"
                seed="7"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 1.8 -0.55"
                result="ridges"
              />
              <feGaussianBlur in="ridges" stdDeviation="0.7" result="soft" />
            </filter>
          </svg>
          <div className="review-glass-slab" aria-hidden>
            <span className="review-glass-caustic" />
            <span
              className="review-glass-caustic-ridges"
              style={{ filter: `url(#${causticId})` }}
            />
            <span className="review-glass-edge" />
            <span className="review-glass-sheen" />
          </div>
        </>
      ) : null}
      <div className="review-still-ground" aria-hidden />
      <figure
        className={cn(
          "review-product-shot review-product-shot--plate review-still-life",
          haze && "review-still-life--haze",
          glass && "review-still-life--glass",
        )}
        style={haze ? { ["--haze-filter" as string]: `url(#${filterId})` } : undefined}
      >
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
