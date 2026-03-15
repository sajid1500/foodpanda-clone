import Link from "next/link";
import { BrandLogo } from "./ui/BrandLogo";
import { createClient } from "@/lib/config/supabase/client";
import { AddressModal as LocationPicker } from "./address/AddressModal";
import { getUserforClient, getUserForServer } from "@/lib/utils/auth";
import { AuthDrawer } from "./account/AuthDrawer";
import { UserMenuSidebar } from "./account/UserMenuSidebar";
import { CartSidebar as Cart } from "./cart/CartSidebar";
import { AccountModal } from "./account/AccountModal";

export async function Header() {
  console.log("environment:", process.env.NODE_ENV);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full items-center justify-between px-4 py-2">
        {/* <Account /> */}
        {/* <UserMenuButton isLoggedIn={isLoggedIn} /> */}
        <AccountModal />
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
