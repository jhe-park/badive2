export default function ({ data }) {
  return (
    <div className="w-full h-auto lg:aspect-[1280/200] md:aspect-[786/100] sm:aspect-[375/100] flex flex-col items-center justify-center font-bold lg:mt-[30px] md:mt-0 mt-[42px]">
      <p style={{ lineHeight: '1.2' }} className="text-[25px] md:text-[35px] lg:text-[64px] w-full text-center">
        바다이브
        <br className="" /> <span className="text-[#0054CA]">{data.subtitle}</span>
        <br className="md:hidden" /> 강습 프로그램
      </p>
    </div>
  );
}
