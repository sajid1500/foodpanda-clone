import {
  autocompleteResponseSchema,
  LocationDetails,
  reverseGeocodeResponseSchema,
} from "../validators/geocode.schema";
import { env } from "@/env";

import { addressSchema, type Address } from "../validators/address.schema";

export const getAutocomplete = async (
  query: string,
): Promise<LocationDetails[]> => {
  try {
    const response = await fetch(
      `https://api.locationiq.com/v1/autocomplete?key=${env.LOCATIONIQ_API_KEY}&q=${encodeURIComponent(query)}&countrycodes=bd&accept-language=en&normalizecity=1`,
    );
    const locations = autocompleteResponseSchema.parse(await response.json());
    return locations;
  } catch (error) {
    console.error("Geocoding error:", error);
    return [];
  }
};

export const reverseGeocode = async (
  lat: number,
  lng: number,
): Promise<LocationDetails | null> => {
  try {
    const res = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=${env.LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lng}&format=json&accept-language=en&normalizeaddress=1&normalizecity=1`,
    );
    const location = reverseGeocodeResponseSchema.parse(await res.json());

    // console.log("Parsed address:", addressSchema.parse(address));
    return location;
  } catch (error) {
    console.error("Reverse Geocoding failed:", error);
    // Return null so the UI knows to show the "Enter Address Manually" field
    return null;
  }
};
