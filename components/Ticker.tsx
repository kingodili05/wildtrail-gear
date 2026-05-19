const ITEMS = [
  '/// Continuous 4K Broadcast Capability',
  '/// Insured Expedition Logistics To $25K',
  '/// AES-256 Hardware Checkout',
  '/// 24/7 Operator Support Line',
  '/// Field-Tested Loadouts',
  '/// Sub-Second Latency Live Feed',
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="relative bg-safety-600 text-ink-950 border-y border-safety-700 overflow-hidden">
      <div className="flex gap-12 py-3 animate-ticker whitespace-nowrap">
        {doubled.map((t, i) => (
          <span
            key={i}
            className="font-display text-[0.78rem] uppercase tracking-[0.3em] font-bold"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-safety-600 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-safety-600 to-transparent pointer-events-none" />
    </div>
  );
}
