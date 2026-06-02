"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartProvider";

// Tömmer varukorgen när komponenten visas (efter genomförd betalning).
export function ClearCartOnMount() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
