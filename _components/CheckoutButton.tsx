"use client";

import { createCheckoutSession } from "@/lib/actions/order";
import { useCartStore } from "@/lib/cartStore";

export default function CheckoutButton() {
  const { cart } = useCartStore((state) => state);
  if (!cart) return null; // Don't show the button if the cart is empty

  return (
    <button
      className="absolute bottom-28 left-0 w-full rounded bg-pink-500 py-2 text-white"
      onClick={() => createCheckoutSession(cart)}
    >
      Checkout
    </button>
  );
}
