import { getUserForServer } from "../utils/auth";
import { supabase } from "../config/supabase";
import { dbAddressSchema, UserAddress } from "../types/user.types";
import { TablesInsert } from "../types/database.types";

export const saveUserAddress = async (address: UserAddress) => {
  const user = await getUserForServer();
  if (!user) throw new Error("User not authenticated");
  console.log("Saving address for user", user.id, address);

  const newAddress: TablesInsert<"user_addresses"> =
    dbAddressSchema.parse(address);

  const { error } = await supabase.from("user_addresses").upsert({
    id: address.id,
    ...newAddress,
  });
};
export const getUserAddress = async () => {
  const user = await getUserForServer();
  const userId = user?.id;
  if (!userId) return null;

  const { data: address } = await supabase
    .from("user_addresses")
    .select("*")
    .eq("user_id", userId)
    .single();
  return address;
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
