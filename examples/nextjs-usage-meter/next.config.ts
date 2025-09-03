import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    '@anyhive-kit/react',
    '@anyhive-kit/ui',
  ],
};

export default nextConfig;
