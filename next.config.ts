import type { NextConfig } from "next";
import { SUPABASE_STORAGE_URL } from "./app/_lib/utility/constants";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i0.wp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "zsinkefhyowyqjycayfz.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/**",
        // pathname: "/api/image/**",
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
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination: `${SUPABASE_STORAGE_URL}/restaurant-assets/:path*`,
      },
    ];
  },
};

export default nextConfig;
