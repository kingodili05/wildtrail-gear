import type { Metadata } from 'next';
import LiveStreamModule from '@/components/LiveStreamModule';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Radio, Compass, Thermometer, Wind } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Live Field Stream',
  description:
    'Watch the WildTrail live field stream — 4K bonded uplink from active base camps and expedition sites.',
};

const ENV = [
  { icon: Thermometer, label: 'Temp', value: '38°F · falling' },
  { icon: Wind, label: 'Wind', value: 'NW 14 mph · gusts 22' },
  { icon: Compass, label: 'Heading', value: '184° SSW' },
  { icon: Radio, label: 'Uplink', value: 'Bonded · 36 Mbps' },
];

export default function LivePage() {
  const featured = PRODUCTS.filter((p) => p.category === 'broadcast');

  return (
    <>
      <section className="bg-ink-950 border-b border-bone-50/[0.06]">
        <div className="container-wt py-16 md:py-20">
          <div className="eyebrow mb-4">Live Operator Feed</div>
          <h1 className="display-h1 text-bone-50 max-w-4xl">
            Basecamp-07 · <span className="text-safety-500">Live Now</span>
          </h1>
          <p className="text-bone-200 mt-6 max-w-[60ch] text-lg leading-relaxed">
            Continuous 4K bonded feed from the field. Telemetry overlays cycle every 60
            seconds. Latency under one second from glass to glass.
          </p>
        </div>
      </section>

      <LiveStreamModule embedded={false} />

      <section className="bg-ink-950 py-16">
        <div className="container-wt">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-bone-50/[0.06] border border-bone-50/[0.06]">
            {ENV.map((e) => (
              <div key={e.label} className="bg-ink-900 px-5 py-6">
                <div className="flex items-center gap-2 text-safety-500">
                  <e.icon className="w-4 h-4" />
                  <span className="font-display text-[0.66rem] uppercase tracking-[0.3em] font-medium">
                    {e.label}
                  </span>
                </div>
                <div className="font-display font-semibold text-bone-50 text-lg mt-3 tabular-nums">
                  {e.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-900 py-24 border-t border-bone-50/[0.06]">
        <div className="container-wt">
          <div className="mb-12">
            <div className="eyebrow mb-4">Stream Stack</div>
            <h2 className="display-h2 text-bone-50">
              The Gear Running This Feed
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
