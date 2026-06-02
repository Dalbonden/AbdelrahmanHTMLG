# Shopen – skalbar e-handelsplattform

Modern webbshop byggd med **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma + Postgres** och **Stripe** för betalningar.

> Status: **Fas 1 – Fundament** är klar. Produktkatalog, varukorg, konton och
> betalning byggs i kommande faser.

## Teknisk stack

| Lager      | Teknik                          |
| ---------- | ------------------------------- |
| Frontend   | Next.js 15, React 19, Tailwind  |
| Backend    | Next.js Route Handlers / Server Actions |
| Databas    | Postgres via Prisma ORM         |
| Auth       | NextAuth (kommande fas)         |
| Betalning  | Stripe (kommande fas)           |
| Kryptering | AES-256-GCM för känslig data i vila |

## Kom igång (lokalt)

1. **Installera beroenden**
   ```bash
   npm install
   ```

2. **Skapa miljöfil**
   ```bash
   cp .env.example .env
   ```
   Fyll i `DATABASE_URL` (Postgres) och generera nycklar:
   ```bash
   openssl rand -base64 32   # till NEXTAUTH_SECRET
   openssl rand -base64 32   # till APP_ENCRYPTION_KEY
   ```

3. **Sätt upp databasen**
   ```bash
   npm run db:push     # skapar tabeller från prisma/schema.prisma
   npm run db:seed     # fyller butiken med produkter + adminkonto
   ```

4. **Starta utvecklingsservern**
   ```bash
   npm run dev
   ```
   Öppna http://localhost:3000

### Dev-adminkonto (efter seed)
`admin@shopen.se` / `admin1234` — byt lösenord innan produktion.

## Säkerhetsprinciper

- **Kortuppgifter lagras aldrig.** All kortbetalning sker via Stripe; kortdata
  rör aldrig vår server (PCI-DSS-vänligt).
- **Hemligheter** ligger i `.env` (gitignored). Endast `.env.example` committas.
- **AES-256-GCM** (`lib/crypto.ts`) används för känslig data i vila, t.ex.
  telefonnummer och leveransadress – inte för kort.
- **Priser** lagras i ören (heltal) för att undvika flyttalsfel.

## Projektstruktur

```
app/            # Sidor och route handlers (App Router)
components/      # Återanvändbara UI-komponenter
lib/            # Delad logik (prisma, crypto, money)
prisma/         # schema.prisma + seed.ts
public/         # Statiska tillgångar (bilder)
public/legacy/  # Den ursprungliga statiska prototypen (referens)
```
