"use client";

import { useState } from "react";
import { LuHouse, LuPlus } from "react-icons/lu";
import { UserAddress } from "@/lib/types/user.types";
import dynamic from "next/dynamic";
import { LocationDetails } from "@/lib/types/location.types";
import { LocationEditIcon, MapPin } from "lucide-react";
import { FaLocationPin } from "react-icons/fa6";
import { saveAddressAction } from "@/lib/actions/user";

const Map = dynamic(() => import("./Map").then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] w-[390px] animate-pulse rounded-md bg-neutral-100" />
  ),
});

type AddressLabel = "Home" | "Work" | "Partner" | "Other";

const LABELS: AddressLabel[] = ["Home", "Work", "Partner", "Other"];

type AddressFormProps = {
  selectedLocation: LocationDetails | null;
  onAddressForm?: (payload: {
    street: string;
    apartment: string;
    note: string;
    label: AddressLabel;
  }) => void;
};

export function AddressForm({ selectedLocation }: AddressFormProps) {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [apartment, setApartment] = useState("");
  const [note, setNote] = useState("");
  const [label, setLabel] = useState<AddressLabel>("Home");
  const [customLabel, setCustomLabel] = useState("");

  const { street, house } = selectedLocation || {};
  const missingInfo = [
    !street ? "street" : null,
    !house ? "house number" : null,
  ]
    .filter(Boolean)
    .join(" / ");
  const placeholderMissingInfo = missingInfo
    .split(" ")
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
  return (
    <form className="" action={saveAddressAction}>
      <Map
        // key="foodpanda-map-v2"
        zoom={25}
        className="h-[150px] max-w-[390px] overflow-clip px-2"
        position={[
          selectedLocation?.coords.lat ?? 23.7524788,
          selectedLocation?.coords.lng ?? 90.4176482,
        ]}
      />
      <div className="px-4">
        <div className="mt-4 flex items-center gap-1">
          <MapPin size={18} />
          <h1 className="text-lg font-semibold text-neutral-900">
            {selectedLocation?.city}
          </h1>
        </div>
        <div className="flex w-full justify-end">
          <button type="button">Edit</button>
        </div>
        {/* divider */}
        <div className="my-4 h-0.5 w-full bg-gray-400"></div>
        {!!missingInfo && (
          <div>
            <h1 className="text-sm font-semibold text-neutral-900">
              We&apos;re missing your {missingInfo}
            </h1>
            <label className="text-xs font-medium text-neutral-700">
              {missingInfo}
            </label>
            <input
              // value={addressLine1}
              // onChange={(event) => setAddressLine1(event.target.value)}
              name="addressLine1"
              placeholder={placeholderMissingInfo}
              className="mt-3 h-11 w-full rounded-md border border-neutral-300 px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
            />
          </div>
        )}

        <div>
          <label className="text-xs font-medium text-neutral-700">
            Address Details
          </label>
          <input
            // value={addressLine2}
            // onChange={(event) => setAddressLine2(event.target.value)}
            name="addressLine2"
            placeholder="Apartment #"
            className="mt-2 h-11 w-full rounded-md border border-neutral-300 px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
          />
          <input
            // value={note}
            // onChange={(event) => setNote(event.target.value)}
            name="note"
            placeholder="Note to rider - e.g. building, landmark"
            className="mt-2 h-11 w-full rounded-md border border-neutral-300 px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-neutral-700">
            Add a Label
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {LABELS.map((item) => {
              const selected = label === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLabel(item)}
                  className={`inline-flex h-7 items-center gap-1 rounded-full border px-3 text-xs transition ${
                    selected
                      ? "border-neutral-900 bg-neutral-100 text-neutral-900"
                      : "border-neutral-300 bg-white text-neutral-700"
                  }`}
                >
                  {item === "Other" ? (
                    <LuPlus size={12} />
                  ) : (
                    <LuHouse size={12} />
                  )}
                  {item}
                </button>
              );
            })}
          </div>
          {label === "Other" && (
            <input
              value={customLabel}
              onChange={(event) => setCustomLabel(event.target.value)}
              placeholder="Custom"
              className="mt-3 h-10 w-full rounded-md border border-neutral-300 px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
            />
          )}
        </div>
        <p className="mt-6">
          <button
            type="submit"
            className="h-11 w-full rounded-md bg-pink-600 text-sm font-semibold text-white transition hover:bg-pink-700"
          >
            Save and continue
          </button>
        </p>
      </div>
      <input
        type="hidden"
        name="locationDetails"
        value={JSON.stringify(selectedLocation)}
      />
      <input
        type="hidden"
        name="label"
        value={label === "Other" ? customLabel : label}
      />
    </form>
  );
}
