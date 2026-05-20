'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Truck, Lock, ArrowLeft } from 'lucide-react';
import { useCart, computeTotals } from '@/lib/store';
import { money } from '@/lib/format';

type Step = 'shipping' | 'payment' | 'placing';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const hydrated = useCart((s) => s.hydrated);
  const totals = computeTotals(items);

  const [step, setStep] = useState<Step>('shipping');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  useEffect(() => {
    if (hydrated && items.length === 0 && !submitting) {
      router.replace('/products');
    }
  }, [hydrated, items.length, router, submitting]);

  function set(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function validateShipping(): string | null {
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return 'Enter a valid email address.';
    if (!form.firstName || !form.lastName) return 'Name is required.';
    if (!form.address || !form.city || !form.state || !form.zip)
      return 'Complete the shipping address.';
    return null;
  }

  function validatePayment(): string | null {
    if (!form.cardName) return 'Name on card is required.';
    if (!/^[0-9 ]{12,23}$/.test(form.cardNumber)) return 'Card number looks invalid.';
    if (!/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test(form.cardExpiry))
      return 'Expiry should be MM/YY.';
    if (!/^\d{3,4}$/.test(form.cardCvc)) return 'CVC should be 3-4 digits.';
    return null;
  }

  async function handleContinue() {
    const v = validateShipping();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setStep('payment');
  }

  async function handlePlaceOrder() {
    const v = validatePayment();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setStep('placing');
    setSubmitting(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          totals,
          shipping: {
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            address: form.address,
            city: form.city,
            state: form.state,
            zip: form.zip,
            country: form.country,
            phone: form.phone,
          },
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Order failed.');

      clear();
      router.replace(`/checkout/success?order=${encodeURIComponent(data.orderId)}`);
    } catch (e: any) {
      setError(e.message || 'Could not place order. Try again.');
      setStep('payment');
      setSubmitting(false);
    }
  }

  if (!hydrated || items.length === 0) {
    return (
      <section className="min-h-[60vh] grid place-items-center bg-ivory-50">
        <div className="text-center space-y-3">
          <p className="text-graphite-500 font-mono text-sm uppercase tracking-[0.3em]">
            Loading cart…
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-navy-950 text-ivory-50 border-b border-ivory-50/[0.06]">
        <div className="container-wt py-14 md:py-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-ivory-200 hover:text-ivory-50 font-display text-[0.72rem] uppercase tracking-[0.24em] mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back To Catalog
          </Link>
          <div className="eyebrow mb-4">Checkout</div>
          <h1 className="display-h1 text-ivory-50 max-w-4xl">
            Secure <span className="text-red-500">Checkout</span>
          </h1>
          <div className="mt-8 flex flex-wrap gap-3 text-[0.72rem] uppercase tracking-[0.24em] font-display font-medium text-ivory-200">
            <StepPill label="01 · Shipping" active={step === 'shipping'} done={step !== 'shipping'} />
            <StepPill label="02 · Payment" active={step === 'payment'} done={step === 'placing'} />
            <StepPill label="03 · Confirm" active={step === 'placing'} done={false} />
          </div>
        </div>
      </section>

      <section className="bg-ivory-50 py-16">
        <div className="container-wt grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-10">
          {/* Form */}
          <div className="bg-ivory-50 border border-navy-900/[0.08] shadow-card">
            {step === 'shipping' && (
              <div className="p-8 md:p-10 space-y-6">
                <h2 className="display-h2 text-navy-900">Shipping Address</h2>
                <Field label="Email *">
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(v) => set('email', v)}
                    placeholder="you@company.com"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name *">
                    <Input value={form.firstName} onChange={(v) => set('firstName', v)} />
                  </Field>
                  <Field label="Last Name *">
                    <Input value={form.lastName} onChange={(v) => set('lastName', v)} />
                  </Field>
                </div>
                <Field label="Street Address *">
                  <Input
                    value={form.address}
                    onChange={(v) => set('address', v)}
                    placeholder="123 Main St"
                  />
                </Field>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Field label="City *">
                    <Input value={form.city} onChange={(v) => set('city', v)} />
                  </Field>
                  <Field label="State *">
                    <Input value={form.state} onChange={(v) => set('state', v)} placeholder="TX" />
                  </Field>
                  <Field label="ZIP *">
                    <Input value={form.zip} onChange={(v) => set('zip', v)} placeholder="75201" />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Country">
                    <Input value={form.country} onChange={(v) => set('country', v)} />
                  </Field>
                  <Field label="Phone">
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(v) => set('phone', v)}
                      placeholder="(555) 000-0000"
                    />
                  </Field>
                </div>
                {error && <ErrorLine text={error} />}
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-end">
                  <Link href="/products" className="btn btn-outline-dark btn-lg">
                    Cancel
                  </Link>
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="btn btn-primary btn-lg"
                  >
                    Continue To Payment
                  </button>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="p-8 md:p-10 space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="display-h2 text-navy-900">Payment</h2>
                  <div className="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.28em] text-graphite-500">
                    <Lock className="w-3.5 h-3.5 text-red-600" />
                    Encrypted
                  </div>
                </div>
                <Field label="Name On Card *">
                  <Input value={form.cardName} onChange={(v) => set('cardName', v)} />
                </Field>
                <Field label="Card Number *">
                  <Input
                    value={form.cardNumber}
                    onChange={(v) => set('cardNumber', v.replace(/[^0-9 ]/g, '').slice(0, 19))}
                    placeholder="4242 4242 4242 4242"
                    inputMode="numeric"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry MM/YY *">
                    <Input
                      value={form.cardExpiry}
                      onChange={(v) => set('cardExpiry', v.slice(0, 7))}
                      placeholder="08/27"
                    />
                  </Field>
                  <Field label="CVC *">
                    <Input
                      value={form.cardCvc}
                      onChange={(v) => set('cardCvc', v.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      inputMode="numeric"
                    />
                  </Field>
                </div>
                <div className="bg-ivory-100 border border-navy-900/[0.08] px-4 py-3 text-xs text-graphite-500 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-600 flex-shrink-0 mt-px" />
                  <span>
                    Demo checkout. No live card processor wired yet — replace the{' '}
                    <code className="font-mono text-graphite-700">/api/checkout</code> route with a
                    real Stripe payment intent before going public.
                  </span>
                </div>
                {error && <ErrorLine text={error} />}
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setStep('shipping');
                    }}
                    className="btn btn-outline-dark btn-lg"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="btn btn-primary btn-lg"
                  >
                    Place Order · {money(totals.total)}
                  </button>
                </div>
              </div>
            )}

            {step === 'placing' && (
              <div className="p-16 text-center space-y-6">
                <div className="inline-block w-12 h-12 border-2 border-navy-900/15 border-t-red-600 rounded-full animate-spin" />
                <h2 className="display-h2 text-navy-900">Placing Order…</h2>
                <p className="text-graphite-500 max-w-[40ch] mx-auto">
                  Securing payment and reserving units. This usually takes a few seconds.
                </p>
              </div>
            )}
          </div>

          {/* Summary */}
          <aside className="bg-navy-950 text-ivory-50 border border-navy-900 shadow-elev p-8 md:p-10 self-start sticky top-28">
            <div className="eyebrow mb-4">Order Summary</div>
            <h2 className="display-h2 text-ivory-50 mb-6">{totals.itemsCount} Items</h2>
            <ul className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-2">
              {totals.lines.map((l) => (
                <li key={l.productId} className="flex gap-3">
                  <div className="w-16 h-16 bg-navy-900 overflow-hidden flex-shrink-0">
                    <img
                      src={l.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold uppercase tracking-tight text-ivory-50 text-sm leading-snug line-clamp-2">
                      {l.name}
                    </div>
                    <div className="text-xs text-ivory-200/70 mt-1 tabular-nums">
                      Qty {l.qty} · {money(l.unitPrice)} each
                    </div>
                  </div>
                  <div className="font-display font-bold text-ivory-50 tabular-nums">
                    {money(l.subtotal)}
                  </div>
                </li>
              ))}
            </ul>

            <dl className="space-y-2 text-sm border-t border-ivory-50/[0.08] pt-5">
              <Row label="Subtotal" value={money(totals.subtotal)} />
              <Row label="Tax (8.5%)" value={money(totals.tax)} />
              <Row
                label="Shipping"
                value={totals.shipping === 0 ? 'Included' : money(totals.shipping)}
              />
              {totals.protection > 0 && (
                <Row label="High-Ticket Protection" value={money(totals.protection)} />
              )}
            </dl>
            <div className="flex items-end justify-between pt-5 mt-5 border-t border-ivory-50/[0.08]">
              <div className="font-display text-[0.72rem] uppercase tracking-[0.3em] text-ivory-200/70">
                Total
              </div>
              <div className="font-display font-bold text-3xl text-ivory-50 tabular-nums">
                {money(totals.total)}
              </div>
            </div>

            <div className="mt-6 space-y-2 text-xs text-ivory-200/70">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-red-500" />
                Insured expedition shipping
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                AES-256 encrypted checkout
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function StepPill({ label, active, done }: { label: string; active: boolean; done: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 border ${
        active
          ? 'bg-red-600 border-red-600 text-ivory-50'
          : done
          ? 'border-red-500/40 text-red-400'
          : 'border-ivory-50/15 text-ivory-200/60'
      }`}
    >
      {label}
    </span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-display text-[0.7rem] uppercase tracking-[0.24em] font-medium text-graphite-700 mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function Input(props: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: 'text' | 'numeric' | 'tel';
}) {
  return (
    <input
      type={props.type ?? 'text'}
      inputMode={props.inputMode}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      className="w-full bg-ivory-100 border border-navy-900/[0.15] px-4 py-3 text-navy-900 placeholder:text-graphite-400 focus-ring focus:border-red-500"
    />
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline gap-4">
      <dt className="text-ivory-200">{label}</dt>
      <dd className="font-display font-semibold tabular-nums text-ivory-50">{value}</dd>
    </div>
  );
}

function ErrorLine({ text }: { text: string }) {
  return (
    <div className="bg-red-500/10 border border-red-500/30 text-red-700 px-4 py-3 text-sm font-medium">
      {text}
    </div>
  );
}
