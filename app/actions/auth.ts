"use server";

// Server actions för registrering, inloggning och utloggning.
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/auth";

const registerSchema = z.object({
  name: z.string().trim().min(1, "Ange ditt namn.").max(80),
  email: z.string().trim().toLowerCase().email("Ange en giltig e-postadress."),
  password: z.string().min(8, "Lösenordet måste vara minst 8 tecken."),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Ange en giltig e-postadress."),
  password: z.string().min(1, "Ange ditt lösenord."),
});

export type AuthState = { error?: string } | undefined;

export async function registerAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Ogiltiga uppgifter." };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Det finns redan ett konto med den e-postadressen." };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, role: "CUSTOMER" },
  });

  await createSession(user.id);
  redirect("/konto");
}

export async function loginAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Ogiltiga uppgifter." };
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });

  // Samma felmeddelande oavsett om e-post eller lösenord är fel
  // (avslöjar inte om en e-postadress finns registrerad).
  const genericError = { error: "Fel e-post eller lösenord." };

  if (!user || user.passwordHash === "-") return genericError;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return genericError;

  await createSession(user.id);
  redirect("/konto");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}
