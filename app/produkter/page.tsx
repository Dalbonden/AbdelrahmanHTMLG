import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts, getAllCategories, type SortOption } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";
import { SortSelect } from "@/components/SortSelect";

export const metadata: Metadata = {
  title: "Alla produkter – Shopen",
  description: "Bläddra bland alla produkter i Shopen.",
};

export default async function ProdukterPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;

  let products: Awaited<ReturnType<typeof getAllProducts>> = [];
  let categories: Awaited<ReturnType<typeof getAllCategories>> = [];
  let dbError = false;
  try {
    [products, categories] = await Promise.all([
      getAllProducts(sort as SortOption),
      getAllCategories(),
    ]);
  } catch {
    dbError = true;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">Alla produkter</h1>

      {categories.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/kategori/${c.slug}`}
              className="rounded-full border border-gray-300 px-3 py-1 text-sm transition hover:border-brand hover:bg-gray-50"
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-brand-muted">
          {dbError ? "" : `${products.length} produkter`}
        </p>
        <SortSelect />
      </div>

      <div className="mt-4">
        {dbError ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-brand-muted">
            Butiken sätts upp. Kör <code className="rounded bg-gray-100 px-1">npm run db:seed</code>.
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
