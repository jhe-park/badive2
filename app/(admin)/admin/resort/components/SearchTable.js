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

import { useRouter } from "next/navigation";
import { debounce } from "lodash";
// import { createClient } from "@/utils/supabase/client";
import {createClient} from '@/utils/supabase/client'

export default function SearchTable() {
  const [selectedFilter, setSelectedFilter] = useState("title");
  const [faq, setFaq] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [search, setSearch] = useState("");

  const pageSize = 5;

  const supabase = createClient();

  useEffect(() => {
    const fetchFaq = debounce(async () => {
      let query = supabase
        .from("resort")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (search) {
        query = query.or(`${selectedFilter}.ilike.%${search}%`);
      }

      const { data, error, count } = await query;

      if (error) {
        console.log("Error fetching faq:", error);
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
      <div className="flex flex-col md:flex-row gap-4 w-full px-4 mt-6 justify-between items-center">
        <Button
          className="bg-primary w-full md:w-1/4 text-white text-lg h-full"
          startContent={<LuCirclePlus className="text-white text-xl" />}
          onPress={() => router.push("/admin/resort/new")}
        >
          리조트 등록
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
          <SelectItem className="text-medium" value="ceo" key="ceo">
            CEO
          </SelectItem>
          <SelectItem className="text-medium" value="date" key="date">
            날짜
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
          <Table aria-label="Example table with dynamic content" shadow="none">
            <TableHeader>
              <TableColumn key="no" className="text-center w-1/6">
              No.
            </TableColumn>
            <TableColumn key="image" className="text-center w-1/6">
              제목
            </TableColumn>
            <TableColumn key="region" className="text-center w-1/6">
              지역
            </TableColumn>
            <TableColumn key="ceo" className="text-center w-1/6">
              CEO
            </TableColumn>
            <TableColumn key="date" className="text-center w-1/6">
              날짜
            </TableColumn>
            <TableColumn key="manage" className="text-center w-1/6">
              관리
            </TableColumn>
          </TableHeader>
          <TableBody
            loadingContent={<Spinner label="로딩중" className="text-xl" />}
          >
            {faq.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">{item.title}</TableCell>
                <TableCell className="text-center">{item.region}</TableCell>
                <TableCell className="text-center">{item.ceo}</TableCell>
                <TableCell className="text-center">{item.date}</TableCell>
                <TableCell className="text-center">
                  <Button
                    color="primary"
                    onPress={() => router.push(`/admin/resort/${item.id}`)}
                  >
                    수정
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
