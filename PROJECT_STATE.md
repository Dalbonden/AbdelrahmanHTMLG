# PROJECT_STATE.md — Shopen e-handelsplattform

> Uppdaterat: 2026-05-30  
> Branch: `claude/stoic-volta-kobAt`  
> Senaste commit: `f2f6576` — "Fas 1: Fundament för skalbar e-handel"

---

## Vad projektet är

En skalbar e-handelsplattform ("som Amazon") byggd med **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma + Postgres** och **Stripe** för betalningar. Neutralt webbshop-tema på svenska.

Projektet startade som en **statisk HTML/CSS-prototyp** (klädmärket "Freaky Fashion"). Prototypen finns kvar i `public/legacy/` som referens men är inte aktiv.

**Kunden/ägaren:** Abdelrahman (via Dalbonden på GitHub)  
**Repo:** `Dalbonden/AbdelrahmanHTMLG`

---

## Arkitektur och teknikval

| Lager      | Teknik                                      | Varför                                     |
|------------|---------------------------------------------|--------------------------------------------|
| Frontend   | Next.js 15 App Router, React 19, TypeScript | SEO, server components, skalbarhet         |
| Styling    | Tailwind CSS                                | Snabb, konsistent, mobilfirst              |
| Databas    | Postgres via Prisma ORM                     | Relationsdata, typsäkert schema             |
| Auth       | NextAuth v4 (EJ implementerat än)           | Inbyggt i Next.js-ekosystemet              |
| Betalning  | Stripe (EJ implementerat än)                | PCI-DSS-vänligt, Klarna-kompatibelt        |
| Kryptering | AES-256-GCM (`lib/crypto.ts`)               | Känslig data i vila (adress, telefon)      |

**Viktiga designbeslut:**
- Priser lagras i **ören (heltal)** — undviker flyttalsfel
- Kortdata rör **aldrig** vår server — allt via Stripe (PCI-DSS)
- AES-256-GCM används för känsliga personuppgifter, INTE kortdata
- `.env` gitignoreras alltid — `.env.example` dokumenterar alla nycklar

---

## Fas-plan (godkänd av användaren)

| Fas | Status | Innehåll |
|-----|--------|----------|
| **Fas 0 – Audit** | ✅ Klar | Kartlade befintlig kodbas, identifierade att det bara var HTML/CSS-prototyp |
| **Fas 1 – Fundament** | ✅ Klar (ej pushad) | Stack, schema, lib-helpers, startsida, komponenter |
| **Fas 2 – Produktkatalog** | ⏳ Nästa | `/produkter`, `/produkt/[slug]`, sök, kategorier, admin CRUD |
| **Fas 3 – Varukorg & konton** | ⏳ Väntar | Persistent varukorg, registrering/login, NextAuth |
| **Fas 4 – Kassa & betalning** | ⏳ Väntar | Stripe Checkout, ordrar, kvitton, webhooks |
| **Fas 5 – Säkerhet & härdning** | ⏳ Väntar | Rate limiting, input-validering, säkerhetsgenomgång |
| **Fas 6 – Deployment** | ⏳ Väntar | Hosting, CI/CD, produktions-checklista |

---

## Vad som är klart (Fas 1)

### Filer skapade
```
package.json              # Next.js 15, Prisma, Stripe, NextAuth, bcryptjs, zod
tsconfig.json
next.config.ts
tailwind.config.ts
postcss.config.mjs
next-env.d.ts
.gitignore                # .env skyddas
.env.example              # Mall för alla miljövariabler

prisma/schema.prisma      # Models: User, Category, Product, CartItem, Order, OrderItem
prisma/seed.ts            # 4 produkter, 2 kategorier, dev-adminkonto

lib/prisma.ts             # Singleton Prisma-klient
lib/money.ts              # formatPrice() — ören → "199 kr"
lib/crypto.ts             # encrypt()/decrypt() AES-256-GCM

app/globals.css           # Tailwind base
app/layout.tsx            # Root layout med SiteHeader + SiteFooter
app/page.tsx              # Startsida, hämtar produkter från DB, vänligt tomläge om DB saknas

components/SiteHeader.tsx # Header med logotyp, sök, nav
components/SiteFooter.tsx # Footer med kategorier, mina sidor, trygghet
components/ProductCard.tsx # Återanvändbart produktkort

public/tshirt.jpg         # Produktbild (från prototypen)
public/freakshirt.jpg     # Produktbild
public/fived.jpg          # Bannerbild
public/legacy/            # Original HTML/CSS-prototyp (referens)
README.md                 # Dokumentation för uppsättning och säkerhet
```

### Verifierat
- `npm run build` → ✅ grön (Prisma-felet i build-loggen är väntat/ofarligt utan DB)
- `npx tsc --noEmit` → ✅ inga TypeScript-fel
- 4 npm-sårbarheter rapporterades (3 moderate, 1 critical) — dessa bör åtgärdas med `npm audit fix` i Fas 5

---

## Känt problem: Push blockerad

**Symptom:** `git push` ger `403 Permission to Dalbonden/AbdelrahmanHTMLG.git denied`  
**Orsak:** Miljöns git-proxy kör i läs-bara-läge. GitHub-API:t (MCP) nekar också skrivning.  
**Commit som väntar:** `f2f6576` på `claude/stoic-volta-kobAt`  
**Lösning:** Ägaren måste ge sessionen/GitHub-appen **Contents: Read & write** mot repot.  
**Docs:** https://code.claude.com/docs/en/claude-code-on-the-web

---

## Miljövariabler som krävs

Se `.env.example` för fullständig mall. Kritiska:

```bash
DATABASE_URL              # Postgres-anslutning (t.ex. Neon, Supabase, Vercel Postgres)
NEXTAUTH_SECRET           # Generera: openssl rand -base64 32
NEXTAUTH_URL              # http://localhost:3000 (dev) / produktions-URL (prod)
STRIPE_SECRET_KEY         # sk_test_... (dev) / sk_live_... (prod)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
APP_ENCRYPTION_KEY        # Generera: openssl rand -base64 32 (måste vara 32 byte)
```

**Databas saknas än:** Inget DATABASE_URL är konfigurerat. För att sätta upp:
```bash
cp .env.example .env
# Fyll i DATABASE_URL
npm run db:push   # skapar tabeller
npm run db:seed   # fyller med produkter + adminkonto
```

Dev-admin efter seed: `admin@shopen.se` / `admin1234`

---

## Nästa session — fortsätt med Fas 2

Börja nytt kontext med:
> "Fortsätt med Fas 2 (Produktkatalog) enligt PROJECT_STATE.md. Läs den filen först."

### Fas 2 ska innehålla:
1. `/produkter` — produktlistsida med filter (kategori, prisintervall, sortering)
2. `/produkt/[slug]` — produktdetaljsida med "Lägg i varukorg"-knapp
3. `/kategori/[slug]` — kategorisida
4. `/sok?q=...` — sökresultat
5. `/admin/produkter` — admin: lista, lägg till, redigera, inaktivera produkter (skyddas av admin-roll)
6. API route: `GET /api/products`, `POST /api/admin/products`, `PATCH /api/admin/products/[id]`

### Komponenter att bygga i Fas 2:
- `ProductGrid` — återanvändbart grid
- `ProductFilter` — kategori/pris-filter (client component)
- `SearchResults` — sökresultat med debounce
- `AdminProductForm` — formulär för ny/redigera produkt
- `AddToCartButton` — client component (förbereder för Fas 3)

---

## Säkerhetsprinciper att hålla

- Kortdata → Stripe, aldrig vår server
- Lösenord → bcryptjs (cost factor 12 minimum)
- Känsliga personuppgifter → `lib/crypto.ts` encrypt() innan db-lagring
- API-routes → validera input med zod
- Admin-routes → kontrollera `session.user.role === "ADMIN"` serverside
- Miljövariabler → aldrig committa `.env`, alltid `.env.example`
