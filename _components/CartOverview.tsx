"use client";

import { useCartStore } from "@/_lib/store";
import React from "react";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  // console.log("cart items", cart);
  return (
    <div>
      Cart
      <span>{cart.length === 0 ? "" : cart.length}</span>
    </div>
  );
}
