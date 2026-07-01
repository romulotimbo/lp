import { useRef, type MouseEvent, type ReactNode, type TouchEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

/** Graus máx. de inclinação — hero precisa ser perceptível sem virar gimmick. */
const TILT_DEG = 18;
/** Deslocamento lateral leve reforça profundidade 3D. */
const SHIFT_PX = 14;
/** translateZ proporcional à distância do cursor ao centro. */
const LIFT_PX = 52;

const SPRING = { stiffness: 170, damping: 21, mass: 0.75 };

interface TiltCardProps {
  src: string;
  alt: string;
  className?: string;
  children?: ReactNode;
  /** Multiplicador fino (1 = padrão hero). */
  intensity?: number;
}

export function TiltCard({
  src,
  alt,
  className,
  children,
  intensity = 1,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tilt = TILT_DEG * intensity;
  const shift = SHIFT_PX * intensity;
  const lift = LIFT_PX * intensity;

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [tilt, -tilt]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-tilt, tilt]);
  const shiftX = useTransform(mouseX, [-0.5, 0.5], [-shift, shift]);
  const shiftY = useTransform(mouseY, [-0.5, 0.5], [-shift, shift]);
  const liftZ = useTransform([mouseX, mouseY], ([x, y]) => {
    const nx = typeof x === "number" ? x : 0;
    const ny = typeof y === "number" ? y : 0;
    return Math.hypot(nx, ny) * lift;
  });

  const springRotateX = useSpring(rotateX, SPRING);
  const springRotateY = useSpring(rotateY, SPRING);
  const springShiftX = useSpring(shiftX, SPRING);
  const springShiftY = useSpring(shiftY, SPRING);
  const springLiftZ = useSpring(liftZ, SPRING);

  const updateTilt = (clientX: number, clientY: number) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    updateTilt(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) updateTilt(touch.clientX, touch.clientY);
  };

  const resetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={ref}
      className={cn("perspective-[760px] touch-none select-none", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetTilt}
    >
      <motion.div
        className="relative transform-gpu will-change-transform"
        style={
          reducedMotion
            ? undefined
            : {
                rotateX: springRotateX,
                rotateY: springRotateY,
                x: springShiftX,
                y: springShiftY,
                z: springLiftZ,
                transformStyle: "preserve-3d",
              }
        }
      >
        <img
          src={src}
          alt={alt}
          className="relative z-10 w-full max-w-md"
          draggable={false}
        />
        {children}
      </motion.div>
    </div>
  );
}
