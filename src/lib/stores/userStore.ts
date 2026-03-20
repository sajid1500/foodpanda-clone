import { create } from "zustand";
import { Address } from "../validators/address.schema";

interface UserStore {
  tempAddress: Address | null;
  setTempAddress: (location: Address | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  tempAddress: null,
  setTempAddress: (location) => set({ tempAddress: location }),
}));
