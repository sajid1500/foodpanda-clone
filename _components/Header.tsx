import { getLocationName, getUser } from "@/_lib/dataService";
import React from "react";
import CartOverview from "./CartOverview";

export default async function Header() {
  const { lat, lng } = await getUser().then((user) => user.location);
  const locationName = await getLocationName(lat, lng);
  // Reverse geocoding: convert lat/lng to address

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full items-center justify-between px-4 py-2">
        <div>nav</div>
        <div>logo</div>
        <CartOverview />
      </div>
      <div>{locationName}</div>
    </div>
  );
}
