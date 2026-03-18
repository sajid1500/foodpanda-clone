import { saveAddressAction } from "@/lib/actions/address";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveAddress = () => {
  const queryClient = useQueryClient();
  const { mutate: saveAddress } = useMutation({
    mutationFn: saveAddressAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
  return { saveAddress };
};
