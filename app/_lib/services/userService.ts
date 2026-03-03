import { getUserForServer } from "../utils/auth";
import supabase from "../config/supabase";
import {
  AutocompleteResponse,
  ReverseGeocodeResponse,
} from "../types/api.types";
import type { Address } from "../types/api.types";
import { UserAddress } from "../types/user.types";
import { Point } from "leaflet";

export const saveAddress = async (address: Address) => {
  const user = await getUserForServer();
  if (!user) throw new Error("User not authenticated");

  const newAddress = {
    address_line_1: address.formattedAddress ?? null,
    city: address.city ?? null,
    place_id: String(address.id),
    location: `Point(${address.coords.lat}, ${address.coords.lng})`,
  };

  const { error } = await supabase.from("user_addresses").upsert({
    user_id: user.id,
    ...newAddress,
  });
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

export const getAutocomplete = async (query: string): Promise<Address[]> => {
  try {
    const response = await fetch(
      `https://api.locationiq.com/v1/autocomplete?key=${process.env.LOCATIONIQ_API_KEY}&q=${encodeURIComponent(query)}&countrycodes=bd&accept-language=en&normalizecity=1`,
    );
    const locations = (await response.json()) as AutocompleteResponse;

    const formattedLocations = locations.map((location) => {
      const street = location.address.road || "";
      const city = location.address.city || "";
      const house =
        location.address.house_number || location.address.name || "";
      const formattedAddress = `${house ? house + ", " : ""}${street ? street + ", " : ""}${city}`;
      return {
        id: location.place_id,
        house,
        city,
        street,
        formattedAddress,
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
): Promise<Address | null> => {
  try {
    const res = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=${process.env.LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lng}&format=json&accept-language=en&normalizeaddress=1`,
    );
    const location = (await res.json()) as ReverseGeocodeResponse;
    const city = location.address.city || "";
    const street = location.address.road || "";
    const house = location.address.house_number || "";
    const formattedAddress = `${house ? house + ", " : ""}${street ? street + ", " : ""}${city}`;
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      id: location.place_id,
      house,
      street,
      city,
      formattedAddress,
      coords: {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lon),
      },
    };
  } catch (error) {
    console.error("Failed to fetch location:", error);
    return null;
  }
};
