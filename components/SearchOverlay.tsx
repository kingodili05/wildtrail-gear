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
      className="fixed inset-0 z-50 bg-navy-950/65 backdrop-blur-md p-4 sm:p-8 flex items-start justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      style={{
        animation: 'wtFadeIn 180ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div
        className="w-full max-w-2xl bg-ivory-50 border border-navy-900/[0.08] shadow-elev mt-12 sm:mt-24"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'wtSearchEnter 220ms cubic-bezier(0.22,1,0.36,1)',
          transformOrigin: 'top center',
        }}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-navy-900/[0.08]">
          <Search className="w-5 h-5 text-red-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search cameras, drones, broadcast rigs…"
            className="flex-1 bg-transparent outline-none text-navy-900 placeholder:text-graphite-400 font-sans"
          />
          <button
            type="button"
            onClick={onClose}
            className="press inline-grid place-items-center w-8 h-8 text-graphite-500 hover:text-navy-900 focus-ring"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-5 py-8 text-center text-graphite-500 text-sm">
              No gear matches that query.
            </div>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.id} className="border-b border-navy-900/[0.06] last:border-b-0">
                  <Link
                    href={`/products?focus=${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-ivory-100 transition-colors"
                  >
                    <span className="font-display text-[0.68rem] tracking-[0.3em] uppercase text-red-600 w-20">
                      {p.category}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display font-bold uppercase tracking-tight text-navy-900">
                        {p.name}
                      </span>
                      <span className="block text-graphite-500 text-sm line-clamp-1">
                        {p.description}
                      </span>
                    </span>
                    <span className="font-display font-bold tabular-nums text-navy-900">
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
