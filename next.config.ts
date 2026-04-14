import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Map env vars so existing builder code (process.env.API_KEY) works unchanged
  env: {
    API_KEY: process.env.GEMINI_API_KEY || "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
  },
  // Suppress warnings for packages that reference Node.js modules in client bundles
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.worldwideshades.com' }],
        destination: 'https://worldwideshades.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
