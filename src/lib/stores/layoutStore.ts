import { create } from "zustand";

interface LayoutStore {
  isEmailDrawerOpen: boolean;
  toggleEmailDrawer: () => void;
  openEmailDrawer: () => void;
  closeEmailDrawer: () => void;

  view: "LocationPicker" | "AddressForm" | "AddressBook";
  setView: (view: "LocationPicker" | "AddressForm" | "AddressBook") => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isEmailDrawerOpen: false,
  toggleEmailDrawer: () => {
    set((state) => ({
      isEmailDrawerOpen: !state.isEmailDrawerOpen,
    }));
  },
  openEmailDrawer: () => set({ isEmailDrawerOpen: true }),
  closeEmailDrawer: () => set({ isEmailDrawerOpen: false }),
  view: "AddressBook",
  setView: (view: "LocationPicker" | "AddressForm" | "AddressBook") =>
    set({ view }),
}));
