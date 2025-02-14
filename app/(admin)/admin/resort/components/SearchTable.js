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
} from "@heroui/react";
import { LuCirclePlus } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
export default function SearchTable() {
  const [selectedSort, setSelectedSort] = useState("name");
  const [instructor, setInstructor] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const pageSize = 10;

  const supabase = createClient();

  useEffect(() => {
    const fetchInstructor = async () => {
      const { data, error, count } = await supabase
        .from("instructor")
        .select("*", { count: "exact" })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) {
        console.log("Error fetching instructor:", error);
      } else {
        setInstructor(data);
        setTotal(Math.ceil(count / pageSize));
        setIsLoading(false);
      }
    };
    fetchInstructor();
  }, [page, pageSize]);
  console.log("total:", total);
  console.log("instructor:", instructor);
  console.log("selectedSort:", selectedSort);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full px-4 mt-6 justify-between items-center">
        <Button
          className="bg-primary w-full md:w-1/4 text-white text-lg h-full"
          startContent={<LuCirclePlus className="text-white text-xl" />}
          onPress={() => router.push("/admin/resort/new")}
        >
          리조트 등록
        </Button>
        <Input placeholder="검색어를 입력해주세요" label='검색' endContent={<FaSearch />}></Input>
        <Select
          label="정렬기준"
          selectedKeys={[selectedSort]}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
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
      <div className="flex flex-col gap-4 w-full">
        <Table aria-label="Example table with dynamic content" shadow="none">
          <TableHeader>
            <TableColumn key="no" className="text-center w-1/7">
              No.
            </TableColumn>
            <TableColumn key="image" className="text-center w-1/7">
              이미지
            </TableColumn>
            <TableColumn key="name" className="text-center w-1/7">
              이름
            </TableColumn>
            <TableColumn key="manage" className="text-center w-1/7">
              국가/지역
            </TableColumn>
            <TableColumn key="manage" className="text-center w-1/7">
              대표자
            </TableColumn>
            <TableColumn key="manage" className="text-center w-1/7">
              협력날짜
            </TableColumn>
            <TableColumn key="manage" className="text-center w-1/7">
              관리리
            </TableColumn>
          </TableHeader>
          <TableBody
            
            
            loadingContent={<Spinner label="로딩중" className="text-xl" />}
          >
            <TableRow>
              <TableCell className="text-center">1</TableCell>
              <TableCell className="text-center">이미지</TableCell>
              <TableCell className="text-center">딥블루 리조트</TableCell>
              <TableCell className="text-center">필리핀 보틀</TableCell>
              <TableCell className="text-center">이중재</TableCell>
              <TableCell className="text-center">2024.10</TableCell>
              <TableCell className="text-center"><Button color="primary" variant='solid' onPress={() => router.push("/admin/resort/1")} >자세히보기</Button></TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
        <div className="flex justify-center items-center ">
          <Pagination initialPage={1} page={page} total={total} />
        </div>
      </div>
    </>
  );
}
