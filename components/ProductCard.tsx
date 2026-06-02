import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/money";

type ProductCardProps = {
  slug: string;
  name: string;
  priceCents: number;
  currency: string;
  brand?: string | null;
  imageUrl: string;
};

// Återanvändbart produktkort. Används på startsida, listor och sökresultat.
export function ProductCard({
  slug,
  name,
  priceCents,
  currency,
  brand,
  imageUrl,
}: ProductCardProps) {
  return (
    <Link
      href={`/produkt/${slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 transition hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold">{name}</h3>
        <p className="mt-1 font-bold">{formatPrice(priceCents, currency)}</p>
        {brand && <p className="text-xs text-brand-muted">{brand}</p>}
      </div>
    </Link>
  );
}
