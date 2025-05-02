'use client';

import Image from 'next/image';

export const ContactToCompany: React.FC = ({}) => {
  return (
    <div className="relative flex h-full w-full items-center justify-center md:h-[300px]">
      {/* z-10 */}
      <Image src={'/inquiries/inquiriesBottom.png'} alt="scuberdiving" fill className="object-cover" />
      {/* z-20 */}
      <div className="z-10 flex h-2/3 w-[calc(1520/1920*100%)] flex-col items-center justify-center gap-x-6 gap-y-6 py-6 md:flex-row md:py-0">
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-2 bg-white py-2 md:w-1/3 md:py-0">
          <div className="relative h-12 w-12 md:h-24 md:w-24">
            {/* z-10 */}
            <Image src={'/inquiries/kakao.png'} alt="scuberdiving" fill className="object-cover" />
          </div>
          <div className="text-sm font-bold md:text-2xl">바다이브 카카오톡 채널 : @바다이브</div>
          <div className="text-xs md:text-xl">평일 문의/상담: 9:00~18:00 </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-2 bg-white py-2 md:w-1/3 md:py-0">
          <div className="relative h-12 w-12 md:h-24 md:w-24">
            {/* z-10 */}
            <Image src={'/inquiries/phone.png'} alt="scuberdiving" fill className="object-cover" />
          </div>
          <div className="text-sm font-bold md:text-2xl">바다이브 문의 전화번호</div>
          <div className="text-xs md:text-xl">02-6953-4432</div>
        </div>
      </div>
    </div>
  );
};
