"use client";

import { useLayoutStore } from "@/lib/stores/layoutStore";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { AddressBook } from "./AddressBook";
import { LocationPicker } from "./LocationPicker";
import { LuMapPin, LuX } from "react-icons/lu";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { useEffect, useState } from "react";
import { AddressForm } from "./AddressForm";
import { CredenzaTrigger } from "../ui/credenza";
import { getAddresses } from "@/lib/services/userService";
import { Address } from "@/lib/types/user.types";

export function AddressModalContent() {
  const { setAddresses } = useUserStore((state) => state);
  const defaultAddress = addresses.find((addr) => addr.isDefault);
  const { view, setView, isAddressModalOpen, setIsAddressModalOpen } =
    useLayoutStore((state) => state);

  useEffect(() => {
    setAddresses(addresses);
  }, []);

  return (
    <Sheet
      open={isAddressModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          setView("AddressBook");
        }
        setIsAddressModalOpen(open);
      }}
    >
      <SheetTrigger className="flex items-center gap-1">
        <span>
          <LuMapPin className="h-5 w-5" />
        </span>
        {/* {defaultAddress?.addressLine1 || "Add an address"} */}
      </SheetTrigger>
      <SheetContent side="bottom" className="overflow-y-scroll pt-2">
        {view === "AddressBook" && <AddressBook />}
        {view === "LocationPicker" && <LocationPicker />}
        {view === "AddressForm" && <AddressForm />}
      </SheetContent>
    </Sheet>
  );
}
