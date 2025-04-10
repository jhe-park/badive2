'use client';

import { useImageAnimation, useTextAnimation } from '../../hooks/useAnimation';
import MainSectionHeader from './MainSectionHeader';
import ViewMoreButton from './ViewMoreButton';

const MainInstructor = () => {
  const textClass = 'text-[#004EA2] font-bold';
  const { containerRef: textRef } = useTextAnimation();
  const { containerRef: imageRef } = useImageAnimation();

  return (
    <section className="bg-white w-full">
      <MainSectionHeader title="BADIVE 소속강사" />
      <div
        className="text-nowrap text-[20px] sm:text-[40px] md:text-5xl text-black text-center transform transition-transform duration-300 ease-out"
        ref={textRef}
      >
        <span className={textClass}>바다</span>를 사랑하는
        <br /> 전문가들이 <span className={textClass}>당신의 첫걸음을 함께</span>합니다
      </div>
      <a className="mt-[47px] relative max-w-[1720px] block mx-auto" href="/instructors/bdn" ref={imageRef}>
        <img loading="lazy" src="/instructor/main_instructor.avif" alt="main_instructor" className="transition-transform duration-300 ease-out transform" />
        <ViewMoreButton
          onClick={() => {}}
          className={
            'bg-[#00000040] rounded-2xl py-[2px] px-2 absolute z-10 bottom-2 right-[21px] sm:bottom-[15px] md:bottom-[21px] md:right-[23px] lg:bottom-[15px] lg:right-6'
          }
          useReverse
        />
      </a>
    </section>
  );
};
export default MainInstructor;
