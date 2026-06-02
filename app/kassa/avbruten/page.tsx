import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Betalning avbruten – Shopen",
};

export default function AvbrutenPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Betalningen avbröts</h1>
      <p className="mt-2 text-brand-muted">
        Ingen betalning genomfördes. Dina varor ligger kvar i varukorgen.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/varukorg"
          className="rounded-md bg-brand px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Tillbaka till varukorgen
        </Link>
        <Link
          href="/produkter"
          className="rounded-md border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-50"
        >
          Fortsätt handla
        </Link>
      </div>
    </div>
  );
}
