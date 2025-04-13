'use client';

import { createClient } from '@/utils/supabase/client';
import { Button, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchTable() {
  const router = useRouter();
  const supabase = createClient();
  const [submitList, setSubmitList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('name');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getSubmitList = async () => {
    setIsLoading(true);
    try {
      let query = supabase.from('requestInstructor').select('*', { count: 'exact' }).order('created_at', { ascending: false });

      // 검색어가 있을 경우 필터 적용
      if (search && search.trim() !== '') {
        // 선택된 필터에 따라 다른 검색 조건 적용
        if (selectedFilter === 'name') {
          query = query.ilike('name', `%${search}%`);
        } else if (selectedFilter === 'birth') {
          query = query.ilike('birth', `%${search}%`);
        } else if (selectedFilter === 'region') {
          query = query.ilike('region', `%${search}%`);
        } else if (selectedFilter === 'gender') {
          query = query.ilike('gender', `%${search}%`);
        } else if (selectedFilter === 'phone') {
          query = query.ilike('phone', `%${search}%`);
        }
      }

      // 페이지네이션 적용
      const { data, error, count } = await query.range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

      if (error) {
        console.error('데이터 로드 중 오류 발생:', error);
        return;
      }

      setSubmitList(data || []);
      // 전체 페이지 수 계산
      setTotal(Math.ceil(count / itemsPerPage));
    } catch (error) {
      console.error('데이터 로드 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // debounce 적용된 검색 함수
  const debouncedSearch = useCallback(
    debounce(() => {
      getSubmitList();
    }, 500),
    [search, selectedFilter, page],
  );

  useEffect(() => {
    debouncedSearch();
    // 컴포넌트 언마운트 시 debounce 취소
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch, page]);

  const handlePageChange = page => {
    setPage(page);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="검색어를 입력해주세요" label="검색" endContent={<FaSearch />}></Input>
        <Select label="검색기준" selectedKeys={[selectedFilter]} onChange={e => setSelectedFilter(e.target.value)}>
          <SelectItem className="text-medium" value="name" key="name">
            이름
          </SelectItem>
          <SelectItem className="text-medium" value="birth" key="birth">
            생년월일
          </SelectItem>
          <SelectItem className="text-medium" value="region" key="region">
            지역
          </SelectItem>
          <SelectItem className="text-medium" value="gender" key="gender">
            성별
          </SelectItem>
          <SelectItem className="text-medium" value="phone" key="phone">
            연락처
          </SelectItem>
        </Select>
      </div>
      <Table aria-label="Example table with dynamic content" shadow="none">
        <TableHeader>
          <TableColumn key="name" className="text-center">
            이름
          </TableColumn>
          <TableColumn key="birth" className="text-center">
            생년월일
          </TableColumn>
          <TableColumn key="region" className="text-center">
            지역
          </TableColumn>
          <TableColumn key="gender" className="text-center">
            성별
          </TableColumn>
          <TableColumn key="phone" className="text-center">
            연락처
          </TableColumn>
          <TableColumn key="etc" className="text-center">
            관리
          </TableColumn>
        </TableHeader>
        <TableBody isLoading={isLoading} loadingContent={<Spinner label="로딩중" className="text-xl" />}>
          {submitList.map(item => (
            <TableRow key={item.id}>
              <TableCell className="text-center whitespace-nowrap">{item.name}</TableCell>
              <TableCell className="text-center whitespace-nowrap">{item.birth}</TableCell>
              <TableCell className="text-center whitespace-nowrap">{item.region}</TableCell>
              <TableCell className="text-center whitespace-nowrap">{item.gender}</TableCell>
              <TableCell className="text-center whitespace-nowrap">{item.phone}</TableCell>

              <TableCell className="text-center whitespace-nowrap">
                <Button color="primary" onPress={() => router.push(`/admin/instructor/submitlist/${item.id}`)}>
                  자세히 보기
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center ">
        <Pagination page={page} total={total || 1} initialPage={1} onChange={handlePageChange} />
      </div>
    </div>
  );
}
