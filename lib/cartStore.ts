import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MenuItem, RestaurantSummary } from "./definitions";

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

interface CartStore {
  cart: Cart | null;
  addToCart: (item: MenuItem, restaurant: RestaurantSummary) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      addToCart: (item, restaurant) =>
        set((state) => {
          // console.log("Adding to cart", item, restaurantId);
          // Clear cart if ordering from a different restaurant
          if (
            state.cart?.restaurantId &&
            state.cart.restaurantId !== restaurant.id
          ) {
            // console.log("Clearing cart for new restaurant");
            return {
              cart: {
                items: [{ ...item, quantity: 1 }],
                restaurantId: restaurant.id,
                restaurantName: restaurant.name,
                restaurantImage: restaurant.logoPath ?? restaurant.bannerPath,
              },
            };
          }

          // Check if item already exists in cart
          const existingItem = state.cart?.items.find(
            (cartItem) => cartItem.id === item.id,
          );

          if (state.cart && existingItem) {
            return {
              cart: {
                ...state.cart,
                items: state.cart.items.map((cartItem) =>
                  cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem,
                ),
              },
            };
          }

          return {
            cart: {
              items: [...(state.cart?.items ?? []), { ...item, quantity: 1 }],
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
              restaurantImage: restaurant.logoPath ?? restaurant.bannerPath,
            },
          };
        }),

      removeFromCart: (itemId) =>
        set((state) => {
          if (!state.cart) {
            return { cart: null };
          }

          const items = state.cart.items.filter((item) => item.id !== itemId);

          if (items.length === 0) {
            return { cart: null };
          }

          return {
            cart: {
              ...state.cart,
              items,
            },
          };
        }),

      updateQuantity: (itemId, quantity) =>
        set((state) => {
          if (!state.cart) {
            return { cart: null };
          }

          if (quantity <= 0) {
            const items = state.cart.items.filter((item) => item.id !== itemId);

            if (items.length === 0) {
              return { cart: null };
            }

            return {
              cart: {
                ...state.cart,
                items,
              },
            };
          }

          return {
            cart: {
              ...state.cart,
              items: state.cart.items.map((item) =>
                item.id === itemId ? { ...item, quantity } : item,
              ),
            },
          };
        }),

      clearCart: () =>
        set({
          cart: null,
        }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
