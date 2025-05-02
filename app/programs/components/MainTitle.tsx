export default function ({ data }) {
  return (
    <div className="mt-[42px] flex h-auto w-full flex-col items-center justify-center font-bold sm:aspect-[375/100] md:mt-0 md:aspect-[786/100] lg:mt-[30px] lg:aspect-[1280/200]">
      <p style={{ lineHeight: '1.2' }} className="w-full text-center text-[25px] md:text-[35px] lg:text-[64px]">
        {/* 바다이브 */}
        <br className="" /> <span className="text-[#0054CA]">{data.subtitle}</span>
        <br className="md:hidden" /> 강습 프로그램
      </p>
    </div>
  );
}
