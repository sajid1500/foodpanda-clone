"use client";

import { useState } from "react";
import { Address } from "@/app/_lib/types/api.types";
import LoadingDots from "../ui/LoadingDots";
import { XIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import SearchSuggestionsApi from "./SearchSuggestionsApi";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  onSelectSuggestion,
}: {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  onSelectSuggestion: (suggestion: Address) => void;
}) {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Address[]>([]);

  const handleSearchChange = useDebouncedCallback(async (value: string) => {
    if (value.length < 3) return setSuggestions([]);
    setIsSearching(true);

    const response = await fetch(
      `/api/location/autocomplete?query=${encodeURIComponent(value)}`,
    );

    if (!response.ok) {
      console.error("Failed to fetch address:", response.statusText);
      setIsSearching(false);
      return;
    }

    const data = await response.json();
    const { locations } = data;

    setSuggestions(locations);
    setIsSearching(false);
  }, 500);

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative mt-4">
      <div aria-label="address-search">
        <div className="relative flex items-center gap-2 rounded-md border px-3 py-2">
          <label
            className="absolute top-0 left-4 -translate-y-1/2 bg-white text-xs font-semibold text-neutral-600"
            htmlFor="address-search"
          >
            Enter your address
          </label>
          <input
            id="address-search"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              handleSearchChange(value);
            }}
            placeholder="Search for your address..."
            className="peer w-full text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
          />

          {searchQuery.length > 0 && !isSearching && (
            <button
              type="button"
              onClick={clearSearch}
              className="flex h-5 w-5 items-center justify-center rounded-full border border-black"
              aria-label="Clear address"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
          {isSearching && <LoadingDots className="shrink-0" size={4} />}
        </div>

        <SearchSuggestionsApi
          suggestions={suggestions}
          onSelectSuggestion={(suggestion) => {
            onSelectSuggestion(suggestion);
            setSuggestions([]);
          }}
        />
      </div>
    </div>
  );
}
