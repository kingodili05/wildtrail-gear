'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PRODUCTS } from './products';

export type CartItem = {
  productId: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  hydrated: boolean;
  setHydrated: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      open: false,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      openCart: () => set({ open: true }),
      closeCart: () => set({ open: false }),
      toggleCart: () => set((s) => ({ open: !s.open })),
      add: (productId, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === productId ? { ...i, qty: i.qty + qty } : i,
              ),
              open: true,
            };
          }
          return {
            items: [...s.items, { productId, qty }],
            open: true,
          };
        }),
      remove: (productId) =>
        set((s) => ({
          items: s.items.filter((i) => i.productId !== productId),
        })),
      setQty: (productId, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.productId !== productId)
              : s.items.map((i) =>
                  i.productId === productId ? { ...i, qty } : i,
                ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'wildtrail-cart-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

export type CartLine = {
  productId: string;
  name: string;
  slug: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
  image: string;
};

export type CartTotals = {
  lines: CartLine[];
  itemsCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  protection: number;
  total: number;
  freeShippingRemaining: number;
};

const TAX_RATE = 0.085;
const SHIPPING_BASE = 49;
const FREE_SHIPPING_THRESHOLD = 5000;
const HIGH_TICKET_PROTECTION_THRESHOLD = 2000;
const PROTECTION_FLAT = 79;

export function computeTotals(items: CartItem[]): CartTotals {
  const lines: CartLine[] = items
    .map((i) => {
      const p = PRODUCTS.find((x) => x.id === i.productId);
      if (!p) return null;
      return {
        productId: p.id,
        name: p.name,
        slug: p.slug,
        qty: i.qty,
        unitPrice: p.price,
        subtotal: p.price * i.qty,
        image: p.image,
      } satisfies CartLine;
    })
    .filter((l): l is CartLine => l !== null);

  const subtotal = lines.reduce((s, l) => s + l.subtotal, 0);
  const itemsCount = lines.reduce((s, l) => s + l.qty, 0);
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_BASE;
  const hasHighTicket = lines.some((l) => l.unitPrice >= HIGH_TICKET_PROTECTION_THRESHOLD);
  const protection = hasHighTicket ? PROTECTION_FLAT : 0;
  const total = +(subtotal + tax + shipping + protection).toFixed(2);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return {
    lines,
    itemsCount,
    subtotal,
    tax,
    shipping,
    protection,
    total,
    freeShippingRemaining,
  };
}

