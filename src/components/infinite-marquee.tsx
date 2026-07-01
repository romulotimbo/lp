import { cn } from "@/lib/utils";

interface InfiniteMarqueeProps {
  items: React.ReactNode[];
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  duration?: number;
}

export function InfiniteMarquee({
  items,
  reverse = false,
  pauseOnHover = true,
  className,
  duration = 40,
}: InfiniteMarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
      style={{ "--duration": `${duration}s` } as React.CSSProperties}
    >
      <ul
        className={cn(
          "flex min-w-full shrink-0 items-stretch gap-4 py-2",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          "motion-reduce:animate-none",
        )}
      >
        {items.map((item, i) => (
          <li key={`a-${i}`} className="shrink-0">
            {item}
          </li>
        ))}
      </ul>
      <ul
        className={cn(
          "flex min-w-full shrink-0 items-stretch gap-4 py-2",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          "motion-reduce:animate-none",
        )}
        aria-hidden
      >
        {items.map((item, i) => (
          <li key={`b-${i}`} className="shrink-0">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
