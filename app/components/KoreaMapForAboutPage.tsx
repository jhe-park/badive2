'use client';

import gsap from 'gsap';
import ImgKoreanMapWithoutPoint from '@/public/about_new/korean_map_without_point.webp';
import Pin from '@/public/about_new/pin.webp';
import PinActivated from '@/public/about_new/pin_activated.webp';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { checkIsMobileDevice } from '@/utils/checkIsMobileDevice';

type TProps = Record<string, unknown>;

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

export const KoreaMapForAboutPage: React.FC<TProps> = ({}) => {
  const [isMapAlreadyMoved, setIsMapAlreadyMoved] = useState(false);

  const refForMap = useRef<HTMLDivElement>(null);
  const refForInstructors = useRef<HTMLDivElement>(null);

  const [currentLocation, setCurrentLocation] = useState<TLocation | undefined>();
  const changeLocation = (location: TLocation) => {
    setCurrentLocation(location);
    if (isMapAlreadyMoved) {
      return;
    }

    animateElement({ containerRef: refForMap, direction: checkIsMobileDevice() ? 'DOWN' : 'LEFT' });
    setTimeout(() => {
      animateElement({ containerRef: refForInstructors, direction: checkIsMobileDevice() ? 'UP' : 'RIGHT' });
    }, 16);
    setIsMapAlreadyMoved(true);
  };

  const selectedInstructorArr = instructorArr.filter(instructor => instructor.location.includes(currentLocation));

  const animateElement = ({
    containerRef,
    direction,
    delay,
  }: {
    containerRef: React.RefObject<any>;
    direction: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';
    delay?: number;
  }) => {
    if (!containerRef.current) return;

    // 1) 애니메이션 적용 대상 설정
    const targets: HTMLElement[] = [containerRef.current];

    // 3) 애니메이션 생성
    const tween = gsap.fromTo(
      targets,
      {
        x: 0,
        y: 0,
      },
      {
        x: direction === 'LEFT' ? -300 : direction === 'RIGHT' ? 300 : 0,
        y: direction === 'UP' ? -300 : direction === 'DOWN' ? 300 : 0,
        duration: 0.6,
        ease: 'power3.out',
      },
    );

    return () => {
      tween.kill();
    };
  };

  return (
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
        <div className="relative flex flex-col-reverse gap-12 pb-[500px] pt-[610px] md:flex-row md:gap-0 md:pb-[900px] md:pt-24">
          <div
            ref={refForMap}
            style={{
              left: '0%',
            }}
            className="absolute flex w-fit flex-1 flex-col items-center transition-all duration-100"
          >
            <Image src={ImgKoreanMapWithoutPoint} alt="한국지도" />
            <div onClick={() => changeLocation('인천')} className="absolute left-[18%] top-[22%] z-10 cursor-pointer">
              <Image src={currentLocation === '인천' ? PinActivated : Pin} alt="위치 포인터" />
              <div className="">인천</div>
            </div>
            <div onClick={() => changeLocation('서울')} className="absolute left-[25%] top-[20%] z-10 cursor-pointer">
              <Image src={currentLocation === '서울' ? PinActivated : Pin} alt="위치 포인터" />
              <div className="">서울</div>
            </div>
            <div onClick={() => changeLocation('경기')} className="absolute left-[37%] top-[25%] z-10 cursor-pointer">
              <Image src={currentLocation === '경기' ? PinActivated : Pin} alt="위치 포인터" />
              <div className="">경기</div>
            </div>
            <div onClick={() => changeLocation('대구')} className="absolute left-[67%] top-[60%] z-10 cursor-pointer">
              <Image src={currentLocation === '대구' ? PinActivated : Pin} alt="위치 포인터" />
              <div className="">대구</div>
            </div>
            <div onClick={() => changeLocation('부산')} className="absolute left-[80%] top-[72%] z-10 cursor-pointer">
              <Image src={currentLocation === '부산' ? PinActivated : Pin} alt="위치 포인터" />
              <div className="">부산</div>
            </div>
          </div>
          {currentLocation && (
            <div ref={refForInstructors} className="absolute flex-1 px-8 md:px-0 md:pt-32">
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
  );
};
