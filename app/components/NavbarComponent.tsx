'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation'; // 상단에 import 추가
import useModalOpen from '@/app/store/useModalOpen';
import { createClient } from '@/utils/supabase/client';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

// Add menu data structure
const menuItems = [
  {
    title: '회사소개',
    href: '/about',
  },
  {
    title: '소속강사',
    href: '/instructors/bdn',
    submenu: [
      { title: 'BADIVE 소속강사', href: '/instructors/bdn' },
      { title: 'BADIVE 메인촬영감독', href: '/instructors/director' },
      { title: 'BADIVE 협력강사', href: '/instructors/partner' },
    ],
  },
  {
    title: '강습프로그램',
    href: '/programs',
    submenu: [
      { title: '스쿠버다이빙', href: '/programs/scuberdiving' },
      { title: '프리다이빙', href: '/programs/freediving' },
      { title: '머메이드', href: '/programs/mermaid' },
      { title: '언더워터 댄스', href: '/programs/underwater' },
    ],
  },
  {
    title: '예약/문의',
    href: '/inquiries',
  },
  {
    title: '커뮤니티',
    href: '/community/notification',
    submenu: [
      { title: '공지사항', href: '/community/notification' },
      { title: '자주하는질문(Q&A)', href: '/community/faq' },
    ],
  },
  {
    title: '다이빙투어',
    href: '/divingtours',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const navRef = useRef(null);
  const { isOpen, setIsOpen } = useModalOpen();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 모바일 메뉴 상태 추가
  const [user, setUser] = useState(null);
  const supabase = createClient();
  const timeoutRef = useRef(null); // 타이머를 위한 ref 추가

  useEffect(function initializer3() {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    // Clean up the subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();

      // 아래 코드는 더이상 유효하지 않음 (deprecated)
      // 참고 : https://github.com/orgs/supabase/discussions/5282
      // authListener?.unsubscribe();
    };
  }, []);

  useEffect(function initializer() {
    // if (typeof window !== 'undefined') {}
    // window 객체 확인 추가
    const handleScrollPosition = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      console.log('Scroll position:', scrollTop);
    };

    window.addEventListener('scroll', handleScrollPosition);

    return () => {
      window.removeEventListener('scroll', handleScrollPosition);
    };
  }, []);

  useEffect(function initializer2() {
    const handleClickOutside = event => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // cleanup을 위한 useEffect 추가
  useEffect(function initializer4() {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(
    function triggerredWhenURLisChanged2() {
      setOpenSubmenu(null);
      setIsMobileMenuOpen(false);
      fetchUser();
    },
    [pathname],
  );

  useEffect(
    function triggerredWhenURLisChanged() {
      // document가 존재하는지 확인
      if (typeof window === 'undefined') {
        return;
      }
      // Only apply hide/show effect on home page
      if (pathname === '/') {
        const navbar = document.querySelector('nav');
        if (navbar) {
          // navbar가 존재하는지 확인
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
        }
      } else {
        // On other pages, always show navbar
        const navbar = document.querySelector('nav');
        if (navbar) {
          // navbar가 존재하는지 확인
          navbar.style.top = '0';
        }
      }
    },
    [pathname],
  );

  const handleSignOut = async () => {
    supabase.auth.signOut();
    setUser(null);
    // 클라이언트 측에서 signOut 호출
    await signOut();
  };

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log('user');
    console.log(user);

    setUser(user);
  };

  const handleMouseEnter = index => {
    // 이전 타이머가 있다면 클리어
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenSubmenu(index);
  };

  const handleMouseLeave = () => {
    // 2초 후에 서브메뉴를 닫음
    timeoutRef.current = setTimeout(() => {
      setOpenSubmenu(null);
    }, 2000);
  };

  // const DO_NOT_SHOW_NAVBAR_WHEN = ['admin', 'expert'];
  if (pathname.includes('admin') || pathname.includes('expert')) {
    return null;
  }

  return (
    <nav
      ref={navRef}
      className={cn('nav fixed z-20 h-[100px] w-full bg-white/80 text-black shadow-lg backdrop-blur-sm', pathname.startsWith('/event/') && 'hidden')}
      style={{
        top: pathname === '/' && !isMobileMenuOpen ? (isOpen ? '-100px' : '0') : '0',
      }}
    >
      <div className="flex h-full w-full justify-between px-4 md:mx-auto md:px-8">
        {/* 로고 영역 */}

        <div className="z-50 flex flex-col items-center justify-center md:pl-4">
          <Link href="/">
            <Image src="/logo/logo.png" alt="Logo" width={80} height={40} className="transition-opacity hover:opacity-80" />
          </Link>
        </div>

        {/* 햄버거 메뉴 버튼 (모바일) */}
        <button className="flex items-center lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg
            className="h-6 w-6 text-black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
          </svg>
        </button>

        {/* 데스크톱 메뉴 */}
        <div className="relative z-50 hidden flex-col items-end justify-center lg:flex">
          {/* 상단 행: 로그인/회원가입/마이페이지 */}
          <div className="flex h-1/3 items-center justify-end gap-6">
            {user ? (
              <>
                <Link
                  href="/mypage"
                  className="relative text-[12px] text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                >
                  마이페이지
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                  }}
                  className="relative text-[12px] text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                >
                  로그아웃
                </button>
              </>
            ) : (
              ['로그인/회원가입'].map((item, index) => (
                <Link
                  key={index}
                  href={`/${item === '로그인/회원가입' ? 'login' : 'register'}`}
                  className="relative text-[12px] text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                >
                  {item}
                </Link>
              ))
            )}
          </div>

          {/* 하단 행: 메인 메뉴 */}
          <div className="flex h-2/3 items-center justify-end gap-x-12">
            {menuItems.map((item, index) => (
              <div key={index} className="relative" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                <Link
                  href={item.href}
                  className="relative text-[16px] font-bold text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                >
                  {item.title}
                </Link>

                {/* 서브메뉴 */}
                {item.submenu && openSubmenu === index && (
                  <div className="pointer-events-auto absolute mt-2 min-w-[200px] rounded-md bg-white/80 py-4 pl-6 shadow-lg backdrop-blur-sm">
                    {item.submenu.map((subitem, subindex) => (
                      <Link key={`${index}-${subindex}`} href={subitem.href} className="block whitespace-nowrap px-4 py-2 text-sm text-black">
                        {subitem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 top-[100px] w-full bg-white/80 backdrop-blur-sm lg:hidden">
            {/* 모바일 로그인 메뉴 */}
            <div className="flex justify-center gap-6 border-b border-gray-500 py-4">
              {user ? (
                <>
                  <Link href="/mypage" className="text-[14px] text-black hover:text-gray-500">
                    마이페이지
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                    }}
                    className="relative text-[12px] text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                // '회원가입'
                ['로그인/회원가입'].map((item, index) => (
                  // text-[14px]
                  <Link key={index} href={`/login`} className="text-[18px] text-black hover:text-gray-500">
                    {item}
                  </Link>
                ))
              )}
            </div>

            {/* 모바일 메인 메뉴 */}
            <div className="py-4 backdrop-blur-lg">
              {menuItems.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between px-6 py-3 text-black">
                    <Link
                      href={item.href}
                      className="flex-1 text-[16px]"
                      onClick={e => {
                        if (item.submenu) {
                          e.preventDefault(); // 서브메뉴가 있는 경우 링크 작동 방지
                          setOpenSubmenu(openSubmenu === index ? null : index); // 서브메뉴 토글
                        }
                      }}
                    >
                      {item.title}
                    </Link>
                    {item.submenu && (
                      <button onClick={() => setOpenSubmenu(openSubmenu === index ? null : index)} className="ml-2">
                        {openSubmenu === index ? '▼' : '▶'}
                      </button>
                    )}
                  </div>

                  {item.submenu && openSubmenu === index && (
                    <div className="bg-white/80 pl-6">
                      {item.submenu.map((subitem, subindex) => (
                        <Link key={`${index}-${subindex}`} href={subitem.href} className="block px-4 py-2 text-[14px] text-black hover:text-gray-500 md:px-8">
                          {subitem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
