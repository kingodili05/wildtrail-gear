'use client';

import { Plus, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/lib/products';
import { getCategory } from '@/lib/products';
import { money, cn } from '@/lib/format';
import { useCart } from '@/lib/store';
import TiltCard from './TiltCard';

const STOCK_COPY: Record<Product['stock'], { label: string; cls: string }> = {
  in_stock: { label: 'In Vault', cls: 'text-bone-100' },
  low_stock: { label: 'Low Stock', cls: 'text-safety-500' },
  preorder: { label: 'Preorder', cls: 'text-bone-300' },
};

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const add = useCart((s) => s.add);
  const [zoomed, setZoomed] = useState(false);
  const cat = getCategory(product.category);
  const stock = STOCK_COPY[product.stock];

  return (
    <TiltCard maxTiltDeg={5} scale={1.012}>
      <article className="group flex flex-col surface surface-hover h-full">
        <div
          className="relative aspect-[4/5] overflow-hidden bg-ink-800"
          onMouseLeave={() => setZoomed(false)}
        >
          <img
            src={product.image}
            alt={product.imageAlt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out',
              zoomed ? 'scale-125' : 'group-hover:scale-105',
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="pill text-safety-500 border-safety-500/30 bg-ink-950/70">
              {cat.shortName}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className={cn('pill bg-ink-950/70', stock.cls)}>
              <span className="w-1.5 h-1.5 bg-current" />
              {stock.label}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setZoomed((z) => !z);
            }}
            className="absolute bottom-4 right-4 inline-grid place-items-center w-10 h-10 border border-bone-50/20 bg-ink-950/60 backdrop-blur text-bone-50 opacity-0 group-hover:opacity-100 transition-opacity focus-ring"
            aria-label={zoomed ? 'Reset zoom' : 'Zoom image'}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 flex flex-col p-6">
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-bone-300 mb-2">
            SKU {product.id}
          </div>
          <h3 className="display-h3 text-bone-50 mb-3">{product.name}</h3>
          <p className="text-sm text-bone-300 leading-relaxed flex-1">{product.description}</p>

          <ul className="mt-5 space-y-1.5 text-xs text-bone-200">
            {product.highlights.slice(0, 2).map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-safety-500 font-bold">▸</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-5 border-t border-bone-50/[0.06] flex items-end justify-between gap-3">
            <div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-bone-300 mb-1">
                Price
              </div>
              <div className="font-display font-bold text-2xl text-bone-50 tabular-nums">
                {money(product.price)}
              </div>
            </div>
            <button
              type="button"
              onClick={() => add(product.id, 1)}
              disabled={product.stock === 'preorder' && product.unitsLeft === 0}
              className="btn btn-primary btn-sm"
            >
              <Plus className="w-4 h-4" />
              Secure Cart Entry
            </button>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
