import { getUserForServer } from "../utility/auth";
import supabase from "../supabase";
import {
  ForwardGeocodeHit,
  Location,
  ReverseGeocodeHit,
} from "../types/api.types";

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

export const getAddress = async () => {
  const user = await getUserForServer();
  const userId = user?.id;
  if (!userId) return null;

  const { data: address } = await supabase
    .from("user_addresses")
    .select("*")
    .eq("user_id", userId)
    .single();
  return address;
};

export const forwardGeocode = async (query: string): Promise<Location[]> => {
  // const dummydata = [
  //   {
  //     place_id: "333850089706",
  //     licence: "https:\/\/locationiq.com\/attribution",
  //     lat: "22.538378",
  //     lon: "89.465446",
  //     display_name:
  //       "Bas ar saku(kamarguda canal r upor), Khulna, Khulna, Bangladesh",
  //     boundingbox: ["22.538262", "22.538621", "89.465057", "89.465782"],
  //     importance: 0.25,
  //   },
  // ];
  try {
    const response = await fetch(
      // `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(query)}&locale=en&key=${process.env.GRAPHHOPPER_API_KEY}`,
      `https://us1.locationiq.com/v1/search?key=${process.env.LOCATIONIQ_API_KEY}&q=${encodeURIComponent(query)}&format=json&countrycodes=bd`,
    );
    const locations = (await response.json()) as ForwardGeocodeHit[];

    const formattedLocations = locations.map((hit) => {
      const parts = hit.display_name.split(",");
      const mainText = parts[0].trim();
      const secondaryText = parts[1];
      const formattedAddress = mainText + " " + secondaryText;
      return {
        id: hit.place_id,
        formattedAddress,
        mainText,
        secondaryText,
        coords: {
          lat: parseFloat(hit.lat),
          lng: parseFloat(hit.lon),
        },
      };
    });
    return formattedLocations;
  } catch (error) {
    console.error("Geocoding error:", error);
    return [];
  }
};

export const reverseGeocode = async (
  lat: number,
  lng: number,
): Promise<Location | null> => {
  try {
    const res = await fetch(
      `https://graphhopper.com/api/1/geocode?reverse=true&point=${lat},${lng}&locale=en&key=${process.env.GRAPHHOPPER_API_KEY}`,
    );
    const data = await res.json();
    const hit = data.hits[0] as ReverseGeocodeHit;
    if (!hit) return null;
    const formattedAddress = [hit.street, hit.city].filter(Boolean).join(", ");
    console.log("formattedAddress", formattedAddress);
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      id: hit.osm_id,
      formattedAddress,
      coords: hit.point,
    };
  } catch (error) {
    console.error("Failed to fetch location:", error);
    return null;
  }
};
