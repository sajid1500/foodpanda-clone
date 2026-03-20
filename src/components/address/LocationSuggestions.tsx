import { formatAddress } from "@/lib/utils/helpers";
import { Address } from "@/lib/validators/address.schema";
import { IoIosSearch } from "react-icons/io";

export function LocationSuggestions({
  suggestions,
  onSelectSuggestion,
}: {
  suggestions: Address[];
  onSelectSuggestion: (suggestion: Address) => void;
}) {
  if (!suggestions || suggestions.length === 0) return null;
  // console.log(suggestions);
  return (
    <div className="mt-2 max-h-60 overflow-y-auto rounded-md border border-neutral-200 bg-white py-1 shadow-sm">
      <p className="address-suggest-title cl-neutral-primary f-label-small-font-size fw-label-small-font-weight lh-label-small-line-height ff-label-small-font-family px-2 py-1">
        Did you mean:
      </p>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.osmId}
          type="button"
          onClick={() => onSelectSuggestion(suggestion)}
          className="flex w-full cursor-pointer items-center gap-1 px-2 py-2 text-left hover:bg-neutral-100"
        >
          <span className="mx-1">
            <IoIosSearch size={24} />
          </span>
          <span>{formatAddress(suggestion.house, suggestion.street, suggestion.city)}</span>
        </button>
      ))}
    </div>
  );
}
