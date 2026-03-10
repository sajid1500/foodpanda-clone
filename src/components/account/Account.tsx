'use client";'

import { getUserforClient } from "@/lib/utils/auth";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { UserMenuButton } from "../ui/UserMenuButton";
import { SocialLoginForm } from "./SocialLoginForm";
import { EmailForm } from "./EmailForm";
import { useLayoutStore } from "@/lib/stores/layoutStore";
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
export async function Account() {
  const user = await getUserforClient();
  const { isEmailDrawerOpen } = useLayoutStore((state) => state);
  const isLoggedIn = !!user;
  if (!isLoggedIn)
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <UserMenuButton />
        </DrawerTrigger>

        <DrawerContent>
          {isEmailDrawerOpen ? <EmailForm /> : <SocialLoginForm />}
        </DrawerContent>
      </Drawer>
    );
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
