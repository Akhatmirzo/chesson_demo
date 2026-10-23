import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  devIndicators: false,
  // CSS HTML ichiga joylanadi — birinchi chizish tezroq
  // globalNotFound: ikki root layout (uz, ru) — umumiy 404 sahifa uchun
  experimental: { inlineCss: true, globalNotFound: true },
};

export default nextConfig;
