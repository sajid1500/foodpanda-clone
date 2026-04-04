import { z } from "zod";
import { addressSchema } from "./address.schema";

// 1. The Item Schema (What goes inside the array)
export const OrderItemSchema = z.object({
  menuItemId: z.uuid(),
  quantity: z.number().int().positive(),
  unitPrice: z.number(), // Always snapshot the price here
  notes: z.string(),
  name: z.string(), // For easier RPC handling, we include the name here too
});

// 2. The Main Order Schema
export const OrderSchema = z.object({
  restaurantId: z.uuid(),
  deliveryAddress: addressSchema, // Reuse your existing address schema
  restaurantAddress: addressSchema, // Optional, can be filled in by the server based on restaurantId
  deliveryFee: z.number(), // set it to fixed value for now
  subtotal: z.number(),
  total: z.number(),
  // These are added later by the server/stripe
  status: z
    .enum(["pending", "preparing", "completed", "cancelled"])
    .default("pending"),
});

export const paymentSchema = z.object({
  id: z.uuid(),
  orderId: z.uuid(),
  paymentMethod: z.string(),
  amount: z.number(),
  status: z.enum(["pending", "completed", "failed"]),
  stripePaymentId: z.string(),
});

// 3. The "Checkout" Schema (What your API receives)
export const CheckoutPayloadSchema = z.object({
  items: z.array(OrderItemSchema).min(1),
  restaurantId: z.uuid(),
  // Note: We don't trust the client for total_amount or delivery_fee!
});

// Export types
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type Payment = z.infer<typeof paymentSchema>;
export type CheckoutPayload = z.infer<typeof CheckoutPayloadSchema>;
