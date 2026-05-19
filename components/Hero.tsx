'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ChevronRight, Radio, Crosshair } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const TerrainScene = dynamic(() => import('./TerrainScene'), {
  ssr: false,
  loading: () => null,
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-ink-950">
      <div className="absolute inset-0">{!reduced && <TerrainScene />}</div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/85 to-ink-950/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 grid-bg opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="absolute top-32 right-6 md:right-12 hidden md:flex flex-col items-end gap-1 text-right font-mono text-[0.66rem] tracking-[0.3em] uppercase text-bone-300/60 z-10"
        aria-hidden="true"
      >
        <span>N 34° 11′ 47″</span>
        <span>W 86° 28′ 02″</span>
        <span className="text-safety-500">/// BASECAMP-07 ///</span>
      </div>

      <div className="container-wt relative z-10 pb-24 pt-40">
        <div className="max-w-4xl space-y-8">
          <motion.span
            className="eyebrow"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            Luxury Tactical Expedition Outfitter
          </motion.span>

          <motion.h1
            className="display-h1 text-bone-50"
            initial={reduced ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.35 }}
          >
            Equipping The Wild.
            <span className="block text-safety-500">Streaming The Adventure.</span>
          </motion.h1>

          <motion.p
            className="text-bone-200 text-lg md:text-xl max-w-2xl leading-relaxed"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
          >
            Hand-built power, broadcast, and precision systems for operators who run remote
            base camps, command thermal drones, and stream 4K from places without roads.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.7 }}
          >
            <Link href="/products" className="btn btn-primary btn-lg">
              Enter The Vault
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/live" className="btn btn-outline btn-lg">
              <Radio className="w-4 h-4" />
              Watch Live Now
            </Link>
          </motion.div>

          <motion.div
            className="hidden md:grid grid-cols-3 gap-px bg-bone-50/[0.06] mt-16 max-w-3xl"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.9 }}
          >
            <Stat label="Operators Equipped" value="412" sub="2024-2026" />
            <Stat label="Continuous Field Hours" value="2.8M" sub="Logged uptime" />
            <Stat label="Streams Delivered" value="9,471" sub="4K bonded" />
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 text-bone-300/70 font-mono text-[0.7rem] tracking-[0.3em] uppercase z-10"
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
    <div className="bg-ink-950/80 backdrop-blur-sm p-5">
      <div className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-safety-500 mb-2">
        {label}
      </div>
      <div className="font-display font-bold text-3xl text-bone-50 tabular-nums">{value}</div>
      <div className="text-bone-400 text-xs mt-1 font-mono uppercase tracking-wider">{sub}</div>
    </div>
  );
}
