import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RestaurantSummary } from "../types/resaurant.types";
import { Cart, MenuItem } from "../validators/cart.schema";

interface CartStore {
  cart: Cart | null;
  addToCart: (item: MenuItem, restaurant: RestaurantSummary) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}
const defaultCart: Cart = {
  restaurantId: "",
  restaurantName: "",
  restaurantImage: "",
  items: [],
};
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: defaultCart,
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
            return { cart: defaultCart };
          }

          const items = state.cart.items.filter((item) => item.id !== itemId);

          if (items.length === 0) {
            return { cart: defaultCart };
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
            return { cart: defaultCart };
          }

          if (quantity <= 0) {
            const items = state.cart.items.filter((item) => item.id !== itemId);

            if (items.length === 0) {
              return { cart: defaultCart };
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
          cart: defaultCart,
        }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
