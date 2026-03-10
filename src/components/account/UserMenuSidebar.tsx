"use client";

import { useLayoutStore } from "@/lib/stores/layoutStore";
import { motion, AnimatePresence } from "framer-motion";
import { CloseButton } from "@/components/ui/CloseButton";
import { UserMenuList } from "./UserMenuList";
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

export function UserMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <UserMenuButton />
      </SheetTrigger>
      {/* <SheetClose className="absolute top-4 right-4">hi</SheetClose> */}
      <SheetContent side="left">
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
    </Sheet>
  );
}
