'use client';

import { createClient, createTypedSupabaseClient } from '@/utils/supabase/client';
import { Button, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { LuCirclePlus } from 'react-icons/lu';
import SubmitListButton from './SubmitListButton';
export default function SearchTable() {
  const [selectedSort, setSelectedSort] = useState('name');
  const [instructor, setInstructor] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const pageSize = 10;

  const supabase = createTypedSupabaseClient();

  useEffect(() => {
    const fetchInstructor = debounce(async () => {
      let query = supabase
        .from('instructor')
        .select('*', { count: 'exact' })
        .range((page - 1) * pageSize, page * pageSize - 1)
        .eq('available', true);

      if (search) {
        query = query.ilike(selectedSort, `%${search}%`);
      }

      const { data, error, count } = await query;

      if (error) {
        console.log('Error fetching instructor:', error);
      } else {
        setInstructor(data);
        setTotal(Math.ceil(count / pageSize));
        setIsLoading(false);
      }
    }, 500); // 300ms 지연 시간

    fetchInstructor();

    return () => {
      fetchInstructor.cancel();
    };
  }, [page, pageSize, search, selectedSort]);

  const handlePageChange = page => {
    setPage(page);
  };

  return (
    <>
      <div className="mt-6 flex w-full flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <Button
          className="h-full w-full bg-primary text-lg text-white md:w-1/4"
          startContent={<LuCirclePlus className="text-xl text-white" />}
          onPress={() => router.push('/admin/instructor/new')}
        >
          강사 등록
        </Button>
        <SubmitListButton></SubmitListButton>
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="검색어를 입력해주세요" label="검색" endContent={<FaSearch />}></Input>
        <Select label="검색기준" selectedKeys={[selectedSort]} onChange={e => setSelectedSort(e.target.value)}>
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
          <SelectItem className="text-medium" value="role" key="role">
            소속
          </SelectItem>
        </Select>
      </div>
      <div className="flex w-full flex-col gap-4">
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
            <TableColumn key="role" className="text-center">
              소속
            </TableColumn>
            <TableColumn key="etc" className="text-center">
              관리
            </TableColumn>
          </TableHeader>
          <TableBody isLoading={isLoading} loadingContent={<Spinner label="로딩중" className="text-xl" />}>
            {instructor.map(item => (
              <TableRow key={item.id}>
                <TableCell className="whitespace-nowrap text-center">{item.name}</TableCell>
                <TableCell className="whitespace-nowrap text-center">{item.birth}</TableCell>
                <TableCell className="whitespace-nowrap text-center">{item.region}</TableCell>
                <TableCell className="whitespace-nowrap text-center">{item.gender}</TableCell>
                <TableCell className="whitespace-nowrap text-center">{item.phone}</TableCell>
                <TableCell className="whitespace-nowrap text-center">{item.role}</TableCell>
                <TableCell className="whitespace-nowrap text-center">
                  <Button color="primary" onPress={() => router.push(`/admin/instructor/${item.id}`)}>
                    자세히 보기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-center">
          <Pagination initialPage={1} page={page} total={total} onChange={handlePageChange} />
        </div>
      </div>
    </>
  );
}
