"use client";

// Formulär för att skapa/redigera produkt. Återanvänds av både ny- och
// redigera-sidan. Visar serverfel via useActionState.
import { useActionState } from "react";
import Link from "next/link";
import type { AdminProductState } from "@/app/actions/admin";

type Category = { id: string; name: string };

type ProductDefaults = {
  name?: string;
  slug?: string;
  description?: string;
  priceKr?: number;
  brand?: string | null;
  imageUrl?: string;
  stock?: number;
  categoryId?: string | null;
  active?: boolean;
};

export function AdminProductForm({
  action,
  categories,
  defaults = {},
  submitLabel,
}: {
  action: (prev: AdminProductState, formData: FormData) => Promise<AdminProductState>;
  categories: Category[];
  defaults?: ProductDefaults;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<AdminProductState, FormData>(
    action,
    undefined
  );

  const input =
    "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Namn</label>
        <input id="name" name="name" defaultValue={defaults.name} required className={input} />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium">Slug (URL)</label>
        <input id="slug" name="slug" defaultValue={defaults.slug} required placeholder="t-ex-svart-t-shirt" className={input} />
        <p className="mt-1 text-xs text-brand-muted">Små bokstäver, siffror och bindestreck.</p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">Beskrivning</label>
        <textarea id="description" name="description" defaultValue={defaults.description} required rows={4} className={input} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="priceKr" className="block text-sm font-medium">Pris (kr)</label>
          <input id="priceKr" name="priceKr" type="number" step="0.01" min="0" defaultValue={defaults.priceKr} required className={input} />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium">Lager (antal)</label>
          <input id="stock" name="stock" type="number" min="0" defaultValue={defaults.stock ?? 0} required className={input} />
        </div>
      </div>

      <div>
        <label htmlFor="brand" className="block text-sm font-medium">Märke (valfritt)</label>
        <input id="brand" name="brand" defaultValue={defaults.brand ?? ""} className={input} />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium">Bild-URL</label>
        <input id="imageUrl" name="imageUrl" defaultValue={defaults.imageUrl ?? "/tshirt.jpg"} required className={input} />
        <p className="mt-1 text-xs text-brand-muted">T.ex. /tshirt.jpg eller en full https-länk.</p>
      </div>

      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium">Kategori</label>
        <select id="categoryId" name="categoryId" defaultValue={defaults.categoryId ?? ""} className={input}>
          <option value="">Ingen kategori</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked={defaults.active ?? true} className="h-4 w-4 accent-brand" />
        Aktiv (visas i butiken)
      </label>

      {state?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-brand-accent">{state.error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending} className="rounded-md bg-brand px-5 py-2.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-60">
          {pending ? "Sparar…" : submitLabel}
        </button>
        <Link href="/admin/produkter" className="rounded-md border border-gray-300 px-5 py-2.5 font-semibold transition hover:bg-gray-50">
          Avbryt
        </Link>
      </div>
    </form>
  );
}
