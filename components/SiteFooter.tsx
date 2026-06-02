import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Shopping
          </h2>
          <ul className="space-y-2 text-sm text-brand-muted">
            <li>
              <Link href="/produkter" className="hover:text-brand">
                Alla produkter
              </Link>
            </li>
            <li>
              <Link href="/kategori/klader" className="hover:text-brand">
                Kläder
              </Link>
            </li>
            <li>
              <Link href="/kategori/accessoarer" className="hover:text-brand">
                Accessoarer
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Mina sidor
          </h2>
          <ul className="space-y-2 text-sm text-brand-muted">
            <li>
              <Link href="/konto" className="hover:text-brand">
                Mitt konto
              </Link>
            </li>
            <li>
              <Link href="/konto/ordrar" className="hover:text-brand">
                Mina ordrar
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Trygg handel
          </h2>
          <ul className="space-y-2 text-sm text-brand-muted">
            <li>Säkra betalningar via Stripe</li>
            <li>Snabb leverans</li>
            <li>Fri retur inom 14 dagar</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-4 text-center text-xs text-brand-muted">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <span>© {new Date().getFullYear()} Shopen</span>
          <Link href="/integritetspolicy" className="hover:text-brand hover:underline">Integritetspolicy</Link>
          <Link href="/kopvillkor" className="hover:text-brand hover:underline">Köpvillkor</Link>
          <Link href="/cookies" className="hover:text-brand hover:underline">Cookiepolicy</Link>
        </div>
      </div>
    </footer>
  );
}
