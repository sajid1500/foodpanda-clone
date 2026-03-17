import { create } from "zustand";

interface LayoutStore {
  isEmailDrawerOpen: boolean;
  openEmailDrawer: () => void;
  closeEmailDrawer: () => void;

  view: "LocationPicker" | "AddressForm" | "AddressBook";
  setView: (view: "LocationPicker" | "AddressForm" | "AddressBook") => void;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (open: boolean) => void;
  closeAddressModal: () => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isEmailDrawerOpen: false,
  openEmailDrawer: () => set({ isEmailDrawerOpen: true }),
  closeEmailDrawer: () => set({ isEmailDrawerOpen: false }),
  view: "AddressBook",
  setView: (view: "LocationPicker" | "AddressForm" | "AddressBook") =>
    set({ view }),
  isAddressModalOpen: false,
  setIsAddressModalOpen: (open: boolean) => set({ isAddressModalOpen: open }),
  closeAddressModal: () => {
    set({ isAddressModalOpen: false });
    set({ view: "AddressBook" });
  },
}));
