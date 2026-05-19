import Link from 'next/link';
import { ArrowUpRight, Zap, Satellite, Target } from 'lucide-react';
import { CATEGORIES, productsByCategory } from '@/lib/products';
import { money } from '@/lib/format';

const CATEGORY_VISUAL: Record<string, { icon: typeof Zap; image: string }> = {
  power: {
    icon: Zap,
    image:
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=80',
  },
  broadcast: {
    icon: Satellite,
    image:
      'https://images.unsplash.com/photo-1551503766-ac63dfa6401c?auto=format&fit=crop&w=1400&q=80',
  },
  precision: {
    icon: Target,
    image:
      'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=1400&q=80',
  },
};

export default function CategoryGrid() {
  return (
    <section className="relative py-24 md:py-32 bg-ink-950">
      <div className="container-wt">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="eyebrow mb-4">Inventory Divisions</div>
            <h2 className="display-h2 text-bone-50">The Three Loadouts</h2>
          </div>
          <Link href="/products" className="btn btn-outline">
            View All Systems
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-bone-50/[0.06]">
          {CATEGORIES.map((c, i) => {
            const Visual = CATEGORY_VISUAL[c.id];
            const Icon = Visual.icon;
            const count = productsByCategory(c.id).length;
            const min = Math.min(...productsByCategory(c.id).map((p) => p.price));
            return (
              <Link
                key={c.id}
                href={`/products?category=${c.id}`}
                className="group relative bg-ink-900 overflow-hidden focus-ring"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${Visual.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
                  <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                    <span className="pill text-safety-500 border-safety-500/30">
                      0{i + 1} / Loadout
                    </span>
                    <span className="inline-grid place-items-center w-10 h-10 bg-safety-600 text-ink-950 group-hover:bg-safety-500 transition-colors">
                      <Icon className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="absolute inset-x-5 bottom-5 space-y-3">
                    <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-bone-300">
                      {count} systems · From {money(min)}
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-bone-50 leading-[0.95]">
                      {c.shortName}
                    </h3>
                    <p className="text-bone-200 text-sm leading-relaxed line-clamp-3 max-w-[42ch]">
                      {c.description}
                    </p>
                    <div className="inline-flex items-center gap-2 font-display text-[0.78rem] uppercase tracking-[0.22em] font-semibold text-safety-500 pt-2">
                      Brief Loadout
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
