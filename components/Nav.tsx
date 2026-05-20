'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useCart, computeTotals } from '@/lib/store';
import { cn } from '@/lib/format';
import SearchOverlay from './SearchOverlay';

const NAV_LINKS = [
  { href: '/', label: 'Basecamp' },
  { href: '/products', label: 'The Vault' },
  { href: '/products?category=cameras', label: 'Cameras' },
  { href: '/products?category=drones', label: 'Drones' },
  { href: '/products?category=fishing', label: 'Fishing' },
  { href: '/products?category=hunting', label: 'Hunting' },
];

export default function Nav() {
  return (
    <Suspense fallback={null}>
      <NavInner />
    </Suspense>
  );
}

function NavInner() {
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.openCart);
  const totals = computeTotals(items);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const prevCount = useRef(totals.itemsCount);

  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/products?category=')) {
      const cat = href.split('=')[1];
      return pathname === '/products' && activeCategory === cat;
    }
    if (href === '/products') {
      return pathname === '/products' && !activeCategory;
    }
    return pathname === href;
  }

  useEffect(() => {
    if (totals.itemsCount > prevCount.current && badgeRef.current) {
      badgeRef.current.classList.remove('wt-pill-bump');
      // force reflow so animation restarts
      void badgeRef.current.offsetWidth;
      badgeRef.current.classList.add('wt-pill-bump');
    }
    prevCount.current = totals.itemsCount;
  }, [totals.itemsCount]);

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

  const onDark = !scrolled;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40',
          onDark
            ? 'bg-gradient-to-b from-navy-950/80 to-transparent'
            : 'bg-ivory-50/95 backdrop-blur-xl border-b border-navy-900/[0.08] shadow-card',
        )}
        style={{
          transition:
            'background-color 280ms cubic-bezier(0.22,1,0.36,1), border-color 280ms cubic-bezier(0.22,1,0.36,1), box-shadow 280ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="container-wt flex items-center justify-between gap-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-ring rounded-sm"
            aria-label="WildTrail Gear home"
          >
            <span className="inline-grid place-items-center w-9 h-9 bg-red-600 text-ivory-50 font-display font-bold text-sm tracking-wider">
              WT
            </span>
            <span
              className={cn(
                'font-display font-bold tracking-wider uppercase leading-none transition-colors',
                onDark ? 'text-ivory-50' : 'text-navy-900',
              )}
            >
              WildTrail<span className="text-red-600">Gear</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative px-3 py-2 font-display text-[0.78rem] uppercase tracking-[0.22em] font-medium transition-colors focus-ring',
                    active
                      ? onDark
                        ? 'text-ivory-50'
                        : 'text-navy-900'
                      : onDark
                      ? 'text-ivory-200 hover:text-ivory-50'
                      : 'text-graphite-700 hover:text-navy-900',
                  )}
                >
                  {l.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute left-3 right-3 -bottom-px h-px bg-red-500"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={cn(
                'press inline-grid place-items-center w-10 h-10 border focus-ring',
                onDark
                  ? 'border-ivory-50/15 text-ivory-200 hover:text-ivory-50 hover:border-ivory-50/40'
                  : 'border-navy-900/15 text-graphite-700 hover:text-navy-900 hover:border-navy-900/40',
              )}
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className={cn(
                'press relative inline-flex items-center gap-2 px-3 py-2 border focus-ring',
                onDark
                  ? 'border-ivory-50/15 text-ivory-200 hover:text-ivory-50 hover:border-ivory-50/40'
                  : 'border-navy-900/15 text-graphite-700 hover:text-navy-900 hover:border-navy-900/40',
              )}
              aria-label={`Open cart, ${totals.itemsCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-display text-[0.74rem] uppercase tracking-[0.2em] font-semibold">
                Cart
              </span>
              <span
                ref={badgeRef}
                className={cn(
                  'inline-grid place-items-center min-w-[20px] h-5 px-1 text-[0.66rem] font-bold leading-none',
                  totals.itemsCount > 0
                    ? 'bg-red-600 text-ivory-50'
                    : onDark
                    ? 'bg-navy-700 text-ivory-200'
                    : 'bg-ivory-200 text-graphite-700',
                )}
              >
                {totals.itemsCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={cn(
                'press lg:hidden inline-grid place-items-center w-10 h-10 border focus-ring',
                onDark
                  ? 'border-ivory-50/15 text-ivory-50'
                  : 'border-navy-900/15 text-navy-900',
              )}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950 lg:hidden flex flex-col">
          <div className="container-wt flex items-center justify-between py-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5"
            >
              <span className="inline-grid place-items-center w-9 h-9 bg-red-600 text-ivory-50 font-display font-bold text-sm tracking-wider">
                WT
              </span>
              <span className="font-display font-bold tracking-wider uppercase text-ivory-50">
                WildTrail<span className="text-red-500">Gear</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="press inline-grid place-items-center w-10 h-10 border border-ivory-50/15 text-ivory-50 focus-ring"
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
                className="py-4 border-b border-ivory-50/[0.08] font-display text-2xl uppercase tracking-tight font-bold text-ivory-50 hover:text-red-500 transition-colors"
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
