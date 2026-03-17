import { create } from "zustand";
import { Address } from "../types/user.types";

interface UserStore {
  tempAddress: Address | null;
  setTempAddress: (location: Address | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  tempAddress: null,
  setTempAddress: (location) => set({ tempAddress: location }),
}));
