"use client";

// Sorteringsväljare för produktlistor. Uppdaterar URL:en (?sort=...) så att
// servern kan rendera om listan sorterad.
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "newest";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-brand-muted">Sortera:</span>
      <select
        value={current}
        onChange={handleChange}
        className="rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-brand focus:outline-none"
      >
        <option value="newest">Nyast</option>
        <option value="price-asc">Pris: lågt till högt</option>
        <option value="price-desc">Pris: högt till lågt</option>
        <option value="name">Namn (A–Ö)</option>
      </select>
    </label>
  );
}
