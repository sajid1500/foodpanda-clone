import { saveAddressAction } from "@/lib/actions/address";
import { Address } from "@/lib/validators/address.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveAddress = () => {
  const queryClient = useQueryClient();
  const queryKey = ["addresses"] as const;

  const { mutate: saveAddress } = useMutation({
    mutationFn: saveAddressAction,
    onMutate: async (newAddress) => {
      await queryClient.cancelQueries({ queryKey });
      const previousAddresses = queryClient.getQueryData<Address[]>(queryKey);

      queryClient.setQueryData<Address[]>(queryKey, (old) => {
        const addresses = old ?? [];
        const existingIndex = addresses.findIndex(
          (address) => address.id === newAddress.id,
        );

        if (existingIndex === -1) {
          return [newAddress, ...addresses];
        }

        const next = [...addresses];
        next[existingIndex] = newAddress;
        return next;
      });

      return { previousAddresses };
    },
    onError: (_err, _newAddress, context) => {
      if (context?.previousAddresses) {
        queryClient.setQueryData(queryKey, context.previousAddresses);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { saveAddress };
};
