"use client";

import { useLayoutStore } from "@/lib/stores/layoutStore";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { AddressBook } from "./AddressBook";
import { LocationPicker } from "./LocationPicker";
import { LuX } from "react-icons/lu";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { useEffect, useState } from "react";
import { LocationDetails } from "@/lib/types/location.types";
import { AddressForm } from "./AddressForm";
import { CredenzaTrigger } from "../ui/credenza";
import { getUserAddresses } from "@/lib/services/userService";
import { UserAddress } from "@/lib/types/user.types";
import { useUserStore } from "@/lib/stores/userStore";

const selectedLocation1: LocationDetails = {
  osmId: 123,
  formattedAddress: "123 Basabo, Dhaka",
  street: "Basabo",
  house: "123",
  city: "Dhaka",
  coords: {
    lat: 23.7524788,
    lng: 90.4176482,
  },
};

export function AddressModal({ addresses }: { addresses: UserAddress[] }) {
  const {
    userAddresses,
    setUserAddresses,
    setDefaultUserAddress,
    defaultUserAddress,
  } = useUserStore((state) => state);
  const { view, setView } = useLayoutStore((state) => state);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationDetails>(selectedLocation1);

  useEffect(() => {
    setUserAddresses(addresses);
  }, []);

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) {
          setView("AddressBook");
        }
      }}
    >
      <SheetTrigger>{defaultUserAddress?.addressLine1}</SheetTrigger>
      <SheetContent side="bottom" className="overflow-y-scroll pt-2">
        {view === "AddressBook" && <AddressBook />}
        {view === "LocationPicker" && (
          <LocationPicker setSelectedLocation={setSelectedLocation} />
        )}
        {view === "AddressForm" && (
          <AddressForm selectedLocation={selectedLocation} />
        )}
      </SheetContent>
    </Sheet>
  );
}
