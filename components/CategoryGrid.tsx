import Link from 'next/link';
import {
  ArrowUpRight,
  Camera,
  Aperture,
  Plane,
  Fish,
  Crosshair,
  Target,
  Tent,
  Headphones,
  BatteryCharging,
  Satellite,
  Sailboat,
  HardDrive,
  Wrench,
  Shirt,
  Sword,
  Flashlight,
  Map,
} from 'lucide-react';
import {
  CATEGORIES,
  populatedCategories,
  productsByCategory,
  type CategoryId,
} from '@/lib/products';
import { money } from '@/lib/format';
import TiltCard from './TiltCard';
import Reveal, { Stagger, StaggerItem } from './Reveal';

const CATEGORY_ICON: Record<CategoryId, typeof Camera> = {
  cameras: Camera,
  'action-cameras': Aperture,
  drones: Plane,
  fishing: Fish,
  bowfishing: Crosshair,
  hunting: Target,
  camping: Tent,
  audio: Headphones,
  power: BatteryCharging,
  connectivity: Satellite,
  kayaks: Sailboat,
  storage: HardDrive,
  mounts: Wrench,
  clothing: Shirt,
  knives: Sword,
  lighting: Flashlight,
  gps: Map,
};

const PILLAR_IMAGE: Partial<Record<CategoryId, string>> = {
  cameras:
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=80',
  drones:
    'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1400&q=80',
  power:
    'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=80',
};

const PILLAR_IDS: CategoryId[] = ['cameras', 'drones', 'power'];

export default function CategoryGrid() {
  const pillars = PILLAR_IDS.map((id) => CATEGORIES.find((c) => c.id === id)!).filter(
    Boolean,
  );
  const rest = populatedCategories().filter((c) => !PILLAR_IDS.includes(c.id));

  return (
    <section className="relative py-24 md:py-32 bg-ivory-50">
      <div className="container-wt">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <div className="eyebrow mb-4">Inventory Divisions</div>
              <h2 className="display-h2 text-navy-900">Pillar Categories</h2>
            </div>
            <Link href="/products" className="btn btn-outline-dark">
              View Every Division
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {pillars.map((c, i) => {
            const Icon = CATEGORY_ICON[c.id];
            const count = productsByCategory(c.id).length;
            const min = Math.min(...productsByCategory(c.id).map((p) => p.price));
            const img = PILLAR_IMAGE[c.id];
            return (
              <StaggerItem key={c.id}>
                <TiltCard maxTiltDeg={6} scale={1.015}>
                  <Link
                    href={`/products?category=${c.id}`}
                    className="group block focus-ring bg-navy-900 border border-navy-900/[0.06] hover:border-red-500/40 overflow-hidden transition-colors"
                  >
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                        style={{ backgroundImage: img ? `url('${img}')` : undefined }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/20" />
                      <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                        <span className="pill-dark border-red-500/40 text-red-400">
                          0{i + 1} / Pillar
                        </span>
                        <span className="inline-grid place-items-center w-10 h-10 bg-red-600 text-ivory-50 group-hover:bg-red-500 transition-colors">
                          <Icon className="w-5 h-5" />
                        </span>
                      </div>
                      <div className="absolute inset-x-5 bottom-5 space-y-3">
                        <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ivory-200">
                          {count} systems · From {money(min)}
                        </div>
                        <h3 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-ivory-50 leading-[0.95]">
                          {c.shortName}
                        </h3>
                        <p className="text-ivory-200 text-sm leading-relaxed line-clamp-3 max-w-[42ch]">
                          {c.description}
                        </p>
                        <div className="inline-flex items-center gap-2 font-display text-[0.78rem] uppercase tracking-[0.22em] font-semibold text-red-400 pt-2">
                          Open Division
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
            <div>
              <div className="eyebrow mb-4">Every Division</div>
              <h3 className="display-h2 text-navy-900">The Full Index</h3>
            </div>
          </div>
        </Reveal>

        <Stagger
          step={0.04}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-navy-900/[0.08] border border-navy-900/[0.08]"
        >
          {rest.map((c) => {
            const Icon = CATEGORY_ICON[c.id];
            const count = productsByCategory(c.id).length;
            const min = count > 0 ? Math.min(...productsByCategory(c.id).map((p) => p.price)) : 0;
            return (
              <StaggerItem key={c.id}>
                <Link
                  href={`/products?category=${c.id}`}
                  className="group block bg-ivory-50 hover:bg-ivory-100 p-6 transition-colors focus-ring h-full"
                >
                  <div className="flex items-start justify-between mb-6">
                    <Icon className="w-6 h-6 text-red-600" />
                    <ArrowUpRight className="w-4 h-4 text-graphite-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-navy-900" />
                  </div>
                  <h4 className="font-display font-bold uppercase tracking-tight text-navy-900 text-base leading-tight mb-2">
                    {c.shortName}
                  </h4>
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-graphite-500">
                    {count} {count === 1 ? 'system' : 'systems'}
                    {count > 0 && <span> · From {money(min)}</span>}
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
