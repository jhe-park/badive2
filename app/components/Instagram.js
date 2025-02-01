import React from "react";
import InstagramCarousel from "./InstagramCarousel";
export default function Instagram() {
  return (
    <div className=" w-full  h-[50vh] md:h-[700px] flex flex-col justify-center items-start gap-y-5 px-[2vw] py-[1vw]">
      <div className="flex  gap-x-5 justify-center md:justify-start items-center mt-10 md:mt-0 w-full">
        <img src="/logo/insta.png" alt="" className="h-8 md:h-12 w-auto" />
        <p className="text-2xl md:text-[36px] font-bold">BDN Instagram</p>
      </div>
      <InstagramCarousel></InstagramCarousel>
    </div>
  );
}
