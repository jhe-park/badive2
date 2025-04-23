'use client';

import { cn } from '@/lib/utils';
import { Divider } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Component() {
  const pathname = usePathname();
  console.log('pathname');
  console.log(pathname);

  if (pathname.includes('admin')) {
    return null;
  }

  return (
    <footer className={cn('footer w-full bg-black py-12 text-white', pathname.startsWith('/event/') && 'hidden')}>
      {/* Logo Section */}
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center text-4xl font-bold transition-colors md:text-5xl">바다이브</div>

        {/* Main Content */}
        <div className="mb-12 flex flex-col items-center justify-center gap-8 md:flex-row md:items-center md:justify-between">
          {/* Company Info */}
          <div className="order-2 flex w-full max-w-2xl flex-col items-center justify-center space-y-3 md:w-1/2">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm md:text-base">
              <span className="font-semibold">제이에이치이 주식회사</span>
              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span>박치양</span>
              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span>주소: 서울 강서구 마곡동 797-7 퀸즈파크텐 506호</span>
            </div>
            <div className="text-sm text-gray-400">(도로명;서울특별시 강서구 마곡중앙6로 66 506호)</div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <span>사업자 등록번호 : 396-81-03251</span>
              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span>통신판매업 신고번호: 제2024-서울강서-2139호</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <span>전화번호: 02-6953-4432</span>

              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span>업무협약 및 제휴:jhe.company1@gmail.com</span>
              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span className="cursor-pointer transition-colors hover:text-blue-400">개인정보 처리방침</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="order-1 flex w-full flex-wrap justify-center gap-4 md:w-1/2">
            {[
              { src: '/logo/youtube.png', alt: 'youtube', href: 'https://youtube.com/channel/UCFSbRT26EQz8prlGfg0_-YA?si=nX95jnpgnI73Ttpq' },
              { src: '/logo/kakao.png', alt: 'kakao', href: 'https://pf.kakao.com/_ClHKn ' },
              { src: '/logo/instagram.png', alt: 'instagram', href: 'https://www.instagram.com/badive_official/' },
              { src: '/logo/cafe.png', alt: 'cafe', href: 'https://cafe.naver.com/babive' },
              { src: '/logo/blog.png', alt: 'blog', href: 'https://blog.naver.com/chiyang80' },
            ].map(social => (
              <Link key={social.alt} href={social.href} className="transform transition-transform hover:scale-110">
                <Image src={social.src} alt={social.alt} width={50} height={50} className="opacity-80 transition-opacity hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">ⓒBADIVE., ALL RIGHTS RESERVED</div>
      </div>
    </footer>
  );
}
