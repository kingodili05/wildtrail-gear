'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Minus, Plus, ShieldCheck, ShoppingBag, Truck, X } from 'lucide-react';
import { useCart, computeTotals } from '@/lib/store';
import { money } from '@/lib/format';

export default function CartDrawer() {
  const router = useRouter();
  const open = useCart((s) => s.open);
  const closeCart = useCart((s) => s.closeCart);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const items = useCart((s) => s.items);
  const hydrated = useCart((s) => s.hydrated);
  const totals = computeTotals(items);

  function goToCheckout() {
    closeCart();
    router.push('/checkout');
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeCart]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-navy-950/55 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 bottom-0 z-[61] w-full max-w-md bg-ivory-50 border-l border-navy-900/[0.08] shadow-elev flex flex-col transition-transform duration-400 ease-drawer ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Secure cart"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-navy-900/[0.08] bg-navy-950 text-ivory-50">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-red-500" />
            <h2 className="font-display font-bold uppercase tracking-[0.22em]">
              Secure Cart
            </h2>
            <span className="pill-dark border-ivory-50/15">{totals.itemsCount} items</span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="inline-grid place-items-center w-9 h-9 border border-ivory-50/15 text-ivory-50 hover:border-ivory-50/40 focus-ring"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {!hydrated ? (
            <CartSkeleton />
          ) : totals.lines.length === 0 ? (
            <EmptyState />
          ) : (
            <ul>
              {totals.lines.map((l) => (
                <li
                  key={l.productId}
                  className="grid grid-cols-[88px,1fr,auto] gap-4 px-6 py-5 border-b border-navy-900/[0.08]"
                >
                  <div className="relative w-22 h-22 aspect-square overflow-hidden bg-navy-950">
                    <img
                      src={l.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold uppercase tracking-tight text-navy-900 leading-snug line-clamp-2">
                      {l.name}
                    </div>
                    <div className="text-xs text-graphite-500 mt-1 tabular-nums">
                      {money(l.unitPrice)} each
                    </div>
                    <div className="mt-3 inline-flex items-center gap-px bg-navy-900/[0.08] border border-navy-900/[0.12]">
                      <button
                        type="button"
                        onClick={() => setQty(l.productId, l.qty - 1)}
                        className="inline-grid place-items-center w-8 h-8 bg-ivory-50 hover:bg-ivory-100 text-navy-900 focus-ring"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="inline-grid place-items-center min-w-[36px] h-8 bg-ivory-50 font-display font-bold text-navy-900 tabular-nums">
                        {l.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(l.productId, l.qty + 1)}
                        className="inline-grid place-items-center w-8 h-8 bg-ivory-50 hover:bg-ivory-100 text-navy-900 focus-ring"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => remove(l.productId)}
                      className="text-graphite-400 hover:text-red-600 text-xs uppercase tracking-[0.2em] font-display font-semibold focus-ring"
                    >
                      Remove
                    </button>
                    <div className="font-display font-bold text-navy-900 tabular-nums">
                      {money(l.subtotal)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {hydrated && totals.lines.length > 0 && (
          <footer className="border-t border-navy-900/[0.08] bg-ivory-100 px-6 py-6 space-y-5">
            {totals.freeShippingRemaining > 0 ? (
              <div className="px-4 py-3 bg-ivory-50 border border-navy-900/[0.08] text-sm text-graphite-700 flex items-center gap-3">
                <Truck className="w-4 h-4 text-red-600 flex-shrink-0" />
                Spend{' '}
                <span className="font-display font-bold text-red-600 tabular-nums">
                  {money(totals.freeShippingRemaining)}
                </span>{' '}
                more for complimentary expedition shipping.
              </div>
            ) : (
              <div className="px-4 py-3 bg-ivory-50 border border-navy-900/[0.08] text-sm text-navy-900 flex items-center gap-3">
                <Truck className="w-4 h-4 text-red-600 flex-shrink-0" />
                Complimentary expedition shipping applied.
              </div>
            )}

            <dl className="space-y-2 text-sm">
              <Row label="Subtotal" value={money(totals.subtotal)} />
              <Row label="Tax (8.5%)" value={money(totals.tax)} />
              <Row
                label="Shipping"
                value={totals.shipping === 0 ? 'Included' : money(totals.shipping)}
              />
              {totals.protection > 0 && (
                <Row
                  label="High-Ticket Protection"
                  value={money(totals.protection)}
                  hint={
                    <span className="inline-flex items-center gap-1 text-graphite-500 text-xs">
                      <ShieldCheck className="w-3 h-3 text-red-600" />
                      Required for orders containing items over $2,000
                    </span>
                  }
                />
              )}
            </dl>

            <div className="flex items-end justify-between pt-4 border-t border-navy-900/[0.08]">
              <div className="font-display text-[0.72rem] uppercase tracking-[0.3em] text-graphite-500">
                Total
              </div>
              <div className="font-display font-bold text-3xl text-navy-900 tabular-nums">
                {money(totals.total)}
              </div>
            </div>

            <button
              type="button"
              onClick={goToCheckout}
              className="btn btn-primary btn-lg w-full"
            >
              Initiate Secure Checkout
            </button>
            <div className="flex justify-between text-xs">
              <button
                type="button"
                onClick={closeCart}
                className="hover:text-navy-900 text-graphite-500 transition-colors font-display uppercase tracking-[0.2em]"
              >
                Continue Outfitting
              </button>
              <button
                type="button"
                onClick={clear}
                className="hover:text-red-600 text-graphite-500 transition-colors font-display uppercase tracking-[0.2em]"
              >
                Clear Cart
              </button>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}

function Row({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-baseline gap-4">
      <div>
        <dt className="text-graphite-700">{label}</dt>
        {hint && <div className="mt-0.5">{hint}</div>}
      </div>
      <dd className="font-display font-semibold tabular-nums text-navy-900">{value}</dd>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-16 text-center space-y-4">
      <div className="inline-grid place-items-center w-16 h-16 border border-navy-900/[0.15] text-graphite-500 mx-auto">
        <ShoppingBag className="w-6 h-6" />
      </div>
      <h3 className="font-display font-bold uppercase tracking-tight text-navy-900">
        The Cart Is Empty
      </h3>
      <p className="text-graphite-500 text-sm max-w-[36ch] mx-auto">
        Pick something from the catalog.
      </p>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="px-6 py-8 space-y-4">
      {[0, 1].map((i) => (
        <div key={i} className="h-22 bg-ivory-100 animate-pulse" />
      ))}
    </div>
  );
}
