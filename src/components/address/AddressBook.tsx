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

import { Address } from "@/lib/validators/address.schema";
import {
  LuCheck,
  LuChrome,
  LuMapPin,
  LuPencil,
  LuPlus,
  LuTrash2,
} from "react-icons/lu";
import { useAddresses } from "@/components/address/useAddresses";
import { useUserStore } from "@/lib/stores/userStore";
import { useSaveAddress } from "./useSaveAddress";
import { useDeleteAddress } from "./useDeleteAddress";
import { CircleCheck, Trash2 } from "lucide-react";
import { DeleteAddress } from "./DeleteAddress";
// import { useSelectAddress } from "./useSelectAddress";

export function AddressBook() {
  const { setView } = useLayoutStore((state) => state);
  const { setTempAddress, setPosition, setSearchQuery, resetTempAddress } =
    useUserStore((state) => state);
  const { defaultAddress } = useAddresses();
  return (
    <div className="p-4">
      <AddressHeader />
      <p className="mt-4">
        <button
          className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 transition hover:text-pink-700"
          type="button"
          onClick={() => {
            if (defaultAddress) {
              resetTempAddress();
              setSearchQuery(defaultAddress.addressLine1);
              setPosition([
                defaultAddress.coords.lat,
                defaultAddress.coords.lng,
              ]);
            }
            setView("LocationPicker");
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
  const { addresses } = useAddresses();
  const { saveAddress } = useSaveAddress();
  const { deleteAddress } = useDeleteAddress();

  const { setTempAddress } = useUserStore((state) => state);
  const { setView, setIsAddressModalOpen } = useLayoutStore((store) => store);

  const handleEditAddress = async (address: Address) => {
    setView("LocationPicker");
    setTempAddress(address);
  };

  const handleSelectAddress = (address: Address) => {
    setIsAddressModalOpen(false);
    if (address.isDefault) return;
    setTempAddress(address);
    saveAddress({ ...address, isDefault: true });
  };

  const handleDeleteAddress = (address: Address) => {
    deleteAddress(address.id);
  };

  const orderedAddresses = [
    ...addresses.filter((addr) => addr.isDefault),
    ...addresses.filter((addr) => !addr.isDefault),
  ];
  return (
    <div className="max-h-[280px] divide-y divide-neutral-100 overflow-y-auto">
      {orderedAddresses.map((address) => (
        <div
          key={address.id}
          className="flex items-start justify-between gap-3 py-3"
        >
          <button
            className="flex grow items-start gap-3"
            onClick={() => handleSelectAddress(address)}
          >
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
                <p className="text-left text-xs text-neutral-500">
                  {address.city}
                </p>
              )}
            </div>
          </button>

          <div
            className="flex items-center gap-1"
            // onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                handleEditAddress(address);
              }}
              type="button"
              aria-label="Edit address"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700"
            >
              <LuPencil size={16} />
            </button>
            {!address.isDefault ? (
              <DeleteAddress
                address={address}
                handleDelete={handleDeleteAddress}
              />
            ) : (
              <button
                type="button"
                aria-label="Selected address"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700"
                onClick={(e) => e.stopPropagation()}
              >
                <CircleCheck />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
