'use client';

import { useEffect } from 'react';
import { Minus, Plus, ShieldCheck, ShoppingBag, Truck, X } from 'lucide-react';
import { useCart, computeTotals } from '@/lib/store';
import { money } from '@/lib/format';

export default function CartDrawer() {
  const open = useCart((s) => s.open);
  const closeCart = useCart((s) => s.closeCart);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const items = useCart((s) => s.items);
  const hydrated = useCart((s) => s.hydrated);
  const totals = computeTotals(items);

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
        className={`fixed inset-0 z-[60] bg-ink-950/70 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 bottom-0 z-[61] w-full max-w-md bg-ink-950 border-l border-bone-50/10 shadow-elev flex flex-col transition-transform duration-400 ease-drawer ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Secure cart"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-bone-50/[0.06]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-safety-500" />
            <h2 className="font-display font-bold uppercase tracking-[0.22em] text-bone-50">
              Secure Cart
            </h2>
            <span className="pill text-bone-50">{totals.itemsCount} items</span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="inline-grid place-items-center w-9 h-9 border border-bone-50/10 text-bone-50 hover:border-bone-50/30 focus-ring"
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
                  className="grid grid-cols-[88px,1fr,auto] gap-4 px-6 py-5 border-b border-bone-50/[0.06]"
                >
                  <div className="relative w-22 h-22 aspect-square overflow-hidden bg-ink-800">
                    <img
                      src={l.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold uppercase tracking-tight text-bone-50 leading-snug line-clamp-2">
                      {l.name}
                    </div>
                    <div className="text-xs text-bone-300 mt-1 tabular-nums">
                      {money(l.unitPrice)} each
                    </div>
                    <div className="mt-3 inline-flex items-center gap-px bg-bone-50/[0.06] border border-bone-50/10">
                      <button
                        type="button"
                        onClick={() => setQty(l.productId, l.qty - 1)}
                        className="inline-grid place-items-center w-8 h-8 bg-ink-900 hover:bg-ink-800 text-bone-50 focus-ring"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="inline-grid place-items-center min-w-[36px] h-8 bg-ink-900 font-display font-bold text-bone-50 tabular-nums">
                        {l.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(l.productId, l.qty + 1)}
                        className="inline-grid place-items-center w-8 h-8 bg-ink-900 hover:bg-ink-800 text-bone-50 focus-ring"
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
                      className="text-bone-400 hover:text-safety-500 text-xs uppercase tracking-[0.2em] font-display font-semibold focus-ring"
                    >
                      Remove
                    </button>
                    <div className="font-display font-bold text-bone-50 tabular-nums">
                      {money(l.subtotal)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {hydrated && totals.lines.length > 0 && (
          <footer className="border-t border-bone-50/[0.06] bg-ink-900 px-6 py-6 space-y-5">
            {totals.freeShippingRemaining > 0 ? (
              <div className="px-4 py-3 bg-ink-800 text-sm text-bone-200 flex items-center gap-3">
                <Truck className="w-4 h-4 text-safety-500 flex-shrink-0" />
                Spend{' '}
                <span className="font-display font-bold text-safety-500 tabular-nums">
                  {money(totals.freeShippingRemaining)}
                </span>{' '}
                more for complimentary expedition shipping.
              </div>
            ) : (
              <div className="px-4 py-3 bg-ink-800 text-sm text-bone-100 flex items-center gap-3">
                <Truck className="w-4 h-4 text-safety-500 flex-shrink-0" />
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
                    <span className="inline-flex items-center gap-1 text-bone-300 text-xs">
                      <ShieldCheck className="w-3 h-3 text-safety-500" />
                      Mandatory for orders containing items over $2,000
                    </span>
                  }
                />
              )}
            </dl>

            <div className="flex items-end justify-between pt-4 border-t border-bone-50/10">
              <div className="font-display text-[0.72rem] uppercase tracking-[0.3em] text-bone-300">
                Total
              </div>
              <div className="font-display font-bold text-3xl text-bone-50 tabular-nums">
                {money(totals.total)}
              </div>
            </div>

            <button type="button" className="btn btn-primary btn-lg w-full">
              Initiate Secure Checkout
            </button>
            <div className="flex justify-between text-xs text-bone-300">
              <button
                type="button"
                onClick={closeCart}
                className="hover:text-bone-50 transition-colors font-display uppercase tracking-[0.2em]"
              >
                Continue Outfitting
              </button>
              <button
                type="button"
                onClick={clear}
                className="hover:text-safety-500 transition-colors font-display uppercase tracking-[0.2em]"
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
        <dt className="text-bone-200">{label}</dt>
        {hint && <div className="mt-0.5">{hint}</div>}
      </div>
      <dd className="font-display font-semibold tabular-nums text-bone-50">{value}</dd>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-16 text-center space-y-4">
      <div className="inline-grid place-items-center w-16 h-16 border border-bone-50/10 text-bone-300 mx-auto">
        <ShoppingBag className="w-6 h-6" />
      </div>
      <h3 className="font-display font-bold uppercase tracking-tight text-bone-50">
        The Cart Is Empty
      </h3>
      <p className="text-bone-300 text-sm max-w-[36ch] mx-auto">
        Choose from the Vault to begin outfitting your next expedition.
      </p>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="px-6 py-8 space-y-4">
      {[0, 1].map((i) => (
        <div key={i} className="h-22 bg-ink-900 animate-pulse" />
      ))}
    </div>
  );
}
