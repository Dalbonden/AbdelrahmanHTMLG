import Link from "next/link";
import { CartLink } from "@/components/CartLink";
import { getCurrentUser } from "@/lib/auth";

// Sidhuvud med logotyp, sök och navigation. Visar "Mitt konto" om inloggad,
// annars "Logga in". Server component – läser sessionen direkt.
export async function SiteHeader() {
  let user = null;
  try {
    user = await getCurrentUser();
  } catch {
    user = null;
  }

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Shopen
        </Link>

        <form action="/sok" className="order-3 w-full sm:order-2 sm:max-w-sm">
          <input
            type="text"
            name="q"
            placeholder="Sök produkt"
            aria-label="Sök produkt"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </form>

        <nav className="order-2 flex items-center gap-5 text-sm font-medium sm:order-3">
          <Link href="/produkter" className="hover:text-brand-accent">
            Produkter
          </Link>
          <CartLink />
          {user ? (
            <Link href="/konto" className="hover:text-brand-accent">
              Mitt konto
            </Link>
          ) : (
            <Link href="/logga-in" className="hover:text-brand-accent">
              Logga in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
