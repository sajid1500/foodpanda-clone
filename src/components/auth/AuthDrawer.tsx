"use client";

import { useLayoutStore } from "@/lib/stores/layoutStore";
import { motion, AnimatePresence } from "framer-motion";
import SocialLoginForm from "./SocialLoginForm";
import EmailForm from "./EmailForm";
import { LuArrowLeft, LuUser } from "react-icons/lu";
// import Drawer from "../ui/Drawer";
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
import { Button } from "../ui/button";
import UserMenuButton from "../ui/UserMenuButton";

export default function AuthDrawer() {
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
