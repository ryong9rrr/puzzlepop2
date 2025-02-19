import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ["src"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias["paper"] = false;
    }
    return config;
  },
};

export default nextConfig;
