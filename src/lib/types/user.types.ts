import { z } from "zod";
import { TablesInsert } from "./database.types";

export const userAddressSchema = z.object({
  id: z.uuid().nullable().optional(), // ID is optional for creation, required for updates
  // userId: z.uuid(),
  osmId: z.number(),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  label: z.string().optional(),
  isDefault: z.boolean().default(false).optional(),
  city: z.string().min(1, "City is required"),
  street: z.string().optional(),
  coords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  note: z.string().optional(),
});

// 2. Automatically generate the Typescript Interfaces
export type Address = z.infer<typeof userAddressSchema>;
