"use client";

import { useLayoutStore } from "@/lib/stores/layoutStore";
import { motion, AnimatePresence } from "framer-motion";
import { SocialLoginForm } from "./SocialLoginForm";
import { EmailForm } from "./EmailForm";
import { LuArrowLeft, LuUser } from "react-icons/lu";
// import Drawer from "@/components/ui/Drawer";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { UserMenuButton } from "@/components/ui/UserMenuButton";
import { useState } from "react";

export function AuthDrawer() {
  const { isEmailDrawerOpen } = useLayoutStore((state) => state);
  return (
    // </Drawer>
    <Drawer>
      <DrawerTrigger asChild>
        <UserMenuButton />
      </DrawerTrigger>

      <DrawerContent>
        {isEmailDrawerOpen ? <EmailForm /> : <SocialLoginForm />}
      </DrawerContent>
    </Drawer>
  );
}
