export interface ReverseGeocodeHit {
  point: {
    lat: number;
    lng: number;
  };
  /** [min_lng, min_lat, max_lng, max_lat] */
  extent?: [number, number, number, number];
  name: string;
  country: string;
  countrycode: string;
  osm_id: number;
  osm_type: "R" | "N" | "W"; // Relation, Node, or Way
  osm_key: string;
  osm_value: string;
  city?: string;
  street?: string;
  postcode?: string;
}

export interface ForwardGeocodeHit {
  place_id: string;
  licence: string;
  lat: string;
  lon: string;
  display_name: string;
  boundingbox: [string, string, string, string];
  importance: number;
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
