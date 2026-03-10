import React from "react";
import { CartOverview } from "./cart/CartOverview";
import { UserMenuButton } from "./ui/UserMenuButton";
import Link from "next/link";
import { BrandLogo } from "./ui/BrandLogo";
import { createClient } from "@/lib/config/supabase/server";
import { AddressModal as LocationPicker } from "./address/AddressModal";
import { getUserForServer } from "@/lib/utils/auth";
import { AuthDrawer } from "./account/AuthDrawer";
import { UserMenu } from "./account/UserMenuSidebar";
import { CartSidebar as Cart } from "./cart/CartSidebar";
import { Account } from "./account/Account";

export async function Header(
  {
    //   children,
    // }: {
    //   children: React.ReactNode;
  },
) {
  // Reverse geocoding: convert lat/lng to address
  const user = await getUserForServer();
  const isLoggedIn = !!user;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full items-center justify-between px-4 py-2">
        {/* <Account /> */}
        {/* <UserMenuButton isLoggedIn={isLoggedIn} /> */}
        {isLoggedIn ? <UserMenu /> : <AuthDrawer />}
        {/* <AuthDrawer /> */}
        {/* <a href="/">logo</a> */}
        <Link href="/restaurants">
          <BrandLogo />
        </Link>
        {/* <CartOverview /> */}
        <Cart />
      </div>
      <LocationPicker />
      {/* {children}  TODO: later*/}
    </div>
  );
}
