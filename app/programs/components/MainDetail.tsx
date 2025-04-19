import Image from 'next/image';

export default function MainDetail({ data }) {
  return (
    <div className="mt-7 flex h-full w-full flex-col items-center justify-center text-center text-[64px] font-bold md:mt-0 md:aspect-[768/446] md:flex-row xl:aspect-[1280/714] xl:max-w-[1280px] lg:mt-7">
      <div className="flex w-full flex-col items-center justify-center gap-y-10 md:w-1/2">
        <div className="relative aspect-[300/250] w-full max-w-[300px] xl:aspect-[500/400] xl:max-w-[500px]">
          <Image className="rounded-3xl" src={data.image} alt="frame" fill />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-y-5">
          <div className="text-[28px] font-bold text-[#0053C9] underline decoration-2 underline-offset-8 md:text-[35px] xl:text-[50px]">{data.subtitle}</div>
          <div className="text-[18px] font-medium xl:text-[36px]">{data.description}</div>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-evenly gap-y-10 py-6 md:w-1/2 md:gap-y-10">
        <div className="mt-6 flex h-full w-full flex-col items-start justify-evenly gap-y-6 font-medium md:mt-0">
          {data.lines.map((item, index) => (
            <div key={index} className="flex w-full flex-row items-center justify-center gap-x-4 text-[18px] md:text-[20px] xl:text-[36px]">
              <img loading="lazy" src={item.image} alt="frame" className="h-10 w-10 md:h-12 md:w-12" />
              <p>
                {item.text} <span className="text-[#0077B6]">{item.highlight}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-[12px] font-medium text-[#7A7A7A] md:text-[20px]">{data.condition}</div>
        </div>
      </div>
    </div>
  );
}
