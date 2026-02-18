"use client";

import { LuSearch } from "react-icons/lu";
import { useLayoutStore } from "../../_lib/store/layoutStore";
// import Map from "./Map";
import Drawer from "../ui/Drawer";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "@/app/_lib/utility/debounce";
import { Location } from "@/app/_lib/types/api.types";
import { MdLocationPin } from "react-icons/md";
import LoadingDots from "../ui/LoadingDots";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import { useDebounceValue } from "usehooks-ts";
const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <p>A map is loading</p>,
});

export default function AddressPicker() {
  const [position, setPosition] = useState<[number, number]>([
    23.7524788, 90.4176482,
  ]);
  const [debouncedPosition, setDebouncedPosition] = useDebounceValue(
    position,
    500,
  );

  const [suggestionsLoading, setSuggestionsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<Location | null>(null);
  const [suggestions, setSuggestions] = useState<Location[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const [lat, lng] = debouncedPosition;
    const fetchAddress = async () => {
      const response = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`, {
        signal,
      });
      if (!response.ok) {
        console.error("Failed to fetch address:", response.statusText);
        return;
      }
      const address = (await response.json()) as Location;
      setQuery(address?.formattedAddress ?? "");
      // console.log("Received address from API:", address);
    };
    fetchAddress();
    return () => {
      controller.abort();
    }; // Cleanup function to abort fetch on unmount or query change
  }, [debouncedPosition]);

  // useEffect(() => {
  //   // if (suggestions.some((s) => s.formattedAddress === query)) return; // Don't fetch if the current address is already in suggestions
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   const fetchCoordinates = async () => {
  //     setSuggestionsLoading(true);
  //     if (query.length < 3) return setSuggestions([]); // Don't search for very short queries
  //     const response = await fetch(
  //       `/api/geocode?query=${encodeURIComponent(query)}`,
  //       { signal },
  //     );
  //     const data = await response.json();
  //     const { locations } = data;
  //     setSuggestionsLoading(false);
  //     if (!locations) return setSuggestions([]);
  //     setSuggestions(locations);
  //   };
  //   fetchCoordinates();
  //   return () => {
  //     controller.abort();
  //   }; // Cleanup function to abort fetch on unmount or query change
  // }, [query]);

  const handleAddressChange = async (query: string) => {
    if (query.length < 3) return setSuggestions([]); // Don't search for very short queries
    setSuggestionsLoading(true);
    const response = await fetch(
      `/api/geocode?query=${encodeURIComponent(query)}`,
    );

    if (!response.ok) {
      console.error("Failed to fetch address:", response.statusText);
      return;
    }

    const data = await response.json();
    const { locations } = data;

    setSuggestions(locations);
    setSuggestionsLoading(false);
    console.log("Received address from API:", locations);
  };

  const debouncedHandleAddressChange = useMemo(
    () =>
      debounce((val: string) => {
        return handleAddressChange(val);
      }, 500),
    [],
  );

  const onQueryChange = (query: string) => {
    setQuery(query);
    debouncedHandleAddressChange(query);
  };

  const handleSelectSuggestion = (suggestion: Location) => {
    console.log("Selected address:", suggestion);
    if (query !== suggestion.formattedAddress)
      setQuery(suggestion.formattedAddress);
    setSuggestions([]);
    // You can add additional logic here, like updating the map position
  };

  const { isAddressPickerOpen, closeAddressPicker } = useLayoutStore(
    (state) => state,
  );
  return (
    <Drawer isOpen={isAddressPickerOpen} onClose={closeAddressPicker}>
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
          query={query}
          suggestionsLoading={suggestionsLoading}
          suggestions={suggestions}
          onQueryChange={onQueryChange}
          onSelectSuggestion={handleSelectSuggestion}
          onClearSuggestions={() => setSuggestions([])}
        />

        <Map
          position={position}
          zoom={32}
          className="mt-4 h-[412px] w-full overflow-hidden rounded-2xl border border-neutral-200"
          onChangePosition={(coords: [number, number]) => {
            setPosition(coords);
            setDebouncedPosition(coords);
          }}
        />
        <div className="mt-4 flex w-full justify-end">
          <button
            type="button"
            className="mt-5 w-fit rounded-xl bg-pink-600 p-4 py-3 text-sm font-semibold tracking-wide text-white uppercase transition hover:bg-pink-700"
          >
            Find restaurants
          </button>
        </div>
      </div>
    </Drawer>
  );
}
