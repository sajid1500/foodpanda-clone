import { getServerClient } from "../config/supabase/server";

export const getOrdersByStatus = async (status: string) => {
  const supabase = await getServerClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `id,
      status,
      subtotal,
      deliveryFee:delivery_fee,
      total,
      createdAt: created_at,
      note,
      deliveryAddress: delivery_address,
      orderNumber: order_number,
      restaurant: restaurants (
        id,
        name
      ),
      orderItems: order_items (
        id,
        quantity,
        name,
        unitPrice: unit_price,
        menuItem:menu_items (
          id,
          name,
          description,
          imagePath: image_path
        )
      ),
      payments (
        id,
        amount,
        status,
        paymentMethod: payment_method
      )
    `,
    )
    .eq("status", status);

  if (error) {
    console.error("Error fetching orders by status:", error);
    throw new Error("Could not fetch orders.");
  }

  return orders;
};
