import Image from 'next/image';
import Link from 'next/link';

export default function page() {
  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center">
      <div className="relative h-[30vh] w-full bg-red-100 md:h-[600px]">
        <Image src="/program/programtop1.png" alt="program1" fill className="object-cover" />
        <div className="absolute bottom-[2vh] left-[2vw] flex flex-col items-start justify-center gap-y-2 md:bottom-[5vh] md:gap-y-6">
          <div className="text-2xl font-bold text-white md:text-4xl">Systematic System</div>
          <div className="flex flex-col items-start justify-center">
            <div className="text-sm text-white md:text-2xl">전문강사들에게 배우는</div>
            <div className="text-sm text-white md:text-2xl">체계적인 다이빙 강습 시스템</div>
          </div>
        </div>
      </div>
      <div className="flex h-[50vh] w-full flex-col items-center justify-between md:h-[1000px]">
        <div className="flex h-36 w-full flex-col items-center justify-center md:h-[30vh]">
          <p className="text-center text-lg md:text-4xl">Diving Program</p>
          <h1 className="text-center text-2xl font-bold md:text-6xl">강습프로그램</h1>
        </div>
        <div className="grid h-full w-full grid-cols-3">
          <div className="group relative col-span-1">
            <Link href="/programs/scuberdiving">
              <Image src="/program/program1.png" alt="program1" fill className="object-cover" />
            </Link>
            <div className="absolute top-1/2 flex h-12 w-full -translate-y-1/2 transform items-center justify-center bg-black md:h-[100px]">
              <p style={{ lineHeight: '1' }} className="text-center text-lg text-white sm:text-[20px] md:text-[30px] lg:text-[50px]">
                SCUBA DIVING
              </p>
            </div>
            {/* <Link href="/programs/scuberdiving">
            <Button className="bg-black border-2 border-white absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity h-1/10 w-1/4 text-sm md:text-[32px] md:p-6">
              바로가기
            </Button>
            </Link> */}
            <div className="absolute left-1/2 top-1/4 w-24 -translate-x-1/2 -translate-y-1/2 transform rounded py-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100 md:w-72 md:text-[40px]">
              스쿠버 다이빙
            </div>
          </div>
          <div className="group relative col-span-1">
            <Link href="/programs/freediving">
              <Image src="/program/program2.png" alt="program2" fill className="object-cover" />
            </Link>
            <div className="absolute top-1/2 flex h-12 w-full -translate-y-1/2 transform items-center justify-center bg-black md:h-[100px]">
              <p style={{ lineHeight: '1' }} className="text-lg text-white sm:text-[20px] md:text-[30px] lg:text-[50px]">
                FREE DIVING
              </p>
            </div>
            {/* <Link href="/programs/freediving">
            <Button className="bg-black border-2 border-white absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity h-1/10 w-1/4 text-sm md:text-[32px] md:p-6">
              바로가기
            </Button>
            </Link> */}
            <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 transform rounded px-4 py-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100 md:text-[40px]">
              프리 다이빙
            </div>
          </div>
          <div className="group relative col-span-1">
            <Link href="/programs/mermaid">
              <Image src="/program/program3.png" alt="program3" fill className="object-cover" />
            </Link>
            <div className="absolute top-1/2 flex h-12 w-full -translate-y-1/2 transform items-center justify-center bg-black md:h-[100px]">
              <p style={{ lineHeight: '1' }} className="text-lg text-white sm:text-[20px] md:text-[30px] lg:text-[50px]">
                MERMAID
              </p>
            </div>
            {/* <Link href="/programs/mermaid">
            <Button className="bg-black border-2 border-white absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity h-1/10 w-1/4 text-sm md:text-[32px] md:p-6">
              바로가기
            </Button>
            </Link> */}
            <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 transform rounded px-4 py-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100 md:text-[40px]">
              머메이드
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
