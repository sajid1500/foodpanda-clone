"use client";

import { MenuItem } from "@/lib/definitions";
import { useCartStore } from "@/lib/cartStore";
import { CartItem } from "@/lib/cartStore";
import { Minus, Plus, Trash, Trash2 } from "lucide-react";

export default function Counter({
  item,
  className,
}: {
  item: CartItem;
  className?: string;
}) {
  const { updateQuantity } = useCartStore((state) => state);
  const { id, quantity } = item;
  return (
    <div
      className={`${className} flex items-center justify-around rounded-full bg-white px-2 text-gray-700 shadow-md`}
    >
      <button
        onClick={() => {
          // console.log("Adding item to cart:", item, restaurantId);
          updateQuantity(id, quantity - 1);
        }}
      >
        {quantity === 1 ? <Trash2 size={18} /> : <Minus size={18} />}
      </button>
      <span className="mx-3 text-[18px]">{quantity}</span>
      <button
        onClick={() => {
          // console.log("Removing item from cart:", item, restaurantId);
          updateQuantity(id, quantity + 1);
        }}
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
