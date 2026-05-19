import Link from 'next/link';
import { ChevronRight, Radio, Crosshair } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-ink-950">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486591038343-13b6abe5ff61?auto=format&fit=crop&w=2400&q=85')",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/85 to-ink-950/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 grid-bg opacity-40"
        aria-hidden="true"
      />
      <div
        className="absolute top-32 right-8 hidden md:flex flex-col items-end gap-1 text-right font-mono text-[0.66rem] tracking-[0.3em] uppercase text-bone-300/60"
        aria-hidden="true"
      >
        <span>N 34° 11' 47"</span>
        <span>W 86° 28' 02"</span>
        <span className="text-safety-500">/// BASECAMP-07 ///</span>
      </div>

      <div className="container-wt relative z-10 pb-24 pt-40">
        <div className="max-w-4xl space-y-8">
          <span className="eyebrow opacity-0 animate-fadeUp [animation-delay:200ms]">
            Luxury Tactical Expedition Outfitter
          </span>
          <h1 className="display-h1 text-bone-50 opacity-0 animate-fadeUp [animation-delay:350ms]">
            Equipping The Wild.
            <span className="block text-safety-500">Streaming The Adventure.</span>
          </h1>
          <p className="text-bone-200 text-lg md:text-xl max-w-2xl leading-relaxed opacity-0 animate-fadeUp [animation-delay:500ms]">
            Hand-built power, broadcast, and precision systems for operators who run remote
            base camps, command thermal drones, and stream 4K from places without roads.
          </p>
          <div className="flex flex-wrap gap-3 opacity-0 animate-fadeUp [animation-delay:650ms]">
            <Link href="/products" className="btn btn-primary btn-lg">
              Enter The Vault
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/live" className="btn btn-outline btn-lg">
              <Radio className="w-4 h-4" />
              Watch Live Now
            </Link>
          </div>

          <div className="hidden md:grid grid-cols-3 gap-px bg-bone-50/[0.06] mt-16 max-w-3xl opacity-0 animate-fadeUp [animation-delay:850ms]">
            <Stat label="Operators Equipped" value="412" sub="2024-2026" />
            <Stat label="Continuous Field Hours" value="2.8M" sub="Logged uptime" />
            <Stat label="Streams Delivered" value="9,471" sub="4K bonded" />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 text-bone-300/70 font-mono text-[0.7rem] tracking-[0.3em] uppercase"
        aria-hidden="true"
      >
        <Crosshair className="w-3.5 h-3.5" />
        Scroll To Engage
      </div>
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-ink-950 p-5">
      <div className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-safety-500 mb-2">
        {label}
      </div>
      <div className="font-display font-bold text-3xl text-bone-50 tabular-nums">{value}</div>
      <div className="text-bone-400 text-xs mt-1 font-mono uppercase tracking-wider">{sub}</div>
    </div>
  );
}
