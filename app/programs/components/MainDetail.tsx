import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function MainDetail({ data }) {
  return (
    <>
      <div className="mt-7 flex h-full w-full flex-col items-center justify-center text-center text-[64px] font-bold md:mt-0 md:aspect-[768/446] md:flex-row xl:aspect-[1280/714] xl:max-w-[1280px] lg:mt-7">
        <div className="flex w-full flex-col items-center justify-center gap-y-10 md:w-1/2">
          <div className="relative aspect-[300/250] w-full max-w-[300px] xl:aspect-[500/400] xl:max-w-[500px]">
            <Image className="rounded-3xl" src={data.image} alt="frame" fill />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-y-5">
            <div className="text-[28px] font-bold text-[#0053C9] underline decoration-2 underline-offset-8 md:text-[35px] xl:text-[50px]">{data.subtitle}</div>
            <div className="text-[18px] font-medium xl:text-[32px]">{data.description}</div>
            {/* <div className="text-[28px] font-bold text-[#0053C9] underline decoration-2 underline-offset-8 md:text-[35px] xl:text-[50px]">{data.subtitle}</div> */}
            {/* <div className="text-[18px] font-medium xl:text-[36px]">{data.description}</div> */}
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
            <div dangerouslySetInnerHTML={{ __html: data.condition }} className="text-right text-[12px] font-medium text-[#7A7A7A] md:text-[20px]"></div>
          </div>
        </div>
      </div>
      <div
        // grid-cols-1 md:grid-cols-2 items-center
        className="flex w-full flex-wrap justify-center gap-6 px-4 pb-24 sm:px-12 md:gap-6 md:px-0 md:pt-12 xl:max-w-[1280px]"
        // style={{
        //   justifyItems: 'center',
        // }}
      >
        {data?.price?.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                borderColor: typeof item.borderColor === 'string' ? item.borderColor : 'black',
              }}
              className={cn(
                // md:w-full
                'w-full rounded-3xl border-1 border-solid px-4 py-4 sm:w-full sm:px-12 md:w-[48%] md:py-8',
                // sm:w-[40%]
                typeof item.discountPrice === 'number' && 'sm:px-6 md:px-2',
                typeof item.discountPrice !== 'number' && 'sm:w-[80%] sm:px-12 md:px-8',
              )}
            >
              <div
                className={cn(
                  'w-full items-center text-[20px] sm:grid sm:justify-between sm:text-[30px] md:text-[36px]',
                  typeof item.discountPrice === 'number' && 'sm:grid-cols-[2fr_1fr_1.8fr] sm:py-4 md:py-0',
                  typeof item.discountPrice !== 'number' && 'sm:grid-cols-[60%_40%]',
                )}
              >
                {/* <div className="text-center sm:text-left">{item.title}</div> */}
                {item.discountPrice == null && (
                  <>
                    <div className="text-center sm:text-left">{item.title}</div>
                    <div className="text-center sm:text-right">
                      {typeof item.originalPrice === 'number' ? `${item.originalPrice.toLocaleString()}원` : '준비중'}
                    </div>
                  </>
                )}
                {item.discountPrice && (
                  <>
                    <div className="text-center sm:text-left md:text-center">{item.title}</div>
                    <div className="text-center text-[16px] line-through decoration-[#FF0000] sm:text-right sm:text-[20px]">
                      {item.originalPrice.toLocaleString()}
                    </div>
                    <div className="text-center text-[#FF0000] sm:text-center md:text-right">{item.discountPrice.toLocaleString()}원</div>
                  </>
                )}
              </div>
              {item.description && <div className="text-center text-[14px] text-[#8C8C8C]">※ {item.description}</div>}
            </div>
          );
        })}
      </div>
    </>
  );
}
