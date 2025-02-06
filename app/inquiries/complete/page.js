import React from "react";
import Image from "next/image";
import { Divider } from "@heroui/react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px] gap-y-6">
      <div className="text-4xl font-bold w-full h-[calc(100vh-100px)] flex flex-col justify-center items-center gap-y-12">
        <FaCheckCircle 
          className="text-[100px] text-[#0077B6] animate-scale-fade-in"
        ></FaCheckCircle>

        <div className="text-2xl font-bold">강습프로그램 결제가 완료되었습니다.</div>
        <div className="text-lg text-center">
        <p>예약하신 강습프로그램 내역은 마이페이지에서 확인 가능하며,</p>
        <p>예약환불은 환불 규정에 따라 진행됩니다. (교육일정 변경은 교육 시작일로부터 4일전까지만 가능)</p>
        <p>궁금하신 점은 언제든지 전화, 카카오톡으로 문의 부탁드립니다.</p>
         
  

        </div>
        <Link className="text-2xl font-bold text-[#0077B6]" href="/">
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
