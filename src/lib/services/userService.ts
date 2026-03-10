import { getUserForServer } from "../utils/auth";
import { supabase } from "../config/supabase";
import { CreateUserAddress, UserAddress } from "../types/user.types";

export const saveUserAddress = async (address: CreateUserAddress) => {
  const user = await getUserForServer();
  if (!user) throw new Error("User not authenticated");

  const newAddress = {
    // address_line_1: address.formattedAddress ?? null,
    city: address.city ?? null,
    place_id: String(address.id),
    location: `Point(${address.coords.lat}, ${address.coords.lng})`,
  };

  const { error } = await supabase.from("user_addresses").upsert({
    user_id: user.id,
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
