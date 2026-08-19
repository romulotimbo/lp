import { useEffect, useRef } from "react";

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function paintLaidPaper(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);

  const ink =
    getComputedStyle(canvas).getPropertyValue("--color-text-primary").trim() ||
    "27 58 92";

  ctx.strokeStyle = `rgb(${ink} / 0.028)`;
  ctx.lineWidth = 1;
  const step = 8;
  const start = 24;
  for (let y = start; y < rect.height - 8; y += step) {
    ctx.beginPath();
    ctx.moveTo(18, y);
    ctx.lineTo(rect.width - 18, y);
    ctx.stroke();
  }

  const rand = mulberry32(2108);
  ctx.strokeStyle = `rgb(${ink} / 0.04)`;
  ctx.lineWidth = 0.65;
  const fibers = Math.floor((rect.width * rect.height) / 640);
  for (let i = 0; i < fibers; i += 1) {
    const x = rand() * rect.width;
    const y = rand() * rect.height;
    const length = 4 + rand() * 11;
    const angle = (rand() - 0.5) * 0.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }
}

/** Stationery grain: laid lines + fibers. Paints once per intersection/resize. */
export function LetterStock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let visible = false;
    let frame = 0;

    const redraw = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => paintLaidPaper(canvas));
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) redraw();
      },
      { rootMargin: "80px 0px" },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      if (visible) redraw();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="letter-stock"
      aria-hidden
      width={1}
      height={1}
    />
  );
}
