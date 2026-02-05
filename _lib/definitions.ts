export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}
export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  menu: MenuItem[]; // An array of the MenuItem interface above
  lat: number;
  lng: number;
  image: string;
  deliveryTime?: number; // in minutes
  distance?: number; // in kilometers
}

// Create a "Summary" version by picking only what you need
export type RestaurantSummary = Pick<Restaurant, "id" | "name" | "image">;

// Create a "Form" version by omitting the ID (since the DB generates it)
// export type NewRestaurant = Omit<Restaurant, "id">;
