"use client";

import { useLayoutStore } from "@/_lib/layoutStore";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "./CloseButton";
import UserMenuList from "./UserMenuList";

export default function UserMenu() {
  const { isUserMenuOpen, closeUserMenu } = useLayoutStore((state) => state);

  return (
    <AnimatePresence>
      {isUserMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-10 bg-black/50"
            onClick={closeUserMenu}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 z-20 h-screen w-full max-w-sm bg-white shadow-lg"
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <CloseButton
                className="bg-gray-50 shadow-sm"
                onClick={closeUserMenu}
              />
            </div>

            {/* Menu Items */}
            <nav className="px-4">
              <UserMenuList />
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
