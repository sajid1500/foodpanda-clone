export interface ForwardGeocodeResult {
  place_id: string;
  licence: string;
  osm_type?: string;
  osm_id?: string;
  lat: string;
  lon: string;
  display_name: string;
  boundingbox: [string, string, string, string];
  importance: number;
}

export interface ReverseGeocodeResult {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    attraction?: string;
    house_number?: string;
    road?: string;
    city_block?: string;
    suburb?: string;
    city_district?: string;
    city?: string;
    state?: string;
    region?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
  boundingbox: [string, string, string, string];
}

export interface AutocompleteResult {
  place_id: string;
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
    postcode?: string;
    country?: string;
    country_code?: string;
  };
}

export interface Location {
  id: string | number;
  formattedAddress: string;
  mainText?: string;
  secondaryText?: string;
  coords?: {
    lat: number;
    lng: number;
  };
}

// const dummyAutocompleteResult: AutocompleteResult = {
//   place_id: "333850089706",
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
//   place_id: "98018981",
//   licence: "https:\/\/locationiq.com\/attribution",
//   osm_type: "way",
//   osm_id: "5013364",
//   lat: "48.8582599",
//   lon: "2.2945006358633115",
//   display_name:
//     "Eiffel Tower, 5, Avenue Anatole France, Quartier du Gros-Caillou, 7th Arrondissement, Paris, Ile-de-France, Metropolitan France, 75007, France",
//   address: {
//     attraction: "Eiffel Tower",
//     house_number: "5",
//     road: "Avenue Anatole France",
//     city_block: "Quartier du Gros-Caillou",
//     suburb: "7th Arrondissement",
//     city_district: "Paris",
//     city: "Paris",
//     state: "Ile-de-France",
//     region: "Metropolitan France",
//     postcode: "75007",
//     country: "France",
//     country_code: "fr",
//   },
//   boundingbox: ["48.8574753", "48.8590453", "2.2933119", "2.2956897"],
// };

// const dummyForwardGeocode = [
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
