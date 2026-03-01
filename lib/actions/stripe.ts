"use server";

import stripe from "@/lib/config/stripe";
import { headers } from "next/headers";
import { Cart } from "../types/cart.types";
import { RESTAURANT_ASSETS_URL } from "../utils/constants";

export async function createCheckoutSession(cart: Cart) {
  const origin = (await headers()).get("origin");
  console.log("Creating checkout session with cart:", origin);
  const session = await stripe.checkout.sessions.create({
    ui_mode: "custom", // This enables the 2026 Embedded UI
    line_items: cart.items.map((item) => ({
      price_data: {
        currency: "bdt", // or 'bdt'
        product_data: {
          name: item.name, // e.g., "Beef Burger"
          images: [`${RESTAURANT_ASSETS_URL}/${item.imagePath}`],
        },
        unit_amount: item.price * 100, // Stripe uses cents (e.g., $10.00 = 1000)
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return { clientSecret: session.client_secret };
}
