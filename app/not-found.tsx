import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Not found",
  description: "the page you are looking for is not found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        <p className="mb-8 text-gray-600">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
