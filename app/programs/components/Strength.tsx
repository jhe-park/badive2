import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

export default function Strength() {
  return (
    <div className="mt-12 flex aspect-[375/678] h-full w-full flex-col items-center justify-between bg-[#BAEBFF] py-12 md:mt-0 md:aspect-[768/655] md:py-6 xl:aspect-[1280/800]">
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-10 text-center text-[24px] font-bold md:gap-y-20 md:text-[64px]">
        <div className="w-full text-center">
          바다이브만의 장점 <span className="text-[#0054CA]">한눈에 보기</span>
        </div>
        <div className="flex aspect-[333/540] w-[90%] flex-col items-center gap-x-6 md:aspect-[717/433] md:flex-row md:justify-between xl:aspect-[948/433] xl:w-[80%]">
          <div className="flex w-full flex-col items-center justify-between gap-y-2 md:w-1/3 md:gap-y-7">
            <div className="flex aspect-[333/100] w-full max-w-[333px] flex-row items-center justify-between rounded-3xl bg-[#4793FF] p-6 text-white md:aspect-[226/200] md:max-w-[226px] md:flex-col xl:aspect-[3/2] xl:max-w-[300px]">
              <div className="flex w-full flex-col items-start justify-start">
                <div className="text-[18px] font-medium xl:text-[20px]">독보적인 강습 프로그램 </div>
                <div className="text-start text-[20px] font-bold md:text-[25px] xl:text-[30px]">교육실습 무조건 3회! </div>
              </div>
              <div className="flex items-center justify-end md:w-full">
                <div className="relative aspect-[75/85] w-[50px] md:w-[65px] xl:w-[75px]">
                  <Image src="/programnew/show1.png" alt="frame" fill />
                </div>
              </div>
            </div>
            <Link
              className="w-full max-w-[333px] md:aspect-[226/200] md:max-w-[226px] xl:aspect-[3/2] xl:max-w-[300px]"
              href="https://www.badive.co.kr/community/notification/52"
            >
              <div className="flex aspect-[333/100] w-full max-w-[333px] flex-row items-center justify-between rounded-3xl bg-[#0053C9] p-6 text-white md:aspect-[226/200] md:max-w-[226px] md:flex-col xl:aspect-[3/2] xl:max-w-[300px]">
                <div className="flex w-full flex-col items-start justify-start">
                  <div className="text-[15px] font-medium md:text-[20px]">가격이 부담된다면 !</div>
                  <div className="text-[20px] font-bold md:text-[30px]">무료클래스 진행 !</div>
                </div>
                <div className="flex w-full items-center justify-end">
                  <HiOutlineArrowNarrowRight className="text-[30px] text-white" />
                </div>
              </div>
            </Link>
          </div>
          <div className="mt-2 flex w-full flex-col items-center justify-between gap-y-7 md:mt-0 md:w-1/3">
            <Link
              className="aspect-[333/100] w-full max-w-[333px] md:aspect-[226/200] md:max-w-[226px] xl:aspect-[3/2] xl:max-w-[300px]"
              href="https://www.badive.co.kr/instructors/bdn"
            >
              <div className="flex aspect-[333/100] w-full max-w-[333px] flex-row items-center justify-between rounded-3xl bg-[#0053C9] p-6 text-white md:aspect-[226/200] md:max-w-[226px] md:flex-col xl:aspect-[3/2] xl:max-w-[300px]">
                <div className="flex w-full flex-col items-start justify-start">
                  <div className="text-[15px] font-medium md:text-[20px]">체계적인 강습</div>
                  <div className="text-[20px] font-bold md:text-[30px]">전문적인 강사들 보유 </div>
                </div>
                <div className="flex items-center justify-end md:w-full">
                  <HiOutlineArrowNarrowRight className="text-[30px] text-white" />
                </div>
              </div>
            </Link>
          </div>
          <Link
            href={'https://www.badive.co.kr/community/notification/50'}
            className="mt-2 flex w-full flex-col items-center justify-between gap-y-2 md:mt-0 md:w-1/3 md:gap-y-7"
          >
            <div className="flex aspect-[333/100] w-full max-w-[333px] flex-row items-center justify-between rounded-3xl bg-[#0053C9] p-6 text-white md:aspect-[226/200] md:max-w-[226px] md:flex-col xl:aspect-[3/2] xl:max-w-[300px]">
              <div className="flex w-full flex-col items-start justify-start">
                <div className="text-[15px] font-medium md:text-[20px]">더욱 나아진 다이빙을 위해</div>
                <div className="text-[20px] font-bold md:text-[30px]">개인연습 수영장 보유</div>
              </div>
              <div className="flex items-center justify-end md:w-full">
                <HiOutlineArrowNarrowRight className="text-[30px] text-white" />
              </div>
            </div>
            <div className="flex aspect-[333/100] w-full max-w-[333px] flex-row items-center justify-between rounded-3xl bg-[#4793FF] p-6 text-white md:aspect-[226/200] md:max-w-[226px] md:flex-col xl:aspect-[3/2] xl:max-w-[300px]">
              <div className="flex w-full flex-col items-start justify-start">
                <div className="text-[15px] font-medium md:text-[20px]">색다른 다이빙 투어 </div>
                <div className="text-[20px] font-bold md:text-[30px]">월 정기투어 진행 !</div>
              </div>
              <div className="flex items-center justify-end md:w-full">
                <div className="relative aspect-[69/78] w-[49px] md:w-[59px] xl:w-[69px]">
                  <Image src="/programnew/show2.png" alt="frame" fill />
                </div>
              </div>
            </div>
          </Link>
          {/* <div className="mt-2 flex w-full flex-col items-center justify-between gap-y-2 md:mt-0 md:w-1/3 md:gap-y-7"></div> */}
        </div>
      </div>
    </div>
  );
}
