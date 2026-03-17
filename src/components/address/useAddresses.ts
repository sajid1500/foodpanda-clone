// hooks/useRestaurants.ts
import { getAddresses } from "@/lib/services/userService";
import { useQuery } from "@tanstack/react-query";

export function useAddresses() {
  const { isPending, error, data } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => await getAddresses(),
  });
  const defaultAddress = data?.find((addr) => addr.isDefault);
  if (!data) throw new Error("No addresses saved yet");
  return { addresses: data, isLoading: isPending, error, defaultAddress };
}
