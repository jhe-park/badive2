import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { LuChevronsRight, LuChevronsLeft } from "react-icons/lu";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import Link from "next/link";
import { Pagination } from "@heroui/react";

export default function NotificationTable() {
  const posts = [
    {
      id: "pin1",
      pinned: true,
      title: "2025년 다이빙 투어 공지 입니다",
      date: "2024-11-15",
    },
    {
      id: "pin2",
      pinned: true,
      title: "다이빙 강습 예약 안내",
      date: "2024-11-15",
    },
    {
      id: "pin3",
      pinned: true,
      title: "[이벤트] 프리한 스쿠버 다이버가 되어보세요!",
      date: "2024-11-15",
    },
    { id: 1, title: "BDN 공지사항 입니다", date: "2024-11-15" },
    { id: 2, title: "BDN 공지사항 입니다", date: "2024-11-15" },
    { id: 3, title: "BDN 공지사항 입니다", date: "2024-11-15" },
    { id: 4, title: "BDN 공지사항 입니다", date: "2024-11-15" },
    { id: 5, title: "BDN 공지사항 입니다", date: "2024-11-15" },
    { id: 6, title: "BDN 공지사항 입니다", date: "2024-11-15" },
    { id: 7, title: "BDN 공지사항 입니다", date: "2024-11-15" },
    { id: 8, title: "BDN 공지사항 입니다", date: "2024-11-15" },
  ];

  return (
    <div className="w-full mx-auto p-4 my-12">
      {/* Search Bar */}
      <div className="mb-6 flex justify-end items-center">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="w-full p-2 border rounded-md pr-10 bg-[#EBEBEB]"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            🔍
          </button>
        </div>
      </div>

      {/* Board Table */}
      <table className="w-full border-t-2 border-gray-800 text-2xl md:text-[30px]">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-2 px-4 text-left w-[10%]">NO.</th>
            <th className="py-2 px-4 text-left w-[75%]">내용</th>
            <th className="py-2 px-4 text-left w-[15%] ">작성일</th>
          </tr>
        </thead>
        <tbody className="text-2xl md:text-[30px] ">
          {posts.map((post) => (
            <tr key={post.id} className="border-b hover:bg-gray-50 ">
              <td className="py-3 px-4">
                {post.pinned ? (
                  <span className="text-blue-500">📌</span>
                ) : (
                  post.id
                )}
              </td>
              <td className="py-3 px-4">
                <Link
                  href={`/community/notification/${post.id}`}
                  className="hover:text-blue-600"
                >
                  {post.title}
                </Link>
              </td>
              <td className="py-3 px-4 text-gray-600">{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {/* <button className="px-3 py-1 border rounded hover:bg-gray-100"><HiChevronDoubleLeft className="text-4xl"/></button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100"><HiChevronLeft className="text-4xl"/></button>
        <button className="px-3 py-1 border rounded bg-blue-500 text-white text-[20px]">1</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100"><HiChevronRight className="text-4xl"/></button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100"><HiChevronDoubleRight className="text-4xl"/></button> */}
        <Pagination isCompact showControls initialPage={1} total={10} />{" "}
      </div>
    </div>
  );
}
