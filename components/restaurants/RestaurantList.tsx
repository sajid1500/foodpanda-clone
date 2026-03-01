import React from "react";

import RestaurantItem from "./RestaurantItem";
import { Restaurant, RestaurantSummary } from "@/lib/types/resaurant.types";
import {
  getNearbyRestaurants,
  getRestaurantsWithRouting,
} from "@/lib/services/restaurantService";

export default async function RestaurantList() {
  // const { lat, lng } = await getUser().then((user) => user.location);
  const { lat, lng } = { lat: 23.8069, lng: 90.3685 }; // TODO: later get from user
  // const nearbyRestaurants = await getNearbyRestaurants(lat, lng);
  // const restaurants = await getRestaurants();
  // const orderedRestaurants = await getRestaurantsWithRouting(restaurants, lat, lng);
  const restaurants = await getNearbyRestaurants(lat, lng);
  // console.log("restaurants", restaurants);
  return (
    <div>
      <h1 className="my-2 text-2xl font-medium">Restaurants near you</h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant: RestaurantSummary, index: number) => (
          <RestaurantItem
            restaurant={restaurant}
            index={index}
            key={`${restaurant.shortId}`}
          />
        ))}
      </ul>
    </div>
  );
}
