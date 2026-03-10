"use client";
import { useLayoutStore } from "@/lib/stores/layoutStore";
import {
  LuCheck,
  LuChrome,
  LuMapPin,
  LuPencil,
  LuPlus,
  LuTrash2,
} from "react-icons/lu";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { SavedAddressList } from "./SavedAddressList";
import { AddressHeader } from "./AddressHeader";

export function AddressBook() {
  const { setView } = useLayoutStore((state) => state);

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
          }}
        >
          <LuPlus size={16} /> <span>Add New Address</span>
        </button>
      </p>

      <SavedAddressList />
    </div>
  );
}
