export interface MenuItem {
  id: string;
  name: string;
  price: number;
  imagePath: string | null;
}
export interface Restaurant {
  id: string;
  shortId?: string;
  name: string;
  averageRating: number | null;
  menu: MenuItem[] | []; // An array of the MenuItem interface above
  coords: {
    lat: number;
    lng: number;
  };
  bannerPath: string;
  logoPath: string;
  time?: number; // in minutes
  distanceMeters?: number; // in meters
}

// Create a "Summary" version by picking only what you need
export type RestaurantSummary = Pick<
  Restaurant,
  | "id"
  | "shortId"
  | "name"
  | "bannerPath"
  | "logoPath"
  | "averageRating"
  | "distanceMeters"
>;

// Create a "Form" version by omitting the ID (since the DB generates it)
// export type NewRestaurant = Omit<Restaurant, "id">;
