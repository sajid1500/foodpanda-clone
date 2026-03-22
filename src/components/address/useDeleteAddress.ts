import { deleteAddressAction } from "@/lib/actions/address";
import { Address } from "@/lib/validators/address.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const queryKey = ["addresses"] as const;

  const { mutate: deleteAddress } = useMutation({
    mutationFn: deleteAddressAction,
    onMutate: async (addressId) => {
      await queryClient.cancelQueries({ queryKey });
      const previousAddresses = queryClient.getQueryData<Address[]>(queryKey);

      queryClient.setQueryData<Address[]>(queryKey, (old) =>
        (old ?? []).filter((address) => address.id !== addressId),
      );

      return { previousAddresses };
    },
    onError: (_err, _addressId, context) => {
      if (context?.previousAddresses) {
        queryClient.setQueryData(queryKey, context.previousAddresses);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { deleteAddress };
};
