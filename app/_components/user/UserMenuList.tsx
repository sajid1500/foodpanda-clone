"use client";

import { motion } from "framer-motion";
import {
  LuWallet,
  LuCrown,
  LuClipboardList,
  LuUser,
  LuTicket,
  LuTrophy,
  LuCircle,
  LuLogOut,
} from "react-icons/lu";
import { createClient } from "@/app/_lib/supabase/client";

export default function UserMenuList() {
  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      // Optionally, you can redirect the user to the homepage or login page after sign-out
      window.location.href = "/";
    }
  };

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      <motion.li
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <a
          href="/pandapay"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuWallet size={24} strokeWidth={1.5} className="text-gray-700" />
          <span className="text-base font-medium text-gray-800">pandapay</span>
        </a>
      </motion.li>

      <motion.li
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <a
          href="/subscription"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuCrown size={24} strokeWidth={1.5} className="text-purple-600" />
          <span className="text-base font-medium text-gray-800">
            My subscription
          </span>
        </a>
      </motion.li>

      <motion.li
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <a
          href="/orders"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuClipboardList
            size={24}
            strokeWidth={1.5}
            className="text-gray-700"
          />
          <span className="text-base font-medium text-gray-800">
            Orders & reordering
          </span>
        </a>
      </motion.li>

      <motion.li
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <a
          href="/account"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuUser size={24} strokeWidth={1.5} className="text-gray-700" />
          <span className="text-base font-medium text-gray-800">Profile</span>
        </a>
      </motion.li>

      <motion.li
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <a
          href="/vouchers"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuTicket size={24} strokeWidth={1.5} className="text-gray-700" />
          <span className="text-base font-medium text-gray-800">Vouchers</span>
        </a>
      </motion.li>

      <motion.li
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <a
          href="/rewards"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuTrophy size={24} strokeWidth={1.5} className="text-gray-700" />
          <span className="text-base font-medium text-gray-800">
            panda rewards
          </span>
        </a>
      </motion.li>

      <motion.li
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <a
          href="/help"
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-gray-100"
        >
          <LuCircle size={24} strokeWidth={1.5} className="text-gray-700" />
          <span className="text-base font-medium text-gray-800">
            Help Center
          </span>
        </a>
      </motion.li>

      <motion.li
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <button
          className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors hover:cursor-pointer hover:bg-gray-100"
          onClick={handleSignOut}
        >
          <LuLogOut size={24} strokeWidth={1.5} className="text-gray-700" />
          <span className="text-base font-medium text-gray-800">Logout</span>
        </button>
      </motion.li>
    </motion.ul>
  );
}
