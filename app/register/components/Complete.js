import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
export default function Complete() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-6">
      <FaCheckCircle className="text-[100px] text-[#0077B6]"></FaCheckCircle>{" "}
      <div className="text-5xl font-bold">가입을 축하합니다!</div>
      <div className="text-xl">
        가입을 축하드립니다. 로그인 후, BDN의 다양한 서비스를 이용하실 수
        있습니다.
      </div>
      <Link href="/login" className="text-xl font-bold text-[#0077B6]">
        로그인 페이지로 이동
      </Link>
    </div>
  );
}
