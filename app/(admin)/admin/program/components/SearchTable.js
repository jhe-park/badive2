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
import { debounce } from "lodash";
import Image from "next/image";

export default function SearchTable() {
  const [selectedFilter, setSelectedFilter] = useState("title");
  const [faq, setFaq] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [programs, setPrograms] = useState([]);

  const pageSize = 5;

  const supabase = createClient();

  useEffect(() => {
    const fetchPrograms = debounce(async () => {
      let query = supabase
        .from("program")
        .select("*, instructor_id(name)", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1)
        .not('instructor_id', 'is', null)
        .eq('available', true);

      if (search) {
        if (selectedFilter === "instructor") {
          query = query.ilike('instructor_id.name', `%${search}%`)
        } else {
          query = query.or(`${selectedFilter}.ilike.%${search}%`);
        }
      }

      const { data, error, count } = await query;

      if (error) {
        console.log("Error fetching faq:", error);
      } else {
        setPrograms(data);
        setTotal(Math.ceil(count / pageSize));
        setIsLoading(false);
      }
    }, 500); // 0.5초 지연

    fetchPrograms();
  }, [page, pageSize, search, selectedFilter]);
  console.log('selectedFilter', selectedFilter)
  console.log('programs:', programs)
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full px-4 mt-6 justify-between items-center">
        <Button
          className="bg-primary w-full md:w-1/4 text-white text-lg h-full"
          startContent={<LuCirclePlus className="text-white text-xl" />}
          onPress={() => router.push("/admin/program/new")}
        >
          프로그램 등록
        </Button>
        <Input
          placeholder="검색어를 입력해주세요"
          label="검색"
          endContent={<FaSearch />}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></Input>
        <Select
          label="검색기준"
          selectedKeys={[selectedFilter]}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <SelectItem className="text-medium" value="title" key="title">
            제목
          </SelectItem>
          <SelectItem className="text-medium" value="region" key="region">
            지역
          </SelectItem>
          <SelectItem className="text-medium" value="category" key="category">
            카테고리
          </SelectItem>
          <SelectItem className="text-medium" value="instructor" key="instructor">
            강사
          </SelectItem>
          
        </Select>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-full my-12">
            <Spinner label="로딩중" className="text-xl" />
          </div>
        ) : (
          <>
          <Table aria-label="Example table with dynamic content" shadow="none" className="whitespace-nowrap overflow-x-auto">
            <TableHeader>
              <TableColumn key="no" className="text-center w-1/6">
              No.
            </TableColumn>
            <TableColumn key="image" className="text-center w-1/6">
              이미지
            </TableColumn>
            <TableColumn key="title" className="text-center w-1/6">
              제목
            </TableColumn>
            <TableColumn key="region" className="text-center w-1/6">
              지역
            </TableColumn>
            <TableColumn key="category" className="text-center w-1/6">
              카테고리
            </TableColumn>
            <TableColumn key="instructor" className="text-center w-1/6">
              강사
            </TableColumn>
            <TableColumn key="manage" className="text-center w-1/6">
              관리
            </TableColumn>
          </TableHeader>
          <TableBody
            loadingContent={<Spinner label="로딩중" className="text-xl" />}
          >
            {programs.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center whitespace-nowrap">{index + 1}</TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  <Image src={item.images} alt={item.title} width={100} height={100} />
                </TableCell>
                <TableCell className="text-center whitespace-nowrap ">{item.title}</TableCell>
                <TableCell className="text-center whitespace-nowrap">{item.region}</TableCell>
                <TableCell className="text-center whitespace-nowrap">{item.category}</TableCell>
                <TableCell className="text-center whitespace-nowrap">{item.instructor_id?.name}</TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  <Button
                    color="primary"
                    onPress={() => router.push(`/admin/program/${item.id}`)}
                  >
                    자세히 보기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>

        <div className="flex justify-center items-center ">
          <Pagination initialPage={1} page={page} total={total} onChange={(e) => setPage(e)} />
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
