import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    middlewarePrefetch: "strict",
  },
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "pngimg.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.pikbest.com" },
    ],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;
