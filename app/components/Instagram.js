import React from "react";
import InstagramCarousel from "./InstagramCarousel";
export default function Instagram() {
  return (
    <div className=" w-full h-full md:h-auto md:w-[1280px] aspect-[1280/675] flex flex-col justify-evenly items-start">
      <div className="flex  gap-x-5 justify-center md:justify-start items-center md:mt-0 w-full">
        <img src="/logo/insta.png" alt="" className="h-8 md:h-12 w-auto" />
        <p className="text-2xl md:text-[35px] font-bold">BADIVE Instagram</p>
      </div>
      <InstagramCarousel></InstagramCarousel>
    </div>
  );
}
