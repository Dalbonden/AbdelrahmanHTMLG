import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/money";

export const metadata: Metadata = { title: "Admin – Shopen" };

export default async function AdminPage() {
  await requireAdmin();

  const [productCount, orderCount, paidOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.findMany({ where: { status: "PAID" }, select: { totalCents: true } }),
  ]);

  const revenue = paidOrders.reduce((sum, o) => sum + o.totalCents, 0);

  const cards = [
    { label: "Produkter", value: productCount, href: "/admin/produkter" },
    { label: "Ordrar", value: orderCount, href: "/admin" },
    { label: "Intäkt (betalda)", value: formatPrice(revenue), href: "/admin" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">Adminpanel</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="rounded-lg border border-gray-200 p-5 transition hover:shadow-md">
            <p className="text-sm text-brand-muted">{c.label}</p>
            <p className="mt-1 text-2xl font-bold">{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/admin/produkter" className="inline-block rounded-md bg-brand px-5 py-2.5 font-semibold text-white transition hover:opacity-90">
          Hantera produkter
        </Link>
      </div>
    </div>
  );
}
