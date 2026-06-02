// Skapar en order och en Stripe Checkout-session.
// VIKTIGT: Priser hämtas alltid från databasen på servern. Vi litar ALDRIG
// på priser som skickas från webbläsaren (annars kan kunden manipulera dem).
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/auth";

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(99),
      })
    )
    .min(1, "Varukorgen är tom."),
});

export async function POST(request: Request) {
  if (!isStripeConfigured() || !stripe) {
    return NextResponse.json(
      {
        error:
          "Betalning är inte konfigurerad ännu. Lägg till STRIPE_SECRET_KEY i miljövariablerna.",
      },
      { status: 503 }
    );
  }

  // Validera inkommande data
  let parsed;
  try {
    parsed = checkoutSchema.parse(await request.json());
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.errors[0]?.message ?? "Ogiltig begäran." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Ogiltig begäran." }, { status: 400 });
  }

  // Hämta produkterna från DB – sanningskällan för pris och lager
  const productIds = parsed.items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, active: true },
  });

  if (products.length === 0) {
    return NextResponse.json(
      { error: "Inga giltiga produkter i varukorgen." },
      { status: 400 }
    );
  }

  // Bygg orderrader baserat på DB-priser + kontrollera lager
  const lineItems: {
    product: (typeof products)[number];
    quantity: number;
  }[] = [];

  for (const item of parsed.items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;
    if (product.stock < item.quantity) {
      return NextResponse.json(
        { error: `Otillräckligt lager för "${product.name}".` },
        { status: 409 }
      );
    }
    lineItems.push({ product, quantity: item.quantity });
  }

  const totalCents = lineItems.reduce(
    (sum, li) => sum + li.product.priceCents * li.quantity,
    0
  );

  // Inloggad användare kopplas till ordern; annars används ett gästkonto.
  const currentUser = await getCurrentUser();

  // Skapa order (PENDING) – kopplas senare till betalning via webhook
  const order = await prisma.order.create({
    data: {
      user: currentUser
        ? { connect: { id: currentUser.id } }
        : {
            connectOrCreate: {
              where: { email: "gast@shopen.se" },
              create: {
                email: "gast@shopen.se",
                name: "Gäst",
                passwordHash: "-", // gästkonto, ej inloggningsbart
              },
            },
          },
      status: "PENDING",
      totalCents,
      currency: "SEK",
      items: {
        create: lineItems.map((li) => ({
          productId: li.product.id,
          nameSnapshot: li.product.name,
          priceCents: li.product.priceCents,
          quantity: li.quantity,
        })),
      },
    },
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? new URL(request.url).origin;

  // Skapa Stripe Checkout-session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems.map((li) => ({
      quantity: li.quantity,
      price_data: {
        currency: "sek",
        unit_amount: li.product.priceCents,
        product_data: {
          name: li.product.name,
          ...(li.product.brand ? { description: li.product.brand } : {}),
        },
      },
    })),
    success_url: `${baseUrl}/kassa/tack?order=${order.id}`,
    cancel_url: `${baseUrl}/kassa/avbruten?order=${order.id}`,
    metadata: { orderId: order.id },
  });

  // Spara Stripe-sessionens id på ordern för avstämning
  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: session.id },
  });

  return NextResponse.json({ url: session.url });
}
