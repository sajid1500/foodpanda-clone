"use client";

import { useLayoutStore } from "@/_lib/layoutStore";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "./CloseButton";
import SocialLoginForm from "./SocialLoginForm";
import EmailForm from "./EmailForm";
import { ArrowLeft } from "lucide-react";

export default function Drawer() {
  const {
    isAuthDrawerOpen,
    closeAuthDrawer,
    closeEmailDrawer,
    isEmailDrawerOpen,
  } = useLayoutStore((state) => state);

  return (
    <AnimatePresence>
      {isAuthDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={closeAuthDrawer}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl"
          >
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
                  <ArrowLeft size={24} />
                </button>
              )}
              {/* Close Button */}
              <CloseButton onClick={closeAuthDrawer} />
            </div>

            {/* Content */}
            {isEmailDrawerOpen ? <EmailForm /> : <SocialLoginForm />}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
