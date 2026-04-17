"use server";
import { getServerClient } from "../config/supabase/server";
import { createPaymentRecord } from "../services/orderService";
import { TablesInsert } from "../types/database.types";
import { getCartTotal } from "../utils/helpers";
import { Cart } from "../validators/cart.schema";
import { OrderSchema } from "../validators/order.schema";

export async function createOrder(cart: Cart) {
  // Implementation for creating an order
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }
  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("id, price")
    .in(
      "id",
      cart.items.map((item) => item.id),
    );
  if (menuItems === null) return;
  const validatedCartItems = cart.items
    .map((item) => {
      const menuItem = menuItems?.find((m) => m.id === item.id);
      return menuItem
        ? {
            p_quantity: item.quantity,
            p_menu_item_id: item.id,
            p_price: menuItem.price,
            p_name: item.name,
            p_notes: "item.notes",
          }
        : null;
    })
    .filter((item) => item !== null);

  const { data: orderId, error: orderError } = await supabase.rpc(
    "place_order",
    {
      p_restaurant_id: cart.restaurantId,
      p_items: validatedCartItems,
    },
  );
  console.log("Order ID:", orderId, "Error:", orderError);

  if (orderId)
    await createPaymentRecord(
      orderId,
      validatedCartItems.reduce(
        (total, item) => total + item.p_price * item.p_quantity,
        0,
      ) + 33, // Assuming a fixed delivery fee of 33
      "pending-payment-id",
      "stripe",
      "pending",
    );

  return orderId;
}
