"use server";

import { stripe } from "@/lib/config/stripe";
import { headers } from "next/headers";
import { Cart } from "../validators/cart.schema";

import { RESTAURANT_ASSETS_URL } from "../utils/constants";

export async function createCheckoutSession(cart: Cart) {
  const origin = (await headers()).get("origin");
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: cart.items.map((item) => ({
        price_data: {
          product_data: {
            name: item.name, // e.g., "Beef Burger"
            images: [`${RESTAURANT_ASSETS_URL}/${item.imagePath}`],
          },
          currency: "bdt", // or 'bdt'
          unit_amount: item.price * 100, // Stripe uses cents (e.g., $10.00 = 1000)
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      return_url: `${origin}/order-status?session_id={CHECKOUT_SESSION_ID}`,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // Session expires in 30 minutes
    });
    return { clientSecret: session.client_secret };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Failed to create checkout session");
  }
}
