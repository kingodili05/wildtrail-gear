'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { money } from '@/lib/format';

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PRODUCTS.slice(0, 5);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.category.includes(s),
    ).slice(0, 8);
  }, [q]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-ink-950/85 backdrop-blur-md p-4 sm:p-8 flex items-start justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      <div
        className="w-full max-w-2xl bg-ink-900 border border-bone-50/10 shadow-elev mt-12 sm:mt-24"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-bone-50/10">
          <Search className="w-5 h-5 text-safety-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search inverters, drones, broadcast rigs…"
            className="flex-1 bg-transparent outline-none text-bone-50 placeholder:text-bone-300 font-sans"
          />
          <button
            type="button"
            onClick={onClose}
            className="inline-grid place-items-center w-8 h-8 text-bone-300 hover:text-bone-50 focus-ring"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-5 py-8 text-center text-bone-300 text-sm">
              No gear matches that query.
            </div>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.id} className="border-b border-bone-50/[0.06] last:border-b-0">
                  <Link
                    href={`/products?focus=${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-ink-800 transition-colors"
                  >
                    <span className="font-display text-[0.68rem] tracking-[0.3em] uppercase text-safety-500 w-20">
                      {p.category}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display font-bold uppercase tracking-tight text-bone-50">
                        {p.name}
                      </span>
                      <span className="block text-bone-300 text-sm line-clamp-1">
                        {p.description}
                      </span>
                    </span>
                    <span className="font-display font-bold tabular-nums text-bone-50">
                      {money(p.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
