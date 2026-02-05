import type { NextConfig } from "next";

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
        pathname: "/api/image/**",
      },
    ],
  },
};

export default nextConfig;
