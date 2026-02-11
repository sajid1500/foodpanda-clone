"use client";

import { CartItem, useCartStore } from "@/lib/cartStore";

import React from "react";
// import AddItem from "./AddItem";
import Counter from "./Counter";
import { MenuItem, RestaurantSummary } from "@/lib/definitions";

export default function MenuCounter({
  restaurantSummary,
  menuItem,
}: {
  restaurantSummary: RestaurantSummary;
  menuItem: MenuItem;
}) {
  const { id: menuRestaurantId } = restaurantSummary;
  const { cart } = useCartStore((state) => state);
  const cartItem = (
    cart?.restaurantId === menuRestaurantId
      ? cart.items.find((item) => item.id === menuItem.id)
      : undefined
  ) as CartItem | undefined;
  // console.log("MenuCounter cartItem:", cartItem);
  return (
    <>
      {cartItem ? (
        <Counter item={cartItem} className="absolute right-2 bottom-2" />
      ) : (
        <AddItem restaurantSummary={restaurantSummary} menuItem={menuItem} />
      )}
    </>
  );
}

function AddItem({
  restaurantSummary,
  menuItem,
}: {
  restaurantSummary: RestaurantSummary;
  menuItem: MenuItem;
}) {
  const { addToCart } = useCartStore((state) => state);
  return (
    <button
      onClick={() => {
        // console.log("Adding item to cart:", item, restaurantId);
        addToCart(menuItem, restaurantSummary);
      }}
      className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-md"
    >
      <span className="absolute top-0.5 text-2xl">+</span>
    </button>
  );
}
