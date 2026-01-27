import React from "react";

import RestaurantItem from "./RestaurantItem";
import { Restaurant } from "@/_lib/definitions";
import { getOrderedRestaurants, getUser } from "@/_lib/dataService";

export default async function RestaurantList() {
  // console.log("restaurants", restaurants);
  const { lat, lng } = await getUser().then((user) => user.location);

  const restaurants = await getOrderedRestaurants(lat, lng);
  // console.log("restaurants", restaurants);
  // const results = await fetch(
  //   `https://graphhopper.com/api/1/route?point=${coords.lat},${coords.lng}&point=23.8378,90.3533&profile=bike&locale=en&calc_points=false&key=${process.env.GRAPHHOPPER_API_KEY}`
  // );
  // const data = await results.json();
  // const { distance, time } = data.paths[0];
  // console.log("paths array", distance, time);
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
