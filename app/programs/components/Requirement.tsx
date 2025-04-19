'use client';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
export default function Requirement({ data }) {
  const router = useRouter();
  return (
    <div className="mb-8 mt-4 flex h-full w-full flex-col items-center justify-evenly gap-y-4 text-[24px] md:aspect-[768/540] md:text-[64px] xl:aspect-[1280/693]">
      <div className="text-center text-[35px] font-bold md:text-[40px] xl:text-[64px]">
        강습 받기 전, <br className="md:hidden" />
        <span className="text-[#0053C9]">필수로 알아야 할 사항 ! </span>
      </div>
      <div className="flex flex-col items-start justify-center text-[18px] md:text-[30px] xl:text-[40px]">
        {data.guide.map((item, index) => (
          <div key={index} className="flex w-full items-center justify-center">
            <p>
              <span className="text-[20px] font-bold text-[#0053C9] md:text-[40px]">{item.title}</span> {item.description}
            </p>
          </div>
        ))}
        {/* <div><span className="text-[20px] md:text-[40px] text-[#0053C9] font-bold">준비물:</span> 수영복, 세면도구, 수건, 수모(수영 모자)</div>
            <div><span className="text-[20px] md:text-[40px] text-[#0053C9] font-bold">포함사항:</span> 교육비, 자격증 발급(교재비 포함)</div>
            <div><span className="text-[20px] md:text-[40px] text-[#0053C9] font-bold">불포함사항:</span> 입장료, 장비대여&공기통대여, 해양실습 </div> */}
      </div>
      <div className="text-center text-[16px] text-[#7A7A7A] md:text-[20px]">＊ 모든 강습은 개인에 따라 일정이 추가 되거나 변경될 수 있습니다.</div>
      <div className="flex w-full items-center justify-center md:mt-0">
        <Button
          onPress={() => router.push('/inquiries')}
          className="h-full max-h-[40px] w-full max-w-[116px] rounded-3xl bg-[#0053C9] py-2 text-[18px] font-bold text-white md:max-h-[45px] md:max-w-[180px] md:py-3 md:text-[30px] xl:max-h-[50px] xl:max-w-[217px] xl:py-4 xl:text-[30px]"
        >
          예약하기
        </Button>
      </div>
    </div>
  );
}
