import React from "react";
import VerticalCarousel from "./VerticalCarousel";
export default function Activity() {
  return (
    <div className="w-full h-[1046px] flex relative flex-col items-center">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-black z-1"></div>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-[30px] text-black">activity</h1>
        <p className="text-[60px] font-bold text-black">촬영감독주요활동</p>
      </div>
      <div className="w-[50vw] h-full flex items-center justify-center text-black z-10">
        <div className=" w-1/2 h-full flex flex-col items-center justify-center">
          <VerticalCarousel></VerticalCarousel>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center">
          <div className="text-[96px] font-bold">정은지 강사</div>
          <div className="text-[30px] mt-12">
            [유튜브] - 핀터뷰 출연
          </div>
          <div className="text-[30px]">
            -프리다이빙 강사 정은지 인터뷰 영상
          </div>
        </div>
      </div>
    </div>
  );
}
