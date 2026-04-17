import { Restaurant, RestaurantSummary } from "@/lib/types/resaurant.types";
import { getServerClient } from "@/lib/config/supabase/server";

// export async function getRestaurants() {
//   const supabase = await getServerClient();
//   const { data: restaurants, error } = await supabase
//     .from("restaurants_display")
//     .select(
//       `
//       id,
//       name,
//       coords: coordinates,
//       bannerPath: banner_path,
//       logoPath: logo_path,
//       averageRating: average_rating,
//       menu: menu_items!inner(
//         id,
//         name,
//         description,
//         price,
//         imagePath: image_path
//       )`,
//     )
//     .limit(50);

//   if (error) {
//     console.error("Supabase error:", error?.message);
//     throw new Error("Failed to fetch restaurants");
//   }

//   return restaurants as RestaurantSummary[];
// }

export async function getNearbyRestaurants(): Promise<RestaurantSummary[]> {
  const supabase = await getServerClient();
  const { data: restaurants, error } = await supabase.rpc(
    "nearby_restaurants",
    { skip_count: 0 },
  );

  if (error) {
    console.error("restaurants fetch error:", error);

    throw new Error("Failed to fetch restaurants");
  }
  // console.log("fetched nearby restaurants", restaurants);
  return restaurants;
}

export const getRestaurantDetails = async (
  slug: string,
): Promise<Restaurant> => {
  const supabase = await getServerClient();
  const { data: restaurant, error } = await supabase
    .from("restaurants")
    .select(
      `
      id,
      name,
      slug,
      coords: restaurant_addresses_display (
      lat: latitude,
      lng: longitude
      ),
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
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Supabase error:", error?.message);
    throw new Error("Failed to fetch restaurant details");
  }
  return { ...restaurant, distanceMeters: 0, coords: restaurant.coords[0] };
  // return { ...restaurant, distanceMeters: 0 }; // use routing later
};

// export async function getRestaurantsWithRouting(
//   restaurants: Restaurant[],
//   lat: number,
//   lng: number,
// ) {
//   const supabase = await createClient();
//   const restaurantsWithDistance = await Promise.all(
//     restaurants.map(async (restaurant: Restaurant) => {
//       try {
//         const results = await fetch(
//           `https://graphhopper.com/api/1/route?point=${lat},${lng}&point=${restaurant.coords.lat},${restaurant.coords.lng}&profile=bike&locale=en&calc_points=false&key=YOUR_GRAPHHOPPER_API_KEY`,
//         );
//         const data = await results.json();

//         if (data.paths && data.paths[0]) {
//           const { distance, time } = data.paths[0];
//           return {
//             ...restaurant,
//             distance: distance / 1000, // Convert to km
//             deliveryTime: Math.round(time / 60000), // Convert to minutes
//           };
//         } else {
//           console.error(
//             `Route calculation failed for ${restaurant.name}:`,
//             data,
//           );
//           return { ...restaurant, distance: Infinity, deliveryTime: Infinity };
//         }
//       } catch (error) {
//         console.error(
//           `Failed to calculate route for ${restaurant.name}:`,
//           error,
//         );
//         return { ...restaurant, distance: Infinity, deliveryTime: Infinity };
//       }
//     }),
//   );

//   // Sort by distance ascending (closest first)
//   const orderedRestaurants = restaurantsWithDistance.sort(
//     (a, b) => a.distance - b.distance,
//   );

//   return orderedRestaurants;
// }
