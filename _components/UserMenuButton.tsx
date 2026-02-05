"use client";

import { useLayoutStore } from "@/_lib/layoutStore";
import { Menu, User } from "lucide-react";
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
      <User size={24} color="black" />
    </button>
  );
}
