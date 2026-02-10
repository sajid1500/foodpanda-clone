"use server";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { CartItem } from "../cartStore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(cartItems: CartItem[]) {
  const session = await stripe.checkout.sessions.create({
    line_items: cartItems.map((item) => ({
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
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
  });

  redirect(session.url!);
}
