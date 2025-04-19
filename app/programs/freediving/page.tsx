import Image from 'next/image';
import TabContents from './components/TabContents';
export default function page() {
  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center">
      <div className="relative flex h-[30vh] w-full items-center justify-center md:h-[600px]">
        <Image src={'/program/freedivingtop.png'} alt="scuberdiving" fill className="object-cover" />
        <div className="absolute bottom-[2vh] left-[2vw] flex flex-col gap-y-2 md:bottom-[5vh] md:gap-y-6">
          <div className="text-2xl font-bold text-white md:text-[48px]">Freediving</div>
          <div className="text-sm text-white md:text-[32px]">한 호흡으로 시작되는 무한의 여정, 프리다이빙</div>
        </div>
      </div>
      <div className="flex h-24 w-full flex-col items-center justify-center gap-y-2 md:h-48 md:gap-y-5">
        <div className="text-lg md:text-3xl">Freediving</div>
        <div className="text-2xl font-bold md:text-5xl">프리다이빙</div>
      </div>
      <TabContents></TabContents>
      {/* <Frame></Frame> */}
    </div>
  );
}
