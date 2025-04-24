import { createClient } from '@/utils/supabase/server';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import Description from './components/Description';
export default async function NoticeDetailPage({ params }) {
  const { id: postingId } = await params;

  const supabase = await createClient();
  const { data: noticeData, error } = await supabase.from('notification').select('*').eq('id', postingId).single();
  if (error) {
    console.error('Error fetching notice data:', error);
  }

  const formatDate = date => {
    return format(new Date(date), 'yyyy-MM-dd');
  };
  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center">
      <div className="relative flex h-[40vh] w-full items-center justify-center lg:aspect-[1920/600] lg:h-auto">
        <Image src={'/notification/notification.png'} alt="scuberdiving" fill className="object-cover" />
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-y-4">
          <div className="text-medium font-medium text-white md:text-[24px]">공지사항</div>
          <div className="w-full text-center text-medium font-bold text-white md:text-left md:text-[50px]" style={{ lineHeight: '1.5' }}>
            <p className="text-center">다양한 BADIVE 정보와</p>
            <p className="text-center">새로운 소식을 만나보세요.</p>
          </div>
        </div>
      </div>
      <div className="my-12 flex h-full w-[90%] flex-col items-center justify-center gap-y-5 md:my-24 md:max-w-[1280px]">
        <div className="mx-auto w-full p-4">
          {/* 공지사항 카드 */}
          <div className="overflow-hidden border-b border-gray-500 bg-white">
            {/* 헤더 섹션 */}
            <div>
              <div className="border-b border-t border-gray-500 p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <h1 className="text-2xl font-bold md:text-3xl">{noticeData.title}</h1>
                  </div>
                  <div className="flex items-center justify-between text-3xl text-gray-500">
                    <span className="text-sm md:text-lg">작성자: {noticeData.writer}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end text-sm text-[#777777] md:text-lg">작성일: {formatDate(noticeData.created_at)}</div>
            </div>

            {/* 콘텐츠 섹션 */}
            <Description noticeData={noticeData} />
          </div>

          {/* 하단 버튼 */}
          <div className="mt-6 md:mt-12">
            <Link href="/community/notification">
              <button className="h-12 w-[30%] rounded bg-gray-200 text-lg transition-colors hover:bg-gray-300 md:h-16 md:w-[20%] md:text-3xl">목록</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
