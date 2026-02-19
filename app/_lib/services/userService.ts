import { getUserForServer } from "../utils/auth";
import supabase from "../config/supabase";
import {
  AutocompleteResult,
  ForwardGeocodeResult,
  Location,
  ReverseGeocodeResult,
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

export const searchAddress = async (query: string): Promise<Location[]> => {
  try {
    const response = await fetch(
      `https://api.locationiq.com/v1/autocomplete?key=${process.env.LOCATIONIQ_API_KEY}&q=${encodeURIComponent(query)}&countrycodes=bd`,
    );
    const locations = (await response.json()) as AutocompleteResult[];

    const formattedLocations = locations.map((location) => {
      const mainText = location.display_place;
      const secondaryText = location.display_address;
      const formattedAddress = mainText + " " + secondaryText;
      return {
        id: location.osm_id,
        formattedAddress,
      };
    });
    return formattedLocations;
  } catch (error) {
    console.error("Geocoding error:", error);
    return [];
  }
};

export const forwardGeocode = async (query: string): Promise<Location[]> => {
  try {
    const response = await fetch(
      // `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(query)}&locale=en&key=${process.env.GRAPHHOPPER_API_KEY}`,
      `https://us1.locationiq.com/v1/search?key=${process.env.LOCATIONIQ_API_KEY}&q=${encodeURIComponent(query)}&format=json&countrycodes=bd`,
    );
    const locations = (await response.json()) as ForwardGeocodeResult[];

    const formattedLocations = locations.map((location) => {
      const parts = location.display_name.split(",");
      const mainText = parts[0].trim();
      const secondaryText = parts[1];
      const formattedAddress = mainText + " " + secondaryText;
      return {
        id: location.place_id,
        formattedAddress,
        mainText,
        secondaryText,
        coords: {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon),
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
    const location = (await res.json()) as ReverseGeocodeResult;
    if (!location) return null;

    const formattedAddress = [location.display_name].filter(Boolean).join(" ");
    console.log("formattedAddress", formattedAddress);
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      id: location.osm_id,
      formattedAddress,
    };
  } catch (error) {
    console.error("Failed to fetch location:", error);
    return null;
  }
};
