"use client";

import { useLayoutStore } from "@/app/_lib/store/layoutStore";
import { LuUser } from "react-icons/lu";
import { useState } from "react";

export default function UserMenuButton({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const { openUserMenu, openAuthDrawer } = useLayoutStore((state) => state);
  // const isLoggedIn = false ; // Replace with actual authentication logic
  return (
    <button onClick={isLoggedIn ? openUserMenu : openAuthDrawer}>
      <LuUser size={24} color="black" />
    </button>
  );
}
