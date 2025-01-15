'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';  // 상단에 import 추가

export default function Navbar() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Only apply hide/show effect on home page
    if (pathname === '/') {
      const navbar = document.querySelector('nav');
      navbar.style.top = '-100px'; // Initially hide navbar

      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 0) {
          navbar.style.top = '0';
        } else {
          navbar.style.top = '-100px';
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // On other pages, always show navbar
      const navbar = document.querySelector('nav');
      navbar.style.top = '0';
    }
  }, [pathname]); // Add pathname as dependency

  useEffect(() => {
    console.log('Current pathname:', pathname);  // pathname 로그 출력
    // ... existing scroll handling code ...
  }, [pathname]);  // pathname이 변경될 때마다 실행

  

  useEffect(() => {
    const handleScrollPosition = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      console.log('Scroll position:', scrollTop);
    };

    window.addEventListener('scroll', handleScrollPosition);

    return () => {
      window.removeEventListener('scroll', handleScrollPosition); 
    };
  }, []);
  return (
    <nav className="nav w-full fixed z-10 bg-black/95 backdrop-blur-sm h-[100px] shadow-lg" style={{ top: pathname === '/' ? '-100px' : '0' }}>
      <div className="w-full px-8 flex justify-between h-full mx-auto">
        {/* 로고 영역 - 여백 조정 */}
        <div className="flex items-center justify-center flex-col pl-4">
          <Link href="/">
            <Image src="/logo/logo.png" alt="Logo" width={80} height={40} className="hover:opacity-80 transition-opacity" />
          </Link>
        </div>

        {/* 우측 메뉴 영역 - 간격 및 스타일 개선 */}
        <div className="flex flex-col items-end justify-center">
          {/* 상단 행: 로그인/회원가입/마이페이지 - 더 섬세한 호버 효과 */}
          <div className="flex h-1/3 gap-6 justify-end items-center">
            <Link 
              href="/login"
              className="text-[12px] text-gray-200 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white"
            >
              로그인
            </Link>
            <Link 
              href="/register"
              className="text-[12px] text-gray-200 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white"
            >
              회원가입
            </Link>
            <Link 
              href="/mypage"
              className="text-[12px] text-gray-200 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white"
            >
              마이페이지
            </Link>
          </div>

          {/* 하단 행: 메인 메뉴 - 더 세련된 호버 효과 */}
          <div className="flex h-2/3 justify-end items-center gap-x-12">
            <Link href="/about" className="text-[16px] font-bold text-gray-200 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white">회사소개</Link>
            <Link href="/instructors" className="text-[16px] font-bold text-gray-200 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white">소속강사</Link>
            <Link href="/programs" className="text-[16px] font-bold text-gray-200 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white">강습프로그램</Link>
            <Link href="/inquiries" className="text-[16px] font-bold text-gray-200 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white">예약/문의</Link>
            <Link href="/community" className="text-[16px] font-bold text-gray-200 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white">커뮤니티</Link>
            <Link href="/divingtours" className="text-[16px] font-bold text-gray-200 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white">다이빙투어</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
