'use client';

import { NOTIFICATION_PAGE_SIZE } from '@/constants/constants';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { Input, Pagination, Skeleton } from '@heroui/react';
import { format } from 'date-fns';
import { debounce, throttle } from 'lodash';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FcSearch } from 'react-icons/fc';

function formatDate(timestamp) {
  return format(new Date(timestamp), 'yyyy-MM-dd');
}

export default function NotificationTable() {
  const [posts, setPosts] = useState([]);
  const [pinnedPosts, setPinnedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(NOTIFICATION_PAGE_SIZE);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  const supabase = createTypedSupabaseClient();

  const fetchPosts = useCallback(async ({ page, pageSize, search }: { search: string; page: number; pageSize: number }) => {
    let query = supabase
      .from('notification')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .neq('pinned', 'pinned')
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
      setTotal(count);
      setIsLoading(false);
      setTotal(Math.ceil(count / pageSize));
    }
  }, []);

  useEffect(() => {
    fetchPosts({ page, pageSize, search });
  }, [page, pageSize]);

  useEffect(() => {
    const debounced = debounce(() => {
      console.debug('🐞디바운스');
      fetchPosts({ page, pageSize, search });
    }, 500);

    debounced();

    return () => {
      debounced.cancel();
    };
  }, [search]);

  useEffect(() => {
    const fetchPinnedPosts = debounce(async () => {
      const { data, error, count } = await supabase
        .from('notification')
        .select('*', { count: 'exact' })
        .eq('pinned', 'pinned')
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) {
        console.log('Error fetching pinned posts:', error);
      } else {
        setPinnedPosts(data);
      }
    }, 500);
    fetchPinnedPosts();
  }, []);

  return (
    <div className="mx-auto my-12 w-full">
      {/* Search Bar */}
      <div className="mb-6 flex items-center justify-end">
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="w-full p-2"
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
            value={search}
            endContent={<FcSearch className="text-2xl" />}
          />
        </div>
      </div>

      {/* Board Table */}
      <table className="w-full border-t-2 border-gray-800 text-sm md:text-xl">
        <thead>
          <tr className="bg-gray-50">
            <th className="w-[10%] px-4 py-2 text-left">NO.</th>
            <th className="w-[75%] px-4 py-2 text-left">내용</th>
            <th className="w-[15%] px-4 py-2 text-left">작성일</th>
          </tr>
        </thead>
        <tbody className="text-xl md:text-2xl">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Skeleton className="h-6 w-full" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-6 w-full" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-6 w-full" />
                  </td>
                </tr>
              ))
            : pinnedPosts.map(post => (
                <tr key={post.id} className="border-b text-xl hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-blue-500">📌</span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/community/notification/${post.id}`} className="text-sm hover:text-blue-600 md:text-xl">
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 md:text-xl">{formatDate(post.created_at)}</td>
                </tr>
              ))}
          {!isLoading &&
            posts.map((post, index) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{(page - 1) * pageSize + (posts.length - index)}</td>
                <td className="px-4 py-3">
                  <Link href={`/community/notification/${post.id}`} className="text-sm hover:text-blue-600 md:text-xl">
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 md:text-xl">{formatDate(post.created_at)}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination */}
      {!isLoading && (
        <div className="mt-6 flex w-full justify-center">
          <Pagination initialPage={1} page={page} total={total} onChange={page => setPage(page)} />
        </div>
      )}
    </div>
  );
}
