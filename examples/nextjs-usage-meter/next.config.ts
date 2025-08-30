import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    '@moneta-kit/react',
    '@moneta-kit/ui',
  ],
};

export default nextConfig;
