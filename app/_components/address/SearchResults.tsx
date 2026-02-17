"use client";

import { Location } from "@/app/_lib/types/api.types";
import { useEffect, useRef } from "react";
import { MdLocationPin } from "react-icons/md";

const SearchResults = ({
  suggestions,
  selectedIndex,
  onSelect,
}: {
  suggestions: Location[];
  selectedIndex: number;
  onSelect: (suggestion: Location) => void;
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  if (suggestions.length === 0) return null;

  return (
    <ul
      ref={listRef}
      className="max-h-[204px] overflow-y-auto scroll-auto py-2"
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={`${suggestion.id}`}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
        >
          <button
            type="button"
            onClick={() => onSelect(suggestion)}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-neutral-700 transition hover:bg-pink-50 ${
              index === selectedIndex ? "bg-pink-50" : ""
            }`}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 text-neutral-500">
              <MdLocationPin size={14} />
            </span>
            <span>{suggestion.formattedAddress}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
export default SearchResults;
