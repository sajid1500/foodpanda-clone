import { getServerClient } from "../config/supabase/server";

const getOrdersByStatus = async (status: string) => {
  const supabase = await getServerClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `id,
      status,
      total_amount,
      created_at,
      order_items (
        id,
        quantity,
        price,
        food_item:food_items (
          id,
          name,
          description,
          image_url
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

const channels = supabase
  .channel("custom-update-channel")
  .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "orders" },
    (payload) => {
      console.log("Change received!", payload);
    },
  )
  .subscribe();
