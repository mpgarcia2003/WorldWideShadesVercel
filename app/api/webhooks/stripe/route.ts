import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { trackServerPurchase } from "@/lib/tracking/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("[Stripe Webhook] Signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle payment success
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const metadata = paymentIntent.metadata || {};

    console.log(`[Stripe Webhook] Payment succeeded: ${paymentIntent.id} — $${(paymentIntent.amount / 100).toFixed(2)}`);

    // Fire server-side GA4 purchase event via Measurement Protocol
    try {
      await trackServerPurchase({
        transactionId: paymentIntent.id,
        value: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        clientId: metadata.ga_client_id || undefined,
        userEmail: paymentIntent.receipt_email || undefined,
        items: [
          {
            item_id: "custom-shade",
            item_name: `Custom Roller Shade (${metadata.items || "1"} item${metadata.items !== "1" ? "s" : ""})`,
            price: paymentIntent.amount / 100,
            quantity: 1,
          },
        ],
      });
      console.log(`[Stripe Webhook] GA4 purchase event sent for ${paymentIntent.id}`);
    } catch (err) {
      console.error("[Stripe Webhook] GA4 tracking failed:", err);
      // Don't fail the webhook — tracking errors shouldn't block payment confirmation
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.error(`[Stripe Webhook] Payment failed: ${paymentIntent.id} — ${paymentIntent.last_payment_error?.message}`);
  }

  // Always return 200 to acknowledge receipt
  return NextResponse.json({ received: true });
}
