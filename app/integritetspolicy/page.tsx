import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integritetspolicy – Shopen",
  description: "Hur Shopen samlar in, använder och skyddar dina personuppgifter enligt GDPR.",
};

// Senast uppdaterad – uppdatera detta datum när policyn ändras.
const LAST_UPDATED = "2026-05-30";

export default function IntegritetspolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Integritetspolicy</h1>
      <p className="mt-2 text-sm text-brand-muted">Senast uppdaterad: {LAST_UPDATED}</p>

      <div className="prose prose-sm mt-8 max-w-none space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Personuppgiftsansvarig</h2>
          <p>
            Shopen är personuppgiftsansvarig för behandlingen av dina personuppgifter.
            Vid frågor om hur vi hanterar dina uppgifter, kontakta oss på:{" "}
            <a href="mailto:privacy@shopen.se" className="underline">privacy@shopen.se</a>.
          </p>
          <p className="mt-2">
            Organisationsnummer: [FYLL I ORG.NR]<br />
            Adress: [FYLL I ADRESS], Sverige
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Vilka uppgifter vi samlar in</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li><strong>Kontouppgifter:</strong> namn, e-postadress (vid registrering)</li>
            <li><strong>Orderuppgifter:</strong> leveransadress, orderhistorik</li>
            <li><strong>Betalningsuppgifter:</strong> vi lagrar <em>inga</em> kortuppgifter — betalning hanteras av Stripe Ireland Limited (PCI-DSS-certifierat)</li>
            <li><strong>Tekniska uppgifter:</strong> IP-adress, webbläsartyp, sessionscookies (nödvändiga för butiksfunction)</li>
            <li><strong>Frivilliga uppgifter:</strong> telefonnummer (om du väljer att ange det)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Varför vi behandlar dina uppgifter</h2>
          <div className="overflow-x-auto">
            <table className="mt-2 w-full border-collapse text-xs">
              <thead>
                <tr className="border-b bg-gray-50 text-left">
                  <th className="p-2 font-semibold">Ändamål</th>
                  <th className="p-2 font-semibold">Rättslig grund (GDPR)</th>
                  <th className="p-2 font-semibold">Lagringstid</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-2">Hantera och leverera din order</td>
                  <td className="p-2">Fullgörande av avtal (art. 6.1 b)</td>
                  <td className="p-2">7 år (bokföringslagen)</td>
                </tr>
                <tr>
                  <td className="p-2">Kundkonto och inloggning</td>
                  <td className="p-2">Fullgörande av avtal (art. 6.1 b)</td>
                  <td className="p-2">Tills kontot raderas</td>
                </tr>
                <tr>
                  <td className="p-2">Skicka orderbekräftelse och kvitto</td>
                  <td className="p-2">Fullgörande av avtal (art. 6.1 b)</td>
                  <td className="p-2">7 år (bokföringslagen)</td>
                </tr>
                <tr>
                  <td className="p-2">Nyhetsbrev och erbjudanden</td>
                  <td className="p-2">Samtycke (art. 6.1 a)</td>
                  <td className="p-2">Tills samtycke återkallas</td>
                </tr>
                <tr>
                  <td className="p-2">Analys och förbättring av tjänsten</td>
                  <td className="p-2">Berättigat intresse (art. 6.1 f)</td>
                  <td className="p-2">26 månader</td>
                </tr>
                <tr>
                  <td className="p-2">Uppfylla rättsliga skyldigheter</td>
                  <td className="p-2">Rättslig förpliktelse (art. 6.1 c)</td>
                  <td className="p-2">Enligt lag</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Delning av uppgifter</h2>
          <p>Vi säljer aldrig dina personuppgifter. Vi delar uppgifter endast med:</p>
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li><strong>Stripe Ireland Limited</strong> — betalningshantering (PCI-DSS). Stripe är personuppgiftsbiträde och regleras av EU:s standardavtalsklausuler.</li>
            <li><strong>Fraktbolag</strong> — namn och leveransadress för att genomföra leveransen.</li>
            <li><strong>Myndigheter</strong> — om vi är skyldiga enligt lag (t.ex. Skatteverket).</li>
          </ul>
          <p className="mt-2">
            Samtliga tredjepartsleverantörer är bundna av personuppgiftsbiträdesavtal (DPA)
            och behandlar uppgifter enbart enligt våra instruktioner.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Överföring utanför EU/EES</h2>
          <p>
            Stripe är ett amerikanskt företag. Uppgifter som överförs till USA skyddas av
            EU:s standardavtalsklausuler (SCC) enligt GDPR art. 46.2 c. Stripes
            dataskyddsavtal finns tillgängligt på stripe.com/privacy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Dina rättigheter</h2>
          <p>Enligt GDPR har du rätt att:</p>
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li><strong>Tillgång (art. 15)</strong> — begära en kopia av dina uppgifter</li>
            <li><strong>Rättelse (art. 16)</strong> — begära att felaktiga uppgifter korrigeras</li>
            <li><strong>Radering (art. 17)</strong> — begära att uppgifter raderas ("rätten att bli glömd")</li>
            <li><strong>Begränsning (art. 18)</strong> — begära att behandlingen begränsas</li>
            <li><strong>Dataportabilitet (art. 20)</strong> — få ut dina uppgifter i maskinläsbart format</li>
            <li><strong>Invändning (art. 21)</strong> — invända mot behandling baserad på berättigat intresse</li>
            <li><strong>Återkalla samtycke</strong> — när som helst, utan att det påverkar tidigare behandling</li>
          </ul>
          <p className="mt-2">
            Skicka din begäran till{" "}
            <a href="mailto:privacy@shopen.se" className="underline">privacy@shopen.se</a>.
            Vi svarar inom 30 dagar.
          </p>
          <p className="mt-2">
            Du har också rätt att lämna klagomål till{" "}
            <strong>Integritetsskyddsmyndigheten (IMY)</strong>:{" "}
            <a href="https://www.imy.se" className="underline" target="_blank" rel="noopener noreferrer">imy.se</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Säkerhet</h2>
          <p>
            Vi skyddar dina uppgifter med tekniska och organisatoriska åtgärder:
            kryptering i vila (AES-256-GCM), krypterade anslutningar (TLS/HTTPS),
            och principen om minsta möjliga behörighet. Lösenord lagras alltid
            som säkra hashvärden (bcrypt).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Cookies</h2>
          <p>
            Vi använder cookies. Läs vår{" "}
            <Link href="/cookies" className="underline">Cookiepolicy</Link>{" "}
            för detaljerad information om vilka cookies vi använder och hur.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">9. Ändringar i policyn</h2>
          <p>
            Vi kan komma att uppdatera denna policy. Väsentliga ändringar kommuniceras
            via e-post eller tydlig notis på webbplatsen minst 30 dagar innan de träder
            i kraft. Datumet längst upp visar när policyn senast uppdaterades.
          </p>
        </section>

      </div>
    </div>
  );
}
