/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn-icons-png.flaticon.com","images.remotePatterns"],
  },
    // Configure font loading behavior
  experimental: {
    optimizePackageImports: ['@next/font'],
  },

  
 
};

module.exports = nextConfig;
