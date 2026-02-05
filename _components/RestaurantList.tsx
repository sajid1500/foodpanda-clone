import React from "react";

import RestaurantItem from "./RestaurantItem";
import { Restaurant } from "@/_lib/definitions";
import { getOrderedRestaurants, getUser } from "@/_lib/dataService";

export default async function RestaurantList() {
  // console.log("restaurants", restaurants);
  const { lat, lng } = await getUser().then((user) => user.location);

  const restaurants = await getOrderedRestaurants(lat, lng);
  return (
    <div>
      <h1 className="my-2 text-2xl font-medium">Restaurants near you</h1>
      <ul className="flex flex-col gap-4">
        {restaurants.map((restaurant: Restaurant) => (
          <RestaurantItem key={restaurant.id} {...restaurant} />
        ))}
      </ul>
    </div>
  );
}
