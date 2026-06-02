// Stripe-webhook. Stripe anropar denna när en betalning slutförs.
// Vi verifierar signaturen (annars kan vem som helst förfalska betalningar)
// och markerar ordern som PAID samt drar av lagersaldo.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe, isStripeConfigured } from "@/lib/stripe";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!isStripeConfigured() || !stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook ej konfigurerad." },
      { status: 503 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Saknar signatur." }, { status: 400 });
  }

  const body = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    // Felaktig signatur – avvisa
    return NextResponse.json({ error: "Ogiltig signatur." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      // Idempotent: gör bara något om ordern fortfarande är PENDING
      if (order && order.status === "PENDING") {
        await prisma.$transaction([
          prisma.order.update({
            where: { id: orderId },
            data: {
              status: "PAID",
              stripePaymentId:
                typeof session.payment_intent === "string"
                  ? session.payment_intent
                  : undefined,
            },
          }),
          // Dra av lager för varje rad
          ...order.items.map((item) =>
            prisma.product.update({
              where: { id: item.productId },
              data: { stock: { decrement: item.quantity } },
            })
          ),
        ]);
      }
    }
  }

  return NextResponse.json({ received: true });
}
