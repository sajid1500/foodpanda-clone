"use server";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { Cart, CartItem } from "../types/cart.types";
import { createClient } from "../config/supabase/server";
import { getUserForServer } from "../utility/auth";
import { SUPABASE_STORAGE_URL } from "../utility/constants";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(cart: Cart) {
  const user = await getUserForServer();
  if (!user) {
    redirect("/login");
  }
  const session = await stripe.checkout.sessions.create({
    client_reference_id: cart.restaurantId, // You can set this dynamically based on the restaurant
    customer_email: user.email!, // Pass the user's email to Stripe
    metadata: {
      userId: user.id,
      cart: JSON.stringify(cart), // Pass the entire cart as metadata
    },
    line_items: cart.items.map((item) => ({
      price_data: {
        currency: "bdt",
        product_data: {
          name: item.name,
          images: [
            `${SUPABASE_STORAGE_URL}/restaurant-assets/${item.imagePath}`,
          ], // Placeholder image
        },
        unit_amount: item.price * 100, // Stripe uses cents
      },
      // price: item.id, // You can use the item ID as the price ID if you have set up Stripe products
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
  });

  redirect(session.url!);
}
