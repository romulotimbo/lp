import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoBackgroundProps {
  src?: string;
  poster?: string;
  /** B10 — static layer when video fails or `prefers-reduced-motion` */
  fallbackPortrait?: string;
  className?: string;
}

export function HeroVideoBackground({
  src = "/video/vee-hero.mp4",
  poster,
  fallbackPortrait = "/imagens/vee-portrait.jpg",
  className,
}: HeroVideoBackgroundProps) {
  const [videoFailed, setVideoFailed] = useState(false);

  const layerClass =
    "h-full w-full object-cover object-[50%_32%] opacity-[0.38] lg:object-[54%_36%]";

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <img
        src={fallbackPortrait}
        alt=""
        aria-hidden
        decoding="async"
        width={1080}
        height={1350}
        className={cn(
          layerClass,
          videoFailed ? "block" : "hidden",
          "motion-reduce:block",
        )}
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className={cn(layerClass, "motion-reduce:hidden", videoFailed && "hidden")}
        onError={() => setVideoFailed(true)}
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Vinheta leve — não duplicar gradiente pesado no Hero */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyber-black/25 via-transparent to-cyber-black/95"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyber-black/50 via-transparent to-cyber-black/30 lg:from-cyber-black/35"
        aria-hidden
      />
    </div>
  );
}
