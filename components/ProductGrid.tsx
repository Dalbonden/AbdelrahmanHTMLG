import { ProductCard } from "@/components/ProductCard";

type Product = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  currency: string;
  brand?: string | null;
  imageUrl: string;
};

// Återanvändbart rutnät för produkter. Visar tomläge om listan är tom.
export function ProductGrid({ products, emptyText = "Inga produkter hittades." }: {
  products: Product[];
  emptyText?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-brand-muted">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          slug={p.slug}
          name={p.name}
          priceCents={p.priceCents}
          currency={p.currency}
          brand={p.brand}
          imageUrl={p.imageUrl}
        />
      ))}
    </div>
  );
}
