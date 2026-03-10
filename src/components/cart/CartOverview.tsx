"use client";

import { useCartStore } from "@/lib/stores/cartStore";
import { useLayoutStore } from "@/lib/stores/layoutStore";
import { AnimatePresence, motion } from "framer-motion";
import { LuShoppingBag } from "react-icons/lu";

import React from "react";

export function CartOverview({ ...props }) {
  const cart = useCartStore((state) => state.cart);
  const numItems =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) ?? 0;
  // console.log("cart items", cart);
  return (
    <button {...props} className="relative">
      <LuShoppingBag color="black" size={24} />
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
