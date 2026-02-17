import { Cart } from "../store/cartStore";

export async function submitOrder(userId: string, cart: Cart) {
  // Simulate order submission delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Here you would typically send the order details to your backend or Supabase
  console.log("Order submitted:", { userId, cart });
}
