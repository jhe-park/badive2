'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from 'next/navigation';  // 상단에 import 추가
import useModalOpen from '@/app/store/useModalOpen';
export default function Navbar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const navRef = useRef(null);
  const { isOpen, setIsOpen } = useModalOpen();

  // Add menu data structure
  const menuItems = [
    {
      title: "회사소개",
      href: "/about"
    },
    {
      title: "소속강사",
      href: "/instructors",
      submenu: [
        { title: "BADIVE 소속강사", href: "/instructors/bdn" },
        { title: "BADIVE 메인촬영감독", href: "/instructors/director" },
        { title: "BADIVE 협력강사", href: "/instructors/partner" }
      ]
    },
    {
      title: "강습프로그램",
      href: "/programs",
      submenu: [
        { title: "스쿠버다이빙", href: "/programs/scuberdiving" },
        { title: "프리다이빙", href: "/programs/freediving" },
        { title: "머메이드", href: "/programs/mermaid" },
        { title: "언더워터 댄스", href: "/programs/underwater" }
      ]
    },
    {
      title: "예약/문의",
      href: "/inquiries"
    },
    {
      title: "커뮤니티",
      href: "/community",
      submenu: [
        { title: "공지사항", href: "/community/notification" },
        { title: "자주하는질문(Q&A)", href: "/community/faq" }
      ]
    },
    {
      title: "다이빙투어",
      href: "/divingtours"
    }
  ];

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav ref={navRef} className="nav w-full fixed z-5 bg-black/95 backdrop-blur-sm h-[100px] shadow-lg" style={{ top: isOpen ? '-100px' : '0' }}>
      <div className="w-full px-8 flex justify-between h-full mx-auto">
        {/* 로고 영역 */}
        <div className="flex items-center justify-center flex-col pl-4">
          <Link href="/">
            <Image src="/logo/logo.png" alt="Logo" width={80} height={40} className="hover:opacity-80 transition-opacity" />
          </Link>
        </div>

        {/* 우측 메뉴 영역 */}
        <div className="flex flex-col items-end justify-center relative">
          {/* 상단 행: 로그인/회원가입/마이페이지 */}
          <div className="flex h-1/3 gap-6 justify-end items-center">
            {["로그인", "회원가입", "마이페이지"].map((item, index) => (
              <Link 
                key={index}
                href={`/${item === "로그인" ? "login" : item === "회원가입" ? "register" : "mypage"}`}
                className="text-[12px] text-black relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-gray-500"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* 하단 행: 메인 메뉴 */}
          <div className="flex h-2/3 justify-end items-center gap-x-12">
            {menuItems.map((item, index) => (
              <div 
                key={index} 
                className="relative"
                onMouseEnter={() => setOpenSubmenu(index)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <Link 
                  href={item.href}
                  className="text-[16px] font-bold text-black relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 after:delay-1000 hover:after:w-full hover:text-gray-500"
                >
                  {item.title}
                </Link>

                {/* 통합 서브메뉴 패널 */}
                {item.submenu && openSubmenu === index && (
                  <div className="absolute bg-black/95 backdrop-blur-sm mt-2 py-4 rounded-md shadow-lg min-w-[200px] pointer-events-auto">
                    {item.submenu.map((subitem, subindex) => (
                      <Link 
                        key={`${index}-${subindex}`}
                        href={subitem.href}
                        className="block text-sm text-gray-200 hover:text-white hover:bg-gray-800 py-2 px-4 whitespace-nowrap"
                      >
                        {subitem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
