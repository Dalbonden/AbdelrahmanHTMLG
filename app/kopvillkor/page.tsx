import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Köpvillkor – Shopen",
  description: "Köpvillkor för Shopen. Information om betalning, leverans, ångerrätt och reklamation.",
};

const LAST_UPDATED = "2026-05-30";

export default function KopvillkorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Köpvillkor</h1>
      <p className="mt-2 text-sm text-brand-muted">Senast uppdaterad: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Om oss</h2>
          <p>
            Shopen drivs av [FÖRETAGSNAMN AB], org.nr [ORG.NR], med säte i Sverige.
            Kontakt: <a href="mailto:kundservice@shopen.se" className="underline">kundservice@shopen.se</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Priser och betalning</h2>
          <ul className="ml-4 mt-2 list-disc space-y-2">
            <li>Alla priser anges i svenska kronor (SEK) inklusive moms (25 % för kläder och accessoarer).</li>
            <li>Betalning hanteras av <strong>Stripe Ireland Limited</strong>, ett PCI-DSS-certifierat betalningsföretag. Vi lagrar aldrig dina kortuppgifter.</li>
            <li>Tillgängliga betalmetoder visas i kassan och kan inkludera kort (Visa, Mastercard) och övriga metoder som Stripe erbjuder.</li>
            <li>Betalning debiteras när din order bekräftas.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Beställning och orderbekräftelse</h2>
          <p>
            En bindande köporder ingås när du mottar en orderbekräftelse via e-post.
            Vi förbehåller oss rätten att avboka en order vid felaktig prissättning,
            lagerbrist eller misstänkt bedrägeri. Du meddelas omgående och återbetalning
            sker inom 5 bankdagar.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Leverans</h2>
          <ul className="ml-4 mt-2 list-disc space-y-2">
            <li>Leverans sker inom Sverige om inget annat anges.</li>
            <li>Beräknad leveranstid anges vid kassan och är normalt 2–5 vardagar.</li>
            <li>Fri frakt vid köp över 499 kr. Under detta belopp tillkommer fraktkostnad enligt vad som anges i kassan.</li>
            <li>Risk för varan övergår till dig när du tagit emot den.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Ångerrätt (14 dagar)</h2>
          <div className="mt-2 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="font-semibold text-blue-900">Du har alltid 14 dagars ångerrätt.</p>
            <p className="mt-1 text-blue-800">
              Enligt <strong>Distansavtalslagen (2005:59)</strong> och EU-direktiv 2011/83/EU
              har du rätt att ångra ditt köp inom 14 dagar från det att du mottagit varan,
              utan att ange något skäl.
            </p>
          </div>
          <div className="mt-3 space-y-2">
            <p><strong>Så här gör du:</strong></p>
            <ol className="ml-4 list-decimal space-y-1">
              <li>Kontakta oss på <a href="mailto:kundservice@shopen.se" className="underline">kundservice@shopen.se</a> inom 14 dagar från mottagandet.</li>
              <li>Ange ditt ordernummer och vilka varor du vill returnera.</li>
              <li>Skicka tillbaka varan i ursprungligt skick och förpackning inom 14 dagar från din ångeranmälan.</li>
            </ol>
            <p className="mt-2">
              <strong>Återbetalning:</strong> Vi återbetalar köpesumman inklusive ordinarie
              leveranskostnad inom 14 dagar från att vi mottagit returen eller bevis på
              att den skickats. Vi använder samma betalmetod som vid köpet.
            </p>
            <p>
              <strong>Returfraktkostnaden</strong> betalas av dig om inget annat avtalats.
            </p>
            <p>
              <strong>Undantag:</strong> Ångerrätten gäller inte förseglade varor som av
              hygienskäl inte kan returneras efter öppnande, eller specialtillverkade varor.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Reklamation och fel</h2>
          <p>
            Enligt <strong>Konsumentköplagen (2022:260)</strong> har du rätt att reklamera
            en vara som är felaktig i tre år från köpet. Fel som uppstår inom ett år antas
            ha funnits vid leveransen. Kontakta oss på{" "}
            <a href="mailto:kundservice@shopen.se" className="underline">kundservice@shopen.se</a>{" "}
            med ditt ordernummer och en beskrivning av felet. Vid godkänd reklamation
            erbjuder vi reparation, omleverans eller återbetalning.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Garanti</h2>
          <p>
            Utöver den lagstadgade reklamationsrätten kan varor ha tillverkargaranti.
            Information om garanti anges i så fall i produktbeskrivningen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Personuppgifter</h2>
          <p>
            Vi behandlar dina personuppgifter i enlighet med GDPR och vår{" "}
            <a href="/integritetspolicy" className="underline">Integritetspolicy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">9. Tvistlösning</h2>
          <p>
            Vid tvist som vi inte kan lösa tillsammans kan du vända dig till{" "}
            <strong>Allmänna reklamationsnämnden (ARN)</strong>:{" "}
            <a href="https://www.arn.se" className="underline" target="_blank" rel="noopener noreferrer">arn.se</a>.
            Du kan också använda EU-kommissionens plattform för tvistlösning online (ODR):{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ec.europa.eu/consumers/odr
            </a>.
          </p>
          <p className="mt-2">
            Dessa villkor lyder under svensk lag. Tvist avgörs i svensk domstol.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">10. Kontakt</h2>
          <p>
            E-post: <a href="mailto:kundservice@shopen.se" className="underline">kundservice@shopen.se</a><br />
            Vi svarar inom 2 vardagar.
          </p>
        </section>

      </div>
    </div>
  );
}
