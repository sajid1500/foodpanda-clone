"use client";
import Image from "next/image";
import { type Cart } from "@/lib/validators/cart.schema";
import { CartList } from "./CartList";
import { CheckoutButton } from "../check-in-out/CheckoutButton";
import { useCartStore } from "@/lib/stores/cartStore";
import { RESTAURANT_ASSETS_URL } from "@/lib/utils/constants";

export function Cart() {
  const { restaurantName, restaurantImage, items } = useCartStore(
    (state) => state.cart,
  ) as Cart;

  if (items.length === 0) return <p>Your cart is empty</p>;
  return (
    <div className="">
      <div className="flex">
        <div className="relative mr-4 aspect-square h-9.5 w-9.5">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={
              `${RESTAURANT_ASSETS_URL}/${restaurantImage}` ||
              "/placeholder.png"
            }
            alt={restaurantName || "Restaurant"}
            className="mb-2 rounded-md object-cover"
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
