"use client";

import { useLayoutStore } from "@/lib/stores/layoutStore";
import { AddressBook } from "./AddressBook";
import { LocationPicker } from "./LocationPicker";
import { LuMapPin, LuX } from "react-icons/lu";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { useEffect, useState } from "react";
import { AddressForm } from "./AddressForm";
import { CredenzaTrigger } from "../ui/credenza";
import { getAddresses } from "@/lib/services/userService";
import { Address, addressSchema } from "@/lib/validators/address.schema";
import { getBrowserClient } from "@/lib/config/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAddresses } from "@/components/address/useAddresses";

export function AddressModal({ addresses }: { addresses: Address[] }) {
  const { view, setView, isAddressModalOpen, setIsAddressModalOpen } =
    useLayoutStore((state) => state);
  const { defaultAddress } = useAddresses(addresses);
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
        {defaultAddress
          ? `${defaultAddress.addressLine1} ${defaultAddress.city}`
          : "Add an address"}
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll pt-2">
        {view === "AddressBook" && <AddressBook />}
        {view === "LocationPicker" && <LocationPicker />}
        {view === "AddressForm" && <AddressForm />}
      </SheetContent>
    </Sheet>
  );
}
