import Image from 'next/image';
import TabContents from './components/TabContents';

export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[30vh] md:h-[600px] flex items-center justify-center relative">
        <Image src={'/program3/mermaidtop.png'} alt="scuberdiving" fill className="object-cover" />
        <div className="absolute bottom-[2vh] md:bottom-[5vh] left-[2vw] gap-y-2 md:gap-y-6 flex flex-col items-start justify-center">
          <div className="text-2xl md:text-5xl font-bold text-white">Mermaid</div>
          <div className="text-sm md:text-3xl text-white">꿈꾸던 바다속의 인어, 머메이드</div>
        </div>
      </div>
      <div className="w-full h-24 md:h-48 flex flex-col items-center justify-center gap-y-2 md:gap-y-5">
        <div className="text-2xl md:text-5xl font-bold">Mermaid</div>
        <div className="text-sm md:text-3xl">머메이드</div>
      </div>
      <TabContents></TabContents>
    </div>
  );
}
