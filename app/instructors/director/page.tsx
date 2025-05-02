import Image from 'next/image';
import Activity from './components/Activity';
import TabContents from './components/TabContents';

export default function PageForDirector() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative mt-[100px] flex h-[30vh] w-full flex-col items-center justify-center md:h-[600px]">
        <Image src="/instructor/director_banner.png" alt="instructors" fill className="object-cover" />
        <div className="absolute bottom-6 left-6 rounded-lg p-4">
          <div className="absolute inset-0 rounded-lg bg-white opacity-70" />
          <div className="relative z-10">
            <h1 className="text-medium font-bold text-black md:text-5xl">Professional Filming Team</h1>
            <p className="text-sm text-black md:text-3xl">열정과 실력으로 최고의 작품을 선사하는</p>
            <p className="text-sm text-black md:text-3xl">바다이브의 촬영팀을 소개합니다.</p>
          </div>
        </div>
      </div>
      <TabContents />
      <Activity></Activity>
    </div>
  );
}
