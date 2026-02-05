import React from "react";
import { type CartItem } from "@/_lib/cartStore";
import Image from "next/image";
import Counter from "./Counter";
import { motion, Variants } from "framer-motion";

export default function CartItem({ item }: { item: CartItem }) {
  const { image, name } = item;
  return (
    <motion.li className="relative flex items-center space-x-2">
      <div className="relative aspect-square h-11 w-11">
        <Image
          fill
          className="rounded-md object-cover"
          src={image || "/placeholder-restaurant.png"}
          alt={name}
        />
      </div>
      <div className="flex w-full justify-between">
        <h3>{name}</h3>
        <Counter item={item} className="absolute right-2 bottom-1" />
      </div>
    </motion.li>
  );
}
