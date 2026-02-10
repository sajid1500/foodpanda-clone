import { getLocationName, getUser } from "@/_lib/data-service";
import React from "react";
import CartOverview from "./CartOverview";
import UserMenuButton from "./UserMenuButton";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { createClient } from "@/_lib/supabase/server";

export default async function Header() {
  const { lat, lng } = await getUser().then((user) => user.location);
  const locationName = await getLocationName(lat, lng);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log("Header user:", user);
  const isLoggedIn = !!user;
  // Reverse geocoding: convert lat/lng to address

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full items-center justify-between px-4 py-2">
        <UserMenuButton isLoggedIn={isLoggedIn} />
        {/* <a href="/">logo</a> */}
        <Link href="/restaurants">
          <BrandLogo />
        </Link>
        <CartOverview />
      </div>
      <div>{locationName}</div>
    </div>
  );
}
