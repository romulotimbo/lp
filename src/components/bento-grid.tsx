import { type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  className?: string;
  children: ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  className?: string;
  children: ReactNode;
}

export function BentoCard({ className, children }: BentoCardProps) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "spotlight-border group relative overflow-hidden rounded-2xl border border-cyber-graphite bg-cyber-graphite p-6 transition-colors duration-200",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blood-red/5 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
