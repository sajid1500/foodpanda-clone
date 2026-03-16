import Link from "next/link";
import { BrandLogo } from "./ui/BrandLogo";
import { createClient } from "@/lib/config/supabase/client";
import { AddressModal } from "./address/AddressModal";
import { getUserforClient, getUserForServer } from "@/lib/utils/auth";
import { AuthDrawer } from "./account/AuthDrawer";
import { UserMenuSidebar } from "./account/UserMenuSidebar";
import { CartSidebar as Cart } from "./cart/CartSidebar";
import { AccountModal } from "./account/AccountModal";
import { getUserAddresses } from "@/lib/services/userService";
import { UserAddress } from "@/lib/types/user.types";

export async function Header() {
  const addresses = (await getUserAddresses()) as UserAddress[];

  console.log("Fetched addresses in modal", addresses);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full items-center justify-between px-4 py-2">
        <AccountModal />
        <Link href="/restaurants">
          <BrandLogo />
        </Link>
        <Cart />
      </div>
      <AddressModal addresses={addresses} />
    </div>
  );
}
