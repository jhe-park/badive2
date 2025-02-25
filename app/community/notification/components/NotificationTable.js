"use client";
import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { LuChevronsRight, LuChevronsLeft } from "react-icons/lu";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import Link from "next/link";
import { Pagination } from "@heroui/react";
import { useEffect, useState } from "react";
import { Spinner, Skeleton,Input } from "@heroui/react";
import { createClient } from "@/utils/supabase/client";
import { debounce } from "lodash";
import { FcSearch } from "react-icons/fc";
import { format } from "date-fns";

function formatDate(timestamp) {
  return format(new Date(timestamp), "yyyy-MM-dd");
}

export default function NotificationTable() {
  const [posts, setPosts] = useState([]);
  const [pinnedPosts, setPinnedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  
  const supabase = createClient();
  useEffect(() => {
    const fetchPosts = debounce(async () => {
      let query = supabase
        .from("notification")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .neq("pinned", "pinned")
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (search) {
        query = query.ilike("title", `%${search}%`);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
        setTotal(count);
        setIsLoading(false);
        setTotal(Math.ceil(count / pageSize));
      }
    }, 500);

    fetchPosts();
  }, [page, pageSize, search]);

  useEffect(() => {
    const fetchPinnedPosts = debounce(async () => {
      const { data, error, count } = await supabase
        .from("notification")
        .select("*", { count: "exact" })
        .eq("pinned", "pinned")
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) {
        console.log("Error fetching pinned posts:", error);
      } else {
        setPinnedPosts(data);
      }
    }, 500);
    fetchPinnedPosts();
  }, []);
  console.log("posts", posts);
  return (
    <div className="w-full mx-auto  my-12">
      {/* Search Bar */}
      <div className="mb-6 flex justify-end items-center">
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="w-full p-2 "
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            endContent={<FcSearch className="text-2xl" />}
          />
        </div>
      </div>

      {/* Board Table */}
      <table className="w-full border-t-2 border-gray-800 text-sm md:text-xl">
        <thead>
          <tr className="bg-gray-50 ">
            <th className="py-2 px-4 text-left w-[10%]">NO.</th>
            <th className="py-2 px-4 text-left w-[75%]">내용</th>
            <th className="py-2 px-4 text-left w-[15%] ">작성일</th>
          </tr>
        </thead>
        <tbody className="text-xl md:text-2xl ">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 ">
                  <td className="py-3 px-4">
                    <Skeleton className="w-full h-6" />
                  </td>
                  <td className="py-3 px-4">
                    <Skeleton className="w-full h-6" />
                  </td>
                  <td className="py-3 px-4">
                    <Skeleton className="w-full h-6" />
                  </td>
                </tr>
              ))
            : pinnedPosts.map((post) => (
                <tr key={post.id} className="border-b hover:bg-gray-50 text-xl ">
                  <td className="py-3 px-4">
                    <span className="text-blue-500">📌</span>
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/community/notification/${post.id}`}
                      className="hover:text-blue-600 text-sm md:text-xl"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm md:text-xl">
                    {formatDate(post.created_at)}
                  </td>
                </tr>
              ))}
          {!isLoading &&
            posts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50 ">
                <td className="py-3 px-4">{post.id}</td>
                <td className="py-3 px-4">
                  <Link
                    href={`/community/notification/${post.id}`}
                    className="hover:text-blue-600 text-sm md:text-xl"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="py-3 px-4 text-gray-600 text-sm md:text-xl">
                  {formatDate(post.created_at)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination */}
      {!isLoading && (
        <div className="flex justify-center mt-6 w-full">
          <Pagination
            initialPage={1}
            page={page}
            total={total}
            onChange={(page) => setPage(page)}
          />
        </div>
      )}
    </div>
  );
}
