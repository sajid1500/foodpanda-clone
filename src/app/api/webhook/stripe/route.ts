import { stripe } from "@/lib/config/stripe";
import { headers } from "next/headers";
import { env } from "@/env";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown webhook error";
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // 2026 Practice: Trigger a background sync or email service
    console.log(`💰 Payment confirmed for ${session.id}`);
  }
  if (event.type === "checkout.session.async_payment_failed") {
    console.warn(`⚠️ Async payment failed for ${event.data.object.id}`);
  }
  return new Response(null, { status: 200 });
}
