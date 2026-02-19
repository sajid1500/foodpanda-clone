"use client";

import { useState } from "react";
import { Location } from "@/app/_lib/types/api.types";
import LoadingDots from "../ui/LoadingDots";
import { XIcon } from "lucide-react";
import { MdLocationPin } from "react-icons/md";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/app/_components/ui/command";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({
  query,
  setQuery,
  onSelect,
}: {
  query: string;
  setQuery: (query: string) => void;
  onSelect: (suggestion: Location) => void;
}) {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Location[]>([]);

  const handleQueryChange = useDebouncedCallback(async (value: string) => {
    if (value.length < 3) return setSuggestions([]);
    setIsSearching(true);

    const response = await fetch(
      `/api/geocode?query=${encodeURIComponent(value)}`,
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

  const clearQuery = () => {
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative mt-4">
      {/* <label
        className="mb-1 block text-xs font-semibold text-neutral-600"
        htmlFor="address-search"
      >
        Enter your address
      </label> */}

      <Command
        shouldFilter={false}
        className="rounded-xl border border-neutral-200 shadow-sm"
      >
        <div className="flex items-center gap-2 px-3 py-2">
          <input
            id="address-search"
            type="text"
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              handleQueryChange(value);
            }}
            placeholder="Search for your address..."
            className="w-full text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
          />
          {query.length > 0 && !isSearching && (
            <button
              type="button"
              onClick={clearQuery}
              className="flex h-5 w-5 items-center justify-center rounded-full border border-black"
              aria-label="Clear address"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
          {isSearching && <LoadingDots className="shrink-0" size={4} />}
        </div>

        {suggestions.length > 0 && (
          <CommandList className="max-h-[240px] border-t">
            <CommandGroup heading="Did you mean:">
              {suggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion.id}
                  value={suggestion.formattedAddress}
                  onSelect={() => {
                    onSelect(suggestion);
                    setSuggestions([]);
                  }}
                  className="cursor-pointer"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 text-neutral-500">
                    <MdLocationPin size={14} />
                  </span>
                  <span>{suggestion.formattedAddress}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}
