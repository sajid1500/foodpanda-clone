import React from "react";

import RestaurantItem from "./RestaurantItem";
import { Restaurant, RestaurantSummary } from "@/_lib/definitions";
import {
  getNearbyRestaurants,
  getRestaurants,
  getRestaurantsWithRouting,
  getUser,
} from "@/_lib/data-service";

export default async function RestaurantList() {
  const { lat, lng } = await getUser().then((user) => user.location);

  // const nearbyRestaurants = await getNearbyRestaurants(lat, lng);
  // const restaurants = await getRestaurants();
  // const orderedRestaurants = await getRestaurantsWithRouting(restaurants, lat, lng);
  const restaurants = await getNearbyRestaurants(lat, lng);
  // console.log("restaurants", restaurants);
  return (
    <div>
      <h1 className="my-2 text-2xl font-medium">Restaurants near you</h1>
      <ul className="flex flex-col gap-4">
        {restaurants.map((restaurant: RestaurantSummary) => (
          <RestaurantItem key={restaurant.shortId} {...restaurant} />
        ))}
      </ul>
    </div>
  );
}
