"use client";

import { useLayoutStore } from "../../_lib/store/layoutStore";
// import Map from "./Map";
import Drawer from "../ui/Drawer";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Address } from "@/app/_lib/types/api.types";
import SearchBar from "./SearchBar";
import SaveAddress from "./SaveAddress";

import { useDebounce, useDebouncedCallback } from "use-debounce";
const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="bg-accent-foreground/20 mt-4 h-103 w-full overflow-hidden rounded-2xl border border-neutral-200"></div>
  ),
});

export default function AddressPicker() {
  const [position, setPosition] = useState<[number, number]>([
    23.7524788, 90.4176482,
  ]);
  const [debouncedPosition, setDebouncedPosition] = useDebounce(position, 500);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [view, setView] = useState<"selectAddress" | "saveAddress">(
    "selectAddress",
  );

  const handleChangePosition = useDebouncedCallback(
    (coords: [number, number]) => {
      const [lat, lng] = debouncedPosition;
      const fetchAddress = async () => {
        const response = await fetch(
          `/api/location/reverse?lat=${lat}&lng=${lng}`,
        );
        if (!response.ok) {
          console.error("Failed to fetch address:", response.statusText);
          return;
        }
        const address = (await response.json()) as Address;
        const formattedAddress = `${address.house ? address.house + ", " : ""}${address.street ? address.street + ", " : ""}${address.city}`;
        setSearchQuery(formattedAddress);
        setSelectedAddress(address);
        // console.log("Received address from API:", address);
      };
      fetchAddress();
    },
    500,
  );

  const handleSelectSuggestion = async (suggestion: Address) => {
    const formattedAddress = `${suggestion.house ? suggestion.house + ", " : ""}${suggestion.street ? suggestion.street + ", " : ""}${suggestion.city}`;
    if (searchQuery !== formattedAddress) {
      setSearchQuery(formattedAddress);
    }
    console.log("Selected address:", suggestion);
    setSelectedAddress(suggestion);
    setPosition([suggestion.coords.lat, suggestion.coords.lng]);
  };

  const handleSubmitAddress = () => {
    console.log("Submitting address:", selectedAddress);
    setView("saveAddress");
  };

  const { isAddressPickerOpen, closeAddressPicker } = useLayoutStore(
    (state) => state,
  );
  return (
    <Drawer isOpen={isAddressPickerOpen} onClose={closeAddressPicker}>
      {view === "selectAddress" && (
        <div className="px-4 pt-6 pb-4">
          <div className="pr-10">
            <h2 className="text-lg font-semibold text-neutral-900">
              What&apos;s your exact location?
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Providing your location enables more accurate search and delivery
              ETA, seamless order tracking and personalised suggestions.
            </p>
          </div>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectSuggestion={handleSelectSuggestion}
          />

          <Map
            key="foodpanda-map-3434"
            position={position}
            zoom={32}
            showZoomControls={true}
            className="mt-4 h-103 w-full overflow-hidden rounded-2xl border border-neutral-200"
            onChangePosition={(coords: [number, number]) => {
              setPosition(coords);
              handleChangePosition(coords);
            }}
          />
          <div className="flex w-full justify-end">
            <button
              type="button"
              className="mt-5 w-fit rounded-md bg-pink-600 p-4 py-3 text-sm font-semibold tracking-wide text-white uppercase transition hover:bg-pink-700"
              onClick={handleSubmitAddress}
            >
              Find restaurants
            </button>
          </div>
        </div>
      )}

      {view === "saveAddress" && (
        <SaveAddress
          address={selectedAddress}
          onEditAddress={() => setView("selectAddress")}
          onSaveAddress={(payload) => {
            console.log("Saving address payload:", payload);
          }}
        />
      )}
    </Drawer>
  );
}
