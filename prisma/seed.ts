// Seed-data så butiken har riktiga produkter direkt vid första uppstart.
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Kategorier ---
  const kläder = await prisma.category.upsert({
    where: { slug: "klader" },
    update: {},
    create: { name: "Kläder", slug: "klader" },
  });
  const accessoarer = await prisma.category.upsert({
    where: { slug: "accessoarer" },
    update: {},
    create: { name: "Accessoarer", slug: "accessoarer" },
  });

  // --- Produkter ---
  const products = [
    {
      name: "Svart T-Shirt",
      slug: "svart-t-shirt",
      description:
        "Klassisk svart t-shirt i 100% ekologisk bomull. Skön passform, håller form och färg tvätt efter tvätt.",
      priceCents: 19900,
      brand: "Basics",
      imageUrl: "/tshirt.jpg",
      stock: 50,
      categoryId: kläder.id,
    },
    {
      name: "Oversize Hoodie",
      slug: "oversize-hoodie",
      description:
        "Mjuk oversize-hoodie med borstad insida. Perfekt för vardag och lager-on-lager.",
      priceCents: 49900,
      brand: "Basics",
      imageUrl: "/freakshirt.jpg",
      stock: 30,
      categoryId: kläder.id,
    },
    {
      name: "Grafisk Tröja",
      slug: "grafisk-troja",
      description:
        "Statementtröja med grafiskt tryck. Begränsad upplaga – när den är slut är den slut.",
      priceCents: 39900,
      brand: "Limited",
      imageUrl: "/freakshirt.jpg",
      stock: 15,
      categoryId: kläder.id,
    },
    {
      name: "Keps",
      slug: "keps",
      description: "Justerbar keps i tvättad bomull. One size fits most.",
      priceCents: 14900,
      brand: "Basics",
      imageUrl: "/fived.jpg",
      stock: 80,
      categoryId: accessoarer.id,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...p },
      create: { ...p },
    });
  }

  // --- Adminkonto (endast för utveckling) ---
  const adminEmail = "admin@shopen.se";
  const passwordHash = await bcrypt.hash("admin1234", 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("✅ Seed klar: kategorier, produkter och adminkonto skapade.");
  console.log("   Admin-login (DEV): admin@shopen.se / admin1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
