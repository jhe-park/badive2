"use client";

import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Component() {
  const pathname = usePathname();
  if(pathname.includes('admin')){
    return null;
  }
  return (
    <footer className="footer w-full bg-black text-white py-12">
      {/* Logo Section */}
      <div className="container mx-auto px-4">
        <div className="text-center text-4xl md:text-5xl font-bold mb-12 transition-colors">
          바다이브
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-center gap-8 mb-12">
          {/* Company Info */}
          <div className="flex flex-col justify-center items-center space-y-3 max-w-2xl order-2 w-full md:w-1/2">
            <div className="flex flex-wrap justify-center items-center gap-2 text-sm md:text-base">
              <span className="font-semibold">제이에이치이 주식회사</span>
              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span>박치양</span>
              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span>주소: 서울 강서구 마곡동 797-7 퀸즈파크텐 506호</span>
            </div>
            <div className="text-sm text-gray-400">
              (도로명;서울특별시 강서구 마곡중앙6로 66 506호)
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 text-sm">
              <span>사업자 등록번호 : 396-81-03251</span>
              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span>통신판매업 신고번호: 제2024-서울강서-2139호</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm justify-center">
              <span>전화번호: 02-6953-4432</span>

              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span>업무협약 및 제휴:jhe.company1@gmail.com</span>
              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span className="hover:text-blue-400 cursor-pointer transition-colors">
                개인정보 처리방침
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 order-1 w-full md:w-1/2">
            {[
              { src: "/logo/youtube.png", alt: "youtube", href: "https://youtube.com/channel/UCFSbRT26EQz8prlGfg0_-YA?si=nX95jnpgnI73Ttpq" },
              { src: "/logo/kakao.png", alt: "kakao", href: "https://pf.kakao.com/_ClHKn " },
              { src: "/logo/instagram.png", alt: "instagram", href: "https://www.instagram.com/badive_official/" },
              { src: "/logo/cafe.png", alt: "cafe", href: "https://cafe.naver.com/babive" },
              { src: "/logo/blog.png", alt: "blog", href: "https://blog.naver.com/chiyang80" },
            ].map((social) => (
              <Link 
                key={social.alt} 
                href={social.href}
                className="transform hover:scale-110 transition-transform"
              >
                <Image
                  src={social.src}
                  alt={social.alt}
                  width={50}
                  height={50}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          ⓒBADIVE., ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}
