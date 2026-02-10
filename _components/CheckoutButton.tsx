"use client";

import { createCheckoutSession } from "@/_lib/actions/checkout";
import { useCartStore } from "@/_lib/cartStore";

export default function CheckoutButton() {
  const { cart } = useCartStore((state) => state);

  return (
    <button
      className="absolute bottom-28 left-0 w-full rounded bg-pink-500 py-2 text-white"
      onClick={() => createCheckoutSession(cart)}
    >
      Checkout
    </button>
  );
}
