"use server";

import { saveUserAddress } from "../../lib/services/userService";
import { CreateUserAddress, UserAddress } from "../../lib/types/user.types";
import { getUserForServer } from "../../lib/utils/auth";

export const saveAddressAction = async (formData: any) => {
  const userId = (await getUserForServer())?.identities?.[0]?.user_id;
  if (!userId) throw new Error("User not authenticated");

  const rawFormData = Object.fromEntries(formData);
  console.log("Raw form data:", rawFormData);
  // console.log("Saving address data:", userId);
  // const { street, house, city, coords } = JSON.parse(locationDetails);

  const address: UserAddress = {
    id: formData.get("id"),
    userId,
    osmId: formData.get("osmId"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2"),
    label: formData.get("label"),
    isDefault: false,
    city: formData.get("city"),
    note: formData.get("note"),
    coords: JSON.parse(formData.get("coords")),
  };

  // await saveUserAddress(address);
};
