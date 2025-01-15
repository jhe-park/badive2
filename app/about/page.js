import React from "react";
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import RegionTabs from "./components/RegionTabs";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="w-full h-[600px] mt-[100px] relative">
        <Image
          src="/about/topbanner.png"
          alt="about_banner"
          className="object-contain w-full h-full"
          fill
        />
        <div className="absolute bottom-[2vh] left-[2vw]">
          <p className="text-[48px] font-bold">BDN DIVE,</p>
          <p className="text-[32px] ">스쿠버다이빙, 프리다이빙, 머메이드 </p>
          <p className="text-[32px] ">
            라이센스 및 강사교육을 하는 전문 교육기관{" "}
          </p>
        </div>
      </div>
      <div className="w-full h-[1314px] flex flex-col justify-center items-center gap-y-5 py-6">
        <h1 className="w-full font-bold text-[50px] text-center mb-5">
          "Professionals with Years of Diving Experience
        </h1>
        <div className="h-full  flex items-center w-[75vw] justify-center">
          <div className="w-1/4 h-full flex flex-col">
            <div className="w-full h-1/4 relative">
              <Image
                src="/about/banner2_1.png"
                alt="about1"
                fill
                className="object-fill"
              />
            </div>
            <div className="w-full h-1/4 relative">
              <Image
                src="/about/banner2_2.png"
                alt="about2"
                fill
                className="object-fill"
              />
            </div>
          </div>
          <div className="w-1/4 h-full flex flex-col justify-start items-center">
            <div className="w-full h-1/4 relative flex flex-col justify-center items-center px-5 overflow-hidden">
              <p className="text-3xl ">BDN</p>
              <p className="text-3xl ">DIVE</p>
              <p className="text-4xl font-bold">국내 상위1%</p>
              <p className="text-4xl font-bold">다이빙 강사진</p>
            </div>
            <Divider className="w-4/5"></Divider>
            <div className="w-4/5 h-1/4 relative border-b-2 border-black px-2 text-xl justify-center items-center flex flex-col overflow-hidden">
              <p className="text-center line-clamp-6">
                “BDN 다이빙 강사진들은 수천회의 다이빙 경험과 다양한 다이빙
                환경에서의 실전 경험을 바탕으로, 초보강습부터 강사 라이센스
                교육까지 체계적인 교육시스템을 제공합니다. 어떠한 상황에서도
                안전하고 즐거운 다이빙을 즐기실 수 있도록 여러분들에게 최고의
                다이빙 경험을 선사하겠습니다. ”
              </p>
            </div>
            <div className="w-full h-1/4 relative">
              <Image
                src="/about/banner2_3.png"
                alt="about5"
                fill
                className="object-fill"
              />
            </div>
          </div>
          <div className="w-1/4 h-full ">
            <div className="w-full h-1/4 relative">
              <Image
                src="/about/banner2_4.png"
                alt="about4"
                fill
                className="object-fill"
              />
            </div>
            <div className="w-full h-1/3 relative">
              <Image
                src="/about/banner2_5.png"
                alt="about5"
                fill
                className="object-fill"
              />
            </div>
            <div className="w-full h-1/3 relative">
              <Image
                src="/about/banner2_6.png"
                alt="about6"
                fill
                className="object-fill"
              />
            </div>
          </div>
          <div className="w-1/4 h-full ">
            <div className="w-full h-1/5 "></div>
            <div className="w-full h-1/4 relative">
              <Image
                src="/about/banner2_7.png"
                alt="about8"
                fill
                className="object-fill"
              />
            </div>
            <div className="w-full h-1/4 relative">
              <Image
                src="/about/banner2_8.png"
                alt="about9"
                fill
                className="object-fill"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1212px] p-10 flex flex-col">
        <h1 className="text-5xl font-bold">전국 지역 다이빙 강습 가능</h1>
        <div className="mt-5">
          <p className="text-xl">
            “BDN은 대한민국 어디서든 다이빙을 배울 수 있는 기회를 제공합니다.
          </p>
          <p className="text-xl">
            각 지역 원하는 장소에서 강사진들을 통해 체계적이고 안전한 다이빙
          </p>
          <p className="text-xl">
            강습을 운영하고 있으며, 초보자에게는 기초부터 탄탄하게, 경험자에게는
          </p>
          <p className="text-xl">
            심화 과정을 통해 수준을 높힐 수 있는 맞춤형 강습을 제공합니다. “
          </p>
        </div>
        <div className="w-full h-full flex justify-center items-cente mt-12">
          <RegionTabs></RegionTabs>
        </div>
      </div>
      <div className="w-full h-[1000px] p-10 flex flex-col justify-center items-start">
        <h1 className="text-5xl font-bold">
          깊은 바다로 떠나는 잊을 수 없는 여행
        </h1>
        <div className="w-full h-[540px] flex justify-center items-center mt-12 px-[5vw] ">
          <div className="w-1/2 h-full grid grid-cols-4 gap-0">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="relative w-full h-full p-0">
                <Image
                  src={`/about/tour${index + 1}.png`}
                  alt={`tour_image_${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="w-1/2 h-full flex flex-col gap-4 p-4 justify-center items-start px-[5vw]">
            <h1 className="text-[55px] font-bold">Safe dives, Enjoy Diving!</h1>
            <p className="text-[30px]">
              “BDN은 국내, 국외 다이빙 투어를 위해 쾌적하고 안전한 다이브
              리조트들과의 MOU를 체결하여 많은 다이버 회원분들에게 특별한 경험을
              제공하고자 노력하고 있습니다. “
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
