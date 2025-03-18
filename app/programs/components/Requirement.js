import { Divider, Button } from "@heroui/react";

export default function Requirement({ data }) {
  return (
    <div className="w-full h-full xl:aspect-[1280/693] md:aspect-[768/540] flex flex-col items-center justify-evenly text-[24px] md:text-[64px] mt-4 gap-y-4 mb-8">
      <div className="text-[35px] md:text-[40px] xl:text-[64px] font-bold text-center">
        강습 받기 전,{" "}
        <br className="md:hidden" />
        <span className="text-[#0053C9]">필수로 알아야 할 사항 ! </span>
      </div>
      <div className="flex flex-col items-start justify-center text-[18px] md:text-[30px] xl:text-[40px] ">
        {data.guide.map((item, index) => (
          <div key={index} className="flex items-center justify-center w-full">
            <p>
              <span className="text-[20px] md:text-[40px] text-[#0053C9] font-bold">
                {item.title}
              </span>{" "}
              {item.description}
            </p>
          </div>
        ))}
        {/* <div><span className="text-[20px] md:text-[40px] text-[#0053C9] font-bold">준비물:</span> 수영복, 세면도구, 수건, 수모(수영 모자)</div>
            <div><span className="text-[20px] md:text-[40px] text-[#0053C9] font-bold">포함사항:</span> 교육비, 자격증 발급(교재비 포함)</div>
            <div><span className="text-[20px] md:text-[40px] text-[#0053C9] font-bold">불포함사항:</span> 입장료, 장비대여&공기통대여, 해양실습 </div> */}
      </div>
      <div className="text-[16px] md:text-[20px] text-[#7A7A7A] text-center">
        ＊ 모든 강습은 개인에 따라 일정이 추가 되거나 변경될 수 있습니다.
      </div>
      <div className="w-full flex items-center justify-center md:mt-0">
        <Button className="w-full h-full max-w-[116px] max-h-[40px] md:max-w-[180px] md:max-h-[45px] xl:max-w-[217px] xl:max-h-[50px] font-bold py-2 md:py-3 xl:py-4 bg-[#0053C9] text-white rounded-3xl text-[18px] md:text-[30px] xl:text-[30px]">
          예약하기
        </Button>
      </div>
    </div>
  );
}
