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
import { Address, userAddressSchema } from "@/lib/types/user.types";
import { createClient } from "@/lib/config/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAddresses } from "@/components/address/useAddresses";

export function AddressModalContent() {
  const { view, setView, isAddressModalOpen, setIsAddressModalOpen } =
    useLayoutStore((state) => state);

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
