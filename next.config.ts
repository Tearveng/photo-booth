import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // env: {
  //   NEXT_PUBLIC_API: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
  // },
  webpack(config, { isServer }) {
    // For client-side only, make `canvas` module resolve to an empty module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
    }
    return config;
  },
};

export default nextConfig;
