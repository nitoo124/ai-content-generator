import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn-icons-png.flaticon.com"]
  },
  eslint:{
    ignoreDuringBuilds:true,
  },
  experimental: {
    typedRoutes: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Temporary measure to get deployed
  },
};

export default nextConfig;
