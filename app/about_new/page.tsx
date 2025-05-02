'use client';

import ImgBackgroundInAboutPage from '@/public/about_new/background_in_about_page.webp';
import ImgBadiveDescription from '@/public/about_new/badive_description_img.webp';
import ImgKoreanMapWithoutPoint from '@/public/about_new/korean_map_without_point.webp';
import ImgLogoBanner from '@/public/about_new/logo_banner.webp';
import Pin from '@/public/about_new/pin.webp';
import PinActivated from '@/public/about_new/pin_activated.webp';
import { CountUp } from 'countup.js';
import { type NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ImgAndDescription } from '../components/ImgAndDescription';
import { useTextAnimation, useTextAnimationV2 } from '@/hooks/useAnimation';
import { TextFadeInAnimation } from '../components/TextFadeInAnimation';

type TLocation = '인천' | '서울' | '경기' | '대구' | '부산';

const instructorArr = [
  { instructorName: '김일남 트레이너', imgSrc: 'about_new/instructor_kin.webp', location: ['인천'] },
  { instructorName: '이세원 강사', imgSrc: 'about_new/instructor_lsw.webp', location: ['인천'] },
  { instructorName: '이지연강사', imgSrc: 'about_new/instructor_ljy.webp', location: ['서울', '경기'] },
  { instructorName: '정은지 강사', imgSrc: 'about_new/instructor_jwj.webp', location: ['서울', '경기'] },
  { instructorName: '고송미강사', imgSrc: 'about_new/instructor_ksm.webp', location: ['대구', '부산'] },
  { instructorName: '이도경강사', imgSrc: 'about_new/instructor_ldg.webp', location: ['대구'] },
  { instructorName: '김규리 강사', imgSrc: 'about_new/instructor_kgr.webp', location: ['부산'] },
];

const PageForAbout: NextPage<NextPageProps> = ({}) => {
  const [currentLocation, setCurrentLocation] = useState<TLocation | undefined>();
  const [isMapAlreadyMoved, setIsMapAlreadyMoved] = useState(false);

  const { containerRef: containerRefForImage } = useTextAnimationV2({ direction: 'UP', delay: 0 });
  const { containerRef: containerRefForText } = useTextAnimationV2({ direction: 'UP', delay: 0.3 });
  const { containerRef: containerRefForText2 } = useTextAnimationV2({ direction: 'UP', delay: 0.3 * 3 });

  const refForCounterElement = useRef<HTMLSpanElement>(null);

  const changeLocation = (location: TLocation) => {
    setCurrentLocation(location);
  };

  const selectedInstructorArr = instructorArr.filter(instructor => instructor.location.includes(currentLocation));

  useEffect(() => {
    const options = {
      // root: document.querySelector('#scrollArea'),
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(countUp, options);
    observer.observe(refForCounterElement.current);

    function countUp() {
      const countUp = new CountUp('count-up', 1000, {
        duration: 3,
      });
      countUp.start();
    }
  }, []);

  return (
    <div className="min-h-screen md:pt-32">
      <div className="text-center">
        <div className="font-freesentation800 animate-fade-in-up pt-32 text-[76px] sm:text-[76px] md:pt-0 md:text-[76px]">BADIVE</div>
        {/* translate-y-6 opacity-0 transition-all delay-1000 duration-500 ease-out */}
        <div
          style={{
            animationDelay: '0.5s',
            transform: 'translateY(100px)',
            opacity: 0,
          }}
          className="animate-fade-in-up pt-12 font-freesentation500 text-[20px] transition-all sm:text-[35px] md:pt-24 md:text-[45px]"
        >
          <div className="">스쿠버다이빙, 프리다이빙, 머메이드, 언더워터댄스 </div>
          <div className="">라이센스 및 강사교육을 하는 전문 교육기관</div>
        </div>
      </div>
      <div className="py-24 sm:py-24 md:py-24">
        <Image src={ImgLogoBanner} alt="BADIVE 로고" />
      </div>
      <div className="flex w-full justify-center pb-36">
        <div className="flex max-w-[1280px] flex-col-reverse justify-center gap-6 md:flex-row md:gap-12">
          <div className="flex flex-col text-center md:flex-[2] md:text-left">
            <TextFadeInAnimation direction="UP">
              <div
                style={{
                  letterSpacing: '1.5rem',
                }}
                className="font-freesentation800 pb-12 text-[45px] sm:text-[55px] md:pt-12 md:text-[76px]"
              >
                BADIVE
              </div>
            </TextFadeInAnimation>
            <div
              style={{
                lineHeight: '1.8',
              }}
              className="flex flex-col font-freesentation500 text-[16px] sm:text-[25px] md:text-[30px]"
            >
              <TextFadeInAnimation direction="RIGHT" delay={0.3 * 1}>
                <div className="">바다이브는 푸른바다와 다이빙의 설렘을 담은 브랜드입니다.</div>
              </TextFadeInAnimation>
              <TextFadeInAnimation direction="LEFT" delay={0.3 * 2}>
                <div className="">
                  <span className="font-bold text-[#004EA2]">바다와 다이브의 합성어</span>로, 바다 속 깊은 곳까지
                </div>
              </TextFadeInAnimation>
              <TextFadeInAnimation direction="RIGHT" delay={0.3 * 3}>
                <div className="">자유롭게 탐험하는 즐거움을 의미합니다. </div>
              </TextFadeInAnimation>
              <TextFadeInAnimation direction="LEFT" delay={0.3 * 4}>
                <div className="">바다이브는 다이빙의 설렘과 해양의 아름다움을 전하는 최고의 경험을 제공하며,</div>
              </TextFadeInAnimation>
              <TextFadeInAnimation direction="RIGHT" delay={0.3 * 5}>
                <div className="">전문적인 기술력과 노하우로 누구나 바다를 더 가깝고 안전하게</div>
              </TextFadeInAnimation>
              <TextFadeInAnimation direction="LEFT" delay={0.3 * 6}>
                <div className="">즐길 수 있도록 돕습니다. </div>
              </TextFadeInAnimation>
              <TextFadeInAnimation direction="RIGHT" delay={0.3 * 7}>
                <div className="font-bold">바다이브와 함께, 더 깊이, 더 자유롭게 바다를 경험해보세요. </div>
              </TextFadeInAnimation>
            </div>
          </div>
          <div className="px-[15%] md:flex-[1] md:px-0">
            <Image src={ImgBadiveDescription} alt="스쿠버다이빙 예시 사진" />
          </div>
        </div>
      </div>
      <div
        // style={{
        //   backgroundImage: 'url(about_new/background_in_about_page.webp)',
        // }}
        className="relative flex h-[200px] w-full items-center justify-center object-cover text-center font-freesentation500 text-white sm:h-[350px] md:h-[500px] md:text-[55px]"
      >
        {/* className="animate-fade-in-up" */}
        <Image ref={containerRefForImage as any} fill src={ImgBackgroundInAboutPage} alt="인어" />
        {/* <TextFadeInAnimation direction="UP" delay={0}></TextFadeInAnimation> */}
        {/* <div className=""></div> */}
        <div
          ref={containerRefForText}
          // style={{
          //   animationDelay: '0.5s',
          //   transform: 'translateY(100px)',
          //   opacity: 0,
          // }}
          // animate-fade-in-up
          // -translate-x-1/2 -translate-y-1/2
          className="absolute left-[0%] top-[50%] z-10 w-full font-freesentation500 text-[20px] text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:text-[35px] md:text-[50px] lg:text-[55px]"
        >
          평범한 다이빙이 아닌, 완벽한 다이빙_ 바다이브만의 경쟁력
        </div>
        {/* <TextFadeInAnimation direction="UP" delay={0.3 * 1}></TextFadeInAnimation> */}
      </div>
      <div className="pb-24 pt-24">
        <div className="text-center">
          <TextFadeInAnimation direction="UP" delay={0.3 * 0}>
            <div className="font-freesentation800 text-center text-[30px] sm:text-[40px] md:text-[50px] lg:text-[50px]">차별화된 시스템 </div>
          </TextFadeInAnimation>
          <TextFadeInAnimation direction="UP" delay={0.3 * 1}>
            <div className="pb-8 pt-8 font-freesentation500 text-[20px] text-[#004EA2] sm:text-[25px] md:text-[30px]">
              검증된 상위 1% 강사진과 체계적인 커리큘럼
            </div>
          </TextFadeInAnimation>
          <TextFadeInAnimation direction="UP" delay={0.3 * 2}>
            <div
              style={{
                lineHeight: '1.8',
              }}
              className="pb-12 font-freesentation500 text-[16px] text-[#424242] sm:text-[20px] md:text-[25px]"
            >
              <div className="">최고의 다이빙은 최고의 교육에서 시작됩니다. </div>
              <div className="">바다이브에서는 경험과 실력을 갖춘 상위 1% 강사진이 직접 교육을 진행하며, </div>
              <div className="">개인의 역량을 고려해 충분한 적응 능력을 향상 시키고 </div>
              <div className="">단계별로 설계된 체계적인 커리큘럼을 통해 안전하고 전문적인 교육을 제공합니다.</div>
            </div>
          </TextFadeInAnimation>
        </div>
        <div ref={containerRefForText2} className="flex flex-col justify-center sm:flex-col md:flex-row">
          <div
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 83, 201, 0.6),rgba(0, 83, 201, 0.6)), url(about_new/system_background_01.webp)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
            className="flex h-[150px] items-center justify-center object-cover text-center font-freesentation500 text-white sm:h-[250px] md:h-[300px] md:w-[640px]"
          >
            <div className="font-freesentation400">
              <div className="text-[20px] sm:text-[30px] md:text-[40px] lg:text-[48px]">
                로그 &nbsp;
                <span ref={refForCounterElement} id="count-up" className="font-freesentation text-[35px] sm:text-[45px] md:text-[55px] lg:text-[64px]"></span>
                <span className="font-freesentation text-[35px] sm:text-[45px] md:text-[55px] lg:text-[64px]">회</span>
                이상
              </div>
              <div className="text-center font-freesentation400 text-[18px] sm:text-[25px] md:text-[30px] lg:text-[32px]">
                <div className="">프리미엄 상위 1% 강사 </div>
                <div className="">BADIVE</div>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundImage: 'linear-gradient(rgba(49, 49, 49, 0.6),rgba(49, 49, 49, 0.6)), url(about_new/system_background_02.webp)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
            className="flex h-[150px] items-center justify-center object-cover text-center font-freesentation500 text-white sm:h-[250px] md:h-[300px] md:w-[640px]"
          >
            <div className="font-freesentation400">
              <div className="text-[20px] sm:text-[30px] md:text-[40px] lg:text-[48px]">
                제한수역 교육 <span className="font-freesentation text-[35px] sm:text-[45px] md:text-[55px] lg:text-[64px]">3회+α</span>
              </div>
              <div className="text-center font-freesentation400 text-[18px] sm:text-[25px] md:text-[30px] lg:text-[32px]">
                <div className="">프리미엄 상위 1% 강사 </div>
                <div className="">BADIVE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TextFadeInAnimation direction="UP">
        <div className="font-freesentation800 pb-16 text-center text-[30px] sm:text-[40px] md:pb-0 md:text-[50px] lg:text-[50px]">바다이브만의 독보적 강점</div>
      </TextFadeInAnimation>
      <div className="flex flex-col items-center gap-24 sm:gap-24 md:gap-24 md:pt-24">
        <ImgAndDescription
          children={
            <>
              <div className=""> 완벽한 다이빙을 위한 첫걸음, 누구에게 배우느냐에 따라 다릅니다.</div>
              <div className="">스킨스쿠버는 경험이 중요한 스포츠이기 때문에</div>
              <div className="">다양한 환경에서 다이빙을 경험한 강사가 </div>
              <div className="">기초부터 고급 과정까지, 단계별로 세밀하게 설계된 교육을 진행합니다.</div>
              <div className="">초보자는 빠르게 성장하고, 경험자는 더욱 깊이 있는 다이빙을 즐길 수 있습니다. </div>
              <div className="">&nbsp;</div>
              <div className="">다이빙을 더욱 확실하게 배우고 싶다면 꼭 확인하세요. </div>
            </>
          }
          imagePosition="LEFT"
          //   imgSrc="https://s.pstatic.net/dthumb.phinf/?src=%22http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MTFfMjMy%2FMDAxNzQ0MzcyNjgzNTkz.JoYwqogIDchNsuoYTa_-l6MEsJm294iCM4Py6qaBprkg.zdhyE1VGDtwdnWxTcwoD4NhLYxEYTMPXiu-IyoVTt60g.JPEG%2F10.jpg%22&type=ff364_236&service=navermain"
          imgSrc="about_new/badive_advantage_01.webp"
          title="다이빙의 기준을 높이는 바다이브 강사"
        />
        <ImgAndDescription
          children={
            <>
              <div className="">바다이브는 전국 어디서나 다이빙 강습이 가능한</div>
              <div className="">시스템을 운영하고 있습니다. </div>
              <div className="">위치에 상관없이 숙련된 강사진이 직접 교육을 진행하며,</div>
              <div className="">수강생의 일정과 환경에 맞춰 최적의 다이빙 강습을 제공합니다. </div>
            </>
          }
          imagePosition="RIGHT"
          imgSrc="about_new/badive_advantage_02.webp"
          title="전국 어디서나 가능한 교육"
        />
        <ImgAndDescription
          children={
            <>
              <div className=""> 바다이브는 더욱 특별한 다이빙 경험을 제공하기 위해</div>
              <div className="">국내 외 다양한 리조트들과 MOU를 체결하고 있습니다. </div>
              <div className="">제휴 리조트와의 협력을 통해 더욱 편안하고 안전한 다이빙 환경을 제공하며,</div>
              <div className="">아름다운 다이빙 명소에서 차별화된 혜택과 최상의 </div>
              <div className="">서비스를 누릴 수 있습니다. </div>
            </>
          }
          imagePosition="LEFT"
          imgSrc="about_new/badive_advantage_03.webp"
          title="특별한 다이빙 경험을 위한 새로운 도약"
        />
        <ImgAndDescription
          children={
            <>
              <div className="">바다이브에서는 단순 다이빙 체험을 넘어 투어 촬영을 진행합니다. </div>
              <div className="">전문 촬영팀과 함께 투어 및 교육 촬영을 진행하며</div>
              <div className="">다이빙의 즐거움을 더욱 깊이 있게 경험할 수 있도록 합니다. </div>
              <div className="">&nbsp;</div>
              <div className="">다이빙의 즐거운 순간을 기록하는 땡크투어와 </div>
              <div className="">다이버들에게 효율적인 교육내용을 전달하는 땡크버디로 </div>
              <div className="">새롭고 풍부한 다이빙의 경험을 즐길 수 있습니다. </div>
            </>
          }
          imagePosition="RIGHT"
          imgSrc="about_new/badive_advantage_04.webp"
          title=" 다이빙 컨텐츠 기획 촬영"
        />
      </div>
      <div className="flex justify-center">
        <div className="pb-24 pt-24">
          <div className="font-freesentation800 py-8 text-center text-[40px] sm:text-[40px] md:text-[50px] lg:text-[50px]">전지역 강습, 바다이브 강사</div>
          <div
            style={{
              lineHeight: '1.9',
            }}
            className="text-center font-freesentation500 text-[16px] text-[#424242] sm:text-[20px] md:text-[25px]"
          >
            <div className="">원하는 지역을 선택하면 해당 지역에서 </div>
            <div className="">강습 가능한 전문 강사를 확인하실 수 있습니다. </div>
          </div>
          <div className="flex flex-col-reverse gap-12 pt-24 md:flex-row md:gap-0">
            <div
              style={{
                left: '0%',
              }}
              className="relative flex w-fit flex-1 flex-col items-center transition-all duration-100"
            >
              <Image src={ImgKoreanMapWithoutPoint} alt="한국지도" />
              <div onClick={() => changeLocation('인천')} className="absolute left-[17%] top-[30%] z-10 cursor-pointer">
                <Image src={currentLocation === '인천' ? PinActivated : Pin} alt="위치 포인터" />
                <div className="">인천</div>
              </div>
              <div onClick={() => changeLocation('서울')} className="absolute left-[25%] top-[28%] z-10 cursor-pointer">
                <Image src={currentLocation === '서울' ? PinActivated : Pin} alt="위치 포인터" />
                <div className="">서울</div>
              </div>
              <div onClick={() => changeLocation('경기')} className="absolute left-[37%] top-[35%] z-10 cursor-pointer">
                <Image src={currentLocation === '경기' ? PinActivated : Pin} alt="위치 포인터" />
                <div className="">경기</div>
              </div>
              <div onClick={() => changeLocation('대구')} className="absolute left-[67%] top-[60%] z-10 cursor-pointer">
                <Image src={currentLocation === '대구' ? PinActivated : Pin} alt="위치 포인터" />
                <div className="">대구</div>
              </div>
              <div onClick={() => changeLocation('부산')} className="absolute left-[80%] top-[75%] z-10 cursor-pointer">
                <Image src={currentLocation === '부산' ? PinActivated : Pin} alt="위치 포인터" />
                <div className="">부산</div>
              </div>
            </div>
            {currentLocation && (
              <div className="flex-1 px-8 md:px-0 md:pt-32">
                <div className="pb-12 text-center font-freesentation text-[25px] sm:text-[30px] md:text-left md:text-[40px]">{currentLocation}</div>
                <div className="flex gap-12">
                  {selectedInstructorArr.map(instructor => {
                    return (
                      <div className="font-freesentation500 text-[18px] sm:text-[20px] md:text-[30px]" key={instructor.instructorName}>
                        <div className="">
                          <img className="rounded-3xl" src={instructor.imgSrc} />
                        </div>
                        <div className="pt-4 text-center">{instructor.instructorName}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageForAbout;
