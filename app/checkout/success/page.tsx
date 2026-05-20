import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;
  const orderId = params.order ?? 'WT-NEW-ORDER';

  return (
    <section className="bg-ivory-50 min-h-[80vh] grid place-items-center py-24">
      <div className="container-wt max-w-2xl text-center space-y-8">
        <div className="inline-grid place-items-center w-20 h-20 bg-navy-900 text-ivory-50 mx-auto">
          <Check className="w-10 h-10" />
        </div>
        <div className="eyebrow justify-center">Order Placed</div>
        <h1 className="display-h1 text-navy-900">
          Order <span className="text-red-500">Confirmed</span>
        </h1>
        <p className="text-graphite-500 text-lg leading-relaxed max-w-[52ch] mx-auto">
          Thanks for your order. A confirmation email is on its way. Your gear will ship
          insured with a tracked operator log within 2 business days.
        </p>
        <div className="font-mono text-[0.78rem] uppercase tracking-[0.3em] text-graphite-500">
          Order Reference
          <div className="font-display font-bold text-2xl text-navy-900 tracking-tight tabular-nums mt-2">
            {orderId}
          </div>
        </div>
        <div className="pt-4 flex flex-wrap gap-3 justify-center">
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
