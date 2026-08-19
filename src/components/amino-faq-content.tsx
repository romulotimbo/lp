import type { ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function AminoFaqContent({
  open,
  stop,
  children,
}: {
  open: boolean;
  stop?: boolean;
  children: ReactNode;
}) {
  const reduced = Boolean(useReducedMotion());

  return (
    <AccordionPrimitive.Content forceMount asChild>
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : {
                height: {
                  type: "spring",
                  stiffness: stop ? 540 : 380,
                  damping: stop ? 36 : 34,
                  mass: 0.82,
                },
                opacity: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
              }
        }
        style={{ pointerEvents: open ? "auto" : "none" }}
        inert={!open}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "max-w-prose pb-6 text-sm leading-[1.7] sm:text-[0.9375rem]",
            stop ? "faq-stop-panel" : "text-cyber-muted",
          )}
        >
          {children}
        </div>
      </motion.div>
    </AccordionPrimitive.Content>
  );
}
