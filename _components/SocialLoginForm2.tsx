"use client";
import { signInWithProvider } from "@/lib/actions/auth";
import React from "react";
import { FaGoogle } from "react-icons/fa";

export default function SocialLoginForm2() {
  return (
    <div>
      <div className="space-y-3">
        {/* <button
            onClick={() => signInWithProvider("facebook")}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#1877F2] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#1567D3]"
          >
            <FaFacebook size={18} />
            Continue with Facebook
          </button> */}
        <button
          onClick={() => signInWithProvider("google")}
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-all hover:bg-gray-50"
        >
          <FaGoogle size={18} />
          Continue with Google
        </button>
        {/* <button
            onClick={() => signInWithProvider("apple")}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-900"
          >
            <FaApple size={18} />
            Continue with Apple
          </button> */}
      </div>
    </div>
  );
}
