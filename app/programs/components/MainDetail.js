import React from 'react';
import Image from 'next/image';

export default function MainDetail({ data }) {
  return (
    <div className="w-full xl:max-w-[1280px] xl:aspect-[1280/714] md:aspect-[768/446] h-full flex flex-col md:flex-row items-center justify-center font-bold text-[64px] text-center lg:mt-7 md:mt-0 mt-7 ">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-y-10">
        <div className="w-full xl:max-w-[500px] xl:aspect-[500/400] max-w-[300px] aspect-[300/250]  relative">
          <Image className="rounded-3xl" src={data.image} alt="frame" fill />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-y-5 ">
          <div className="text-[28px] md:text-[35px] xl:text-[50px] font-bold text-[#0053C9] underline decoration-2 underline-offset-8">{data.subtitle}</div>
          <div className="text-[18px] xl:text-[36px] font-medium ">{data.description}</div>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-evenly gap-y-10 md:gap-y-10 py-6 ">
        <div className="flex flex-col items-start justify-evenly w-full mt-6 md:mt-0 font-medium h-full gap-y-6">
          {data.lines.map((item, index) => (
            <div key={index} className="text-[18px] md:text-[20px] xl:text-[36px] flex flex-row items-center justify-center gap-x-4 w-full">
              <img loading="lazy" src={item.image} alt="frame" className="md:w-12 md:h-12 w-10 h-10" />
              <p>
                {item.text} <span className="text-[#0077B6]">{item.highlight}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center ">
          <div className="text-[12px] md:text-[20px] text-[#7A7A7A] font-medium">{data.condition}</div>
        </div>
      </div>
    </div>
  );
}
