"use client";

import { useLayoutStore } from "@/lib/stores/layoutStore";
import { motion, AnimatePresence } from "framer-motion";
import { SocialLoginForm } from "./SocialLoginForm";
import { EmailForm } from "./EmailForm";
import { LuArrowLeft, LuUser } from "react-icons/lu";
// import Sheet from "@/components/ui/Sheet";
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
import { Button } from "@/components/ui/button";
import { UserMenuButton } from "@/components/ui/UserMenuButton";
import { useState } from "react";

export function AuthDrawer() {
  const { isEmailDrawerOpen } = useLayoutStore((state) => state);
  return (
    <SheetContent className="p-8">
      {isEmailDrawerOpen ? <EmailForm /> : <SocialLoginForm />}
    </SheetContent>
  );
}
