import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";

export default function EmailForm() {
  const [email, setEmail] = useState("");

  return (
    <div className="px-6 pt-12 pb-8">
      {/* Icon */}
      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100">
          <Mail size={32} className="text-pink-500" />
        </div>
      </div>

      {/* Header */}
      <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
        What&apos;s your email?
      </h2>
      <p className="mb-8 text-center text-sm text-gray-600">
        We&apos;ll check if you have an account
      </p>

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
    </div>
  );
}
