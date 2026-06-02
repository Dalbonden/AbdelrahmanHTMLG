// Delade datahämtningsfunktioner för produkter. Återanvänds av flera sidor
// (produktlista, produktsida, kategori, sök) så att logiken bara finns på ett ställe.
import { prisma } from "@/lib/prisma";

export type SortOption = "newest" | "price-asc" | "price-desc" | "name";

function orderBy(sort?: SortOption) {
  switch (sort) {
    case "price-asc":
      return { priceCents: "asc" as const };
    case "price-desc":
      return { priceCents: "desc" as const };
    case "name":
      return { name: "asc" as const };
    case "newest":
    default:
      return { createdAt: "desc" as const };
  }
}

export async function getAllProducts(sort?: SortOption) {
  return prisma.product.findMany({
    where: { active: true },
    orderBy: orderBy(sort),
    include: { category: true },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getRelatedProducts(categoryId: string | null, excludeId: string) {
  return prisma.product.findMany({
    where: {
      active: true,
      id: { not: excludeId },
      ...(categoryId ? { categoryId } : {}),
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function getProductsByCategory(categoryId: string, sort?: SortOption) {
  return prisma.product.findMany({
    where: { active: true, categoryId },
    orderBy: orderBy(sort),
    include: { category: true },
  });
}

export async function getAllCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function searchProducts(query: string) {
  const q = query.trim();
  if (!q) return [];
  // SQLite saknar 'mode: insensitive', men LIKE är skiftlägesokänsligt för ASCII.
  return prisma.product.findMany({
    where: {
      active: true,
      OR: [
        { name: { contains: q } },
        { description: { contains: q } },
        { brand: { contains: q } },
      ],
    },
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
}
