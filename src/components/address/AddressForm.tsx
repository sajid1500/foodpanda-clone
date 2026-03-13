"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LocationDetails } from "@/lib/types/location.types";
import { saveAddressAction } from "@/components/address/ActionSaveAddress";
import { SheetTitle } from "../ui/sheet";
import { MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { userAddressSchema } from "@/lib/types/user.types";
import {zodresolver } from 'z'

const Map = dynamic(() => import("./Map").then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] w-[390px] animate-pulse rounded-md bg-neutral-100" />
  ),
});

export function AddressForm({
  selectedLocation,
}: {
  selectedLocation: LocationDetails;
}) {
  const [label, setLabel] = useState("Home");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodresolver(userAddressSchema),
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      city: selectedLocation?.city || "",
      label: "Home",
      note: "",
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await saveAddressAction(formData);
  };
  // ui related
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
    <form onSubmit={onSubmit}>
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
          <SheetTitle className="text-lg font-semibold text-neutral-900">
            {selectedLocation?.city}
          </SheetTitle>
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
        {/* label */}
        <div>
          <label className="text-xs font-medium text-neutral-700">
            Add a Label
          </label>
          <AddressLabelButtons label={label} onSelect={setLabel} />
        </div>
        {/* save */}
        <button
          type="submit"
          className="mt-6 h-11 w-full rounded-md bg-pink-600 text-sm font-semibold text-white transition hover:bg-pink-700"
        >
          Save and continue
        </button>
      </div>
      <input type="hidden" name="label" value={label} />

      {/* extra */}
    </form>
  );
}

function AddressLabelButtons({
  label,
  onSelect,
}: {
  label: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect("Home")}
        className={`inline-flex h-7 items-center gap-1 rounded-full border px-3 text-xs transition ${
          label === "Home"
            ? "border-neutral-900 bg-neutral-100 text-neutral-900"
            : "border-neutral-300 bg-white text-neutral-700"
        }`}
      >
        Home
      </button>
      <button
        type="button"
        onClick={() => onSelect("Work")}
        className={`inline-flex h-7 items-center gap-1 rounded-full border px-3 text-xs transition ${
          label === "Work"
            ? "border-neutral-900 bg-neutral-100 text-neutral-900"
            : "border-neutral-300 bg-white text-neutral-700"
        }`}
      >
        Work
      </button>
      <button
        type="button"
        onClick={() => onSelect("Partner")}
        className={`inline-flex h-7 items-center gap-1 rounded-full border px-3 text-xs transition ${
          label === "Partner"
            ? "border-neutral-900 bg-neutral-100 text-neutral-900"
            : "border-neutral-300 bg-white text-neutral-700"
        }`}
      >
        Partner
      </button>
    </div>
  );
}
