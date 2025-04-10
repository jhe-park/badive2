import React from "react";
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import RegionTabs from "./components/RegionTabs";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="w-full h-[30vh] md:h-[600px] mt-[100px] relative">
        <Image
          src="/about/topbanner.png"
          alt="about_banner"
          className="object-contain w-full h-full"
          fill
        />
        <div className="absolute bottom-[2vh] left-[2vw] flex flex-col justify-center items-start md:gap-y-6">
          <div className="text-medium  xl:text-[48px] md:text-[32px] text-[24px] font-bold">
            BADIVE,
          </div>
          <div className="xl:text-[32px] md:text-[24px] text-[16px] ">
            스쿠버다이빙, 프리다이빙, 머메이드{" "}
          </div>
          <div className=" xl:text-[32px] md:text-[24px] text-[16px] ">
            라이센스 및 강사교육을 하는 전문 교육기관{" "}
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1280px] font-bold  xl:text-[40px] md:text-[30px] text-[25px] text-center aspect-[1280/128] flex items-center justify-center">
        "Professionals with Years of Diving Experience
      </div>
      <div className="w-full md:max-w-[1280px] xl:aspect-[1280/868] md:aspect-[768/645] aspect-[375/557] flex flex-col justify-evenly items-center gap-y-5">
        {" "}
        <div className="text-[25px] md:text-[30px] mt-6">BA DIVE</div>
        <div className="text-[20px] xl:text-[40px] md:text-[30px] font-bold ">
          국내 상위 1% 다이빙 강사진
        </div>
        <Divider className="w-full xl:max-w-[491px] md:max-w-[355px] max-w-[238px] bg-black"></Divider>
        <div className="text-[16px] md:text-[18px] xl:text-[20px] w-full flex flex-col justify-center items-center">
          <p className="text-center">
            “BADIVE 다이빙 강사진들은 수천회의 다이빙
            <br className="md:hidden" /> 경험과 다양한 다이빙 환경에서의
            <br className="" /> 실전 경험을 바탕으로,
          </p>
          <p className="text-center">
            초보강습부터 강사 라이센스 교육까지 체계적인
            <br className="md:hidden" />
            교육시스템을 제공합니다.”{" "}
          </p>
        </div>
        <div className="hidden md:flex max-w-[1280px] xl:aspect-[1280/500] md:aspect-[768/347] aspect-[375/247] w-full items-center justify-center relative xl:mt-16 md:mt-12 mt-6 ">
          <Image
            src="/about/aboutTopPC.png"
            alt="about1"
            fill
            className="fill"
          />
        </div>
        <div className=" md:hidden aspect-[375/247] w-full flex items-center justify-center relative xl:mt-16 md:mt-12 mt-6 ">
          <Image
            src="/about/aboutTopMobile.png"
            alt="about1"
            fill
            className="fill"
          />
        </div>
      </div>
      <div className="w-full md:max-w-[1280px] xl:aspect-[1280/220] md:aspect-[768/234] aspect-[375/250] flex flex-col justify-evenly items-center xl:mt-16 md:mt-12 mt-6">
        <h1 className="text-2xl md:text-[40px] font-bold md:px-10 text-center">
          전국 지역 다이빙 강습 가능
        </h1>
        <div className="mt-5 md:px-10 text-center">
          <p className="text-medium md:text-[18px]">
            “BDN은 대한민국 어디서든 다이빙을 배울 수 있는 기회를 제공합니다.
          </p>
          <p className="text-medium md:text-[18px]">
            각 지역 원하는 장소에서 강사진들을 통해 체계적이고 
          </p>
          <p className="text-medium md:text-[18px]">
          안전한 다이빙 강습을 운영하고 있으며, 초보자에게는 기초부터 탄탄하게,
          </p>
          <p className="text-medium md:text-[18px]">
          경험자에게는 심화 과정을 통해 수준을 높힐 수 있는 맞춤형 강습을 제공합니다.“
          </p>
        </div>
      </div>
      <div className="w-full max-w-[1280px] md:aspect-square  h-full flex justify-center items-cente md:mt-12">
        <RegionTabs></RegionTabs>
      </div>

      <div className="w-full md:max-w-[1280px] xl:aspect-[1280/652] md:aspect-[768/531] aspect-[375/747] flex flex-col justify-evenly items-start md:mb-24 xl:mt-16 md:mt-12 mt-6">
        <div className="text-[30px] md:text-[40px] text-center w-full">
          깊은 바다로 떠나는<br className="md:hidden" /> 잊을 수 없는 여행
        </div>
        <div className="w-full h-full md:h-[540px] flex flex-col md:flex-row justify-center items-center mt-4 md:mt-12 ">
          <div className="w-full md:w-1/2 h-full grid grid-cols-4 gap-0">
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
          <div className="w-full md:w-1/2 h-full flex flex-col gap-4 p-4 justify-center items-start px-[1vw] md:px-[2vw] gap-y-4 md:gap-y-12">
            <div
              className="text-[28px] xl:text-[35px] font-bold text-center w-full"
              style={{ lineHeight: "1.5" }}
            >
              Safe dives, Enjoy Diving!
            </div>
            <div
              className="text-medium xl:text-[20px] md:text-[18px] text-[14px] text-center "
              style={{ lineHeight: "1.5" }}
            >
              “BDN은 국내, 국외 다이빙 투어를 위해 쾌적하고 안전한 다이브
              리조트들과의 MOU를 체결하여 많은 다이버 회원분들에게 특별한 경험을
              제공하고자 노력하고 있습니다. “
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
