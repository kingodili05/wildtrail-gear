import type { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';
import { CATEGORIES, type CategoryId } from '@/lib/products';

export const metadata: Metadata = {
  title: 'The Vault Inventory',
  description:
    'Browse the complete WildTrail Gear inventory: industrial power, broadcast-grade field streaming, and precision tools.',
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
      <section className="relative bg-ink-950 border-b border-bone-50/[0.06]">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="container-wt relative py-20 md:py-28">
          <div className="eyebrow mb-4">Vault Inventory</div>
          <h1 className="display-h1 text-bone-50 max-w-4xl">
            Every System. <span className="text-safety-500">Sorted By Power.</span>
          </h1>
          <p className="text-bone-200 mt-6 max-w-[60ch] text-lg leading-relaxed">
            Highest-value systems first. Filter by loadout, sort by price, or by stock
            posture. Every line item is serialized, logged, and field-validated.
          </p>
        </div>
      </section>

      <section className="bg-ink-950 py-12 md:py-16">
        <div className="container-wt">
          <ProductGrid initialCategory={category} focusSlug={focusSlug} />
        </div>
      </section>
    </>
  );
}
