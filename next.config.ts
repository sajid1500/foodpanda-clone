import type { NextConfig } from "next";
// import { SUPABASE_STORAGE_URL } from "./app/_lib/utils/constants";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 80, 85, 90, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zsinkefhyowyqjycayfz.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: [
    "effective-space-fortnight-p6gp9vpg663796x-3000.app.github.dev",
    "*.app.github.dev",
  ],
  experimental: {
    serverActions: {
      allowedOrigins: ["*.github.dev", "localhost:3000"],
    },
  },
};

export default nextConfig;
