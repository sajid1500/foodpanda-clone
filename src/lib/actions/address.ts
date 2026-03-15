"use server";

import { saveUserAddress } from "../services/userService";
import { UserAddress } from "../types/user.types";
import { getUserForServer } from "../utils/auth";

export const saveAddressAction = async (address: UserAddress) => {
  const userId = (await getUserForServer())?.identities?.[0]?.user_id;
  if (!userId) throw new Error("User not authenticated");

  const addressToSave: UserAddress = {
    ...address,
  };
  // console.log("Raw form data:", addressToSave);
  await saveUserAddress(addressToSave);
};
