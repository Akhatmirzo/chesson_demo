import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  devIndicators: false,
  // CSS HTML ichiga joylanadi — birinchi chizish tezroq
  experimental: { inlineCss: true },
};

export default nextConfig;
