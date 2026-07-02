export function PageFooter() {
  return (
    <footer className="border-t border-blood-red/12 bg-cyber-darker px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-bold uppercase tracking-tight text-cyber-titanium">
            Energi Power
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-blood-red/70">
            by VEE · protocol_ep
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href="#pricing"
            className="font-display text-xs uppercase tracking-wider text-cyber-muted transition-colors duration-300 hover:text-blood-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-red/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker"
          >
            Garantir kit →
          </a>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyber-muted/40">
            discreet_ship · natural · batch EP-vee
          </p>
        </div>
      </div>
    </footer>
  );
}
