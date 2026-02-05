import { create } from "zustand";

interface LayoutStore {
  isCartOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  isUserMenuOpen: boolean;
  toggleUserMenu: () => void;
  openUserMenu: () => void;
  closeUserMenu: () => void;

  isAuthDrawerOpen: boolean;
  toggleAuthDrawer: () => void;
  openAuthDrawer: () => void;
  closeAuthDrawer: () => void;

  isEmailDrawerOpen: boolean;
  toggleEmailDrawer: () => void;
  openEmailDrawer: () => void;
  closeEmailDrawer: () => void;
}

export const useLayoutStore = create<LayoutStore>((set, get) => ({
  isCartOpen: false,
  toggleCart: () => {
    set((state) => ({ isCartOpen: !state.isCartOpen }));
  },
  openCart: () => {
    // console.log("Opening cart");
    set({ isCartOpen: true });
  },
  closeCart: () => set({ isCartOpen: false }),

  isUserMenuOpen: false,
  toggleUserMenu: () => {
    set((state) => ({ isUserMenuOpen: !state.isUserMenuOpen }));
  },
  openUserMenu: () => {
    // console.log("Opening user menu");
    set({ isUserMenuOpen: true });
  },
  closeUserMenu: () => set({ isUserMenuOpen: false }),

  isAuthDrawerOpen: false,
  toggleAuthDrawer: () => {
    set((state) => ({ isAuthDrawerOpen: !state.isAuthDrawerOpen }));
  },
  openAuthDrawer  : () => {
    // console.log("Opening drawer");
    set({ isAuthDrawerOpen: true });
  },
  closeAuthDrawer: () => set({ isAuthDrawerOpen: false }),

  isEmailDrawerOpen: false,
  toggleEmailDrawer: () => {
    set((state) => ({
      isEmailDrawerOpen: !state.isEmailDrawerOpen,
    }));
  },
  openEmailDrawer: () => {
    set({ isEmailDrawerOpen: true });
  },
  closeEmailDrawer: () => set({ isEmailDrawerOpen: false }),
}));
