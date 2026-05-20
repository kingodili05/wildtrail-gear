'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  DEFAULT_PAYMENT_SETTINGS,
  type PaymentSettings,
} from './payment-settings';

// NOTE: This is a client-side dashboard. The password check below
// is a UX gate, not real authentication. For production multi-device
// admin auth, replace with a server-validated session (NextAuth /
// Clerk / a custom JWT cookie) and move settings to a real datastore
// (Vercel KV, Postgres, Supabase).
export const ADMIN_PASSWORD = 'wildtrail-2026';

type AdminState = {
  authed: boolean;
  hydrated: boolean;
  setHydrated: () => void;
  login: (pw: string) => boolean;
  logout: () => void;

  settings: PaymentSettings;
  setSettings: (next: PaymentSettings) => void;
  resetSettings: () => void;
};

export const useAdmin = create<AdminState>()(
  persist(
    (set) => ({
      authed: false,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      login: (pw) => {
        if (pw === ADMIN_PASSWORD) {
          set({ authed: true });
          return true;
        }
        return false;
      },
      logout: () => set({ authed: false }),

      settings: DEFAULT_PAYMENT_SETTINGS,
      setSettings: (next) => set({ settings: next }),
      resetSettings: () => set({ settings: DEFAULT_PAYMENT_SETTINGS }),
    }),
    {
      name: 'wt-admin-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ authed: s.authed, settings: s.settings }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

// Helper for non-admin surfaces (checkout, confirmation) to read
// the current settings WITHOUT subscribing through the Zustand
// store API. Falls back to defaults when SSR-rendered.
export function readPaymentSettings(): PaymentSettings {
  if (typeof window === 'undefined') return DEFAULT_PAYMENT_SETTINGS;
  try {
    const raw = window.localStorage.getItem('wt-admin-v1');
    if (!raw) return DEFAULT_PAYMENT_SETTINGS;
    const parsed = JSON.parse(raw);
    return parsed?.state?.settings ?? DEFAULT_PAYMENT_SETTINGS;
  } catch {
    return DEFAULT_PAYMENT_SETTINGS;
  }
}
