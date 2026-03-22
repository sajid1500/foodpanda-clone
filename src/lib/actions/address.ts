"use server";

import { Address } from "@/lib/validators/address.schema";
import { getUserForServer } from "@/lib/utils/auth";
import { getServerClient } from "@/lib/config/supabase/server";
import { TablesInsert } from "@/lib/types/database.types";
import { revalidatePath } from "next/cache";
import { getAddresses } from "../services/userService";

export const getAddressesAction = async (): Promise<Address[]> => {
  return await getAddresses();
};

export const saveAddressAction = async (address: Address) => {
  // console.log("Raw form data:", addressToSave);
  const supabase = await getServerClient();
  const userId = (await getUserForServer())?.identities?.[0]?.user_id;
  if (!userId) throw new Error("User not authenticated");

  const newAddress: TablesInsert<"user_addresses"> = {
    id: address.id || undefined, // Let DB generate ID if not provided
    user_id: undefined, // This will be set by the DB based on the authenticated user
    place_id: address.osmId,
    address_line_1: address.addressLine1,
    address_line_2: address.addressLine2,
    label: address.label,
    is_default: address.isDefault || false,
    city: address.city,
    location: `POINT(${address.coords.lng} ${address.coords.lat})`,
    note: address.note,
  };
  // console.log("New address to save:", newAddress);
  const { data: savedAddress, error } = await supabase
    .from("user_addresses")
    .upsert(newAddress)
    .select()
    .single();

  if (error)
    throw new Error(`Error saving address: ${error.message ?? String(error)}`);
  revalidatePath("/");
  return savedAddress;
};
export const deleteAddressAction = async (id: string) => {
  // console.log("Raw form data:", addressToSave);
  const supabase = await getServerClient();
  const userId = (await getUserForServer())?.identities?.[0]?.user_id;
  if (!userId) throw new Error("User not authenticated");
  if (!id) throw new Error("Address ID is required for deletion");
  const { data: savedAddress, error } = await supabase
    .from("user_addresses")
    .delete()
    .eq("id", id);
  // .select()
  // .single();

  if (error)
    throw new Error(
      `Error deleting address: ${error.message ?? String(error)}`,
    );
  revalidatePath("/addresses");
};

// export const selectAddressAction = async (addressId: string) => {
//   const supabase = createClient();
//   const userId = (await getUserForServer())?.identities?.[0]?.user_id;
//   if (!userId) throw new Error("User not authenticated");

//   const { error: error2 } = await supabase
//     .from("user_addresses")
//     .update({ is_default: true })
//     .eq("id", addressId);

//   if (error2)
//     throw new Error(
//       `Error saving address: ${error2.message ?? String(error2)}`,
//     );

//   revalidatePath("/");
// };
