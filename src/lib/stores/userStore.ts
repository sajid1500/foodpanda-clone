// import { create } from "zustand";
// import { Address } from "../types/user.types";

// interface UserStore {
//   addresses: Address[];
//   defaultAddress: Address | null;
//   selectedLocation: Address | null;
//   setAddresses: (addresses: Address[]) => void;
//   setDefaultAddress: (address: Address | null) => void;
//   setSelectedLocation: (location: Address | null) => void;
// }

// export const useUserStore = create<UserStore>((set) => ({
//   addresses: [],
//   defaultAddress: null,
//   selectedLocation: null,
//   setAddresses: (addresses) => {
//     set({
//       addresses: addresses.sort(
//         (a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0),
//       ),
//     });
//     set({
//       defaultAddress: addresses.find((addr) => addr.isDefault) || null,
//     });
//   },
//   setDefaultAddress: (address) => {
//     set({ defaultAddress: address });
//   },
//   setSelectedLocation: (location) => set({ selectedLocation: location }),
// }));
