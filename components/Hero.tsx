'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { ChevronRight, Crosshair } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const TerrainScene = dynamic(() => import('./TerrainScene'), {
  ssr: false,
  loading: () => null,
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (reduced && videoRef.current) {
      videoRef.current.pause();
    }
  }, [reduced]);

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-navy-950">
      {!reduced && !videoFailed && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-intro.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        />
      )}
      {(reduced || videoFailed) && (
        <div className="absolute inset-0">
          <TerrainScene />
        </div>
      )}

      <div
        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="absolute top-32 right-6 md:right-12 hidden md:flex flex-col items-end gap-1 text-right font-mono text-[0.66rem] tracking-[0.3em] uppercase text-ivory-200/60 z-10"
        aria-hidden="true"
      >
        <span>N 34° 11′ 47″</span>
        <span>W 86° 28′ 02″</span>
        <span className="text-red-500">/// CATALOG-07 ///</span>
      </div>

      <div className="container-wt relative z-10 pb-24 pt-40">
        <div className="max-w-4xl space-y-8">
          <motion.span
            className="eyebrow"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            Premium Creator &amp; Outdoor Gear
          </motion.span>

          <motion.h1
            className="display-h1 text-ivory-50"
            initial={reduced ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.35 }}
          >
            Equipping The Wild.
            <span className="block text-red-500">Streaming The Adventure.</span>
          </motion.h1>

          <motion.p
            className="text-ivory-200 text-lg md:text-xl max-w-2xl leading-relaxed"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
          >
            Broadcast cameras, drones, off-grid power, fishing electronics, and field
            audio. Every system serialized before it ships.
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
            <Link href="/products?category=cameras" className="btn btn-outline btn-lg">
              Browse Cameras
            </Link>
          </motion.div>

          <motion.div
            className="hidden md:grid grid-cols-3 gap-px bg-ivory-50/[0.06] mt-16 max-w-3xl"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.9 }}
          >
            <Stat label="Operators Equipped" value="412" sub="2024-2026" />
            <Stat label="Continuous Field Hours" value="2.8M" sub="Logged uptime" />
            <Stat label="Orders Shipped" value="9,471" sub="Worldwide" />
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 text-ivory-200/70 font-mono text-[0.7rem] tracking-[0.3em] uppercase z-10"
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
    <div className="bg-navy-950/80 backdrop-blur-sm p-5">
      <div className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-red-500 mb-2">
        {label}
      </div>
      <div className="font-display font-bold text-3xl text-ivory-50 tabular-nums">{value}</div>
      <div className="text-ivory-200/60 text-xs mt-1 font-mono uppercase tracking-wider">{sub}</div>
    </div>
  );
}
