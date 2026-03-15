export interface ReverseGeocodeResponse {
  osm_id: string;
  licence: string;
  osm_type?: string;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    name?: string;
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    island?: string;
    city?: string;
    county?: string;
    state?: string;
    state_code?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
  boundingbox: [string, string, string, string];
}

export interface AutocompleteResponseHit {
  osm_id: string;
  osm_type: string;
  licence: string;
  lat: string;
  lon: string;
  boundingbox: [string, string, string, string];
  class: string;
  type: string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: {
    name?: string;
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    county?: string;
    state?: string;
    state_code?: string;
    postcode?: string;
    country?: string;
  };
}

export type AutocompleteResponse = AutocompleteResponseHit[];

export interface LocationDetails {
  osmId: number;
  city: string;
  street: string;
  house: string;
  formattedAddress: string;
  coords: {
    lat: number;
    lng: number;
  };
}

// const dummyAutocompleteResult: AutocompleteResult = {
//   osm_id: "333850089706",
//   licence: "https:\/\/locationiq.com\/attribution",
//   osm_id: "123456789",
//   osm_type: "node",
//   lat: "22.538378",
//   lon: "89.465446",
//   boundingbox: ["22.538262", "22.538621", "89.465057", "89.465782"],
//   class: "place",
//   type: "house",
//   display_name:
//     "Bas ar saku(kamarguda canal r upor), Khulna, Khulna, Bangladesh",
//   display_place: "Bas ar saku(kamarguda canal r upor)",
//   display_address: "Khulna, Khulna, Bangladesh",
//   address: {
//     name: "Bas ar saku(kamarguda canal r upor)",
//     house_number: "",
//     road: "",
//     neighbourhood: "",
//     suburb: "",
//     city: "Kh ulna",
//     county: "Khulna",
//     state: "",
//     postcode: "",
//     country: "Bangladesh",
//     country_code: "bd",
//   },

// const dummyReverseGeocodeHit = {
//   osm_id: "249275314",
//   licence: "https:\/\/locationiq.com\/attribution",
//   osm_type: "way",
//   osm_id: "640228397",
//   lat: "22.538377712571126",
//   lon: "89.465446117245",
//   display_name:
//     "Bas ar saku(kamarguda canal r upor), Dacope Upazila, Khulna District, Khulna Division, 9270, Bangladesh",
//   address: {
//     road: "Bas ar saku(kamarguda canal r upor)",
//     county: "Dacope Upazila",
//     state_district: "Khulna District",
//     state: "Khulna Division",
//     postcode: "9270",
//     country: "Bangladesh",
//     country_code: "bd",
//   },
//   boundingbox: ["22.5382619", "22.5386211", "89.4650569", "89.4657817"],
// };

// const dummyForwardGeocode = [
//   {
//     osm_id: "333850089706",
//     licence: "https:\/\/locationiq.com\/attribution",
//     lat: "22.538378",
//     lon: "89.465446",
//     display_name:
//       "Bas ar saku(kamarguda canal r upor), Khulna, Khulna, Bangladesh",
//     boundingbox: ["22.538262", "22.538621", "89.465057", "89.465782"],
//     importance: 0.25,
//   },
// ];
