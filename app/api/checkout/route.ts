import { Cart } from "@/lib/cartStore";
import { submitOrder } from "@/lib/data-service";
import { StripeError, StripeErrorType } from "@stripe/stripe-js";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text(); // Get raw body
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    const error = err as StripeError;
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 },
    );
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const cart = JSON.parse(session.metadata?.cart || "[]") as Cart;
    // TODO: Update your Supabase DB
    // e.g., set order_status = 'paid' for session.client_reference_id
    if (userId) await submitOrder(userId, cart); // cart items

    console.log("Payment Succeeded for Session:", session.id);
  }

  return NextResponse.json({ received: true });
}
