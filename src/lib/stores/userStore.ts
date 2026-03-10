import { create } from "zustand";
import { UserAddress } from "../types/user.types";

interface UserStore {
  selectedAddress: UserAddress | null;
  setSelectedAddress: (address: UserAddress | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  selectedAddress: null,
  setSelectedAddress: (address) => set({ selectedAddress: address }),
}));
