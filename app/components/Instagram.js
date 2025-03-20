import React from "react";
import InstagramCarousel from "./InstagramCarousel";
export default function Instagram() {
  return (
    <div className=" w-full h-full md:h-auto max-w-[1280px] xl:aspect-[1280/610] md:aspect-[768/451] aspect-[375/253] flex flex-col justify-evenly items-start">
      <div className="flex  gap-x-5 justify-center xl:justify-start items-center md:mt-0 w-full">
        <img src="/logo/insta.png" alt="" className="h-8 md:h-12 w-auto" />
        <p className="text-[20px] md:text-[30px] xl:text-[36px] font-bold">BADIVE Instagram</p>
      </div>
      <InstagramCarousel></InstagramCarousel>
    </div>
  );
}
