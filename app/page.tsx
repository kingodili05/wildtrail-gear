import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
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

      <section className="py-24 md:py-32 bg-ivory-100">
        <div className="container-wt">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <div className="eyebrow mb-4">Flagship Systems</div>
              <h2 className="display-h2 text-navy-900">The Top Of The Catalog</h2>
              <p className="text-graphite-500 mt-4 max-w-[60ch]">
                Highest-value systems first. We serialize and field-test each unit
                before it ships.
              </p>
            </div>
            <Link href="/products" className="btn btn-outline-dark">
              All Systems
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

      <section className="relative py-24 md:py-32 bg-navy-950 text-ivory-50 border-t border-ivory-50/[0.06]">
        <div className="absolute inset-0 grid-bg-dark opacity-30 pointer-events-none" />
        <div className="container-wt relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow mb-4">Operator Promise</div>
              <h2 className="display-h2 text-ivory-50">
                Field-Tested. Logged.
                <br />
                <span className="text-red-500">Documented.</span>
              </h2>
              <p className="text-ivory-200 mt-5 max-w-[52ch] leading-relaxed">
                We test every system in the field before listing it. Each unit carries
                its own telemetry log. The log of the exact unit you receive ships in
                the box.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="btn btn-primary btn-lg">
                  Begin Outfitting
                </Link>
                <Link href="/products?category=cameras" className="btn btn-outline btn-lg">
                  Browse Cameras
                </Link>
              </div>
            </div>

            <ol className="space-y-px bg-ivory-50/[0.06] border border-ivory-50/[0.06]">
              {[
                {
                  step: '01',
                  title: 'Reserve A Unit',
                  desc: 'You pick the kit. We reserve a serialized unit against your order.',
                },
                {
                  step: '02',
                  title: 'Bench + Field Trial',
                  desc: 'Every unit runs a 96-hour bench burn, then a 7-day field deployment.',
                },
                {
                  step: '03',
                  title: 'Sealed To You',
                  desc: 'We apply a tamper-evident seal paired to your operator key.',
                },
                {
                  step: '04',
                  title: 'Insured Shipment',
                  desc: 'Door-to-door insurance up to $25K. GPS-locked transit.',
                },
              ].map((s) => (
                <li key={s.step} className="grid grid-cols-[80px,1fr] gap-6 bg-navy-950 px-6 py-5">
                  <span className="font-display font-bold text-3xl text-red-500 tabular-nums">
                    {s.step}
                  </span>
                  <div>
                    <div className="font-display font-bold uppercase tracking-tight text-ivory-50">
                      {s.title}
                    </div>
                    <div className="text-ivory-200/70 text-sm mt-1">{s.desc}</div>
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
