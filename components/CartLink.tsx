"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

// Varukorgsikon i headern med antal-bricka.
export function CartLink() {
  const { totalItems, ready } = useCart();

  return (
    <Link href="/varukorg" className="relative hover:text-brand-accent">
      Varukorg
      {ready && totalItems > 0 && (
        <span className="absolute -right-4 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-accent px-1 text-xs font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
