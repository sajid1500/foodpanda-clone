import { getUserForServer } from "../utils/auth";
import { createServerClient } from "../config/supabase/server";
import { Address, addressSchema } from "../validators/address.schema";

// works on both only
export const getAddresses = async (): Promise<Address[]> => {
  const supabase = await createServerClient();
  const user = await getUserForServer();

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
      osmId:place_id
    `);

  if (error)
    throw new Error(
      `Failed to fetch addresses: ${error.message ?? String(error)}`,
    );

  return addresses.map((addr) => addressSchema.parse(addr));
};

// works on server only
export const getDefaultAddress = async (): Promise<Address | null> => {
  const supabase = await createServerClient();
  const user = await getUserForServer();
  if (!user) throw new Error("User not authenticated");

  const { data: defaultAddress, error } = await supabase
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
      osmId:place_id
    `,
    )
    .eq("is_default", true)
    .maybeSingle();

  if (error)
    throw new Error(
      `Failed to fetch default address: ${error.message ?? String(error)}`,
    );
  return addressSchema.parse(defaultAddress);
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
