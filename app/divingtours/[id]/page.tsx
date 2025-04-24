import { createClient } from '@/utils/supabase/server';
import { Chip } from '@heroui/react';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegShareFromSquare } from 'react-icons/fa6';
import ReservationButton from './components/ReservationButton';
export default async function page({ params }) {
  const supabase = await createClient();
  const paramsdata = await params;
  const tour_id = paramsdata.id;
  const { data, error } = await supabase.from('tour').select('*').eq('id', tour_id).single();

  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center">
      <div className="relative flex h-[30vh] w-full items-center justify-center md:h-[800px]">
        <Image src={'/divingtour/divingtour.png'} alt="scuberdiving" fill className="object-cover" />
        <div className="absolute bottom-[40%] left-[30%] flex flex-col gap-y-2"></div>
      </div>
      <div className="my-12 flex h-full w-[90%] flex-col items-center justify-center gap-y-5 md:my-24 md:w-[66vw]">
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-5">
          <div className="flex flex-col items-center justify-center gap-x-2 gap-y-2 text-2xl font-bold md:flex-row md:gap-x-6 md:text-4xl">
            <Chip color={data.status === '마감임박' ? 'danger' : 'primary'} size="lg">
              {data.status}
            </Chip>
            <div className="text-2xl font-bold md:text-4xl">{data.title}</div>
          </div>

          <div className="text-medium font-bold text-gray-500">조회수: {data.view_count}</div>
          <div className="flex w-full items-center justify-end gap-x-2">
            <div className="flex cursor-pointer flex-col items-center justify-center gap-x-2">
              <FaRegHeart className="text-2xl text-red-500" />
              <p>좋아요</p>
            </div>
            <div className="flex cursor-pointer flex-col items-center justify-center gap-x-2">
              <FaRegShareFromSquare className="text-2xl" />
              <p>공유하기</p>
            </div>
          </div>
          <div className="flex w-full cursor-pointer flex-col items-center justify-center gap-x-2">
            <div className="w-full [&_img]:mx-auto" dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>
          <div className="md:m24 my-2 flex h-full w-1/2 items-center justify-center md:my-6 md:w-full">
            <ReservationButton tour_id={tour_id} />
          </div>
          <div className="flex flex-col items-start justify-center gap-y-2">
            <p>※ 해외 다이빙 투어는 신청서 작성 후, 담당자가 직접 개별 연락 드립니다.</p>
            <p>※ 결제는 담당자와 개별 연락 후 진행됩니다.</p>
            <p>※ 별도 문의는 @바다이브 카카오 채널로 해주시면 문의 답변이 가능합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
