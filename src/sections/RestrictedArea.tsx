import { useCallback, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "motion/react";
import { VaultWaitlistModal } from "@/components/vault-waitlist-modal";

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

function BiometricHud({ scanning }: { scanning: boolean }) {
  return (
    <div
      className="relative flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9"
      aria-hidden
    >
      <span className="absolute inset-0 border border-blood-red/35" />
      <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-blood-red/70" />
      <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-blood-red/70" />
      <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-blood-red/70" />
      <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-blood-red/70" />
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-blood-red/85 sm:h-6 sm:w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M12 4c-3.5 0-6 2.8-6 6.5 0 2.2 1.2 4.2 3 5.2" />
        <path d="M12 4c3.5 0 6 2.8 6 6.5 0 2.2-1.2 4.2-3 5.2" />
        <path d="M12 15.7v4.3" />
        <path d="M9.5 20h5" />
        {scanning ? (
          <motion.line
            x1="4"
            x2="20"
            initial={{ y1: 6, y2: 6 }}
            animate={{ y1: [6, 18, 6], y2: [6, 18, 6] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            stroke="rgba(196,30,58,0.9)"
            strokeWidth="0.75"
          />
        ) : null}
      </svg>
    </div>
  );
}

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
        <span className="border border-blood-red/45 bg-cyber-black/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-blood-red/90">
          {unlocked ? "open" : "lock"}
        </span>
      </div>
    </div>
  );
}

export function RestrictedArea() {
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
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
        <header className="mb-6 text-center sm:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blood-red/30 bg-blood-red/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red sm:text-xs">
            <span className="inline-block h-1.5 w-1.5 animate-hud-blink rounded-full bg-blood-red" />
            PRIZE::SCROLL_REWARD
          </div>

          <h2 className="text-display-md font-display font-bold uppercase tracking-wide text-cyber-titanium">
            Área Restrita
          </h2>

          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-cyber-muted sm:text-sm">
            Você scrollou até aqui. Segura o botão — a Vee liberou um preview que
            não está no story.
          </p>
        </header>

        <div className="overflow-hidden rounded-xl border border-blood-red/30 bg-cyber-black shadow-inner-dark motion-safe:animate-none">
          <div
            className={`flex items-center justify-between border-b border-blood-red/15 px-3 py-2 font-mono text-[10px] text-blood-red/60 sm:px-4 sm:text-xs ${
              !unlocked ? "motion-safe:animate-glitch" : ""
            }`}
          >
            <span>VAULT // SIGILOSO // AES-256</span>
            <span className="text-cyber-muted">
              {unlocked
                ? "status · unlocked"
                : isScanning
                  ? `scan · ${progress}%`
                  : "4 arquivos · locked"}
            </span>
          </div>

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

          <div className="relative border-b border-blood-red/10 px-3 py-3 sm:px-4">
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-cyber-muted">
              <span>&gt; preview_exclusivo</span>
              <span className="hidden sm:inline">deslize →</span>
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

            <div
              className="pointer-events-none absolute right-0 top-8 h-32 w-12 bg-gradient-to-l from-cyber-black to-transparent sm:top-9 sm:h-36"
              aria-hidden
            />
          </div>

          <div className="p-3 sm:p-4">
            {!unlocked && (
              <p className="mb-2.5 text-center font-mono text-[10px] uppercase tracking-wider text-blood-red/90 sm:text-xs">
                BIO::HOLD · as fotos desbloqueiam enquanto você pressiona
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
                <BiometricHud scanning={isScanning && !unlocked} />
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
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  onClick={() => setWaitlistOpen(true)}
                  className="mt-3 flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-lg border border-blood-red/50 bg-blood-red/10 font-mono text-xs uppercase tracking-wider text-blood-red transition-colors duration-200 hover:bg-blood-red/20 sm:text-sm"
                >
                  Acessar Conteúdo Exclusivo →
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[10px] text-cyber-muted/50">
          owner: VEE · aes-256 · restricted
        </p>
      </div>

      <VaultWaitlistModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />
    </section>
  );
}
