import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

function TabsList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex h-auto w-full flex-wrap gap-1 rounded-lg border border-[0.5px] border-cyber-graphite bg-cyber-darker p-1",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-4 py-2 font-display text-sm text-cyber-muted transition-[color,background-color] duration-300 hover:text-cyber-titanium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker data-[state=active]:bg-cyber-graphite data-[state=active]:text-blood-red",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blood-red",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
