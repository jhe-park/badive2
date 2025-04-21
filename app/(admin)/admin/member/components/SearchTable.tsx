'use client';

import {
  Button,
  Input,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import React from 'react';

import { createClient, createTypedSupabaseClient } from '@/utils/supabase/client';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchTable() {
  const [selectedSort, setSelectedSort] = useState('name');
  const [member, setMember] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [noMember, setNoMember] = useState(0);
  const router = useRouter();

  const pageSize = 10;

  const supabase = createTypedSupabaseClient();

  const fetchMember = async searchTerm => {
    // { count: 'exact' }

    let query = supabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .range((page - 1) * pageSize, page * pageSize - 1)
      // .in('role', [ 'client', null])
      .or('role.eq.client,role.is.null') // OR 조건으로 role='client' 또는 role IS NULL
      .eq('bye', false);
    // .not('role', 'eq', 'master')
    // .not('role', 'eq', 'expert')
    // .neq('role', 'master')
    // .neq('role', 'expert')

    // .eq('role', 'client')

    // if (typeof searchTerm === 'string' && searchTerm.trim().length > 0) {
    //   query = query.ilike(selectedSort, `%${searchTerm.trim()}%`);
    // }

    const { data, error, count } = await query;

    console.log('data');
    console.log(data);

    console.log('count');
    console.log(count);

    if (error) {
      console.log('Error fetching instructor:', error);
    } else {
      setNoMember(count);
      const numberedData = data.map((item, index) => ({
        ...item,
        no: (page - 1) * pageSize + index + 1,
      }));

      // member의 id 리스트 생성
      const memberIds = data.map(member => member.id);

      // reservation 테이블에서 해당 member들의 예약 정보 조회
      const { data: reservationData, error: reservationError } = await supabase.from('reservation').select('*').in('user_id', memberIds);

      if (reservationError) {
        console.log('Error fetching reservations:', reservationError);
      } else {
        // 각 사용자별 amount 합계 계산 (취소완료 제외)
        const userTotalAmounts = reservationData.reduce((acc, reservation) => {
          const userId = reservation.user_id;
          // status가 '취소완료'가 아닌 경우에만 합산
          if (reservation.status !== '취소완료') {
            acc[userId] = (acc[userId] || 0) + (reservation.amount || 0);
          }
          return acc;
        }, {});

        // profiles 데이터에 payment 정보 추가
        const dataWithPayments = numberedData.map(profile => ({
          ...profile,
          payment: userTotalAmounts[profile.id] || 0,
        }));

        setMember(dataWithPayments);
        setReservations(reservationData);
      }

      setTotal(Math.ceil(count / pageSize));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce(searchTerm => {
      fetchMember(searchTerm);
    }, 500);

    debouncedFetch(search);

    return () => {
      debouncedFetch.cancel();
    };
  }, [search]);

  useEffect(() => {
    fetchMember(search);
  }, [page, pageSize, selectedSort]);

  console.log('total:', total);
  console.log('member:', member);
  console.log('selectedSort:', selectedSort);
  console.log('member:', member);
  return (
    <>
      <div className="flex w-full flex-col gap-4 px-4 md:flex-row">
        <Input isDisabled label="총회원수" value={noMember as any}></Input>
        <Input placeholder="검색어를 입력해주세요" label="검색" value={search} onChange={e => setSearch(e.target.value)} endContent={<FaSearch />}></Input>
        <Select label="검색기준" selectedKeys={[selectedSort]} onChange={e => setSelectedSort(e.target.value)}>
          <SelectItem className="text-medium" value="name" key="name">
            이름
          </SelectItem>
          <SelectItem className="text-medium" value="birth" key="classWant">
            희망강습
          </SelectItem>
          <SelectItem className="text-medium" value="region" key="email">
            아이디
          </SelectItem>
          <SelectItem className="text-medium" value="gender" key="birth">
            생년월일
          </SelectItem>
          <SelectItem className="text-medium" value="phone" key="gender">
            성별
          </SelectItem>
          <SelectItem className="text-medium" value="region" key="region">
            지역
          </SelectItem>
          <SelectItem className="text-medium" value="phone" key="phone">
            연락처
          </SelectItem>
        </Select>
      </div>
      <div className="flex w-full flex-col gap-4">
        <Table aria-label="Example table with dynamic content" shadow="none">
          <TableHeader>
            <TableColumn key="no" className="w-1/10 text-center">
              NO.
            </TableColumn>
            <TableColumn key="name" className="w-1/10 text-center">
              이름
            </TableColumn>
            <TableColumn key="lesson" className="w-1/10 text-center">
              희망강습
            </TableColumn>
            <TableColumn key="email" className="w-1/10 text-center">
              아이디
            </TableColumn>
            <TableColumn key="birth" className="w-1/10 text-center">
              생년월일
            </TableColumn>
            <TableColumn key="gender" className="w-1/10 text-center">
              성별
            </TableColumn>
            <TableColumn key="region" className="w-1/10 text-center">
              지역
            </TableColumn>
            <TableColumn key="phone" className="w-1/10 text-center">
              연락처
            </TableColumn>
            <TableColumn key="payment" className="w-1/10 text-center">
              결제금액
            </TableColumn>
            <TableColumn key="note" className="w-1/10 text-center">
              비고
            </TableColumn>
          </TableHeader>
          <TableBody items={member} isLoading={isLoading} loadingContent={<Spinner label="로딩중" className="text-xl" />}>
            {item => (
              <TableRow className="" key={item?.no}>
                <TableCell className="whitespace-nowrap text-center">{item.no}</TableCell>
                <TableCell className="whitespace-nowrap text-center">{item.name}</TableCell>
                <TableCell className="whitespace-nowrap text-center">
                  <div className="select-wrapper" onClick={e => e.stopPropagation()}>
                    <Popover placement="bottom" showArrow={true}>
                      <PopoverTrigger>
                        <Button variant="bordered" className="w-full">
                          {item.classWant1 || '-'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">희망 강습 목록</div>
                          <div className="flex flex-col gap-1 text-tiny">
                            <div>1순위: {item.classWant1 || '-'}</div>
                            <div>2순위: {item.classWant2 || '-'}</div>
                            <div>3순위: {item.classWant3 || '-'}</div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap text-center">{item.email}</TableCell>
                <TableCell className="whitespace-nowrap text-center">{item.birth}</TableCell>
                <TableCell className="whitespace-nowrap text-center">
                  {item.gender === 'female' ? '여자' : item.gender === 'male' ? '남자' : item.gender}
                </TableCell>
                <TableCell className="whitespace-nowrap text-center">{item.region}</TableCell>
                <TableCell className="whitespace-nowrap text-center">{item.phone}</TableCell>
                <TableCell className="whitespace-nowrap text-center">{item.payment}</TableCell>
                <TableCell className="whitespace-nowrap text-center">
                  <Button
                    onPress={() => {
                      router.push(`/admin/member/${item.id}`);
                    }}
                    color="primary"
                    className="w-full"
                  >
                    비고
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-center">
          <Pagination
            onChange={newPage => {
              // console.log('e');
              // console.log(newPage);
              setPage(newPage);
            }}
            initialPage={1}
            page={page}
            total={total}
          />
        </div>
      </div>
    </>
  );
}
