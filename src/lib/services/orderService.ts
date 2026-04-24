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
      orderItems: order_items (
        id,
        quantity,
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
        status
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
