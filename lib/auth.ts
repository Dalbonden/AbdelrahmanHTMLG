// Lättviktig, säker sessionshantering utan externa auth-bibliotek.
// Sessionen är en HMAC-signerad token i en httpOnly-cookie:
//   payload = base64url(JSON{ userId, exp })
//   token   = payload + "." + base64url(HMAC_SHA256(payload, secret))
// Servern kan verifiera token utan databasuppslag, men kan inte förfalskas
// utan hemligheten. Lösenord hashas separat med bcrypt.
import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "shopen_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 dagar

function getSecret(): string {
  const secret =
    process.env.SESSION_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    process.env.APP_ENCRYPTION_KEY;
  if (!secret) {
    throw new Error(
      "Ingen sessionshemlighet satt (SESSION_SECRET / NEXTAUTH_SECRET)."
    );
  }
  return secret;
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sign(payload: string): string {
  return base64url(
    crypto.createHmac("sha256", getSecret()).update(payload).digest()
  );
}

function createToken(userId: string): string {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = base64url(JSON.stringify({ userId, exp }));
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string): { userId: string } | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  // Tidskonstant jämförelse för att undvika timing-attacker
  const expected = sign(payload);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
    if (typeof data.userId !== "string" || typeof data.exp !== "number") return null;
    if (data.exp < Math.floor(Date.now() / 1000)) return null; // utgången
    return { userId: data.userId };
  } catch {
    return null;
  }
}

// Sätter sessionscookien (anropas efter lyckad inloggning/registrering).
export async function createSession(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createToken(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// Returnerar inloggad användare (utan lösenordshash) eller null.
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const verified = verifyToken(token);
  if (!verified) return null;

  const user = await prisma.user.findUnique({
    where: { id: verified.userId },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  return user;
}
