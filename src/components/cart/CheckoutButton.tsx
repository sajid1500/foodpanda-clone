"use client";

import { createCheckoutSession } from "@/lib/actions/stripe";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useState } from "react";
import { useCartStore } from "@/lib/stores/cartStore";
import { env } from "@/env";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export function CheckoutButton() {
  const [open, setOpen] = useState(false);
  const { cart } = useCartStore((state) => state);
  if (!cart) return null; // Don't show the button if the cart is empty

  const fetchClientSecret = async () => {
    const response = await createCheckoutSession(cart);
    ``;

    if (!response?.clientSecret) {
      throw new Error("Could not start checkout");
    }

    return response.clientSecret;
  };

  return (
    <>
      <button
        type="button"
        className="absolute bottom-100 left-0 w-full rounded bg-pink-500 py-2 text-white"
        onClick={() => setOpen(true)}
      >
        Checkout
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-full w-full overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Complete your payment securely with Stripe.
            </DialogDescription>
          </DialogHeader>

          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
