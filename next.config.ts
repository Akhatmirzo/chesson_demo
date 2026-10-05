import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  devIndicators: false,
  // CSS (≈9 KB gzip) HTML ichiga joylanadi — render-blocking so'rov yo'qoladi
  experimental: { inlineCss: true },
  // *.dev.tsx sahifalar (masalan, /poster-gen) faqat dev rejimda mavjud
  pageExtensions: isDev ? ['dev.tsx', 'tsx', 'ts'] : ['tsx', 'ts'],
};

export default nextConfig;
