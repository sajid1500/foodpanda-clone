"use client";

import React from "react";
import { useCartStore } from "@/_lib/store";
import { MenuItem } from "@/_lib/definitions";

export default function AddItem({
  restaurantId,
  item,
}: {
  restaurantId: string;
  item: MenuItem;
}) {
  const { addToCart } = useCartStore((state) => state);
  return (
    <button
      onClick={() => {
        console.log("Adding item to cart:", item, restaurantId);
        addToCart(item, restaurantId);
      }}
      className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-md"
    >
      <span className="absolute top-0.5 text-2xl">+</span>
    </button>
  );
}
