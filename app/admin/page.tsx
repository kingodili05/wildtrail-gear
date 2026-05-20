'use client';

import { useEffect, useState } from 'react';
import { LogOut, Lock, Save, RotateCcw, Mail, Phone, Building, Banknote, FileCheck, Copy } from 'lucide-react';
import { useAdmin } from '@/lib/admin-store';
import { DEFAULT_PAYMENT_SETTINGS, type PaymentSettings } from '@/lib/payment-settings';

export default function AdminPage() {
  const hydrated = useAdmin((s) => s.hydrated);
  const authed = useAdmin((s) => s.authed);

  if (!hydrated) {
    return (
      <section className="min-h-[70vh] grid place-items-center bg-ivory-50">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-graphite-500">
          Loading…
        </div>
      </section>
    );
  }

  return authed ? <Dashboard /> : <Login />;
}

function Login() {
  const login = useAdmin((s) => s.login);
  const [pw, setPw] = useState('');
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!login(pw)) setError('Incorrect password.');
  }

  return (
    <section className="min-h-[80vh] grid place-items-center bg-navy-950 text-ivory-50 py-24">
      <div className="container-wt max-w-md">
        <div className="bg-ivory-50 text-graphite-700 border border-navy-900/[0.08] shadow-elev p-10 space-y-6">
          <div className="inline-grid place-items-center w-12 h-12 bg-navy-900 text-ivory-50 mx-auto">
            <Lock className="w-5 h-5" />
          </div>
          <div className="text-center space-y-2">
            <div className="eyebrow justify-center">Restricted</div>
            <h1 className="display-h2 text-navy-900">Admin Sign-In</h1>
            <p className="text-sm text-graphite-500">
              Enter the password to manage payment settings.
            </p>
          </div>
          <form onSubmit={submit} className="space-y-3">
            <input
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Password"
              className="w-full bg-ivory-100 border border-navy-900/[0.15] px-4 py-3 text-navy-900 placeholder:text-graphite-400 focus-ring focus:border-red-500"
            />
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-700 px-4 py-2 text-sm">
                {error}
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-lg w-full">
              Sign In
            </button>
          </form>
          <p className="text-[0.7rem] uppercase tracking-[0.24em] font-display text-graphite-400 text-center">
            Client-side gate · Replace with real auth before production
          </p>
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  const settings = useAdmin((s) => s.settings);
  const setSettings = useAdmin((s) => s.setSettings);
  const reset = useAdmin((s) => s.resetSettings);
  const logout = useAdmin((s) => s.logout);

  const [draft, setDraft] = useState<PaymentSettings>(settings);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  function save() {
    setSettings(draft);
    setSavedAt(Date.now());
  }

  function resetAll() {
    if (!confirm('Reset all payment settings to repo defaults?')) return;
    reset();
    setDraft(DEFAULT_PAYMENT_SETTINGS);
    setSavedAt(Date.now());
  }

  async function copyConfig() {
    const code = `export const DEFAULT_PAYMENT_SETTINGS: PaymentSettings = ${JSON.stringify(
      draft,
      null,
      2,
    )};\n`;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <section className="bg-navy-950 text-ivory-50 border-b border-ivory-50/[0.06]">
        <div className="container-wt py-12 md:py-16 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="eyebrow mb-3">Admin</div>
            <h1 className="display-h2 text-ivory-50">Payment Settings</h1>
            <p className="text-ivory-200/80 mt-3 max-w-[60ch] text-sm leading-relaxed">
              Edit the wire and check details customers see at checkout. Saves to
              this browser straight away. To push the change to every visitor,
              click <em>Copy Config</em>, paste into{' '}
              <code className="font-mono text-ivory-50/80">lib/payment-settings.ts</code>,
              and commit.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={resetAll}
              className="btn btn-outline btn-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={logout}
              className="btn btn-outline btn-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </section>

      <section className="bg-ivory-50 py-12">
        <div className="container-wt space-y-10 max-w-4xl">
          {/* Method toggles */}
          <Card title="Accepted Methods" icon={<FileCheck className="w-5 h-5 text-red-600" />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-navy-900/[0.08] border border-navy-900/[0.08]">
              <Toggle
                label="Wire Transfer"
                active={draft.enabled.wire}
                onChange={(v) =>
                  setDraft({ ...draft, enabled: { ...draft.enabled, wire: v } })
                }
              />
              <Toggle
                label="Cashier's Check"
                active={draft.enabled.check}
                onChange={(v) =>
                  setDraft({ ...draft, enabled: { ...draft.enabled, check: v } })
                }
              />
            </div>
          </Card>

          {/* Wire details */}
          <Card title="Wire Transfer Banking" icon={<Banknote className="w-5 h-5 text-red-600" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Bank Name">
                <Input
                  value={draft.wire.bankName}
                  onChange={(v) => setDraft({ ...draft, wire: { ...draft.wire, bankName: v } })}
                />
              </Field>
              <Field label="Account Holder Name">
                <Input
                  value={draft.wire.accountName}
                  onChange={(v) =>
                    setDraft({ ...draft, wire: { ...draft.wire, accountName: v } })
                  }
                />
              </Field>
              <Field label="Account Number">
                <Input
                  value={draft.wire.accountNumber}
                  onChange={(v) =>
                    setDraft({ ...draft, wire: { ...draft.wire, accountNumber: v } })
                  }
                />
              </Field>
              <Field label="Routing Number (ABA)">
                <Input
                  value={draft.wire.routingNumber}
                  onChange={(v) =>
                    setDraft({ ...draft, wire: { ...draft.wire, routingNumber: v } })
                  }
                />
              </Field>
              <Field label="SWIFT / BIC">
                <Input
                  value={draft.wire.swift}
                  onChange={(v) => setDraft({ ...draft, wire: { ...draft.wire, swift: v } })}
                />
              </Field>
              <Field label="Bank Address">
                <Input
                  value={draft.wire.bankAddress}
                  onChange={(v) =>
                    setDraft({ ...draft, wire: { ...draft.wire, bankAddress: v } })
                  }
                />
              </Field>
            </div>
            <Field label="Reference / Memo Instructions">
              <Textarea
                value={draft.wire.referenceInstructions}
                onChange={(v) =>
                  setDraft({ ...draft, wire: { ...draft.wire, referenceInstructions: v } })
                }
              />
            </Field>
          </Card>

          {/* Check details */}
          <Card title="Cashier's Check Mailing" icon={<Building className="w-5 h-5 text-red-600" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Payable To">
                <Input
                  value={draft.check.payableTo}
                  onChange={(v) =>
                    setDraft({ ...draft, check: { ...draft.check, payableTo: v } })
                  }
                />
              </Field>
              <Field label="Mailing Recipient">
                <Input
                  value={draft.check.mailingName}
                  onChange={(v) =>
                    setDraft({ ...draft, check: { ...draft.check, mailingName: v } })
                  }
                />
              </Field>
              <Field label="Mailing Address">
                <Input
                  value={draft.check.mailingAddress}
                  onChange={(v) =>
                    setDraft({ ...draft, check: { ...draft.check, mailingAddress: v } })
                  }
                />
              </Field>
              <div className="grid grid-cols-3 gap-3">
                <Field label="City">
                  <Input
                    value={draft.check.mailingCity}
                    onChange={(v) =>
                      setDraft({ ...draft, check: { ...draft.check, mailingCity: v } })
                    }
                  />
                </Field>
                <Field label="State">
                  <Input
                    value={draft.check.mailingState}
                    onChange={(v) =>
                      setDraft({ ...draft, check: { ...draft.check, mailingState: v } })
                    }
                  />
                </Field>
                <Field label="ZIP">
                  <Input
                    value={draft.check.mailingZip}
                    onChange={(v) =>
                      setDraft({ ...draft, check: { ...draft.check, mailingZip: v } })
                    }
                  />
                </Field>
              </div>
            </div>
            <Field label="Customer Instructions">
              <Textarea
                value={draft.check.instructions}
                onChange={(v) =>
                  setDraft({ ...draft, check: { ...draft.check, instructions: v } })
                }
              />
            </Field>
          </Card>

          {/* Support */}
          <Card title="Customer Support Contact" icon={<Mail className="w-5 h-5 text-red-600" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Support Email">
                <Input
                  value={draft.supportEmail}
                  onChange={(v) => setDraft({ ...draft, supportEmail: v })}
                />
              </Field>
              <Field label="Support Phone">
                <Input
                  value={draft.supportPhone}
                  onChange={(v) => setDraft({ ...draft, supportPhone: v })}
                />
              </Field>
            </div>
          </Card>

          {/* Actions */}
          <div className="sticky bottom-4 z-20">
            <div className="bg-navy-950 text-ivory-50 border border-navy-900 shadow-elev p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-ivory-200/80">
                {savedAt ? (
                  <span>Saved locally. To push to all visitors, copy the config below and commit.</span>
                ) : (
                  <span>Edit the fields above, then save.</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={copyConfig} className="btn btn-outline btn-sm">
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied' : 'Copy Config'}
                </button>
                <button type="button" onClick={save} className="btn btn-primary btn-sm">
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-ivory-50 border border-navy-900/[0.08] shadow-card">
      <div className="px-6 py-4 border-b border-navy-900/[0.08] flex items-center gap-3">
        {icon}
        <h2 className="font-display font-bold uppercase tracking-[0.18em] text-navy-900">
          {title}
        </h2>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-display text-[0.68rem] uppercase tracking-[0.24em] font-medium text-graphite-700 mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function Input(props: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className="w-full bg-ivory-100 border border-navy-900/[0.15] px-3 py-2.5 text-navy-900 focus-ring focus:border-red-500 text-sm"
    />
  );
}

function Textarea(props: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      rows={3}
      className="w-full bg-ivory-100 border border-navy-900/[0.15] px-3 py-2.5 text-navy-900 focus-ring focus:border-red-500 text-sm leading-relaxed"
    />
  );
}

function Toggle({
  label,
  active,
  onChange,
}: {
  label: string;
  active: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!active)}
      className={`flex items-center justify-between gap-3 px-5 py-4 bg-ivory-50 hover:bg-ivory-100 transition-colors text-left focus-ring`}
    >
      <span className="font-display uppercase tracking-[0.18em] text-[0.85rem] font-semibold text-navy-900">
        {label}
      </span>
      <span
        className={`inline-flex w-12 h-6 items-center px-0.5 transition-colors ${
          active ? 'bg-red-600 justify-end' : 'bg-graphite-300 justify-start'
        }`}
      >
        <span className="w-5 h-5 bg-ivory-50 block" />
      </span>
    </button>
  );
}
