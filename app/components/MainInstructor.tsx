'use client';

import { useImageAnimation, useTextAnimation } from '../../hooks/useAnimation';
import MainSectionHeader from './MainSectionHeader';
import ViewMoreButton from './ViewMoreButton';

const MainInstructor = () => {
  const textClass = 'text-[#004EA2] font-bold';
  const { containerRef: textRef } = useTextAnimation();
  const { containerRef: imageRef } = useImageAnimation();

  return (
    <section className="w-full bg-white">
      <MainSectionHeader title="BADIVE 소속강사" />
      <div
        className="transform text-nowrap text-center text-[20px] text-black transition-transform duration-300 ease-out sm:text-[40px] md:text-5xl"
        ref={textRef}
      >
        <span className={textClass}>바다</span>를 사랑하는
        <br /> 전문가들이 <span className={textClass}>당신의 첫걸음을 함께</span>합니다
      </div>
      <a className="relative mx-auto mt-[47px] block max-w-[1720px]" href="/instructors/bdn" ref={imageRef}>
        <img loading="lazy" src="/instructor/main_instructor.webp" alt="main_instructor" className="transform transition-transform duration-300 ease-out" />
        <ViewMoreButton
          onClick={() => {}}
          className={
            'absolute bottom-2 right-[21px] z-10 rounded-2xl bg-[#00000040] px-2 py-[2px] sm:bottom-[15px] md:bottom-[21px] md:right-[23px] lg:bottom-[15px] lg:right-6'
          }
          useReverse
        />
      </a>
    </section>
  );
};
export default MainInstructor;
