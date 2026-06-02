// Stripe-klient. Initieras bara om nyckel finns, så att appen fungerar
// (och bygger) även innan Stripe-nycklar är konfigurerade.
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

// null om ingen nyckel satts – anroparen får då visa ett tydligt meddelande.
export const stripe = key
  ? new Stripe(key, { apiVersion: "2025-02-24.acacia" })
  : null;

export function isStripeConfigured(): boolean {
  return stripe !== null;
}
