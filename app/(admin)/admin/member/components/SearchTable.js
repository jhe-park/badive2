"use client";
import React from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import { LuCirclePlus } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { debounce } from 'lodash';
export default function SearchTable() {
  const [selectedSort, setSelectedSort] = useState("name");
  const [member, setMember] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const router = useRouter();

  const pageSize = 10;

  const supabase = createClient();

  const fetchMember = async (searchTerm) => {
    let query = supabase
      .from("profiles")
      .select("*", { count: "exact" })
      .range((page - 1) * pageSize, page * pageSize - 1)
      .eq("role", "client");

    if (searchTerm) {
      query = query.ilike(selectedSort, `%${searchTerm}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.log("Error fetching instructor:", error);
    } else {
      const numberedData = data.map((item, index) => ({
        ...item,
        no: (page - 1) * pageSize + index + 1
      }));

      // member의 id 리스트 생성
      const memberIds = data.map(member => member.id);
      
      // reservation 테이블에서 해당 member들의 예약 정보 조회
      const { data: reservationData, error: reservationError } = await supabase
        .from("reservation")
        .select("*")
        .in("user_id", memberIds);
        
      if (reservationError) {
        console.log("Error fetching reservations:", reservationError);
      } else {
        // 각 사용자별 amount 합계 계산
        const userTotalAmounts = reservationData.reduce((acc, reservation) => {
          const userId = reservation.user_id;
          acc[userId] = (acc[userId] || 0) + (reservation.amount || 0);
          return acc;
        }, {});

        // profiles 데이터에 payment 정보 추가
        const dataWithPayments = numberedData.map(profile => ({
          ...profile,
          payment: userTotalAmounts[profile.id] || 0
        }));

        setMember(dataWithPayments);
        setReservations(reservationData);
      }
      
      setTotal(Math.ceil(count / pageSize));
      setIsLoading(false);
    }
  };

  // 디바운스된 검색 함수 생성
  const debouncedFetch = debounce((searchTerm) => {
    fetchMember(searchTerm);
  }, 500);

  useEffect(() => {
    debouncedFetch(search);
    // 컴포넌트 언마운트 시 디바운스 취소
    return () => {
      debouncedFetch.cancel();
    };
  }, [page, pageSize, search, selectedSort]);

  console.log("total:", total);
  console.log("member:", member);
  console.log("selectedSort:", selectedSort);
  console.log('member:',member)
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full px-4 ">
        <Input isDisabled label="총회원수" value="30"></Input>
        <Input
          placeholder="검색어를 입력해주세요"
          label="검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          endContent={<FaSearch />}
        ></Input>
        <Select
          label="검색기준"
          selectedKeys={[selectedSort]}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
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
      <div className="flex flex-col gap-4 w-full">
        <Table aria-label="Example table with dynamic content" shadow="none">
          <TableHeader>
            <TableColumn key="no" className="text-center w-1/10">
              NO.
            </TableColumn>
            <TableColumn key="name" className="text-center w-1/10">
              이름
            </TableColumn>
            <TableColumn key="lesson" className="text-center w-1/10">
              희망강습
            </TableColumn>
            <TableColumn key="email" className="text-center w-1/10">
              아이디
            </TableColumn>
            <TableColumn key="birth" className="text-center w-1/10">
              생년월일
            </TableColumn>
            <TableColumn key="gender" className="text-center w-1/10">
              성별
            </TableColumn>
            <TableColumn key="region" className="text-center w-1/10">
              지역
            </TableColumn>
            <TableColumn key="phone" className="text-center w-1/10">
              연락처
            </TableColumn>
            <TableColumn key="payment" className="text-center w-1/10">
              결제금액
            </TableColumn>
            <TableColumn key="note" className="text-center w-1/10">
              비고
            </TableColumn>
          </TableHeader>
          <TableBody
            items={member}
            isLoading={isLoading}
            loadingContent={<Spinner label="로딩중" className="text-xl" />}
          >
            {(item) => (
              <TableRow
                className=""
                key={item?.no}
              >
                <TableCell className="text-center whitespace-nowrap">
                  {item.no}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {item.name}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  <div
                    className="select-wrapper"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Popover placement="bottom" showArrow={true}>
                      <PopoverTrigger>
                        <Button variant="bordered" className="w-full">
                          {item.classWant1 || '-'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">
                            희망 강습 목록
                          </div>
                          <div className="text-tiny flex flex-col gap-1">
                            <div>1순위: {item.classWant1 || '-'}</div>
                            <div>2순위: {item.classWant2 || '-'}</div>
                            <div>3순위: {item.classWant3 || '-'}</div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {item.email}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {item.birth}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {item.gender === 'female' ? '여자' : item.gender === 'male' ? '남자' : item.gender}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {item.region}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {item.phone}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {item.payment}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  <Button onPress={() => {
                    router.push(`/admin/member/${item.id}`);
                  }} color='primary' className="w-full">
                    비고
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-center items-center ">
          <Pagination initialPage={1} page={page} total={total} />
        </div>
      </div>
    </>
  );
}
