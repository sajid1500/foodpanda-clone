// hooks/useRestaurants.ts
// import { getAddresses } from "@/lib/services/userService";
import { useQuery } from "@tanstack/react-query";

import { getUserForServer } from "@/lib/utils/auth";
import { createClient } from "@/lib/config/supabase/client";
import { createClient as CreateBrowserClient } from "@/lib/config/supabase/client";
import { Address } from "@/lib/types/user.types";
import { TablesInsert } from "@/lib/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/config/supabase/supabase";

export const getAddresses = async (
  supabase: SupabaseClient,
): Promise<Address[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

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

  if (error)
    throw new Error(
      `Failed to fetch addresses: ${error.message ?? String(error)}`,
    );

  return addresses;
};
export function useAddresses(userAddresses: Address[] = []) {
  const client = createClient();
  const {
    isPending,
    error,
    data: addresses,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => getAddresses(client),
    initialData: userAddresses,
  });

  const defaultAddress = addresses?.find((addr) => addr.isDefault);
  return { addresses, isLoading: isPending, error, defaultAddress };
}
