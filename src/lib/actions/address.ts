"use server";

import { Address } from "@/lib/types/user.types";
import { getUserForServer } from "@/lib/utils/auth";
import { createClient } from "@/lib/config/supabase/server";
import { TablesInsert } from "@/lib/types/database.types";
import { revalidatePath } from "next/cache";
import { getAddresses } from "../services/userService";

export const getAddressesAction = async (): Promise<Address[]> => {
  return await getAddresses();
};

export const saveAddressAction = async (address: Address) => {
  // console.log("Raw form data:", addressToSave);
  const supabase = await createClient();
  const userId = (await getUserForServer())?.identities?.[0]?.user_id;
  if (!userId) throw new Error("User not authenticated");

  const newAddress: TablesInsert<"user_addresses"> = {
    id: address.id || undefined, // Let DB generate ID if not provided
    user_id: undefined, // This will be set by the DB based on the authenticated user
    osm_id: address.osmId,
    address_line_1: address.addressLine1,
    address_line_2: address.addressLine2,
    label: address.label,
    is_default: address.isDefault || false,
    city: address.city,
    location: "POINT(-73.946823 40.807416)",
    note: address.note,
  };
  console.log("New address to save:", newAddress);
  const { data: savedAddress, error } = await supabase
    .from("user_addresses")
    .upsert(newAddress);
  // .select()
  // .single();

  if (error)
    throw new Error(`Error saving address: ${error.message ?? String(error)}`);
  revalidatePath("/addresses");
};
export const deleteAddressAction = async (address: Address) => {
  // console.log("Raw form data:", addressToSave);
  const supabase = await createClient();
  const userId = (await getUserForServer())?.identities?.[0]?.user_id;
  if (!userId) throw new Error("User not authenticated");
  if (!address.id) throw new Error("Address ID is required for deletion");
  const { data: savedAddress, error } = await supabase
    .from("user_addresses")
    .delete()
    .eq("id", address.id);
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
