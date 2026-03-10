import { LocationDetails } from "./location.types";

export interface UserAddress {
  id: string;
  userId: string;
  placeId: string;
  addressLine1: string; // Usually mapped from street/house
  addressLine2?: string;
  label?: "Home" | "Work" | "Partner" | "Other";
  isDefault?: boolean;
  city: string;
  coords: {
    lat: number;
    lng: number;
  };
}

// If you want a type specifically for inserting a new address
export type CreateUserAddress = Omit<UserAddress, "id"> & {
  // userId: string; // Ensure userId is required when creating a new address
};
