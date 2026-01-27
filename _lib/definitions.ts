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
  menu?: MenuItem[]; // An array of the MenuItem interface above
  location?: { lat: number; lng: number };
  image: string;
  deliveryTime?: number; // in minutes
  distance?: number; // in kilometers
}
