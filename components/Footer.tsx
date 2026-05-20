import Link from 'next/link';
import { ShieldCheck, Truck, PackageCheck, Headphones } from 'lucide-react';

const COLS = [
  {
    title: 'Outfit',
    links: [
      { label: 'The Vault', href: '/products' },
      { label: 'Cameras', href: '/products?category=cameras' },
      { label: 'Drones', href: '/products?category=drones' },
      { label: 'Batteries & Power', href: '/products?category=power' },
    ],
  },
  {
    title: 'Operator',
    links: [
      { label: 'Field Reports', href: '#' },
      { label: 'Loadout Library', href: '#' },
      { label: 'Operator Login', href: '#' },
    ],
  },
  {
    title: 'Logistics',
    links: [
      { label: 'Expedition Shipping', href: '#' },
      { label: 'Returns & Damage', href: '#' },
      { label: 'Warranty Registry', href: '#' },
      { label: 'Field Support 24/7', href: '#' },
    ],
  },
];

const TRUST = [
  { icon: ShieldCheck, label: 'AES-256 Checkout', sub: 'Hardware-isolated' },
  { icon: Truck, label: 'Expedition Logistics', sub: 'Insured to $25K' },
  { icon: PackageCheck, label: 'Authorized Dealer', sub: 'OEM-warranty stock' },
  { icon: Headphones, label: 'Operator Support', sub: '24/7 phone line' },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-bone-50/[0.06]">
      <div className="border-b border-bone-50/[0.06]">
        <div className="container-wt grid grid-cols-2 md:grid-cols-4 gap-px bg-bone-50/[0.06]">
          {TRUST.map((t) => (
            <div key={t.label} className="bg-ink-950 px-5 py-6 flex items-start gap-3">
              <t.icon className="w-5 h-5 text-safety-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-display font-semibold uppercase tracking-[0.16em] text-[0.78rem] text-bone-50">
                  {t.label}
                </div>
                <div className="text-bone-300 text-xs mt-1">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-wt py-16 grid grid-cols-1 md:grid-cols-[1.4fr,repeat(3,1fr)] gap-12">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
            <span className="inline-grid place-items-center w-10 h-10 bg-safety-600 text-ink-950 font-display font-bold tracking-wider">
              WT
            </span>
            <span className="font-display font-bold text-lg tracking-wider uppercase text-bone-50">
              WildTrail<span className="text-safety-500">Gear</span>
            </span>
          </Link>
          <p className="text-bone-300 leading-relaxed max-w-[40ch]">
            Premium creator and outdoor gear — cameras, drones, broadcast and
            off-grid systems for serious operators. Every order serialized.
            Every shipment tracked.
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <div className="font-display font-semibold uppercase tracking-[0.24em] text-[0.74rem] text-bone-50 mb-5">
              {col.title}
            </div>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-bone-300 hover:text-safety-500 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-wt border-t border-bone-50/[0.06] py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-bone-400 font-mono uppercase tracking-[0.22em]">
        <div>© 2026 WildTrail Gear · All rights reserved</div>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-bone-50 transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-bone-50 transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-bone-50 transition-colors">
            Compliance
          </Link>
        </div>
      </div>
    </footer>
  );
}
