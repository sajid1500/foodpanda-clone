import React from "react";

import { RestaurantItem } from "./RestaurantItem";
import { Restaurant, RestaurantSummary } from "@/lib/types/resaurant.types";
import { getNearbyRestaurants } from "@/lib/services/restaurantService";
import { getAddresses, getDefaultAddress } from "@/lib/services/userService";
import OrderSidebar from "../order/OrderSidebar";

export async function RestaurantList() {
  // const { lat, lng } = await getUser().then((user) => user.location);
  // const address = await getDefaultAddress();
  const addresses = await getAddresses();
  const defaultAddress = addresses.find((addr) => addr.isDefault);
  const restaurants = await getNearbyRestaurants();
  return (
    <section className="px-4">
      <h1 className="my-2 text-2xl font-medium">Restaurants near you</h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant: RestaurantSummary, index: number) => (
          <RestaurantItem
            restaurant={restaurant}
            index={index}
            key={`${restaurant.id}`}
          />
        ))}
      </ul>
    </section>
  );
}
