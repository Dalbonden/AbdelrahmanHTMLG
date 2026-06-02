import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Logga in – Shopen" };

export default async function LoggaInPage() {
  // Redan inloggad? Skicka till kontot.
  const user = await getCurrentUser();
  if (user) redirect("/konto");

  return <AuthForm mode="login" />;
}
