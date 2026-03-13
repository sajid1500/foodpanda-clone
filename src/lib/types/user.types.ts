import { z } from "zod";

export const userAddressSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  osmId: z.number(),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string(),
  label: z.enum(["Home", "Work", "Partner", "Other"]).default("Home"),
  isDefault: z.boolean().default(false),
  city: z.string().min(1, "City is required"),
  coords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  note: z.string(),
});

// 2. Automatically generate the Typescript Interfaces
export type UserAddress = z.infer<typeof userAddressSchema>;
export type CreateUserAddress = Omit<UserAddress, "id">;

// This takes your frontend object and converts it for the DB
export const dbAddressSchema = userAddressSchema.transform((data) => ({
  user_id: data.userId,
  osm_id: data.osmId, // Ensure your DB column type matches (string vs number)
  address_line_1: data.addressLine1,
  address_line_2: data.addressLine2,
  label: data.label,
  is_default: data.isDefault,
  city: data.city,
  location: data.coords, // Maps 'coords' to 'location'
  note: data.note,
}));
