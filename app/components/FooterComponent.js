"use client";

import React from "react";
import { Chip, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Component() {
  const pathname = usePathname();
  if(pathname.includes('admin')){
    return null;
  }
  return (
    <footer className="w-full bg-black text-white py-12">
      {/* Logo Section */}
      <div className="container mx-auto px-4">
        <div className="text-center text-4xl md:text-5xl font-bold mb-12 transition-colors">
          제이에이치이 주식회사사
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Company Info */}
          <div className="flex flex-col space-y-3 max-w-2xl order-2">
            <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
              <span className="font-semibold">BDN DIVE</span>
              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span>박치양</span>
              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span>주소: 서울 강서구 마곡동 797-7 퀸즈파크텐 506호</span>
            </div>
            <div className="text-sm text-gray-400">
              (도로명;서울특별시 강서구 마곡중앙6로 66 506호)
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span>사업자 등록번호 : 396-81-03251</span>
              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span>통신판매업 신고번호: 제2024-서울강서-2139호</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span>전화번호: 02-6953-4432</span>
              <Divider orientation="vertical" className="h-4 bg-gray-400" />
              <span className="hover:text-blue-400 cursor-pointer transition-colors">
                개인정보 처리방침
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 order-1">
            {[
              { src: "/logo/youtube.png", alt: "youtube", href: "https://youtube.com/@bdndive?si=p72b0W3_Szqc_c7Y" },
              { src: "/logo/kakao.png", alt: "kakao", href: "" },
              { src: "/logo/instagram.png", alt: "instagram", href: "https://www.instagram.com/bdn_dive?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
              { src: "/logo/cafe.png", alt: "cafe", href: "https://cafe.naver.com/bdndive" },
              { src: "/logo/blog.png", alt: "blog", href: "" },
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
          ⓒBDN DIVE., ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}
