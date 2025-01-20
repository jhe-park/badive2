import React from "react";
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { Button } from "@nextui-org/react";

export default function Contents3() {
  return (
    <div className="w-[80vw] h-full flex flex-col items-center justify-center">
      <div className="w-full h-[800px] flex ">
        <div className="w-1/2 h-full flex items-center justify-center py-24">
          <div className="relative w-2/3 h-full">
            <Image
              src={"/program4/contents4_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-y-5">
          <div className="text-2xl">Master Underwater Dance</div>
          <div className="text-[64px] font-bold">마스터 언더워터 댄스(D3)</div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-3xl">최고의 기술로 빚어내는 물속의 걸작</div>
        </div>
      </div>

      <div className="text-6xl font-bold flex w-full justify-center items-center h-screen">준비중</div>

      

      
    </div>
  );
}
