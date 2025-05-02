export default function Review() {
  return (
    <div className="my-6 flex aspect-[375/902] h-auto max-h-[902px] w-full flex-col items-center justify-evenly md:my-0 md:aspect-[771/880] md:max-h-none xl:aspect-[1280/880]">
      <div className="text-center text-[35px] font-bold md:text-[40px] xl:text-[64px]">
        실제 강습 받으신
        <br className="md:hidden" />
        회원님의 <span className="text-[#0054CA]">솔직 리뷰</span>!
      </div>
      <div className="text-[20px] md:text-[24px] xl:text-[35px]">
        회원리뷰 <span className="text-[#FF9D00]">4.9</span> 실제 회원님들이
        <br className="md:hidden" />
        추천하시는 바다이브 강습 !{' '}
      </div>
      <div className="hidden w-full md:block md:aspect-[731/656] md:max-w-[731px] xl:aspect-[901/586] xl:max-w-[901px]">
        <img className="h-full w-full object-contain xl:hidden" src="/programnew/reviewTA.png" alt="review" />
        <img className="hidden h-full w-full object-contain xl:block" src="/programnew/reviewPC.png" alt="review" />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center md:hidden">
        <img className="aspect-[363-173] w-full max-w-[363px] object-contain" src="/programnew/bubble1.png" alt="review" />
        <img className="aspect-[363-173] w-full max-w-[363px] object-contain" src="/programnew/bubble2.png" alt="review" />
        <img className="aspect-[363-173] w-full max-w-[363px] object-contain" src="/programnew/bubble3.png" alt="review" />
        <img className="aspect-[363-173] w-full max-w-[363px] object-contain" src="/programnew/bubble4.png" alt="review" />
      </div>
    </div>
  );
}
