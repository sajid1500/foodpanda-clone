import React from "react";

import { RestaurantItem } from "./RestaurantItem";
import { Restaurant, RestaurantSummary } from "@/lib/types/resaurant.types";
import {
  getNearbyRestaurants,
  getRestaurants,
} from "@/lib/services/restaurantService";
import { getDefaultAddress } from "@/lib/services/userService";

export async function RestaurantList() {
  // const { lat, lng } = await getUser().then((user) => user.location);
  const address = await getDefaultAddress();
  let lat, lng;
  if (address?.coords) ({ lat, lng } = address.coords);
  let restaurants;
  if (lat && lng) {
    restaurants = await getNearbyRestaurants(lat, lng);
  } else {
    // Fallback: fetch nearby restaurants without routing info
    restaurants = await getRestaurants(); // Default to Dhaka center
  }
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
