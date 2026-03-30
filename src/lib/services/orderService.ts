import { getServerClient } from "@/lib/config/supabase/server";
import { OrderSchema, CheckoutPayload } from "@/lib/validators/order.schema";

// export async function createOrder(payload: CheckoutPayload) {
//   const supabase = await getServerClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   if (!user) throw new Error("User not authenticated.");
//   const itemIds = payload.items.map((i) => i.menu_item_id);

//   // 1. Fetch real prices AND the specific default address
//   const [menuItemsRes, addressRes] = await Promise.all([
//     supabase.from("menu_items").select("id, price").in("id", itemIds),
//     supabase
//       .from("addresses")
//       .select("house, street, address_line_1, city, is_default")
//       .eq("user_id", user.id)
//       .eq("is_default", true) // <--- Always target the default
//       .single(),
//   ]);

//   // 2. Error if no default address exists
//   if (addressRes.error || !addressRes.data) {
//     throw new Error(
//       "No default address found. Please set one in your profile.",
//     );
//   }

//   if (menuItemsRes.error) {
//     throw new Error("Could not verify item prices.");
//   }

//   // 3. Format the address string from your table columns
//   const addr = addressRes.data;
//   const fullAddress = `${addr.house}, ${addr.street}, ${addr.address_line_1}, ${addr.city}`;

//   // 4. Verify items and calculate totals
//   const verifiedItems = payload.items.map((cartItem) => {
//     const dbItem = menuItemsRes.data.find(
//       (m) => m.id === cartItem.menu_item_id,
//     );
//     if (!dbItem) throw new Error("Item no longer available.");
//     return { ...cartItem, unit_price: dbItem.price };
//   });

//   const subtotal = verifiedItems.reduce(
//     (acc, i) => acc + i.unit_price * i.quantity,
//     0,
//   );
//   const deliveryFee = 50; // Or dynamic logic based on addr.city/area
//   const totalAmount = subtotal + deliveryFee;

//   // 5. Final Validation and RPC
//   const validatedData = OrderSchema.parse({
//     restaurant_id: payload.restaurantId,
//     delivery_address: fullAddress,
//     delivery_fee: deliveryFee,
//     total_amount: totalAmount,
//   });

//   const { data: orderId, error: rpcError } = await supabase.rpc(
//     "place_team_order",
//     {
//       p_restaurant_id: validatedData.restaurant_id,
//       p_total_amount: validatedData.total_amount,
//       p_delivery_fee: validatedData.delivery_fee,
//       p_delivery_address: validatedData.delivery_address,
//       p_items: verifiedItems,
//     },
//   );

//   if (rpcError) throw new Error(rpcError.message);

//   return { orderId, totalAmount };
// }
