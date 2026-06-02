# PROJECT_STATE.md — Shopen e-handelsplattform

> Uppdaterat: 2026-05-30
> Branch: `claude/stoic-volta-kobAt`
> Lokala commits (EJ pushade): `f2f6576` (Fas 1), `d0819d9` (PROJECT_STATE)

---

## Hur du startar en ny session

1. Peka Claude Code mot detta repo.
2. Säg: **"Läs PROJECT_STATE.md först, fortsätt sedan därifrån."**
3. Standardnästa steg är **Fas 2 (Produktkatalog)** — se längst ned.

---

## Vad detta projekt är

En **skalbar e-handelsplattform** ("som Amazon") på svenska. Byggd från grunden
med **Next.js 15 (App Router) + TypeScript + Tailwind + Prisma/Postgres + Stripe**.

Projektet startade som en statisk HTML/CSS-prototyp (klädmärket "Freaky Fashion").
Den gamla prototypen ligger kvar i `public/legacy/` som referens — den är **inte**
den aktiva appen.

**Tema:** Neutral webbshop (valt av ägaren). **Språk:** Allt på svenska.
**Ägare/repo:** `Dalbonden/AbdelrahmanHTMLG`.

> OBS: Den ursprungliga uppdragsbeskrivningen nämnde "hårsalong med React-backend
> och bokningsflöde". Det stämde INTE med verkligheten — repot var bara statisk
> HTML utan backend. Vi bygger e-handel enligt ägarens senare beslut, inte salong.

---

## Current frontend status

✅ **Fungerar (Fas 1 klar):**
- Next.js App Router uppsatt, `npm run build` grön, `tsc --noEmit` grön.
- Root layout (`app/layout.tsx`) med header + footer.
- Startsida (`app/page.tsx`) — databasdriven, visar populära produkter, har
  vänligt tomläge om DB saknas (kraschar inte).
- Återanvändbara komponenter: `SiteHeader`, `SiteFooter`, `ProductCard`.
- Responsiv design (mobilfirst, Tailwind).

⏳ **Finns ännu inte (länkar i header/footer pekar dit men sidorna saknas):**
- `/produkter`, `/produkt/[slug]`, `/kategori/[slug]`, `/sok`, `/varukorg`, `/konto`.

## Current backend status

✅ **Fungerar:**
- Prisma-schema komplett (`prisma/schema.prisma`): User, Category, Product,
  CartItem, Order, OrderItem + enums Role/OrderStatus.
- Singleton Prisma-klient (`lib/prisma.ts`).
- Seed-skript (`prisma/seed.ts`) — 4 produkter, 2 kategorier, dev-admin.
- Hjälpbibliotek: `lib/money.ts` (pris i ören), `lib/crypto.ts` (AES-256-GCM).

⏳ **Finns ännu inte:**
- Inga API-routes/route handlers ännu.
- Ingen autentisering kopplad (NextAuth är installerat men ej konfigurerat).
- Ingen Stripe-integration ännu (paketet finns i package.json).
- **Ingen databas är ansluten** — `DATABASE_URL` är inte satt. Appen bygger ändå
  tack vare felhanteringen, men visar tomläge tills DB kopplas.

## Admin panel status

⏳ **Inte byggd i nya appen ännu.** Den gamla statiska admin-prototypen finns i
`public/legacy/` (admin.html, admin/products/...) men är inte kopplad till något.
Riktig admin (skyddad av ADMIN-roll, sparar till DB) planeras i Fas 2.

## Booking/contact flow status

❌ **Finns inte, och planeras inte** (detta är e-handel, inte salong). Om bokning/
kontakt ska finnas måste det beslutas separat med ägaren.

---

## Security fixes already done

Detta är ett nytt bygge, så "fixar" = inbyggda säkerhetsprinciper från start:
- **Kortdata rör aldrig servern** — designat för Stripe (PCI-DSS-vänligt).
- **`.gitignore` skyddar `.env`** — bara `.env.example` (utan hemligheter) committas.
- **AES-256-GCM** (`lib/crypto.ts`) för känslig persondata i vila — med tydlig
  kommentar att det ALDRIG används för kortuppgifter.
- **Lösenord** hashas med bcryptjs (cost 12) i seed — mönster för framtida auth.
- **Priser i ören (heltal)** — undviker flyttalsfel i pengar.

## Bugs already fixed

- **Build-krasch när DB saknas:** Startsidan kastade fel utan `DATABASE_URL`.
  Fixat genom `getPopularProducts()` med try/catch som returnerar tomläge.
- **ESLint `prefer-const`:** Refaktorerade startsidans datahämtning till en
  separat funktion så build/lint blev grön.

## Known remaining issues

- **Push blockerad:** `git push` → 403 (git-proxy read-only). GitHub MCP API →
  403 "Resource not accessible by integration". **Ägaren måste ge sessionen
  Contents: Read & write** mot repot. 2 commits väntar lokalt.
- **npm-sårbarheter:** 4 rapporterade vid install (3 moderate, 1 critical) —
  bör granskas/åtgärdas i Fas 5 (`npm audit`).
- **Ingen databas ansluten** — butiken är tom tills `DATABASE_URL` sätts + seed körs.
- **Döda länkar** i header/footer tills Fas 2-sidorna byggs.

---

## Files/folders that matter most

```
app/page.tsx              # Startsida (databasdriven, tomläge-säker)
app/layout.tsx            # Root layout
components/                # SiteHeader, SiteFooter, ProductCard (återanvändbara)
lib/prisma.ts             # DB-klient (singleton)
lib/money.ts              # formatPrice() — ören → "199 kr"
lib/crypto.ts             # AES-256-GCM (känslig data, ALDRIG kort)
prisma/schema.prisma      # Hela datamodellen — START HÄR vid datafrågor
prisma/seed.ts            # Demodata + dev-admin
.env.example              # Alla miljövariabler som krävs
package.json              # Scripts: dev, build, db:push, db:seed
public/legacy/            # Gammal HTML-prototyp (referens, ej aktiv)
README.md                 # Uppsättningsinstruktioner
```

## Important instructions for future Claude sessions

- **Arbetssätt:** Förstå först, förklara plan innan kodändring, skydda det som
  fungerar, var ärlig om risker. Allt UI-språk på **svenska**.
- **Pris alltid i ören (heltal)** — använd `formatPrice()` vid visning.
- **Kortbetalning endast via Stripe** — lagra/kryptera aldrig kortdata själv.
- **Validera all input** i API-routes med zod. Admin-routes: kontrollera
  `role === "ADMIN"` på servern.
- **Hemligheter** bara i `.env` (gitignored), aldrig i kod eller commits.
- Kör `npm run build` + `tsc --noEmit` innan något kallas klart.

## What should NOT be changed without my approval

- **Datamodellen** (`prisma/schema.prisma`) — ändra inte fält/relationer utan godkännande.
- **Säkerhetsval:** Stripe för betalning, bcrypt för lösenord, AES för persondata.
- **Stacken** (Next.js/Prisma/Postgres/Stripe) — byt inte utan beslut.
- **`public/legacy/`** — radera inte; det är referensmaterial.
- **Temat** (neutral webbshop) — gör inte om till annat tema utan godkännande.

## Next recommended steps (Fas 2 – Produktkatalog)

1. Anslut en Postgres-DB (Neon/Supabase/Vercel), sätt `DATABASE_URL`,
   kör `npm run db:push` + `npm run db:seed`.
2. Bygg `/produkter` (lista + filter), `/produkt/[slug]` (detalj),
   `/kategori/[slug]`, `/sok?q=`.
3. Bygg admin-CRUD `/admin/produkter` (skyddad av ADMIN-roll).
4. API-routes: `GET /api/products`, `POST/PATCH /api/admin/products`.
5. Nya komponenter: `ProductGrid`, `ProductFilter`, `SearchResults`,
   `AdminProductForm`, `AddToCartButton`.

Därefter: Fas 3 (varukorg + konton), Fas 4 (Stripe-kassa), Fas 5 (säkerhetshärdning),
Fas 6 (deployment).
