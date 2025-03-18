import React from "react";
import Image from "next/image";

export default function TopHeader() {
  return (
    <div className="w-full h-full py-12 xl:aspect-[1280/655] md:aspect-[786/394] aspect-[375/223] flex flex-col items-center justify-center relative">
      <Image src="/programnew/upper.png" alt="frame" fill />

      <div className="w-full xl:max-w-[555px] xl:aspect-[555/126] md:max-w-[277px] md:aspect-[277/63] sm:max-w-[193px] sm:aspect-[193/44] relative">
        <Image src="/programnew/bubble1.png" alt="frame" fill />
      </div>

      <div className="flex flex-col items-center justify-center z-10 text-[30px] md:text-[35px] xl:text-[64px]">
        <p className=" font-bold">
          이제 안전한 다이빙을 원한다면
        </p>
        <p className="font-bold">
          <span className="text-[#0054CA]">바다이브</span>와 함께 !{" "}
        </p>
      </div>
    </div>
  );
}
