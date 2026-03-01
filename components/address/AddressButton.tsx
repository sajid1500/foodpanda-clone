"use client";
import { getLocationName, getUser } from "@/lib/services/restaurantService";
import { useLayoutStore } from "@/lib/stores/layoutStore";

export default function AddressButton() {
  // const locationName = await getLocationName(lat, lng);
  const { openAddressDrawer } = useLayoutStore((store) => store);
  return <button onClick={openAddressDrawer}>north basabo</button>;
}
