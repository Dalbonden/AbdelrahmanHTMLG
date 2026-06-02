import type { Metadata } from "next";
import { searchProducts } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Sök – Shopen",
};

export default async function SokPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  let results: Awaited<ReturnType<typeof searchProducts>> = [];
  if (query) {
    try {
      results = await searchProducts(query);
    } catch {
      results = [];
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">
        {query ? `Sökresultat för "${query}"` : "Sök"}
      </h1>

      <div className="mt-6">
        {!query ? (
          <p className="text-brand-muted">Skriv något i sökrutan för att hitta produkter.</p>
        ) : (
          <>
            <p className="mb-4 text-sm text-brand-muted">{results.length} träffar</p>
            <ProductGrid
              products={results}
              emptyText={`Inga produkter matchade "${query}". Prova ett annat sökord.`}
            />
          </>
        )}
      </div>
    </div>
  );
}
