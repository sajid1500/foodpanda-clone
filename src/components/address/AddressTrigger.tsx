"use client";
// import { getLocationName, getUser } from "@/lib/services/restaurantService";
import { useLayoutStore } from "@/lib/stores/layoutStore";
import { DrawerTrigger } from "../ui/drawer";
import { CredenzaTrigger } from "../ui/credenza";

export function AddressButton({ ...props }) {
  // const locationName = await getLocationName(lat, lng);
  // const { openAddressDrawer } = useLayoutStore((store) => store);
  return <CredenzaTrigger>north basabo</CredenzaTrigger>;
}
