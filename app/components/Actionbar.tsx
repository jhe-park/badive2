'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BsTelephoneForward } from 'react-icons/bs';
import { FaChevronUp } from 'react-icons/fa6';
import { MdLocationPin } from 'react-icons/md';
import { PiCertificate } from 'react-icons/pi';
import { RiKakaoTalkFill } from 'react-icons/ri';

export default function Actionbar() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [daysSinceFebFirst, setDaysSinceFebFirst] = useState(0);
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

    const calculateDaysSinceFebFirst = () => {
      const today = new Date();
      const febFirst = new Date(today.getFullYear(), 1, 1); // 2월 1일
      const diffTime = Math.abs((today as any) - (febFirst as any));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysSinceFebFirst(diffDays);
    };

    if (typeof window !== 'undefined') {
      handleResize();
      handleScroll();

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    }

    calculateDaysSinceFebFirst();

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return isVisible || isMobile ? (
    <div className="fade-in fixed bottom-4 right-4 z-50 flex w-[17%] max-w-[100px] flex-col rounded-lg bg-[#F5F5F5] p-2 text-[10px] md:w-[14%] md:text-[20px] xl:w-[8%]">
      {[
        {
          label: '소속강사',
          src: '/floating/license.png',
          url: '/instructors/bdn',
          Icon: PiCertificate,
        },
        {
          label: '예약문의',
          src: '/floating/location.png',
          url: '/inquiries',
          Icon: MdLocationPin,
        },
        {
          label: '전화문의',
          src: '/floating/phone.png',
          url: 'tel:02-6953-4432',
          Icon: BsTelephoneForward,
        },
        {
          label: '카카오상담',
          src: '/floating/kakao.png',
          url: 'http://pf.kakao.com/_ClHKn',
          Icon: RiKakaoTalkFill,
        },
        { label: 'TOP', src: '/floating/top.png', Icon: FaChevronUp },
      ].map(({ label, src, url, Icon }, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center py-1 text-white hover:cursor-pointer md:p-2 ${index !== 4 ? 'border-b border-gray-300' : ''}`}
          onClick={() => {
            if (label === 'TOP') {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            } else {
              router.push(url);
            }
          }}
        >
          <div>
            <Icon className="text-sm text-black md:text-2xl" />
          </div>
          <div className="text-[9px] text-black md:text-sm">{label}</div>
        </div>
      ))}
      <div style={{ fontFamily: 'Freesentation-9Black' }} className="h-full w-full rounded-md bg-black text-lg md:p-2">
        <p className="blink text-center text-sm font-bold text-white md:text-2xl">{daysSinceFebFirst}일</p>
        <p className="text-center text-sm font-bold text-white md:text-2xl">
          <span className="font-bold text-red-500">無</span>사고
        </p>{' '}
      </div>
    </div>
  ) : null;
}
