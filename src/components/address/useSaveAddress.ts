import { saveAddressAction } from "@/lib/actions/address";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

export const useSaveAddress = () => {
  const { mutate: saveAddress } = useMutation({
    mutationFn: saveAddressAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
  return { saveAddress };
};
