"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/money";

export default function VarukorgPage() {
  const { items, updateQuantity, removeItem, totalCents, ready } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Något gick fel. Försök igen.");
        return;
      }
      // Skicka kunden vidare till Stripe Checkout
      if (data.url) window.location.href = data.url;
    } catch {
      setError("Kunde inte nå betaltjänsten. Försök igen.");
    } finally {
      setLoading(false);
    }
  }

  if (!ready) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center text-brand-muted">
        Laddar varukorg…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Din varukorg är tom</h1>
        <p className="mt-2 text-brand-muted">Du har inte lagt till några produkter ännu.</p>
        <Link
          href="/produkter"
          className="mt-6 inline-block rounded-md bg-brand px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Börja handla
        </Link>
      </div>
    );
  }

  const shippingCents = totalCents >= 49900 ? 0 : 4900;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Varukorg</h1>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 rounded-lg border border-gray-200 p-4"
          >
            <Link href={`/produkt/${item.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100">
              <Image src={item.imageUrl} alt={item.name} fill sizes="96px" className="object-cover" />
            </Link>

            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between">
                <Link href={`/produkt/${item.slug}`} className="font-semibold hover:underline">
                  {item.name}
                </Link>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-sm text-brand-muted hover:text-brand-accent"
                  aria-label={`Ta bort ${item.name}`}
                >
                  Ta bort
                </button>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="h-8 w-8 rounded-md border border-gray-300 transition hover:bg-gray-50"
                    aria-label="Minska antal"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="h-8 w-8 rounded-md border border-gray-300 transition hover:bg-gray-50"
                    aria-label="Öka antal"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold">
                  {formatPrice(item.priceCents * item.quantity, item.currency)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between text-sm">
          <span>Delsumma</span>
          <span>{formatPrice(totalCents)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span>Frakt</span>
          <span>{shippingCents === 0 ? "Gratis" : formatPrice(shippingCents)}</span>
        </div>
        {shippingCents > 0 && (
          <p className="mt-1 text-xs text-brand-muted">
            Fri frakt vid köp över {formatPrice(49900)}.
          </p>
        )}
        <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold">
          <span>Totalt</span>
          <span>{formatPrice(totalCents + shippingCents)}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-6 w-full rounded-md bg-brand px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Tar dig till kassan…" : "Till kassan"}
        </button>
        {error && (
          <p className="mt-2 text-center text-sm text-brand-accent">{error}</p>
        )}
        <p className="mt-2 text-center text-xs text-brand-muted">
          Säker betalning via Stripe. Kortuppgifter hanteras av Stripe och rör aldrig vår server.
        </p>
      </div>
    </div>
  );
}
