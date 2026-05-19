'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingBag, Radio, X } from 'lucide-react';
import { useCart, useLive, computeTotals } from '@/lib/store';
import { cn } from '@/lib/format';
import SearchOverlay from './SearchOverlay';

const NAV_LINKS = [
  { href: '/', label: 'Basecamp' },
  { href: '/products', label: 'The Vault' },
  { href: '/products?category=power', label: 'Power' },
  { href: '/products?category=broadcast', label: 'Broadcast' },
  { href: '/products?category=precision', label: 'Precision' },
  { href: '/live', label: 'Live' },
];

export default function Nav() {
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.openCart);
  const totals = computeTotals(items);
  const isLive = useLive((s) => s.isLive);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out',
          scrolled
            ? 'bg-ink-950/85 backdrop-blur-xl border-b border-bone-50/[0.06]'
            : 'bg-gradient-to-b from-ink-950/60 to-transparent',
        )}
      >
        <div className="container-wt flex items-center justify-between gap-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-ring rounded-sm"
            aria-label="WildTrail Gear home"
          >
            <span className="inline-grid place-items-center w-9 h-9 bg-safety-600 text-ink-950 font-display font-bold text-sm tracking-wider">
              WT
            </span>
            <span className="font-display font-bold tracking-wider uppercase text-bone-50 leading-none">
              WildTrail<span className="text-safety-500">Gear</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="px-3 py-2 font-display text-[0.78rem] uppercase tracking-[0.22em] font-medium text-bone-200 hover:text-bone-50 transition-colors focus-ring"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/live"
              className={cn(
                'hidden sm:inline-flex items-center gap-2 px-3 py-2 border font-display text-[0.7rem] uppercase tracking-[0.22em] font-semibold transition-colors focus-ring',
                isLive
                  ? 'border-safety-500 text-safety-500 hover:bg-safety-500/10'
                  : 'border-bone-50/15 text-bone-300',
              )}
              aria-label={isLive ? 'Live stream active' : 'Live stream offline'}
            >
              <Radio className="w-3.5 h-3.5" />
              {isLive ? (
                <>
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-safety-500 animate-pulse" />
                    <span className="relative rounded-full w-2 h-2 bg-safety-500" />
                  </span>
                  Live
                </>
              ) : (
                'Offline'
              )}
            </Link>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-grid place-items-center w-10 h-10 border border-bone-50/10 text-bone-200 hover:text-bone-50 hover:border-bone-50/30 transition-colors focus-ring"
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex items-center gap-2 px-3 py-2 border border-bone-50/10 text-bone-200 hover:text-bone-50 hover:border-bone-50/30 transition-colors focus-ring"
              aria-label={`Open cart, ${totals.itemsCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-display text-[0.74rem] uppercase tracking-[0.2em] font-semibold">
                Cart
              </span>
              <span
                className={cn(
                  'inline-grid place-items-center min-w-[20px] h-5 px-1 text-[0.66rem] font-bold leading-none',
                  totals.itemsCount > 0
                    ? 'bg-safety-600 text-ink-950'
                    : 'bg-ink-700 text-bone-300',
                )}
              >
                {totals.itemsCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden inline-grid place-items-center w-10 h-10 border border-bone-50/10 text-bone-50 focus-ring"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-ink-950 lg:hidden flex flex-col">
          <div className="container-wt flex items-center justify-between py-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5"
            >
              <span className="inline-grid place-items-center w-9 h-9 bg-safety-600 text-ink-950 font-display font-bold text-sm tracking-wider">
                WT
              </span>
              <span className="font-display font-bold tracking-wider uppercase text-bone-50">
                WildTrail<span className="text-safety-500">Gear</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-grid place-items-center w-10 h-10 border border-bone-50/10 text-bone-50 focus-ring"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="container-wt flex-1 flex flex-col gap-1 pt-8" aria-label="Mobile primary">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 border-b border-bone-50/[0.06] font-display text-2xl uppercase tracking-tight font-bold text-bone-50 hover:text-safety-500 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="container-wt pb-10">
            <Link
              href="/products"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary btn-lg w-full"
            >
              Enter The Vault
            </Link>
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
