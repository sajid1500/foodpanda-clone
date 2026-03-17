"use client";

import { useLayoutStore } from "@/lib/stores/layoutStore";
// import { Map } from "./Map";
// import { Drawer } from "@/components/ui/drawer";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Address } from "@/lib/types/user.types";
import { SearchBar } from "./SearchBar";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { AddressBook } from "./AddressBook";
import { AddressModal } from "./AddressModal";
import { AddressHeader } from "./AddressHeader";
import { SheetFooter } from "../ui/sheet";

const Map = dynamic(() => import("./Map").then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="bg-accent-foreground/20 mt-4 h-104 w-full overflow-hidden rounded-2xl border border-neutral-200"></div>
  ),
});

export function LocationPicker() {
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedLocation, setSelectedLocation } = useUserStore(
    (store) => store,
  );
  const { view, setView } = useLayoutStore((state) => state);

  const [position, setPosition] = useState<[number, number]>([
    23.7524788, 90.4176482,
  ]);

  useEffect(() => {
    if (selectedLocation) {
      setPosition([selectedLocation.coords.lat, selectedLocation.coords.lng]);
      setSearchQuery(selectedLocation.addressLine1);
    }
  }, [selectedLocation]);

  const handleChangePosition = useDebouncedCallback(
    (coords: [number, number]) => {
      // use debouncedPosition?
      const [lat, lng] = position;
      const fetchAddress = async () => {
        const response = await fetch(
          `/api/geocode/reverse?lat=${lat}&lng=${lng}`,
        );
        if (!response.ok) {
          console.error("Failed to fetch address:", response.statusText);
          return;
        }
        const address = (await response.json()) as Address;
        setSearchQuery(address.addressLine1);
        setSelectedLocation(address);
        // console.log("Received address from API:", address);
      };
      fetchAddress();
    },
    500,
  );

  const handleSelectSuggestion = async (suggestion: Address) => {
    if (searchQuery !== suggestion.addressLine1) {
      setSearchQuery(suggestion.addressLine1);
    }
    console.log("Selected address:", suggestion);
    setSelectedLocation(suggestion);
    setPosition([suggestion.coords.lat, suggestion.coords.lng]);
  };

  const handleSubmitLocation = () => {
    setView("AddressForm");
  };

  return (
    <div className="p-4">
      {/* <DrawerClose /> */}
      <div className="-mr-6 overflow-y-auto pr-6">
        <AddressHeader />

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectSuggestion={handleSelectSuggestion}
        />
        <Map
          // key="foodpanda-map-3434"
          position={position}
          zoom={32}
          showZoomControls={true}
          className="mt-4 h-[412px] w-full overflow-hidden rounded-2xl border border-neutral-200"
          onChangePosition={(coords: [number, number]) => {
            setPosition(coords);
            handleChangePosition(coords);
          }}
        />
      </div>

      <SheetFooter className="items-end">
        <button
          type="button"
          className="mt-5 w-fit rounded-md bg-pink-600 p-4 py-3 text-sm font-semibold tracking-wide text-white uppercase transition hover:bg-pink-700"
          onClick={handleSubmitLocation}
        >
          Find restaurants
        </button>
      </SheetFooter>
    </div>
  );
}
