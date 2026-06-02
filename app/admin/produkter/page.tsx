import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/money";
import { toggleProductActiveAction } from "@/app/actions/admin";

export const metadata: Metadata = { title: "Produkter – Admin" };

export default async function AdminProdukterPage() {
  await requireAdmin();

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produkter</h1>
        <Link href="/admin/produkter/ny" className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
          + Ny produkt
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-left text-brand-muted">
              <th className="p-2">Namn</th>
              <th className="p-2">Kategori</th>
              <th className="p-2">Pris</th>
              <th className="p-2">Lager</th>
              <th className="p-2">Status</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-2 font-medium">{p.name}</td>
                <td className="p-2 text-brand-muted">{p.category?.name ?? "—"}</td>
                <td className="p-2">{formatPrice(p.priceCents, p.currency)}</td>
                <td className="p-2">{p.stock}</td>
                <td className="p-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${p.active ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"}`}>
                    {p.active ? "Aktiv" : "Dold"}
                  </span>
                </td>
                <td className="p-2 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/produkter/${p.id}`} className="text-brand-accent hover:underline">
                      Redigera
                    </Link>
                    <form action={toggleProductActiveAction.bind(null, p.id)}>
                      <button type="submit" className="text-brand-muted hover:underline">
                        {p.active ? "Dölj" : "Visa"}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="mt-6 text-center text-brand-muted">Inga produkter ännu.</p>
        )}
      </div>
    </div>
  );
}
