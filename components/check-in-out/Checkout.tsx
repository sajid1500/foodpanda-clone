import React, { useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import CheckoutForm from "./CheckoutForm";
// import Complete from "./Complete";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51SywHqRaKVwUF8uQlMOulxd97dZH1H88jQV0JSyoECwhrr8h5vW6D4rb2FMFuuOwkbxaPlmLjbazuXycqm3DQFeb00CAPYraNu",
);

const App = () => {
  const clientSecret = useMemo(() => {
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const appearance: { theme: "stripe" | "flat" | "night" } = {
    theme: "stripe",
  };

  return (
    <div className="App">
      <CheckoutProvider
        stripe={stripePromise}
        options={{
          clientSecret,
          elementsOptions: { appearance },
        }}
      >
        <CheckoutForm />
      </CheckoutProvider>
    </div>
  );
};

export default App;
