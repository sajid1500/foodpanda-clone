export interface UserAddress {
  userId: string;
  label: string | null; // e.g., 'Home', 'Work'
  fullAddress: string | null;
  location: {
    lat: number;
    lng: number;
  }; // Representing the geography point
  isDefault: boolean;
}

// If you want a type specifically for inserting a new address
export type CreateUserAddressInput = Omit<UserAddress, "isDefault"> & {
  isDefault?: boolean;
};
