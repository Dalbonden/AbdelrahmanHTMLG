import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/money";

export const metadata: Metadata = { title: "Mitt konto – Shopen" };

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Väntar på betalning",
  PAID: "Betald",
  FULFILLED: "Skickad",
  CANCELLED: "Avbruten",
  REFUNDED: "Återbetald",
};

export default async function KontoPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/logga-in");

  let orders: Awaited<ReturnType<typeof prisma.order.findMany>> = [];
  try {
    orders = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
  } catch {
    orders = [];
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mitt konto</h1>
          <p className="mt-1 text-brand-muted">{user.name ?? user.email}</p>
          <p className="text-sm text-brand-muted">{user.email}</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
          >
            Logga ut
          </button>
        </form>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Mina ordrar</h2>

        {orders.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-8 text-center text-brand-muted">
            <p>Du har inga ordrar ännu.</p>
            <Link
              href="/produkter"
              className="mt-4 inline-block rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Börja handla
            </Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-4">
            {orders.map((order) => {
              const items = (order as typeof order & {
                items: { id: string; nameSnapshot: string; quantity: number; priceCents: number }[];
              }).items;
              return (
                <li key={order.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs text-brand-muted">{order.id}</span>
                    <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium">
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </div>
                  <ul className="mt-3 divide-y divide-gray-100 text-sm">
                    {items.map((item) => (
                      <li key={item.id} className="flex justify-between py-1.5">
                        <span>{item.nameSnapshot} × {item.quantity}</span>
                        <span>{formatPrice(item.priceCents * item.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 font-semibold">
                    <span>Totalt</span>
                    <span>{formatPrice(order.totalCents, order.currency)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
