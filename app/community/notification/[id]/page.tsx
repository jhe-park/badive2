import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import Description from "./components/Description";
export default async function NoticeDetailPage({ params }) {
  const { id: postingId } = await params;

  const supabase = await createClient();
  const { data: noticeData, error } = await supabase
    .from("notification")
    .select("*")
    .eq("id", postingId)
    .single();
  if (error) {
    console.error("Error fetching notice data:", error);
  }

  // const noticeData = {
  //   title: "2025년 다마뮤 투어 공지합니다",
  //   writer: "이중재",
  //   date: "2024-11-15",
  //   category: "목록",
  //   content: {
  //     programName: "필리핀 코론 Coron",
  //     subTitle: "수중 프로필 다이빙 투어",
  //     period: "투어 기간: 2025.01.10(금)~01.17(금)",
  //     description: "전문강사, 전문 수중촬영작가와 함께 떠나는 다이빙 투어!",
  //     withText: "with 멤버쉽(회), 고릴라(강사), 노블룩 고릭",
  //   },
  // };
  const formatDate = (date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[40vh]  lg:h-auto lg:aspect-[1920/600] flex items-center justify-center relative">
        <Image
          src={"/notification/notification.png"}
          alt="scuberdiving"
          fill
          className="object-cover"
        />
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-4 relative">
          <div className="text-medium md:text-[24px] font-medium text-white">
            공지사항
          </div>
          <div
            className="text-medium md:text-[50px] text-white font-bold text-center md:text-left w-full"
            style={{ lineHeight: "1.5" }}
          >
            <p className="text-center">다양한 BADIVE 정보와</p>
            <p className="text-center">새로운 소식을 만나보세요.</p>
          </div>
        </div>
      </div>
      <div className="w-[90%] md:max-w-[1280px] h-full  flex flex-col items-center justify-center gap-y-5 my-12 md:my-24">
        <div className="w-full mx-auto p-4">
          {/* 공지사항 카드 */}
          <div className="bg-white  overflow-hidden border-b border-gray-500">
            {/* 헤더 섹션 */}
            <div>
              <div className="p-6 border-b border-t border-gray-500">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <h1 className="text-2xl md:text-3xl font-bold">
                      {noticeData.title}
                    </h1>
                  </div>
                  <div className="flex justify-between items-center text-3xl text-gray-500">
                    <span className="text-sm md:text-lg">
                      작성자: {noticeData.writer}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-2 text-sm md:text-lg text-[#777777]">
                작성일: {formatDate(noticeData.created_at)}
              </div>
            </div>

            {/* 콘텐츠 섹션 */}
            <Description noticeData={noticeData} />
          </div>

          {/* 하단 버튼 */}
          <div className="mt-6 md:mt-12">
            <Link href="/community/notification">
              <button className="w-[30%] md:w-[20%] h-12 md:h-16 text-lg md:text-3xl bg-gray-200 rounded hover:bg-gray-300 transition-colors ">
                목록
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
