import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'jhedata.s3.ap-southeast-2.amazonaws.com',
      'efehwvtyjlpxkpgswrfw.supabase.co',
      'www.instagram.com',
      
    ],
  },
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
  },
  // 기타 설정 옵션 추가 가능
};

export default nextConfig;
