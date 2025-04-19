'use client';

import { useTextAnimation } from '../../hooks/useAnimation';

const MainSectionHeader = ({ title }) => {
  const { containerRef } = useTextAnimation();

  return (
    <h1
      ref={containerRef}
      className="section-title flex h-auto w-full transform items-center justify-center gap-[7px] text-nowrap py-[50px] font-freesentationVF text-[25px] font-bold text-black transition-transform duration-300 ease-out sm:gap-[14px] sm:py-24 sm:text-[40px] md:gap-[27px] md:py-[115px] md:text-[50px] lg:gap-[27px] lg:py-[100px]"
    >
      <img loading="lazy" src="/story/title.png" className="h-[50px] w-[50px]" />
      {title}
    </h1>
  );
};
export default MainSectionHeader;
