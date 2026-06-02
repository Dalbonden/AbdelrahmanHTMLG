import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/money";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductGrid } from "@/components/ProductGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    if (product) {
      return { title: `${product.name} – Shopen`, description: product.description };
    }
  } catch {
    // faller igenom till standard
  }
  return { title: "Produkt – Shopen" };
}

export default async function ProduktPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    product = null;
  }
  if (!product) notFound();

  let related: Awaited<ReturnType<typeof getRelatedProducts>> = [];
  try {
    related = await getRelatedProducts(product.categoryId, product.id);
  } catch {
    related = [];
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 text-sm text-brand-muted">
        <Link href="/" className="hover:text-brand">Hem</Link>
        <span className="mx-2">/</span>
        <Link href="/produkter" className="hover:text-brand">Produkter</Link>
        <span className="mx-2">/</span>
        <span className="text-brand">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          {product.category && (
            <Link
              href={`/kategori/${product.category.slug}`}
              className="text-sm text-brand-accent hover:underline"
            >
              {product.category.name}
            </Link>
          )}
          <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
          {product.brand && (
            <p className="mt-1 text-sm text-brand-muted">{product.brand}</p>
          )}
          <p className="mt-4 text-2xl font-bold">
            {formatPrice(product.priceCents, product.currency)}
          </p>

          <p className="mt-2 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-700">✓ I lager ({product.stock} st)</span>
            ) : (
              <span className="text-brand-accent">Slut i lager</span>
            )}
          </p>

          <p className="mt-6 leading-relaxed text-gray-700">{product.description}</p>

          <div className="mt-8 max-w-xs">
            <AddToCartButton
              product={{
                productId: product.id,
                slug: product.slug,
                name: product.name,
                priceCents: product.priceCents,
                currency: product.currency,
                imageUrl: product.imageUrl,
              }}
              stock={product.stock}
            />
          </div>

          <ul className="mt-6 space-y-1 text-sm text-brand-muted">
            <li>✓ Fri frakt över 499 kr</li>
            <li>✓ Fri retur inom 14 dagar</li>
            <li>✓ Säker betalning</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 text-2xl font-bold">Liknande produkter</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
