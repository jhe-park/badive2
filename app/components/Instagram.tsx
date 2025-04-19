import React from 'react';
import InstagramCarousel from './InstagramCarousel';
export default function Instagram() {
  return (
    <div className="flex aspect-[375/253] h-full w-full max-w-[1280px] flex-col items-start justify-evenly md:aspect-[768/451] md:h-auto xl:aspect-[1280/610]">
      <div className="flex w-full items-center justify-center gap-x-5 md:mt-0 xl:justify-start">
        <img loading="lazy" src="/logo/insta.png" alt="" className="h-8 w-auto md:h-12" />
        <p className="text-[20px] font-bold md:text-[30px] xl:text-[36px]">BADIVE Instagram</p>
      </div>
      <InstagramCarousel></InstagramCarousel>
    </div>
  );
}
