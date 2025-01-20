import React from "react";
import TabContents from "./components/TabContents";
import Image from "next/image";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[600px] flex items-center justify-center relative">
        <Image src={"/program3/mermaidtop.png"} alt="scuberdiving" fill className="object-cover"/>
        <div className="absolute bottom-12 left-12 gap-y-2 flex flex-col">
          <div className="text-5xl font-bold text-white">Mermaid</div>
          <div className="text-3xl text-white">꿈꾸던 바다속의 인어, 머메이드</div>
        </div>
      </div>
      <div className="w-full h-48 flex flex-col items-center justify-center gap-y-5">
        <div className="text-3xl">Mermaid</div>
        <div className="text-5xl font-bold">머메이드</div>
      </div>
      <TabContents></TabContents>

    </div>
  );
}
