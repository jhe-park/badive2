'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { TextFadeInAnimation } from './TextFadeInAnimation';

type TProps = {
  imgSrc: string;
  children: React.ReactNode;
  title: string;
  imagePosition: 'LEFT' | 'RIGHT';
};

export const ImgAndDescription: React.FC<TProps> = ({ children, imgSrc, title, imagePosition }) => {
  const router = useRouter();
  return (
    <div
      style={{}}
      className={cn('flex flex-col items-center justify-center sm:flex-col md:flex-row md:gap-20', imagePosition === 'RIGHT' && 'flex-col md:flex-row-reverse')}
    >
      <TextFadeInAnimation direction={imagePosition === 'RIGHT' ? 'LEFT' : 'RIGHT'} className={imagePosition === 'LEFT' ? 'flex justify-center' : ''}>
        <img
          src={imgSrc}
          className="h-[350px] w-[350px] rounded-full object-cover sm:h-[450px] sm:w-[450px] md:mx-12 md:h-[526px] md:w-[526px]"
          alt={'바다이브 이미지'}
        />
        {/* <div className=""></div> */}
      </TextFadeInAnimation>
      <TextFadeInAnimation direction={imagePosition === 'RIGHT' ? 'RIGHT' : 'LEFT'} className="">
        <div className="">
          <div className="py-12 text-center font-freesentation text-[25px] sm:text-[30px] md:text-[40px]">{title}</div>
          <div
            style={{
              lineHeight: '1.9',
            }}
            className="line-hei flex flex-col items-center text-center font-freesentation500 text-[16px] text-[#424242] sm:text-[20px] md:text-[25px]"
          >
            {children}
          </div>
        </div>
      </TextFadeInAnimation>
    </div>
  );
};
