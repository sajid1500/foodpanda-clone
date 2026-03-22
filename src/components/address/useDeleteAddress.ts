import { deleteAddressAction, saveAddressAction } from "@/lib/actions/address";
import { Address } from "@/lib/validators/address.schema";
import { skipToken, useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteAddress } = useMutation({
    mutationFn: (id: string) => deleteAddressAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
  return { deleteAddress };
};
