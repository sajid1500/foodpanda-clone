import { useState } from "react";
import { LuArrowLeft, LuMail } from "react-icons/lu";
import {
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useLayoutStore } from "@/lib/stores/layoutStore";

export function EmailForm() {
  const [email, setEmail] = useState("");
  const { closeEmailDrawer } = useLayoutStore((state) => state);

  return (
    <>
      <div className={`flex items-center justify-between`}>
        <button
          aria-label="Back"
          onClick={closeEmailDrawer}
          className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <LuArrowLeft size={24} />
        </button>
        {/* Close Button */}
        <DrawerClose />
      </div>
      {/* Icon */}
      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100">
          <LuMail size={32} className="text-primary" />
        </div>
      </div>

      {/* Header */}
      <DrawerHeader>
        <DrawerTitle className="mb-2 text-center text-2xl font-bold text-gray-900">
          What&apos;s your email?
        </DrawerTitle>
        <DrawerDescription className="mb-8 text-center text-sm text-gray-600">
          We&apos;ll check if you have an account
        </DrawerDescription>
      </DrawerHeader>

      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="mb-2 block text-sm text-gray-600">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=""
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-[#D70F64] focus:outline-none"
        />
      </div>

      {/* Continue Button */}
      <button
        disabled={!email}
        className="w-full rounded-lg bg-gray-300 px-4 py-3 font-semibold text-white transition-all enabled:bg-[#D70F64] enabled:hover:bg-[#C00D59] disabled:cursor-not-allowed disabled:opacity-100"
      >
        Continue
      </button>
    </>
  );
}
