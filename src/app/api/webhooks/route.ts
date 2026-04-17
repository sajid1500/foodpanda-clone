import { stripe } from "@/lib/config/stripe";
import { headers } from "next/headers";
import { env } from "@/env";
import {
  cancelOrder,
  createPaymentRecord,
  updateOrderStatus,
  updatePaymentStatus,
} from "@/lib/services/orderService";

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
  // console.log("Received Stripe event:", event.type);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // 2026 Practice: Trigger a background sync or email service
    const orderId = session.client_reference_id;
    try {
      if (orderId) {
        await updatePaymentStatus(orderId, "succeeded");
        await updateOrderStatus(orderId, "preparing");
      }
    } catch (err) {
      console.error(
        "Failed to update payment status after successful checkout:",
        err,
      );
    }

    console.log(`💰 Payment confirmed for ${session.id} on order ${orderId}`);
  }
  // if (event.type === "checkout.session.expired") {
  //   console.warn(`⚠️ Checkout session expired for ${event.data.object.id}`);
  //   try {
  //     if (event.data.object.client_reference_id) {
  //       await updatePaymentStatus(
  //         event.data.object.client_reference_id,
  //         "failed",
  //       );
  //     }
  //   } catch (err) {
  //     console.error(
  //       "Failed to update payment status after session expiration:",
  //       err,
  //     );
  //   }
  // }
  return new Response(null, { status: 200 });
}
