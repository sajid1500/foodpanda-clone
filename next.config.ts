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
        destination: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/restaurant-assets/:path*`,
      },
    ];
  },
};

export default nextConfig;
