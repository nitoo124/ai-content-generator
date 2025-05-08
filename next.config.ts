import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn-icons-png.flaticon.com"]
  },
  eslint:{
    ignoreDuringBuilds:true,
  },
  typescript: {
    // Remove this after confirming the build works
    ignoreBuildErrors: false,
  }

  
};

export default nextConfig;
