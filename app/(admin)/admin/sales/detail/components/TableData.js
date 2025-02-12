"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import { Button, Select, SelectItem } from "@heroui/react";
import { MdDownload } from "react-icons/md";
import CustomTable from "./CustomTable";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";

export default function TableData() {
  // 월 목록 생성 함수
  const getLastSixMonths = () => {
    const months = [];
    const today = new Date();

    for (let i = 0; i < 6; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      months.push(`${year}-${month}`);
    }

    return months;
  };

  const monthList = getLastSixMonths();

  const [selectedMonth, setSelectedMonth] = useState(monthList[0]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-row justify-start w-full md:w-1/5">
        <Button
          className="w-full"
          color="primary"
          endContent={<MdDownload className="text-lg" />}
        >
          엑셀로 다운로드 받기
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Select
          selectedKeys={[selectedMonth]}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full md:w-1/3"
          label="년월"
        >
          {monthList.map((month) => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </Select>
        <Select className="w-full md:w-1/3" label="프로그램">
          <SelectItem>월별</SelectItem>
          <SelectItem>주별</SelectItem>
        </Select>
        <Select className="w-full md:w-1/3" label="강사">
          <SelectItem>월별</SelectItem>
          <SelectItem>주별</SelectItem>
        </Select>
      </div>
      <div>
        <CustomTable></CustomTable>
      </div>
      <div className="w-full h-full flex justify-end ">
        <Button startContent={<MdEdit />} variant="flat" className="mb-6">
          매출수정하기
        </Button>
      </div>
    </div>
  );
}
