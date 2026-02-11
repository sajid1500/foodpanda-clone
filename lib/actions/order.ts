"use server";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { Cart, CartItem } from "../cartStore";
import { createClient } from "../supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(cart: Cart) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) {
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
          images: ["https://picsum.photos/200"], // Placeholder image
        },
        unit_amount: item.price * 100, // Stripe uses cents
      },
      quantity: 1,
    })),
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
  });

  redirect(session.url!);
}
