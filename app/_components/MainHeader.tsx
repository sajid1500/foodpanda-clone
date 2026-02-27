import React from "react";
import CartOverview from "./cart/CartOverview";
import UserMenuButton from "./ui/UserMenuButton";
import Link from "next/link";
import BrandLogo from "./ui/BrandLogo";
import { createClient } from "@/app/_lib/config/supabase/server";
import LocationPicker from "./address/AddressButton";
import { getUserForServer } from "@/app/_lib/utils/auth";
import AuthDrawer from "./auth/AuthDrawer";
import UserMenu from "./user/UserMenuSidebar";
import Cart from "./cart/CartSidebar";

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
