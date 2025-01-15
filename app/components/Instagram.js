import React from "react";
import InstagramCarousel from "./InstagramCarousel";
export default function Instagram() {
  return (
    <div className=" w-full h-[700px] flex flex-col justify-center items-start gap-y-5 px-[2vw] py-[1vw]">
      <div className="flex  gap-x-5 justify-center items-center">
        <img src="/logo/insta.png" alt="" className="h-12 w-auto" />
        <p className="text-[36px] font-bold">BDN Instagram</p>
      </div>
      <InstagramCarousel></InstagramCarousel>
    </div>
  );
}
