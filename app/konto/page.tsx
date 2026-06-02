import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mitt konto – Shopen",
};

// Platshållare. Inloggning och registrering byggs i Fas 3 (NextAuth/Auth.js).
export default function KontoPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Mitt konto</h1>
      <p className="mt-3 text-brand-muted">
        Inloggning och kundkonton är på väg. Här kommer du snart kunna logga in,
        se dina ordrar och hantera dina uppgifter.
      </p>
      <Link
        href="/produkter"
        className="mt-6 inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-50"
      >
        Fortsätt handla
      </Link>
    </div>
  );
}
