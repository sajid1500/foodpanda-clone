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

export interface AutocompleteResponse extends Array<AutocompleteResponseHit> {}

export type LocationDetails = {
  osmId: string;
  street: string;
  house: string;
  city: string;
  coords: {
    lat: number;
    lng: number;
  };
};
