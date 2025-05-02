import React from 'react';
import ResortCarousel from './ResortCarousel';

export default function Resort() {
  return (
    <div className="flex aspect-[375/275] h-full w-full flex-col items-start justify-evenly md:aspect-[768/422] md:h-auto md:max-w-[1280px] xl:aspect-[1280/522]">
      <div className="flex w-full items-center justify-center gap-x-5 xl:justify-start">
        <p className="text-[20px] font-bold md:text-[30px] xl:text-[36px]">BADIVE 협력 리조트</p>
      </div>
      <ResortCarousel></ResortCarousel>
    </div>
  );
}
