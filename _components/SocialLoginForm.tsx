"use client";

import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { useLayoutStore } from "@/lib/layoutStore";
import { signInWithProvider } from "@/lib/actions/auth";

export default function SocialLoginForm() {
  const { openEmailDrawer } = useLayoutStore((state) => state);

  return (
    <div className="px-6 pt-6 pb-8">
      {/* Header */}
      <h2 className="mb-2 text-2xl font-bold text-gray-900">Welcome!</h2>
      <p className="mb-6 text-sm text-gray-600">
        Sign up or log in to continue
      </p>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        {/* Facebook Button */}
        {/* <button
          onClick={() => signInWithProvider("facebook")}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#1877F2] px-4 py-3 font-semibold text-white transition-all hover:bg-[#1567D3]"
        >
          <FaFacebook size={20} />
          Continue with Facebook
        </button> */}

        {/* Google Button */}
        <button
          onClick={() => signInWithProvider("google")}
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
        >
          <FaGoogle size={20} />
          Continue with Google
        </button>

        {/* Apple Button */}
        {/* <button
          onClick={() => signInWithProvider("apple")}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-black px-4 py-3 font-semibold text-white transition-all hover:bg-gray-900"
        >
          <FaApple size={20} />
          Continue with Apple
        </button> */}
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">or</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Email Login/Signup Buttons */}
      <div className="space-y-3">
        {/* Log in Button */}
        <button
          onClick={openEmailDrawer}
          className="w-full rounded-lg bg-[#D70F64] px-4 py-3 font-semibold text-white transition-all hover:bg-[#C00D59]"
        >
          Log in
        </button>

        {/* Sign up Button */}
        <button
          onClick={openEmailDrawer}
          className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
        >
          Sign up
        </button>
      </div>

      {/* Terms and Privacy */}
      <p className="mt-6 text-center text-xs text-gray-500">
        By signing up, you agree to our{" "}
        <a href="#" className="text-[#D70F64] underline">
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a href="#" className="text-[#D70F64] underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
