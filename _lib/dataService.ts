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

  console.log("restaurants data from supabase:", restaurants, error);
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
  console.log("fetching details for restaurantId:", restaurantId);
  return {
    id: restaurantId,
    name: "Spice Garden",
    rating: 4.5,
    menu: [
      {
        id: "1",
        name: "Chicken Biryani",
        price: 250,
        image:
          "https://i0.wp.com/thewannabecook.com/wp-content/uploads/2022/07/Beef_Tehari_Recipe.jpg",
      },
      { id: "2", name: "Mutton Biryani", price: 300 },
    ],
    lat: 23.75, lng: 90.38 ,
    image: "/restaurant.jpg",
  };
};
export async function getOrderedRestaurants(lat: number, lng: number) {
  const restaurants = await getRestaurants();

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
