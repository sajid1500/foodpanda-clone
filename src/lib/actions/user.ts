"use server";

import { saveUserAddress } from "../services/userService";
import { CreateUserAddress, UserAddress } from "../types/user.types";
import { getUserForServer } from "../utils/auth";

export const saveAddressAction = async (formData: any) => {
  const userId = (await getUserForServer())?.identities?.[0]?.user_id;
  if (!userId) throw new Error("User not authenticated");

  const locationDetails = JSON.parse(formData.get("locationDetails"));

  console.log("Saving address data:", userId);
  // const { street, house, city, coords } = JSON.parse(locationDetails);

  const address: CreateUserAddress = {
    userId,
    placeId: formData.get("placeId"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2"),
    label: formData.get("label"),
    isDefault: false,
    city: locationDetails.city,
    note: formData.get("note"),
  };

  await saveUserAddress(address);
};
