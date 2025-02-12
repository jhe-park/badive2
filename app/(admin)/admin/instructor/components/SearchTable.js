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
      <div className="flex flex-col md:flex-row gap-4 w-full px-4 mt-12">
        <Button
          className="bg-primary w-full md:w-1/4 text-white text-lg"
          startContent={<LuCirclePlus className="text-white text-xl" />}
          onPress={() => router.push("/admin/instructor/new")}
        >
          강사 등록
        </Button>
        <Input endContent={<FaSearch />}></Input>
        <Select
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
          </TableHeader>
          <TableBody
            items={instructor}
            isLoading={isLoading}
            loadingContent={<Spinner label="로딩중" className="text-xl" />}
          >
            {(item) => (
              <TableRow
                className="hover:cursor-pointer hover:bg-gray-100"
                key={item?.key}
                onClick={() => router.push(`/admin/instructor/${item.id}`)}
              >
                {(columnKey) => (
                  <TableCell className="text-center whitespace-nowrap">
                    {getKeyValue(item, columnKey)}
                  </TableCell>
                )}
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
