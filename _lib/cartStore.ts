import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MenuItem, RestaurantSummary } from "./definitions";

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
  restaurantImage?: string | null;
  addToCart: (item: MenuItem, restaurant: RestaurantSummary) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [
        // {
        //   id: "2",
        //   quantity: 2,
        //   name: "Burger",
        //   price: 5.99,
        //   image: "/restaurant.jpg",
        // },
      ],
      restaurantId: null,
      restaurantName: null,
      restaurantImage: null,
      addToCart: (item, restaurant) =>
        set((state) => {
          // console.log("Adding to cart", item, restaurantId);
          // Clear cart if ordering from a different restaurant
          if (state.restaurantId && state.restaurantId !== restaurant.id) {
            // console.log("Clearing cart for new restaurant");
            return {
              cart: [{ ...item, quantity: 1 }],
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
              restaurantImage: restaurant.logoPath ?? restaurant.bannerPath,
            };
          }

          // Check if item already exists in cart
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id,
          );

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem,
              ),
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
              restaurantImage: restaurant.logoPath ?? restaurant.bannerPath,
            };
          }

          return {
            cart: [...state.cart, { ...item, quantity: 1 }],
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            restaurantImage: restaurant.logoPath ?? restaurant.bannerPath,
          };
        }),

      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
          restaurantId: state.cart.length === 1 ? null : state.restaurantId,
        })),

      updateQuantity: (itemId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter((item) => item.id !== itemId),
              restaurantId: state.cart.length === 1 ? null : state.restaurantId,
            };
          }

          return {
            cart: state.cart.map((item) =>
              item.id === itemId ? { ...item, quantity } : item,
            ),
          };
        }),

      clearCart: () =>
        set({
          cart: [],
          restaurantId: null,
        }),

      getTotalItems: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const state = get();
        return state.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
