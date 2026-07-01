import { useCallback, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "motion/react";
import { ChevronRight, Fingerprint, Gift, Lock, ShieldAlert } from "lucide-react";

const HOLD_DURATION_MS = 2500;
const LOCKED_BLUR = 8;
const UNLOCKED_BLUR = 0;

const lockedFiles = [
  { id: "01", name: "VEE_DIRECT.mp4" },
  { id: "02", name: "STUDIO_SESSION.jpg" },
  { id: "03", name: "PRIVATE_SET.jpg" },
  { id: "04", name: "BACKSTAGE_RAW.jpg" },
];

const previewAssets = [
  { src: "/imagens/modelo/1.webp", alt: "Preview exclusivo 01" },
  { src: "/imagens/modelo/2.webp", alt: "Preview exclusivo 02" },
  { src: "/imagens/modelo/3.webp", alt: "Preview exclusivo 03" },
  { src: "/imagens/modelo/4.webp", alt: "Preview exclusivo 04" },
  { src: "/imagens/modelo/5.jpg", alt: "Preview exclusivo 05" },
  { src: "/imagens/modelo/6.jpg", alt: "Preview exclusivo 06" },
  { src: "/imagens/modelo/7.jpg", alt: "Preview exclusivo 07" },
  { src: "/imagens/modelo/8.jpg", alt: "Preview exclusivo 08" },
];

function CensoredSlide({
  src,
  alt,
  blurPx,
  unlocked,
}: {
  src: string;
  alt: string;
  blurPx: MotionValue<number>;
  unlocked: boolean;
}) {
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);

  return (
    <div className="relative h-full w-full shrink-0 snap-center overflow-hidden rounded-md border border-[0.5px] border-blood-red/25 bg-cyber-graphite">
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full scale-105 object-cover"
        style={{ filter }}
        draggable={false}
      />
      <div
        className={`pointer-events-none absolute inset-0 ${
          unlocked ? "bg-blood-red/5" : "bg-blood-red/12"
        }`}
        aria-hidden
      />
      {!unlocked && (
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(196,30,58,0.1) 3px, rgba(196,30,58,0.1) 5px)",
          }}
          aria-hidden
        />
      )}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blood-red/40 bg-cyber-black/85">
          <Lock className="h-3.5 w-3.5 text-blood-red/80" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

export function RestrictedArea() {
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const progressMotion = useMotionValue(0);
  const blurPx = useTransform(
    progressMotion,
    [0, 100],
    [LOCKED_BLUR, UNLOCKED_BLUR],
  );
  const laserY = useTransform(progressMotion, [0, 100], ["0%", "100%"]);
  const barWidth = useTransform(progressMotion, (v) => `${v}%`);

  const resetScan = useCallback(() => {
    animationRef.current?.stop();
    animationRef.current = null;
    setIsScanning(false);
    setProgress(0);
    progressMotion.set(0);
  }, [progressMotion]);

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (unlocked) return;
    setIsScanning(true);

    animationRef.current = animate(progressMotion, 100, {
      duration: HOLD_DURATION_MS / 1000,
      ease: "linear",
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => {
        setUnlocked(true);
        setIsScanning(false);
        progressMotion.set(100);
      },
    });
  };

  const handlePressEnd = () => {
    if (unlocked) return;
    if (progress < 100) resetScan();
  };

  return (
    <section className="section-block--tight relative overflow-hidden bg-cyber-darker px-4 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(196,30,58,0.1)_0%,transparent_65%)] motion-safe:animate-pulse-slow"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Cabeçalho compacto */}
        <header className="mb-6 text-center sm:mb-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blood-red/30 bg-blood-red/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red sm:text-xs">
            <Gift className="h-3 w-3" />
            Prêmio · Só quem chegou até aqui
          </div>

          <h2 className="text-display-md font-display font-bold uppercase tracking-wide text-cyber-titanium">
            Área Restrita
          </h2>

          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-cyber-muted sm:text-sm">
            Conteúdo sigiloso da Vee. Segure o botão abaixo para desbloquear o
            preview exclusivo.
          </p>
        </header>

        {/* Painel único: vault + carrossel + CTA — tudo visível de uma vez */}
        <div className="overflow-hidden rounded-xl border border-blood-red/30 bg-cyber-black shadow-inner-dark motion-safe:animate-none">
          {/* Barra de status */}
          <div
            className={`flex items-center justify-between border-b border-blood-red/15 px-3 py-2 font-mono text-[10px] text-blood-red/60 sm:px-4 sm:text-xs ${
              !unlocked ? "motion-safe:animate-glitch" : ""
            }`}
          >
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="h-3 w-3" />
              VAULT // SIGILOSO
            </span>
            <span className="text-cyber-muted">
              {unlocked
                ? "desbloqueado"
                : isScanning
                  ? `${progress}%`
                  : "4 arquivos"}
            </span>
          </div>

          {/* Arquivos — faixa horizontal compacta (não coluna lateral) */}
          <div className="flex gap-2 overflow-x-auto border-b border-blood-red/10 px-3 py-2 [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden">
            {lockedFiles.map((file) => (
              <span
                key={file.id}
                className="shrink-0 whitespace-nowrap rounded border border-blood-red/15 bg-cyber-graphite/50 px-2 py-1 font-mono text-[10px] text-blood-red/80 sm:text-[11px]"
              >
                {file.name}{" "}
                <span className="text-blood-red/50">
                  [{unlocked ? "OPEN" : "LOCK"}]
                </span>
              </span>
            ))}
          </div>

          {/* Carrossel horizontal — altura fixa, peek da próxima imagem */}
          <div className="relative border-b border-blood-red/10 px-3 py-3 sm:px-4">
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-cyber-muted">
              <span>&gt; preview exclusivo</span>
              <span className="hidden items-center gap-0.5 sm:flex">
                deslize <ChevronRight className="h-3 w-3" />
              </span>
            </div>

            <div
              className="relative flex h-32 snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] sm:h-36 sm:gap-3 [&::-webkit-scrollbar]:hidden"
              aria-label="Galeria de previews censurados"
            >
              {previewAssets.map((asset) => (
                <div
                  key={asset.src}
                  className="h-full w-[38vw] max-w-[130px] shrink-0 snap-center sm:w-[120px]"
                >
                  <CensoredSlide
                    src={asset.src}
                    alt={asset.alt}
                    blurPx={blurPx}
                    unlocked={unlocked}
                  />
                </div>
              ))}
            </div>

            {/* Fade hint — indica mais conteúdo */}
            <div
              className="pointer-events-none absolute right-0 top-8 h-32 w-12 bg-gradient-to-l from-cyber-black to-transparent sm:top-9 sm:h-36"
              aria-hidden
            />
          </div>

          {/* CTA integrado — sempre visível no mesmo painel */}
          <div className="p-3 sm:p-4">
            {!unlocked && (
              <p className="mb-2.5 text-center font-mono text-[10px] uppercase tracking-wider text-blood-red/90 sm:text-xs">
                Segure o botão · as fotos desbloqueiam enquanto você pressiona
              </p>
            )}

            <button
              type="button"
              role="button"
              aria-pressed={isScanning}
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Segure para desbloquear o conteúdo exclusivo"
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              onTouchCancel={handlePressEnd}
              onContextMenu={(e) => e.preventDefault()}
              disabled={unlocked}
              className={`relative w-full min-h-[56px] cursor-pointer overflow-hidden rounded-lg border bg-cyber-graphite py-4 transition-[border-color,box-shadow,background-color] duration-300 select-none touch-none sm:min-h-[64px] ${
                unlocked
                  ? "border-blood-red/60"
                  : "border-blood-red/50 shadow-neon-red-soft hover:border-blood-red hover:shadow-neon-red"
              } disabled:cursor-default`}
            >
              <div className="relative z-10 flex items-center justify-center gap-3 px-3">
                <Fingerprint
                  className="h-7 w-7 shrink-0 text-blood-red sm:h-8 sm:w-8"
                  strokeWidth={1}
                />
                <span className="text-left font-mono text-xs uppercase leading-tight tracking-wide text-blood-red sm:text-sm">
                  {unlocked ? (
                    "Acesso Liberado"
                  ) : (
                    <>
                      Segure para Desbloquear
                      {isScanning && (
                        <span className="mt-0.5 block text-[10px] tabular-nums text-cyber-muted">
                          {progress}%
                        </span>
                      )}
                    </>
                  )}
                </span>
              </div>

              {isScanning && !unlocked && (
                <motion.div
                  className="pointer-events-none absolute left-0 right-0 z-20 h-0.5 bg-blood-red shadow-neon-red"
                  style={{ top: laserY }}
                />
              )}

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyber-darker">
                <motion.div
                  className="h-full bg-blood-red shadow-neon-red"
                  style={{ width: barWidth }}
                />
              </div>
            </button>

            <AnimatePresence>
              {unlocked && (
                <motion.a
                  href="#area-restrita"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="mt-3 flex min-h-[48px] cursor-pointer items-center justify-center rounded-lg border border-blood-red/50 bg-blood-red/10 font-mono text-xs uppercase tracking-wider text-blood-red transition-colors duration-200 hover:bg-blood-red/20 sm:text-sm"
                >
                  Acessar Conteúdo Exclusivo →
                </motion.a>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[10px] text-cyber-muted/50">
          owner: VEE · aes-256 · restricted
        </p>
      </div>
    </section>
  );
}
