import { getUserForServer } from "../utils/auth";
import { createClient } from "../config/supabase/server";
import { createClient as CreateBrowserClient } from "../config/supabase/client";
import { Address } from "../types/user.types";
import { TablesInsert } from "../types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../config/supabase/supabase";

// works on client only
export const getAddresses = async (): Promise<Address[]> => {
  const supabase = await CreateBrowserClient();
  const user = await supabase.auth.getUser();
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

  if (error) throw new Error("Failed to fetch addresses", error);

  return addresses;
};

// works on server only
export const getDefaultAddress = async (): Promise<Address> => {
  const supabase = await createClient();
  const user = await getUserForServer();
  if (!user) return {} as Address;

  const { data: addresses, error } = await supabase
    .from("user_addresses_display")
    .select(
      `
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
    `,
    )
    .eq("is_default", true)
    .single();

  if (error) throw new Error("Failed to fetch default address", error);
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
