import React from "react";
import { type CartItem } from "@/lib/types/cart.types";
import Image from "next/image";
import Counter from "./Counter";
import { RESTAURANT_ASSETS_URL } from "@/lib/utils/constants";

function CartListItem({ item }: { item: CartItem }) {
  const { imagePath, name, price } = item;

  return (
    <li className="relative flex items-center space-x-2">
      <div className="relative aspect-square h-11 w-11">
        <Image
          fill
          className="rounded-md object-cover"
          src={
            `${RESTAURANT_ASSETS_URL}/${imagePath}` ||
            "/placeholder-restaurant.png"
          }
          sizes="(max-width: 768px) 44px, 44px"
          // loading="lazy"
          // preload={false}
          alt={name}
        />
      </div>

      <div className="flex w-full justify-between">
        <h3>{name}</h3>
        <div className="mr-2 mb-1 flex flex-col items-center">
          <p>
            {price * item.quantity} <span className="font-bold">tk</span>
          </p>
          <Counter item={item} />
        </div>
      </div>
    </li>
  );
}

export default function CartList({ items }: { items: CartItem[] }) {
  return (
    <ul className="mt-4">
      {items.map((item) => (
        <CartListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
