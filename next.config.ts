import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
  },
  // 기타 설정 옵션 추가 가능
};

export default nextConfig;
