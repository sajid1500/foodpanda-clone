import { create } from "zustand";
import { Address } from "../validators/address.schema";

interface UserStore {
  tempAddress: Address;
  searchQuery: string;
  position: [number, number];
  setTempAddress: (location: Address) => void;
  resetTempAddress: () => void;
  setSearchQuery: (searchQuery: string) => void;
  setPosition: (position: [number, number]) => void;
}
const initialAddress: Address = {
  id: "",
  osmId: "",
  addressLine1: "",
  addressLine2: "",
  label: "",
  isDefault: true,
  city: "",
  street: "",
  house: "",
  coords: {
    lat: 23.7461,
    lng: 90.3742,
  },
  note: "",
};
export const useUserStore = create<UserStore>((set) => ({
  tempAddress: initialAddress,
  searchQuery: "",
  position: [23.7461, 90.3742],
  setTempAddress: (location) => set({ tempAddress: location }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setPosition: (position) => set({ position }),
  resetTempAddress: () =>
    set((state) => ({
      tempAddress: { ...state.tempAddress, ...initialAddress },
    })),
}));
