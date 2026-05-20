import Link from 'next/link';
import { ArrowRight, MapPinned } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="bg-navy-950 text-ivory-50 min-h-[80vh] flex items-center py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 grid-bg-dark opacity-25 pointer-events-none"
        aria-hidden="true"
      />
      <div className="container-wt relative grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-10 items-center">
        <div className="space-y-6 max-w-2xl">
          <div className="eyebrow">Off-Trail</div>
          <h1 className="display-h1 text-ivory-50">
            404 · <span className="text-red-500">Off The Map</span>
          </h1>
          <p className="text-ivory-200 text-lg leading-relaxed max-w-[52ch]">
            The page you tried to reach is not in our catalog. Head back to the basecamp
            or jump straight into the vault.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/" className="btn btn-primary btn-lg">
              Back To Basecamp
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/products" className="btn btn-outline btn-lg">
              Enter The Vault
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center w-[260px] h-[260px] border border-ivory-50/15 relative">
          <div className="absolute -top-3 -left-3 w-3 h-3 border-t border-l border-red-500" />
          <div className="absolute -top-3 -right-3 w-3 h-3 border-t border-r border-red-500" />
          <div className="absolute -bottom-3 -left-3 w-3 h-3 border-b border-l border-red-500" />
          <div className="absolute -bottom-3 -right-3 w-3 h-3 border-b border-r border-red-500" />
          <MapPinned className="w-20 h-20 text-red-500/70" strokeWidth={1.2} />
          <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ivory-200/70">
            Coordinates Lost
          </div>
        </div>
      </div>
    </section>
  );
}
