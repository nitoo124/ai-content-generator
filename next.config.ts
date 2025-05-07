import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn-icons-png.flaticon.com"]
  },
  eslint:{
    ignoreDuringBuilds:true
  }
};

export default nextConfig;
