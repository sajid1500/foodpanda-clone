import Image from "next/image";
import React from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { signInWithProvider } from "@/lib/actions/auth";
import SocialLoginForm2 from "@/_components/SocialLoginForm2";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <h1>Please log in to continue.</h1>
      <div className="fixed inset-0 top-[50vh] -z-10 opacity-20">
        <SocialLoginForm2 />
      </div>
    </div>
  );
}
