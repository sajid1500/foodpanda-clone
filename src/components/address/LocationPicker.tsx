"use client";

import { useLayoutStore } from "@/lib/stores/layoutStore";
// import { Map } from "./Map";
// import { Drawer } from "@/components/ui/drawer";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Address } from "@/lib/validators/address.schema";
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
import { useUserStore } from "@/lib/stores/userStore";
import { formatAddress } from "@/lib/utils/helpers";
import { LocationDetails } from "@/lib/validators/geocode.schema";

const Map = dynamic(() => import("./Map").then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="bg-accent-foreground/20 mt-4 h-104 w-full overflow-hidden rounded-2xl border border-neutral-200"></div>
  ),
});

export function LocationPicker() {
  const {
    tempAddress,
    setTempAddress,
    searchQuery,
    setSearchQuery,
    position,
    setPosition,
  } = useUserStore((store) => store);
  const { view, setView } = useLayoutStore((state) => state);

  useEffect(() => {
    handleChangePosition(position);
  }, []);

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
        const address = (await response.json()) as LocationDetails;
        setSearchQuery(
          formatAddress(address.house, address.street, address.city),
        );
        setTempAddress({
          ...tempAddress,
          ...address,
        });
        // console.log("Received address from API:", address);
      };
      fetchAddress();
    },
    500,
  );

  const handleSelectSuggestion = async (suggestion: LocationDetails) => {
    if (
      searchQuery !==
      formatAddress(suggestion.house, suggestion.street, suggestion.city)
    ) {
      setSearchQuery(
        formatAddress(suggestion.house, suggestion.street, suggestion.city),
      );
    }
    console.log("Selected address:", suggestion);
    setTempAddress({
      ...tempAddress,
      ...suggestion,
    });
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
          className=":disabled:opacity-50 mt-5 w-fit rounded-md bg-pink-600 p-4 py-3 text-sm font-semibold tracking-wide text-white uppercase transition hover:bg-pink-700"
          onClick={handleSubmitLocation}
          disabled={!tempAddress}
        >
          Find restaurants
        </button>
      </SheetFooter>
    </div>
  );
}
