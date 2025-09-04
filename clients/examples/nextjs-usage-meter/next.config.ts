import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    '@anyhive/react',
    '@anyhive/ui',
  ],
};

export default nextConfig;
