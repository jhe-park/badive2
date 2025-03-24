'use client'
import React, { useState, useEffect } from "react";
import { PiCertificate } from "react-icons/pi";
import { MdLocationPin } from "react-icons/md";
import { BsTelephoneForward } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaChevronUp } from "react-icons/fa6";
import { Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
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
      const diffTime = Math.abs(today - febFirst);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysSinceFebFirst(diffDays);
    };

    if (typeof window !== "undefined") {
      handleResize();
      handleScroll();
      
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
    }

    calculateDaysSinceFebFirst();

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (isVisible || isMobile) ? (
    <div className="fixed right-4 bottom-4 flex flex-col bg-[#F5F5F5] rounded-lg p-2 fade-in z-50 xl:w-[8%] max-w-[100px] md:w-[14%] w-[17%] md:text-[20px] text-[10px]">
      {[
        {
          label: "소속강사",
          src: "/floating/license.png",
          url:"/instructors/bdn",
          Icon: PiCertificate,
        },
        {
          label: "예약문의",
          src: "/floating/location.png",
          url:"/inquiries",
          Icon: MdLocationPin,
        },
        {
          label: "전화문의",
          src: "/floating/phone.png",
          url:"tel:02-6953-4432",
          Icon: BsTelephoneForward,

        },
        {
          label: "카카오상담",
          src: "/floating/kakao.png",
          url:"http://pf.kakao.com/_ClHKn",
          Icon: RiKakaoTalkFill,
        },
        { label: "TOP", src: "/floating/top.png", Icon: FaChevronUp },
      ].map(({ label, src, url, Icon }, index) => (
        <div
          key={index}
          className={`text-white md:p-2 py-1 flex flex-col items-center justify-center hover:cursor-pointer ${
            index !== 4 ? "border-b border-gray-300" : ""
          }`}
          onClick={() => {
            if (label === "TOP") {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            } else {
              router.push(url);
            }
          }}
        >
          <div>
            <Icon className="text-black md:text-2xl text-sm" />
          </div>
          <div className="text-black text-[9px] md:text-sm">{label}</div>
        </div>
      ))}
      <div style={{ fontFamily: 'Freesentation-9Black' }} className="w-full h-full bg-black text-lg rounded-md md:p-2">
        <p className="font-bold text-sm md:text-2xl text-white text-center blink">{daysSinceFebFirst}일</p>
        <p className="text-white text-center text-sm md:text-2xl font-bold">
          <span className="text-red-500 font-bold">無</span>사고
        </p>{" "}
      </div>
    </div>
  ) : null;
}
