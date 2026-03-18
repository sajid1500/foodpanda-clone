import { z } from "zod";
import { TablesInsert } from "./database.types";

export const addressSchema = z
  .object({
    id: z.uuid().nullable().optional(), // ID is optional for creation, required for updates
    osmId: z.coerce.string().nullish(),
    addressLine1: z.string().min(1, "Address is required").optional(),
    addressLine2: z.string().nullish(),
    label: z.coerce.string().optional(),
    isDefault: z.boolean().default(false).optional(),
    city: z.string().min(1, "City is required"),
    street: z.string().optional(),
    house: z.string().optional(),
    coords: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    note: z.string().nullish(),
  })
  .transform((data) => {
    const { street, city, house } = data;
    return {
      ...data,
      formattedAddress: `${house ? house + ", " : ""}${street ? street + ", " : ""}${city}`,
    };
  });

// 2. Automatically generate the Typescript Interfaces
export type Address = z.infer<typeof addressSchema>;
// export type LocationDetails = Address.omit({ id: true, userId: true, osmId: true, isDefault: true, note: true });
