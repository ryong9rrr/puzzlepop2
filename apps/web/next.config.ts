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
  images: {
    // TODO: https, 도메인네임으로 바꾸기
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.puzzlepop.site",
      },
    ],
  },
};

export default nextConfig;
