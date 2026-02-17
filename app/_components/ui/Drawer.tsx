"use client";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "./CloseButton";
import type { ReactNode } from "react";
import { RemoveScroll } from "react-remove-scroll";

export default function Drawer({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <RemoveScroll>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl"
          >
            <CloseButton className="absolute top-4 right-4" onClick={onClose} />

            {children}
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  );
}
