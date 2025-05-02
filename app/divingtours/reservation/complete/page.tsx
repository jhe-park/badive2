import Link from 'next/link';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function page() {
  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center gap-y-6">
      <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center gap-y-12 text-4xl font-bold">
        <FaCheckCircle className="animate-scale-fade-in text-[100px] text-[#0077B6]"></FaCheckCircle>

        <div className="text-2xl font-bold">신청이 완료되었습니다.</div>
        <div className="text-center text-lg">예약 내역은 마이페이지에서 확인할 수 있습니다.</div>

        <Link className="text-2xl font-bold text-[#0077B6]" href="/">
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
