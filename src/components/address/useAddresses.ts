// hooks/useRestaurants.ts
// import { getAddresses } from "@/lib/services/userService";
import { useQuery } from "@tanstack/react-query";

import { getUserForServer } from "@/lib/utils/auth";
import { createBrowserClient } from "@/lib/config/supabase/client";
import { Address } from "@/lib/validators/address.schema";
import { TablesInsert } from "@/lib/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/config/supabase/supabase";
import { getAddressesAction } from "@/lib/actions/address";

export function useAddresses(userAddresses: Address[] = []) {
  const {
    isPending,
    error,
    data: addresses,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddressesAction,
    initialData: userAddresses,
  });

  const defaultAddress = addresses?.find((addr) => addr.isDefault);
  return { addresses, isLoading: isPending, error, defaultAddress };
}
