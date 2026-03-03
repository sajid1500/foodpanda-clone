"use client";

import { useState } from "react";
import { LuHouse, LuPlus } from "react-icons/lu";
import { Address } from "@/app/_lib/types/api.types";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] w-[390px] animate-pulse rounded-md bg-neutral-100" />
  ),
});

type AddressLabel = "Home" | "Work" | "Partner" | "Other";

const LABELS: AddressLabel[] = ["Home", "Work", "Partner", "Other"];

type SaveAddressProps = {
  address: Address | null;
  onEditAddress: () => void;
  onSaveAddress?: (payload: {
    street: string;
    apartment: string;
    note: string;
    label: AddressLabel;
  }) => void;
};

export default function SaveAddress({
  address,
  onSaveAddress,
}: SaveAddressProps) {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [apartment, setApartment] = useState("");
  const [note, setNote] = useState("");
  const [label, setLabel] = useState<AddressLabel>("Home");
  const [customLabel, setCustomLabel] = useState("");

  const handleSave = () => {};

  const { street, house } = address || {};
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
    <div className="px-4 pt-4 pb-4">
      <Map
        key="foodpanda-map-v2"
        zoom={25}
        className="h-[150px] max-w-[390px]"
        position={[
          address?.coords.lat ?? 23.7524788,
          address?.coords.lng ?? 90.4176482,
        ]}
      />

      <div className="mt-5 space-y-4">
        {!!missingInfo && (
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              We&apos;re missing your {missingInfo}
            </p>
            <input
              value={addressLine1}
              onChange={(event) => setAddressLine1(event.target.value)}
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
            value={addressLine2}
            onChange={(event) => setAddressLine2(event.target.value)}
            placeholder="Apartment #"
            className="mt-2 h-11 w-full rounded-md border border-neutral-300 px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
          />
          <input
            value={note}
            onChange={(event) => setNote(event.target.value)}
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
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="mt-6 h-11 w-full rounded-md bg-pink-600 text-sm font-semibold text-white transition hover:bg-pink-700"
      >
        Save and continue
      </button>
    </div>
  );
}
