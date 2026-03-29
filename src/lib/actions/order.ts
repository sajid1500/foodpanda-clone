"use server";
import { getServerClient } from "../config/supabase/server";
import { TablesInsert } from "../types/database.types";
import { getCartTotal } from "../utils/helpers";
import { Cart } from "../validators/cart.schema";

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

  const validatedCartItems = cart.items
    .map((item) => {
      const menuItem = menuItems?.find((m) => m.id === item.id);
      return menuItem ? { ...item, price: menuItem.price } : null;
    })
    .filter((item) => item !== null);

  const orderData: TablesInsert<"orders"> = {
    restaurant_id: cart.restaurantId,
    delivery_address: {
      addressLine1: "123 Main St",
    }, // Reuse your existing address schema
    delivery_fee: 33,
    subtotal: getCartTotal(validatedCartItems),
    total: getCartTotal(validatedCartItems) + 33,
    // These are added later by the server/stripe
    status: "pending",
    restaurant_address: {
      addressLine1: "456 Restaurant Ave",
    },
  };

  const { data: order, error } = await supabase
    .from("orders")
    .insert(orderData)
    .select("*")
    .single();

  if (!order || !menuItems) return null;

  const orderItemsData: TablesInsert<"order_items">[] = validatedCartItems.map(
    (item) => ({
      order_id: order.id,
      menu_item_id: item.id,
      quantity: item.quantity,
      name: item.name,
      unit_price: item.price,
    }),
  );
  const { data: orderItems, error: orderItemError } = await supabase
    .from("order_items")
    .insert(orderItemsData);
  // .select("*");
  if (error) {
    console.error("Error creating order:", error);
    throw new Error("Could not create order");
  }

  const paymentData: TablesInsert<"payments"> = {
    order_id: order.id,
    payment_method: "stripe",
    amount: order.total,
    status: "pending",
    stripe_session_id: "some-session-id", // This will be generated when you create a Stripe session
    stripe_payment_id: "some-payment-id", // This will be filled in by the webhook after payment is completed
  };
  const { data: payment, error: paymentError } = await supabase
    .from("payments")
    .insert(paymentData);
  // .select("*");
  if (error) {
    console.error("Error creating order:", error);
    throw new Error("Could not create order");
  }

  return order;
}
