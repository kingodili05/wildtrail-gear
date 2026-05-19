'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Radio, Eye, Maximize2, Volume2, Play } from 'lucide-react';
import { useLive } from '@/lib/store';
import { compact } from '@/lib/format';

function formatElapsed(startedAt: number | null): string {
  if (!startedAt) return '00:00:00';
  const elapsed = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
  const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
  const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
  const s = String(elapsed % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function LiveStreamModule({ embedded = true }: { embedded?: boolean }) {
  const isLive = useLive((s) => s.isLive);
  const viewers = useLive((s) => s.viewers);
  const startedAt = useLive((s) => s.startedAt);
  const toggle = useLive((s) => s.toggle);
  const [elapsed, setElapsed] = useState(formatElapsed(startedAt));

  useEffect(() => {
    if (!isLive) return;
    const t = setInterval(() => setElapsed(formatElapsed(startedAt)), 1000);
    return () => clearInterval(t);
  }, [isLive, startedAt]);

  return (
    <section className={embedded ? 'py-24 md:py-32 bg-ink-900 border-y border-bone-50/[0.06]' : ''}>
      <div className="container-wt">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-px bg-bone-50/[0.06]">
          <div className="relative bg-ink-950 overflow-hidden aspect-video">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1800&q=85')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink-950 via-ink-950/40 to-transparent" />
            <div className="absolute inset-0 grid-bg opacity-30" />

            {isLive ? (
              <>
                <div className="absolute top-5 left-5 flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-safety-600 text-ink-950 font-display font-bold text-[0.7rem] uppercase tracking-[0.22em]">
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inset-0 rounded-full bg-ink-950 animate-pulse" />
                      <span className="relative rounded-full w-2 h-2 bg-ink-950" />
                    </span>
                    Live
                  </span>
                  <span className="pill text-bone-50">
                    <Eye className="w-3 h-3" />
                    {compact(viewers)} watching
                  </span>
                  <span className="pill text-bone-50 hidden sm:inline-flex font-mono tabular-nums">
                    {elapsed}
                  </span>
                </div>
                <div className="absolute bottom-5 right-5 flex gap-2">
                  <button
                    type="button"
                    className="inline-grid place-items-center w-9 h-9 border border-bone-50/20 bg-ink-950/60 backdrop-blur text-bone-50 hover:bg-ink-950 transition-colors focus-ring"
                    aria-label="Sound"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-grid place-items-center w-9 h-9 border border-bone-50/20 bg-ink-950/60 backdrop-blur text-bone-50 hover:bg-ink-950 transition-colors focus-ring"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute inset-0 grid place-items-center">
                  <button
                    type="button"
                    className="group inline-grid place-items-center w-20 h-20 bg-safety-600 text-ink-950 hover:bg-safety-500 transition-colors shadow-elev focus-ring"
                    aria-label="Play live stream"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 grid place-items-center text-center">
                <div className="space-y-3">
                  <div className="pill text-bone-300">
                    <Radio className="w-3 h-3" />
                    Offline
                  </div>
                  <div className="font-display text-xl uppercase tracking-tight text-bone-50">
                    Stream Resumes At Dawn
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="bg-ink-900 p-8 md:p-10 flex flex-col gap-6">
            <div>
              <div className="eyebrow mb-3">Live From The Field</div>
              <h3 className="display-h2 text-bone-50">Basecamp-07 / 4K Bonded Feed</h3>
            </div>
            <p className="text-bone-200 leading-relaxed">
              Streaming natively to the site through the ApexStream Live-Pack Pro. Bonded
              cellular + Starlink uplink, 36 Mbps sustained, sub-second latency. Telemetry
              from the Phantom-Eye thermal drone overlays the feed on the hour.
            </p>
            <dl className="grid grid-cols-2 gap-px bg-bone-50/[0.06] border border-bone-50/[0.06]">
              <Metric label="Uplink" value="Bonded 6×LTE + Sat" />
              <Metric label="Bitrate" value="36 Mbps / AV1" />
              <Metric label="Latency" value="780 ms glass-to-glass" />
              <Metric label="Operator" value="HB-01 / WildTrail" />
            </dl>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/live" className="btn btn-primary">
                Watch Fullscreen
              </Link>
              <button type="button" onClick={toggle} className="btn btn-outline btn-sm">
                {isLive ? 'Mute · Test Offline' : 'Resume Stream'}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ink-900 p-4">
      <dt className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-bone-300 mb-1.5">
        {label}
      </dt>
      <dd className="font-display font-semibold text-bone-50">{value}</dd>
    </div>
  );
}
