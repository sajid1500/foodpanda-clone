import { z } from "zod";

export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  imagePath: z.string(),
});

export const selectedAddonSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

export const cartItemSchema = menuItemSchema.extend({
  quantity: z.number(),
  // selectedAddons: z.array(selectedAddonSchema),
});

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
  restaurantId: z.string(),
  restaurantName: z.string(),
  restaurantImage: z.string(),
});

export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
