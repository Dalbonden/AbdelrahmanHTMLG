// Hjälpfunktioner för pengar. Vi lagrar alltid pris i ören (heltal)
// och formaterar först vid visning för att undvika flyttalsfel.

export function formatPrice(cents: number, currency = "SEK"): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
