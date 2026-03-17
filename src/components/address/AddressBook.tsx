"use client";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { AddressHeader } from "./AddressHeader";
import { getAddresses } from "@/lib/services/userService";
import { useLayoutStore } from "@/lib/stores/layoutStore";

import { Address } from "@/lib/types/user.types";
import {
  LuCheck,
  LuChrome,
  LuMapPin,
  LuPencil,
  LuPlus,
  LuTrash2,
} from "react-icons/lu";
import { setDefaultAddressAction } from "@/lib/actions/address";
import { useAddresses } from "@/components/address/useAddresses";

export function AddressBook() {
  const { setView } = useLayoutStore((state) => state);
  const { addresses } = useAddresses();
  return (
    <div className="p-4">
      {/* <DrawerClose /> */}
      <AddressHeader />
      <p className="mt-4">
        <button
          className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 transition hover:text-pink-700"
          type="button"
          onClick={() => {
            setView("LocationPicker");
            setSelectedLocation(defaultAddress);
          }}
        >
          <span>
            <LuPlus size={16} />
          </span>
          Add New Address
        </button>
      </p>

      <SavedAddressList />
    </div>
  );
}

function SavedAddressList() {
  const { addresses, setSelectedLocation, setDefaultAddress } = useUserStore(
    (state) => state,
  );
  const { setView, setIsAddressModalOpen } = useLayoutStore((store) => store);

  const editAddress = async (
    e: React.MouseEvent<HTMLButtonElement>,
    address: Address,
  ) => {
    e.stopPropagation();
    setView("LocationPicker");
    setSelectedLocation(address);
  };

  const selectAddress = (address: Address) => {
    setDefaultAddress(address);
    if (address.id) setDefaultAddressAction(address.id);
    setIsAddressModalOpen(false);
  };

  return (
    <div className="max-h-[280px] divide-y divide-neutral-100 overflow-y-auto">
      {addresses.map((address) => (
        <div
          key={address.id}
          onClick={() => selectAddress(address)}
          className="flex items-start justify-between gap-3 py-3 hover:cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
              {address.label === "home" ? (
                <LuChrome size={16} />
              ) : (
                <LuMapPin size={16} />
              )}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-neutral-900">
                  {address.addressLine1}
                </p>
                {address.isDefault && (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-200 text-neutral-700">
                    <LuCheck size={12} />
                  </span>
                )}
              </div>
              {address.city && (
                <p className="text-xs text-neutral-500">{address.city}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => editAddress(e, address)}
              type="button"
              aria-label="Edit address"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700"
            >
              <LuPencil size={16} />
            </button>
            <button
              type="button"
              aria-label="Delete address"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700"
            >
              <LuTrash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
