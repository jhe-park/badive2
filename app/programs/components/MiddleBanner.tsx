import Image from 'next/image';

export default function MiddleBanner({ data }) {
  return (
    <div className="flex aspect-[375/526] w-full flex-col items-center justify-evenly bg-[#BAEBFF] p-4 md:aspect-[768/455] md:flex-row md:justify-between md:p-7 xl:aspect-[1280/500]">
      <div className="flex w-full flex-col items-center text-[25px] font-bold md:w-1/2 md:text-[30px] lg:text-[50px]">
        <p className="">로그 1000회 이상!</p>
        <p className="">
          <span className="text-[#0069FF]">전문 강사진들</span>과 함께 하는
        </p>
        <p className="">바다이브 체험다이빙</p>
      </div>
      <div className="relative flex h-auto w-full items-center justify-center md:w-1/2">
        <div className="relative aspect-[3/2] w-full max-w-full md:aspect-[4/3] xl:aspect-[662/443] lg:aspect-[5/3]">
          <Image src={data.groupImage || ''} alt="middlebanner" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
