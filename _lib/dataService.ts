import { Restaurant } from "./definitions";
import supabase from "./supabase";

export const getUser = async () => {
  // Simulate a database delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id: "user123",
    name: "John Doe",
    location: { lat: 23.8069, lng: 90.3685 },
  };
};

export const getRestaurants = async (): Promise<Restaurant[]> => {
  // const { data: restaurants, error } = await supabase.from("restaurants")
  const { data: restaurants, error } = await supabase.rpc(
    "nearby_restaurants",
    {
      lat: 40.807313,
      long: -73.946713,
    },
  ).select(`
      id,
      name: restaurant_name,  
      rating: average_rating,
      image: cover_image_url,
      lat,
      lng
      `);

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  // console.log("restaurants data from supabase:", restaurants, error);
  return restaurants as Restaurant[];
  // return (restaurants as any[]).map((restaurant) => ({
  //   ...restaurant,
  //   location: {
  //     lat: 23.8103,
  //     lng: 90.4125,
  //   },
  // }));
  // Simulate a database delay
  // await new Promise((resolve) => setTimeout(resolve, 500));
  // return [
  //   {
  //     id: "yfdg",
  //     name: "Hazi Biryani",
  //     rating: 4.5,
  //     menu: [
  //       { id: "1", name: "Chicken Biryani", price: 250 },
  //       { id: "2", name: "Mutton Biryani", price: 300 },
  //     ],
  //     location: { lat: 23.8378, lng: 90.3533 },
  //     image: "/restaurant.jpg",
  //   },
  //   {
  //     id: "dfdf",
  //     name: "Khan's Kitchen",
  //     rating: 4.5,
  //     menu: [
  //       { id: "3", name: "Chicken Biryani", price: 250 },
  //       { id: "4", name: "Mutton Biryani", price: 300 },
  //     ],
  //     location: { lat: 23.815, lng: 90.37 },
  //     image: "/restaurant.jpg",
  //   },
  //   {
  //     id: "zwwu",
  //     name: "Spice Garden",
  //     rating: 4.5,
  //     menu: [
  //       { id: "5", name: "Chicken Biryani", price: 250 },
  //       { id: "6", name: "Mutton Biryani", price: 300 },
  //     ],
  //     location: { lat: 23.75, lng: 90.38 },
  //     image: "/restaurant.jpg",
  //   },
  // ];
};
export const getRestaurantDetails = async (
  restaurantId: string,
): Promise<Restaurant> => {
  // Simulate a database delay
  // await new Promise((resolve) => setTimeout(resolve, 500));
  const { data: restaurant, error: restaurantError } = await supabase
    .rpc("restaurants")
    .eq("id", restaurantId)
    .select(
      `
      id,
      name: restaurant_name,  
      rating: average_rating,
      image: cover_image_url,
      lat,
      lng`,
    )
    .single();

  const { data: menu, error: menuError } = await supabase
    .from("menu_items")
    .select(
      `id,
    name: item_name,
    price,
    image: image_url`,
    )
    .eq("restaurant_id", restaurantId);

  if (restaurantError || menuError) {
    console.error(
      "Supabase error:",
      restaurantError?.message || menuError?.message,
    );
    throw new Error("Failed to fetch restaurant details");
  }

  const restaurantDetails = {
    ...restaurant,
    menu: menu,
  } as Restaurant;

  // console.log(`fetching details for ${restaurantId}:`, restaurantDetails);

  return restaurantDetails;
};
export async function getOrderedRestaurants(lat: number, lng: number) {
  const { data, error } = await supabase.rpc("restaurants").select(`
      id,
      name: restaurant_name,  
      rating: average_rating,
      image: cover_image_url,
      lat,
      lng
      `);
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  if (error) throw new Error("Failed to fetch restaurants");
  const restaurants = data as Restaurant[]; // bad practice but quick fix
  // const restaurants: Restaurant[] = data || [];
  // console.log("fetched restaurants:", restaurants);
  // Calculate distance for each restaurant
  const restaurantsWithDistance = await Promise.all(
    restaurants.map(async (restaurant: Restaurant) => {
      try {
        const results = await fetch(
          `https://graphhopper.com/api/1/route?point=${lat},${lng}&point=${restaurant.lat},${restaurant.lng}&profile=bike&locale=en&calc_points=false&key=${process.env.GRAPHHOPPER_API_KEY}`,
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
