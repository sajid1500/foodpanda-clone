import {
  AutocompleteResponse,
  ReverseGeocodeResponse,
} from "../types/location.types";
import type { LocationDetails } from "../types/location.types";

export const getAutocomplete = async (
  query: string,
): Promise<LocationDetails[]> => {
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
        osmId: Number(location.osm_id),
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
): Promise<LocationDetails | null> => {
  try {
    const res = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=${process.env.LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lng}&format=json&accept-language=en&normalizeaddress=1`,
    );
    const location = (await res.json()) as ReverseGeocodeResponse;
    const city = location.address.city || "";
    const street = location.address.road || "";
    const house = location.address.house_number || "";
    const formattedAddress = `${house ? house + ", " : ""}${street ? street + ", " : ""}${city}`;
    return {
      osmId: Number(location.osm_id),
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
