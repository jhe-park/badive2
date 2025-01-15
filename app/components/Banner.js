import React from "react";
import BannerDotCarousel from "./BannerDotCarousel";
export default function Banner() {
  return (
    <>
      <div className="bg-yellow-500 w-full h-[100vh] relative"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[+150%] flex space-x-0 bg-black w-1/2 h-24 z-10">
        <button className="bg-black text-white px-4 py-2 rounded-l w-1/3 text-[25px]">
          SCUBA DIVING
        </button>
        <div className="w-px bg-white"></div>
        <button className="bg-black text-white px-4 py-2 w-1/3 text-[25px]">
          FREEDIVING
        </button>
        <div className="w-px bg-white"></div>
        <button className="bg-black text-white px-4 py-2 w-1/3 text-[25px]">
          MERMAID
        </button>
      </div>
      <div className="bg-green-500 w-full h-[100vh] relative grid grid-cols-2">
        <div className="col-span-1 flex justify-center items-center w-full h-full">
          <div className="w-1/2 h-1/2 flex justify-center items-center">
            <BannerDotCarousel></BannerDotCarousel>
          </div>
        </div>
      </div>
    </>
  );
}
