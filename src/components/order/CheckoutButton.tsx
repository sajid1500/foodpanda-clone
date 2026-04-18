"use client";

import { createCheckoutSession } from "@/lib/actions/stripe";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useCartStore } from "@/lib/stores/cartStore";
import { env } from "@/env";
import { Button } from "../ui/button";
import { createOrder } from "@/lib/actions/order";
import { getPaymentObject } from "@/lib/services/paymentService";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export function CheckoutButton() {
  const [open, setOpen] = useState(false);
  const { cart } = useCartStore((state) => state);
  if (!cart) return null; // Don't show the button if the cart is empty

  const fetchClientSecret = async (): Promise<string> => {
    const orderId = await createOrder(cart);
    if (!orderId) {
      throw new Error("Could not create order");
    }

    const response = await createCheckoutSession(cart, orderId);
    if (!response?.clientSecret) {
      throw new Error("Could not start checkout");
    }

    return response.clientSecret;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="default"
          onClick={() => console.log("clicked")}
          className="absolute bottom-80 left-0 w-full"
        >
          Checkout
        </Button>
      </DialogTrigger>
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
        {/* <div>hiii</div> */}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel Payment
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
