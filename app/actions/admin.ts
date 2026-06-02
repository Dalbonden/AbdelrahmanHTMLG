"use server";

// Server actions för produkthantering. Alla skyddade av assertAdmin().
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/admin";

// Pris matas in i kronor i formuläret, lagras i ören.
const productSchema = z.object({
  name: z.string().trim().min(1, "Ange ett namn.").max(120),
  slug: z
    .string()
    .trim()
    .min(1, "Ange en slug.")
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug får bara innehålla små bokstäver, siffror och bindestreck."),
  description: z.string().trim().min(1, "Ange en beskrivning."),
  priceKr: z.coerce.number().min(0, "Priset kan inte vara negativt."),
  brand: z.string().trim().max(80).optional(),
  imageUrl: z.string().trim().min(1, "Ange en bild-URL."),
  stock: z.coerce.number().int().min(0, "Lager kan inte vara negativt."),
  categoryId: z.string().trim().optional(),
  active: z.coerce.boolean().optional(),
});

export type AdminProductState = { error?: string } | undefined;

function parseForm(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    priceKr: formData.get("priceKr"),
    brand: formData.get("brand") || undefined,
    imageUrl: formData.get("imageUrl"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId") || undefined,
    active: formData.get("active") === "on",
  });
}

export async function createProductAction(
  _prev: AdminProductState,
  formData: FormData
): Promise<AdminProductState> {
  await assertAdmin();

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Ogiltiga uppgifter." };
  }
  const d = parsed.data;

  const existing = await prisma.product.findUnique({ where: { slug: d.slug } });
  if (existing) return { error: "Det finns redan en produkt med den slugen." };

  await prisma.product.create({
    data: {
      name: d.name,
      slug: d.slug,
      description: d.description,
      priceCents: Math.round(d.priceKr * 100),
      brand: d.brand || null,
      imageUrl: d.imageUrl,
      stock: d.stock,
      active: d.active ?? true,
      categoryId: d.categoryId || null,
    },
  });

  revalidatePath("/admin/produkter");
  revalidatePath("/produkter");
  redirect("/admin/produkter");
}

export async function updateProductAction(
  id: string,
  _prev: AdminProductState,
  formData: FormData
): Promise<AdminProductState> {
  await assertAdmin();

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Ogiltiga uppgifter." };
  }
  const d = parsed.data;

  // Slug måste vara unik (men får vara samma som produktens egen)
  const slugOwner = await prisma.product.findUnique({ where: { slug: d.slug } });
  if (slugOwner && slugOwner.id !== id) {
    return { error: "En annan produkt använder redan den slugen." };
  }

  await prisma.product.update({
    where: { id },
    data: {
      name: d.name,
      slug: d.slug,
      description: d.description,
      priceCents: Math.round(d.priceKr * 100),
      brand: d.brand || null,
      imageUrl: d.imageUrl,
      stock: d.stock,
      active: d.active ?? true,
      categoryId: d.categoryId || null,
    },
  });

  revalidatePath("/admin/produkter");
  revalidatePath("/produkter");
  revalidatePath(`/produkt/${d.slug}`);
  redirect("/admin/produkter");
}

// Snabb växling av aktiv-status direkt från listan.
export async function toggleProductActiveAction(id: string): Promise<void> {
  await assertAdmin();
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return;
  await prisma.product.update({
    where: { id },
    data: { active: !product.active },
  });
  revalidatePath("/admin/produkter");
  revalidatePath("/produkter");
}
