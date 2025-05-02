import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
export default function NoticeDetailPage() {
  const noticeData = {
    title: '2025년 다마뮤 투어 공지합니다',
    writer: '이중재',
    date: '2024-11-15',
    category: '목록',
    content: {
      programName: '필리핀 코론 Coron',
      subTitle: '수중 프로필 다이빙 투어',
      period: '투어 기간: 2025.01.10(금)~01.17(금)',
      description: '전문강사, 전문 수중촬영작가와 함께 떠나는 다이빙 투어!',
      withText: 'with 멤버쉽(회), 고릴라(강사), 노블룩 고릭',
    },
  };

  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center">
      <div className="relative flex h-[600px] w-full items-center justify-center">
        <Image src={'/notification/notification.png'} alt="scuberdiving" fill className="object-cover" />
        <div className="absolute bottom-[40%] left-[30%] flex flex-col gap-y-2">
          <div className="text-[24px] font-medium text-white">공지사항</div>
          <div className="text-[50px] font-bold text-white">
            <p>다양한 BADIVE 정보와</p>
            <p>새로운 소식을 만나보세요.</p>
          </div>
        </div>
      </div>
      <div className="my-24 flex h-full w-[calc(1320/1920*100%)] flex-col items-center justify-center gap-y-5">
        <div className="mx-auto w-full p-4">
          {/* 공지사항 카드 */}
          <div className="overflow-hidden border-b border-gray-500 bg-white">
            {/* 헤더 섹션 */}
            <div>
              <div className="border-b border-t border-gray-500 p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <h1 className="text-3xl font-bold">{noticeData.title}</h1>
                  </div>
                  <div className="flex items-center justify-between text-3xl text-gray-500">
                    <span>작성자: {noticeData.writer}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end text-[32px] text-[#777777]">작성일: {noticeData.date}</div>
            </div>

            {/* 콘텐츠 섹션 */}
            <div className="p-6">
              <div className="relative">
                <div className="mb-6 aspect-video overflow-hidden rounded-lg bg-gradient-to-b from-blue-900 to-blue-700">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                    <h2 className="mb-4 text-3xl font-bold">{noticeData.content.programName}</h2>
                    <h3 className="mb-6 text-xl">{noticeData.content.subTitle}</h3>
                    <p className="mb-4">{noticeData.content.period}</p>
                    <p className="mb-2">{noticeData.content.description}</p>
                    <p className="text-sm">{noticeData.content.withText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="mt-12">
            <Link href="/community/notification">
              <button className="h-[100px] w-[10%] rounded bg-gray-200 text-3xl transition-colors hover:bg-gray-300">{noticeData.category}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
