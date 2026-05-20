import type { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';
import { CATEGORIES, type CategoryId } from '@/lib/products';

export const metadata: Metadata = {
  title: 'The Vault Inventory',
  description:
    'Browse the complete WildTrail Gear inventory: broadcast cameras, drones, off-grid power, fishing electronics, and field audio.',
};

type SearchParams = {
  category?: string;
  focus?: string;
};

function normalizeCategory(input?: string): CategoryId | 'all' {
  if (!input) return 'all';
  return CATEGORIES.some((c) => c.id === input) ? (input as CategoryId) : 'all';
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const category = normalizeCategory(params.category);
  const focusSlug = params.focus?.trim();

  return (
    <>
      <section className="relative bg-navy-950 text-ivory-50 border-b border-ivory-50/[0.06]">
        <div className="absolute inset-0 grid-bg-dark opacity-30 pointer-events-none" />
        <div className="container-wt relative py-20 md:py-28">
          <div className="eyebrow mb-4">Catalog Inventory</div>
          <h1 className="display-h1 text-ivory-50 max-w-4xl">
            Every System. <span className="text-red-500">Sorted By Power.</span>
          </h1>
          <p className="text-ivory-200 mt-6 max-w-[60ch] text-lg leading-relaxed">
            Highest-value first. Filter by division, sort by price, or by stock.
            Each line item is serialized and field-tested.
          </p>
        </div>
      </section>

      <section className="bg-ivory-50 py-12 md:py-16">
        <div className="container-wt">
          <ProductGrid initialCategory={category} focusSlug={focusSlug} />
        </div>
      </section>
    </>
  );
}
