import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";

// Hämtar populära produkter. Returnerar tomt + felflagga om databasen ännu
// inte är konfigurerad, så att startsidan kan visa ett vänligt tomläge.
async function getPopularProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    });
    return { products, dbError: false };
  } catch {
    return { products: [], dbError: true };
  }
}

// Startsida. Hämtar populära produkter från databasen (server component).
export default async function HomePage() {
  const { products, dbError } = await getPopularProducts();

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="my-8 grid items-center gap-6 rounded-2xl bg-gray-900 p-8 text-white sm:grid-cols-2 sm:p-12">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">
            Handla tryggt, leverera snabbt
          </h1>
          <p className="mt-3 text-gray-300">
            Noga utvalda produkter, säkra betalningar och fri retur inom 14
            dagar.
          </p>
          <Link
            href="/produkter"
            className="mt-6 inline-block rounded-md bg-white px-5 py-2.5 font-semibold text-gray-900 transition hover:bg-gray-200"
          >
            Se alla produkter
          </Link>
        </div>
        <div className="hidden sm:block">
          <div className="aspect-video rounded-xl bg-gradient-to-br from-gray-700 to-gray-800" />
        </div>
      </section>

      {/* Produkter */}
      <section className="my-10">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Populära produkter</h2>
          <Link
            href="/produkter"
            className="text-sm font-medium text-brand-accent hover:underline"
          >
            Visa alla →
          </Link>
        </div>

        {dbError ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-brand-muted">
            <p className="font-medium">Butiken sätts upp.</p>
            <p className="mt-1 text-sm">
              Kör <code className="rounded bg-gray-100 px-1">npm run db:push</code>{" "}
              och{" "}
              <code className="rounded bg-gray-100 px-1">npm run db:seed</code>{" "}
              för att fylla butiken med produkter.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-brand-muted">
            Inga produkter ännu.
          </div>
        ) : (
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
        )}
      </section>

      {/* Trygghet */}
      <section className="my-12 grid gap-4 rounded-xl border border-gray-200 p-6 text-center text-sm sm:grid-cols-4">
        <div>Fri frakt över 499 kr</div>
        <div>Expressleverans</div>
        <div>Säkra betalningar</div>
        <div>Fri retur i 14 dagar</div>
      </section>
    </div>
  );
}
