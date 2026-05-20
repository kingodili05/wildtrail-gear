'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, Banknote, FileCheck, Mail, Phone, Copy } from 'lucide-react';
import { readPaymentSettings } from '@/lib/admin-store';
import {
  PAYMENT_METHOD_LABEL,
  type PaymentMethodId,
  type PaymentSettings,
} from '@/lib/payment-settings';

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-[60vh] grid place-items-center bg-ivory-50">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-graphite-500">
            Loading…
          </div>
        </section>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}

function SuccessInner() {
  const params = useSearchParams();
  const orderId = params.get('order') ?? 'WT-NEW-ORDER';
  const method = (params.get('method') as PaymentMethodId) ?? 'wire';
  const [settings, setSettings] = useState<PaymentSettings | null>(null);

  useEffect(() => {
    setSettings(readPaymentSettings());
  }, []);

  if (!settings) {
    return (
      <section className="min-h-[60vh] grid place-items-center bg-ivory-50">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-graphite-500">
          Loading…
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ivory-50 py-16 md:py-24">
      <div className="container-wt max-w-3xl space-y-10">
        <div className="text-center space-y-6">
          <div className="inline-grid place-items-center w-20 h-20 bg-navy-900 text-ivory-50 mx-auto">
            <Check className="w-10 h-10" />
          </div>
          <div className="eyebrow justify-center">Order Reserved</div>
          <h1 className="display-h1 text-navy-900">
            Order <span className="text-red-500">Confirmed</span>
          </h1>
          <p className="text-graphite-500 text-lg leading-relaxed max-w-[52ch] mx-auto">
            Your units are reserved. Send payment using the instructions below.
            A copy is in your inbox.
          </p>
          <div className="inline-block bg-navy-950 text-ivory-50 px-6 py-4">
            <div className="font-display text-[0.7rem] uppercase tracking-[0.3em] text-ivory-200/70 mb-1">
              Order Reference
            </div>
            <div className="font-display font-bold text-2xl tabular-nums">{orderId}</div>
          </div>
        </div>

        {method === 'wire' && <WireInstructions settings={settings} orderId={orderId} />}
        {method === 'check' && <CheckInstructions settings={settings} orderId={orderId} />}

        <SupportBlock settings={settings} />

        <div className="text-center pt-4 flex flex-wrap gap-3 justify-center">
          <Link href="/products" className="btn btn-primary btn-lg">
            Keep Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/" className="btn btn-outline-dark btn-lg">
            Back Home
          </Link>
        </div>
      </div>
    </section>
  );
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }
  return (
    <div className="grid grid-cols-[160px,1fr,auto] gap-4 items-center px-5 py-4 border-b border-navy-900/[0.06] last:border-b-0">
      <div className="font-display text-[0.7rem] uppercase tracking-[0.24em] font-medium text-graphite-500">
        {label}
      </div>
      <div className="font-display font-semibold text-navy-900 tabular-nums break-words">
        {value}
      </div>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-[0.2em] font-semibold text-red-600 hover:text-red-700 focus-ring"
        aria-label={`Copy ${label}`}
      >
        <Copy className="w-3.5 h-3.5" />
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

function WireInstructions({
  settings,
  orderId,
}: {
  settings: PaymentSettings;
  orderId: string;
}) {
  return (
    <div className="bg-ivory-50 border border-navy-900/[0.08] shadow-card">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-navy-900/[0.08] bg-navy-950 text-ivory-50">
        <Banknote className="w-5 h-5 text-red-500" />
        <h2 className="font-display font-bold uppercase tracking-[0.2em]">
          Wire Transfer Instructions
        </h2>
      </div>
      <CopyRow label="Bank Name" value={settings.wire.bankName} />
      <CopyRow label="Account Name" value={settings.wire.accountName} />
      <CopyRow label="Account Number" value={settings.wire.accountNumber} />
      <CopyRow label="Routing (ABA)" value={settings.wire.routingNumber} />
      <CopyRow label="SWIFT / BIC" value={settings.wire.swift} />
      <CopyRow label="Bank Address" value={settings.wire.bankAddress} />
      <CopyRow label="Wire Memo" value={orderId} />
      <div className="px-6 py-5 bg-ivory-100 text-sm text-graphite-700 leading-relaxed">
        {settings.wire.referenceInstructions}
      </div>
    </div>
  );
}

function CheckInstructions({
  settings,
  orderId,
}: {
  settings: PaymentSettings;
  orderId: string;
}) {
  return (
    <div className="bg-ivory-50 border border-navy-900/[0.08] shadow-card">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-navy-900/[0.08] bg-navy-950 text-ivory-50">
        <FileCheck className="w-5 h-5 text-red-500" />
        <h2 className="font-display font-bold uppercase tracking-[0.2em]">
          Cashier&apos;s Check Instructions
        </h2>
      </div>
      <CopyRow label="Payable To" value={settings.check.payableTo} />
      <CopyRow label="Mail To" value={settings.check.mailingName} />
      <CopyRow label="Address" value={settings.check.mailingAddress} />
      <CopyRow
        label="City / State / ZIP"
        value={`${settings.check.mailingCity}, ${settings.check.mailingState} ${settings.check.mailingZip}`}
      />
      <CopyRow label="Back-of-Check Memo" value={orderId} />
      <div className="px-6 py-5 bg-ivory-100 text-sm text-graphite-700 leading-relaxed">
        {settings.check.instructions}
      </div>
    </div>
  );
}

function SupportBlock({ settings }: { settings: PaymentSettings }) {
  return (
    <div className="bg-navy-950 text-ivory-50 p-6 md:p-8 flex flex-wrap items-center gap-6 justify-between">
      <div>
        <div className="eyebrow text-red-500 mb-1">Need Help?</div>
        <div className="font-display text-lg uppercase tracking-tight text-ivory-50">
          Use this order ID as your wire memo or check note.
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <a
          href={`mailto:${settings.supportEmail}`}
          className="inline-flex items-center gap-2 text-ivory-200 hover:text-ivory-50"
        >
          <Mail className="w-4 h-4 text-red-500" />
          {settings.supportEmail}
        </a>
        <a
          href={`tel:${settings.supportPhone.replace(/\s+/g, '')}`}
          className="inline-flex items-center gap-2 text-ivory-200 hover:text-ivory-50"
        >
          <Phone className="w-4 h-4 text-red-500" />
          {settings.supportPhone}
        </a>
      </div>
    </div>
  );
}
