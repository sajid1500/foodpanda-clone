"use client";

import { useLayoutStore } from "@/lib/stores/layoutStore";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { AddressButton as AddressTrigger } from "./AddressTrigger";
import { AddressBook } from "./AddressBook";
import { LocationPicker } from "./LocationPicker";
import { LuX } from "react-icons/lu";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";
import { LocationDetails } from "@/lib/types/location.types";
import { AddressForm } from "./AddressForm";

const selectedLocation1: LocationDetails = {
  id: "123",
  formattedAddress: "123 Basabo, Dhaka",
  street: "Basabo",
  house: "123",
  city: "Dhaka",
  coords: {
    lat: 23.7524788,
    lng: 90.4176482,
  },
};

export function AddressModal() {
  const { view, setView } = useLayoutStore((state) => state);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationDetails | null>(null);

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) {
          setView("AddressBook");
        }
      }}
    >
      <AddressTrigger>north basabo</AddressTrigger>
      <SheetContent side="bottom" className="overflow-y-scroll pt-2">
        {view === "AddressBook" && (
          <AddressForm selectedLocation={selectedLocation1} />
        )}
        {/* {view === "AddressBook" && <AddressBook />} */}
        {/* {view === "LocationPicker" && (
          <LocationPicker setSelectedLocation={setSelectedLocation} />
        )}
        {view === "AddressForm" && (
          <AddressForm selectedLocation={selectedLocation} />
        )} */}
      </SheetContent>
    </Sheet>
  );
}
