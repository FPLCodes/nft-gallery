import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SOLANA_RPC_URL: "https://api.devnet.solana.com",
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
  },
  images: {
    domains: ["gateway.pinata.cloud"],
  },
};

export default nextConfig;
