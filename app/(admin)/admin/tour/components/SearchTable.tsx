'use client';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { Button, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { LuCirclePlus } from 'react-icons/lu';

export default function SearchTable() {
  const [selectedFilter, setSelectedFilter] = useState('title');
  const [faq, setFaq] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [search, setSearch] = useState('');

  const pageSize = 5;

  const supabase = createTypedSupabaseClient();

  useEffect(() => {
    const fetchFaq = debounce(async () => {
      let query = supabase
        .from('tour')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (search) {
        query = query.or(`${selectedFilter}.ilike.%${search}%`);
      }

      const { data, error, count } = await query;

      if (error) {
        console.log('Error fetching faq:', error);
      } else {
        setFaq(data);
        setTotal(Math.ceil(count / pageSize));
        setIsLoading(false);
      }
    }, 500); // 0.5초 지연

    fetchFaq();
  }, [page, pageSize, search, selectedFilter]);

  return (
    <>
      <div className="mt-6 flex w-full flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <Button
          className="h-full w-full bg-primary text-lg text-white md:w-1/4"
          startContent={<LuCirclePlus className="text-xl text-white" />}
          onPress={() => router.push('/admin/tour/new')}
        >
          투어 등록
        </Button>
        <Button
          className="h-full w-full bg-primary text-lg text-white md:w-1/4"
          startContent={<LuCirclePlus className="text-xl text-white" />}
          onPress={() => router.push('/admin/tour/submitlist')}
        >
          투어 신청 내역
        </Button>
        <Input placeholder="검색어를 입력해주세요" label="검색" endContent={<FaSearch />} onChange={e => setSearch(e.target.value)} value={search}></Input>
        <Select label="검색기준" selectedKeys={[selectedFilter]} onChange={e => setSelectedFilter(e.target.value)}>
          <SelectItem className="text-medium" value="title" key="title">
            제목
          </SelectItem>
          <SelectItem className="text-medium" value="region" key="region">
            지역
          </SelectItem>
          <SelectItem className="text-medium" value="date" key="date">
            날짜
          </SelectItem>
          <SelectItem className="text-medium" value="status" key="status">
            상태
          </SelectItem>
        </Select>
      </div>
      <div className="flex w-full flex-col gap-4">
        {isLoading ? (
          <div className="my-12 flex h-full items-center justify-center">
            <Spinner label="로딩중" className="text-xl" />
          </div>
        ) : (
          <>
            <Table aria-label="Example table with dynamic content" shadow="none">
              <TableHeader>
                <TableColumn key="no" className="w-1/6 text-center">
                  No.
                </TableColumn>
                <TableColumn key="image" className="w-1/6 text-center">
                  제목
                </TableColumn>
                <TableColumn key="region" className="w-1/6 text-center">
                  지역
                </TableColumn>

                <TableColumn key="date" className="w-1/6 text-center">
                  날짜
                </TableColumn>
                <TableColumn key="status" className="w-1/6 text-center">
                  상태
                </TableColumn>
                <TableColumn key="manage" className="w-1/6 text-center">
                  관리
                </TableColumn>
              </TableHeader>
              <TableBody loadingContent={<Spinner label="로딩중" className="text-xl" />}>
                {faq.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="whitespace-nowrap text-center">{index + 1}</TableCell>
                    <TableCell className="whitespace-nowrap text-center">{item.title}</TableCell>
                    <TableCell className="whitespace-nowrap text-center">{item.region}</TableCell>

                    <TableCell className="whitespace-nowrap text-center">{item.date}</TableCell>
                    <TableCell className="whitespace-nowrap text-center">{item.status}</TableCell>
                    <TableCell className="whitespace-nowrap text-center">
                      <Button color="primary" onPress={() => router.push(`/admin/tour/${item.id}`)}>
                        수정
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-center">
              <Pagination initialPage={1} page={page} total={total} onChange={e => setPage(e)} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

function removeImgTags(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const images = doc.querySelectorAll('img');
  images.forEach(img => img.remove());
  return doc.body.innerHTML;
}
