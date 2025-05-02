import React from 'react';
import Image from 'next/image';
import { Divider } from '@nextui-org/react';
import RegionTabs from './components/RegionTabs';
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="relative mt-[100px] h-[30vh] w-full md:h-[600px]">
        <Image src="/about/topbanner.png" alt="about_banner" className="h-full w-full object-contain" fill />
        <div className="absolute bottom-[2vh] left-[2vw] flex flex-col items-start justify-center md:gap-y-6">
          {/* text-medium */}
          <div className="text-[24px] font-bold md:text-[32px] xl:text-[48px]">BADIVE,</div>
          <div className="text-[16px] md:text-[24px] xl:text-[32px]">스쿠버다이빙, 프리다이빙, 머메이드 </div>
          <div className="text-[16px] md:text-[24px] xl:text-[32px]">라이센스 및 강사교육을 하는 전문 교육기관 </div>
        </div>
      </div>
      <div className="flex aspect-[1280/128] w-full max-w-[1280px] items-center justify-center text-center text-[25px] font-bold md:text-[30px] xl:text-[40px]">
        "Professionals with Years of Diving Experience
      </div>
      <div className="flex aspect-[375/557] w-full flex-col items-center justify-evenly gap-y-5 md:aspect-[768/645] md:max-w-[1280px] xl:aspect-[1280/868]">
        {' '}
        <div className="mt-6 text-[25px] md:text-[30px]">BA DIVE</div>
        <div className="text-[20px] font-bold md:text-[30px] xl:text-[40px]">국내 상위 1% 다이빙 강사진</div>
        <Divider className="w-full max-w-[238px] bg-black md:max-w-[355px] xl:max-w-[491px]"></Divider>
        <div className="flex w-full flex-col items-center justify-center text-[16px] md:text-[18px] xl:text-[20px]">
          <p className="text-center">
            “BADIVE 다이빙 강사진들은 수천회의 다이빙
            <br className="md:hidden" /> 경험과 다양한 다이빙 환경에서의
            <br className="" /> 실전 경험을 바탕으로,
          </p>
          <p className="text-center">
            초보강습부터 강사 라이센스 교육까지 체계적인
            <br className="md:hidden" />
            교육시스템을 제공합니다.”{' '}
          </p>
        </div>
        <div className="relative mt-6 hidden aspect-[375/247] w-full max-w-[1280px] items-center justify-center md:mt-12 md:flex md:aspect-[768/347] xl:mt-16 xl:aspect-[1280/500]">
          <Image src="/about/aboutTopPC.png" alt="about1" fill className="fill" />
        </div>
        <div className="relative mt-6 flex aspect-[375/247] w-full items-center justify-center md:mt-12 md:hidden xl:mt-16">
          <Image src="/about/aboutTopMobile.png" alt="about1" fill className="fill" />
        </div>
      </div>
      <div className="mt-6 flex aspect-[375/250] w-full flex-col items-center justify-evenly md:mt-12 md:aspect-[768/234] md:max-w-[1280px] xl:mt-16 xl:aspect-[1280/220]">
        <h1 className="text-center text-2xl font-bold md:px-10 md:text-[40px]">전국 지역 다이빙 강습 가능</h1>
        <div className="mt-5 text-center md:px-10">
          <p className="text-medium md:text-[18px]">“BADIVE는 대한민국 어디서든 다이빙을 배울 수 있는 기회를 제공합니다.</p>
          <p className="text-medium md:text-[18px]">각 지역 원하는 장소에서 강사진들을 통해 체계적이고</p>
          <p className="text-medium md:text-[18px]">안전한 다이빙 강습을 운영하고 있으며, 초보자에게는 기초부터 탄탄하게,</p>
          <p className="text-medium md:text-[18px]">경험자에게는 심화 과정을 통해 수준을 높힐 수 있는 맞춤형 강습을 제공합니다.“</p>
        </div>
      </div>
      <div className="items-cente flex h-full w-full max-w-[1280px] justify-center md:mt-12 md:aspect-square">
        <RegionTabs></RegionTabs>
      </div>

      <div className="mt-6 flex aspect-[375/747] w-full flex-col items-start justify-evenly md:mb-24 md:mt-12 md:aspect-[768/531] md:max-w-[1280px] xl:mt-16 xl:aspect-[1280/652]">
        <div className="w-full text-center text-[30px] md:text-[40px]">
          깊은 바다로 떠나는
          <br className="md:hidden" /> 잊을 수 없는 여행
        </div>
        <div className="mt-4 flex h-full w-full flex-col items-center justify-center md:mt-12 md:h-[540px] md:flex-row">
          <div className="grid h-full w-full grid-cols-4 gap-0 md:w-1/2">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="relative h-full w-full p-0">
                <Image src={`/about/tour${index + 1}.png`} alt={`tour_image_${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="flex h-full w-full flex-col items-start justify-center gap-4 gap-y-4 p-4 px-[1vw] md:w-1/2 md:gap-y-12 md:px-[2vw]">
            <div className="w-full text-center text-[28px] font-bold xl:text-[35px]" style={{ lineHeight: '1.5' }}>
              Safe dives, Enjoy Diving!
            </div>
            {/* text-medium */}
            <div className="text-center text-[14px] md:text-[18px] xl:text-[20px]" style={{ lineHeight: '1.5' }}>
              “BADIVE는 국내, 국외 다이빙 투어를 위해 쾌적하고 안전한 다이브 리조트들과의 MOU를 체결하여 많은 다이버 회원분들에게 특별한 경험을 제공하고자
              노력하고 있습니다. “
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
