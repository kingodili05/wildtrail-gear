import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import LiveStreamModule from '@/components/LiveStreamModule';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import { ArrowUpRight } from 'lucide-react';

export default function HomePage() {
  const featured = [...PRODUCTS].sort((a, b) => b.price - a.price).slice(0, 3);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <LiveStreamModule />

      <section className="py-24 md:py-32 bg-ink-950">
        <div className="container-wt">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <div className="eyebrow mb-4">Flagship Systems</div>
              <h2 className="display-h2 text-bone-50">The Top Of The Vault</h2>
              <p className="text-bone-300 mt-4 max-w-[60ch]">
                The three highest-value systems on the platform. Hand-tuned, individually
                serialized, and field-validated before shipment.
              </p>
            </div>
            <Link href="/products" className="btn btn-outline">
              All 7 Systems
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-ink-900 border-t border-bone-50/[0.06]">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="container-wt relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow mb-4">Operator Promise</div>
              <h2 className="display-h2 text-bone-50">
                Field-Tested. Logged.
                <br />
                <span className="text-safety-500">Documented.</span>
              </h2>
              <p className="text-bone-200 mt-5 max-w-[52ch] leading-relaxed">
                Every system on this site has been deployed in the field — not in a lab —
                before listing. Telemetry from each deployment is logged and reviewed.
                Every order ships with the operator log of the unit you receive.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="btn btn-primary btn-lg">
                  Begin Outfitting
                </Link>
                <Link href="/live" className="btn btn-outline btn-lg">
                  Watch Field Trials
                </Link>
              </div>
            </div>

            <ol className="space-y-px bg-bone-50/[0.06] border border-bone-50/[0.06]">
              {[
                {
                  step: '01',
                  title: 'Field Acquisition',
                  desc: 'Operators select kit and serial-locked uplinks reserve units.',
                },
                {
                  step: '02',
                  title: 'Bench + Field Trial',
                  desc: 'Each unit passes a 96-hour bench burn and a 7-day field deployment.',
                },
                {
                  step: '03',
                  title: 'Cryptographic Seal',
                  desc: 'Tamper-evident seal applied, paired to your operator key.',
                },
                {
                  step: '04',
                  title: 'Insured Expedition Ship',
                  desc: 'Door-to-door insurance up to $25K, GPS-locked transit.',
                },
              ].map((s) => (
                <li key={s.step} className="grid grid-cols-[80px,1fr] gap-6 bg-ink-900 px-6 py-5">
                  <span className="font-display font-bold text-3xl text-safety-500 tabular-nums">
                    {s.step}
                  </span>
                  <div>
                    <div className="font-display font-bold uppercase tracking-tight text-bone-50">
                      {s.title}
                    </div>
                    <div className="text-bone-300 text-sm mt-1">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
