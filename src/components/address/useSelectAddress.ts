import { selectAddressAction } from "@/lib/actions/address";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSelectAddress = () => {
  const queryClient = useQueryClient();

  const { mutate: selectAddress } = useMutation({
    mutationFn: selectAddressAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
  return { selectAddress };
};
