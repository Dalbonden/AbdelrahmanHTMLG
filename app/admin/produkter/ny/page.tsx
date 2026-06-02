import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { AdminProductForm } from "@/components/AdminProductForm";
import { createProductAction } from "@/app/actions/admin";

export const metadata: Metadata = { title: "Ny produkt – Admin" };

export default async function NyProduktPage() {
  await requireAdmin();
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">Ny produkt</h1>
      <div className="mt-6">
        <AdminProductForm
          action={createProductAction}
          categories={categories}
          submitLabel="Skapa produkt"
        />
      </div>
    </div>
  );
}
