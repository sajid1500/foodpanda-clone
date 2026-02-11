import { Cart, CartItem } from "./cartStore";
import { Restaurant, RestaurantSummary } from "./definitions";
import supabase from "./supabase";
import { createClient } from "./supabase/server";

export const getAddress = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  if (!userId) return null;

  const { data: address } = await supabase
    .from("user_addresses")
    .select("*")
    .eq("user_id", userId)
    .single();
  return address;
};

export const getUser = async () => {
  // Simulate a database delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  // const {data: {user}} = await supabase.auth.getUser();
  // const { data, error } = await supabase
  //   .from("users")
  //   .select("*")
  //   .eq("id", user?.id)
  //   .single();
  // console.log("fetched user", user);
  // return {
  //   id: "user123",
  //   name: "John Doe",
  //   location: { lat: 23.8069, lng: 90.3685 },
  // };
};

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

export async function getLocationName(lat: number, lng: number) {
  let locationName = "Location unavailable";
  try {
    const res = await fetch(
      `https://graphhopper.com/api/1/geocode?reverse=true&point=${lat},${lng}&locale=en&key=${process.env.GRAPHHOPPER_API_KEY}`,
    );
    const data = await res.json();
    // console.log("location data", data);

    if (data.hits && data.hits[0]) {
      // Extract city, country or full address
      const hit = data.hits[0];
      locationName = hit.name || hit.city || hit.country || "Unknown location";
    } else {
      console.error("Reverse geocoding error:", data);
    }
  } catch (error) {
    console.error("Failed to fetch location:", error);
  }
  return locationName;
}

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

export async function submitOrder(userId: string, cart: Cart) {
  // Simulate order submission delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Here you would typically send the order details to your backend or Supabase
  console.log("Order submitted:", { userId, cart });
}
