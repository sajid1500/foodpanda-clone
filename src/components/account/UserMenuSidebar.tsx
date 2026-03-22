"use client";

import {
  LuWallet,
  LuCrown,
  LuClipboardList,
  LuUser,
  LuTicket,
  LuTrophy,
  LuCircle,
  LuLogOut,
} from "react-icons/lu";
import { getBrowserClient } from "@/lib/config/supabase/client";
import { useLayoutStore } from "@/lib/stores/layoutStore";
import { motion, AnimatePresence } from "framer-motion";
import { CloseButton } from "@/components/ui/CloseButtonFilled";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserMenuButton } from "@/components/ui/UserMenuButton";

export function UserMenuSidebar() {
  return (
    <SheetContent side="left" className="w-full">
      <SheetHeader className="sr-only">
        <SheetTitle>User Menu</SheetTitle>

        <SheetDescription>
          Browse account settings, preferences, and manage your profile.
        </SheetDescription>
      </SheetHeader>
      <nav className="mt-16 px-4">
        <UserMenuList />
      </nav>
    </SheetContent>
  );
}

function UserMenuList() {
  const handleSignOut = async () => {
    const supabase = getBrowserClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <ul>
      <li>
        <a
          href="/pandapay"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuWallet size={24} strokeWidth={1.5} className="text-gray-700" />
          <span className="text-base font-medium text-gray-800">pandapay</span>
        </a>
      </li>

      <li>
        <a
          href="/subscription"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuCrown size={24} strokeWidth={1.5} className="text-purple-600" />
          <span className="text-base font-medium text-gray-800">
            My subscription
          </span>
        </a>
      </li>

      <li>
        <a
          href="/orders"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuClipboardList
            size={24}
            strokeWidth={1.5}
            className="text-gray-700"
          />
          <span className="text-base font-medium text-gray-800">
            Orders & reordering
          </span>
        </a>
      </li>

      <li>
        <a
          href="/account"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuUser size={24} strokeWidth={1.5} className="text-gray-700" />
          <span className="text-base font-medium text-gray-800">Profile</span>
        </a>
      </li>

      <li>
        <a
          href="/vouchers"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuTicket size={24} strokeWidth={1.5} className="text-gray-700" />
          <span className="text-base font-medium text-gray-800">Vouchers</span>
        </a>
      </li>

      <li>
        <a
          href="/rewards"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuTrophy size={24} strokeWidth={1.5} className="text-gray-700" />
          <span className="text-base font-medium text-gray-800">
            panda rewards
          </span>
        </a>
      </li>

      <div className="h-px w-full bg-gray-200"></div>

      <li>
        <a
          href="/help"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuCircle size={24} strokeWidth={1.5} className="text-gray-700" />
          <span className="text-base font-medium text-gray-800">
            Help Center
          </span>
        </a>
      </li>

      <li>
        <button
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:cursor-pointer hover:bg-gray-100"
          onClick={handleSignOut}
        >
          <LuLogOut size={24} strokeWidth={1.5} className="text-gray-700" />
          <span className="text-base font-medium text-gray-800">Logout</span>
        </button>
      </li>
    </ul>
  );
}
