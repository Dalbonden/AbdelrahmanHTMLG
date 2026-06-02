import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { AdminProductForm } from "@/components/AdminProductForm";
import { updateProductAction } from "@/app/actions/admin";

export const metadata: Metadata = { title: "Redigera produkt – Admin" };

export default async function RedigeraProduktPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  // Binder produktens id till update-action.
  const action = updateProductAction.bind(null, product.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">Redigera: {product.name}</h1>
      <div className="mt-6">
        <AdminProductForm
          action={action}
          categories={categories}
          submitLabel="Spara ändringar"
          defaults={{
            name: product.name,
            slug: product.slug,
            description: product.description,
            priceKr: product.priceCents / 100,
            brand: product.brand,
            imageUrl: product.imageUrl,
            stock: product.stock,
            categoryId: product.categoryId,
            active: product.active,
          }}
        />
      </div>
    </div>
  );
}
