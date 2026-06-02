import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getProductsByCategory,
  type SortOption,
} from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";
import { SortSelect } from "@/components/SortSelect";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await getCategoryBySlug(slug);
    if (category) return { title: `${category.name} – Shopen` };
  } catch {
    // standard nedan
  }
  return { title: "Kategori – Shopen" };
}

export default async function KategoriPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug } = await params;
  const { sort } = await searchParams;

  let category;
  try {
    category = await getCategoryBySlug(slug);
  } catch {
    category = null;
  }
  if (!category) notFound();

  let products: Awaited<ReturnType<typeof getProductsByCategory>> = [];
  try {
    products = await getProductsByCategory(category.id, sort as SortOption);
  } catch {
    products = [];
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">{category.name}</h1>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-brand-muted">{products.length} produkter</p>
        <SortSelect />
      </div>
      <div className="mt-4">
        <ProductGrid
          products={products}
          emptyText="Inga produkter i denna kategori ännu."
        />
      </div>
    </div>
  );
}
