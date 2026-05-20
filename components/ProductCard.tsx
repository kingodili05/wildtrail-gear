'use client';

import { Plus, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/lib/products';
import { getCategory } from '@/lib/products';
import { money, cn } from '@/lib/format';
import { useCart } from '@/lib/store';
import TiltCard from './TiltCard';

const STOCK_COPY: Record<Product['stock'], { label: string; cls: string }> = {
  in_stock: { label: 'In Stock', cls: 'text-navy-900' },
  low_stock: { label: 'Low Stock', cls: 'text-red-600' },
  preorder: { label: 'Preorder', cls: 'text-graphite-500' },
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
  const onSale = !!product.origPrice && product.origPrice > product.price;

  return (
    <TiltCard maxTiltDeg={4} scale={1.01}>
      <article className="group flex flex-col bg-ivory-50 border border-navy-900/[0.08] hover:border-navy-900/30 shadow-card transition-colors h-full">
        <div
          className="relative aspect-[4/5] overflow-hidden bg-navy-950"
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
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="pill bg-ivory-50/95 border-navy-900/15 text-navy-900">
              {cat.shortName}
            </span>
          </div>
          <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
            {onSale && (
              <span className="pill-red">
                Sale
              </span>
            )}
            <span className={cn('pill bg-ivory-50/95 border-navy-900/15', stock.cls)}>
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
            className="absolute bottom-4 right-4 inline-grid place-items-center w-10 h-10 border border-ivory-50/60 bg-navy-950/70 backdrop-blur text-ivory-50 opacity-0 group-hover:opacity-100 transition-opacity focus-ring"
            aria-label={zoomed ? 'Reset zoom' : 'Zoom image'}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 flex flex-col p-6">
          <div className="flex items-center justify-between gap-3 mb-2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-graphite-500">
            <span>SKU {product.sku ?? product.id}</span>
            {product.mfr && <span className="text-graphite-400">MFR · {product.mfr}</span>}
          </div>
          <h3 className="display-h3 text-navy-900 mb-3">{product.name}</h3>
          <p className="text-sm text-graphite-500 leading-relaxed flex-1">{product.description}</p>

          <ul className="mt-5 space-y-1.5 text-xs text-graphite-700">
            {product.highlights.slice(0, 2).map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-red-600 font-bold">▸</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-5 border-t border-navy-900/[0.08] flex items-end justify-between gap-3">
            <div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-graphite-500 mb-1">
                {onSale ? 'Sale Price' : 'Price'}
              </div>
              <div className="flex items-baseline gap-2">
                <div
                  className={cn(
                    'font-display font-bold text-2xl tabular-nums',
                    onSale ? 'text-red-600' : 'text-navy-900',
                  )}
                >
                  {money(product.price)}
                </div>
                {onSale && (
                  <div className="font-display font-medium text-sm text-graphite-400 tabular-nums line-through">
                    {money(product.origPrice!)}
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => add(product.id, 1)}
              className="btn btn-primary btn-sm"
            >
              <Plus className="w-4 h-4" />
              Add To Cart
            </button>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
