import React from "react";
import CartOverview from "../cart/CartOverview";
import UserMenuButton from "../user/UserMenuButton";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { createClient } from "@/app/_lib/supabase/server";
import LocationPicker from "../address/AddressButton";
import { getUserForServer } from "@/app/_lib/utility/auth";

export default async function Header(
  {
    //   children,
    // }: {
    //   children: React.ReactNode;
  },
) {
  const user = await getUserForServer();
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
      <LocationPicker />
      {/* {children}  TODO: later*/}
    </div>
  );
}
