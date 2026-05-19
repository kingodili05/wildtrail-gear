'use client';

import { useMemo, useState } from 'react';
import { Filter, SortDesc } from 'lucide-react';
import { PRODUCTS, CATEGORIES, type CategoryId, type Product } from '@/lib/products';
import ProductCard from './ProductCard';
import { cn } from '@/lib/format';

type CategoryFilter = CategoryId | 'all';
type StockFilter = 'all' | 'available' | 'low_stock' | 'preorder';
type SortKey = 'price_desc' | 'price_asc' | 'name_asc' | 'stock_first';

const SORT_LABEL: Record<SortKey, string> = {
  price_desc: 'Price · High → Low',
  price_asc: 'Price · Low → High',
  name_asc: 'Name · A → Z',
  stock_first: 'In Vault First',
};

const STOCK_LABEL: Record<StockFilter, string> = {
  all: 'All Inventory',
  available: 'Available Now',
  low_stock: 'Low Stock',
  preorder: 'Preorder',
};

export default function ProductGrid({
  initialCategory = 'all',
  focusSlug,
}: {
  initialCategory?: CategoryFilter;
  focusSlug?: string;
}) {
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [stock, setStock] = useState<StockFilter>('all');
  const [sort, setSort] = useState<SortKey>('price_desc');

  const filtered = useMemo<Product[]>(() => {
    let list = [...PRODUCTS];
    if (category !== 'all') list = list.filter((p) => p.category === category);
    if (stock === 'available') list = list.filter((p) => p.stock === 'in_stock');
    if (stock === 'low_stock') list = list.filter((p) => p.stock === 'low_stock');
    if (stock === 'preorder') list = list.filter((p) => p.stock === 'preorder');

    switch (sort) {
      case 'price_desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'price_asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'name_asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'stock_first':
        list.sort((a, b) => stockRank(a.stock) - stockRank(b.stock));
        break;
    }

    if (focusSlug) {
      const idx = list.findIndex((p) => p.slug === focusSlug);
      if (idx > 0) {
        const [hit] = list.splice(idx, 1);
        list.unshift(hit);
      }
    }
    return list;
  }, [category, stock, sort, focusSlug]);

  return (
    <div className="space-y-10">
      <div className="surface flex flex-col lg:flex-row lg:items-center gap-px bg-bone-50/[0.06]">
        <div className="flex flex-1 items-center gap-3 px-5 py-4 bg-ink-900">
          <Filter className="w-4 h-4 text-safety-500 flex-shrink-0" />
          <span className="font-display text-[0.7rem] tracking-[0.3em] uppercase text-bone-300">
            Category
          </span>
          <div className="flex flex-wrap gap-1.5">
            <FilterPill active={category === 'all'} onClick={() => setCategory('all')}>
              All
            </FilterPill>
            {CATEGORIES.map((c) => (
              <FilterPill
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                {c.shortName}
              </FilterPill>
            ))}
          </div>
        </div>

        <div className="flex flex-1 items-center gap-3 px-5 py-4 bg-ink-900">
          <span className="font-display text-[0.7rem] tracking-[0.3em] uppercase text-bone-300">
            Status
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(STOCK_LABEL) as StockFilter[]).map((s) => (
              <FilterPill key={s} active={stock === s} onClick={() => setStock(s)}>
                {STOCK_LABEL[s]}
              </FilterPill>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4 bg-ink-900">
          <SortDesc className="w-4 h-4 text-safety-500" />
          <label className="font-display text-[0.7rem] tracking-[0.3em] uppercase text-bone-300">
            Sort
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-ink-800 border border-bone-50/10 text-bone-50 font-display text-[0.78rem] uppercase tracking-[0.18em] font-medium px-3 py-2 focus-ring"
          >
            {(Object.keys(SORT_LABEL) as SortKey[]).map((s) => (
              <option key={s} value={s}>
                {SORT_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-bone-300">
          Showing <span className="text-bone-50 font-bold">{filtered.length}</span> of{' '}
          {PRODUCTS.length} systems
        </div>
        {focusSlug && (
          <div className="pill text-safety-500 border-safety-500/30">
            Search Focus · {focusSlug}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="surface p-16 text-center">
          <div className="font-display text-2xl uppercase tracking-tight text-bone-50 mb-2">
            Vault Empty For That Filter
          </div>
          <p className="text-bone-300">Clear a filter to see more systems.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 border font-display text-[0.7rem] uppercase tracking-[0.2em] font-semibold transition-colors focus-ring',
        active
          ? 'bg-safety-600 border-safety-600 text-ink-950'
          : 'border-bone-50/10 text-bone-200 hover:border-bone-50/30 hover:text-bone-50',
      )}
    >
      {children}
    </button>
  );
}

function stockRank(s: Product['stock']): number {
  if (s === 'in_stock') return 0;
  if (s === 'low_stock') return 1;
  return 2;
}
