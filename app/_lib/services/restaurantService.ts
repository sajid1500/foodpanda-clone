import { Cart, CartItem } from "../store/cartStore";
import { Restaurant, RestaurantSummary } from "../types/resaurant.types";
import supabase from "../supabase";
import { createClient } from "../supabase/server";
import { Location, LocationHit } from "../types/api.types";

export async function getNearbyRestaurants(
  lat: number,
  lng: number,
): Promise<RestaurantSummary[]> {
  const { data: restaurants, error } = await supabase.rpc(
    "nearby_restaurants",
    {
      lat: lat,
      lng: lng,
      // radius_meters: Infinity, // No radius limit, get all and sort by distance in the RPC
    },
  );

  if (error) {
    console.error("restaurants fetch error:", error);

    throw new Error("Failed to fetch restaurants");
  }
  // console.log("fetched nearby restaurants", restaurants);
  return restaurants;
}

export async function getRestaurantsWithRouting(
  restaurants: Restaurant[],
  lat: number,
  lng: number,
) {
  const restaurantsWithDistance = await Promise.all(
    restaurants.map(async (restaurant: Restaurant) => {
      try {
        const results = await fetch(
          `https://graphhopper.com/api/1/route?point=${lat},${lng}&point=${restaurant.coords.lat},${restaurant.coords.lng}&profile=bike&locale=en&calc_points=false&key=${process.env.GRAPHHOPPER_API_KEY}`,
        );
        const data = await results.json();

        if (data.paths && data.paths[0]) {
          const { distance, time } = data.paths[0];
          return {
            ...restaurant,
            distance: distance / 1000, // Convert to km
            deliveryTime: Math.round(time / 60000), // Convert to minutes
          };
        } else {
          console.error(
            `Route calculation failed for ${restaurant.name}:`,
            data,
          );
          return { ...restaurant, distance: Infinity, deliveryTime: Infinity };
        }
      } catch (error) {
        console.error(
          `Failed to calculate route for ${restaurant.name}:`,
          error,
        );
        return { ...restaurant, distance: Infinity, deliveryTime: Infinity };
      }
    }),
  );

  // Sort by distance ascending (closest first)
  const orderedRestaurants = restaurantsWithDistance.sort(
    (a, b) => a.distance - b.distance,
  );

  return orderedRestaurants;
}

export const getRestaurantDetails = async (
  shortId: string,
): Promise<Restaurant> => {
  // await new Promise((resolve) => setTimeout(resolve, 500));
  const { data: restaurant, error } = await supabase
    .from("restaurants_display")
    .select(
      `
      id,
      name,
      coords: coordinates,
      bannerPath: banner_path,
      logoPath: logo_path,
      averageRating: average_rating,
      menu: menu_items!inner(
      id,
      name,
      description,
      price,
      imagePath: image_path
      ),
      reviews (*)`,
    )
    .eq("short_id", shortId)
    .single();
  // .overrideTypes<{
  //   id: string;
  //   name: string;
  //   bannerPath: string;
  //   logoPath: string;
  // }>();

  if (error) {
    console.error("Supabase error:", error?.message);
    throw new Error("Failed to fetch restaurant details");
  }

  // console.log("restaurant details", restaurant);
  return restaurant;
};

// Post
// export async function createUser (name: string, email: string, password: string) {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: {
//         name,
//       },
//     },
//   });
