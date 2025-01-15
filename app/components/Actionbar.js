'use client'
import React, { useState, useEffect } from "react";
import { PiCertificate } from "react-icons/pi";
import { MdLocationPin } from "react-icons/md";
import { BsTelephoneForward } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaChevronUp } from "react-icons/fa6";
import { Divider } from "@nextui-org/react";

export default function Actionbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isVisible ? (
    <div className="fixed right-4 bottom-4 flex flex-col bg-[#F5F5F5] rounded-lg p-2 fade-in">
      {[
        {
          label: "소속강사",
          src: "/floating/license.png",
          Icon: PiCertificate,
        },
        {
          label: "다이빙투어",
          src: "/floating/location.png",
          Icon: MdLocationPin,
        },
        {
          label: "전화문의",
          src: "/floating/phone.png",
          Icon: BsTelephoneForward,
        },
        {
          label: "카카오상담",
          src: "/floating/kakao.png",
          Icon: RiKakaoTalkFill,
        },
        { label: "TOP", src: "/floating/top.png", Icon: FaChevronUp },
      ].map(({ label, src, Icon }, index) => (
        <div
          key={index}
          className={`text-white p-2 flex flex-col items-center justify-center ${
            index !== 4 ? "border-b border-gray-300" : ""
          }`}
        >
          <div>
            <Icon className="text-black text-2xl" />
          </div>
          <div className="text-black text-xs">{label}</div>
        </div>
      ))}
      <div className="w-full h-full bg-black text-lg rounded-md p-2">
        <p className="font-bold text-2xl text-white text-center blink">100일</p>
        <p className="text-white text-center text-2xl font-bold">
          <span className="text-red-500 font-bold">無</span>사고
        </p>{" "}
      </div>
    </div>
  ) : null;
}
