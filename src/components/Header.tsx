import Link from "next/link";
import { BrandLogo } from "./ui/BrandLogo";
import { createClient } from "@/lib/config/supabase/server";
import { AddressModal } from "./address/AddressModal";
import { getUserforClient, getUserForServer } from "@/lib/utils/auth";
import { AuthDrawer } from "./account/AuthDrawer";
import { UserMenuSidebar } from "./account/UserMenuSidebar";
import { CartSidebar as Cart } from "./cart/CartSidebar";
import { AccountModal } from "./account/AccountModal";
import { getAddresses, getDefaultAddress } from "@/lib/services/userService";
import { Address } from "@/lib/types/user.types";

export async function Header() {
  // console.log("Fetched addresses for modal", addresses);
  const userAddresses = await getAddresses();
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full items-center justify-between px-4 py-2">
        <AccountModal />
        <Link href="/restaurants">
          <BrandLogo />
        </Link>
        <Cart />
      </div>
      <AddressModal addresses={userAddresses} />
    </div>
  );
}
