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
        {/* <SheetClose>
          <LuX size={22} color="gray" />
        </SheetClose> */}
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
