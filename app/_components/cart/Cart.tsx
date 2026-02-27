"use client";
import Image from "next/image";
import { type Cart } from "@/app/_lib/types/cart.types";
import CartList from "./CartList";
import CheckoutButton from "../check-in-out/CheckoutButton";
import { useCartStore } from "@/app/_lib/stores/cartStore";
import { RESTAURANT_ASSETS_URL } from "@/app/_lib/utils/constants";

export default function Cart() {
  const { restaurantName, restaurantImage, items } = useCartStore(
    (state) => state.cart,
  ) as Cart;
  if (items.length === 0) return <p>Your cart is empty</p>;
  return (
    <div>
      <div className="flex">
        <div className="relative mr-4 aspect-square h-9.5 w-9.5">
          <Image
            fill
            src={
              `//${RESTAURANT_ASSETS_URL}/${restaurantImage}` ||
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
      {/* <CheckoutForm priceId={"fdfdkfjd"} /> */}
    </div>
  );
}
