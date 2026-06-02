import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/money";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";

export const metadata: Metadata = {
  title: "Tack för din beställning – Shopen",
};

export default async function TackPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;

  let order = null;
  if (orderId) {
    try {
      order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });
    } catch {
      order = null;
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      {/* Töm varukorgen när bekräftelsesidan visas */}
      <ClearCartOnMount />

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
        ✓
      </div>
      <h1 className="mt-6 text-3xl font-bold">Tack för din beställning!</h1>
      <p className="mt-2 text-brand-muted">
        Vi har tagit emot din order och skickar en bekräftelse till din e-post.
      </p>

      {order && (
        <div className="mt-8 rounded-lg border border-gray-200 p-6 text-left">
          <p className="text-sm text-brand-muted">
            Ordernummer: <span className="font-mono">{order.id}</span>
          </p>
          <ul className="mt-4 divide-y divide-gray-100">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between py-2 text-sm">
                <span>
                  {item.nameSnapshot} × {item.quantity}
                </span>
                <span className="font-medium">
                  {formatPrice(item.priceCents * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 font-bold">
            <span>Totalt</span>
            <span>{formatPrice(order.totalCents, order.currency)}</span>
          </div>
        </div>
      )}

      <Link
        href="/produkter"
        className="mt-8 inline-block rounded-md bg-brand px-6 py-3 font-semibold text-white transition hover:opacity-90"
      >
        Fortsätt handla
      </Link>
    </div>
  );
}
