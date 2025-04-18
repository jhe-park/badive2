import Image from 'next/image';

export default function MiddleBanner({ data }) {
  return (
    <div className="w-full xl:aspect-[1280/500] md:aspect-[768/455] aspect-[375/526] bg-[#BAEBFF] p-4 md:p-7 flex flex-col md:flex-row items-center md:justify-between justify-evenly">
      <div className="w-full md:w-1/2 flex flex-col items-center text-[25px] md:text-[30px] lg:text-[50px] font-bold">
        <p className="">로그 1000회 이상!</p>
        <p className="">
          <span className="text-[#0069FF]">전문 강사진들</span>과 함께 하는
        </p>
        <p className="">바다이브 체험다이빙</p>
      </div>
      <div className="relative w-full md:w-1/2 h-auto flex items-center justify-center">
        <div className="relative w-full max-w-full aspect-[3/2] md:aspect-[4/3] lg:aspect-[5/3] xl:aspect-[662/443]">
          <Image src={data.groupImage || ''} alt="middlebanner" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
