import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

function AccordionItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "group border-b border-cyber-graphite/50 transition-[border-color,padding] duration-300 last:border-b-0 data-[state=open]:border-blood-red/20",
        className,
      )}
      {...props}
    />
  );
}

function FaqIndicator() {
  return (
    <span className="relative ml-4 h-4 w-4 shrink-0" aria-hidden>
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyber-muted/70 transition-colors duration-300 group-data-[state=open]:bg-blood-red" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyber-muted/70 transition-[transform,opacity,background-color] duration-300 group-data-[state=open]:scale-y-0 group-data-[state=open]:opacity-0 group-data-[state=open]:bg-blood-red" />
    </span>
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex w-full cursor-pointer items-start gap-4 py-5 text-left transition-[color,padding] duration-300 hover:text-blood-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-black data-[state=open]:pb-3 data-[state=open]:text-blood-red sm:gap-5 sm:py-6",
          className,
        )}
        {...props}
      >
        {children}
        <FaqIndicator />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-cyber-muted data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          "max-w-prose pb-6 pl-[2.75rem] text-sm leading-[1.7] sm:pl-[3.25rem] sm:text-[0.9375rem]",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
