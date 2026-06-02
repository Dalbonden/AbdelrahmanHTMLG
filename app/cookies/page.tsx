import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsReset } from "@/components/CookieSettingsReset";

export const metadata: Metadata = {
  title: "Cookiepolicy – Shopen",
  description: "Information om vilka cookies Shopen använder och hur du hanterar dina val.",
};

const LAST_UPDATED = "2026-05-30";

export default function CookiepolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Cookiepolicy</h1>
      <p className="mt-2 text-sm text-brand-muted">Senast uppdaterad: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <h2 className="text-lg font-semibold text-gray-900">Vad är cookies?</h2>
          <p className="mt-2">
            Cookies är små textfiler som lagras i din webbläsare när du besöker en webbplats.
            De används för att webbplatsen ska fungera korrekt, för att komma ihåg dina
            preferenser och för att samla in statistik.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">Vilka cookies vi använder</h2>

          <div className="mt-4 space-y-6">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Nödvändiga cookies</h3>
                <span className="rounded-full bg-gray-900 px-2 py-0.5 text-xs text-white">Alltid aktiva</span>
              </div>
              <p className="mt-2 text-xs text-brand-muted">
                Dessa cookies krävs för att butiken ska fungera och kan inte stängas av.
              </p>
              <table className="mt-3 w-full border-collapse text-xs">
                <thead>
                  <tr className="border-b text-left text-brand-muted">
                    <th className="pb-1 pr-3">Cookie</th>
                    <th className="pb-1 pr-3">Syfte</th>
                    <th className="pb-1">Livslängd</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-1.5 pr-3 font-mono">next-auth.session-token</td>
                    <td className="py-1.5 pr-3">Håller dig inloggad</td>
                    <td className="py-1.5">Session / 30 dagar</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-3 font-mono">__stripe_mid</td>
                    <td className="py-1.5 pr-3">Bedrägeriskydd (Stripe)</td>
                    <td className="py-1.5">1 år</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-3 font-mono">__stripe_sid</td>
                    <td className="py-1.5 pr-3">Sessionsskydd (Stripe)</td>
                    <td className="py-1.5">30 minuter</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-3 font-mono">shopen_cookie_consent</td>
                    <td className="py-1.5 pr-3">Sparar dina cookie-val (localStorage)</td>
                    <td className="py-1.5">1 år</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Analyscookies</h3>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs">Kräver samtycke</span>
              </div>
              <p className="mt-2 text-xs text-brand-muted">
                Hjälper oss förstå hur besökare använder butiken. Inga uppgifter kopplas till din identitet.
              </p>
              <p className="mt-2 text-xs italic text-brand-muted">Inga analyscookies är aktiverade för tillfället.</p>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Marknadsföringscookies</h3>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs">Kräver samtycke</span>
              </div>
              <p className="mt-2 text-xs text-brand-muted">
                Används för att visa relevanta annonser på andra webbplatser.
              </p>
              <p className="mt-2 text-xs italic text-brand-muted">Inga marknadsföringscookies är aktiverade för tillfället.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">Hantera dina val</h2>
          <p className="mt-2">
            Du kan när som helst återställa dina cookie-inställningar. Bannern visas
            då igen och du kan göra ett nytt val.
          </p>
          <CookieSettingsReset />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">Mer information</h2>
          <p className="mt-2">
            Läs vår fullständiga{" "}
            <Link href="/integritetspolicy" className="underline">Integritetspolicy</Link>{" "}
            för information om hur vi behandlar dina personuppgifter. Frågor?{" "}
            <a href="mailto:privacy@shopen.se" className="underline">privacy@shopen.se</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
