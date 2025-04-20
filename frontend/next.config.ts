import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  images: {
    domains: ['cdn-icons-png.flaticon.com', 'images.unsplash.com'], // add more if needed
  },
};

export default nextConfig;
