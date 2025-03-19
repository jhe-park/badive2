import Image from "next/image";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export default function Strength() {
  return (
    <div className="w-full bg-[#BAEBFF] h-full xl:aspect-[1280/800] md:aspect-[768/655] aspect-[375/678] flex justify-between items-center flex-col mt-12 md:mt-0 py-12 md:py-6">
        <div className="w-full flex flex-col items-center justify-center h-full font-bold text-[24px] md:text-[64px] text-center gap-y-10 md:gap-y-20">
          <div className="text-center w-full">
            바다이브만의 장점{" "}
            <span className="text-[#0054CA]">한눈에 보기</span>
          </div>
          <div className="xl:w-[80%] w-[90%] xl:aspect-[948/433] md:aspect-[717/433] aspect-[333/540] flex flex-col md:flex-row items-center md:justify-between gap-x-6">
            <div className="w-full md:w-1/3 flex flex-col items-center justify-between gap-y-2 md:gap-y-7">
              <div className="flex md:flex-col flex-row items-center justify-between text-white bg-[#4793FF] w-full xl:aspect-[3/2] md:aspect-[226/200] aspect-[333/100] rounded-3xl p-6 xl:max-w-[300px] md:max-w-[226px] max-w-[333px]">
                <div className="flex  flex-col items-start justify-start w-full">
                  <div className="text-[18px] xl:text-[20px] font-medium">
                    독보적인 강습 프로그램{" "}
                  </div>
                  <div className="text-[20px] md:text-[25px] xl:text-[30px] font-bold text-start">
                    교육실습 무조건 3회!{" "}
                  </div>
                </div>
                <div className="flex items-center justify-end md:w-full">
                  <div className="w-[50px] md:w-[65px] xl:w-[75px] aspect-[75/85] relative">
                    <Image src="/programnew/show1.png" alt="frame" fill />
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col flex-row items-center justify-between text-white bg-[#0053C9] w-full xl:aspect-[3/2] md:aspect-[226/200] aspect-[333/100] rounded-3xl p-6 xl:max-w-[300px] md:max-w-[226px] max-w-[333px]">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="text-[15px] md:text-[20px] font-medium">
                    가격이 부담된다면 !
                  </div>
                  <div className="text-[20px] md:text-[30px] font-bold">
                    무료클래스 진행 !
                  </div>
                </div>
                <div className="flex  items-center justify-end w-full">
                  <HiOutlineArrowNarrowRight className="text-white text-[30px] " />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col items-center justify-between gap-y-7  mt-2 md:mt-0">
              <div className="flex md:flex-col flex-row items-center justify-between text-white bg-[#0053C9] w-full xl:aspect-[3/2] md:aspect-[226/200] aspect-[333/100] rounded-3xl p-6 xl:max-w-[300px] md:max-w-[226px] max-w-[333px]">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="text-[15px] md:text-[20px] font-medium">
                    체계적인 강습
                  </div>
                  <div className="text-[20px] md:text-[30px] font-bold">
                    전문적인 강사들 보유{" "}
                  </div>
                </div>
                <div className="flex  items-center justify-end md:w-full">
                  <HiOutlineArrowNarrowRight className="text-white text-[30px] " />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col items-center justify-between gap-y-2 md:gap-y-7 mt-2 md:mt-0">
              <div className="flex md:flex-col flex-row items-center justify-between text-white bg-[#0053C9] w-full xl:aspect-[3/2] md:aspect-[226/200] aspect-[333/100] rounded-3xl p-6 xl:max-w-[300px] md:max-w-[226px] max-w-[333px]">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="text-[15px] md:text-[20px] font-medium">
                    더욱 나아진 다이빙을 위해
                  </div>
                  <div className="text-[20px] md:text-[30px] font-bold">
                    개인연습 수영장 보유
                  </div>
                </div>
                <div className="flex  items-center justify-end md:w-full">
                  <HiOutlineArrowNarrowRight className="text-white text-[30px] " />
                </div>
              </div>
              <div className="flex md:flex-col flex-row items-center justify-between text-white bg-[#4793FF] w-full xl:aspect-[3/2] md:aspect-[226/200] aspect-[333/100] rounded-3xl p-6 xl:max-w-[300px] md:max-w-[226px] max-w-[333px]">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="text-[15px] md:text-[20px] font-medium">
                    색다른 다이빙 투어{" "}
                  </div>
                  <div className="text-[20px] md:text-[30px] font-bold">
                    월 정기투어 진행 !
                  </div>
                </div>
                <div className="flex  items-center justify-end md:w-full">
                  <div className="xl:w-[69px] md:w-[59px] w-[49px] aspect-[69/78] relative">
                    <Image src="/programnew/show2.png" alt="frame" fill />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
