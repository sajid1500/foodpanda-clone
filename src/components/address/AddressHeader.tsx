import { SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

export function AddressHeader({ ...props }) {
  return (
    <SheetHeader {...props}>
      <SheetTitle className="text-lg font-semibold text-neutral-900">
        What&apos;s your exact location?
      </SheetTitle>
      <SheetDescription className="mt-1 line-clamp-3 text-sm text-neutral-600">
        Providing your location enables more accurate search and delivery ETA,
        seamless order tracking and personalised suggestions.
      </SheetDescription>
    </SheetHeader>
  );
}
