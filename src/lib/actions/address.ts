"use server";

import { Address } from "@/lib/types/user.types";
import { getUserForServer } from "@/lib/utils/auth";
import { createClient } from "@/lib/config/supabase/client";
import { TablesInsert } from "@/lib/types/database.types";
import { revalidatePath } from "next/cache";

export const saveAddressAction = async (address: Address) => {
  // console.log("Raw form data:", addressToSave);
  const supabase = createClient();
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

  const { data: savedAddress, error } = await supabase
    .from("user_addresses")
    .insert(newAddress)
    .select()
    .single();

  if (error)
    throw new Error(`Error saving address: ${error.message ?? String(error)}`);

  if (savedAddress) await selectAddressAction(savedAddress.id);
};

export const selectAddressAction = async (addressId: string) => {
  const supabase = createClient();
  const userId = (await getUserForServer())?.identities?.[0]?.user_id;
  if (!userId) throw new Error("User not authenticated");

  const { error: error1 } = await supabase
    .from("user_addresses")
    .update({ is_default: false })
    .eq("is_default", true)
    .select();

  const { error: error2 } = await supabase
    .from("user_addresses")
    .update({ is_default: true })
    .eq("id", addressId);

  if (error1 || error2)
    throw new Error(
      `Error saving address: ${(error1 || error2)?.message ?? String(error1 || error2)}`,
    );

  revalidatePath("/");
};
