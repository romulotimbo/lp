import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t border-blood-red/25 bg-cyber-black p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] shadow-lift-sm transition-transform duration-500 ease-out-expo md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <a href="#pricing" className="btn-primary w-full">
        Garantir · a partir de R$ 97
      </a>
    </div>
  );
}
