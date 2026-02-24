import { MenuItem } from "./resaurant.types";

export interface CartItem extends MenuItem {
  quantity: number;
  selectedAddons?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

// The overall state of the cart
export interface Cart {
  items: CartItem[];
  restaurantId: string; // To track which restaurant the user is currently ordering from
  restaurantName: string;
  restaurantImage?: string;
}
