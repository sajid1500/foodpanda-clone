"use client";

import { type FormEvent } from "react";

const initialProfile = {
  firstName: "Sajid",
  lastName: "Chowdhury",
  mobile: "+8801795010207",
};

export default function AccountPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      mobile: String(formData.get("mobile") ?? ""),
    };

    void payload;
  };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <h1 className="text-base font-semibold text-neutral-900">
            My profile
          </h1>
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 text-[10px] font-semibold text-neutral-500">
            i
          </span>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="text-xs font-medium text-neutral-600"
              htmlFor="firstName"
            >
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              defaultValue={initialProfile.firstName}
              className="mt-1 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <div>
            <label
              className="text-xs font-medium text-neutral-600"
              htmlFor="lastName"
            >
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              defaultValue={initialProfile.lastName}
              className="mt-1 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <div>
            <label
              className="text-xs font-medium text-neutral-600"
              htmlFor="mobile"
            >
              Mobile number
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              defaultValue={initialProfile.mobile}
              className="mt-1 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex items-center rounded-md bg-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-500 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
