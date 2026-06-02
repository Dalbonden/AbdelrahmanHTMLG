import Link from "next/link";

// Sidhuvud med logotyp, sök och navigation. Återanvänder känslan från den
// ursprungliga designen men i en återanvändbar komponent.
export function SiteHeader() {
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
          <Link href="/varukorg" className="hover:text-brand-accent">
            Varukorg
          </Link>
          <Link href="/konto" className="hover:text-brand-accent">
            Mitt konto
          </Link>
        </nav>
      </div>
    </header>
  );
}
