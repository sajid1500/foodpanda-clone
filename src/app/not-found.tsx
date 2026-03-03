import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Not found",
  description: "the page you are looking for is not found",
};

export default function NotFound() {
  return (
    <section className="bg-secondary text-foreground min-h-screen px-6 pt-10 pb-12 text-center">
      <div className="mx-auto w-full max-w-md">
        <p className="text-[180px] leading-none font-light text-white drop-shadow-[0_20px_26px_rgba(151,103,0,0.2)] select-none md:text-[220px]">
          404
        </p>

        <h1 className="text-primary mt-8 text-5xl font-light">
          Something went wrong
        </h1>

        <p className="text-foreground mx-auto mt-5 max-w-sm text-2xl leading-relaxed">
          We&apos;re deeply sorry, but something went wrong. Please try to
          refresh the page or{" "}
          <Link href="/" className="underline">
            start over
          </Link>
          .
        </p>

        <div className="bg-border my-14 h-px w-full" />

        <button
          type="button"
          className="border-foreground w-full rounded-2xl border px-6 py-6 text-4xl font-semibold"
        >
          বাংলা
        </button>

        <div className="text-primary mt-10 space-y-1 underline">
          <div className="flex items-center justify-center gap-10 text-2xl">
            <Link href="#">Press</Link>
            <Link href="#">Help Center</Link>
          </div>
          <div className="flex items-center justify-center gap-8 text-2xl">
            <Link href="#">Terms and conditions</Link>
            <Link href="#">Privacy policy</Link>
          </div>
          <div className="text-2xl">
            <Link href="#">Refund Account Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
