import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Skapa konto – Shopen" };

export default async function RegistreraPage() {
  const user = await getCurrentUser();
  if (user) redirect("/konto");

  return <AuthForm mode="register" />;
}
