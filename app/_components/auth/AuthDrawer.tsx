"use client";

import { useLayoutStore } from "@/app/_lib/store/layoutStore";
import { motion, AnimatePresence } from "framer-motion";
import SocialLoginForm from "./SocialLoginForm";
import EmailForm from "./EmailForm";
import { LuArrowLeft } from "react-icons/lu";
import Drawer from "../ui/Drawer";

export default function AuthDrawer() {
  const {
    isAuthDrawerOpen,
    closeAuthDrawer,
    closeEmailDrawer,
    isEmailDrawerOpen,
  } = useLayoutStore((state) => state);

  return (
    <Drawer isOpen={isAuthDrawerOpen} onClose={closeAuthDrawer}>
      {/* Header with buttons */}
      <div
        className={`flex items-center px-4 pt-4 ${isEmailDrawerOpen ? "justify-between" : "justify-end"}`}
      >
        {/* back button */}
        {isEmailDrawerOpen && (
          <button
            aria-label="Back"
            onClick={closeEmailDrawer}
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <LuArrowLeft size={24} />
          </button>
        )}
        {/* Close Button */}
        {/* <CloseButton onClick={closeAuthDrawer} /> */}
      </div>

      {/* Content */}
      {isEmailDrawerOpen ? <EmailForm /> : <SocialLoginForm />}
    </Drawer>
  );
}
