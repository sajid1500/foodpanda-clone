"use client";

import { useCartStore } from "@/lib/cartStore";
import { useLayoutStore } from "@/lib/layoutStore";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import React from "react";

export default function CartOverview() {
  const cart = useCartStore((state) => state.cart);
  const numItems =
    cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;
  const openCart = useLayoutStore((state) => state.openCart);
  // console.log("cart items", cart);
  return (
    <button className="relative" onClick={openCart}>
      <ShoppingBag color="black" size={24} />
      {numItems > 0 && (
        <AnimatePresence mode="wait">
          <motion.span
            className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
            key={numItems} // Key change triggers the animation
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            {numItems}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
