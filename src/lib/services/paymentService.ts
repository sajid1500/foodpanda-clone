import { getServerClient } from "@/lib/config/supabase/server";
import {
  OrderSchema,
  CheckoutPayload,
  Payment,
} from "@/lib/validators/order.schema";

export async function cancelOrder(orderId: string) {
  const supabase = await getServerClient();
  const { data: order, error } = await supabase.rpc("cancel_order", {
    p_order_id: orderId,
  } as never);

  if (error) {
    console.error("Error cancelling order:", error);
    throw new Error("Could not cancel order.");
  }

  return order;
}

export async function getPaymentObject(orderId: string): Promise<Payment> {
  const supabase = await getServerClient();
  const { data: payment, error } = await supabase
    .from("payments")
    .select(
      ` id,
        status,
        stripePaymentId:stripe_payment_id,
        amount,
        paymentMethod:payment_method,
        orderId:order_id
        `,
    )
    .eq("order_id", orderId)
    .single();

  if (error) {
    console.error("Error fetching payment status:", error);
    throw new Error("Could not fetch payment status.");
  }

  if (!payment) {
    throw new Error("Payment not found.");
  }

  return payment;
}

export async function updatePaymentStatus(orderId: string, status: string) {
  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from("payments")
    .update({ status: status })
    .eq("order_id", orderId);
  console.log("Payment update result:", orderId);
  if (error) {
    console.error("Error updating payment status:", error);
    throw new Error("Could not update payment status.");
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from("orders")
    .update({ status: status })
    .eq("id", orderId);
  console.log("Order update result:", orderId);
  if (error) {
    console.error("Error updating order status:", error);
    throw new Error("Could not update order status.");
  }
}

export async function createPaymentRecord(
  orderId: string,
  amount: number,
  stripePaymentId: string,
  paymentMethod: string,
  status: string = "pending",
) {
  const supabase = await getServerClient();
  const { error } = await supabase.from("payments").upsert({
    order_id: orderId,
    amount,
    stripe_payment_id: stripePaymentId,
    payment_method: paymentMethod,
    status,
  });

  if (error) {
    console.error("Error creating payment record:", error);
    throw new Error("Could not create payment record.");
  }
}
