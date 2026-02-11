"use client";
import { type CartItem as CartItemType, useCartStore } from "@/lib/cartStore";
import { X } from "lucide-react";
import CartItem from "./CartItem";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLayoutStore } from "@/lib/layoutStore";
import CloseButton from "./CloseButton";
import CheckoutButton from "./CheckoutButton";

export default function Cart() {
  const { cart } = useCartStore((state) => state);
  const { isCartOpen, closeCart } = useLayoutStore((state) => state);
  if (!cart) return null;
  const { restaurantName, restaurantImage, items } = cart;
  // console.log(restaurantImage);
  // console.log("cart items", cart);
  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
          className="fixed top-0 right-0 z-20 h-screen w-full max-w-md rounded-l-lg bg-white p-4 shadow-lg"
        >
          <div className="flex justify-between">
            <h2 className="mb-4 text-lg font-bold">Your Cart</h2>
            <CloseButton onClick={closeCart} />
          </div>
          {items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className="flex">
                <div className="relative mr-4 aspect-square h-9.5 w-9.5">
                  <Image
                    fill
                    src={
                      `/assets/${restaurantImage}` ||
                      "/placeholder-restaurant.png"
                    }
                    alt={restaurantName || "Restaurant"}
                    className="mb-2 h-20 w-20 rounded-md object-cover"
                  />
                </div>

                <h1 className="text-md ml-4 font-semibold">{restaurantName}</h1>
              </div>
              <CartList items={items} />
              <CheckoutButton />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CartList({ items }: { items: CartItemType[] }) {
  return (
    <ul className="mt-4">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
