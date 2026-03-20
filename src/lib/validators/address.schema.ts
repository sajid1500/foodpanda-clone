import { z } from "zod";
import { TablesInsert } from "../types/database.types";
import { formatAddress } from "../utils/helpers";
import { format } from "path";

const emptyIfNullish = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((value) => (value == null ? "" : value), schema);

// TODO: have formattedAddress as a derived property
export const addressSchema = z.object({
  id: z.uuid(), // ID is optional for creation, required for updates
  osmId: emptyIfNullish(z.coerce.string()),
  addressLine1: emptyIfNullish(z.string().trim().min(1, "Address is required")),
  addressLine2: emptyIfNullish(z.string()),
  label: emptyIfNullish(z.string()),
  isDefault: z.boolean().default(true).optional(),
  city: emptyIfNullish(z.string().trim()),
  street: emptyIfNullish(z.string()),
  house: emptyIfNullish(z.string()),
  coords: z.object({
    lat: z.coerce.number().min(-90).max(90),
    lng: z.coerce.number().min(-180).max(180),
  }),
  note: emptyIfNullish(z.string()),
});

export type Address = z.infer<typeof addressSchema>;

// export const uiAddressSchema = addressSchema.transform((data) => ({
//   ...data,
//   formattedAddress: formatAddress(data.house, data.street, data.city),
// }));

// export const viewAddressSchema = baseAddressSchema.extend({
//   formattedAddress: z.string(),
// });
// export const dbAddressSchema = z.object()

// .transform((data) => {
//   const { street, city, house } = data;
//   return {
//     ...data,
//     formattedAddress: formatAddress(house, street, city),
//   };
// });

// 2. Automatically generate the Typescript Interfaces

// const nullableString = z.preprocess(
//   (v) => (v === "" ? null : v),
//   z.string().trim(),
// );
