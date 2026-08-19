import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "motion/react";

const STEM =
  "M18 64 C24 64 28 22 40 16 C54 8 62 28 56 58 C50 86 66 96 82 70 C98 44 116 24 138 38 C160 52 164 82 188 74 C220 62 258 36 304 48 C328 54 348 42 356 40";
const BAR = "M22 28 C36 18 52 24 66 16";
const FLOURISH = "M82 72 C120 90 170 58 214 70";

function paintBloom(
  canvas: HTMLCanvasElement,
  svg: SVGSVGElement,
  paths: SVGPathElement[],
) {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);

  const svgRect = svg.getBoundingClientRect();
  const scaleX = rect.width / svg.viewBox.baseVal.width;
  const scaleY = rect.height / svg.viewBox.baseVal.height;
  const offsetX = svgRect.left - rect.left;
  const offsetY = svgRect.top - rect.top;

  const ink =
    getComputedStyle(canvas).getPropertyValue("--color-accent-dark").trim() ||
    "30 79 122";

  ctx.globalCompositeOperation = "multiply";

  for (const path of paths) {
    const length = path.getTotalLength();
    const steps = Math.max(24, Math.floor(length / 3.2));
    for (let i = 0; i <= steps; i += 1) {
      const point = path.getPointAtLength((i / steps) * length);
      const x = offsetX + point.x * scaleX;
      const y = offsetY + point.y * scaleY;
      const radius = i > steps * 0.78 ? 2.6 : 1.55;
      const fade = 0.04 + (i / steps) * 0.03;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgb(${ink} / ${fade})`);
      gradient.addColorStop(1, `rgb(${ink} / 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export function InkSignature() {
  const reduced = useReducedMotion();
  const filterId = `ink-wet-${useId().replace(/:/g, "")}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const stemRef = useRef<SVGPathElement>(null);
  const barRef = useRef<SVGPathElement>(null);
  const flourishRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    const paths = [stemRef.current, barRef.current, flourishRef.current].filter(
      (node): node is SVGPathElement => Boolean(node),
    );
    if (!wrap || !canvas || !svg || paths.length === 0 || reduced) return;

    let painted = false;
    const draw = () => {
      paintBloom(canvas, svg, paths);
      painted = true;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !painted) draw();
      },
      { threshold: 0.45 },
    );
    io.observe(wrap);

    return () => io.disconnect();
  }, [reduced]);

  return (
    <figure className="verdict-sign">
      <div ref={wrapRef} className="verdict-sign-ink">
        {reduced ? null : (
          <canvas ref={canvasRef} className="verdict-sign-bloom" aria-hidden />
        )}
        <svg
          ref={svgRef}
          className="verdict-sign-path"
          viewBox="0 0 368 110"
          aria-hidden
          focusable="false"
        >
          <defs>
            <filter
              id={filterId}
              x="-8%"
              y="-20%"
              width="116%"
              height="150%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.035 0.08"
                numOctaves="2"
                seed="7"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="0.55"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
          <g filter={`url(#${filterId})`}>
            <path ref={stemRef} className="verdict-sign-stem" d={STEM} pathLength={1} />
            <path ref={barRef} className="verdict-sign-bar" d={BAR} pathLength={1} />
            <path
              ref={flourishRef}
              className="verdict-sign-flourish"
              d={FLOURISH}
              pathLength={1}
            />
          </g>
        </svg>
      </div>
      <figcaption className="verdict-sign-caption">
        Reviewed · August 2026
      </figcaption>
    </figure>
  );
}
