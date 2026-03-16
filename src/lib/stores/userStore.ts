import { create } from "zustand";
import { UserAddress } from "../types/user.types";
import { LocationDetails } from "../types/location.types";

interface UserStore {
  userAddresses: UserAddress[];
  defaultUserAddress: UserAddress | null;
  selectedLocation: UserAddress | null;
  setUserAddresses: (addresses: UserAddress[]) => void;
  setDefaultUserAddress: (address: UserAddress | null) => void;
  setSelectedLocation: (location: UserAddress | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userAddresses: [],
  defaultUserAddress: null,
  selectedLocation: null,
  setUserAddresses: (addresses) => {
    set({ userAddresses: addresses });
    set({
      defaultUserAddress: addresses.find((addr) => addr.isDefault) || null,
    });
  },
  setDefaultUserAddress: (address) => set({ defaultUserAddress: address }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));
