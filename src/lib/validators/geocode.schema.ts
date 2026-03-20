import { z } from "zod";
import { formatAddress } from "../utils/helpers";

export const locationDetailsSchema = z.object({
  osmId: z.string(),
  street: z.string(),
  house: z.string(),
  city: z.string(),
  coords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  // formattedAddress: z.string(),
});

export const autocompleteResponseSchema = z.array(
  z
    .object({
      place_id: z.string(),
      osm_id: z.string(),
      osm_type: z.string(),
      licence: z.string(),
      lat: z.coerce.number(),
      lon: z.coerce.number(),
      boundingbox: z.array(z.string()),
      class: z.string(),
      type: z.string(),
      display_name: z.string(),
      display_place: z.string(),
      display_address: z.string(),
      address: z.object({
        name: z.string().optional(),
        house_number: z.string().optional(),
        road: z.string().optional(),
        neighbourhood: z.string().optional(),
        suburb: z.string().optional(),
        city: z.string().optional(),
        county: z.string().optional(),
        state: z.string().optional(),
        state_code: z.string().optional(),
        postcode: z.string().optional(),
        country: z.string().optional(),
        country_code: z.string().optional(),
      }),
    })
    .transform((data) => {
      return {
        licence: data.licence,
        class: data.class,
        type: data.type,
        placeId: data.place_id,
        osmType: data.osm_type,
        osmId: data.osm_id,
        lat: Number(data.lat),
        lng: Number(data.lon),
        displayName: data.display_name,
        displayPlace: data.display_place,
        displayAddress: data.display_address,
        boundingbox: data.boundingbox,
        address: {
          name: data.address.name ?? "",
          houseNumber: data.address.house_number ?? "",
          road: data.address.road ?? "",
          neighbourhood: data.address.neighbourhood ?? "",
          suburb: data.address.suburb ?? "",
          city: data.address.city ?? "",
          county: data.address.county ?? "",
          state: data.address.state ?? "",
          stateCode: data.address.state_code ?? "",
          postcode: data.address.postcode ?? "",
          country: data.address.country ?? "",
          countryCode: data.address.country_code ?? "",
        },
      };
    })
    .transform((data) => {
      const { houseNumber, road, city, name } = data.address;
      const house = houseNumber ?? name;
      return {
        osmId: data.osmId,
        street: road,
        house,
        city,
        coords: {
          lat: data.lat,
          lng: data.lng,
        },
        // formattedAddress: formatAddress(house, road, city),
      };
    })
    .pipe(locationDetailsSchema),
);

export const reverseGeocodeResponseSchema = z
  .object({
    place_id: z.string(),
    licence: z.string(),
    osm_type: z.string().optional(),
    osm_id: z.string().optional(),
    lat: z.coerce.number(),
    lon: z.coerce.number(),
    display_name: z.string(),
    address: z.object({
      name: z.string().optional(),
      house_number: z.string().optional(),
      road: z.string().optional(),
      neighbourhood: z.string().optional(),
      suburb: z.string().optional(),
      island: z.string().optional(),
      city: z.string().optional(),
      county: z.string().optional(),
      state: z.string().optional(),
      state_code: z.string().optional(),
      postcode: z.string().optional(),
      country: z.string().optional(),
      country_code: z.string().optional(),
    }),
    boundingbox: z.array(z.string()),
    distance: z.number().optional(),
    namedetails: z
      .object({
        name: z.string().optional(),
      })
      .catchall(z.unknown())
      .optional(),
    extratags: z.record(z.string(), z.unknown()).optional(),
    geojson: z
      .object({
        type: z.string(),
        coordinates: z.array(z.number()),
      })
      .optional(),
    geokml: z.string().optional(),
    svg: z.string().optional(),
    geotext: z.string().optional(),
    postaladdress: z.string().optional(),
  })
  .transform((data) => {
    return {
      licence: data.licence,
      placeId: data.place_id,
      osmType: data.osm_type ?? "",
      osmId: data.osm_id ?? "",
      lat: Number(data.lat),
      lng: Number(data.lon),
      displayName: data.display_name,
      boundingbox: data.boundingbox,
      distance: data.distance ?? "",
      namedetails: data.namedetails ?? "",
      extratags: data.extratags ?? "",
      geojson: data.geojson ?? "",
      geokml: data.geokml ?? "",
      svg: data.svg ?? "",
      geotext: data.geotext ?? "",
      postaladdress: data.postaladdress ?? "",
      address: {
        name: data.address.name ?? "",
        houseNumber: data.address.house_number ?? "",
        road: data.address.road ?? "",
        neighbourhood: data.address.neighbourhood ?? "",
        suburb: data.address.suburb ?? "",
        island: data.address.island ?? "",
        city: data.address.city ?? "",
        county: data.address.county ?? "",
        state: data.address.state ?? "",
        stateCode: data.address.state_code ?? "",
        postcode: data.address.postcode ?? "",
        country: data.address.country ?? "",
        countryCode: data.address.country_code ?? "",
      },
    };
  })
  .transform((data) => {
    const { houseNumber, road, city, name } = data.address;
    const house = houseNumber ?? name;
    return {
      osmId: data.osmId,
      street: road,
      house,
      city,
      coords: {
        lat: data.lat,
        lng: data.lng,
      },
      // formattedAddress: formatAddress(house, road, city),
    };
  })
  .pipe(locationDetailsSchema);

// export type AutocompleteResponse = z.infer<typeof autocompleteResponseSchema>;
// export type ReverseGeocodeResponse = z.infer<
//   typeof reverseGeocodeResponseSchema
// >;

export type LocationDetails = z.infer<typeof locationDetailsSchema>;
