"use client";

import { MenuItem } from "@/lib/types/resaurant.types";
import { useCartStore } from "@/lib/stores/cartStore";
import { CartItem } from "@/lib/types/cart.types";
import { LuMinus, LuPlus, LuTrash2 } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

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
      className={twMerge(
        "flex items-center justify-around rounded-full bg-white text-gray-700 shadow-md",
        className,
      )}
    >
      <button
        onClick={() => {
          // console.log("Adding item to cart:", item, restaurantId);
          updateQuantity(id, quantity - 1);
        }}
      >
        {quantity === 1 ? <LuTrash2 size={18} /> : <LuMinus size={18} />}
      </button>
      <span className="mx-3 text-[18px]">{quantity}</span>
      <button
        onClick={() => {
          // console.log("Removing item from cart:", item, restaurantId);
          updateQuantity(id, quantity + 1);
        }}
      >
        <LuPlus size={18} />
      </button>
    </div>
  );
}
