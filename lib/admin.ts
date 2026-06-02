// Skydd för admin-sidor och admin-actions. Kontrollerar ADMIN-roll på servern.
// Returnerar/kastar så att obehöriga aldrig når admin-funktioner.
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

// För server components/sidor: redirectar om ej admin.
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/logga-in");
  if (user.role !== "ADMIN") redirect("/");
  return user;
}

// För server actions: kastar fel istället för redirect.
export async function assertAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Otillåten åtgärd. Endast administratörer.");
  }
  return user;
}
