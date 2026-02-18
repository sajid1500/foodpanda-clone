"use client";

import { Location } from "@/app/_lib/types/api.types";
import { useState } from "react";
import LoadingDots from "../ui/LoadingDots";
import SearchResults from "./SearchResults";

interface SearchBarProps {
  query: string;
  suggestionsLoading: boolean;
  suggestions: Location[];
  onQueryChange: (query: string) => void;
  onSelectSuggestion: (suggestion: Location) => void;
  onClearSuggestions: () => void;
}

export default function SearchBar({
  query,
  suggestionsLoading,
  suggestions,
  onQueryChange,
  onSelectSuggestion,
  onClearSuggestions,
}: SearchBarProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          onSelectSuggestion(suggestions[selectedIndex]);
          setSelectedIndex(-1);
        }
        break;
      case "Escape":
        onClearSuggestions();
        setSelectedIndex(-1);
        break;
    }
  };

  // Reset selection when suggestions change
  if (suggestions.length === 0 && selectedIndex !== -1) {
    setSelectedIndex(-1);
  }

  return (
    <div className="relative mt-4">
      <label className="sr-only" htmlFor="address-search">
        Enter your address
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 shadow-sm">
        <input
          id="address-search"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your address"
          className="w-full text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
        />
        {suggestionsLoading && (
          <LoadingDots className="absolute right-3" size={4} />
        )}
      </div>
      {suggestions.length > 0 && (
        <div className="absolute top-full right-0 left-0 z-9999 mt-3 rounded-2xl border border-neutral-200 bg-white shadow-lg">
          <p className="px-4 pt-3 text-xs font-semibold text-neutral-500">
            Did you mean:
          </p>
          <SearchResults
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            onSelect={(suggestion) => {
              onSelectSuggestion(suggestion);
              setSelectedIndex(-1);
            }}
          />
        </div>
      )}
    </div>
  );
}
