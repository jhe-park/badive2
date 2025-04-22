'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Actionbar() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin') || pathname.startsWith('/expert')) {
    return null;
  }

  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setIsVisible(true);
      } else {
        if (window.scrollY >= window.innerHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    if (typeof window !== 'undefined') {
      handleResize();
      handleScroll();

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const CONTENTS = [
    {
      label: '예약',
      url: '/inquiries',
      icon: '/banner/calendar.svg',
    },
    {
      label: '전화문의',
      url: 'tel:02-6953-4432',
      icon: '/banner/phone.svg',
    },
    {
      label: '카카오톡',
      url: 'http://pf.kakao.com/_ClHKn',
      icon: '/banner/kakao.svg',
    },
  ];
  return isVisible || isMobile ? (
    <div className="fade-in fixed bottom-4 right-4 z-50 flex gap-3 rounded-[999px] border border-black bg-[#F2F2F2] px-4 py-2">
      {CONTENTS.map(({ label, url, icon }, index) => (
        <a href={url} key={index} className={`flex flex-col items-center justify-center py-1 text-white md:p-2`}>
          <div>
            <img loading="lazy" src={icon} className="text-sm text-black md:text-2xl" />
          </div>
          <div className="text-[9px] text-black md:text-sm">{label}</div>
        </a>
      ))}
    </div>
  ) : null;
}
