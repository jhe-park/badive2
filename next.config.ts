import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jhedata.s3.ap-southeast-2.amazonaws.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        // hostname: 'efehwvtyjlpxkpgswrfw.supabase.co',
        hostname: 'api.badive.co.kr',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'www.instagram.com',
        port: '',
        search: '',
      },
    ],
    domains: [
      'jhedata.s3.ap-southeast-2.amazonaws.com',
      // 'efehwvtyjlpxkpgswrfw.supabase.co',
      'api.badive.co.kr',
      'www.instagram.com',
    ],
  },
  // i18n: {
  //   // locales: ['en', 'fr', 'es'],
  //   locales: [],
  //   defaultLocale: 'ko',
  //   // defaultLocale: 'en',
  // },
};

export default withBundleAnalyzer(nextConfig);
