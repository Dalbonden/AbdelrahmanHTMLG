"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

type Props = {
  product: {
    productId: string;
    slug: string;
    name: string;
    priceCents: number;
    currency: string;
    imageUrl: string;
  };
  stock: number;
};

// Knapp för att lägga produkt i varukorgen. Visar kort bekräftelse.
export function AddToCartButton({ product, stock }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (stock <= 0) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-md bg-gray-200 px-6 py-3 font-semibold text-gray-500"
      >
        Slut i lager
      </button>
    );
  }

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full rounded-md bg-brand px-6 py-3 font-semibold text-white transition hover:opacity-90"
    >
      {added ? "✓ Tillagd i varukorgen" : "Lägg i varukorg"}
    </button>
  );
}
