"use client";
import {
  getLocationName,
  getUser,
} from "@/app/_lib/services/restaurantService";
import { useLayoutStore } from "@/app/_lib/store/layoutStore";

export default function AddressButton() {
  // const locationName = await getLocationName(lat, lng);
  const { openAddressDrawer } = useLayoutStore((store) => store);
  return <button onClick={openAddressDrawer}>north basabo</button>;
}
