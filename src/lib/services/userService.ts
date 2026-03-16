import { getUserForServer } from "../utils/auth";
import { createClient } from "../config/supabase/server";
import { UserAddress } from "../types/user.types";
import { TablesInsert } from "../types/database.types";

export const saveUserAddress = async (address: UserAddress) => {
  const supabase = await createClient();
  // console.log("Saving address for user", user.id, address);
  const userId = (await getUserForServer())?.identities?.[0]?.user_id;
  if (!userId) throw new Error("User not authenticated");

  const newAddress: TablesInsert<"user_addresses"> = {
    id: address.id || undefined, // Let DB generate ID if not provided
    user_id: undefined, // This will be set by the DB based on the authenticated user
    osm_id: address.osmId,
    address_line_1: address.addressLine1,
    address_line_2: address.addressLine2,
    label: address.label,
    is_default: address.isDefault,
    city: address.city,
    location: "POINT(-73.946823 40.807416)",
    note: address.note,
  };

  const { error } = await supabase.from("user_addresses").insert(newAddress);

  if (error) {
    console.error("Error saving address:", error);
    // throw new Error("Failed to save address");
  }
};
export const getUserAddresses = async (): Promise<UserAddress[]> => {
  const supabase = await createClient();
  const user = await getUserForServer();
  if (!user) return [];

  const { data: addresses, error } = await supabase.from(
    "user_addresses_display",
  ).select(`
      id,
      userId:user_id,
      addressLine1:address_line_1,
      addressLine2:address_line_2,
      city,
      coords: coordinates,
      isDefault:is_default,
      label,
      location,
      note,
      osmId:osm_id
    `);
  if (error) return [];
  return addresses;
};
export const getUser = async () => {
  // Simulate a database delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  // const {data: {user}} = await supabase.auth.getUser();
  // const { data, error } = await supabase
  //   .from("users")
  //   .select("*")
  //   .eq("id", user?.id)
  //   .single();
  // console.log("fetched user", user);
  // return {
  //   id: "user123",
  //   name: "John Doe",
  //   location: { lat: 23.8069, lng: 90.3685 },
  // };
};
